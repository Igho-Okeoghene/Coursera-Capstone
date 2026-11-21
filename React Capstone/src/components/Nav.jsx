import { NavLink } from 'react-router-dom'

export default function Nav({ open, onNavigate }) {
  return (
    <nav
      id="main-navigation"
      className={open ? 'main-nav is-open' : 'main-nav'}
      aria-label="Primary navigation"
    >
      <NavLink to="/" onClick={onNavigate}>Home</NavLink>
      <a href="/#about" onClick={onNavigate}>About</a>
      <NavLink to="/menu" onClick={onNavigate}>Menu</NavLink>
      <NavLink to="/booking" onClick={onNavigate}>Reservations</NavLink>
      <NavLink to="/menu" onClick={onNavigate}>Order Online</NavLink>
      <NavLink to="/booking" onClick={onNavigate}>Login</NavLink>
    </nav>
  )
}
