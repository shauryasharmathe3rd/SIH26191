from typing import Any, Dict
from fastapi import APIRouter, HTTPException, Query
from app.schemas.weather import (
    CloudburstCheckResponse,
    CurrentWeatherResponse,
    ForecastResponse,
)
from app.services.weather_service import weather_service

router = APIRouter(prefix="/weather", tags=["Meteorological & Cloudburst Monitoring"])


@router.get("/current/{lat}/{lon}", response_model=CurrentWeatherResponse)
async def get_current_weather(lat: float, lon: float) -> Dict[str, Any]:
    """
    Get live real-time weather observations at coordinate location (temperature, humidity, wind, pressure).
    """
    try:
        data = await weather_service.get_current_weather(lat, lon)
        return {
            "status": "success",
            "coord": data["coord"],
            "station_name": data["station_name"],
            "weather": data["weather"],
            "timestamp": data["timestamp"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch weather: {str(e)}")


@router.get("/forecast/{lat}/{lon}", response_model=ForecastResponse)
async def get_forecast(
    lat: float,
    lon: float,
    hours: int = Query(default=6, ge=1, le=48, description="Forecast horizon in hours")
) -> Dict[str, Any]:
    """
    Get precipitation forecast and 3-hour / 6-hour cumulative rainfall accumulations.
    """
    try:
        data = await weather_service.get_rainfall_forecast(lat, lon, hours=hours)
        return {
            "status": "success",
            "coord": data["coord"],
            "total_rainfall_3h_mm": data["total_rainfall_3h_mm"],
            "total_rainfall_6h_mm": data["total_rainfall_6h_mm"],
            "cloudburst_detected": data["cloudburst_detected"],
            "forecast": data["forecast"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch forecast: {str(e)}")


@router.get("/cloudburst-check/{lat}/{lon}", response_model=CloudburstCheckResponse)
async def check_cloudburst_trigger(lat: float, lon: float) -> Dict[str, Any]:
    """
    Evaluate real-time cloudburst hazard trigger criteria (>100mm rainfall in 3 hours)
    and return actionable SDMA evacuation advisory.
    """
    try:
        data = await weather_service.check_cloudburst_trigger(lat, lon)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to check cloudburst: {str(e)}")