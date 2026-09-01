from typing import Any, Dict, Generic, List, Optional, TypeVar
from pydantic import BaseModel, Field

T = TypeVar("T")


class APIResponse(BaseModel, Generic[T]):
    """Standard generic API response wrapper"""
    status: str = Field(default="success", description="Status string: 'success' or 'error'")
    message: Optional[str] = Field(default=None, description="Optional informational or error message")
    data: Optional[T] = Field(default=None, description="Response payload")


class Coordinates(BaseModel):
    """Geographic point coordinate (WGS84)"""
    lat: float = Field(..., ge=-90.0, le=90.0, description="Latitude in decimal degrees")
    lon: float = Field(..., ge=-180.0, le=180.0, description="Longitude in decimal degrees")


class BoundingBox(BaseModel):
    """Geographic Bounding Box [min_lon, min_lat, max_lon, max_lat]"""
    min_lon: float = Field(..., description="Minimum Longitude (West)")
    min_lat: float = Field(..., description="Minimum Latitude (South)")
    max_lon: float = Field(..., description="Maximum Longitude (East)")
    max_lat: float = Field(..., description="Maximum Latitude (North)")

    @property
    def as_list(self) -> List[float]:
        return [self.min_lon, self.min_lat, self.max_lon, self.max_lat]

    @property
    def as_bbox_str(self) -> str:
        """Format for Overpass API: minLat,minLon,maxLat,maxLon"""
        return f"{self.min_lat},{self.min_lon},{self.max_lat},{self.max_lon}"
