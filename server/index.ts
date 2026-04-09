import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { AnalysisResponse, QuoteSnapshot } from '../shared/analysis'
import { analyseRisk } from '../shared/risk'
import { getNewsPulse } from './services/news'
import { getNseSnapshot } from './services/nse'

const PORT = Number(process.env.PORT ?? 8787)
const cacheTtlMs = Number(process.env.CACHE_TTL_SECONDS ?? 180) * 1000
const analysisCache = new Map<string, { expiresAt: number; payload: AnalysisResponse }>()
const symbolPattern = /^[A-Z0-9&-]{1,20}$/

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clientDist = path.resolve(__dirname, '../dist')

function toQuoteSnapshot(snapshot: Awaited<ReturnType<typeof getNseSnapshot>>): QuoteSnapshot {
  const { quote, trade } = snapshot
  const tradeInfo = trade.marketDeptOrderBook.tradeInfo
  const margins = trade.marketDeptOrderBook.valueAtRisk

  return {
    symbol: quote.info.symbol,
    companyName: quote.info.companyName,
    industry: quote.metadata.industry,
    sectorBenchmark: quote.metadata.pdSectorInd,
    exchangeUpdatedAt: quote.metadata.lastUpdateTime,
    lastPrice: quote.priceInfo.lastPrice,
    change: quote.priceInfo.change,
    changePercent: quote.priceInfo.pChange,
    previousClose: quote.priceInfo.previousClose,
    open: quote.priceInfo.open,
    vwap: quote.priceInfo.vwap,
    dayLow: quote.priceInfo.intraDayHighLow.min,
    dayHigh: quote.priceInfo.intraDayHighLow.max,
    weekLow52: quote.priceInfo.weekHighLow.min,
    weekHigh52: quote.priceInfo.weekHighLow.max,
    lowerCircuit: Number(quote.priceInfo.lowerCP),
    upperCircuit: Number(quote.priceInfo.upperCP),
    annualVolatility: Number(tradeInfo.cmAnnualVolatility),
    dailyVolatility: Number(tradeInfo.cmDailyVolatility),
    impactCost: tradeInfo.impactCost,
    applicableMargin: margins.applicableMargin,
    tradedValueCrores: tradeInfo.totalTradedValue,
    marketCapCrores: tradeInfo.totalMarketCap,
  }
}

async function createAnalysis(symbol: string): Promise<AnalysisResponse> {
  const snapshot = await getNseSnapshot(symbol)
  const quote = toQuoteSnapshot(snapshot)
  const news = await getNewsPulse(quote.symbol, quote.companyName)
  const risk = analyseRisk({
    quote,
    newsSentimentScore: news.aggregate.sentimentScore,
    newsCoverageCount: news.aggregate.coverageCount,
  })

  return {
    generatedAt: new Date().toISOString(),
    quote,
    news,
    risk,
  }
}

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    service: 'stock-risk-analyser',
    timestamp: new Date().toISOString(),
  })
})

app.get('/api/analysis', async (request, response) => {
  try {
    const symbol = String(request.query.symbol ?? '')
      .trim()
      .toUpperCase()

    if (!symbolPattern.test(symbol)) {
      response.status(400).json({
        message: 'Use a valid NSE ticker symbol like RELIANCE, TCS, INFY, or SBIN.',
      })
      return
    }

    const cached = analysisCache.get(symbol)
    if (cached && cached.expiresAt > Date.now()) {
      response.json(cached.payload)
      return
    }

    const payload = await createAnalysis(symbol)
    analysisCache.set(symbol, {
      expiresAt: Date.now() + cacheTtlMs,
      payload,
    })

    response.json(payload)
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'The analyser could not complete the request.'

    response.status(502).json({ message })
  }
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(clientDist))

  app.get('/{*path}', (_request, response) => {
    response.sendFile(path.join(clientDist, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Stock Risk Analyser listening on http://localhost:${PORT}`)
})
