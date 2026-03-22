import { Card } from 'pixel-retroui'
import { theme, getStatusColor, getStatusLabel } from '../theme'
import FavoriteButton from './FavoriteButton'

function LaunchListItem({ launch, onClick, isFavorite, onToggleFavorite }) {
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
        className="overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row">
          <div
            className="w-full sm:w-[140px] h-[120px] sm:h-auto shrink-0 overflow-hidden"
            style={{ backgroundColor: theme.bg }}
          >
            {imageUrl ? (
              <img src={imageUrl} alt={launch.name} className="w-full h-full object-cover" loading="lazy" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl" style={{ backgroundColor: theme.bg }}>
                &#x1F680;
              </div>
            )}
          </div>

          <div className="flex-1 p-4 flex flex-col justify-center gap-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-pixel text-[10px] leading-relaxed truncate" style={{ color: theme.text }}>
                {launch.name}
              </h3>
              <div className="flex gap-2 shrink-0 items-center">
                <span
                  className="font-pixel text-[8px] px-2 py-1"
                  style={{ backgroundColor: statusColor, color: theme.bg }}
                >
                  {getStatusLabel(launch.status?.abbrev)}
                </span>
                <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} size="sm" />
              </div>
            </div>

            <div className="font-retro text-base flex gap-3 flex-wrap" style={{ color: theme.muted }}>
              <span>
                {launchDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                {' \u00B7 '}
                {launchDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span style={{ color: theme.blue }}>
                {launch.launch_service_provider?.name || 'Unknown Provider'}
              </span>
            </div>

            {launch.pad?.location?.name && (
              <p className="font-retro text-base" style={{ color: theme.muted }}>
                &gt; {launch.pad.location.name}
              </p>
            )}
          </div>
        </div>
      </Card>
    </article>
  )
}

export default LaunchListItem
