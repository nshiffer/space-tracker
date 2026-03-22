export const theme = {
  bg: '#0f0f23',
  panel: '#1a1a2e',
  border: '#fefcd0',
  text: '#fefcd0',
  muted: '#8b8b8b',
  green: '#00ff41',
  red: '#ff0040',
  blue: '#4dc9f6',
  purple: '#c381b5',
  yellow: '#ffd700',
}

export function getStatusColor(abbrev) {
  switch (abbrev) {
    case 'Go': return theme.green
    case 'TBD': return theme.yellow
    case 'Success': return theme.green
    case 'Failure': return theme.red
    case 'Hold': return theme.yellow
    case 'In Flight': return theme.blue
    default: return theme.muted
  }
}

export function getStatusLabel(abbrev) {
  switch (abbrev) {
    case 'Go': return 'GO!'
    case 'TBD': return 'TBD'
    case 'Success': return 'OK!'
    case 'Failure': return 'FAIL'
    case 'Hold': return 'HOLD'
    case 'In Flight': return 'LIVE'
    default: return '???'
  }
}
