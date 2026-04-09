# Stock Risk Analyser

Stock Risk Analyser is a full-stack dark-mode web app for evaluating NSE-listed equities with a transparent composite risk score. It combines:

- Live NSE quote and trade-info endpoints
- A weighted risk engine with visible factor contributions
- Optional live news sentiment via NewsData.io
- Docker packaging and a GitHub Actions CI/CD workflow

## What it scores

The app turns raw market data into a 0-100 risk score using these factors:

- Volatility regime
- Intraday range expansion
- 52-week posture
- Trend pressure versus VWAP
- Execution friction from margin and impact cost
- Live headline sentiment and news coverage

## Stack

- React 19 + Vite + TypeScript
- Express 5 API proxy
- Recharts for visual factor exploration
- Vitest for the risk-engine tests
- Docker multi-stage image build
- GitHub Actions for lint, test, build, and container publish

## API sources

- NSE public quote endpoint: `https://www.nseindia.com/api/quote-equity?symbol=RELIANCE`
- NSE trade info section: `https://www.nseindia.com/api/quote-equity?symbol=RELIANCE&section=trade_info`
- NewsData.io latest endpoint for live headline context

## Local setup

```bash
npm install
cp .env.example .env
npm run dev
```

This starts:

- Vite client on `http://localhost:5173`
- Express API on `http://localhost:8787`

## Environment variables

```bash
PORT=8787
CACHE_TTL_SECONDS=180
NEWSDATA_API_KEY=
```

`NEWSDATA_API_KEY` is optional. Without it, the app still works and falls back to neutral news weighting.

## Quality checks

```bash
npm run lint
npm run test
npm run build
```

## Docker

Build and run with Docker Compose:

```bash
cp .env.example .env
docker compose up --build
```

Then open `http://localhost:8787`.

## CI/CD

The GitHub Actions workflow at `.github/workflows/stock-risk-analyser.yml` does two things:

1. Runs lint, tests, and production builds on pushes and pull requests that touch this app.
2. On pushes to `main`, builds and publishes a Docker image to GHCR.

The published image name is:

```text
ghcr.io/<your-github-owner>/stock-risk-predictor
```

## Notes

- NSE endpoints can be sensitive to headers and cookies, so the backend handles that on behalf of the browser.
- News sentiment is deliberately lightweight and transparent. You can later swap it for a richer NLP model without changing the UI contract.
