import { Link } from 'react-router-dom'
import heroImage from '../assests/restauranfood.jpg'
import Menu from '../components/Menu'

export default function HomePage() {
  return (
    <>
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <p>
            We are a family-owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </p>
          <Link className="primary-button" to="/booking">Reserve a Table</Link>
        </div>
        <img
          className="hero-image"
          src={heroImage}
          alt="Mediterranean dishes served at Little Lemon"
        />
      </section>

      <Menu />

      <section id="about" className="about-section">
        <div>
          <h2>Little Lemon</h2>
          <h3>Chicago</h3>
          <p>
            Based in Chicago, Little Lemon serves classic Mediterranean dishes
            made with fresh ingredients, warm hospitality, and family recipes
            passed down through generations.
          </p>
        </div>
      </section>
    </>
  )
}
