from typing import Any, Dict
from fastapi import APIRouter, HTTPException
from app.schemas.satellite import (
    BBoxRequest,
    LandCoverResponse,
    NDVIResponse,
    NDWIResponse,
)
from app.services.satellite_service import satellite_service

router = APIRouter(prefix="/satellite", tags=["Copernicus Satellite Remote Sensing"])


@router.post("/ndvi", response_model=NDVIResponse)
async def compute_ndvi(request: BBoxRequest) -> Dict[str, Any]:
    """
    Compute Normalized Difference Vegetation Index (NDVI) for study bounding box:
    NDVI = (NIR - Red) / (NIR + Red)
    """
    try:
        ndvi_arr = await satellite_service.get_ndvi(request.bbox, request.time_range)
        if ndvi_arr is None:
            raise HTTPException(status_code=500, detail="Failed to retrieve NDVI data")

        mean_val = float(ndvi_arr.mean())
        min_val = float(ndvi_arr.min())
        max_val = float(ndvi_arr.max())

        veg_class = "Dense Forest" if mean_val > 0.6 else (
            "Agricultural / Sparse" if mean_val > 0.3 else (
                "Barren / Unbuilt" if mean_val >= 0.0 else "Water / Snow"
            )
        )

        return {
            "status": "success",
            "bbox": request.bbox,
            "time_range": request.time_range,
            "mean_ndvi": round(mean_val, 3),
            "min_ndvi": round(min_val, 3),
            "max_ndvi": round(max_val, 3),
            "vegetation_class": veg_class,
            "raster_preview_url": None
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"NDVI processing failed: {str(e)}")


@router.post("/ndwi", response_model=NDWIResponse)
async def compute_ndwi(request: BBoxRequest) -> Dict[str, Any]:
    """
    Compute Normalized Difference Water Index (NDWI) for flood inundation detection:
    NDWI = (Green - NIR) / (Green + NIR)
    """
    try:
        flood_res = await satellite_service.detect_flood(request.bbox, request.time_range)
        if "error" in flood_res:
            raise HTTPException(status_code=500, detail=flood_res["error"])
        return flood_res
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"NDWI processing failed: {str(e)}")


@router.post("/land-cover", response_model=LandCoverResponse)
async def analyze_land_cover(request: BBoxRequest) -> Dict[str, Any]:
    """
    Analyze 4-class multi-spectral Land Cover (Dense Vegetation, Sparse Vegetation, Barren Land, Water)
    and compute available buildable unbuilt land percentage.
    """
    try:
        lc_res = await satellite_service.analyze_land_cover(request.bbox, request.time_range)
        if "error" in lc_res:
            raise HTTPException(status_code=500, detail=lc_res["error"])
        return lc_res
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Land cover analysis failed: {str(e)}")