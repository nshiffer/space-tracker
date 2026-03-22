import { useEffect } from 'react'
import './LaunchModal.css'

function LaunchModal({ launch, onClose }) {
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {imageUrl && (
          <div className="modal-image">
            <img src={imageUrl} alt={launch.name} />
          </div>
        )}

        <div className="modal-body">
          <div className="modal-header">
            <h2 className="modal-title">{launch.name}</h2>
            {launch.status?.name && (
              <span className="modal-status">{launch.status.name}</span>
            )}
          </div>

          <div className="modal-details">
            <DetailRow label="Date" value={launchDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })} />
            <DetailRow label="Time" value={launchDate.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              timeZoneName: 'long',
            })} />
            <DetailRow
              label="Provider"
              value={launch.launch_service_provider?.name}
            />
            <DetailRow
              label="Rocket"
              value={launch.rocket?.configuration?.full_name}
            />
            <DetailRow
              label="Launch Pad"
              value={launch.pad?.name}
            />
            <DetailRow
              label="Location"
              value={launch.pad?.location?.name}
            />
          </div>

          {launch.mission && (
            <div className="modal-section">
              <h3>Mission: {launch.mission.name}</h3>
              {launch.mission.type && (
                <span className="mission-type">{launch.mission.type}</span>
              )}
              {launch.mission.description && (
                <p className="mission-desc">{launch.mission.description}</p>
              )}
              {launch.mission.orbit?.name && (
                <p className="mission-orbit">
                  Orbit: {launch.mission.orbit.name}
                </p>
              )}
            </div>
          )}

          {launch.vidURLs?.length > 0 && (
            <div className="modal-section">
              <h3>Watch Live</h3>
              <div className="video-links">
                {launch.vidURLs.map((vid, i) => (
                  <a
                    key={i}
                    href={vid.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="video-link"
                  >
                    {vid.title || `Stream ${i + 1}`}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, value }) {
  if (!value) return null
  return (
    <div className="detail-row">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  )
}

export default LaunchModal
