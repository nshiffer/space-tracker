import { useEffect } from 'react'
import { Box, Flex, Text, Image, Button } from '@chakra-ui/react'

function LaunchModal({ launch, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const launchDate = new Date(launch.net)
  const imageUrl = launch.image?.image_url || launch.image?.thumbnail_url || null

  return (
    <Box
      position="fixed"
      inset={0}
      bg="rgba(0, 0, 0, 0.75)"
      backdropFilter="blur(4px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={1000}
      p={{ base: 4, md: 6 }}
      onClick={onClose}
    >
      <Box
        bg="gray.800"
        borderWidth="1px"
        borderColor="gray.700"
        borderRadius="xl"
        maxW="640px"
        w="100%"
        maxH="85vh"
        overflowY="auto"
        position="relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <Button
          position="absolute"
          top={3}
          right={3}
          bg="rgba(0, 0, 0, 0.5)"
          color="white"
          borderRadius="full"
          w="36px"
          h="36px"
          minW="36px"
          p={0}
          zIndex={10}
          _hover={{ bg: 'rgba(0, 0, 0, 0.8)' }}
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </Button>

        {/* Image */}
        {imageUrl && (
          <Box h={{ base: '200px', md: '280px' }} overflow="hidden">
            <Image src={imageUrl} alt={launch.name} w="100%" h="100%" objectFit="cover" />
          </Box>
        )}

        {/* Body */}
        <Box p={6}>
          <Flex justify="space-between" align="flex-start" gap={4} mb={6} flexWrap="wrap">
            <Text
              fontFamily="'Space Grotesk', sans-serif"
              fontSize={{ base: '20px', md: '24px' }}
              fontWeight="700"
              lineHeight={1.3}
              color="gray.100"
            >
              {launch.name}
            </Text>
            {launch.status?.name && (
              <Box
                flexShrink={0}
                px={3}
                py={1}
                borderRadius="sm"
                fontSize="11px"
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="0.5px"
                bg="blue.500"
                color="white"
              >
                {launch.status.name}
              </Box>
            )}
          </Flex>

          {/* Details */}
          <Flex direction="column" gap={3} mb={6}>
            <DetailRow label="Date" value={launchDate.toLocaleDateString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            })} />
            <DetailRow label="Time" value={launchDate.toLocaleTimeString('en-US', {
              hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'long',
            })} />
            <DetailRow label="Provider" value={launch.launch_service_provider?.name} />
            <DetailRow label="Rocket" value={launch.rocket?.configuration?.full_name} />
            <DetailRow label="Launch Pad" value={launch.pad?.name} />
            <DetailRow label="Location" value={launch.pad?.location?.name} />
          </Flex>

          {/* Mission */}
          {launch.mission && (
            <Box borderTopWidth="1px" borderColor="gray.700" pt={5} mt={1}>
              <Text fontFamily="'Space Grotesk', sans-serif" fontSize="16px" fontWeight="600" mb={3} color="gray.100">
                Mission: {launch.mission.name}
              </Text>
              {launch.mission.type && (
                <Box
                  display="inline-block"
                  px={2.5}
                  py={0.5}
                  bg="rgba(59, 130, 246, 0.15)"
                  color="blue.300"
                  borderRadius="sm"
                  fontSize="12px"
                  fontWeight="500"
                  mb={3}
                >
                  {launch.mission.type}
                </Box>
              )}
              {launch.mission.description && (
                <Text color="gray.400" fontSize="14px" lineHeight={1.7} mb={2}>
                  {launch.mission.description}
                </Text>
              )}
              {launch.mission.orbit?.name && (
                <Text color="gray.500" fontSize="13px" mt={2}>
                  Orbit: {launch.mission.orbit.name}
                </Text>
              )}
            </Box>
          )}

          {/* Video Links */}
          {launch.vidURLs?.length > 0 && (
            <Box borderTopWidth="1px" borderColor="gray.700" pt={5} mt={5}>
              <Text fontFamily="'Space Grotesk', sans-serif" fontSize="16px" fontWeight="600" mb={3} color="gray.100">
                Watch Live
              </Text>
              <Flex flexWrap="wrap" gap={2}>
                {launch.vidURLs.map((vid, i) => (
                  <Box
                    key={i}
                    as="a"
                    href={vid.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    display="inline-flex"
                    alignItems="center"
                    gap={2}
                    px={4}
                    py={2}
                    bg="blue.500"
                    color="white"
                    borderRadius="md"
                    fontSize="14px"
                    fontWeight="500"
                    textDecoration="none"
                    _hover={{ bg: 'blue.600' }}
                    transition="background 0.2s"
                  >
                    {vid.title || `Stream ${i + 1}`}
                  </Box>
                ))}
              </Flex>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

function DetailRow({ label, value }) {
  if (!value) return null
  return (
    <Flex gap={3}>
      <Text minW="90px" color="gray.500" fontSize="14px" fontWeight="500">
        {label}
      </Text>
      <Text color="gray.200" fontSize="14px">{value}</Text>
    </Flex>
  )
}

export default LaunchModal
