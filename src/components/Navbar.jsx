import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/',           label: 'Home' },
    { to: '/experience', label: 'Experience' },
    { to: '/project',    label: 'Project' },
    { to: '/about',      label: 'About' },
  ]

  function handleNav() { setOpen(false) }

  return (
    <>
      <nav className="pf-navbar">
        <div className="pf-navbar__inner">
          <Link to="/" className="pf-navbar__logo" onClick={handleNav}>
            Portfolio <span className="pf-navbar__logo-dot">✦</span>
          </Link>

          {/* desktop links */}
          <ul className="pf-navbar__links">
            {links.map(l => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`pf-navbar__link ${pathname === l.to ? 'active' : ''}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* hamburger */}
          <button
            className="pf-navbar__hamburger"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span style={{ transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ opacity: open ? 0 : 1 }} />
            <span style={{ transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* mobile drawer */}
      <div className={`pf-navbar__drawer ${open ? 'open' : ''}`}>
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={`pf-navbar__drawer-link ${pathname === l.to ? 'active' : ''}`}
            onClick={handleNav}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </>
  )
}

export default Navbar