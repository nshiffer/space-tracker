import { useEffect } from 'react'
import { Box, Flex, Text, Image } from '@chakra-ui/react'

function FavoritesDrawer({ isOpen, onClose, favorites, onRemove }) {
  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      <Box
        position="fixed"
        inset={0}
        bg="rgba(0,0,0,0.5)"
        zIndex={900}
        onClick={onClose}
      />
      <Box
        position="fixed"
        top={0}
        right={0}
        bottom={0}
        w={{ base: '100%', sm: '380px' }}
        bg="gray.900"
        borderLeftWidth="1px"
        borderColor="gray.700"
        zIndex={901}
        overflowY="auto"
        transition="transform 0.3s"
      >
        <Flex justify="space-between" align="center" p={5} borderBottomWidth="1px" borderColor="gray.800">
          <Text fontFamily="'Space Grotesk', sans-serif" fontSize="18px" fontWeight="700" color="gray.100">
            Saved Launches
          </Text>
          <Box
            as="button"
            onClick={onClose}
            color="gray.400"
            bg="transparent"
            border="none"
            cursor="pointer"
            _hover={{ color: 'gray.100' }}
            p={1}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </Box>
        </Flex>

        {favorites.length === 0 ? (
          <Flex direction="column" align="center" justify="center" py={16} px={6} gap={3}>
            <Text fontSize="40px">💫</Text>
            <Text color="gray.500" textAlign="center" fontSize="15px">
              No saved launches yet. Click the heart icon on any launch to save it here.
            </Text>
          </Flex>
        ) : (
          <Box p={3}>
            {favorites.map((fav) => (
              <Flex
                key={fav.id}
                p={3}
                mb={2}
                bg="gray.800"
                borderRadius="lg"
                borderWidth="1px"
                borderColor="gray.700"
                gap={3}
                align="center"
                _hover={{ borderColor: 'gray.600' }}
                transition="border-color 0.2s"
              >
                <Box w="48px" h="48px" borderRadius="md" overflow="hidden" flexShrink={0} bg="gray.700">
                  {fav.image ? (
                    <Image src={fav.image} alt="" w="100%" h="100%" objectFit="cover" />
                  ) : (
                    <Flex w="100%" h="100%" align="center" justify="center" fontSize="20px">🚀</Flex>
                  )}
                </Box>
                <Box flex={1} minW={0}>
                  <Text fontSize="14px" fontWeight="600" color="gray.100" noOfLines={1}>
                    {fav.name}
                  </Text>
                  <Text fontSize="12px" color="gray.400">
                    {fav.provider}
                  </Text>
                  <Text fontSize="11px" color="gray.500">
                    {new Date(fav.net).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </Text>
                </Box>
                <Box
                  as="button"
                  onClick={() => onRemove(fav)}
                  color="gray.500"
                  bg="transparent"
                  border="none"
                  cursor="pointer"
                  _hover={{ color: 'red.400' }}
                  p={1}
                  flexShrink={0}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3,6 5,6 21,6" />
                    <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6M8,6V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6" />
                  </svg>
                </Box>
              </Flex>
            ))}
          </Box>
        )}
      </Box>
    </>
  )
}

export default FavoritesDrawer
