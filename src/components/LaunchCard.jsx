import { Card } from 'pixel-retroui'
import { theme, getStatusColor, getStatusLabel } from '../theme'
import FavoriteButton from './FavoriteButton'

function LaunchCard({ launch, onClick, isFavorite, onToggleFavorite }) {
  const launchDate = new Date(launch.net)
  const statusColor = getStatusColor(launch.status?.abbrev)
  const imageUrl = typeof launch.image === 'string' ? launch.image : (launch.image?.image_url || launch.image?.thumbnail_url || null)

  return (
    <article className="retro-card cursor-pointer" onClick={onClick}>
      <Card
        bg={theme.panel}
        textColor={theme.text}
        borderColor={theme.border}
        shadowColor="transparent"
        className="overflow-hidden h-full"
      >
        <div className="relative h-[180px] overflow-hidden" style={{ backgroundColor: theme.bg }}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={launch.name}
              className="w-full h-full object-cover opacity-90"
              loading="lazy"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, #0a0a1a 0%, ${theme.panel} 50%, #0a0a1a 100%)`,
              }}
            >
              <span className="font-pixel text-[10px] glow-blue" style={{ color: theme.blue }}>
                NO SIGNAL
              </span>
            </div>
          )}
          {/* Overlay gradient for text readability */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(15,15,35,0.8) 0%, transparent 50%)' }}
          />
          <div className="absolute top-2 right-2 flex gap-1.5 items-center">
            <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} size="sm" />
            <span
              className="font-pixel text-[8px] px-2 py-1"
              style={{
                backgroundColor: statusColor,
                color: theme.bg,
              }}
            >
              {getStatusLabel(launch.status?.abbrev)}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3
            className="font-pixel text-[9px] leading-[1.6] mb-2 line-clamp-2"
            style={{ color: theme.text }}
          >
            {launch.name}
          </h3>

          <div className="font-retro text-base mb-2" style={{ color: theme.muted }}>
            {launchDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            {' \u00B7 '}
            {launchDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </div>

          <p className="font-retro text-lg mb-1" style={{ color: theme.blue }}>
            {launch.launch_service_provider?.name || 'Unknown Provider'}
          </p>

          {launch.pad?.location?.name && (
            <p className="font-retro text-base" style={{ color: theme.muted }}>
              &gt; {launch.pad.location.name}
            </p>
          )}
        </div>
      </Card>
    </article>
  )
}

export default LaunchCard
