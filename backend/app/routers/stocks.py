"""Stocks router — Stock search and historical data"""

from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.get("/search")
async def search_stocks(q: str):
    """Search for stocks by name or symbol"""
    return [
        {"symbol": "AAPL", "name": "Apple Inc.", "exchange": "NASDAQ"},
        {"symbol": "AMZN", "name": "Amazon.com Inc.", "exchange": "NASDAQ"},
    ]


@router.get("/{symbol}")
async def get_stock(symbol: str):
    """Get current stock details"""
    return {
        "symbol": symbol.upper(),
        "name": "Apple Inc.",
        "price": 178.72,
        "change": 2.34,
        "change_percent": 1.33,
        "volume": 52_340_000,
        "market_cap": 2_780_000_000_000,
    }


@router.get("/{symbol}/history")
async def get_stock_history(symbol: str, period: str = "1y"):
    """Get historical price data for a stock"""
    return {
        "symbol": symbol.upper(),
        "period": period,
        "data": [
            {"date": "2025-01-02", "open": 170.0, "close": 172.5, "volume": 50000000},
            {"date": "2025-01-03", "open": 172.5, "close": 175.0, "volume": 48000000},
        ],
    }
