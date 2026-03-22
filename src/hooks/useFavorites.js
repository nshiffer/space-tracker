import { useState, useCallback } from 'react'

const STORAGE_KEY = 'space-tracker-favorites'

function loadFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

function saveFavorites(favorites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  } catch {
    // localStorage full or unavailable
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(loadFavorites)

  const toggleFavorite = useCallback((launch) => {
    setFavorites((prev) => {
      const next = { ...prev }
      if (next[launch.id]) {
        delete next[launch.id]
      } else {
        next[launch.id] = {
          id: launch.id,
          name: launch.name,
          net: launch.net,
          provider: launch.launch_service_provider?.name || 'Unknown',
          image: launch.image?.thumbnail_url || launch.image?.image_url || null,
          status: launch.status?.name || 'Unknown',
          statusAbbrev: launch.status?.abbrev || '',
          savedAt: Date.now(),
        }
      }
      saveFavorites(next)
      return next
    })
  }, [])

  const isFavorite = useCallback((launchId) => {
    return !!favorites[launchId]
  }, [favorites])

  const getFavoritesList = useCallback(() => {
    return Object.values(favorites).sort((a, b) => b.savedAt - a.savedAt)
  }, [favorites])

  return { favorites, toggleFavorite, isFavorite, getFavoritesList }
}
