import './LaunchCard.css'

function LaunchCard({ launch, onClick }) {
  const launchDate = new Date(launch.net)
  const statusColor = getStatusColor(launch.status?.abbrev)
  const imageUrl = launch.image?.image_url || launch.image?.thumbnail_url || null

  return (
    <article className="launch-card" onClick={onClick}>
      <div className="card-image">
        {imageUrl ? (
          <img src={imageUrl} alt={launch.name} loading="lazy" />
        ) : (
          <div className="card-image-placeholder">
            <span role="img" aria-label="rocket">🚀</span>
          </div>
        )}
        <span className="status-badge" style={{ background: statusColor }}>
          {launch.status?.name || 'Unknown'}
        </span>
      </div>
      <div className="card-content">
        <h3 className="card-title">{launch.name}</h3>
        <div className="card-meta">
          <div className="card-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{launchDate.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}</span>
          </div>
          <div className="card-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
            <span>{launchDate.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'short',
            })}</span>
          </div>
        </div>
        <p className="card-provider">
          {launch.launch_service_provider?.name || 'Unknown Provider'}
        </p>
        {launch.pad?.location?.name && (
          <p className="card-location">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {launch.pad.location.name}
          </p>
        )}
      </div>
    </article>
  )
}

function getStatusColor(abbrev) {
  switch (abbrev) {
    case 'Go': return 'var(--success)'
    case 'TBD': return 'var(--warning)'
    case 'Success': return 'var(--success)'
    case 'Failure': return 'var(--danger)'
    case 'Hold': return 'var(--warning)'
    case 'In Flight': return 'var(--accent)'
    default: return 'var(--text-muted)'
  }
}

export default LaunchCard
