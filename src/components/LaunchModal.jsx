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
  const imageUrl = typeof launch.image === 'string' ? launch.image : (launch.image?.image_url || launch.image?.thumbnail_url || null)

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
          shadowColor="transparent"
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
            <span className="font-pixel text-[9px]" style={{ color: theme.green }}>
              &gt; MISSION DATA
            </span>
            <div className="flex gap-2 items-center">
              <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} size="sm" />
              <button
                onClick={onClose}
                className="font-pixel text-[10px] w-6 h-6 flex items-center justify-center cursor-pointer"
                style={{
                  backgroundColor: theme.red,
                  color: theme.text,
                  border: `1px solid ${theme.border}`,
                }}
              >
                X
              </button>
            </div>
          </div>

          {/* Image */}
          {imageUrl && (
            <div className="h-[200px] md:h-[260px] overflow-hidden relative">
              <img src={imageUrl} alt={launch.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,26,46,0.7) 0%, transparent 40%)' }} />
            </div>
          )}

          {/* Body */}
          <div className="p-5 md:p-6">
            {/* Title row */}
            <div className="mb-5">
              <h2 className="font-pixel text-[11px] md:text-xs leading-[1.8] mb-2 glow-blue" style={{ color: theme.blue }}>
                {launch.name}
              </h2>
              <div className="flex gap-2 items-center flex-wrap">
                <ShareButton launch={launch} />
                {launch.status?.name && (
                  <span
                    className="font-pixel text-[7px] px-2 py-1"
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

            {/* Details table */}
            <div
              className="flex flex-col gap-1.5 mb-5 py-3 px-3"
              style={{
                backgroundColor: 'rgba(15, 15, 35, 0.5)',
                border: `1px solid ${theme.border}`,
              }}
            >
              <DetailRow label="DATE" value={launchDate.toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
              })} />
              <DetailRow label="TIME" value={launchDate.toLocaleTimeString('en-US', {
                hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short',
              })} />
              <DetailRow label="PROVIDER" value={launch.launch_service_provider?.name} highlight />
              <DetailRow label="ROCKET" value={launch.rocket?.configuration?.full_name} />
              <DetailRow label="PAD" value={launch.pad?.name} />
              <DetailRow label="LOCATION" value={launch.pad?.location?.name} />
            </div>

            {/* Mission */}
            {launch.mission && (
              <div
                className="pt-4 mt-2"
                style={{ borderTop: `1px solid ${theme.border}` }}
              >
                <h3 className="font-pixel text-[9px] mb-3" style={{ color: theme.yellow }}>
                  &gt; MISSION: {launch.mission.name}
                </h3>
                {launch.mission.type && (
                  <span
                    className="font-pixel text-[7px] inline-block px-2 py-1 mb-3"
                    style={{
                      backgroundColor: 'rgba(77, 201, 246, 0.1)',
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
                style={{ borderTop: `1px solid ${theme.border}` }}
              >
                <h3 className="font-pixel text-[9px] mb-3" style={{ color: theme.green }}>
                  &gt; WATCH LIVE
                </h3>
                <div className="flex flex-wrap gap-2">
                  {launch.vidURLs.map((vid, i) => (
                    <a
                      key={i}
                      href={vid.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline"
                    >
                      <Button
                        bg={theme.panel}
                        textColor={theme.green}
                        borderColor={theme.green}
                        shadow="transparent"
                        className="font-pixel !text-[7px] !leading-relaxed"
                      >
                        {(vid.title || `STREAM ${i + 1}`).toUpperCase().slice(0, 40)}
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

function DetailRow({ label, value, highlight }) {
  if (!value) return null
  return (
    <div className="flex gap-3">
      <span className="font-pixel text-[7px] min-w-[72px] pt-1" style={{ color: theme.purple }}>
        {label}
      </span>
      <span className="font-retro text-lg" style={{ color: highlight ? theme.blue : theme.text }}>
        {value}
      </span>
    </div>
  )
}

export default LaunchModal
