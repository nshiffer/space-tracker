import { useState, useEffect } from 'react'
import { Button, Input } from 'pixel-retroui'
import { theme } from '../theme'

function Filters({ filter, setFilter, searchQuery, setSearchQuery, view, setView, favoritesCount, onOpenFavorites }) {
  const [localSearch, setLocalSearch] = useState(searchQuery)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localSearch)
    }, 500)
    return () => clearTimeout(timer)
  }, [localSearch, setSearchQuery])

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-8">
      <div className="flex gap-2 items-center flex-wrap justify-center md:justify-start">
        <Button
          bg={filter === 'upcoming' ? theme.green : theme.panel}
          textColor={filter === 'upcoming' ? theme.bg : theme.text}
          borderColor={theme.border}
          shadow={theme.purple}
          className="font-pixel !text-[10px] !px-4 !py-2"
          onClick={() => setFilter('upcoming')}
        >
          UPCOMING
        </Button>
        <Button
          bg={filter === 'previous' ? theme.green : theme.panel}
          textColor={filter === 'previous' ? theme.bg : theme.text}
          borderColor={theme.border}
          shadow={theme.purple}
          className="font-pixel !text-[10px] !px-4 !py-2"
          onClick={() => setFilter('previous')}
        >
          PREVIOUS
        </Button>

        <div className="flex overflow-hidden" style={{ border: `2px solid ${theme.border}` }}>
          <button
            onClick={() => setView('grid')}
            className="p-2 flex items-center justify-center transition-colors cursor-pointer border-none"
            style={{
              backgroundColor: view === 'grid' ? theme.purple : theme.panel,
              color: view === 'grid' ? theme.bg : theme.muted,
            }}
            aria-label="Grid view"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </button>
          <button
            onClick={() => setView('list')}
            className="p-2 flex items-center justify-center transition-colors cursor-pointer border-none"
            style={{
              backgroundColor: view === 'list' ? theme.purple : theme.panel,
              color: view === 'list' ? theme.bg : theme.muted,
            }}
            aria-label="List view"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
        </div>

        <button
          onClick={onOpenFavorites}
          className="flex items-center gap-1.5 px-3 py-2 cursor-pointer font-pixel text-[10px] transition-colors border-none"
          style={{
            backgroundColor: theme.panel,
            color: favoritesCount > 0 ? theme.red : theme.muted,
            border: `2px solid ${favoritesCount > 0 ? theme.red : theme.border}`,
          }}
        >
          <span>{favoritesCount > 0 ? '\u2665' : '\u2661'}</span>
          {favoritesCount > 0 && <span>{favoritesCount}</span>}
        </button>
      </div>

      <div className="w-full md:w-auto md:min-w-[280px]">
        <Input
          placeholder="> SEARCH LAUNCHES..."
          bg={theme.panel}
          textColor={theme.text}
          borderColor={theme.border}
          className="font-retro !text-lg w-full"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Filters
