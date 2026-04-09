const POSITIVE_TERMS = [
  'beat',
  'beats',
  'growth',
  'surge',
  'upside',
  'upgrade',
  'record',
  'strong',
  'expansion',
  'optimistic',
  'gain',
  'gains',
  'bullish',
  'rebound',
  'partnership',
]

const NEGATIVE_TERMS = [
  'miss',
  'misses',
  'drop',
  'drops',
  'fall',
  'falls',
  'weak',
  'probe',
  'lawsuit',
  'downgrade',
  'cut',
  'cuts',
  'slump',
  'risk',
  'concern',
  'warning',
  'volatile',
  'debt',
]

const STOP_WORDS = new Set([
  'about',
  'after',
  'also',
  'amid',
  'and',
  'from',
  'have',
  'into',
  'over',
  'said',
  'stock',
  'stocks',
  'their',
  'there',
  'these',
  'this',
  'what',
  'next',
  'other',
  'after',
  'today',
  'market',
  'markets',
  'investors',
  'focus',
  'with',
  'will',
  'company',
  'shares',
  'india',
  'indian',
  'nse',
])

export function scoreHeadlineSentiment(text: string) {
  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)

  const positiveHits = tokens.filter((token) => POSITIVE_TERMS.includes(token)).length
  const negativeHits = tokens.filter((token) => NEGATIVE_TERMS.includes(token)).length

  if (positiveHits === 0 && negativeHits === 0) {
    return 0
  }

  return Number(((positiveHits - negativeHits) / (positiveHits + negativeHits)).toFixed(2))
}

export function extractThemes(headlines: string[], symbol: string, companyName: string) {
  const blockedTerms = new Set(
    `${symbol} ${companyName}`
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(Boolean),
  )

  const frequency = new Map<string, number>()

  for (const headline of headlines) {
    const tokens = headline
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((token) => token.length > 3)

    for (const token of tokens) {
      if (STOP_WORDS.has(token) || blockedTerms.has(token)) {
        continue
      }

      frequency.set(token, (frequency.get(token) ?? 0) + 1)
    }
  }

  return [...frequency.entries()]
    .sort((left, right) => right[1] - left[1])
    .slice(0, 4)
    .map(([token]) => token[0].toUpperCase() + token.slice(1))
}
