from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class BBoxRequest(BaseModel):
    """Request payload for satellite raster queries [min_lon, min_lat, max_lon, max_lat]"""
    bbox: List[float] = Field(
        ...,
        min_length=4,
        max_length=4,
        description="Bounding box array: [min_lon, min_lat, max_lon, max_lat] in EPSG:4326"
    )
    time_range: str = Field(
        default="2024-01-01",
        description="Observation date or date-range in YYYY-MM-DD or YYYY-MM-DD/YYYY-MM-DD"
    )


class LandCoverBreakdown(BaseModel):
    """Percentage breakdown of land cover classifications"""
    dense_vegetation: float = Field(..., description="Percentage of dense forest / high NDVI (>0.6)")
    sparse_vegetation: float = Field(..., description="Percentage of agriculture / moderate NDVI (0.3-0.6)")
    barren_land: float = Field(..., description="Percentage of barren / buildable unbuilt land (0.0-0.3)")
    water_bodies: float = Field(..., description="Percentage of water / negative NDVI (<0.0)")


class LandCoverResponse(BaseModel):
    """Satellite Land Cover Analysis Response"""
    status: str = "success"
    bbox: List[float]
    time_range: str
    land_cover: LandCoverBreakdown
    unbuilt_land_percentage: float = Field(..., description="Combined percentage of barren and sparse vegetation land")
    total_pixels: int = Field(..., description="Total sample pixel count in bounding box")


class NDVIResponse(BaseModel):
    """NDVI Computation Response"""
    status: str = "success"
    bbox: List[float]
    time_range: str
    mean_ndvi: float
    min_ndvi: float
    max_ndvi: float
    vegetation_class: str
    raster_preview_url: Optional[str] = None


class NDWIResponse(BaseModel):
    """NDWI Flood Detection Response"""
    status: str = "success"
    bbox: List[float]
    time_range: str
    flood_percentage: float = Field(..., description="Percentage of surface area with NDWI > 0.3")
    flooded_pixels: int
    total_pixels: int
    flood_detected: bool = Field(..., description="True if flooded area exceeds danger threshold")
    flood_risk_level: str = Field(..., description="'Low', 'Moderate', or 'Critical'")
