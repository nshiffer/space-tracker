import { useState, useEffect, useCallback } from 'react'
import { Box, Flex, Text, Spinner, Button, SimpleGrid, Theme } from '@chakra-ui/react'
import Header from './components/Header'
import LaunchCard from './components/LaunchCard'
import LaunchModal from './components/LaunchModal'
import Filters from './components/Filters'
import NextLaunchBanner from './components/NextLaunchBanner'

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
          />

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
                onClick={fetchLaunches}
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
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {launches.map((launch) => (
                <LaunchCard
                  key={launch.id}
                  launch={launch}
                  onClick={() => setSelectedLaunch(launch)}
                />
              ))}
            </SimpleGrid>
          )}
        </Box>

        <Box borderTopWidth="1px" borderColor="gray.800" py={6} textAlign="center">
          <Text color="gray.500" fontSize="sm">
            Data provided by{' '}
            <Box as="a" href="https://thespacedevs.com/" target="_blank" rel="noopener noreferrer" color="blue.400" _hover={{ textDecoration: 'underline' }}>
              The Space Devs
            </Box>{' '}
            Launch Library 2 API
          </Text>
        </Box>

        {selectedLaunch && (
          <LaunchModal
            launch={selectedLaunch}
            onClose={() => setSelectedLaunch(null)}
          />
        )}
      </Box>
    </Theme>
  )
}

export default App
