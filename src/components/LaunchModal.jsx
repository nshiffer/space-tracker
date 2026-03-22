import { useEffect } from 'react'
import { Card, Button } from 'pixel-retroui'
import { theme } from '../theme'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import ShareButton from './ShareButton'
import FavoriteButton from './FavoriteButton'

function LaunchModal({ launch, onClose, isFavorite, onToggleFavorite }) {
  useDocumentTitle(launch ? `${launch.name} - Space Tracker` : null)

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const launchDate = new Date(launch.net)
  const imageUrl = launch.image?.image_url || launch.image?.thumbnail_url || null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[1000] p-4 md:p-6"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
      onClick={onClose}
    >
      <div
        className="max-w-[640px] w-full max-h-[85vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <Card
          bg={theme.panel}
          textColor={theme.text}
          borderColor={theme.border}
          shadowColor={theme.purple}
          className="overflow-hidden"
        >
          {/* Top bar */}
          <div
            className="flex justify-between items-center px-4 py-2"
            style={{
              backgroundColor: theme.bg,
              borderBottom: `2px solid ${theme.border}`,
            }}
          >
            <span className="font-pixel text-[10px]" style={{ color: theme.green }}>
              &gt; MISSION DATA
            </span>
            <div className="flex gap-2 items-center">
              <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} size="sm" />
              <button
                onClick={onClose}
                className="font-pixel text-[10px] px-2 py-1 cursor-pointer border-none"
                style={{
                  backgroundColor: theme.red,
                  color: theme.bg,
                }}
              >
                X
              </button>
            </div>
          </div>

          {/* Image */}
          {imageUrl && (
            <div className="h-[200px] md:h-[260px] overflow-hidden">
              <img src={imageUrl} alt={launch.name} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Body */}
          <div className="p-5 md:p-6">
            <div className="flex justify-between items-start gap-3 flex-wrap mb-5">
              <h2 className="font-pixel text-xs md:text-sm leading-relaxed flex-1 glow-blue" style={{ color: theme.blue }}>
                {launch.name}
              </h2>
              <div className="flex gap-2 items-center shrink-0">
                <ShareButton launch={launch} />
                {launch.status?.name && (
                  <span
                    className="font-pixel text-[8px] px-2 py-1"
                    style={{
                      backgroundColor: theme.green,
                      color: theme.bg,
                    }}
                  >
                    {launch.status.name.toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-2 mb-5">
              <DetailRow label="DATE" value={launchDate.toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
              })} />
              <DetailRow label="TIME" value={launchDate.toLocaleTimeString('en-US', {
                hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short',
              })} />
              <DetailRow label="PROVIDER" value={launch.launch_service_provider?.name} />
              <DetailRow label="ROCKET" value={launch.rocket?.configuration?.full_name} />
              <DetailRow label="PAD" value={launch.pad?.name} />
              <DetailRow label="LOCATION" value={launch.pad?.location?.name} />
            </div>

            {/* Mission */}
            {launch.mission && (
              <div
                className="pt-4 mt-2"
                style={{ borderTop: `2px solid ${theme.border}` }}
              >
                <h3 className="font-pixel text-[10px] mb-3" style={{ color: theme.yellow }}>
                  &gt; MISSION: {launch.mission.name}
                </h3>
                {launch.mission.type && (
                  <span
                    className="font-pixel text-[8px] inline-block px-2 py-1 mb-3"
                    style={{
                      backgroundColor: 'rgba(77, 201, 246, 0.15)',
                      color: theme.blue,
                      border: `1px solid ${theme.blue}`,
                    }}
                  >
                    {launch.mission.type.toUpperCase()}
                  </span>
                )}
                {launch.mission.description && (
                  <p className="font-retro text-lg leading-relaxed mb-2" style={{ color: theme.muted }}>
                    {launch.mission.description}
                  </p>
                )}
                {launch.mission.orbit?.name && (
                  <p className="font-retro text-base mt-2" style={{ color: theme.purple }}>
                    ORBIT: {launch.mission.orbit.name}
                  </p>
                )}
              </div>
            )}

            {/* Video Links */}
            {launch.vidURLs?.length > 0 && (
              <div
                className="pt-4 mt-4"
                style={{ borderTop: `2px solid ${theme.border}` }}
              >
                <h3 className="font-pixel text-[10px] mb-3" style={{ color: theme.green }}>
                  &gt; WATCH LIVE
                </h3>
                <div className="flex flex-wrap gap-2">
                  {launch.vidURLs.map((vid, i) => (
                    <a
                      key={i}
                      href={vid.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        bg={theme.blue}
                        textColor={theme.bg}
                        borderColor={theme.border}
                        shadow={theme.purple}
                        className="font-pixel !text-[8px]"
                      >
                        {(vid.title || `STREAM ${i + 1}`).toUpperCase()}
                      </Button>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

function DetailRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex gap-3">
      <span className="font-pixel text-[8px] min-w-[80px] pt-1" style={{ color: theme.purple }}>
        {label}
      </span>
      <span className="font-retro text-lg" style={{ color: theme.text }}>
        {value}
      </span>
    </div>
  )
}

export default LaunchModal
