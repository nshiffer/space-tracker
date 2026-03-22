import { Box } from '@chakra-ui/react'

function FavoriteButton({ isFavorite, onToggle, size = 'md' }) {
  const sizes = {
    sm: { w: '32px', h: '32px', icon: 16 },
    md: { w: '36px', h: '36px', icon: 18 },
  }
  const s = sizes[size] || sizes.md

  return (
    <Box
      as="button"
      onClick={(e) => {
        e.stopPropagation()
        onToggle()
      }}
      w={s.w}
      h={s.h}
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="full"
      bg={isFavorite ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0, 0, 0, 0.4)'}
      border="none"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{
        bg: isFavorite ? 'rgba(239, 68, 68, 0.25)' : 'rgba(0, 0, 0, 0.6)',
        transform: 'scale(1.1)',
      }}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 24 24"
        fill={isFavorite ? '#ef4444' : 'none'}
        stroke={isFavorite ? '#ef4444' : '#9ca3af'}
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </Box>
  )
}

export default FavoriteButton
