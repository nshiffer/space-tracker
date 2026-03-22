import { useState, useEffect, useCallback } from 'react'
import { Box, Flex, Text, Spinner, Button, SimpleGrid, Theme } from '@chakra-ui/react'
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
    <Theme appearance="dark" hasBackground>
      <Box minH="100vh" display="flex" flexDirection="column" fontFamily="'Inter', sans-serif">
        <Header />

        {nextLaunch && <NextLaunchBanner launch={nextLaunch} />}

        <Box flex="1" maxW="1200px" mx="auto" w="100%" px={{ base: 4, md: 6 }} py={8}>
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

          {loading && (
            <Flex direction="column" align="center" gap={4} py={16}>
              <Spinner size="xl" color="blue.400" borderWidth="3px" />
              <Text color="gray.400">Loading launches...</Text>
            </Flex>
          )}

          {error && (
            <Flex direction="column" align="center" gap={4} py={12}>
              <Text color="red.400" fontSize="lg">Failed to load launches: {error}</Text>
              <Button
                onClick={() => fetchLaunches(false)}
                bg="blue.500"
                color="white"
                _hover={{ bg: 'blue.600' }}
                size="md"
              >
                Retry
              </Button>
            </Flex>
          )}

          {!loading && !error && launches.length === 0 && (
            <Flex justify="center" py={16}>
              <Text color="gray.500" fontSize="lg">No launches found.</Text>
            </Flex>
          )}

          {!loading && !error && launches.length > 0 && (
            <>
              {view === 'grid' ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                  {launches.map((launch) => (
                    <LaunchCard
                      key={launch.id}
                      launch={launch}
                      onClick={() => setSelectedLaunch(launch)}
                      isFavorite={isFavorite(launch.id)}
                      onToggleFavorite={() => toggleFavorite(launch)}
                    />
                  ))}
                </SimpleGrid>
              ) : (
                <Flex direction="column" gap={4}>
                  {launches.map((launch) => (
                    <LaunchListItem
                      key={launch.id}
                      launch={launch}
                      onClick={() => setSelectedLaunch(launch)}
                      isFavorite={isFavorite(launch.id)}
                      onToggleFavorite={() => toggleFavorite(launch)}
                    />
                  ))}
                </Flex>
              )}

              {/* Load More */}
              {nextPageUrl && (
                <Flex justify="center" mt={8}>
                  <Button
                    onClick={() => fetchLaunches(true)}
                    bg="transparent"
                    color="blue.400"
                    borderWidth="1px"
                    borderColor="blue.500"
                    _hover={{ bg: 'rgba(59, 130, 246, 0.1)' }}
                    size="lg"
                    px={8}
                    loading={loadingMore}
                    loadingText="Loading..."
                  >
                    Load More ({launches.length} of {totalCount})
                  </Button>
                </Flex>
              )}
            </>
          )}

          {/* Space News */}
          {!loading && !error && (
            <Box mt={12}>
              <SpaceNews />
            </Box>
          )}
        </Box>

        <Box borderTopWidth="1px" borderColor="gray.800" py={6} textAlign="center">
          <Text color="gray.500" fontSize="sm">
            Data provided by{' '}
            <Box as="a" href="https://thespacedevs.com/" target="_blank" rel="noopener noreferrer" color="blue.400" _hover={{ textDecoration: 'underline' }}>
              The Space Devs
            </Box>{' '}
            &{' '}
            <Box as="a" href="https://spaceflightnewsapi.net/" target="_blank" rel="noopener noreferrer" color="blue.400" _hover={{ textDecoration: 'underline' }}>
              Spaceflight News API
            </Box>
          </Text>
        </Box>

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
      </Box>
    </Theme>
  )
}

export default App
