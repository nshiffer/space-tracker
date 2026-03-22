import { Card } from 'pixel-retroui'
import { theme } from '../theme'
import Countdown from './Countdown'

function NextLaunchBanner({ launch }) {
  return (
    <div
      className="py-8 md:py-10"
      style={{
        backgroundColor: theme.panel,
        borderBottom: `3px solid ${theme.border}`,
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <Card
          bg={theme.bg}
          textColor={theme.text}
          borderColor={theme.green}
          shadowColor={theme.purple}
          className="p-4 md:p-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
            <div className="text-center md:text-left">
              <div
                className="font-pixel text-[10px] inline-block px-3 py-1.5 mb-3"
                style={{
                  backgroundColor: theme.green,
                  color: theme.bg,
                }}
              >
                &gt; MISSION BRIEFING
              </div>
              <h2
                className="font-pixel text-xs md:text-sm mb-3 leading-relaxed glow-blue"
                style={{ color: theme.blue }}
              >
                {launch.name}
              </h2>
              <p className="font-retro text-xl mb-1" style={{ color: theme.text }}>
                {launch.launch_service_provider?.name || 'Unknown Provider'}
              </p>
              {launch.pad?.location?.name && (
                <p className="font-retro text-lg" style={{ color: theme.muted }}>
                  &gt; {launch.pad.location.name}
                </p>
              )}
            </div>
            <Countdown targetDate={launch.net} />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default NextLaunchBanner
