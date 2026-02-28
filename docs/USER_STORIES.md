# 📋 User Stories — Stock Risk Predictor

> **25 User Stories** organized by feature area. Each story follows the format:
> _As a [role], I want [feature], so that [benefit]._
>
> **Copy each story as a GitHub Issue** with the Title, Description, and Acceptance Criteria.

---

## 🔐 Authentication & User Management

### US-01: User Registration
**Title:** User Registration  
**As a** new user, **I want to** create an account with email and password, **so that** I can save my portfolios and access personalized risk analysis.

**Acceptance Criteria:**
- [ ] User can register with username, email, and password
- [ ] Email must be unique and properly validated
- [ ] Password must be at least 8 characters with mixed case and numbers
- [ ] User receives a success confirmation after registration

**Labels:** `feature`, `authentication`, `must-have`

---

### US-02: User Login
**Title:** User Login  
**As a** registered user, **I want to** log in with my credentials, **so that** I can access my saved portfolios and risk data.

**Acceptance Criteria:**
- [ ] User can log in with email and password
- [ ] System returns a JWT token upon successful login
- [ ] Invalid credentials show a clear error message
- [ ] Session persists across browser tabs

**Labels:** `feature`, `authentication`, `must-have`

---

### US-03: User Profile Management
**Title:** User Profile Management  
**As a** logged-in user, **I want to** view and edit my profile information, **so that** I can keep my account details up to date.

**Acceptance Criteria:**
- [ ] User can view their profile (username, email, join date)
- [ ] User can update their username and password
- [ ] Changes are saved and reflected immediately

**Labels:** `feature`, `authentication`, `should-have`

---

### US-04: Password Reset
**Title:** Password Reset  
**As a** user who forgot my password, **I want to** reset it via email, **so that** I can regain access to my account.

**Acceptance Criteria:**
- [ ] User can request a password reset link via email
- [ ] Reset link expires after 24 hours
- [ ] User can set a new password using the reset link

**Labels:** `feature`, `authentication`, `should-have`

---

## 📊 Dashboard

### US-05: Portfolio Overview Dashboard
**Title:** Portfolio Overview Dashboard  
**As a** user, **I want to** see an overview dashboard when I log in, **so that** I can quickly understand my portfolio's current risk status.

**Acceptance Criteria:**
- [ ] Dashboard displays total portfolio value
- [ ] Shows risk score (Low/Medium/High) with color coding
- [ ] Displays key metrics: VaR, volatility, beta
- [ ] Dashboard loads within 2 seconds

**Labels:** `feature`, `dashboard`, `must-have`

---

### US-06: Real-Time Market Summary
**Title:** Real-Time Market Summary  
**As a** user, **I want to** see a real-time market summary on my dashboard, **so that** I can stay informed about current market conditions.

**Acceptance Criteria:**
- [ ] Shows major index prices (S&P 500, NASDAQ, DOW)
- [ ] Displays daily change with green/red indicators
- [ ] Data refreshes at configurable intervals

**Labels:** `feature`, `dashboard`, `should-have`

---

### US-07: Risk Score Widget
**Title:** Risk Score Widget  
**As a** user, **I want to** see a visual risk score gauge on my dashboard, **so that** I can instantly understand how risky my portfolio is.

**Acceptance Criteria:**
- [ ] Risk score displayed as a gauge/meter (0-10 scale)
- [ ] Color-coded: green (low), yellow (medium), red (high)
- [ ] Tooltip explains what the score means

**Labels:** `feature`, `dashboard`, `could-have`

---

## 💼 Portfolio Management

### US-08: Create Portfolio
**Title:** Create Portfolio  
**As a** user, **I want to** create a new stock portfolio, **so that** I can organize and track my investments.

**Acceptance Criteria:**
- [ ] User can name the portfolio
- [ ] Portfolio is created and appears in portfolio list
- [ ] User can create multiple portfolios

**Labels:** `feature`, `portfolio`, `must-have`

---

### US-09: Add Stocks to Portfolio
**Title:** Add Stocks to Portfolio  
**As a** user, **I want to** add stocks to my portfolio by searching ticker symbols, **so that** I can build my investment portfolio.

**Acceptance Criteria:**
- [ ] Search bar with autocomplete for stock symbols
- [ ] User can specify number of shares and purchase price
- [ ] Stock appears in portfolio after adding
- [ ] Portfolio value updates accordingly

**Labels:** `feature`, `portfolio`, `must-have`

---

### US-10: Remove Stocks from Portfolio
**Title:** Remove Stocks from Portfolio  
**As a** user, **I want to** remove stocks from my portfolio, **so that** I can keep my portfolio accurate if I sell positions.

**Acceptance Criteria:**
- [ ] User can select a stock and remove it
- [ ] Confirmation dialog before removal
- [ ] Portfolio value and risk metrics update after removal

**Labels:** `feature`, `portfolio`, `must-have`

---

### US-11: Edit Stock Holdings
**Title:** Edit Stock Holdings  
**As a** user, **I want to** edit the number of shares and average price of stocks in my portfolio, **so that** I can reflect changes in my actual holdings.

**Acceptance Criteria:**
- [ ] User can edit shares and average price for any stock
- [ ] Changes update portfolio value and risk calculations
- [ ] Changes are saved persistently

**Labels:** `feature`, `portfolio`, `should-have`

---

### US-12: Delete Portfolio
**Title:** Delete Portfolio  
**As a** user, **I want to** delete an entire portfolio, **so that** I can remove portfolios I no longer need.

**Acceptance Criteria:**
- [ ] User can delete a portfolio with confirmation
- [ ] All associated stocks and risk data are removed
- [ ] Deletion is irreversible with clear warning

**Labels:** `feature`, `portfolio`, `must-have`

---

## 📈 Stock Data & Analysis

### US-13: Stock Search
**Title:** Stock Search  
**As a** user, **I want to** search for stocks by name or ticker symbol, **so that** I can find specific stocks to analyze or add to my portfolio.

**Acceptance Criteria:**
- [ ] Search returns results as user types (debounced)
- [ ] Shows stock name, symbol, and current price
- [ ] Clicking a result navigates to stock detail page

**Labels:** `feature`, `stocks`, `must-have`

---

### US-14: View Stock Details
**Title:** View Stock Details  
**As a** user, **I want to** view detailed information about a specific stock, **so that** I can make informed decisions about adding it to my portfolio.

**Acceptance Criteria:**
- [ ] Shows current price, daily change, volume, market cap
- [ ] Displays interactive price chart (1D, 1W, 1M, 3M, 1Y, 5Y)
- [ ] Shows key statistics (P/E ratio, 52-week high/low, etc.)

**Labels:** `feature`, `stocks`, `must-have`

---

### US-15: Historical Price Charts
**Title:** Historical Price Charts  
**As a** user, **I want to** view interactive historical price charts for any stock, **so that** I can analyze past performance trends.

**Acceptance Criteria:**
- [ ] Line chart with selectable time ranges
- [ ] Hover shows exact price on a specific date
- [ ] Volume bars shown below price chart
- [ ] Chart is responsive and works on mobile

**Labels:** `feature`, `stocks`, `should-have`

---

## 🎲 Risk Analysis

### US-16: Monte Carlo Simulation
**Title:** Monte Carlo Simulation  
**As a** user, **I want to** run Monte Carlo simulations on my portfolio, **so that** I can see the range of possible future outcomes.

**Acceptance Criteria:**
- [ ] User can set number of simulations (1,000 to 100,000)
- [ ] User can set time horizon (30, 90, 180, 252 days)
- [ ] Results show distribution of outcomes
- [ ] Displays probability of loss percentage
- [ ] Visual fan chart of simulation paths

**Labels:** `feature`, `risk-analysis`, `must-have`

---

### US-17: Value at Risk (VaR) Calculation
**Title:** Value at Risk (VaR) Calculation  
**As a** user, **I want to** see Value at Risk at 95% and 99% confidence levels, **so that** I can understand my maximum expected daily loss.

**Acceptance Criteria:**
- [ ] Calculates VaR using historical simulation method
- [ ] Displays VaR at 95% and 99% confidence levels
- [ ] Shows both dollar amount and percentage
- [ ] Plain-English interpretation of VaR results

**Labels:** `feature`, `risk-analysis`, `must-have`

---

### US-18: Volatility Analysis
**Title:** Volatility Analysis  
**As a** user, **I want to** see my portfolio's volatility over time, **so that** I can understand how much my portfolio value fluctuates.

**Acceptance Criteria:**
- [ ] Shows annualized and daily volatility
- [ ] Rolling volatility chart over time
- [ ] Compares portfolio volatility to benchmark (S&P 500)

**Labels:** `feature`, `risk-analysis`, `must-have`

---

### US-19: Portfolio Correlation Matrix
**Title:** Portfolio Correlation Matrix  
**As a** user, **I want to** see a correlation matrix of stocks in my portfolio, **so that** I can understand diversification and concentration risk.

**Acceptance Criteria:**
- [ ] Heatmap showing pairwise correlations
- [ ] Color-coded (red = high correlation, blue = low)
- [ ] Identifies the most correlated stock pairs

**Labels:** `feature`, `risk-analysis`, `could-have`

---

### US-20: Scenario Stress Testing
**Title:** Scenario Stress Testing  
**As a** user, **I want to** simulate stress scenarios (e.g., 2008 crash, COVID drop), **so that** I can see how my portfolio would perform in extreme conditions.

**Acceptance Criteria:**
- [ ] Preset scenarios: Market Crash (-30%), Rate Hike, Sector Rotation
- [ ] Custom scenario: user-defined percentage drop
- [ ] Shows projected portfolio loss for each scenario

**Labels:** `feature`, `risk-analysis`, `could-have`

---

## 🔔 Alerts & Notifications

### US-21: Set Risk Alert Thresholds
**Title:** Set Risk Alert Thresholds  
**As a** user, **I want to** set custom alert thresholds for risk metrics, **so that** I get notified when my portfolio risk exceeds acceptable levels.

**Acceptance Criteria:**
- [ ] User can set max VaR threshold
- [ ] User can set max volatility threshold
- [ ] Alerts appear as in-app notifications
- [ ] User can enable/disable individual alerts

**Labels:** `feature`, `alerts`, `should-have`

---

### US-22: In-App Risk Notifications
**Title:** In-App Risk Notifications  
**As a** user, **I want to** receive in-app notifications when risk thresholds are breached, **so that** I can take timely action.

**Acceptance Criteria:**
- [ ] Bell icon in navbar shows notification count
- [ ] Dropdown shows recent notifications with timestamps
- [ ] Clicking a notification navigates to the relevant portfolio

**Labels:** `feature`, `alerts`, `should-have`

---

## 📄 Reports

### US-23: Generate PDF Risk Report
**Title:** Generate PDF Risk Report  
**As a** user, **I want to** generate a downloadable PDF risk report for my portfolio, **so that** I can share it with clients or keep records.

**Acceptance Criteria:**
- [ ] Report includes: portfolio summary, VaR, volatility, Monte Carlo results
- [ ] Professional formatting with charts and tables
- [ ] Downloadable as PDF
- [ ] Includes generation date and portfolio name

**Labels:** `feature`, `reports`, `should-have`

---

## ⚙️ Settings & Admin

### US-24: Configure API Keys
**Title:** Configure API Keys  
**As an** admin/developer, **I want to** configure stock data API keys in the settings, **so that** the application can fetch real-time market data.

**Acceptance Criteria:**
- [ ] Settings page for API key input
- [ ] API key is stored securely (not in plain text in frontend)
- [ ] Connection test button to verify API key works

**Labels:** `feature`, `settings`, `must-have`

---

### US-25: Dark/Light Theme Toggle
**Title:** Dark/Light Theme Toggle  
**As a** user, **I want to** switch between dark and light themes, **so that** I can use the app comfortably in different lighting conditions.

**Acceptance Criteria:**
- [ ] Toggle switch in navbar or settings
- [ ] Theme preference persists across sessions (localStorage)
- [ ] All components render correctly in both themes

**Labels:** `feature`, `settings`, `could-have`

---

## 📊 Summary Table

| ID | Story Title | Category | MoSCoW |
|----|------------|----------|--------|
| US-01 | User Registration | Auth | Must |
| US-02 | User Login | Auth | Must |
| US-03 | User Profile Management | Auth | Should |
| US-04 | Password Reset | Auth | Should |
| US-05 | Portfolio Overview Dashboard | Dashboard | Must |
| US-06 | Real-Time Market Summary | Dashboard | Should |
| US-07 | Risk Score Widget | Dashboard | Could |
| US-08 | Create Portfolio | Portfolio | Must |
| US-09 | Add Stocks to Portfolio | Portfolio | Must |
| US-10 | Remove Stocks from Portfolio | Portfolio | Must |
| US-11 | Edit Stock Holdings | Portfolio | Should |
| US-12 | Delete Portfolio | Portfolio | Must |
| US-13 | Stock Search | Stocks | Must |
| US-14 | View Stock Details | Stocks | Must |
| US-15 | Historical Price Charts | Stocks | Should |
| US-16 | Monte Carlo Simulation | Risk | Must |
| US-17 | Value at Risk (VaR) | Risk | Must |
| US-18 | Volatility Analysis | Risk | Must |
| US-19 | Portfolio Correlation Matrix | Risk | Could |
| US-20 | Scenario Stress Testing | Risk | Could |
| US-21 | Set Risk Alert Thresholds | Alerts | Should |
| US-22 | In-App Risk Notifications | Alerts | Should |
| US-23 | Generate PDF Risk Report | Reports | Should |
| US-24 | Configure API Keys | Settings | Must |
| US-25 | Dark/Light Theme Toggle | Settings | Could |
