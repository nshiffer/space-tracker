import { useState, useEffect, useCallback, useMemo } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
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
import About from './pages/About'
import HowLaunchesWork from './pages/HowLaunchesWork'
import LaunchProviders from './pages/LaunchProviders'
import FAQ from './pages/FAQ'
import { useFavorites } from './hooks/useFavorites'
import { useLocalStorage } from './hooks/useLocalStorage'

const CACHE_URL = `${import.meta.env.BASE_URL}data/launches.json`
const PAGE_SIZE = 12

function HomePage() {
  const [allData, setAllData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedLaunch, setSelectedLaunch] = useState(null)
  const [filter, setFilter] = useState('upcoming')
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [view, setView] = useLocalStorage('space-tracker-view', 'grid')
  const [showFavorites, setShowFavorites] = useState(false)

  const { toggleFavorite, isFavorite, getFavoritesList } = useFavorites()

  // Fetch the cached JSON data
  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(CACHE_URL)
      if (!res.ok) throw new Error('Launch data unavailable. Please try again later.')
      const data = await res.json()
      setAllData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Reset visible count when filter or search changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [filter, searchQuery])

  // Get the right dataset and apply client-side search
  const allLaunches = useMemo(() => {
    if (!allData) return []
    const dataset = filter === 'upcoming' ? allData.upcoming : allData.previous
    const results = dataset?.results || []
    if (!searchQuery) return results

    const q = searchQuery.toLowerCase()
    return results.filter(launch =>
      (launch.name || '').toLowerCase().includes(q) ||
      (launch.launch_service_provider?.name || '').toLowerCase().includes(q) ||
      (launch.pad?.location?.name || '').toLowerCase().includes(q) ||
      (launch.rocket?.configuration?.full_name || '').toLowerCase().includes(q)
    )
  }, [allData, filter, searchQuery])

  // Client-side pagination
  const launches = useMemo(() => {
    return allLaunches.slice(0, visibleCount)
  }, [allLaunches, visibleCount])

  const hasMore = visibleCount < allLaunches.length
  const nextLaunch = filter === 'upcoming' && allLaunches.length > 0 ? allLaunches[0] : null
  const favoritesList = getFavoritesList()

  return (
    <>
      {nextLaunch && <NextLaunchBanner launch={nextLaunch} />}

      <div className="flex-1 w-full max-w-[1200px] px-4 md:px-6 py-8" style={{ margin: '0 auto' }}>
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

        {/* Last updated indicator */}
        {allData?.lastUpdated && (
          <div className="mb-4">
            <span className="font-pixel text-[7px]" style={{ color: theme.muted }}>
              DATA UPDATED: {new Date(allData.lastUpdated).toLocaleString()}
            </span>
          </div>
        )}

        {/* Stats */}
        {!loading && !error && launches.length > 0 && (
          <LaunchStats launches={allLaunches} filter={filter} />
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
              shadow="transparent"
              className="font-pixel !text-[10px]"
              onClick={fetchData}
            >
              RETRY
            </Button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && launches.length === 0 && (
          <div className="flex justify-center py-16">
            <span className="font-pixel text-[10px]" style={{ color: theme.muted }}>
              {searchQuery ? 'NO MATCHING LAUNCHES FOUND.' : 'NO LAUNCHES FOUND.'}
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
            {hasMore && (
              <div className="flex justify-center mt-8">
                <Button
                  bg={theme.panel}
                  textColor={theme.blue}
                  borderColor={theme.blue}
                  shadow="transparent"
                  className="font-pixel !text-[10px]"
                  onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
                >
                  LOAD MORE ({launches.length}/{allLaunches.length})
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
      </div>

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
    </>
  )
}

function App() {
  return (
    <div className="min-h-screen flex flex-col font-retro">
      {/* Star field background */}
      <div className="star-field" />

      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-launches-work" element={<HowLaunchesWork />} />
        <Route path="/launch-providers" element={<LaunchProviders />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>

      {/* Footer */}
      <footer
        className="py-6 mt-auto"
        style={{ borderTop: `2px solid ${theme.border}` }}
      >
        <div className="max-w-[1200px] px-4 md:px-6" style={{ margin: '0 auto' }}>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Link to="/about" className="font-pixel text-[8px] no-underline hover:underline" style={{ color: theme.muted }}>ABOUT</Link>
            <Link to="/how-launches-work" className="font-pixel text-[8px] no-underline hover:underline" style={{ color: theme.muted }}>HOW LAUNCHES WORK</Link>
            <Link to="/launch-providers" className="font-pixel text-[8px] no-underline hover:underline" style={{ color: theme.muted }}>PROVIDERS</Link>
            <Link to="/faq" className="font-pixel text-[8px] no-underline hover:underline" style={{ color: theme.muted }}>FAQ</Link>
          </div>
          <p className="font-pixel text-[7px] text-center" style={{ color: theme.muted }}>
            DATA BY{' '}
            <a href="https://thespacedevs.com/" target="_blank" rel="noopener noreferrer"
              className="no-underline hover:underline" style={{ color: theme.blue }}>
              THE SPACE DEVS
            </a>
            {' & '}
            <a href="https://spaceflightnewsapi.net/" target="_blank" rel="noopener noreferrer"
              className="no-underline hover:underline" style={{ color: theme.blue }}>
              SPACEFLIGHT NEWS API
            </a>
          </p>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  )
}

export default App
