import { z } from 'zod'

import type { NewsAggregate, NewsArticle } from '../../shared/analysis'
import { sentimentLabelFromScore } from '../../shared/risk'
import { extractThemes, scoreHeadlineSentiment } from '../lib/sentiment'

const articleSchema = z.object({
  article_id: z.string(),
  title: z.string(),
  description: z.string().nullable().optional(),
  link: z.string().url(),
  pubDate: z.string(),
  pubDateTZ: z.string().nullable().optional(),
  source_name: z.string(),
  duplicate: z.boolean().optional().default(false),
  keywords: z.array(z.string()).nullable().optional(),
})

const newsDataResponseSchema = z.object({
  status: z.string(),
  results: z.array(articleSchema).default([]),
})

export interface NewsPulse {
  aggregate: NewsAggregate
  articles: NewsArticle[]
}

const COMPANY_STOP_WORDS = new Set([
  'limited',
  'ltd',
  'inc',
  'corp',
  'corporation',
  'company',
  'co',
  'the',
  'and',
  'industries',
  'holdings',
  'services',
  'solutions',
  'technologies',
  'technology',
  'financial',
])

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

function parsePublishedAt(value: string, timezone?: string | null) {
  if (timezone === 'UTC') {
    return new Date(value.replace(' ', 'T') + 'Z').toISOString()
  }

  return new Date(value.replace(' ', 'T')).toISOString()
}

function buildCompanyTokens(symbol: string, companyName: string) {
  const rawNameTokens = normalize(companyName)
    .split(' ')
    .filter((token) => token.length > 1 && !['the', 'and', 'of'].includes(token))
  const nameTokens = rawNameTokens
    .filter((token) => token.length > 2 && !COMPANY_STOP_WORDS.has(token))
  const alias = rawNameTokens.map((token) => token[0]).join('')

  return Array.from(
    new Set([
      normalize(symbol),
      alias.length >= 2 && alias.length <= 6 ? alias : '',
      ...nameTokens,
    ].filter(Boolean)),
  )
}

function scoreRelevance(
  symbol: string,
  companyName: string,
  article: z.infer<typeof articleSchema>,
) {
  const title = normalize(article.title)
  const description = normalize(article.description ?? '')
  const keywords = (article.keywords ?? []).map(normalize)
  const companyPhrase = normalize(companyName)
  const tokens = buildCompanyTokens(symbol, companyName)
  const symbolToken = normalize(symbol)
  const aliasTokens = tokens.filter((token) => token !== symbolToken && token.length >= 3 && token.length <= 5)
  const titleAnchors = [companyPhrase, symbolToken, ...tokens.filter((token) => token.length >= 4), ...aliasTokens]
  const bodyAnchors = [
    companyPhrase,
    ...aliasTokens,
    ...(symbolToken.length <= 5 ? [symbolToken] : []),
  ]
  const softTokens = tokens.filter((token) => token.length >= 4 && token !== symbolToken)
  const hardAnchorInTitle = titleAnchors.some((token) => title.includes(token))
  const hardAnchorInBody = bodyAnchors.some((token) => description.includes(token))
  const softAnchorInTitle = softTokens.some((token) => title.includes(token))

  let score = 0

  if (hardAnchorInTitle || softAnchorInTitle) {
    score += 5
  }

  if (hardAnchorInBody) {
    score += 3
  }

  score += softTokens.filter((token) => title.includes(token)).length * 2
  score += bodyAnchors.filter((token) => description.includes(token)).length
  score += keywords.filter((keyword) => titleAnchors.some((token) => keyword.includes(token))).length

  if (article.duplicate) {
    score -= 2
  }

  return {
    score,
    anchorMatched: hardAnchorInTitle || softAnchorInTitle || hardAnchorInBody,
  }
}

export async function getNewsPulse(symbol: string, companyName: string): Promise<NewsPulse> {
  const apiKey = process.env.NEWSDATA_API_KEY

  if (!apiKey) {
    return {
      aggregate: {
        provider: 'NewsData.io',
        coverageCount: 0,
        sentimentScore: 0,
        sentimentLabel: 'Mixed',
        keyThemes: [],
        note: 'Add NEWSDATA_API_KEY to enrich the score with live headlines.',
      },
      articles: [],
    }
  }

  const params = new URLSearchParams({
    apikey: apiKey,
    q: `${companyName} ${symbol} stock`,
    language: 'en',
    country: 'in',
    size: '10',
    category: 'business',
  })

  try {
    const response = await fetch(`https://newsdata.io/api/1/latest?${params.toString()}`, {
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      throw new Error(`NewsData.io request failed with status ${response.status}`)
    }

    const payload = newsDataResponseSchema.parse(await response.json())
    const articles = payload.results
      .map((article) => ({
        article,
        relevance: scoreRelevance(symbol, companyName, article),
      }))
      .filter(({ relevance }) => relevance.anchorMatched && relevance.score >= 5)
      .sort((left, right) => right.relevance.score - left.relevance.score)
      .slice(0, 6)
      .map<NewsArticle>(({ article }) => {
        const sentimentScore = scoreHeadlineSentiment(
          `${article.title} ${article.description ?? ''}`,
        )

        return {
          title: article.title,
          source: article.source_name,
          publishedAt: parsePublishedAt(article.pubDate, article.pubDateTZ),
          url: article.link,
          summary: article.description ?? 'No summary provided by the news source.',
          sentimentScore,
          sentimentLabel: sentimentLabelFromScore(sentimentScore),
        }
      })

    const aggregateScore =
      articles.length === 0
        ? 0
        : Number(
            (
              articles.reduce((total, article) => total + article.sentimentScore, 0) /
              articles.length
            ).toFixed(2),
          )

    return {
      aggregate: {
        provider: 'NewsData.io',
        coverageCount: articles.length,
        sentimentScore: aggregateScore,
        sentimentLabel: sentimentLabelFromScore(aggregateScore),
        keyThemes: extractThemes(
          articles.map((article) => article.title),
          symbol,
          companyName,
        ),
      },
      articles,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown news provider error.'

    return {
      aggregate: {
        provider: 'NewsData.io',
        coverageCount: 0,
        sentimentScore: 0,
        sentimentLabel: 'Mixed',
        keyThemes: [],
        note: `Headline feed unavailable right now. ${message}`,
      },
      articles: [],
    }
  }
}
