"""
Application Configuration
Loads settings from environment variables
"""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from .env file"""

    APP_NAME: str = "Stock Risk Predictor"
    APP_ENV: str = "development"
    DEBUG: bool = True

    # Security
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Database
    DATABASE_URL: str = "postgresql://stockuser:stockpassword@db:5432/stockrisk"

    # Redis
    REDIS_URL: str = "redis://redis:6379/0"

    # External APIs
    ALPHA_VANTAGE_API_KEY: str = ""

    class Config:
        env_file = ".env"
        extra = "allow"


settings = Settings()
