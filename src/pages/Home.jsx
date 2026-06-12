import { Link } from 'react-router-dom'

export default function Home() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

  return (
    <section className="hero card">
      <div>
        <span className="eyebrow">Actividad Unidad 4</span>
        <h1>Cliente RESTful Web</h1>
        <p>
          Aplicación frontend desarrollada en React para consumir la API RESTful de la Unidad 3,
          demostrando operaciones CRUD sobre usuarios y pedidos.
        </p>

        <div className="hero-actions">
          <Link className="btn primary" to="/usuarios">Gestionar usuarios</Link>
          <Link className="btn secondary" to="/pedidos">Gestionar pedidos</Link>
        </div>
      </div>

      <aside className="info-panel">
        <h3>Backend conectado</h3>
        <code>{baseUrl}</code>
        <ul>
          <li>GET, POST, PUT y DELETE</li>
          <li>Validación de formularios</li>
          <li>Manejo de errores del servidor</li>
          <li>Servicios separados por recurso</li>
        </ul>
      </aside>
    </section>
  )
}
