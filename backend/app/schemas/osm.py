from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class OSMFeatureStats(BaseModel):
    """Extracted OSM infrastructure counts"""
    building_count: int = Field(default=0, description="Total detected residential/commercial buildings")
    road_count: int = Field(default=0, description="Total highway/road network segments")
    waterway_count: int = Field(default=0, description="Total rivers/streams/canals")


class OSMQueryResponse(BaseModel):
    """Generic OSM Query Response"""
    status: str = "success"
    feature_type: str
    bbox: str
    count: int
    data: List[Dict[str, Any]]
    message: Optional[str] = None


class OSMAllFeaturesResponse(BaseModel):
    """Combined OSM Feature Scan Response"""
    status: str = "success"
    bbox: str
    statistics: OSMFeatureStats
    buildings: List[Dict[str, Any]] = Field(default_factory=list)
    roads: List[Dict[str, Any]] = Field(default_factory=list)
    waterways: List[Dict[str, Any]] = Field(default_factory=list)
