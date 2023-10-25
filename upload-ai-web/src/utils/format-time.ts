export function formatTime(time: number) {
  const hours = String(Math.floor(time / 3600))
  const minutes = String(Math.floor((time % 3600) / 60))
  const seconds = String(Math.floor(time % 60))

  const hoursFormatted = hours !== '0' ? `${hours}:` : ''
  const minutesFormatted = minutes !== '0' ? `${!hoursFormatted ? minutes : minutes.padStart(2, '0')}:` : '0:'
  const secondsFormatted = seconds.padStart(2, '0')

  const timeFormatted = `${hoursFormatted}${minutesFormatted}${secondsFormatted}`

  return timeFormatted
}