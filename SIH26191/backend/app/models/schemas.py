from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class DangerPoint(BaseModel):
    id: str
    lat: float
    lng: float
    type: str  # "landslide_choke" | "rockfall_risk" | "flood_crossing" | "subsidence_fissure"
    severity: str  # "high" | "medium" | "critical"
    location_name: str
    description: str
    recommended_speed_kmh: int
    chainage_km: float

class ElevationPoint(BaseModel):
    dist_km: float
    elevation_m: float
    location_label: Optional[str] = None
    slope_deg: Optional[float] = None
    has_danger: bool = False

class TurnDirection(BaseModel):
    step: int
    text: str
    distance: str
    time: str
    alert: Optional[str] = None
    icon: str = "straight"

class RouteOption(BaseModel):
    route_id: str  # "primary" | "secondary" | "emergency"
    name: str
    type: str
    description: str
    distance_km: float
    estimated_time: str
    eta_minutes: int
    color_hex: str
    clear_pct: int
    caution_pct: int
    max_slope_deg: float
    avg_slope_deg: float
    danger_points: List[DangerPoint]
    waypoints: List[List[float]]  # [[lat, lng], ...]
    turn_by_turn: List[TurnDirection]
    elevation_profile: List[ElevationPoint]

class RouteResponse(BaseModel):
    source_id: str
    source_name: str
    destination_id: str
    destination_name: str
    primary_route: RouteOption
    alternative_routes: List[RouteOption]
    road_statuses: Dict[str, str]
    weather_trigger_rainfall_mm: float
    computed_at: str

class RoadStatus(BaseModel):
    highway_code: str  # e.g., "NH-7", "NH-107", "NH-3"
    name: str
    status: str  # "OPEN" | "CAUTION" | "BLOCKED" | "SINGLE_LANE"
    condition: str
    clearance_pct: int
    active_convoys: int
    last_cleared: str

class HazardAlert(BaseModel):
    id: str
    title: str
    hazard_type: str
    severity: str  # "CRITICAL" | "HIGH" | "ELEVATED"
    district: str
    lat: float
    lng: float
    affected_roads: List[str]
    description: str
    issued_at: str

class BatchEvacuationRequest(BaseModel):
    habitation_ids: List[str]
    priority_filter: Optional[str] = "Immediate"
    rainfall_scenario_mm: Optional[float] = 150.0

class HabitationEvacPlan(BaseModel):
    habitation_id: str
    habitation_name: str
    priority: str
    population: int
    families: int
    assigned_safe_site_id: str
    assigned_safe_site_name: str
    optimal_route_id: str
    distance_km: float
    eta_minutes: int
    vehicles_required: int

class BatchEvacuationResponse(BaseModel):
    total_habitations: int
    total_population_affected: int
    total_vehicles_dispatched: int
    plans: List[HabitationEvacPlan]
    estimated_total_evacuation_hours: float
