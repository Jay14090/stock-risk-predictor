export type RiskBand = 'Low' | 'Moderate' | 'Elevated' | 'High'
export type FactorSignal = 'supportive' | 'watch' | 'stressed'
export type SentimentLabel = 'Constructive' | 'Mixed' | 'Cautious' | 'Negative'
export type TradeVerdict = 'Buy' | 'Hold' | 'Sell'

export interface QuoteSnapshot {
  symbol: string
  companyName: string
  industry: string
  sectorBenchmark: string
  exchangeUpdatedAt: string
  lastPrice: number
  change: number
  changePercent: number
  previousClose: number
  open: number
  vwap: number
  dayLow: number
  dayHigh: number
  weekLow52: number
  weekHigh52: number
  lowerCircuit: number
  upperCircuit: number
  annualVolatility: number
  dailyVolatility: number
  impactCost: number
  applicableMargin: number
  tradedValueCrores: number
  marketCapCrores: number
}

export interface NewsArticle {
  title: string
  source: string
  publishedAt: string
  url: string
  summary: string
  sentimentScore: number
  sentimentLabel: SentimentLabel
}

export interface NewsAggregate {
  provider: string
  coverageCount: number
  sentimentScore: number
  sentimentLabel: SentimentLabel
  keyThemes: string[]
  note?: string
}

export interface RiskFactor {
  key: string
  label: string
  description: string
  value: string
  weight: number
  score: number
  contribution: number
  signal: FactorSignal
}

export interface RiskAssessment {
  score: number
  band: RiskBand
  confidence: number
  thesis: string
  headline: string
  verdict: {
    action: TradeVerdict
    confidence: number
    rationale: string
  }
  factors: RiskFactor[]
}

export interface AnalysisResponse {
  generatedAt: string
  quote: QuoteSnapshot
  risk: RiskAssessment
  news: {
    aggregate: NewsAggregate
    articles: NewsArticle[]
  }
}

export interface RiskModelInput {
  quote: QuoteSnapshot
  newsSentimentScore: number
  newsCoverageCount: number
}
