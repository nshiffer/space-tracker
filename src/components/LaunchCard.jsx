import { Box, Flex, Text, Image } from '@chakra-ui/react'
import FavoriteButton from './FavoriteButton'

function LaunchCard({ launch, onClick, isFavorite, onToggleFavorite }) {
  const launchDate = new Date(launch.net)
  const statusColor = getStatusColor(launch.status?.abbrev)
  const imageUrl = launch.image?.image_url || launch.image?.thumbnail_url || null

  return (
    <Box
      as="article"
      bg="gray.800"
      borderWidth="1px"
      borderColor="gray.700"
      borderRadius="xl"
      overflow="hidden"
      cursor="pointer"
      onClick={onClick}
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        borderColor: 'blue.500',
        boxShadow: '0 8px 32px rgba(59, 130, 246, 0.2)',
      }}
    >
      <Box position="relative" h="200px" overflow="hidden" bg="gray.900">
        {imageUrl ? (
          <Image src={imageUrl} alt={launch.name} w="100%" h="100%" objectFit="cover" loading="lazy" />
        ) : (
          <Flex
            w="100%"
            h="100%"
            align="center"
            justify="center"
            fontSize="48px"
            bgGradient="to-br"
            gradientFrom="gray.900"
            gradientTo="gray.800"
          >
            🚀
          </Flex>
        )}
        <Flex position="absolute" top={3} right={3} gap={2}>
          <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} size="sm" />
          <Box
            px={2.5}
            py={1}
            borderRadius="sm"
            fontSize="11px"
            fontWeight="700"
            color="white"
            textTransform="uppercase"
            letterSpacing="0.5px"
            bg={statusColor}
          >
            {launch.status?.name || 'Unknown'}
          </Box>
        </Flex>
      </Box>

      <Box p={5}>
        <Text
          fontFamily="'Space Grotesk', sans-serif"
          fontSize="16px"
          fontWeight="600"
          mb={3}
          lineHeight={1.3}
          noOfLines={2}
          color="gray.100"
        >
          {launch.name}
        </Text>

        <Flex gap={4} mb={3} flexWrap="wrap">
          <MetaItem
            icon={<CalendarIcon />}
            text={launchDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          />
          <MetaItem
            icon={<ClockIcon />}
            text={launchDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}
          />
        </Flex>

        <Text fontSize="14px" color="blue.400" fontWeight="500" mb={1.5}>
          {launch.launch_service_provider?.name || 'Unknown Provider'}
        </Text>

        {launch.pad?.location?.name && (
          <Flex align="center" gap={1.5} color="gray.500" fontSize="13px">
            <LocationIcon />
            <Text>{launch.pad.location.name}</Text>
          </Flex>
        )}
      </Box>
    </Box>
  )
}

function MetaItem({ icon, text }) {
  return (
    <Flex align="center" gap={1.5} color="gray.400" fontSize="13px">
      <Box color="gray.500" flexShrink={0}>{icon}</Box>
      <Text>{text}</Text>
    </Flex>
  )
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function getStatusColor(abbrev) {
  switch (abbrev) {
    case 'Go': return 'green.500'
    case 'TBD': return 'yellow.500'
    case 'Success': return 'green.500'
    case 'Failure': return 'red.500'
    case 'Hold': return 'yellow.500'
    case 'In Flight': return 'blue.500'
    default: return 'gray.500'
  }
}

export default LaunchCard
