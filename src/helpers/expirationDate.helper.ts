export function convertToMilliseconds(timeString: string): number {
  const units = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  }

  const unit = timeString.slice(-1)
  const value = Number(timeString.slice(0, -1))

  return value * (units[unit] || 0)
}
