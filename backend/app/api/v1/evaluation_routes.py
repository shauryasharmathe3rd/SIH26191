from typing import Any, Dict, List, Optional
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field
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


@router.get("/districts")
async def get_districts() -> List[Dict[str, Any]]:
    """
    Get all dynamic operational district dossiers synthesized from the processed GIS layers,
    resettlement queue, safe sites, and weather telemetry.
    """
    try:
        return spatial_pipeline_service.get_districts_intelligence()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch districts intelligence: {str(e)}")


@router.get("/alerts")
async def get_active_alerts() -> List[Dict[str, Any]]:
    """
    Get dynamic incident alerts stream generated from high-risk red zones and live weather triggers.
    """
    try:
        return spatial_pipeline_service.get_active_alerts()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch active alerts: {str(e)}")


@router.get("/data-sources")
async def get_data_sources() -> List[Dict[str, Any]]:
    """
    Get live status, telemetry latency, and ingestion metrics for the 12 integrated data feeds.
    """
    try:
        return spatial_pipeline_service.get_data_sources_telemetry()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch data sources: {str(e)}")


@router.get("/national-stats")
async def get_national_stats() -> Dict[str, Any]:
    """
    Get aggregated national situation indicators calculated dynamically across all districts.
    """
    try:
        return spatial_pipeline_service.get_national_statistics()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch national stats: {str(e)}")


# ---------------------------------------------------------------------------
# Road-Network Routing Schema
# ---------------------------------------------------------------------------

class RoutingRequest(BaseModel):
    """Request body for road-network-aware relocation path computation."""
    start_lat: float = Field(..., ge=-90.0, le=90.0, description="Origin latitude (habitation centroid)")
    start_lon: float = Field(..., ge=-180.0, le=180.0, description="Origin longitude (habitation centroid)")
    target_lat: float = Field(..., ge=-90.0, le=90.0, description="Destination latitude (safe site centroid)")
    target_lon: float = Field(..., ge=-180.0, le=180.0, description="Destination longitude (safe site centroid)")
    highway_class: str = Field(
        default="primary",
        description="OSM highway class for speed model: 'primary', 'secondary', or 'tertiary'"
    )
    corridor_name: str = Field(
        default="Relocation Corridor",
        description="Human-readable label for this route"
    )
    avoid_red_zones: bool = Field(
        default=True,
        description="Apply red-zone hazard avoidance perimeter offset to route geometry"
    )


@router.post("/routing")
async def compute_road_routing_path(request: RoutingRequest) -> Dict[str, Any]:
    """
    Compute a road-network-following relocation corridor between an origin habitation
    and a destination safe site.

    Unlike straight-line Euclidean paths, this engine generates realistic highway-conforming
    geometry with:
    - Serpentine mountain-road curvature (sine-envelope waypoints, hairpin harmonics)
    - Red-zone hazard avoidance via normal-vector perimeter offsets
    - Speed-calibrated transit time estimation (38 km/h primary, 28 km/h secondary)
    - GeoJSON LineString output consumable directly by Leaflet / MapboxGL

    Returns both a GeoJSON Feature and a flat summary dict with routing metadata.
    """
    try:
        result = spatial_pipeline_service.get_road_routing_path(
            start_lat=request.start_lat,
            start_lon=request.start_lon,
            target_lat=request.target_lat,
            target_lon=request.target_lon,
            highway_class=request.highway_class,
            corridor_name=request.corridor_name,
            avoid_red_zones=request.avoid_red_zones,
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Road routing computation failed: {str(e)}")


@router.post("/overlay-route")
async def get_overlay_danger_to_safe_route(request: RoutingRequest) -> Dict[str, Any]:
    """
    Direct OSRM route overlay engine from overlay_mapping/overlay.py:
    Computes precise driving route from Danger Red Zone origin coordinates
    to Safe Relocation Zone destination coordinates.
    """
    try:
        from overlay_mapping.overlay import get_danger_to_safe_route
        return get_danger_to_safe_route(
            danger_coords=(request.start_lat, request.start_lon),
            safe_coords=(request.target_lat, request.target_lon),
            danger_name=request.corridor_name or "Danger Red Zone",
            safe_name="Designated Safe Zone",
            highway_class=request.highway_class
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OSRM overlay route failed: {str(e)}")


@router.get("/relocation-corridors")
async def get_relocation_corridors(
    tier: Optional[str] = Query(default=None, description="Filter by priority tier ('Immediate', 'Short-Term', 'Medium-Term')")
) -> Dict[str, Any]:
    """
    Get all road-network relocation corridors connecting prioritized habitations
    to designated safe sites along verified OSM highways, avoiding red hazard zones.
    """
    try:
        return spatial_pipeline_service.get_relocation_corridors(priority_tier=tier)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch relocation corridors: {str(e)}")


@router.get("/population-distribution")
async def get_population_distribution(
    district_id: Optional[str] = Query(default=None, description="Filter by district ID (e.g. 'chamoli-uk')")
) -> Dict[str, Any]:
    """
    Get multi-tier population distribution grid across operational districts.
    Includes direct gridded density clusters and dasymetric settlement estimation for data-sparse areas.
    """
    try:
        return spatial_pipeline_service.get_population_distribution(district_id=district_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch population distribution: {str(e)}")