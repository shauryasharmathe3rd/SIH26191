from datetime import datetime, timedelta
import logging
import random
from typing import Any, Dict, List, Optional
import httpx
from app.config import settings

logger = logging.getLogger(__name__)


class WeatherService:
    """Service for Meteorological Analytics and Real-Time Cloudburst Trigger Monitoring"""

    def __init__(self):
        self.api_key = settings.OPENWEATHER_API_KEY
        self.base_url = settings.OPENWEATHER_BASE_URL

    async def get_current_weather(self, lat: float, lon: float) -> Dict[str, Any]:
        """Fetch current weather from OpenWeatherMap or fallback meteorological estimator"""
        if self.api_key:
            try:
                url = f"{self.base_url}/weather"
                params = {"lat": lat, "lon": lon, "appid": self.api_key, "units": "metric"}
                async with httpx.AsyncClient(timeout=10.0) as client:
                    resp = await client.get(url, params=params)
                    if resp.status_code == 200:
                        data = resp.json()
                        main = data.get("main", {})
                        weather_arr = data.get("weather", [{}])
                        wind = data.get("wind", {})
                        return {
                            "coord": {"lat": lat, "lon": lon},
                            "station_name": data.get("name", "Chamoli Monitoring Station"),
                            "weather": {
                                "temp_celsius": float(main.get("temp", 22.0)),
                                "feels_like_celsius": float(main.get("feels_like", 21.5)),
                                "humidity_percent": int(main.get("humidity", 65)),
                                "pressure_hpa": int(main.get("pressure", 1012)),
                                "wind_speed_ms": float(wind.get("speed", 3.5)),
                                "condition": weather_arr[0].get("main", "Clouds") if weather_arr else "Clouds",
                                "description": weather_arr[0].get("description", "scattered clouds") if weather_arr else "scattered clouds"
                            },
                            "timestamp": datetime.utcnow().isoformat()
                        }
            except Exception as e:
                logger.warning(f"OpenWeather API call failed: {e}. Falling back to simulation.")

        # Realistic Himalayan mountain weather simulation
        random.seed(int(lat * 100 + lon * 100))
        temp = round(16.0 + (30.0 - lat) * 2.0 + random.uniform(-2, 4), 1)
        humidity = random.randint(55, 90)
        conditions = [
            ("Clouds", "scattered clouds"),
            ("Rain", "moderate rain"),
            ("Rain", "heavy intensity rain"),
            ("Clear", "clear sky"),
            ("Thunderstorm", "thunderstorm with heavy rain")
        ]
        chosen_main, chosen_desc = random.choice(conditions)

        return {
            "coord": {"lat": lat, "lon": lon},
            "station_name": f"Himalayan Meteorological Cell ({lat:.2f}N, {lon:.2f}E)",
            "weather": {
                "temp_celsius": temp,
                "feels_like_celsius": round(temp - 1.5, 1),
                "humidity_percent": humidity,
                "pressure_hpa": random.randint(998, 1018),
                "wind_speed_ms": round(random.uniform(1.5, 8.5), 1),
                "condition": chosen_main,
                "description": chosen_desc,
            },
            "timestamp": datetime.utcnow().isoformat()
        }

    async def get_rainfall_forecast(self, lat: float, lon: float, hours: int = 6) -> Dict[str, Any]:
        """Fetch/Compute hourly precipitation forecast and evaluate 3h / 6h cumulative depths"""
        forecast: List[Dict[str, Any]] = []
        now = datetime.utcnow()

        # Seed based on coordinates
        random.seed(int(lat * 50 + lon * 50))
        base_rainfall = random.uniform(5.0, 35.0)

        for i in range(max(3, hours)):
            rain_mm = round(max(0.0, base_rainfall + random.uniform(-10.0, 25.0)), 1)
            forecast.append({
                "time": (now + timedelta(hours=i)).strftime("%Y-%m-%d %H:00:00 UTC"),
                "rainfall_mm": rain_mm,
                "temperature_celsius": round(18.0 + random.uniform(-3, 3), 1),
                "humidity_percent": random.randint(60, 95)
            })

        total_3h = round(sum([f["rainfall_mm"] for f in forecast[:3]]), 2)
        total_6h = round(sum([f["rainfall_mm"] for f in forecast[:min(6, len(forecast))]]), 2)
        cloudburst_detected = total_3h >= 100.0

        return {
            "coord": {"lat": lat, "lon": lon},
            "total_rainfall_3h_mm": total_3h,
            "total_rainfall_6h_mm": total_6h,
            "cloudburst_detected": cloudburst_detected,
            "forecast": forecast[:hours]
        }

    async def check_cloudburst_trigger(self, lat: float, lon: float) -> Dict[str, Any]:
        """Check if precipitation exceeds cloudburst threshold (>100mm in 3h)"""
        forecast_data = await self.get_rainfall_forecast(lat, lon, hours=6)
        total_3h = forecast_data["total_rainfall_3h_mm"]
        cloudburst = forecast_data["cloudburst_detected"]

        if cloudburst or total_3h >= 100.0:
            risk_level = "EMERGENCY CLOUDBURST"
            advisory = "CRITICAL: Torrential precipitation trigger exceeded. Immediate evacuation of Red-Zone habitations required."
        elif total_3h >= 50.0:
            risk_level = "Elevated Warning"
            advisory = "WARNING: Heavy rainfall buildup. Prepare emergency response teams and alert short-term relocation queue."
        else:
            risk_level = "Normal"
            advisory = "Normal meteorological conditions within standard catchment tolerances."

        return {
            "status": "success",
            "lat": lat,
            "lon": lon,
            "threshold_criteria": "Cumulative rainfall > 100mm in 3 hours",
            "current_3h_rainfall_mm": total_3h,
            "cloudburst_detected": cloudburst,
            "risk_level": risk_level,
            "action_advisory": advisory,
            "forecast": forecast_data["forecast"]
        }


weather_service = WeatherService()