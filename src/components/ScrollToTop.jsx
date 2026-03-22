import { useState, useEffect } from 'react'
import { Button } from 'pixel-retroui'
import { theme } from '../theme'

function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        bg={theme.purple}
        textColor={theme.bg}
        borderColor={theme.border}
        shadow={theme.bg}
        className="font-pixel !text-[10px] !px-3 !py-2"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        &uarr; TOP
      </Button>
    </div>
  )
}

export default ScrollToTop
