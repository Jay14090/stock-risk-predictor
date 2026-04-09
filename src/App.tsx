import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  BadgeIndianRupee,
  Newspaper,
  PauseCircle,
  RefreshCcw,
  ShieldAlert,
  ShieldX,
  TrendingUp,
} from 'lucide-react'
import { startTransition, useCallback, useEffect, useRef, useState } from 'react'

import type { AnalysisResponse, RiskBand } from '../shared/analysis'
import { FactorChart } from './components/FactorChart'
import { MetricCard } from './components/MetricCard'
import { ScoreDial } from './components/ScoreDial'
import { fetchAnalysis } from './lib/api'
import {
  formatCompact,
  formatCrores,
  formatCurrency,
  formatDateTime,
  formatSignedPercent,
} from './lib/format'
import './App.css'

const SAMPLE_SYMBOLS = ['RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'SBIN', 'ICICIBANK']

const BAND_CLASS: Record<RiskBand, string> = {
  Low: 'is-low',
  Moderate: 'is-moderate',
  Elevated: 'is-elevated',
  High: 'is-high',
}

const VERDICT_ICON = {
  Buy: <BadgeCheck size={18} />,
  Hold: <PauseCircle size={18} />,
  Sell: <ShieldX size={18} />,
}

const VERDICT_CLASS = {
  Buy: 'is-buy',
  Hold: 'is-hold',
  Sell: 'is-sell',
}

function App() {
  const [symbol, setSymbol] = useState('RELIANCE')
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const requestId = useRef(0)

  const runAnalysis = useCallback(async (nextSymbol: string) => {
    const currentRequestId = ++requestId.current
    setLoading(true)
    setError('')

    try {
      const payload = await fetchAnalysis(nextSymbol)

      if (currentRequestId !== requestId.current) {
        return
      }

      startTransition(() => {
        setAnalysis(payload)
        setSymbol(payload.quote.symbol)
      })
    } catch (requestError) {
      if (currentRequestId !== requestId.current) {
        return
      }

      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Something went wrong while loading the analysis.',
      )
    } finally {
      if (currentRequestId === requestId.current) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    void runAnalysis('RELIANCE')
  }, [runAnalysis])

  const quote = analysis?.quote
  const risk = analysis?.risk
  const news = analysis?.news
  const isPositiveDay = (quote?.changePercent ?? 0) >= 0

  return (
    <main className="shell">
      <section className="hero-panel">
        <div className="hero-panel__copy">
          <span className="eyebrow">NSE + news aware risk intelligence</span>
          <h1>Stock Risk Analyser</h1>
          <p>
            A sleek dark dashboard that blends live NSE quote structure, execution
            friction, and headline sentiment into one transparent risk score.
          </p>
        </div>

        <form
          className="search-panel"
          onSubmit={(event) => {
            event.preventDefault()
            void runAnalysis(symbol)
          }}
        >
          <label className="search-panel__label" htmlFor="symbol">
            NSE ticker
          </label>
          <div className="search-panel__controls">
            <input
              id="symbol"
              name="symbol"
              value={symbol}
              onChange={(event) => setSymbol(event.target.value.toUpperCase())}
              placeholder="RELIANCE"
              autoComplete="off"
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Analysing...' : 'Analyse'}
            </button>
          </div>
          <div className="search-panel__chips">
            {SAMPLE_SYMBOLS.map((sample) => (
              <button
                key={sample}
                type="button"
                className="chip"
                onClick={() => {
                  setSymbol(sample)
                  void runAnalysis(sample)
                }}
              >
                {sample}
              </button>
            ))}
          </div>
          <p className="search-panel__helper">
            Dark-mode by default, server-side API proxy, and a factor-by-factor score.
          </p>
        </form>
      </section>

      {error ? <div className="banner banner--error">{error}</div> : null}
      {news?.aggregate.note ? <div className="banner">{news.aggregate.note}</div> : null}

      {analysis ? (
        <>
          <section className="summary-grid">
            <MetricCard
              label="Last price"
              value={formatCurrency(quote!.lastPrice)}
              hint={`Updated ${quote!.exchangeUpdatedAt}`}
              tone={isPositiveDay ? 'positive' : 'negative'}
              icon={isPositiveDay ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            />
            <MetricCard
              label="Day change"
              value={formatSignedPercent(quote!.changePercent)}
              hint={`${formatCurrency(quote!.change)} vs previous close`}
              tone={isPositiveDay ? 'positive' : 'negative'}
              icon={<TrendingUp size={16} />}
            />
            <MetricCard
              label="Annual volatility"
              value={formatSignedPercent(quote!.annualVolatility)}
              hint={`${quote!.dailyVolatility.toFixed(2)}% daily cash-market volatility`}
              icon={<Activity size={16} />}
            />
            <MetricCard
              label="Market cap"
              value={formatCrores(quote!.marketCapCrores)}
              hint={`${formatCrores(quote!.tradedValueCrores)} traded value today`}
              icon={<BadgeIndianRupee size={16} />}
            />
          </section>

          <section className="dashboard-grid">
            <article className="panel panel--risk">
              <div className="panel__header">
                <div>
                  <span className="panel__eyebrow">Composite score</span>
                  <h2>Risk posture</h2>
                </div>
                <span className={`status-pill ${BAND_CLASS[risk!.band]}`}>{risk!.band}</span>
              </div>

              <div className="risk-overview">
                <ScoreDial band={risk!.band} score={risk!.score} />
                <div className="risk-overview__copy">
                  <div className={`verdict-card ${VERDICT_CLASS[risk!.verdict.action]}`}>
                    <div className="verdict-card__label">
                      {VERDICT_ICON[risk!.verdict.action]}
                      <span>{risk!.verdict.action}</span>
                    </div>
                    <strong>{risk!.verdict.confidence}% confidence</strong>
                    <p>{risk!.verdict.rationale}</p>
                  </div>
                  <strong>{risk!.headline}</strong>
                  <p>{risk!.thesis}</p>
                  <dl className="mini-stats">
                    <div>
                      <dt>Risk confidence</dt>
                      <dd>{formatSignedPercent(risk!.confidence * 100, 0)}</dd>
                    </div>
                    <div>
                      <dt>VWAP gap</dt>
                      <dd>{formatCurrency(Math.abs(quote!.vwap - quote!.lastPrice))}</dd>
                    </div>
                    <div>
                      <dt>52W range</dt>
                      <dd>
                        {formatCurrency(quote!.weekLow52, 0)} - {formatCurrency(quote!.weekHigh52, 0)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </article>

            <article className="panel">
              <div className="panel__header">
                <div>
                  <span className="panel__eyebrow">Weighted model</span>
                  <h2>Factor breakdown</h2>
                </div>
                <span className="panel__timestamp">
                  Generated {formatDateTime(analysis.generatedAt)}
                </span>
              </div>

              <FactorChart factors={risk!.factors} />
              <div className="factor-list">
                {risk!.factors.map((factor) => (
                  <div key={factor.key} className={`factor factor--${factor.signal}`}>
                    <div>
                      <strong>{factor.label}</strong>
                      <p>{factor.description}</p>
                    </div>
                    <div className="factor__score">
                      <span>{factor.value}</span>
                      <strong>{factor.score.toFixed(0)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel">
              <div className="panel__header">
                <div>
                  <span className="panel__eyebrow">Market structure</span>
                  <h2>Execution context</h2>
                </div>
                <RefreshCcw size={18} />
              </div>

              <div className="execution-grid">
                <div className="execution-card">
                  <span>VWAP</span>
                  <strong>{formatCurrency(quote!.vwap)}</strong>
                  <p>Where the day’s volume has settled.</p>
                </div>
                <div className="execution-card">
                  <span>Impact cost</span>
                  <strong>{quote!.impactCost.toFixed(2)}</strong>
                  <p>Lower is smoother for execution.</p>
                </div>
                <div className="execution-card">
                  <span>Applicable margin</span>
                  <strong>{formatSignedPercent(quote!.applicableMargin, 1)}</strong>
                  <p>NSE risk buffer applied to the security.</p>
                </div>
                <div className="execution-card">
                  <span>Circuits</span>
                  <strong>
                    {formatCurrency(quote!.lowerCircuit, 0)} / {formatCurrency(quote!.upperCircuit, 0)}
                  </strong>
                  <p>Downside and upside guardrails for the session.</p>
                </div>
              </div>

              <div className="context-strip">
                <div>
                  <span>Company</span>
                  <strong>{quote!.companyName}</strong>
                </div>
                <div>
                  <span>Industry</span>
                  <strong>{quote!.industry}</strong>
                </div>
                <div>
                  <span>Benchmark</span>
                  <strong>{quote!.sectorBenchmark}</strong>
                </div>
              </div>
            </article>

            <article className="panel">
              <div className="panel__header">
                <div>
                  <span className="panel__eyebrow">Headline feed</span>
                  <h2>News pulse</h2>
                </div>
                <Newspaper size={18} />
              </div>

              <div className="news-summary">
                <div className="news-score">
                  <ShieldAlert size={18} />
                  <div>
                    <span>Sentiment</span>
                    <strong>{news!.aggregate.sentimentLabel}</strong>
                  </div>
                </div>
                <div className="news-score">
                  <Activity size={18} />
                  <div>
                    <span>Coverage</span>
                    <strong>{formatCompact(news!.aggregate.coverageCount)}</strong>
                  </div>
                </div>
                <div className="news-score">
                  <Newspaper size={18} />
                  <div>
                    <span>Provider</span>
                    <strong>{news!.aggregate.provider}</strong>
                  </div>
                </div>
              </div>

              <div className="theme-list">
                {news!.aggregate.keyThemes.length > 0 ? (
                  news!.aggregate.keyThemes.map((theme) => (
                    <span key={theme} className="theme-chip">
                      {theme}
                    </span>
                  ))
                ) : (
                  <span className="theme-chip theme-chip--muted">Awaiting live headline themes</span>
                )}
              </div>

              <div className="news-list">
                {news!.articles.length > 0 ? (
                  news!.articles.map((article) => (
                    <a
                      key={`${article.url}-${article.publishedAt}`}
                      className="news-item"
                      href={article.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="news-item__meta">
                        <span>{article.source}</span>
                        <span>{formatDateTime(article.publishedAt)}</span>
                      </div>
                      <strong>{article.title}</strong>
                      <p>{article.summary}</p>
                    </a>
                  ))
                ) : (
                  <div className="news-empty">
                    No highly relevant live headlines cleared the relevance filter for this ticker.
                  </div>
                )}
              </div>
            </article>
          </section>
        </>
      ) : (
        <section className="empty-state">
          <div className="spinner" />
          <p>{loading ? 'Pulling NSE and news context...' : 'Pick a ticker to begin.'}</p>
        </section>
      )}
    </main>
  )
}

export default App
