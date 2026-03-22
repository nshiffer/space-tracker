import { useState } from 'react'
import { theme } from '../theme'

function ShareButton({ launch }) {
  const [copied, setCopied] = useState(false)

  const shareData = {
    title: launch.name,
    text: `${launch.name} - ${launch.launch_service_provider?.name || 'Space Launch'}`,
    url: window.location.href,
  }

  const handleShare = async (e) => {
    e.stopPropagation()
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        // user cancelled
      }
    } else {
      const text = `${shareData.title}\n${shareData.text}\n${shareData.url}`
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleShare}
      className="font-pixel text-[8px] px-2 py-1 cursor-pointer inline-flex items-center gap-1 transition-colors border-none"
      style={{
        backgroundColor: 'transparent',
        color: copied ? theme.green : theme.muted,
        border: `1px solid ${copied ? theme.green : theme.muted}`,
      }}
    >
      {copied ? 'OK!' : 'SHARE'}
    </button>
  )
}

export default ShareButton
