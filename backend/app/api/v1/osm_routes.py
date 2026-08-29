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