import { useMemo } from 'react'
import { Box, Flex, Text, SimpleGrid } from '@chakra-ui/react'

function LaunchStats({ launches, filter }) {
  const stats = useMemo(() => {
    if (!launches || launches.length === 0) return null

    const providers = {}
    const statuses = {}
    const countries = {}
    let earliest = null
    let latest = null

    launches.forEach((l) => {
      const provider = l.launch_service_provider?.name || 'Unknown'
      providers[provider] = (providers[provider] || 0) + 1

      const status = l.status?.name || 'Unknown'
      statuses[status] = (statuses[status] || 0) + 1

      const country = l.pad?.location?.country_code || 'Unknown'
      countries[country] = (countries[country] || 0) + 1

      const date = new Date(l.net)
      if (!earliest || date < earliest) earliest = date
      if (!latest || date > latest) latest = date
    })

    const topProvider = Object.entries(providers).sort((a, b) => b[1] - a[1])[0]
    const uniqueProviders = Object.keys(providers).length
    const uniqueCountries = Object.keys(countries).length

    return {
      total: launches.length,
      topProvider,
      uniqueProviders,
      uniqueCountries,
      statuses,
      dateRange: { earliest, latest },
    }
  }, [launches])

  if (!stats) return null

  return (
    <Box mb={8}>
      <Flex align="center" gap={2} mb={4}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
        <Text fontFamily="'Space Grotesk', sans-serif" fontSize="16px" fontWeight="600" color="gray.200">
          {filter === 'upcoming' ? 'Upcoming' : 'Previous'} Launch Stats
        </Text>
      </Flex>

      <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
        <StatCard label="Total Launches" value={stats.total} icon="🚀" />
        <StatCard label="Providers" value={stats.uniqueProviders} icon="🏢" />
        <StatCard label="Countries" value={stats.uniqueCountries} icon="🌍" />
        <StatCard
          label="Top Provider"
          value={stats.topProvider?.[0] || '—'}
          subValue={stats.topProvider ? `${stats.topProvider[1]} launches` : ''}
          icon="⭐"
          isText
        />
      </SimpleGrid>

      {Object.keys(stats.statuses).length > 1 && (
        <Flex mt={4} gap={2} flexWrap="wrap">
          {Object.entries(stats.statuses).map(([status, count]) => (
            <Flex
              key={status}
              align="center"
              gap={1.5}
              px={3}
              py={1.5}
              bg="gray.800"
              borderRadius="full"
              borderWidth="1px"
              borderColor="gray.700"
              fontSize="12px"
            >
              <Box w="8px" h="8px" borderRadius="full" bg={getStatusDotColor(status)} />
              <Text color="gray.300" fontWeight="500">{status}</Text>
              <Text color="gray.500">{count}</Text>
            </Flex>
          ))}
        </Flex>
      )}
    </Box>
  )
}

function StatCard({ label, value, subValue, icon, isText }) {
  return (
    <Box
      bg="gray.800"
      borderWidth="1px"
      borderColor="gray.700"
      borderRadius="lg"
      p={4}
      transition="border-color 0.2s"
      _hover={{ borderColor: 'gray.600' }}
    >
      <Flex justify="space-between" align="flex-start" mb={2}>
        <Text fontSize="12px" color="gray.500" fontWeight="500" textTransform="uppercase" letterSpacing="0.5px">
          {label}
        </Text>
        <Text fontSize="16px" lineHeight={1}>{icon}</Text>
      </Flex>
      <Text
        fontFamily="'Space Grotesk', sans-serif"
        fontSize={isText ? '15px' : '28px'}
        fontWeight="700"
        color="gray.100"
        lineHeight={1.2}
        noOfLines={1}
      >
        {value}
      </Text>
      {subValue && (
        <Text fontSize="12px" color="gray.500" mt={1}>{subValue}</Text>
      )}
    </Box>
  )
}

function getStatusDotColor(status) {
  if (status.includes('Go') || status.includes('Success')) return 'green.400'
  if (status.includes('TBD') || status.includes('Hold')) return 'yellow.400'
  if (status.includes('Fail')) return 'red.400'
  if (status.includes('Flight')) return 'blue.400'
  return 'gray.400'
}

export default LaunchStats
