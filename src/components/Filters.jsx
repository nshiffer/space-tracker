import { useState, useEffect } from 'react'
import { Box, Flex, Input, Button, Text } from '@chakra-ui/react'
import ViewToggle from './ViewToggle'

function Filters({ filter, setFilter, searchQuery, setSearchQuery, view, setView, favoritesCount, onOpenFavorites }) {
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
      gap={3}
      mb={8}
      direction={{ base: 'column', md: 'row' }}
    >
      <Flex gap={3} align="center" flexWrap="wrap" justify={{ base: 'center', md: 'flex-start' }}>
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

        <ViewToggle view={view} setView={setView} />

        <Box
          as="button"
          onClick={onOpenFavorites}
          display="flex"
          alignItems="center"
          gap={1.5}
          px={3}
          py={2}
          bg="gray.800"
          borderWidth="1px"
          borderColor="gray.700"
          borderRadius="lg"
          color="gray.400"
          fontSize="14px"
          fontWeight="500"
          cursor="pointer"
          transition="all 0.2s"
          _hover={{ borderColor: 'red.500', color: 'red.400' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={favoritesCount > 0 ? '#ef4444' : 'none'} stroke={favoritesCount > 0 ? '#ef4444' : 'currentColor'} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {favoritesCount > 0 && (
            <Text as="span" fontSize="12px" color="red.400" fontWeight="600">{favoritesCount}</Text>
          )}
        </Box>
      </Flex>

      <Box position="relative" flex={{ base: '1', md: '0 1 300px' }} w={{ base: '100%', md: 'auto' }}>
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
