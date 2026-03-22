import { useState, useEffect } from 'react'
import { Box, Flex, Input, Button } from '@chakra-ui/react'

function Filters({ filter, setFilter, searchQuery, setSearchQuery }) {
  const [localSearch, setLocalSearch] = useState(searchQuery)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localSearch)
    }, 500)
    return () => clearTimeout(timer)
  }, [localSearch, setSearchQuery])

  return (
    <Flex
      justify="space-between"
      align="center"
      gap={4}
      mb={8}
      direction={{ base: 'column', sm: 'row' }}
    >
      <Flex
        bg="gray.800"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="gray.700"
        overflow="hidden"
      >
        <Button
          px={6}
          py={2.5}
          bg={filter === 'upcoming' ? 'blue.500' : 'transparent'}
          color={filter === 'upcoming' ? 'white' : 'gray.400'}
          _hover={{ color: 'white' }}
          borderRadius="0"
          fontWeight="500"
          fontSize="14px"
          onClick={() => setFilter('upcoming')}
        >
          Upcoming
        </Button>
        <Button
          px={6}
          py={2.5}
          bg={filter === 'previous' ? 'blue.500' : 'transparent'}
          color={filter === 'previous' ? 'white' : 'gray.400'}
          _hover={{ color: 'white' }}
          borderRadius="0"
          fontWeight="500"
          fontSize="14px"
          onClick={() => setFilter('previous')}
        >
          Previous
        </Button>
      </Flex>
      <Box position="relative" flex={{ base: '1', sm: '0 1 300px' }} w={{ base: '100%', sm: 'auto' }}>
        <Box
          position="absolute"
          left={3}
          top="50%"
          transform="translateY(-50%)"
          color="gray.500"
          zIndex={1}
          pointerEvents="none"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </Box>
        <Input
          pl={10}
          bg="gray.800"
          borderColor="gray.700"
          color="gray.100"
          fontSize="14px"
          placeholder="Search launches..."
          _placeholder={{ color: 'gray.500' }}
          _focus={{ borderColor: 'blue.500' }}
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </Box>
    </Flex>
  )
}

export default Filters
