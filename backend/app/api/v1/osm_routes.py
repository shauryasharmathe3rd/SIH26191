from typing import Any, Dict
from fastapi import APIRouter, HTTPException
from app.schemas.osm import OSMAllFeaturesResponse, OSMQueryResponse
from app.services.osm_service import osm_service

router = APIRouter(prefix="/osm", tags=["OpenStreetMap Infrastructure Vector Engine"])


@router.get("/buildings/{bbox}")
async def get_buildings(bbox: str) -> Dict[str, Any]:
    """
    Extract residential and commercial building footprints from OSM within bounding box.
    Format: minLat,minLon,maxLat,maxLon
    """
    try:
        elements = await osm_service.get_buildings(bbox)
        return {
            "status": "success",
            "feature_type": "buildings",
            "bbox": bbox,
            "count": len(elements),
            "data": elements
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch buildings: {str(e)}")


@router.get("/roads/{bbox}")
async def get_roads(bbox: str) -> Dict[str, Any]:
    """
    Extract road transit networks, highways, and evacuation corridors within bounding box.
    Format: minLat,minLon,maxLat,maxLon
    """
    try:
        elements = await osm_service.get_roads(bbox)
        return {
            "status": "success",
            "feature_type": "roads",
            "bbox": bbox,
            "count": len(elements),
            "data": elements
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch roads: {str(e)}")


@router.get("/waterways/{bbox}")
async def get_waterways(bbox: str) -> Dict[str, Any]:
    """
    Extract river channels, mountain streams, and drainage waterways within bounding box.
    Format: minLat,minLon,maxLat,maxLon
    """
    try:
        elements = await osm_service.get_waterways(bbox)
        return {
            "status": "success",
            "feature_type": "waterways",
            "bbox": bbox,
            "count": len(elements),
            "data": elements
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch waterways: {str(e)}")


@router.get("/features/{bbox}", response_model=OSMAllFeaturesResponse)
async def get_all_features(bbox: str) -> Dict[str, Any]:
    """
    Perform a combined infrastructure scan (buildings, roads, waterways) and summary statistics.
    Format: minLat,minLon,maxLat,maxLon
    """
    try:
        result = await osm_service.get_all_features(bbox)
        return {
            "status": "success",
            "bbox": bbox,
            "statistics": result["statistics"],
            "buildings": result["buildings"],
            "roads": result["roads"],
            "waterways": result["waterways"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch features: {str(e)}")


from pydantic import BaseModel, Field
from typing import Optional


class RouteRequest(BaseModel):
    start_lat: float = Field(..., ge=-90.0, le=90.0, description="Start latitude (Danger Red Zone)")
    start_lon: float = Field(..., ge=-180.0, le=180.0, description="Start longitude (Danger Red Zone)")
    end_lat: float = Field(..., ge=-90.0, le=90.0, description="Destination latitude (Safe Relocation Zone)")
    end_lon: float = Field(..., ge=-180.0, le=180.0, description="Destination longitude (Safe Relocation Zone)")
    start_name: Optional[str] = Field(default="Danger Red Zone", description="Origin hazard zone label")
    end_name: Optional[str] = Field(default="Safe Relocation Zone", description="Destination safe zone label")


@router.post("/route")
async def calculate_route(request: RouteRequest) -> Dict[str, Any]:
    """
    Calculate real driving route between Danger/Red Zone start location and Safe Zone destination
    using OSRM Vector Engine from overlay_mapping/overlay.py.
    """
    try:
        from overlay_mapping.overlay import get_danger_to_safe_route
        result = get_danger_to_safe_route(
            danger_coords=(request.start_lat, request.start_lon),
            safe_coords=(request.end_lat, request.end_lon),
            danger_name=request.start_name or "Danger Red Zone",
            safe_name=request.end_name or "Safe Relocation Zone"
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to calculate route: {str(e)}")


@router.get("/route")
async def get_route_get(
    start_lat: float,
    start_lon: float,
    end_lat: float,
    end_lon: float,
    start_name: str = "Danger Red Zone",
    end_name: str = "Safe Relocation Zone"
) -> Dict[str, Any]:
    """
    GET endpoint to calculate driving route between Danger/Red Zone start location and Safe Zone destination
    using OSRM Vector Engine from overlay_mapping/overlay.py.
    """
    try:
        from overlay_mapping.overlay import get_danger_to_safe_route
        result = get_danger_to_safe_route(
            danger_coords=(start_lat, start_lon),
            safe_coords=(end_lat, end_lon),
            danger_name=start_name,
            safe_name=end_name
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to calculate route: {str(e)}")