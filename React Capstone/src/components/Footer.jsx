import { Link } from 'react-router-dom'
import logo from '../assests/littlelemon_logo.png'

export default function Footer() {
  return (
    <footer className="site-footer">
      <img src={logo} alt="Little Lemon" />

      <div>
        <h3>Important Links</h3>
        <Link to="/">Home</Link>
        <a href="/#about">About</a>
        <Link to="/menu">Menu</Link>
        <Link to="/booking">Reservations</Link>
      </div>

      <div>
        <h3>Contact</h3>
        <p>123 Town Street, Chicago</p>
        <p>+00 123 456 789</p>
        <p>little@lemon.com</p>
      </div>

      <div>
        <h3>Social Media</h3>
        <a href="#facebook" aria-label="Little Lemon on Facebook">Facebook</a>
        <a href="#instagram" aria-label="Little Lemon on Instagram">Instagram</a>
        <a href="#twitter" aria-label="Little Lemon on Twitter">Twitter</a>
      </div>
    </footer>
  )
}
