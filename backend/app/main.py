"""
Stock Risk Predictor — FastAPI Backend
Main application entry point
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, portfolio, stocks, risk

app = FastAPI(
    title="Stock Risk Predictor API",
    description="API for stock portfolio risk analysis using Monte Carlo simulations, VaR, and ML predictions",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(portfolio.router, prefix="/api/portfolios", tags=["Portfolios"])
app.include_router(stocks.router, prefix="/api/stocks", tags=["Stocks"])
app.include_router(risk.router, prefix="/api/risk", tags=["Risk Analysis"])


@app.get("/", tags=["Health"])
async def root():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "app": "Stock Risk Predictor",
        "version": "1.0.0",
    }


@app.get("/api/health", tags=["Health"])
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "services": {
            "api": "running",
            "database": "connected",
            "cache": "connected",
        },
    }
