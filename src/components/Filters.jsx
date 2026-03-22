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
    <div className="flex flex-col gap-3 mb-8">
      {/* Top row: filter buttons + view toggle + favorites + search */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Filter toggles */}
        <div className="flex gap-1">
          <Button
            bg={filter === 'upcoming' ? theme.green : theme.panel}
            textColor={filter === 'upcoming' ? theme.bg : theme.text}
            borderColor={filter === 'upcoming' ? theme.green : theme.border}
            shadow={theme.panel}
            className="font-pixel !text-[9px] !px-3 !py-1.5"
            onClick={() => setFilter('upcoming')}
          >
            UPCOMING
          </Button>
          <Button
            bg={filter === 'previous' ? theme.green : theme.panel}
            textColor={filter === 'previous' ? theme.bg : theme.text}
            borderColor={filter === 'previous' ? theme.green : theme.border}
            shadow={theme.panel}
            className="font-pixel !text-[9px] !px-3 !py-1.5"
            onClick={() => setFilter('previous')}
          >
            PREVIOUS
          </Button>
        </div>

        {/* View toggle */}
        <div
          className="flex"
          style={{ border: `2px solid ${theme.border}` }}
        >
          <button
            onClick={() => setView('grid')}
            className="p-1.5 flex items-center justify-center cursor-pointer border-none"
            style={{
              backgroundColor: view === 'grid' ? theme.border : theme.panel,
              color: view === 'grid' ? theme.bg : theme.muted,
            }}
            aria-label="Grid view"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </button>
          <button
            onClick={() => setView('list')}
            className="p-1.5 flex items-center justify-center cursor-pointer border-none"
            style={{
              backgroundColor: view === 'list' ? theme.border : theme.panel,
              color: view === 'list' ? theme.bg : theme.muted,
              borderLeft: `1px solid ${theme.border}`,
            }}
            aria-label="List view"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
        </div>

        {/* Favorites */}
        <button
          onClick={onOpenFavorites}
          className="flex items-center gap-1 px-2 py-1.5 cursor-pointer font-pixel text-[9px] border-none"
          style={{
            backgroundColor: favoritesCount > 0 ? 'rgba(255, 0, 64, 0.15)' : theme.panel,
            color: favoritesCount > 0 ? theme.red : theme.muted,
            border: `2px solid ${favoritesCount > 0 ? theme.red : theme.border}`,
          }}
        >
          <span style={{ fontSize: 14 }}>{favoritesCount > 0 ? '\u2665' : '\u2661'}</span>
          {favoritesCount > 0 && <span>{favoritesCount}</span>}
        </button>

        {/* Search - grows to fill remaining space */}
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder="> SEARCH..."
            bg={theme.panel}
            textColor={theme.text}
            borderColor={theme.border}
            className="font-retro !text-lg w-full"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default Filters
