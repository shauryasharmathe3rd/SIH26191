from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class SiteRequest(BaseModel):
    """Payload for evaluating a candidate relocation site"""
    lat: float = Field(..., ge=-90.0, le=90.0, description="Latitude of candidate site")
    lon: float = Field(..., ge=-180.0, le=180.0, description="Longitude of candidate site")
    radius_km: float = Field(default=5.0, ge=0.5, le=50.0, description="Evaluation buffer radius in km")


class EvaluationAnalysis(BaseModel):
    """Detailed multi-criteria breakdown"""
    osm: Dict[str, Any]
    land_cover: Dict[str, Any]
    weather: Dict[str, Any]
    terrain: Optional[Dict[str, Any]] = None


class SiteEvaluationResponse(BaseModel):
    """Comprehensive Site Assessment & Carrying Capacity Score Response"""
    status: str = "success"
    site: Dict[str, float]
    radius_km: float
    score: float = Field(..., description="Carrying Capacity Index (0-100)")
    recommendation: str = Field(..., description="Actionable recommendation verdict")
    analysis: EvaluationAnalysis
    hazard_risk_level: str = Field(default="Low", description="'Low', 'Moderate', 'High', 'Critical'")
    viable_family_capacity: Optional[int] = Field(default=None, description="Estimated family resettlement capacity")


class SusceptibilityFeatureInput(BaseModel):
    """12-feature environmental input vector matching model pre-training"""
    elevation: float = Field(..., description="DEM elevation in meters ASL")
    slope: float = Field(..., description="Slope angle in degrees")
    aspect: float = Field(..., description="Aspect azimuth in degrees (0-360)")
    plan_curvature: float = Field(default=0.0, description="Plan curvature (surface shape)")
    profile_curvature: float = Field(default=0.0, description="Profile curvature")
    twi: float = Field(default=6.0, description="Topographic Wetness Index")
    spi: float = Field(default=10.0, description="Stream Power Index")
    dist_to_streams: float = Field(..., description="Distance to drainage streams in meters")
    dist_to_faults: float = Field(..., description="Distance to tectonic fault line in meters")
    ndvi: float = Field(default=0.3, description="Sentinel-2 Optical NDVI (-1.0 to 1.0)")
    lulc: float = Field(default=10.0, description="ESA WorldCover LULC discrete class code")
    precip_gpm: float = Field(..., description="Live / Monsoon precipitation depth in mm")


class SusceptibilityRequest(BaseModel):
    """AI Hazard Susceptibility Prediction Request"""
    lat: Optional[float] = None
    lon: Optional[float] = None
    features: Optional[SusceptibilityFeatureInput] = None
    rainfall_mm: Optional[float] = Field(default=None, description="Optional override for rainfall trigger (mm)")


class SusceptibilityResponse(BaseModel):
    """AI Hazard Susceptibility Prediction Result"""
    status: str = "success"
    susceptibility_score: float = Field(..., description="Predicted probability of failure [0.0, 1.0]")
    hazard_tier: str = Field(..., description="'Low', 'Moderate', 'High', 'Critical Red Zone'")
    model_version: str = "SusceptibilityNN-v1.0 (PyTorch / Quantized INT8)"
    input_features: Dict[str, float]
    action_advisory: str


class GeoJSONFeature(BaseModel):
    """Generic GeoJSON Feature schema"""
    type: str = "Feature"
    properties: Dict[str, Any]
    geometry: Dict[str, Any]


class GeoJSONFeatureCollection(BaseModel):
    """Generic GeoJSON FeatureCollection schema"""
    type: str = "FeatureCollection"
    name: Optional[str] = None
    crs: Optional[Dict[str, Any]] = None
    features: List[Dict[str, Any]] = Field(default_factory=list)
