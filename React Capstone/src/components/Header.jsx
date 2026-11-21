import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assests/littlelemon_logo.png'
import Nav from './Nav'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Little Lemon home" onClick={closeMenu}>
        <img src={logo} alt="Little Lemon" />
      </Link>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        aria-label="Toggle navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <Nav open={menuOpen} onNavigate={closeMenu} />
    </header>
  )
}
