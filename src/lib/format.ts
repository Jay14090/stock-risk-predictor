export function formatCurrency(value: number, fractionDigits = 2) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(value)
}

export function formatCrores(value: number) {
  return `${new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: value >= 100000 ? 0 : 2,
  }).format(value)} Cr`
}

export function formatSignedPercent(value: number, fractionDigits = 2) {
  const absolute = Math.abs(value)
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(absolute)

  return `${value > 0 ? '+' : value < 0 ? '-' : ''}${formatted}%`
}

export function formatCompact(value: number) {
  return new Intl.NumberFormat('en-IN', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}
