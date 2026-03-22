import { useState, useEffect } from 'react'
import './Countdown.css'

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

  return (
    <div className="countdown">
      {isPast ? (
        <div className="countdown-past">Launch window reached</div>
      ) : (
        <div className="countdown-grid">
          <TimeBlock value={timeLeft.days} label="Days" />
          <span className="countdown-sep">:</span>
          <TimeBlock value={timeLeft.hours} label="Hours" />
          <span className="countdown-sep">:</span>
          <TimeBlock value={timeLeft.minutes} label="Min" />
          <span className="countdown-sep">:</span>
          <TimeBlock value={timeLeft.seconds} label="Sec" />
        </div>
      )}
    </div>
  )
}

function TimeBlock({ value, label }) {
  return (
    <div className="time-block">
      <span className="time-value">{String(value).padStart(2, '0')}</span>
      <span className="time-label">{label}</span>
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
