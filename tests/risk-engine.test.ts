import { describe, expect, it } from 'vitest'

import type { QuoteSnapshot } from '../shared/analysis'
import { analyseRisk } from '../shared/risk'

function buildQuote(overrides: Partial<QuoteSnapshot> = {}): QuoteSnapshot {
  return {
    symbol: 'RELIANCE',
    companyName: 'Reliance Industries Limited',
    industry: 'Energy',
    sectorBenchmark: 'NIFTY 50',
    exchangeUpdatedAt: '09-Apr-2026 16:00:00',
    lastPrice: 1330,
    change: -17.8,
    changePercent: -1.32,
    previousClose: 1347.8,
    open: 1346,
    vwap: 1333.25,
    dayLow: 1326.3,
    dayHigh: 1350,
    weekLow52: 1163.3,
    weekHigh52: 1611.8,
    lowerCircuit: 1197,
    upperCircuit: 1463,
    annualVolatility: 26.17,
    dailyVolatility: 1.37,
    impactCost: 0.01,
    applicableMargin: 12.5,
    tradedValueCrores: 2763.21,
    marketCapCrores: 1799818.86,
    ...overrides,
  }
}

describe('analyseRisk', () => {
  it('flags stressed inputs as elevated or high risk', () => {
    const result = analyseRisk({
      quote: buildQuote({
        changePercent: -4.8,
        vwap: 1380,
        lastPrice: 1290,
        dayLow: 1271,
        dayHigh: 1388,
        annualVolatility: 39,
        applicableMargin: 19,
        impactCost: 0.12,
      }),
      newsSentimentScore: -0.65,
      newsCoverageCount: 6,
    })

    expect(result.score).toBeGreaterThanOrEqual(70)
    expect(result.band).toBe('High')
    expect(result.verdict.action).toBe('Sell')
  })

  it('keeps stable inputs in the lower bands', () => {
    const result = analyseRisk({
      quote: buildQuote({
        changePercent: 0.4,
        change: 5.2,
        vwap: 1328,
        lastPrice: 1334,
        dayLow: 1327,
        dayHigh: 1337,
        weekHigh52: 1368,
        annualVolatility: 14.8,
        applicableMargin: 8.5,
        impactCost: 0.01,
      }),
      newsSentimentScore: 0.38,
      newsCoverageCount: 4,
    })

    expect(result.score).toBeLessThan(36)
    expect(['Low', 'Moderate']).toContain(result.band)
    expect(result.verdict.action).toBe('Buy')
  })

  it('drops confidence when no news context is available', () => {
    const result = analyseRisk({
      quote: buildQuote(),
      newsSentimentScore: 0,
      newsCoverageCount: 0,
    })

    expect(result.confidence).toBeLessThan(0.9)
    expect(result.factors.find((factor) => factor.key === 'news')?.value).toContain('0 articles')
    expect(result.verdict.action).toBe('Hold')
  })
})
