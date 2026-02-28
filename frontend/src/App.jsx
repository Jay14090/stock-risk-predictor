import React from 'react'
import './App.css'

function App() {
    return (
        <div className="app">
            {/* Navigation */}
            <nav className="navbar">
                <div className="navbar-brand">
                    <span className="logo-icon">📈</span>
                    <span className="logo-text">Stock Risk Predictor</span>
                </div>
                <div className="navbar-links">
                    <a href="#dashboard" className="nav-link active">Dashboard</a>
                    <a href="#portfolio" className="nav-link">Portfolio</a>
                    <a href="#analysis" className="nav-link">Risk Analysis</a>
                    <a href="#reports" className="nav-link">Reports</a>
                </div>
                <div className="navbar-actions">
                    <button className="btn btn-outline">Sign In</button>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-badge">🚀 AI-Powered Risk Analysis</div>
                    <h1>Understand Your <span className="gradient-text">Portfolio Risk</span> Before It's Too Late</h1>
                    <p className="hero-subtitle">
                        Monte Carlo simulations, Value at Risk, and ML-powered predictions —
                        professional-grade risk analysis, completely free.
                    </p>
                    <div className="hero-actions">
                        <button className="btn btn-primary btn-lg">
                            Start Analyzing →
                        </button>
                        <button className="btn btn-ghost btn-lg">
                            View Demo
                        </button>
                    </div>
                    <div className="hero-stats">
                        <div className="stat">
                            <span className="stat-value">10,000+</span>
                            <span className="stat-label">Simulations/sec</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <span className="stat-value">95%</span>
                            <span className="stat-label">VaR Confidence</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <span className="stat-value">Real-time</span>
                            <span className="stat-label">Market Data</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <h2 className="section-title">Powerful Risk Analysis Tools</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🎲</div>
                        <h3>Monte Carlo Simulation</h3>
                        <p>Run thousands of market scenarios to understand the range of possible portfolio outcomes.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Value at Risk (VaR)</h3>
                        <p>Calculate the maximum expected loss at 95% and 99% confidence levels.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📈</div>
                        <h3>Volatility Tracking</h3>
                        <p>Monitor portfolio and individual stock volatility with rolling window analysis.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔔</div>
                        <h3>Risk Alerts</h3>
                        <p>Get notified when your portfolio risk metrics exceed your defined thresholds.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📄</div>
                        <h3>PDF Reports</h3>
                        <p>Generate professional-grade risk reports ready for clients and presentations.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🤖</div>
                        <h3>ML Predictions</h3>
                        <p>Machine learning models that predict risk trends and potential market movements.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>© 2025 Stock Risk Predictor — Built by <strong>Jay C</strong></p>
            </footer>
        </div>
    )
}

export default App
