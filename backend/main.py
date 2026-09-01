from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api.v1 import (
    weather_router,
    satellite_router,
    osm_router,
    evaluation_router,
)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url=f"/api/{settings.API_VERSION}/openapi.json"
)

# Cross-Origin Resource Sharing (CORS) Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API v1 Routers
api_v1_prefix = f"/api/{settings.API_VERSION}"
app.include_router(evaluation_router, prefix=api_v1_prefix)
app.include_router(satellite_router, prefix=api_v1_prefix)
app.include_router(osm_router, prefix=api_v1_prefix)
app.include_router(weather_router, prefix=api_v1_prefix)


@app.get("/", tags=["System & Health"])
async def root():
    """Root metadata & service status endpoint"""
    return {
        "status": "online",
        "system": settings.PROJECT_NAME,
        "environment": settings.ENVIRONMENT,
        "api_version": settings.API_VERSION,
        "docs_url": "/docs",
        "endpoints": {
            "evaluation": f"{api_v1_prefix}/evaluate/site",
            "ai_susceptibility": f"{api_v1_prefix}/evaluate/susceptibility",
            "dynamic_red_zones": f"{api_v1_prefix}/evaluate/red-zones",
            "safe_relocation_sites": f"{api_v1_prefix}/evaluate/safe-sites",
            "resettlement_queue": f"{api_v1_prefix}/evaluate/resettlement-queue",
            "satellite_ndvi": f"{api_v1_prefix}/satellite/ndvi",
            "satellite_land_cover": f"{api_v1_prefix}/satellite/land-cover",
            "osm_features": f"{api_v1_prefix}/osm/features/<bbox>",
            "weather_current": f"{api_v1_prefix}/weather/current/<lat>/<lon>",
            "cloudburst_check": f"{api_v1_prefix}/weather/cloudburst-check/<lat>/<lon>"
        },
        "services": {
            "weather": "OpenWeatherMap + IMD Real-Time Service",
            "satellite": "Copernicus CDSE + SentinelHub Remote Sensing Engine",
            "osm": "OpenStreetMap Overpass Vector Engine",
            "ai_engine": "PyTorch INT8 Quantized SusceptibilityNN",
            "spatial_engine": "MCDA Carrying Capacity & Dynamic Zonation Engine"
        }
    }


@app.get("/api/health", tags=["System & Health"])
async def health():
    """Healthcheck endpoint for container orchestration & load balancers"""
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.API_VERSION
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)