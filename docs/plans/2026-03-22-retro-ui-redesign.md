# Space Tracker - 8-bit NES Retro UI Redesign

## Overview
Full visual overhaul of the Space Tracker app from Chakra UI to pixel-retroui with an 8-bit NES aesthetic.

## Stack Changes
- **Remove:** @chakra-ui/react, @emotion/react, @emotion/styled, framer-motion
- **Add:** pixel-retroui, tailwindcss v4, @tailwindcss/vite, Press Start 2P + VT323 fonts

## Color Palette
- Background: #0f0f23 (deep space navy)
- Card BG: #1a1a2e (dark panel)
- Border: #fefcd0 (warm cream/gold)
- Text: #fefcd0 (cream)
- Text Muted: #8b8b8b
- Accent Green: #00ff41 (GO status, countdown)
- Accent Red: #ff0040 (failure, favorites)
- Accent Blue: #4dc9f6 (links, info)
- Accent Purple: #c381b5 (shadows, highlights)

## Typography
- Press Start 2P: Headers, countdown, stats, buttons
- VT323: Body text, descriptions, dates

## Components
- pixel-retroui: Card, Button, Input, Popup, ProgressBar, Dropdown, Bubble
- Custom: CountdownDisplay, StatusBadge, FavoriteHeart, ScanlineOverlay, StarField, SlideDrawer

## Implementation Steps
1. Swap dependencies (remove Chakra, add pixel-retroui + Tailwind)
2. Set up Tailwind v4 with Vite plugin, fonts, and global retro styles
3. Rewrite main.jsx (remove Chakra provider)
4. Rewrite Header with retro title styling
5. Rewrite NextLaunchBanner as "MISSION BRIEFING" with glowing countdown
6. Rewrite Filters with pixel-retroui Button/Input/Dropdown
7. Rewrite LaunchCard with pixel-retroui Card
8. Rewrite LaunchListItem for list view
9. Rewrite LaunchModal as pixel-retroui Popup
10. Rewrite FavoritesDrawer with pixel borders
11. Rewrite LaunchStats as "HIGH SCORES"
12. Rewrite SpaceNews as "SPACE TRANSMISSIONS"
13. Rewrite App.jsx to remove all Chakra references
14. Add CSS effects (scanlines, star field, CRT vignette)
15. Test build and deploy
