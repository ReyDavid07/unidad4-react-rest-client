export const emptyUser = {
  name: '',
  email: '',
  password: '',
  role: 'USER',
  status: 'ACTIVE'
}

export function validateUser(user, editing = false) {
  const errors = {}

  if (!user.name?.trim()) errors.name = 'El nombre es obligatorio.'
  if (!user.email?.trim()) {
    errors.email = 'El correo es obligatorio.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.email = 'Digite un correo válido.'
  }
  if (!user.password?.trim()) {
    errors.password = 'La contraseña es obligatoria.'
  } else if (user.password.length < 4) {
    errors.password = 'La contraseña debe tener mínimo 4 caracteres.'
  }
  if (!user.role?.trim()) errors.role = 'El rol es obligatorio.'
  if (editing && !user.status?.trim()) errors.status = 'El estado es obligatorio.'

  return errors
}

export function toCreateUserPayload(user) {
  return {
    name: user.name.trim(),
    email: user.email.trim(),
    password: user.password,
    role: user.role
  }
}

export function toUpdateUserPayload(user) {
  return {
    name: user.name.trim(),
    email: user.email.trim(),
    password: user.password,
    role: user.role,
    status: user.status
  }
}
