import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="brand-badge">U4</span>
        <div>
          <strong>Cliente RESTful</strong>
          <small>React + API Spring Boot</small>
        </div>
      </div>

      <nav className="navbar-links">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/usuarios">Usuarios</NavLink>
        <NavLink to="/pedidos">Pedidos</NavLink>
      </nav>
    </header>
  )
}
