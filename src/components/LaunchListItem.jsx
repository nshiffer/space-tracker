import { Card } from 'pixel-retroui'
import { theme, getStatusColor, getStatusLabel } from '../theme'
import FavoriteButton from './FavoriteButton'

function LaunchListItem({ launch, onClick, isFavorite, onToggleFavorite }) {
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
        className="overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row">
          <div
            className="w-full sm:w-[140px] h-[100px] sm:h-auto shrink-0 overflow-hidden"
            style={{ backgroundColor: theme.bg }}
          >
            {imageUrl ? (
              <img src={imageUrl} alt={launch.name} className="w-full h-full object-cover opacity-90" loading="lazy" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-pixel text-[8px] glow-blue" style={{ color: theme.blue }}>
                NO SIGNAL
              </div>
            )}
          </div>

          <div className="flex-1 p-3 flex flex-col justify-center gap-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-pixel text-[9px] leading-[1.6] truncate" style={{ color: theme.text }}>
                {launch.name}
              </h3>
              <div className="flex gap-1.5 shrink-0 items-center">
                <span
                  className="font-pixel text-[7px] px-1.5 py-0.5"
                  style={{ backgroundColor: statusColor, color: theme.bg }}
                >
                  {getStatusLabel(launch.status?.abbrev)}
                </span>
                <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} size="sm" />
              </div>
            </div>

            <div className="font-retro text-base" style={{ color: theme.muted }}>
              {launchDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              {' \u00B7 '}
              {launchDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              <span className="ml-3" style={{ color: theme.blue }}>
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
