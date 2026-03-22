import { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/react'

function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <Box
      as="button"
      position="fixed"
      bottom={6}
      right={6}
      w="44px"
      h="44px"
      borderRadius="full"
      bg="blue.500"
      color="white"
      border="none"
      cursor="pointer"
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="0 4px 20px rgba(59, 130, 246, 0.4)"
      transition="all 0.2s"
      _hover={{ bg: 'blue.400', transform: 'translateY(-2px)' }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      zIndex={50}
      aria-label="Scroll to top"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="18,15 12,9 6,15" />
      </svg>
    </Box>
  )
}

export default ScrollToTop
