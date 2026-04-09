import type { ReactNode } from 'react'

interface MetricCardProps {
  label: string
  value: string
  hint: string
  tone?: 'default' | 'positive' | 'negative'
  icon: ReactNode
}

export function MetricCard({
  label,
  value,
  hint,
  tone = 'default',
  icon,
}: MetricCardProps) {
  return (
    <article className={`metric-card metric-card--${tone}`}>
      <div className="metric-card__meta">
        <span>{label}</span>
        <span className="metric-card__icon">{icon}</span>
      </div>
      <strong>{value}</strong>
      <p>{hint}</p>
    </article>
  )
}
