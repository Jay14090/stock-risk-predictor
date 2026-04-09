import type {
  FactorSignal,
  RiskAssessment,
  RiskBand,
  RiskFactor,
  RiskModelInput,
  SentimentLabel,
  TradeVerdict,
} from './analysis'

function clamp(value: number, min = 0, max = 100) {
  return Math.min(Math.max(value, min), max)
}

function scale(value: number, calm: number, stressed: number) {
  if (stressed === calm) {
    return value >= stressed ? 100 : 0
  }

  return clamp(((value - calm) / (stressed - calm)) * 100)
}

function inverseScale(value: number, healthy: number, stressed: number) {
  return clamp(((healthy - value) / (healthy - stressed)) * 100)
}

function round(value: number, digits = 1) {
  return Number(value.toFixed(digits))
}

function signalFromScore(score: number): FactorSignal {
  if (score >= 67) {
    return 'stressed'
  }

  if (score >= 38) {
    return 'watch'
  }

  return 'supportive'
}

function bandFromScore(score: number): RiskBand {
  if (score >= 72) {
    return 'High'
  }

  if (score >= 54) {
    return 'Elevated'
  }

  if (score >= 34) {
    return 'Moderate'
  }

  return 'Low'
}

export function sentimentLabelFromScore(score: number): SentimentLabel {
  if (score <= -0.45) {
    return 'Negative'
  }

  if (score <= -0.1) {
    return 'Cautious'
  }

  if (score < 0.22) {
    return 'Mixed'
  }

  return 'Constructive'
}

function factor(
  partial: Omit<RiskFactor, 'contribution' | 'signal'>,
): RiskFactor {
  return {
    ...partial,
    contribution: round(partial.score * partial.weight, 1),
    signal: signalFromScore(partial.score),
  }
}

function buildThesis(
  band: RiskBand,
  strongest: RiskFactor[],
  sentiment: SentimentLabel,
): string {
  const anchors = strongest.map((item) => item.label)

  if (band === 'Low') {
    return `Risk is contained. ${anchors.join(' and ')} are behaving cleanly, while the news pulse is ${sentiment.toLowerCase()}.`
  }

  if (band === 'Moderate') {
    return `Risk is manageable but not quiet. ${anchors.join(' and ')} deserve monitoring, especially if the news pulse shifts from ${sentiment.toLowerCase()}.`
  }

  if (band === 'Elevated') {
    return `Risk is running warm. ${anchors.join(' and ')} are the main pressure points, so fresh headlines can swing the setup quickly.`
  }

  return `Risk is stretched. ${anchors.join(' and ')} are both flashing stress, and the setup should be treated as a high-variance trade.`
}

function buildHeadline(band: RiskBand, score: number) {
  switch (band) {
    case 'Low':
      return `Calm tape at ${score}/100`
    case 'Moderate':
      return `Balanced risk at ${score}/100`
    case 'Elevated':
      return `Risk building at ${score}/100`
    default:
      return `High-alert regime at ${score}/100`
  }
}

function buildVerdict(
  band: RiskBand,
  score: number,
  sentiment: SentimentLabel,
  newsSentimentScore: number,
  quote: RiskModelInput['quote'],
) {
  const vwapBias = ((quote.lastPrice - quote.vwap) / Math.max(quote.vwap, 1)) * 100
  const negativeDay = quote.changePercent < 0
  const positiveDay = quote.changePercent > 0

  let action: TradeVerdict = 'Hold'

  if (
    score <= 35 &&
    newsSentimentScore >= -0.08 &&
    vwapBias >= -0.35 &&
    quote.changePercent > -1.4
  ) {
    action = 'Buy'
  } else if (
    score >= 62 ||
    (newsSentimentScore <= -0.28 && negativeDay && vwapBias < -0.35)
  ) {
    action = 'Sell'
  }

  const alignmentSignals =
    (action === 'Buy'
      ? Number(score <= 35) +
        Number(newsSentimentScore >= 0.05) +
        Number(vwapBias >= 0) +
        Number(positiveDay)
      : action === 'Sell'
        ? Number(score >= 62) +
          Number(newsSentimentScore <= -0.2) +
          Number(vwapBias < 0) +
          Number(negativeDay)
        : Number(score >= 36 && score <= 61) +
          Number(sentiment === 'Mixed' || sentiment === 'Cautious') +
          Number(Math.abs(vwapBias) < 0.55) +
          Number(Math.abs(quote.changePercent) < 1.8)) / 4

  const confidence = round(
    clamp(
      (action === 'Hold' ? 56 : 64) +
        alignmentSignals * 24 +
        (action === 'Sell' && band === 'High' ? 6 : 0) +
        (action === 'Buy' && band === 'Low' ? 4 : 0),
      51,
      96,
    ),
    0,
  )

  const rationale =
    action === 'Buy'
      ? `Buy bias because risk is ${band.toLowerCase()}, the tape is near or above VWAP, and headline tone is ${sentiment.toLowerCase()}.`
      : action === 'Sell'
        ? `Sell bias because downside pressure is aligned with ${band.toLowerCase()} risk and ${sentiment.toLowerCase()} headline flow.`
        : `Hold bias because the setup is mixed: risk is ${band.toLowerCase()} and the tape has not earned strong conviction either way.`

  return { action, confidence, rationale }
}

export function analyseRisk(input: RiskModelInput): RiskAssessment {
  const { quote, newsSentimentScore, newsCoverageCount } = input
  const intradayRangePercent =
    ((quote.dayHigh - quote.dayLow) / Math.max(quote.lastPrice, 1)) * 100
  const drawdownFromHighPercent =
    ((quote.weekHigh52 - quote.lastPrice) / Math.max(quote.weekHigh52, 1)) * 100
  const distanceBelowVwapPercent =
    ((quote.vwap - quote.lastPrice) / Math.max(quote.vwap, 1)) * 100
  const downsideMovePercent = Math.max(-quote.changePercent, 0)

  const factors = [
    factor({
      key: 'volatility',
      label: 'Volatility Regime',
      description: 'Annualized cash-market volatility reported by NSE.',
      value: `${round(quote.annualVolatility)}% annualized`,
      weight: 0.24,
      score: scale(quote.annualVolatility, 15, 38),
    }),
    factor({
      key: 'intraday-range',
      label: 'Intraday Range',
      description: 'Wide trading ranges usually signal uncertain price discovery.',
      value: `${round(intradayRangePercent)}% day range`,
      weight: 0.16,
      score: scale(intradayRangePercent, 0.9, 4.6),
    }),
    factor({
      key: 'drawdown',
      label: '52-Week Posture',
      description: 'Distance from the 52-week high gauges how much damage remains in the tape.',
      value: `${round(drawdownFromHighPercent)}% below 52W high`,
      weight: 0.16,
      score: scale(drawdownFromHighPercent, 4, 22),
    }),
    factor({
      key: 'trend-pressure',
      label: 'Trend Pressure',
      description: 'Negative day change plus a price below VWAP can point to weak intraday sponsorship.',
      value: `${round(downsideMovePercent + distanceBelowVwapPercent)}% downside bias`,
      weight: 0.14,
      score: clamp(
        scale(downsideMovePercent, 0.35, 3.7) * 0.58 +
          scale(distanceBelowVwapPercent, 0.1, 1.8) * 0.42,
      ),
    }),
    factor({
      key: 'microstructure',
      label: 'Execution Friction',
      description: 'Higher impact costs and margin buffers make the position more fragile.',
      value: `${round(quote.applicableMargin)}% margin, ${round(quote.impactCost, 2)} impact`,
      weight: 0.14,
      score: clamp(
        scale(quote.applicableMargin, 8, 22) * 0.7 +
          scale(quote.impactCost, 0.01, 0.14) * 0.3,
      ),
    }),
    factor({
      key: 'news',
      label: 'News Pulse',
      description: 'Headline sentiment shifts the probability of follow-through and gap risk.',
      value: `${newsCoverageCount} articles, ${sentimentLabelFromScore(newsSentimentScore).toLowerCase()} tone`,
      weight: 0.16,
      score:
        newsCoverageCount === 0
          ? 42
          : clamp(
              inverseScale(newsSentimentScore, 0.3, -0.65) * 0.82 +
                scale(newsCoverageCount, 2, 8) * 0.18,
            ),
    }),
  ].sort((left, right) => right.contribution - left.contribution)

  const overallScore = round(
    factors.reduce((total, current) => total + current.contribution, 0),
    0,
  )
  const band = bandFromScore(overallScore)
  const sentiment = sentimentLabelFromScore(newsSentimentScore)
  const confidence = round(
    clamp(92 - (newsCoverageCount === 0 ? 12 : 0) - (quote.impactCost === 0 ? 4 : 0), 62, 96) /
      100,
    2,
  )

  return {
    score: overallScore,
    band,
    confidence,
    headline: buildHeadline(band, overallScore),
    thesis: buildThesis(band, factors.slice(0, 2), sentiment),
    verdict: buildVerdict(band, overallScore, sentiment, newsSentimentScore, quote),
    factors,
  }
}
