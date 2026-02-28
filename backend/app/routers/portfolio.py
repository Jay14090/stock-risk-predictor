"""Portfolio router — CRUD operations for user portfolios"""

from fastapi import APIRouter, HTTPException, status

router = APIRouter()


@router.get("/")
async def list_portfolios():
    """List all portfolios for the current user"""
    return [
        {
            "id": 1,
            "name": "Tech Growth",
            "stocks": ["AAPL", "GOOGL", "MSFT"],
            "total_value": 50000.00,
            "risk_score": 6.5,
        }
    ]


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_portfolio(name: str):
    """Create a new portfolio"""
    return {"id": 2, "name": name, "stocks": [], "total_value": 0.0}


@router.get("/{portfolio_id}")
async def get_portfolio(portfolio_id: int):
    """Get portfolio details by ID"""
    return {
        "id": portfolio_id,
        "name": "Tech Growth",
        "stocks": [
            {"symbol": "AAPL", "shares": 10, "avg_price": 175.50},
            {"symbol": "GOOGL", "shares": 5, "avg_price": 140.00},
        ],
        "total_value": 50000.00,
    }


@router.put("/{portfolio_id}")
async def update_portfolio(portfolio_id: int, name: str):
    """Update a portfolio"""
    return {"id": portfolio_id, "name": name, "message": "Portfolio updated"}


@router.delete("/{portfolio_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_portfolio(portfolio_id: int):
    """Delete a portfolio"""
    return None


@router.post("/{portfolio_id}/stocks")
async def add_stock_to_portfolio(portfolio_id: int, symbol: str, shares: int):
    """Add a stock to a portfolio"""
    return {
        "portfolio_id": portfolio_id,
        "stock": {"symbol": symbol, "shares": shares},
        "message": "Stock added to portfolio",
    }
