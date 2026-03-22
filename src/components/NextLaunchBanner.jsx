import { Box, Flex, Text } from '@chakra-ui/react'
import Countdown from './Countdown'

function NextLaunchBanner({ launch }) {
  return (
    <Box
      bgGradient="to-br"
      gradientFrom="gray.900"
      gradientVia="#111d3a"
      gradientTo="gray.900"
      borderBottomWidth="1px"
      borderColor="gray.800"
      py={{ base: 8, md: 10 }}
    >
      <Flex
        maxW="1200px"
        mx="auto"
        px={{ base: 4, md: 6 }}
        justify="space-between"
        align="center"
        gap={8}
        direction={{ base: 'column', md: 'row' }}
        textAlign={{ base: 'center', md: 'left' }}
      >
        <Box>
          <Box
            display="inline-block"
            bg="blue.500"
            color="white"
            fontSize="11px"
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="1.5px"
            px={3}
            py={1}
            borderRadius="sm"
            mb={3}
          >
            Next Launch
          </Box>
          <Text
            fontFamily="'Space Grotesk', sans-serif"
            fontSize={{ base: '22px', md: '28px' }}
            fontWeight="700"
            color="gray.100"
            lineHeight={1.2}
            mb={2}
          >
            {launch.name}
          </Text>
          <Text color="gray.400" fontSize="16px" mb={1}>
            {launch.launch_service_provider?.name || 'Unknown Provider'}
          </Text>
          {launch.pad?.location?.name && (
            <Text color="gray.500" fontSize="14px">
              {launch.pad.location.name}
            </Text>
          )}
        </Box>
        <Countdown targetDate={launch.net} />
      </Flex>
    </Box>
  )
}

export default NextLaunchBanner
