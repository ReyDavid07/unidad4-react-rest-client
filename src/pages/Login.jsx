import { useState } from 'react'
import { authService } from '../services/authService.js'

const initialForm = {
  email: '',
  password: ''
}

export default function Login() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.email || !form.password) {
      setMessage({ type: 'error', text: 'Correo y contraseña son obligatorios.' })
      return
    }

    try {
      setLoading(true)
      await authService.login(form)
      setMessage({ type: 'success', text: 'Inicio de sesión enviado correctamente al backend.' })
    } catch (error) {
      setMessage({
        type: 'warning',
        text: `No se pudo completar el login en el backend. Detalle: ${error.message}. Si tu API no tiene /auth/login, esta pantalla queda como evidencia de validación del formulario.`
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="card narrow">
      <span className="eyebrow">POST /auth/login</span>
      <h1>Login de usuario</h1>
      <p className="muted">Formulario preparado para consumir el endpoint de login cuando esté disponible en el backend.</p>

      {message && <div className={`alert ${message.type}`}>{message.text}</div>}

      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Correo
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="usuario@correo.com" />
        </label>

        <label>
          Contraseña
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="****" />
        </label>

        <button className="btn primary" disabled={loading}>
          {loading ? 'Enviando...' : 'Iniciar sesión'}
        </button>
      </form>
    </section>
  )
}
