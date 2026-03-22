import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import LaunchCard from './components/LaunchCard'
import LaunchModal from './components/LaunchModal'
import Filters from './components/Filters'
import Countdown from './components/Countdown'
import './App.css'

const API_BASE = 'https://ll.thespacedevs.com/2.2.0'

function App() {
  const [launches, setLaunches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedLaunch, setSelectedLaunch] = useState(null)
  const [filter, setFilter] = useState('upcoming')
  const [searchQuery, setSearchQuery] = useState('')

  const fetchLaunches = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const endpoint = filter === 'upcoming' ? 'launch/upcoming' : 'launch/previous'
      const searchParam = searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''
      const response = await fetch(
        `${API_BASE}/${endpoint}/?limit=12&mode=detailed${searchParam}`
      )
      if (!response.ok) throw new Error(`API error: ${response.status}`)
      const data = await response.json()
      setLaunches(data.results || [])
    } catch (err) {
      setError(err.message)
      setLaunches([])
    } finally {
      setLoading(false)
    }
  }, [filter, searchQuery])

  useEffect(() => {
    fetchLaunches()
  }, [fetchLaunches])

  const nextLaunch = filter === 'upcoming' && launches.length > 0 ? launches[0] : null

  return (
    <div className="app">
      <Header />

      {nextLaunch && (
        <section className="next-launch-section">
          <div className="container">
            <div className="next-launch-banner">
              <div className="next-launch-info">
                <span className="next-label">Next Launch</span>
                <h2 className="next-launch-name">{nextLaunch.name}</h2>
                <p className="next-launch-provider">
                  {nextLaunch.launch_service_provider?.name || 'Unknown Provider'}
                </p>
                {nextLaunch.pad?.location?.name && (
                  <p className="next-launch-location">{nextLaunch.pad.location.name}</p>
                )}
              </div>
              <Countdown targetDate={nextLaunch.net} />
            </div>
          </div>
        </section>
      )}

      <main className="container">
        <Filters
          filter={filter}
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {loading && (
          <div className="loading">
            <div className="spinner" />
            <p>Loading launches...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>Failed to load launches: {error}</p>
            <button onClick={fetchLaunches} className="retry-btn">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && launches.length === 0 && (
          <div className="empty-state">
            <p>No launches found.</p>
          </div>
        )}

        {!loading && !error && launches.length > 0 && (
          <div className="launches-grid">
            {launches.map((launch) => (
              <LaunchCard
                key={launch.id}
                launch={launch}
                onClick={() => setSelectedLaunch(launch)}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            Data provided by{' '}
            <a href="https://thespacedevs.com/" target="_blank" rel="noopener noreferrer">
              The Space Devs
            </a>{' '}
            Launch Library 2 API
          </p>
        </div>
      </footer>

      {selectedLaunch && (
        <LaunchModal
          launch={selectedLaunch}
          onClose={() => setSelectedLaunch(null)}
        />
      )}
    </div>
  )
}

export default App
