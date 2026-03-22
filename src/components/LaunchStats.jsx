import { useMemo } from 'react'
import { Card } from 'pixel-retroui'
import { theme } from '../theme'

function LaunchStats({ launches, filter }) {
  const stats = useMemo(() => {
    if (!launches || launches.length === 0) return null

    const providers = {}
    const statuses = {}
    const countries = {}

    launches.forEach((l) => {
      const provider = l.launch_service_provider?.name || 'Unknown'
      providers[provider] = (providers[provider] || 0) + 1

      const status = l.status?.name || 'Unknown'
      statuses[status] = (statuses[status] || 0) + 1

      const country = l.pad?.location?.country_code || 'Unknown'
      countries[country] = (countries[country] || 0) + 1
    })

    const topProvider = Object.entries(providers).sort((a, b) => b[1] - a[1])[0]
    const uniqueProviders = Object.keys(providers).length
    const uniqueCountries = Object.keys(countries).length

    return {
      total: launches.length,
      topProvider,
      uniqueProviders,
      uniqueCountries,
      statuses,
    }
  }, [launches])

  if (!stats) return null

  return (
    <div className="mb-8">
      <h3 className="font-pixel text-[10px] mb-4 glow-yellow" style={{ color: theme.yellow }}>
        &gt; HIGH SCORES - {filter === 'upcoming' ? 'UPCOMING' : 'PREVIOUS'}
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="LAUNCHES" value={stats.total} />
        <StatCard label="PROVIDERS" value={stats.uniqueProviders} />
        <StatCard label="COUNTRIES" value={stats.uniqueCountries} />
        <StatCard
          label="TOP PLAYER"
          value={stats.topProvider?.[0] || '\u2014'}
          subValue={stats.topProvider ? `${stats.topProvider[1]} LAUNCHES` : ''}
          isText
        />
      </div>

      {Object.keys(stats.statuses).length > 1 && (
        <div className="flex mt-3 gap-2 flex-wrap">
          {Object.entries(stats.statuses).map(([status, count]) => (
            <span
              key={status}
              className="font-pixel text-[8px] px-2 py-1 flex items-center gap-1.5"
              style={{
                backgroundColor: theme.panel,
                border: `1px solid ${theme.border}`,
                color: theme.text,
              }}
            >
              <span
                className="inline-block w-2 h-2"
                style={{ backgroundColor: getStatusDotColor(status) }}
              />
              {status.toUpperCase()} {count}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value, subValue, isText }) {
  return (
    <Card
      bg={theme.panel}
      textColor={theme.text}
      borderColor={theme.border}
      shadowColor={theme.purple}
      className="p-3"
    >
      <p className="font-pixel text-[7px] mb-2" style={{ color: theme.muted }}>
        {label}
      </p>
      <p
        className={`font-pixel glow-green ${isText ? 'text-[9px] leading-relaxed' : 'text-lg'} truncate`}
        style={{ color: theme.green }}
      >
        {value}
      </p>
      {subValue && (
        <p className="font-retro text-sm mt-1" style={{ color: theme.muted }}>
          {subValue}
        </p>
      )}
    </Card>
  )
}

function getStatusDotColor(status) {
  if (status.includes('Go') || status.includes('Success')) return theme.green
  if (status.includes('TBD') || status.includes('Hold')) return theme.yellow
  if (status.includes('Fail')) return theme.red
  if (status.includes('Flight')) return theme.blue
  return theme.muted
}

export default LaunchStats
