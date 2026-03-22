import { useState, useEffect } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  if (!targetDate) return null

  const isPast = timeLeft.total <= 0

  if (isPast) {
    return (
      <Box
        color="yellow.400"
        fontSize="16px"
        fontWeight="500"
        px={6}
        py={3}
        bg="rgba(245, 158, 11, 0.1)"
        borderRadius="md"
        borderWidth="1px"
        borderColor="rgba(245, 158, 11, 0.3)"
      >
        Launch window reached
      </Box>
    )
  }

  return (
    <Flex align="center" gap={2} flexShrink={0}>
      <TimeBlock value={timeLeft.days} label="Days" />
      <Text fontFamily="'Space Grotesk', sans-serif" fontSize={{ base: '24px', md: '32px' }} fontWeight="700" color="blue.400" pb={{ base: 4, md: 5 }}>:</Text>
      <TimeBlock value={timeLeft.hours} label="Hours" />
      <Text fontFamily="'Space Grotesk', sans-serif" fontSize={{ base: '24px', md: '32px' }} fontWeight="700" color="blue.400" pb={{ base: 4, md: 5 }}>:</Text>
      <TimeBlock value={timeLeft.minutes} label="Min" />
      <Text fontFamily="'Space Grotesk', sans-serif" fontSize={{ base: '24px', md: '32px' }} fontWeight="700" color="blue.400" pb={{ base: 4, md: 5 }}>:</Text>
      <TimeBlock value={timeLeft.seconds} label="Sec" />
    </Flex>
  )
}

function TimeBlock({ value, label }) {
  return (
    <Flex direction="column" align="center" gap={1}>
      <Box
        fontFamily="'Space Grotesk', sans-serif"
        fontSize={{ base: '24px', md: '36px' }}
        fontWeight="700"
        color="gray.100"
        bg="gray.800"
        borderWidth="1px"
        borderColor="gray.700"
        borderRadius="md"
        px={{ base: 2, md: 3.5 }}
        py={{ base: 1.5, md: 2 }}
        minW={{ base: '52px', md: '70px' }}
        textAlign="center"
        lineHeight={1}
      >
        {String(value).padStart(2, '0')}
      </Box>
      <Text fontSize="11px" textTransform="uppercase" letterSpacing="1px" color="gray.500">
        {label}
      </Text>
    </Flex>
  )
}

function getTimeLeft(targetDate) {
  const total = new Date(targetDate) - new Date()
  if (total <= 0) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  }
}

export default Countdown
