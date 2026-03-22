import { useState, useEffect, useCallback } from 'react'
import { Button } from 'pixel-retroui'
import { theme } from './theme'
import Header from './components/Header'
import LaunchCard from './components/LaunchCard'
import LaunchListItem from './components/LaunchListItem'
import LaunchModal from './components/LaunchModal'
import Filters from './components/Filters'
import NextLaunchBanner from './components/NextLaunchBanner'
import LaunchStats from './components/LaunchStats'
import SpaceNews from './components/SpaceNews'
import FavoritesDrawer from './components/FavoritesDrawer'
import ScrollToTop from './components/ScrollToTop'
import { useFavorites } from './hooks/useFavorites'
import { useLocalStorage } from './hooks/useLocalStorage'

const API_BASE = 'https://ll.thespacedevs.com/2.2.0'
const PAGE_SIZE = 12

function App() {
  const [launches, setLaunches] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const [selectedLaunch, setSelectedLaunch] = useState(null)
  const [filter, setFilter] = useState('upcoming')
  const [searchQuery, setSearchQuery] = useState('')
  const [nextPageUrl, setNextPageUrl] = useState(null)
  const [totalCount, setTotalCount] = useState(0)
  const [view, setView] = useLocalStorage('space-tracker-view', 'grid')
  const [showFavorites, setShowFavorites] = useState(false)

  const { toggleFavorite, isFavorite, getFavoritesList } = useFavorites()

  const fetchLaunches = useCallback(async (append = false) => {
    if (append) {
      setLoadingMore(true)
    } else {
      setLoading(true)
      setError(null)
    }

    try {
      let url
      if (append && nextPageUrl) {
        url = nextPageUrl
      } else {
        const endpoint = filter === 'upcoming' ? 'launch/upcoming' : 'launch/previous'
        const searchParam = searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''
        url = `${API_BASE}/${endpoint}/?limit=${PAGE_SIZE}&mode=detailed${searchParam}`
      }

      const response = await fetch(url)
      if (!response.ok) throw new Error(`API error: ${response.status}`)
      const data = await response.json()

      if (append) {
        setLaunches((prev) => [...prev, ...(data.results || [])])
      } else {
        setLaunches(data.results || [])
      }
      setNextPageUrl(data.next || null)
      setTotalCount(data.count || 0)
    } catch (err) {
      setError(err.message)
      if (!append) setLaunches([])
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [filter, searchQuery, nextPageUrl])

  useEffect(() => {
    setNextPageUrl(null)
    fetchLaunches(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, searchQuery])

  const nextLaunch = filter === 'upcoming' && launches.length > 0 ? launches[0] : null
  const favoritesList = getFavoritesList()

  return (
    <div className="min-h-screen flex flex-col font-retro">
      {/* Star field background */}
      <div className="star-field" />

      <Header />

      {nextLaunch && <NextLaunchBanner launch={nextLaunch} />}

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 md:px-6 py-8">
        <Filters
          filter={filter}
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          view={view}
          setView={setView}
          favoritesCount={favoritesList.length}
          onOpenFavorites={() => setShowFavorites(true)}
        />

        {/* Stats */}
        {!loading && !error && launches.length > 0 && (
          <LaunchStats launches={launches} filter={filter} />
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center gap-4 py-16">
            <span className="font-pixel text-sm glow-green blink" style={{ color: theme.green }}>
              LOADING...
            </span>
            <span className="font-retro text-xl" style={{ color: theme.muted }}>
              Establishing uplink to mission control
            </span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex flex-col items-center gap-4 py-12">
            <span className="font-pixel text-[10px]" style={{ color: theme.red }}>
              ! ERROR: {error}
            </span>
            <Button
              bg={theme.red}
              textColor={theme.bg}
              borderColor={theme.border}
              shadow={theme.purple}
              className="font-pixel !text-[10px]"
              onClick={() => fetchLaunches(false)}
            >
              RETRY
            </Button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && launches.length === 0 && (
          <div className="flex justify-center py-16">
            <span className="font-pixel text-[10px]" style={{ color: theme.muted }}>
              NO LAUNCHES FOUND.
            </span>
          </div>
        )}

        {/* Launch list */}
        {!loading && !error && launches.length > 0 && (
          <>
            {view === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {launches.map((launch) => (
                  <LaunchCard
                    key={launch.id}
                    launch={launch}
                    onClick={() => setSelectedLaunch(launch)}
                    isFavorite={isFavorite(launch.id)}
                    onToggleFavorite={() => toggleFavorite(launch)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {launches.map((launch) => (
                  <LaunchListItem
                    key={launch.id}
                    launch={launch}
                    onClick={() => setSelectedLaunch(launch)}
                    isFavorite={isFavorite(launch.id)}
                    onToggleFavorite={() => toggleFavorite(launch)}
                  />
                ))}
              </div>
            )}

            {/* Load More */}
            {nextPageUrl && (
              <div className="flex justify-center mt-8">
                <Button
                  bg={theme.panel}
                  textColor={theme.blue}
                  borderColor={theme.blue}
                  shadow={theme.purple}
                  className="font-pixel !text-[10px]"
                  onClick={() => fetchLaunches(true)}
                  disabled={loadingMore}
                >
                  {loadingMore ? 'LOADING...' : `LOAD MORE (${launches.length}/${totalCount})`}
                </Button>
              </div>
            )}
          </>
        )}

        {/* Space News */}
        {!loading && !error && (
          <div className="mt-12">
            <SpaceNews />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className="py-6 text-center"
        style={{ borderTop: `2px solid ${theme.border}` }}
      >
        <p className="font-pixel text-[8px]" style={{ color: theme.muted }}>
          DATA BY{' '}
          <a
            href="https://thespacedevs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline hover:underline"
            style={{ color: theme.blue }}
          >
            THE SPACE DEVS
          </a>
          {' & '}
          <a
            href="https://spaceflightnewsapi.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline hover:underline"
            style={{ color: theme.blue }}
          >
            SPACEFLIGHT NEWS API
          </a>
        </p>
      </footer>

      {/* Modal */}
      {selectedLaunch && (
        <LaunchModal
          launch={selectedLaunch}
          onClose={() => setSelectedLaunch(null)}
          isFavorite={isFavorite(selectedLaunch.id)}
          onToggleFavorite={() => toggleFavorite(selectedLaunch)}
        />
      )}

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favoritesList}
        onRemove={toggleFavorite}
      />

      {/* Scroll to Top */}
      <ScrollToTop />
    </div>
  )
}

export default App
