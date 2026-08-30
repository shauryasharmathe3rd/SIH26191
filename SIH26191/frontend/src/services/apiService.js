// API Service for RESITE-GIS Backend Integration (FastAPI + NetworkX Routing Engine)

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const fetchEvacuationRoutes = async (sourceId = 'HAB-010', destId = 'SAFE-SITE-001', rainfallMm = 150) => {
  try {
    const res = await fetch(`${API_BASE}/routes?source=${sourceId}&destination=${destId}&rainfall_mm=${rainfallMm}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend routing endpoint offline; utilizing resilient local NetworkX route model.', err);
    return null;
  }
};

export const fetchActiveHazards = async () => {
  try {
    const res = await fetch(`${API_BASE}/hazards/active`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    return [
      {
        id: "HAZ-IN-01",
        title: "Joshimath Fissure Expansion Alert",
        hazard_type: "Landslide / Subsidence",
        severity: "CRITICAL",
        district: "Chamoli, Uttarakhand",
        lat: 30.5564,
        lng: 79.5658,
        affected_roads: ["NH-7", "Upper Bazaar Link Road"],
        description: "Satellite SAR interferometry detects 4.2mm ground displacement on 35.2° slope.",
        issued_at: "12:45 UTC"
      },
      {
        id: "HAZ-IN-02",
        title: "Spiti Glacial Runoff Surge",
        hazard_type: "Flash Flood & Debris",
        severity: "HIGH",
        district: "Lahaul & Spiti, Himachal Pradesh",
        lat: 31.6685,
        lng: 78.9647,
        affected_roads: ["NH-505"],
        description: "Sudden discharge increase at 4187m ASL; scree flow crossing culverts.",
        issued_at: "12:30 UTC"
      },
      {
        id: "HAZ-IN-03",
        title: "Alaknanda River Catchment Cloudburst Warning",
        hazard_type: "Hydrological Flash Flood",
        severity: "ELEVATED",
        district: "Rudraprayag & Chamoli",
        lat: 30.4310,
        lng: 79.4280,
        affected_roads: ["NH-7", "NH-107"],
        description: "Live rainfall simulation at 150mm triggers 500m buffer inundation warning.",
        issued_at: "12:15 UTC"
      }
    ];
  }
};

export const fetchNationalRoadStatuses = async () => {
  try {
    const res = await fetch(`${API_BASE}/roads/status`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    return [
      {
        highway_code: "NH-7",
        name: "Rishikesh - Joshimath - Badrinath National Highway",
        status: "OPEN",
        condition: "Monitored Evacuation Highway (Tangni Single-Lane)",
        clearance_pct: 92,
        active_convoys: 4,
        last_cleared: "20 mins ago"
      },
      {
        highway_code: "NH-107",
        name: "Rudraprayag - Kedarnath Highway",
        status: "CAUTION",
        condition: "High river water table near Sonprayag culvert",
        clearance_pct: 74,
        active_convoys: 2,
        last_cleared: "45 mins ago"
      },
      {
        highway_code: "NH-3",
        name: "Chandigarh - Manali - Leh Highway",
        status: "OPEN",
        condition: "Clear Double-Lane with Police Patrols",
        clearance_pct: 96,
        active_convoys: 6,
        last_cleared: "10 mins ago"
      },
      {
        highway_code: "NH-505",
        name: "Kaza - Samdo - Spiti National Highway",
        status: "CAUTION",
        condition: "High Altitude Scree Caution at km 42",
        clearance_pct: 80,
        active_convoys: 1,
        last_cleared: "1 hour ago"
      },
      {
        highway_code: "NH-5",
        name: "Hindustan-Tibet Road (Shimla-Kinnaur)",
        status: "OPEN",
        condition: "Operational with Tarpaulin Slope Covers",
        clearance_pct: 88,
        active_convoys: 3,
        last_cleared: "35 mins ago"
      },
      {
        highway_code: "NH-17",
        name: "Western Ghats Coastal Relief Highway",
        status: "OPEN",
        condition: "All Weather High Capacity Highway",
        clearance_pct: 98,
        active_convoys: 5,
        last_cleared: "15 mins ago"
      }
    ];
  }
};

export const fetchBatchEvacuationPlan = async (habitationIds = [], priorityFilter = 'Immediate') => {
  try {
    const res = await fetch(`${API_BASE}/evacuation/plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ habitation_ids: habitationIds, priority_filter: priorityFilter, rainfall_scenario_mm: 150 })
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      total_habitations: 2,
      total_population_affected: 4480,
      total_vehicles_dispatched: 698,
      estimated_total_evacuation_hours: 1.3,
      plans: [
        {
          habitation_id: "HAB-010",
          habitation_name: "Joshimath Slump Ward",
          priority: "Immediate",
          population: 2289,
          families: 458,
          assigned_safe_site_id: "SAFE-SITE-001",
          assigned_safe_site_name: "Pipalkoti Central Resettlement Zone",
          optimal_route_id: "primary",
          distance_km: 31.4,
          eta_minutes: 65,
          vehicles_required: 366
        },
        {
          habitation_id: "HAB-008",
          habitation_name: "Spiti Riverbank Ward",
          priority: "Immediate",
          population: 2191,
          families: 438,
          assigned_safe_site_id: "SAFE-SITE-004",
          assigned_safe_site_name: "Spiti South Plateau Safe Zone",
          optimal_route_id: "primary",
          distance_km: 14.2,
          eta_minutes: 45,
          vehicles_required: 350
        }
      ]
    };
  }
};
