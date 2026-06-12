import { useEffect, useState } from 'react'
import { emptyUser, toCreateUserPayload, toUpdateUserPayload, validateUser } from '../models/userModel.js'
import { userService } from '../services/userService.js'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState(emptyUser)
  const [editingId, setEditingId] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const editing = Boolean(editingId)

  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await userService.findAll()
      setUsers(Array.isArray(data) ? data : [])
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const resetForm = () => {
    setForm(emptyUser)
    setEditingId(null)
    setErrors({})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validateUser(form, editing)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setMessage({ type: 'error', text: 'Revisa los campos obligatorios antes de enviar.' })
      return
    }

    try {
      setLoading(true)
      if (editing) {
        await userService.update(editingId, toUpdateUserPayload(form))
        setMessage({ type: 'success', text: 'Usuario actualizado correctamente.' })
      } else {
        await userService.create(toCreateUserPayload(form))
        setMessage({ type: 'success', text: 'Usuario creado correctamente.' })
      }
      resetForm()
      await loadUsers()
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (user) => {
    setEditingId(user.id)
    setForm({
      name: user.name || '',
      email: user.email || '',
      password: user.password || '1234',
      role: user.role || 'USER',
      status: user.status || 'ACTIVE'
    })
    setMessage(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm('¿Deseas eliminar este usuario?')
    if (!confirmed) return

    try {
      setLoading(true)
      await userService.remove(id)
      setMessage({ type: 'success', text: 'Usuario eliminado correctamente.' })
      await loadUsers()
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page-grid">
      <div className="card">
        <span className="eyebrow">/api/users</span>
        <h1>{editing ? 'Editar usuario' : 'Crear usuario'}</h1>

        {message && <div className={`alert ${message.type}`}>{message.text}</div>}

        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Nombre
            <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre completo" />
            {errors.name && <small className="field-error">{errors.name}</small>}
          </label>

          <label>
            Correo
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="correo@ejemplo.com" />
            {errors.email && <small className="field-error">{errors.email}</small>}
          </label>

          <label>
            Contraseña
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Mínimo 4 caracteres" />
            {errors.password && <small className="field-error">{errors.password}</small>}
          </label>

          <label>
            Rol
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="CLIENTE">CLIENTE</option>
            </select>
            {errors.role && <small className="field-error">{errors.role}</small>}
          </label>

          {editing && (
            <label>
              Estado
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
              {errors.status && <small className="field-error">{errors.status}</small>}
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
            <span className="eyebrow">GET /api/users</span>
            <h2>Usuarios registrados</h2>
          </div>
          <button className="btn secondary" onClick={loadUsers} disabled={loading}>Actualizar</button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr><td colSpan="6" className="empty">No hay usuarios para mostrar.</td></tr>
              )}
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td><span className="badge">{user.role}</span></td>
                  <td>{user.status}</td>
                  <td className="actions">
                    <button className="btn tiny" onClick={() => handleEdit(user)}>Editar</button>
                    <button className="btn tiny danger" onClick={() => handleDelete(user.id)}>Eliminar</button>
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
