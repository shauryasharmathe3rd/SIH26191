from .weather_routes import router as weather_router
from .satellite_routes import router as satellite_router
from .osm_routes import router as osm_router
from .evaluation_routes import router as evaluation_router

__all__ = [
    "weather_router",
    "satellite_router",
    "osm_router",
    "evaluation_router",
]