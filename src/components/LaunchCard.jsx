import { Card } from 'pixel-retroui'
import { theme, getStatusColor, getStatusLabel } from '../theme'
import FavoriteButton from './FavoriteButton'

function LaunchCard({ launch, onClick, isFavorite, onToggleFavorite }) {
  const launchDate = new Date(launch.net)
  const statusColor = getStatusColor(launch.status?.abbrev)
  const imageUrl = launch.image?.image_url || launch.image?.thumbnail_url || null

  return (
    <article className="retro-card cursor-pointer" onClick={onClick}>
      <Card
        bg={theme.panel}
        textColor={theme.text}
        borderColor={theme.border}
        shadowColor={theme.purple}
        className="overflow-hidden h-full"
      >
        <div className="relative h-[180px] overflow-hidden" style={{ backgroundColor: theme.bg }}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={launch.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-4xl"
              style={{ background: `linear-gradient(135deg, ${theme.bg}, ${theme.panel})` }}
            >
              &#x1F680;
            </div>
          )}
          <div className="absolute top-2 right-2 flex gap-2 items-center">
            <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} size="sm" />
            <span
              className="font-pixel text-[8px] px-2 py-1"
              style={{
                backgroundColor: statusColor,
                color: theme.bg,
                border: `1px solid ${theme.bg}`,
              }}
            >
              {getStatusLabel(launch.status?.abbrev)}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3
            className="font-pixel text-[10px] leading-relaxed mb-3 line-clamp-2"
            style={{ color: theme.text }}
          >
            {launch.name}
          </h3>

          <div className="flex gap-3 mb-3 flex-wrap font-retro text-base">
            <span style={{ color: theme.muted }}>
              {launchDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span style={{ color: theme.muted }}>
              {launchDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </span>
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
