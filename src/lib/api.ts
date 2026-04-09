import type { AnalysisResponse } from '../../shared/analysis'

export async function fetchAnalysis(symbol: string) {
  const response = await fetch(`/api/analysis?symbol=${encodeURIComponent(symbol)}`)

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string } | null
    throw new Error(payload?.message ?? 'Unable to analyse this ticker right now.')
  }

  return (await response.json()) as AnalysisResponse
}
