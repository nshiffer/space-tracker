import { useEffect } from 'react'

const DEFAULT_TITLE = 'Space Tracker - Track Upcoming Rocket Launches'

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title || DEFAULT_TITLE
    return () => {
      document.title = DEFAULT_TITLE
    }
  }, [title])
}
