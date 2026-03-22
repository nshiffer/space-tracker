import { Box, Flex, Text } from '@chakra-ui/react'

function Header() {
  return (
    <Box
      as="header"
      bg="rgba(17, 24, 39, 0.92)"
      borderBottomWidth="1px"
      borderColor="gray.800"
      position="sticky"
      top={0}
      zIndex={100}
      backdropFilter="blur(12px)"
    >
      <Flex maxW="1200px" mx="auto" px={{ base: 4, md: 6 }} py={4} justify="space-between" align="center">
        <Flex align="center" gap={3}>
          <Text fontSize="28px" lineHeight={1} role="img" aria-label="rocket">🚀</Text>
          <Text
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="22px"
            fontWeight="700"
            bgGradient="to-r"
            gradientFrom="blue.400"
            gradientTo="purple.400"
            bgClip="text"
          >
            Space Tracker
          </Text>
        </Flex>
        <Flex gap={{ base: 4, md: 6 }}>
          {[
            { label: 'NASA', href: 'https://www.nasa.gov/' },
            { label: 'SpaceX', href: 'https://www.spacex.com/' },
            { label: 'API', href: 'https://thespacedevs.com/' },
          ].map((link) => (
            <Box
              key={link.label}
              as="a"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              color="gray.400"
              fontSize="14px"
              fontWeight="500"
              _hover={{ color: 'gray.100' }}
              transition="color 0.2s"
              textDecoration="none"
            >
              {link.label}
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header
