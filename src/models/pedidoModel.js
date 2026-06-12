const today = new Date().toISOString().slice(0, 10)

export const emptyPedido = {
  numeroPedido: '',
  cliente: '',
  producto: '',
  cantidad: 1,
  valorUnitario: 0,
  estado: 'PENDIENTE',
  fecha: today
}

export function validatePedido(pedido, editing = false) {
  const errors = {}

  if (!pedido.numeroPedido?.trim()) errors.numeroPedido = 'El número de pedido es obligatorio.'
  if (!pedido.cliente?.trim()) errors.cliente = 'El cliente es obligatorio.'
  if (!pedido.producto?.trim()) errors.producto = 'El producto es obligatorio.'

  if (Number(pedido.cantidad) < 1) {
    errors.cantidad = 'La cantidad mínima es 1.'
  }

  if (Number(pedido.valorUnitario) <= 0) {
    errors.valorUnitario = 'El valor unitario debe ser positivo.'
  }

  if (editing && !pedido.estado?.trim()) {
    errors.estado = 'El estado es obligatorio.'
  }

  return errors
}

export function toCreatePedidoPayload(pedido) {
  return {
    numeroPedido: pedido.numeroPedido.trim(),
    cliente: pedido.cliente.trim(),
    producto: pedido.producto.trim(),
    cantidad: Number(pedido.cantidad),
    valorUnitario: Number(pedido.valorUnitario),
    fecha: pedido.fecha || null
  }
}

export function toUpdatePedidoPayload(pedido) {
  return {
    numeroPedido: pedido.numeroPedido.trim(),
    cliente: pedido.cliente.trim(),
    producto: pedido.producto.trim(),
    cantidad: Number(pedido.cantidad),
    valorUnitario: Number(pedido.valorUnitario),
    estado: pedido.estado,
    fecha: pedido.fecha || null
  }
}
