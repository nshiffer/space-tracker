import { theme } from '../theme'

function FavoriteButton({ isFavorite, onToggle, size = 'md' }) {
  const isSmall = size === 'sm'
  const dim = isSmall ? 24 : 28

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onToggle()
      }}
      className="cursor-pointer transition-all hover:scale-110 flex items-center justify-center border-none"
      style={{
        width: dim,
        height: dim,
        backgroundColor: isFavorite ? 'rgba(255, 215, 0, 0.2)' : 'rgba(0, 0, 0, 0.5)',
        color: isFavorite ? theme.yellow : theme.muted,
        border: `2px solid ${isFavorite ? theme.yellow : 'rgba(139,139,139,0.4)'}`,
        fontSize: isSmall ? 12 : 14,
        lineHeight: 1,
      }}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '\u2605' : '\u2606'}
    </button>
  )
}

export default FavoriteButton
