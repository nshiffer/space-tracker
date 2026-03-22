import { theme } from '../theme'

function FavoriteButton({ isFavorite, onToggle, size = 'md' }) {
  const isSmall = size === 'sm'

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onToggle()
      }}
      className={`font-pixel cursor-pointer transition-all hover:brightness-125 border-none flex items-center gap-1 ${isSmall ? 'text-[7px] px-1.5 py-0.5' : 'text-[8px] px-2 py-1'}`}
      style={{
        backgroundColor: isFavorite ? 'rgba(0, 255, 65, 0.15)' : theme.panel,
        color: isFavorite ? theme.green : theme.muted,
        border: `2px solid ${isFavorite ? theme.green : theme.muted}`,
      }}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <span>{isFavorite ? '\u2605' : '\u2606'}</span>
      <span>{isFavorite ? 'SAVED' : 'SAVE'}</span>
    </button>
  )
}

export default FavoriteButton
