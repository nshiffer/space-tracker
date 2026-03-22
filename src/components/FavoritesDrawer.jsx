import { useEffect } from 'react'
import { Card } from 'pixel-retroui'
import { theme } from '../theme'

function FavoritesDrawer({ isOpen, onClose, favorites, onRemove }) {
  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-[900]"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        onClick={onClose}
      />
      <div
        className="fixed top-0 right-0 bottom-0 w-full sm:w-[380px] z-[901] overflow-y-auto"
        style={{
          backgroundColor: theme.bg,
          borderLeft: `3px solid ${theme.border}`,
        }}
      >
        <div
          className="flex justify-between items-center p-4"
          style={{ borderBottom: `2px solid ${theme.border}` }}
        >
          <h2 className="font-pixel text-[10px]" style={{ color: theme.yellow }}>
            &gt; SAVED MISSIONS
          </h2>
          <button
            onClick={onClose}
            className="font-pixel text-[10px] px-2 py-1 cursor-pointer border-none"
            style={{ backgroundColor: theme.red, color: theme.bg }}
          >
            X
          </button>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 gap-4">
            <span className="text-3xl">&#x1F4AB;</span>
            <p className="font-pixel text-[8px] text-center leading-relaxed" style={{ color: theme.muted }}>
              NO SAVED MISSIONS.
              <br />
              PRESS THE HEART TO
              <br />
              SAVE A LAUNCH.
            </p>
          </div>
        ) : (
          <div className="p-3 flex flex-col gap-2">
            {favorites.map((fav) => (
              <Card
                key={fav.id}
                bg={theme.panel}
                textColor={theme.text}
                borderColor={theme.border}
                shadowColor={theme.purple}
              >
                <div className="flex gap-3 items-center p-3">
                  <div
                    className="w-[44px] h-[44px] shrink-0 overflow-hidden"
                    style={{ border: `1px solid ${theme.border}`, backgroundColor: theme.bg }}
                  >
                    {fav.image ? (
                      <img src={fav.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg">&#x1F680;</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-pixel text-[8px] truncate" style={{ color: theme.text }}>
                      {fav.name}
                    </p>
                    <p className="font-retro text-base" style={{ color: theme.blue }}>
                      {fav.provider}
                    </p>
                    <p className="font-retro text-sm" style={{ color: theme.muted }}>
                      {new Date(fav.net).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(fav)}
                    className="font-pixel text-[8px] px-2 py-1 cursor-pointer shrink-0 border-none transition-colors"
                    style={{
                      backgroundColor: theme.panel,
                      color: theme.red,
                      border: `1px solid ${theme.red}`,
                    }}
                  >
                    DEL
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default FavoritesDrawer
