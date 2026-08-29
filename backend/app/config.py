import os
from pathlib import Path
from typing import Optional

ROOT_DIR = Path(__file__).resolve().parent.parent
BASE_DIR = ROOT_DIR.parent
DATA_PIPELINE_PROCESSED_DIR = ROOT_DIR / "data_pipeline" / "processed"
DATA_PIPELINE_SCRIPTS_PROCESSED_DIR = ROOT_DIR / "data_pipeline" / "scripts" / "processed"

class Settings:
    """Centralized Configuration for RESITE-GIS FastAPI Backend"""
    def __init__(self):
        self.PROJECT_NAME: str = "RESITE-GIS API"
        self.PROJECT_DESCRIPTION: str = (
            "Resilient Environmental Site Assessment & Relocation Engine - "
            "AI-driven, GIS-enabled decision-support platform for Disaster Management Authorities"
        )
        self.API_VERSION: str = "v1"
        self.ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
        self.DEBUG: bool = os.getenv("DEBUG", "True").lower() in ("true", "1", "t")

        # Database (PostgreSQL / PostGIS)
        self.DATABASE_URL: str = os.getenv(
            "DATABASE_URL",
            "postgresql+asyncpg://postgres:postgres@localhost:5432/resite_gis"
        )

        # Copernicus CDSE & Sentinel-Hub Credentials
        self.COPERNICUS_CLIENT_ID: str = os.getenv("COPERNICUS_CLIENT_ID", "")
        self.COPERNICUS_CLIENT_SECRET: str = os.getenv("COPERNICUS_CLIENT_SECRET", "")
        self.SENTINELHUB_CLIENT_ID: str = os.getenv("SENTINELHUB_CLIENT_ID", "")
        self.SENTINELHUB_CLIENT_SECRET: str = os.getenv("SENTINELHUB_CLIENT_SECRET", "")
        self.SENTINELHUB_TOKEN_URL: str = os.getenv(
            "SENTINELHUB_TOKEN_URL",
            "https://identity.dataspace.copernicus.eu/auth/realms/CDSE/protocol/openid-connect/token"
        )
        self.SENTINELHUB_BASE_URL: str = os.getenv(
            "SENTINELHUB_BASE_URL",
            "https://sh.dataspace.copernicus.eu"
        )

        # OpenStreetMap Overpass API
        self.OVERPASS_BASE_URL: str = os.getenv(
            "OVERPASS_BASE_URL",
            "https://overpass-api.de/api/interpreter"
        )

        # Meteorological Data Providers
        self.OPENWEATHER_API_KEY: str = os.getenv("OPENWEATHER_API_KEY", "")
        self.OPENWEATHER_BASE_URL: str = os.getenv(
            "OPENWEATHER_BASE_URL",
            "https://api.openweathermap.org/data/2.5"
        )
        self.IMD_API_KEY: str = os.getenv("IMD_API_KEY", "")

        # Frontend & Mapbox Token
        self.VITE_MAPBOX_TOKEN: str = os.getenv("VITE_MAPBOX_TOKEN", "")

        # Local Data Directories
        self.ROOT_DIR: Path = ROOT_DIR
        self.PROCESSED_DATA_DIR: Path = (
            DATA_PIPELINE_PROCESSED_DIR
            if DATA_PIPELINE_PROCESSED_DIR.exists()
            else DATA_PIPELINE_SCRIPTS_PROCESSED_DIR
        )

settings = Settings()