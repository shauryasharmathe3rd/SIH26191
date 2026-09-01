"""
SQLAlchemy and GeoAlchemy2 Spatial ORM Models for PostGIS
Defines table schemas for Habitations, Red Zones, Safe Sites, and Infrastructure.
"""

from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    Boolean,
    JSON,
    ForeignKey,
    Text,
)
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()


class Habitation(Base):
    """Vulnerable habitations table (OSM + SDMA Village clusters)"""
    __tablename__ = "habitations"

    id = Column(String(64), primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    district = Column(String(100), default="Chamoli")
    state = Column(String(100), default="Uttarakhand")
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    population_at_risk = Column(Integer, default=0)
    household_count = Column(Integer, default=0)
    hazard_index = Column(Float, default=0.0)
    priority_tier = Column(String(32), default="Medium-Term", index=True)  # Immediate, Short-Term, Medium-Term
    assigned_safe_site_id = Column(String(64), nullable=True)
    relocation_distance_km = Column(Float, nullable=True)
    metadata_json = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class RedZonePolygon(Base):
    """Dynamic Multi-Hazard Red Zones (Slope + Inundation + Rainfall Trigger)"""
    __tablename__ = "red_zones"

    id = Column(String(64), primary_key=True, index=True)
    zone_name = Column(String(255), nullable=False)
    severity = Column(String(32), default="Critical")  # Critical, Warning Buffer, Moderate
    hazard_score = Column(Float, nullable=False)
    slope_mean_deg = Column(Float, nullable=True)
    rainfall_trigger_mm = Column(Float, default=150.0)
    area_sqkm = Column(Float, nullable=True)
    active = Column(Boolean, default=True)
    geojson_geometry = Column(JSON, nullable=False)  # GeoJSON Polygon / MultiPolygon
    created_at = Column(DateTime, default=datetime.utcnow)


class SafeRelocationSite(Base):
    """Candidate Safe Relocation Parcels with Carrying Capacity Index (CCI)"""
    __tablename__ = "safe_relocation_sites"

    id = Column(String(64), primary_key=True, index=True)
    site_name = Column(String(255), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    cci_score = Column(Float, nullable=False)  # 0 to 100
    area_sqkm = Column(Float, nullable=False)
    viable_family_capacity = Column(Integer, default=0)
    slope_angle_deg = Column(Float, nullable=True)
    dist_to_road_km = Column(Float, nullable=True)
    dist_to_river_m = Column(Float, nullable=True)
    unbuilt_land_pct = Column(Float, default=100.0)
    geojson_geometry = Column(JSON, nullable=True)
    is_approved = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
