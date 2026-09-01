from .v1 import weather_router, satellite_router, osm_router, evaluation_router
from .dependencies import get_settings

__all__ = [
    "weather_router",
    "satellite_router",
    "osm_router",
    "evaluation_router",
    "get_settings",
]