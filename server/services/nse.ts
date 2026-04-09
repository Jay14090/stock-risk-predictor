import { z } from 'zod'

const BASE_URL = 'https://www.nseindia.com'
const REQUEST_TIMEOUT_MS = 12000

const quoteSchema = z.object({
  info: z.object({
    symbol: z.string(),
    companyName: z.string(),
    industry: z.string().optional().default('Unclassified'),
  }),
  metadata: z.object({
    lastUpdateTime: z.string(),
    industry: z.string().optional().default('Unclassified'),
    pdSectorInd: z.string().optional().default('NIFTY 50'),
  }),
  priceInfo: z.object({
    lastPrice: z.number(),
    change: z.number(),
    pChange: z.number(),
    previousClose: z.number(),
    open: z.number(),
    vwap: z.number(),
    lowerCP: z.union([z.string(), z.number()]),
    upperCP: z.union([z.string(), z.number()]),
    intraDayHighLow: z.object({
      min: z.number(),
      max: z.number(),
    }),
    weekHighLow: z.object({
      min: z.number(),
      max: z.number(),
    }),
  }),
})

const tradeSchema = z.object({
  marketDeptOrderBook: z.object({
    tradeInfo: z.object({
      totalTradedValue: z.number(),
      totalMarketCap: z.number(),
      impactCost: z.number(),
      cmDailyVolatility: z.union([z.string(), z.number()]),
      cmAnnualVolatility: z.union([z.string(), z.number()]),
    }),
    valueAtRisk: z.object({
      applicableMargin: z.number(),
    }),
  }),
})

export interface NseSnapshot {
  quote: z.infer<typeof quoteSchema>
  trade: z.infer<typeof tradeSchema>
}

function headers(cookie?: string) {
  return {
    Accept: 'application/json,text/plain,*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    Referer: 'https://www.nseindia.com/get-quotes/equity',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0 Safari/537.36',
    ...(cookie ? { Cookie: cookie } : {}),
  }
}

function cleanCookie(setCookies: string[]) {
  return setCookies.map((entry) => entry.split(';')[0]).join('; ')
}

function parseNumber(value: string | number) {
  if (typeof value === 'number') {
    return value
  }

  return Number(value.replace(/,/g, ''))
}

async function requestJson<T>(
  path: string,
  schema: z.ZodSchema<T>,
  cookie?: string,
) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: headers(cookie),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })

  if (!response.ok) {
    throw new Error(`NSE request failed with status ${response.status}`)
  }

  const payload = await response.json()
  return {
    data: schema.parse(payload),
    cookie:
      typeof response.headers.getSetCookie === 'function'
        ? cleanCookie(response.headers.getSetCookie())
        : undefined,
  }
}

export async function getNseSnapshot(symbol: string): Promise<NseSnapshot> {
  const encodedSymbol = encodeURIComponent(symbol.toUpperCase())
  const quoteResult = await requestJson(`/api/quote-equity?symbol=${encodedSymbol}`, quoteSchema)
  const tradeResult = await requestJson(
    `/api/quote-equity?symbol=${encodedSymbol}&section=trade_info`,
    tradeSchema,
    quoteResult.cookie,
  )

  return {
    quote: {
      ...quoteResult.data,
      priceInfo: {
        ...quoteResult.data.priceInfo,
        lowerCP: parseNumber(quoteResult.data.priceInfo.lowerCP),
        upperCP: parseNumber(quoteResult.data.priceInfo.upperCP),
      },
    },
    trade: {
      ...tradeResult.data,
      marketDeptOrderBook: {
        ...tradeResult.data.marketDeptOrderBook,
        tradeInfo: {
          ...tradeResult.data.marketDeptOrderBook.tradeInfo,
          cmDailyVolatility: parseNumber(
            tradeResult.data.marketDeptOrderBook.tradeInfo.cmDailyVolatility,
          ),
          cmAnnualVolatility: parseNumber(
            tradeResult.data.marketDeptOrderBook.tradeInfo.cmAnnualVolatility,
          ),
        },
      },
    },
  }
}
