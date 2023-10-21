export function formatSecondsToMinutes(time: number) {
  const minutes = String(Math.floor(time / 60))
  const seconds = String(Math.floor(time % 60))
  
  const timeFormatted = `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`

  return timeFormatted
}