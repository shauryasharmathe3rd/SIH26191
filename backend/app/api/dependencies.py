from typing import Generator
from app.config import settings, Settings


def get_settings() -> Settings:
    """Dependency provider for application settings"""
    return settings
