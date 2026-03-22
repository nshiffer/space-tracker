import { Box, Flex, Text, Image } from '@chakra-ui/react'
import FavoriteButton from './FavoriteButton'

function LaunchListItem({ launch, onClick, isFavorite, onToggleFavorite }) {
  const launchDate = new Date(launch.net)
  const statusColor = getStatusColor(launch.status?.abbrev)
  const imageUrl = launch.image?.image_url || launch.image?.thumbnail_url || null

  return (
    <Flex
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
        borderColor: 'blue.500',
        boxShadow: '0 4px 16px rgba(59, 130, 246, 0.15)',
      }}
      gap={0}
      direction={{ base: 'column', sm: 'row' }}
    >
      <Box
        w={{ base: '100%', sm: '160px' }}
        h={{ base: '140px', sm: 'auto' }}
        minH={{ sm: '120px' }}
        flexShrink={0}
        overflow="hidden"
        bg="gray.900"
      >
        {imageUrl ? (
          <Image src={imageUrl} alt={launch.name} w="100%" h="100%" objectFit="cover" loading="lazy" />
        ) : (
          <Flex w="100%" h="100%" align="center" justify="center" fontSize="32px" bg="gray.900">🚀</Flex>
        )}
      </Box>

      <Flex flex={1} p={4} direction="column" justify="center" gap={1.5} minW={0}>
        <Flex justify="space-between" align="flex-start" gap={2}>
          <Text
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="15px"
            fontWeight="600"
            color="gray.100"
            noOfLines={1}
            lineHeight={1.3}
          >
            {launch.name}
          </Text>
          <Flex gap={2} flexShrink={0} align="center">
            <Box
              px={2}
              py={0.5}
              borderRadius="sm"
              fontSize="10px"
              fontWeight="700"
              color="white"
              textTransform="uppercase"
              letterSpacing="0.5px"
              bg={statusColor}
            >
              {launch.status?.name || 'Unknown'}
            </Box>
            <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} size="sm" />
          </Flex>
        </Flex>

        <Flex gap={4} flexWrap="wrap" fontSize="13px" color="gray.400">
          <Text>
            {launchDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            {' · '}
            {launchDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </Text>
          <Text color="blue.400" fontWeight="500">
            {launch.launch_service_provider?.name || 'Unknown Provider'}
          </Text>
        </Flex>

        {launch.pad?.location?.name && (
          <Flex align="center" gap={1.5} color="gray.500" fontSize="12px">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <Text noOfLines={1}>{launch.pad.location.name}</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
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

export default LaunchListItem
