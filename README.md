# 📈 Stock Risk Predictor

> **An intelligent stock portfolio risk analysis platform** that leverages real-time market data, Monte Carlo simulations, and machine learning to help investors understand, quantify, and mitigate portfolio risk.

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Problem It Solves](#-problem-it-solves)
- [Target Users (Personas)](#-target-users-personas)
- [Vision Statement](#-vision-statement)
- [Key Features / Goals](#-key-features--goals)
- [Success Metrics](#-success-metrics)
- [Assumptions & Constraints](#-assumptions--constraints)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Branching Strategy](#-branching-strategy)
- [Quick Start — Local Development](#-quick-start--local-development)
- [Local Development Tools](#-local-development-tools)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔭 Project Overview

**Stock Risk Predictor** is a full-stack web application designed to empower investors with data-driven insights into portfolio risk. The platform integrates real-time stock market data with advanced statistical models — including **Value at Risk (VaR)**, **Monte Carlo simulations**, and **volatility analysis** — to provide actionable risk assessments.

Users can build and manage virtual portfolios, run risk simulations, receive risk alerts, and generate comprehensive reports — all through a modern, intuitive dashboard.

---

## 🔍 Problem It Solves

Retail investors and small portfolio managers face significant challenges:

| Problem | Impact |
|---------|--------|
| **Lack of risk visibility** | Investors make decisions without understanding downside exposure |
| **Complex financial models** | VaR, Monte Carlo, and Greeks require deep quantitative expertise |
| **Expensive tools** | Bloomberg Terminal costs $20K+/year; inaccessible to retail investors |
| **Information overload** | Raw market data is overwhelming without proper visualization |
| **No proactive alerts** | Investors discover risk *after* losses, not before |

**Stock Risk Predictor** democratizes professional-grade risk analysis by making it **free**, **visual**, and **easy to understand** — no finance degree required.

---

## 👥 Target Users (Personas)

### 🧑‍💼 Persona 1: **Alex — The Retail Investor**
- **Age:** 28 | **Occupation:** Software Engineer
- **Investing Experience:** 2 years, self-taught
- **Pain Points:** Doesn't understand portfolio risk exposure; surprised by sudden drops
- **Goals:** Wants a simple dashboard to see how risky his portfolio is and get alerts before major downturns
- **Tech Comfort:** High — comfortable with web apps and APIs

### 👩‍🏫 Persona 2: **Priya — The Finance Student**
- **Age:** 22 | **Occupation:** MBA Student (Finance specialization)
- **Investing Experience:** Academic knowledge, limited practical experience
- **Pain Points:** Needs hands-on tools to apply classroom concepts (VaR, Monte Carlo) to real data
- **Goals:** Wants to simulate risk scenarios on real stocks to validate academic theories
- **Tech Comfort:** Moderate — uses Excel extensively, learning Python

### 👨‍💼 Persona 3: **David — The Small Portfolio Manager**
- **Age:** 45 | **Occupation:** Independent Financial Advisor
- **Investing Experience:** 15+ years
- **Pain Points:** Cannot afford Bloomberg; needs client-ready risk reports
- **Goals:** Generate professional risk reports for clients, monitor portfolio VaR daily
- **Tech Comfort:** Moderate — uses web-based tools, prefers clean UI

---

## 🎯 Vision Statement

> **To become the go-to open-source platform for retail investors and finance students to understand, simulate, and manage stock portfolio risk — making professional-grade risk analysis accessible to everyone, for free.**

---

## ⭐ Key Features / Goals

### Core Features
| # | Feature | Description |
|---|---------|-------------|
| 1 | **Real-Time Stock Data** | Fetch live and historical stock prices via financial APIs |
| 2 | **Portfolio Builder** | Create, edit, and manage virtual stock portfolios |
| 3 | **Risk Dashboard** | Visual overview of portfolio risk metrics (VaR, volatility, beta) |
| 4 | **Monte Carlo Simulation** | Run thousands of simulated scenarios to predict portfolio outcomes |
| 5 | **Value at Risk (VaR)** | Calculate 95% and 99% VaR using historical and parametric methods |
| 6 | **Volatility Analysis** | Track and visualize stock and portfolio volatility over time |
| 7 | **Risk Alerts** | Get notified when risk metrics exceed user-defined thresholds |
| 8 | **Report Generation** | Export professional PDF risk reports |

### Stretch Goals
| # | Feature | Description |
|---|---------|-------------|
| 9 | **Sector & Correlation Analysis** | Analyze sector concentration and inter-stock correlation |
| 10 | **ML-Based Prediction** | Machine learning models for risk trend prediction |
| 11 | **Scenario Stress Testing** | Simulate market crash, rate hike, and black swan events |
| 12 | **Social Sentiment Integration** | Factor in news/social sentiment into risk scores |

---

## 📊 Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Portfolio Creation Rate** | 80% of registered users create at least 1 portfolio | Analytics |
| **Simulation Usage** | Average 3+ Monte Carlo simulations per user per week | Backend logs |
| **Risk Alert Engagement** | 60% of users configure at least 1 risk alert | Database |
| **Report Downloads** | 50+ reports generated per week (post-launch) | Download tracking |
| **Page Load Time** | Dashboard loads in < 2 seconds | Performance monitoring |
| **User Retention** | 40% weekly active user retention after month 1 | Analytics |
| **System Uptime** | 99.5% uptime | Infrastructure monitoring |

---

## 📌 Assumptions & Constraints

### Assumptions
- Users have a basic understanding of stock markets (know what a stock is)
- Real-time stock data APIs (e.g., Alpha Vantage, Yahoo Finance) remain freely available
- Users have modern web browsers (Chrome, Firefox, Edge — latest 2 versions)
- Users have stable internet connectivity for real-time data
- Initial user base is primarily English-speaking

### Constraints
| Constraint | Details |
|------------|---------|
| **Budget** | $0 — open-source project; free-tier APIs and hosting only |
| **API Rate Limits** | Alpha Vantage: 5 calls/min (free tier); Yahoo Finance: unofficial API |
| **Data Accuracy** | Dependent on third-party API data quality; no SLA guarantees |
| **Scope** | US stock market only in v1.0; no options, futures, or crypto |
| **Timeline** | MVP deliverable within academic semester timeline |
| **Team Size** | Solo developer |
| **Storage** | PostgreSQL on free-tier cloud or local Docker; limited by disk |

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 (Vite) | Single-page application with interactive dashboards |
| **UI Library** | Recharts / Chart.js | Data visualization and charting |
| **Styling** | CSS3 + CSS Modules | Modern responsive design |
| **Backend** | Python 3.11 + FastAPI | RESTful API with async support |
| **Database** | PostgreSQL 16 | Persistent data storage (users, portfolios, stocks) |
| **Cache** | Redis 7 | API response caching and session management |
| **ORM** | SQLAlchemy 2.0 | Database abstraction layer |
| **Auth** | JWT (JSON Web Tokens) | Secure user authentication |
| **Stock Data** | Yahoo Finance API / Alpha Vantage | Real-time and historical market data |
| **ML** | scikit-learn / NumPy / Pandas | Risk calculations and predictions |
| **Containerization** | Docker + Docker Compose | Local development and deployment |
| **CI/CD** | GitHub Actions | Automated testing and deployment |
| **Version Control** | Git + GitHub | Source code management |

---

## 🏗 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
│                     React 18 + Vite + Recharts                  │
└─────────────────────┬───────────────────────────────────────────┘
                      │ HTTP/REST (JSON)
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY / BACKEND                      │
│                    Python 3.11 + FastAPI                         │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐  ┌───────────────┐  │
│  │  Auth    │  │ Portfolio │  │   Risk    │  │   Stock Data  │  │
│  │  Router  │  │  Router   │  │  Router   │  │    Router     │  │
│  └──────────┘  └──────────┘  └───────────┘  └───────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Service Layer (Business Logic)              │   │
│  │   Monte Carlo Engine │ VaR Calculator │ ML Predictor     │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────┬──────────────────────────────┬───────────────────────────┘
       │                              │
       ▼                              ▼
┌──────────────┐              ┌──────────────┐
│ PostgreSQL   │              │    Redis     │
│  Database    │              │    Cache     │
│  (Users,     │              │  (API Cache, │
│  Portfolios, │              │   Sessions)  │
│  Stocks)     │              │              │
└──────────────┘              └──────────────┘
       │                              │
       └──────────────┬───────────────┘
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                     DOCKER COMPOSE                              │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│   │ Frontend │  │ Backend  │  │ Postgres │  │  Redis   │      │
│   │ :3000    │  │  :8000   │  │  :5432   │  │  :6379   │      │
│   └──────────┘  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

> For the detailed architecture diagram, see [`docs/architecture/`](docs/architecture/).

---

## 🌿 Branching Strategy

This project follows **GitHub Flow** — a simple, branch-based workflow ideal for continuous deployment.

### How It Works

```
main (production-ready)
 │
 ├── feature/user-authentication    ← Feature branch
 ├── feature/portfolio-dashboard    ← Feature branch
 ├── feature/risk-engine            ← Feature branch
 ├── bugfix/var-calculation-fix     ← Bugfix branch
 └── hotfix/api-rate-limit          ← Hotfix branch
```

### Rules

| Rule | Description |
|------|-------------|
| **`main` is always deployable** | The `main` branch always contains production-ready code |
| **Branch from `main`** | All feature/bugfix branches are created from `main` |
| **Descriptive branch names** | Use `feature/`, `bugfix/`, `hotfix/` prefixes |
| **Pull Requests** | All changes go through PRs with code review |
| **Delete after merge** | Feature branches are deleted after merging |

### Branch Naming Convention

```
feature/<feature-name>      →  feature/portfolio-builder
bugfix/<bug-description>    →  bugfix/fix-var-calculation
hotfix/<urgent-fix>         →  hotfix/patch-api-crash
docs/<documentation>        →  docs/update-readme
```

### Workflow Steps

1. **Create a branch** from `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```

2. **Make changes** and commit with clear messages:
   ```bash
   git add .
   git commit -m "feat: add portfolio risk dashboard component"
   ```

3. **Push** to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Open a Pull Request** on GitHub and request review.

5. **Merge** into `main` after approval, then delete the branch.

---

## 🚀 Quick Start — Local Development

### Prerequisites

| Tool | Version | Download |
|------|---------|----------|
| **Docker Desktop** | 4.x+ | [docker.com/get-docker](https://www.docker.com/products/docker-desktop/) |
| **Git** | 2.x+ | [git-scm.com](https://git-scm.com/) |
| **Node.js** (optional, for frontend dev) | 18+ | [nodejs.org](https://nodejs.org/) |
| **Python** (optional, for backend dev) | 3.11+ | [python.org](https://www.python.org/) |

### Option 1: Docker Compose (Recommended) 🐳

The easiest way to get the full stack running:

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/stock-risk-predictor.git
cd stock-risk-predictor

# 2. Create environment file
cp .env.example .env
# Edit .env with your API keys (see .env.example for details)

# 3. Build and start all services
docker-compose up --build

# 4. Access the application
#    Frontend:  http://localhost:3000
#    Backend:   http://localhost:8000
#    API Docs:  http://localhost:8000/docs
```

To stop all services:
```bash
docker-compose down
```

To rebuild after code changes:
```bash
docker-compose up --build
```

### Option 2: Manual Setup (For Development)

#### Backend Setup
```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the backend server
uvicorn app.main:app --reload --port 8000
```

#### Frontend Setup
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## 🔧 Local Development Tools

| Tool | Version | Purpose | Installation |
|------|---------|---------|-------------|
| **VS Code** | Latest | Code editor with Python & React extensions | [code.visualstudio.com](https://code.visualstudio.com/) |
| **Docker Desktop** | 4.x+ | Containerization for local dev environment | [docker.com](https://www.docker.com/products/docker-desktop/) |
| **Git** | 2.x+ | Version control | [git-scm.com](https://git-scm.com/) |
| **Python** | 3.11+ | Backend runtime | [python.org](https://www.python.org/) |
| **Node.js** | 18+ | Frontend tooling (Vite, npm) | [nodejs.org](https://nodejs.org/) |
| **PostgreSQL** | 16 | Database (via Docker or local install) | [postgresql.org](https://www.postgresql.org/) |
| **Redis** | 7+ | Caching layer (via Docker or local install) | [redis.io](https://redis.io/) |
| **Postman** | Latest | API testing and debugging | [postman.com](https://www.postman.com/) |
| **pgAdmin** | Latest | PostgreSQL database GUI | [pgadmin.org](https://www.pgadmin.org/) |

### Recommended VS Code Extensions
- **Python** (ms-python.python)
- **Pylance** (ms-python.vscode-pylance)
- **ES7+ React/Redux/React-Native Snippets**
- **Prettier** (Code formatter)
- **Docker** (ms-azuretools.vscode-docker)
- **GitLens** (Git supercharged)
- **Thunder Client** (REST API client)

---

## 📁 Project Structure

```
stock-risk-predictor/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── config.py         # App configuration & env variables
│   │   │   ├── security.py       # JWT authentication logic
│   │   │   └── database.py       # Database connection & session
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── user.py           # User database model
│   │   │   ├── portfolio.py      # Portfolio database model
│   │   │   └── stock.py          # Stock database model
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py           # Authentication endpoints
│   │   │   ├── portfolio.py      # Portfolio CRUD endpoints
│   │   │   ├── stocks.py         # Stock data endpoints
│   │   │   └── risk.py           # Risk analysis endpoints
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── user.py           # Pydantic schemas for users
│   │   │   ├── portfolio.py      # Pydantic schemas for portfolios
│   │   │   └── risk.py           # Pydantic schemas for risk data
│   │   └── services/
│   │       ├── __init__.py
│   │       ├── stock_service.py  # Stock data fetching logic
│   │       ├── risk_engine.py    # Monte Carlo & VaR calculations
│   │       └── ml_predictor.py   # ML-based risk prediction
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── test_auth.py
│   │   ├── test_portfolio.py
│   │   └── test_risk.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   ├── pages/                # Page-level components
│   │   ├── services/             # API service layer
│   │   ├── assets/               # Static assets (images, icons)
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
├── docs/
│   ├── wireframes/               # UI wireframe images
│   └── architecture/             # Architecture diagrams
├── docker-compose.yml
├── .gitignore
├── .env.example
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |
| GET | `/api/auth/me` | Get current user profile |

### Portfolio
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/portfolios` | List all user portfolios |
| POST | `/api/portfolios` | Create a new portfolio |
| GET | `/api/portfolios/{id}` | Get portfolio details |
| PUT | `/api/portfolios/{id}` | Update a portfolio |
| DELETE | `/api/portfolios/{id}` | Delete a portfolio |
| POST | `/api/portfolios/{id}/stocks` | Add stock to portfolio |

### Stocks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stocks/search?q={query}` | Search for stocks |
| GET | `/api/stocks/{symbol}` | Get stock details |
| GET | `/api/stocks/{symbol}/history` | Get historical price data |

### Risk Analysis
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/risk/{portfolio_id}/summary` | Get risk summary |
| POST | `/api/risk/{portfolio_id}/monte-carlo` | Run Monte Carlo simulation |
| GET | `/api/risk/{portfolio_id}/var` | Calculate Value at Risk |
| GET | `/api/risk/{portfolio_id}/volatility` | Get volatility analysis |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by <strong>Jay C</strong>
</p>
