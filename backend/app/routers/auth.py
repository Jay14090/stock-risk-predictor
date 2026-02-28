"""Authentication router — Login, Register, Profile"""

from fastapi import APIRouter, HTTPException, status

router = APIRouter()


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(username: str, email: str, password: str):
    """Register a new user account"""
    return {
        "message": "User registered successfully",
        "user": {"username": username, "email": email},
    }


@router.post("/login")
async def login(email: str, password: str):
    """Login and receive a JWT access token"""
    return {
        "access_token": "sample-jwt-token",
        "token_type": "bearer",
    }


@router.get("/me")
async def get_current_user():
    """Get the current authenticated user's profile"""
    return {
        "id": 1,
        "username": "demo_user",
        "email": "demo@stockrisk.com",
    }
