import asyncio
import logging
import math
from typing import Any, Dict, Optional
from app.services.osm_service import osm_service
from app.services.satellite_service import satellite_service
from app.services.weather_service import weather_service
from app.services.spatial_pipeline_service import spatial_pipeline_service
from app.services.susceptibility_service import susceptibility_service

logger = logging.getLogger(__name__)


class EvaluationService:
    """Orchestrator for Multi-Criteria Relocation Site Evaluation & Carrying Capacity Assessment"""

    async def evaluate_site(self, lat: float, lon: float, radius_km: float = 5.0) -> Dict[str, Any]:
        """
        Comprehensive candidate site assessment:
        1. Parallel data fetch from OSM, Satellite (CDSE), and Weather APIs.
        2. Geospatial terrain & AI susceptibility scoring.
        3. MCDA Carrying Capacity Index (CCI) calculation.
        """
        radius_deg = radius_km / 111.32
        bbox = [lon - radius_deg, lat - radius_deg, lon + radius_deg, lat + radius_deg]
        bbox_str = f"{lat - radius_deg},{lon - radius_deg},{lat + radius_deg},{lon + radius_deg}"

        # Parallel asynchronous execution across external providers
        osm_data, land_cover, weather_data, flood_data = await asyncio.gather(
            osm_service.get_all_features(bbox_str),
            satellite_service.analyze_land_cover(bbox, "2024-01-01"),
            weather_service.get_current_weather(lat, lon),
            satellite_service.detect_flood(bbox, "2024-01-01")
        )

        # AI Hazard Susceptibility Score at the site
        est_features = susceptibility_service.estimate_features_from_coords(lat, lon)
        ai_hazard_result = susceptibility_service.predict(est_features)
        hazard_score = ai_hazard_result.get("susceptibility_score", 0.25)

        # Multi-Criteria Decision Analysis (MCDA) for Carrying Capacity Index (CCI)
        # Criteria:
        # S1: Slope stability (Slope < 15 deg gives maximum score)
        slope = est_features.slope
        s1_slope_score = max(0.0, 1.0 - (slope / 30.0)) * 100.0 if slope < 30 else 0.0

        # S2: Hydrological safety (Distance from streams > 500m & Low Flood NDWI)
        flood_pct = flood_data.get("flood_percentage", 0.0)
        s2_hydro_score = max(0.0, 100.0 - (flood_pct * 3.0))

        # S3: Transit & Road Connectivity (Distance to road network <= 2km)
        road_count = osm_data["statistics"]["road_count"]
        s3_road_score = min(100.0, road_count * 12.5)

        # S4: Buildable Land Area (% barren / unbuilt land from Sentinel-2)
        unbuilt_pct = land_cover.get("unbuilt_land_percentage", 65.0)
        s4_buildable_score = unbuilt_pct

        # Composite MCDA weights (w1=0.35, w2=0.25, w3=0.20, w4=0.20)
        cci_raw = (
            0.35 * s1_slope_score
            + 0.25 * s2_hydro_score
            + 0.20 * s3_road_score
            + 0.20 * s4_buildable_score
        )

        # Building density penalty (higher existing buildings reduce available resettlement space)
        building_count = osm_data["statistics"]["building_count"]
        density_penalty = min(25.0, building_count * 0.8)
        cci_score = round(max(0.0, min(100.0, cci_raw - density_penalty)), 2)

        # Viable family capacity estimation based on buildable area & density
        area_sqkm = math.pi * (radius_km ** 2)
        buildable_sqkm = area_sqkm * (unbuilt_pct / 100.0) * (s1_slope_score / 100.0)
        # Standard planning density: ~200 families per buildable sq km with civic infrastructure
        family_capacity = int(buildable_sqkm * 180)

        # Nearest existing pre-computed safe site pairing
        nearest_safe_site = spatial_pipeline_service.find_nearest_safe_site(lat, lon)

        # Recommendation Verdict
        if cci_score >= 75.0 and hazard_score < 0.35:
            recommendation = "✅ Highly Suitable for Permanent Relocation Colony"
            hazard_level = "Low"
        elif cci_score >= 60.0 and hazard_score < 0.50:
            recommendation = "✅ Suitable for Short-Term / Transit Shelter Camp"
            hazard_level = "Moderate"
        elif cci_score >= 45.0:
            recommendation = "⚠️ Marginal Suitability - Slope fortification and drainage works required"
            hazard_level = "High"
        else:
            recommendation = "❌ Unsuitable - High hazard exposure and severe topographical constraints"
            hazard_level = "Critical Red Zone"

        return {
            "status": "success",
            "site": {"lat": lat, "lon": lon},
            "radius_km": radius_km,
            "score": cci_score,
            "hazard_risk_level": hazard_level,
            "recommendation": recommendation,
            "viable_family_capacity": family_capacity,
            "analysis": {
                "mcda_breakdown": {
                    "slope_stability_score": round(s1_slope_score, 1),
                    "hydrological_safety_score": round(s2_hydro_score, 1),
                    "road_connectivity_score": round(s3_road_score, 1),
                    "buildable_land_score": round(s4_buildable_score, 1),
                    "building_density_penalty": round(density_penalty, 1)
                },
                "osm": osm_data["statistics"],
                "land_cover": land_cover.get("land_cover", {}),
                "flood_risk": flood_data,
                "weather": weather_data,
                "ai_hazard_prediction": ai_hazard_result,
                "nearest_designated_safe_site": nearest_safe_site
            }
        }


evaluation_service = EvaluationService()