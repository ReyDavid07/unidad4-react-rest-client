import { useEffect, useState } from 'react'
import { emptyPedido, toCreatePedidoPayload, toUpdatePedidoPayload, validatePedido } from '../models/pedidoModel.js'
import { pedidoService } from '../services/pedidoService.js'

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState([])
  const [form, setForm] = useState(emptyPedido)
  const [editingId, setEditingId] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const editing = Boolean(editingId)

  const loadPedidos = async () => {
    try {
      setLoading(true)
      const data = await pedidoService.findAll()
      setPedidos(Array.isArray(data) ? data : [])
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPedidos()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const resetForm = () => {
    setForm(emptyPedido)
    setEditingId(null)
    setErrors({})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validatePedido(form, editing)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setMessage({ type: 'error', text: 'Revisa los campos obligatorios antes de enviar.' })
      return
    }

    try {
      setLoading(true)
      if (editing) {
        await pedidoService.update(editingId, toUpdatePedidoPayload(form))
        setMessage({ type: 'success', text: 'Pedido actualizado correctamente.' })
      } else {
        await pedidoService.create(toCreatePedidoPayload(form))
        setMessage({ type: 'success', text: 'Pedido creado correctamente.' })
      }
      resetForm()
      await loadPedidos()
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (pedido) => {
    setEditingId(pedido.id)
    setForm({
      numeroPedido: pedido.numeroPedido || '',
      cliente: pedido.cliente || '',
      producto: pedido.producto || '',
      cantidad: pedido.cantidad || 1,
      valorUnitario: pedido.valorUnitario || 0,
      estado: pedido.estado || 'PENDIENTE',
      fecha: pedido.fecha || new Date().toISOString().slice(0, 10)
    })
    setMessage(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm('¿Deseas eliminar este pedido?')
    if (!confirmed) return

    try {
      setLoading(true)
      await pedidoService.remove(id)
      setMessage({ type: 'success', text: 'Pedido eliminado correctamente.' })
      await loadPedidos()
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP'
    })
  }

  return (
    <section className="page-grid">
      <div className="card">
        <span className="eyebrow">/api/pedidos</span>
        <h1>{editing ? 'Editar pedido' : 'Crear pedido'}</h1>

        {message && <div className={`alert ${message.type}`}>{message.text}</div>}

        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Número de pedido
            <input name="numeroPedido" value={form.numeroPedido} onChange={handleChange} placeholder="PED-001" />
            {errors.numeroPedido && <small className="field-error">{errors.numeroPedido}</small>}
          </label>

          <label>
            Cliente
            <input name="cliente" value={form.cliente} onChange={handleChange} placeholder="Nombre del cliente" />
            {errors.cliente && <small className="field-error">{errors.cliente}</small>}
          </label>

          <label>
            Producto
            <input name="producto" value={form.producto} onChange={handleChange} placeholder="Producto solicitado" />
            {errors.producto && <small className="field-error">{errors.producto}</small>}
          </label>

          <label>
            Cantidad
            <input type="number" min="1" name="cantidad" value={form.cantidad} onChange={handleChange} />
            {errors.cantidad && <small className="field-error">{errors.cantidad}</small>}
          </label>

          <label>
            Valor unitario
            <input type="number" min="1" name="valorUnitario" value={form.valorUnitario} onChange={handleChange} />
            {errors.valorUnitario && <small className="field-error">{errors.valorUnitario}</small>}
          </label>

          <label>
            Fecha
            <input type="date" name="fecha" value={form.fecha} onChange={handleChange} />
          </label>

          {editing && (
            <label>
              Estado
              <select name="estado" value={form.estado} onChange={handleChange}>
                <option value="PENDIENTE">PENDIENTE</option>
                <option value="EN_PROCESO">EN_PROCESO</option>
                <option value="ENTREGADO">ENTREGADO</option>
                <option value="CANCELADO">CANCELADO</option>
              </select>
              {errors.estado && <small className="field-error">{errors.estado}</small>}
            </label>
          )}

          <div className="form-actions">
            <button className="btn primary" disabled={loading}>{editing ? 'Actualizar' : 'Crear'}</button>
            {editing && <button type="button" className="btn secondary" onClick={resetForm}>Cancelar</button>}
          </div>
        </form>
      </div>

      <div className="card table-card">
        <div className="section-header">
          <div>
            <span className="eyebrow">GET /api/pedidos</span>
            <h2>Pedidos registrados</h2>
          </div>
          <button className="btn secondary" onClick={loadPedidos} disabled={loading}>Actualizar</button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Número</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Valor</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.length === 0 && (
                <tr><td colSpan="10" className="empty">No hay pedidos para mostrar.</td></tr>
              )}
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.numeroPedido}</td>
                  <td>{pedido.cliente}</td>
                  <td>{pedido.producto}</td>
                  <td>{pedido.cantidad}</td>
                  <td>{formatCurrency(pedido.valorUnitario)}</td>
                  <td>{formatCurrency(pedido.total)}</td>
                  <td><span className="badge">{pedido.estado}</span></td>
                  <td>{pedido.fecha}</td>
                  <td className="actions">
                    <button className="btn tiny" onClick={() => handleEdit(pedido)}>Editar</button>
                    <button className="btn tiny danger" onClick={() => handleDelete(pedido.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
