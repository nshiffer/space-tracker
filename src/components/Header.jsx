import { Link } from 'react-router-dom'
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
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 no-underline">
          {/* Pixel-art ASCII rocket */}
          <span
            className="font-pixel text-sm glow-green"
            style={{ color: theme.green }}
          >
            &gt;[=&gt;
          </span>
          <h1
            className="font-pixel text-[11px] md:text-sm tracking-wider"
            style={{ color: theme.text }}
          >
            LNCH<span style={{ color: theme.blue }}> CTRL</span>
          </h1>
        </Link>
        <nav className="flex items-center gap-3 md:gap-5">
          <Link
            to="/how-launches-work"
            className="font-pixel text-[8px] no-underline transition-colors hover:!text-[#fefcd0]"
            style={{ color: theme.muted }}
          >
            LEARN
          </Link>
          <Link
            to="/launch-providers"
            className="font-pixel text-[8px] no-underline transition-colors hover:!text-[#fefcd0]"
            style={{ color: theme.muted }}
          >
            PROVIDERS
          </Link>
          <Link
            to="/about"
            className="font-pixel text-[8px] no-underline transition-colors hover:!text-[#fefcd0]"
            style={{ color: theme.muted }}
          >
            ABOUT
          </Link>
          <a
            href="https://thespacedevs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-pixel text-[8px] no-underline transition-colors hover:!text-[#fefcd0]"
            style={{ color: theme.muted }}
          >
            API
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
