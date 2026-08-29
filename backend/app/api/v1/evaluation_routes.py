from typing import Any, Dict, Optional
from fastapi import APIRouter, HTTPException, Query
from app.schemas.evaluation import (
    SiteRequest,
    SiteEvaluationResponse,
    SusceptibilityRequest,
    SusceptibilityResponse,
    GeoJSONFeatureCollection,
)
from app.services.evaluation_service import evaluation_service
from app.services.spatial_pipeline_service import spatial_pipeline_service
from app.services.susceptibility_service import susceptibility_service

router = APIRouter(prefix="/evaluate", tags=["Site Evaluation & Relocation Engine"])


@router.post("/site", response_model=SiteEvaluationResponse)
async def evaluate_site(request: SiteRequest) -> Dict[str, Any]:
    """
    Perform a comprehensive multi-criteria evaluation of a candidate relocation site:
    - Fetches live OpenStreetMap infrastructure, Copernicus CDSE Land Cover / NDWI, and Weather.
    - Computes Carrying Capacity Index (CCI: 0-100) and actionable resettlement verdict.
    """
    try:
        result = await evaluation_service.evaluate_site(
            lat=request.lat,
            lon=request.lon,
            radius_km=request.radius_km
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Site evaluation failed: {str(e)}")


@router.post("/susceptibility", response_model=SusceptibilityResponse)
async def predict_hazard_susceptibility(request: SusceptibilityRequest) -> Dict[str, Any]:
    """
    Evaluate AI Hazard Susceptibility using the trained deep neural model (SusceptibilityNN):
    - Accepts 12 environmental features OR coordinate lat/lon for spatial geomorphometry interpolation.
    - Supports real-time rainfall trigger override (precip_gpm).
    """
    try:
        if request.features is not None:
            features = request.features
        elif request.lat is not None and request.lon is not None:
            features = susceptibility_service.estimate_features_from_coords(
                lat=request.lat,
                lon=request.lon,
                rainfall_mm=request.rainfall_mm
            )
        else:
            raise HTTPException(
                status_code=400,
                detail="Must provide either 12-factor 'features' payload or 'lat' and 'lon' coordinates."
            )

        result = susceptibility_service.predict(
            features=features,
            rainfall_override=request.rainfall_mm
        )
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Susceptibility prediction failed: {str(e)}")


@router.get("/red-zones")
async def get_dynamic_red_zones(
    min_hazard_index: float = Query(default=0.0, ge=0.0, le=1.0, description="Filter polygons by minimum hazard score"),
    severity: Optional[str] = Query(default=None, description="Filter by severity ('Critical', 'Warning Buffer')"),
    rainfall_mm: Optional[float] = Query(default=None, ge=0.0, description="Dynamic rainfall trigger simulation in mm")
) -> Dict[str, Any]:
    """
    Get dynamic multi-hazard Red Zones GeoJSON layer.
    Allows real-time risk expansion simulation via precipitation parameter (rainfall_mm).
    """
    try:
        data = spatial_pipeline_service.get_red_zones(
            min_hazard_index=min_hazard_index,
            severity=severity,
            rainfall_mm=rainfall_mm
        )
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch red zones: {str(e)}")


@router.get("/safe-sites")
async def get_safe_relocation_sites(
    min_cci: float = Query(default=0.0, ge=0.0, le=100.0, description="Filter candidate sites by minimum CCI score"),
    min_capacity: int = Query(default=0, ge=0, description="Filter by minimum viable family capacity")
) -> Dict[str, Any]:
    """
    Get candidate safe relocation parcels GeoJSON layer with Carrying Capacity Index (CCI) metrics.
    """
    try:
        data = spatial_pipeline_service.get_safe_relocation_sites(
            min_cci=min_cci,
            min_capacity=min_capacity
        )
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch safe sites: {str(e)}")


@router.get("/resettlement-queue")
async def get_resettlement_priority_queue(
    tier: Optional[str] = Query(default=None, description="Filter by priority tier ('Immediate', 'Short-Term', 'Medium-Term')")
) -> Dict[str, Any]:
    """
    Get prioritized habitation resettlement queue GeoJSON paired with nearest designated safe sites.
    """
    try:
        data = spatial_pipeline_service.get_resettlement_queue(tier=tier)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch resettlement queue: {str(e)}")


@router.get("/summary")
async def get_pipeline_summary() -> Dict[str, Any]:
    """
    Get high-level spatial pipeline, model evaluation benchmarks, and habitation statistics for SDMA dashboards.
    """
    try:
        return spatial_pipeline_service.get_pipeline_summary()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch summary: {str(e)}")