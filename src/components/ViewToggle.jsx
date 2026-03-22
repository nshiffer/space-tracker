import { Flex, Box } from '@chakra-ui/react'

function ViewToggle({ view, setView }) {
  return (
    <Flex
      bg="gray.800"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.700"
      overflow="hidden"
    >
      <Box
        as="button"
        p={2}
        bg={view === 'grid' ? 'blue.500' : 'transparent'}
        color={view === 'grid' ? 'white' : 'gray.400'}
        border="none"
        cursor="pointer"
        _hover={{ color: 'white' }}
        transition="all 0.2s"
        display="flex"
        alignItems="center"
        justifyContent="center"
        aria-label="Grid view"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      </Box>
      <Box
        as="button"
        p={2}
        bg={view === 'list' ? 'blue.500' : 'transparent'}
        color={view === 'list' ? 'white' : 'gray.400'}
        border="none"
        cursor="pointer"
        _hover={{ color: 'white' }}
        transition="all 0.2s"
        display="flex"
        alignItems="center"
        justifyContent="center"
        aria-label="List view"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      </Box>
    </Flex>
  )
}

export default ViewToggle
