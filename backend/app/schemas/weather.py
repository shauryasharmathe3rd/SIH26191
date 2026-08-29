from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class WeatherData(BaseModel):
    """Current Meteorological Observation"""
    temp_celsius: float
    feels_like_celsius: float
    humidity_percent: int
    pressure_hpa: int
    wind_speed_ms: float
    condition: str
    description: str


class CurrentWeatherResponse(BaseModel):
    """Current Weather API Response"""
    status: str = "success"
    coord: Dict[str, float]
    station_name: str
    weather: WeatherData
    timestamp: str


class HourlyForecastItem(BaseModel):
    """Hourly precipitation & temperature forecast"""
    time: str
    rainfall_mm: float
    temperature_celsius: float
    humidity_percent: int


class ForecastResponse(BaseModel):
    """Rainfall Forecast Response"""
    status: str = "success"
    coord: Dict[str, float]
    total_rainfall_3h_mm: float
    total_rainfall_6h_mm: float
    cloudburst_detected: bool
    forecast: List[HourlyForecastItem]


class CloudburstCheckResponse(BaseModel):
    """Cloudburst Detection Trigger Response"""
    status: str = "success"
    lat: float
    lon: float
    threshold_criteria: str = "Cumulative rainfall > 100mm in 3 hours"
    current_3h_rainfall_mm: float
    cloudburst_detected: bool
    risk_level: str = Field(..., description="'Normal', 'Elevated Warning', or 'EMERGENCY CLOUDBURST'")
    action_advisory: str
    forecast: List[HourlyForecastItem]
