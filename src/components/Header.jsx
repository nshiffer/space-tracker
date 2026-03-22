import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-icon" role="img" aria-label="rocket">🚀</span>
          <span className="logo-text">Space Tracker</span>
        </div>
        <nav className="header-nav">
          <a
            href="https://www.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            NASA
          </a>
          <a
            href="https://www.spacex.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            SpaceX
          </a>
          <a
            href="https://thespacedevs.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            API
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
