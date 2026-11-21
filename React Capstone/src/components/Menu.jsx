import { Link } from 'react-router-dom'
import { specials } from './menuData'

export default function Menu({ heading = 'This week’s specials!', showHeadingButton = true }) {
  return (
    <section id="menu" className="specials-section">
      <div className="specials-heading">
        <h2>{heading}</h2>
        {showHeadingButton && (
          <Link to="/menu" className="primary-button">Online Menu</Link>
        )}
      </div>

      <div className="specials-grid">
        {specials.map((special) => (
          <article className="special-card" key={special.name}>
            <img src={special.image} alt={special.name} />
            <div className="special-card-body">
              <div className="special-title-row">
                <h3>{special.name}</h3>
                <span>{special.price}</span>
              </div>
              <p>{special.description}</p>
              <Link to="/booking">Order a delivery <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
