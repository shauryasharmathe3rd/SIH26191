from fastapi import APIRouter, Query, HTTPException
from typing import List, Optional
from services.routing_engine import routing_engine
from app.models.schemas import (
    RouteResponse,
    RoadStatus,
    HazardAlert,
    BatchEvacuationRequest,
    BatchEvacuationResponse,
    HabitationEvacPlan
)

router = APIRouter(tags=["Evacuation Routing & Monitoring"])

@router.get("/routes", response_model=RouteResponse)
async def get_evacuation_routes(
    source: str = Query("HAB-010", description="Source Habitation ID (e.g. HAB-010 Joshimath Slump Ward)"),
    destination: str = Query("SAFE-SITE-001", description="Destination Safe Site ID (e.g. Pipalkoti)"),
    rainfall_mm: float = Query(150.0, description="Live rainfall trigger in mm (0-300mm)")
):
    """
    Computes optimal multi-criteria evacuation route options (Primary Highway,
    Secondary Ridge Bypass, Emergency Fallback) using NetworkX graph pathfinding,
    evaluating slope constraints (<30°), hazard avoidance, and highway access.
    """
    try:
        data = routing_engine.calculate_evacuation_routes(source, destination, rainfall_mm)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Route calculation failed: {str(e)}")

@router.get("/hazards/active", response_model=List[HazardAlert])
async def get_active_hazards():
    """
    Returns real-time satellite and hydrological hazard warnings along Himalayan corridors.
    """
    return routing_engine.get_active_hazards()

@router.get("/roads/status", response_model=List[RoadStatus])
async def get_national_roads_status():
    """
    Returns live clearance and convoy status for key National Highways (NH-7, NH-107, NH-3, NH-505, NH-5, NH-17).
    """
    return routing_engine.get_national_highway_statuses()

@router.post("/evacuation/plan", response_model=BatchEvacuationResponse)
async def plan_batch_evacuation(request: BatchEvacuationRequest):
    """
    Automates multi-habitation evacuation resource allocation and dispatch for State Disaster Management Authorities.
    """
    plans = []
    total_pop = 0
    total_vehicles = 0

    habitation_catalog = {
        "HAB-010": ("Joshimath Slump Ward", "Immediate", 2289, 458, "SAFE-SITE-001", "Pipalkoti Central Safe Zone", "primary", 31.4, 65),
        "HAB-008": ("Spiti Riverbank Ward", "Immediate", 2191, 438, "SAFE-SITE-004", "Spiti South Plateau Safe Zone", "primary", 14.2, 45),
        "HAB-003": ("Parvati Gorge Settlement", "Short-Term", 2364, 472, "SAFE-SITE-003", "Kullu Valley Receiving Ridge", "secondary", 23.3, 55),
        "HAB-001": ("Manali Valley Hamlet", "Short-Term", 796, 160, "SAFE-SITE-003", "Kullu Valley Receiving Ridge", "primary", 35.5, 75),
        "HAB-011": ("Rudraprayag Confluence Basti", "Short-Term", 1540, 308, "SAFE-SITE-002", "Gauchar Airstrip Safe Site", "primary", 18.5, 36),
    }

    target_ids = request.habitation_ids if request.habitation_ids else list(habitation_catalog.keys())

    for hid in target_ids:
        if hid in habitation_catalog:
            name, prio, pop, fam, sid, sname, opt_rt, dist, eta = habitation_catalog[hid]
            if request.priority_filter and request.priority_filter != "All" and prio != request.priority_filter:
                continue
            
            vehs = max(5, int(fam * 0.8))  # ~80% bus/truck capacity ratio
            total_pop += pop
            total_vehicles += vehs
            plans.append(HabitationEvacPlan(
                habitation_id=hid,
                habitation_name=name,
                priority=prio,
                population=pop,
                families=fam,
                assigned_safe_site_id=sid,
                assigned_safe_site_name=sname,
                optimal_route_id=opt_rt,
                distance_km=dist,
                eta_minutes=eta,
                vehicles_required=vehs
            ))

    max_hours = max([p.eta_minutes for p in plans], default=60) / 60.0

    return BatchEvacuationResponse(
        total_habitations=len(plans),
        total_population_affected=total_pop,
        total_vehicles_dispatched=total_vehicles,
        plans=plans,
        estimated_total_evacuation_hours=round(max_hours, 1)
    )
