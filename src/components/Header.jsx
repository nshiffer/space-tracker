import { theme } from '../theme'

function Header() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: 'rgba(15, 15, 35, 0.95)',
        borderBottom: `3px solid ${theme.border}`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-2xl pixel-image">&#x1F680;</span>
          <h1
            className="font-pixel text-sm md:text-base glow-blue"
            style={{ color: theme.blue }}
          >
            SPACE TRACKER
          </h1>
        </div>
        <nav className="flex gap-4 md:gap-6">
          {[
            { label: 'NASA', href: 'https://www.nasa.gov/' },
            { label: 'SPACEX', href: 'https://www.spacex.com/' },
            { label: 'API', href: 'https://thespacedevs.com/' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel text-[10px] no-underline transition-colors hover:text-space-blue"
              style={{ color: theme.muted }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
