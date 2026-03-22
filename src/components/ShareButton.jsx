import { useState } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'

function ShareButton({ launch }) {
  const [copied, setCopied] = useState(false)

  const shareData = {
    title: launch.name,
    text: `${launch.name} - ${launch.launch_service_provider?.name || 'Space Launch'}`,
    url: window.location.href,
  }

  const handleShare = async (e) => {
    e.stopPropagation()
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        // user cancelled
      }
    } else {
      const text = `${shareData.title}\n${shareData.text}\n${shareData.url}`
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Box
      as="button"
      onClick={handleShare}
      bg="transparent"
      border="1px solid"
      borderColor="gray.600"
      color="gray.300"
      borderRadius="md"
      px={3}
      py={1.5}
      fontSize="13px"
      fontWeight="500"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ borderColor: 'blue.500', color: 'blue.400' }}
      display="inline-flex"
      alignItems="center"
      gap={1.5}
    >
      {copied ? (
        <Flex align="center" gap={1.5}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20,6 9,17 4,12" />
          </svg>
          <Text as="span">Copied!</Text>
        </Flex>
      ) : (
        <Flex align="center" gap={1.5}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          <Text as="span">Share</Text>
        </Flex>
      )}
    </Box>
  )
}

export default ShareButton
