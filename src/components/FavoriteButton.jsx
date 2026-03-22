import { theme } from '../theme'

function FavoriteButton({ isFavorite, onToggle, size = 'md' }) {
  const sizes = {
    sm: { w: 28, icon: 14 },
    md: { w: 32, icon: 16 },
  }
  const s = sizes[size] || sizes.md

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onToggle()
      }}
      className="flex items-center justify-center cursor-pointer transition-transform hover:scale-110 border-none"
      style={{
        width: s.w,
        height: s.w,
        backgroundColor: isFavorite ? 'rgba(255, 0, 64, 0.2)' : 'rgba(0, 0, 0, 0.5)',
        border: `2px solid ${isFavorite ? theme.red : theme.muted}`,
        color: isFavorite ? theme.red : theme.muted,
      }}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <span className="font-pixel" style={{ fontSize: s.icon - 2 }}>
        {isFavorite ? '\u2665' : '\u2661'}
      </span>
    </button>
  )
}

export default FavoriteButton
