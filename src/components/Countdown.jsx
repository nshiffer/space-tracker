import { useState, useEffect } from 'react'
import { theme } from '../theme'

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  if (!targetDate) return null

  const isPast = timeLeft.total <= 0

  if (isPast) {
    return (
      <div
        className="font-pixel text-xs px-4 py-3 blink"
        style={{
          color: theme.yellow,
          border: `2px solid ${theme.yellow}`,
          backgroundColor: 'rgba(255, 215, 0, 0.1)',
        }}
      >
        LAUNCH WINDOW REACHED
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 md:gap-2 shrink-0">
      <TimeBlock value={timeLeft.days} label="DAYS" />
      <span className="font-pixel text-xl md:text-3xl glow-green pb-5" style={{ color: theme.green }}>:</span>
      <TimeBlock value={timeLeft.hours} label="HRS" />
      <span className="font-pixel text-xl md:text-3xl glow-green pb-5" style={{ color: theme.green }}>:</span>
      <TimeBlock value={timeLeft.minutes} label="MIN" />
      <span className="font-pixel text-xl md:text-3xl glow-green pb-5" style={{ color: theme.green }}>:</span>
      <TimeBlock value={timeLeft.seconds} label="SEC" />
    </div>
  )
}

function TimeBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="font-pixel text-lg md:text-3xl glow-green px-2 md:px-3 py-1.5 md:py-2 min-w-[48px] md:min-w-[72px] text-center"
        style={{
          color: theme.green,
          backgroundColor: theme.panel,
          border: `2px solid ${theme.green}`,
          boxShadow: `0 0 8px rgba(0, 255, 65, 0.2), inset 0 0 8px rgba(0, 255, 65, 0.05)`,
        }}
      >
        {String(value).padStart(2, '0')}
      </div>
      <span
        className="font-pixel text-[8px]"
        style={{ color: theme.muted }}
      >
        {label}
      </span>
    </div>
  )
}

function getTimeLeft(targetDate) {
  const total = new Date(targetDate) - new Date()
  if (total <= 0) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  }
}

export default Countdown
