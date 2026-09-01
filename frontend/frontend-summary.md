# RESITE-GIS (AAPDA-INTEL) — Frontend Architecture & Technical Summary

## 1. Executive Summary

**RESITE-GIS** (*Resilient Environmental Site Assessment & Relocation Engine*) / **AAPDA-INTEL** is a mission-critical, enterprise-grade Emergency Operations Center (EOC) and Decision Support System (DSS) engineered specifically for the **National Disaster Management Authority (NDMA)**, **State Disaster Management Authorities (SDMAs)**, and **District Disaster Management Authorities (DDMAs)** across the Indian Himalayan Region and river basin states.

The frontend is built as a high-reliability, cyber-defense styled, spatial command platform. It delivers real-time situational awareness, hydrodynamic and climate scenario simulations, deep AI-driven landslide/hazard susceptibility evaluations, and algorithmic Carrying Capacity Index ($CCI$) site assessments to enable proactive, evidence-based civilian evacuations and safe resettlement.

---

## 2. Frontend Architecture & Technology Stack

```
                               ┌─────────────────────────────────────────────────────────┐
                               │                    React 19 (Vite)                      │
                               │           Strict Mode • TypeScript • Tailwind           │
                               └────────────────────────────┬────────────────────────────┘
                                                            │
                              ┌─────────────────────────────┴─────────────────────────────┐
                              ▼                                                           ▼
                ┌───────────────────────────┐                               ┌───────────────────────────┐
                │     DisasterContext       │                               │       GIS Vector Mesh     │
                │  • Active Tab & Route     │                               │  • Leaflet Interactive    │
                │  • District Intelligence  │                               │  • Dynamic Red Zones GeoJSON
                │  • Live Simulation State  │                               │  • Safe Relocation Parcels│
                │  • Statutory Audit Log    │                               │  • Resettlement Queue     │
                │  • Offline / Online Cache │                               │  • Multi-Source Basemaps  │
                └─────────────┬─────────────┘                               └─────────────┬─────────────┘
                              │                                                           │
                              └─────────────────────────────┬─────────────────────────────┘
                                                            │
                                                            ▼
                                           ┌─────────────────────────────────┐
                                           │       apiService Client         │
                                           │   (frontend/src/services/api.ts) │
                                           └────────────────┬────────────────┘
                                                            │
                                        HTTP Fetch / JSON   │  CORS Enabled
                                                            ▼
                                           ┌─────────────────────────────────┐
                                           │      FastAPI Backend Engine     │
                                           │      http://localhost:8000      │
                                           │   PyTorch • GeoPandas • CDSE    │
                                           └─────────────────────────────────┘
```

### Core Technology Stack

| Layer | Technology | Purpose & Capabilities |
| :--- | :--- | :--- |
| **Framework** | **React 19** | Ultra-responsive UI rendering with strict concurrent mode and component lifecycle optimization. |
| **Language** | **TypeScript 5.x** | Complete end-to-end type safety spanning backend REST payloads, GeoJSON features, telemetry, and UI state. |
| **Build Tool** | **Vite 8.x** | Lightning-fast HMR and optimized production bundle compilation. |
| **Styling & Theme** | **Tailwind CSS** | Custom government EOC command palette: Dark slate (`#070F1E`, `#0B192C`), cyber gold, solar amber, and alert crimson with skeuomorphic bevels and glassmorphism. |
| **GIS Engine** | **Leaflet & React-Leaflet** | Dynamic WFS/GeoJSON polygon and polyline vector overlays, custom SVG status markers, multi-basemap switching (Dark Command, ISRO Bhuvan Satellite, Topographic, OSM), and WGS-84 HUD telemetry. |
| **Animation Engine** | **Framer Motion** | Physics-based spring animations, layout transitions, modal popups, and HUD pulse indicators. |
| **Data Visualization**| **Recharts** | Responsive bar charts, capacity gauges, and deficit/surplus distribution analytics. |
| **Iconography** | **Lucide React** | Standardized military/government operational iconography. |

---

## 3. Backend Compatibility & API Integration Layer

The frontend is integrated with the FastAPI spatial engine running at `http://localhost:8000/api/v1` via the centralized typed service client in [`frontend/src/services/api.ts`](file:///home/shaurya/Documents/SIH26191/frontend/src/services/api.ts).

### API Endpoint Mapping Matrix

```
   FastAPI Endpoint                     HTTP Method    Frontend Integration & Component
──────────────────────────────────────────────────────────────────────────────────────────────────
1. /api/health                          GET            DisasterContext: checkBackendHealth()
                                                       DataSourcesView: Live Backend Status
2. /                                    GET            apiService.getRootInfo()
3. /api/v1/evaluate/summary             GET            DisasterContext: backendSummary metadata
4. /api/v1/evaluate/red-zones           GET            GISMap: Dynamic Red Zones GeoJSON layer
                                                       ScenarioSimulator: Real-time rainfall trigger
5. /api/v1/evaluate/safe-sites          GET            GISMap: Safe Relocation Parcels GeoJSON
                                                       CarryingCapacityView: Relocation capacity
6. /api/v1/evaluate/resettlement-queue  GET            GISMap: Habitation Point Markers
                                                       ProactiveRelocationModule: Queue ranking
7. /api/v1/evaluate/site                POST           ProactiveRelocationModule: Candidate Site Evaluator
                                                       CarryingCapacityView: On-demand assessment
8. /api/v1/evaluate/susceptibility      POST           ScenarioSimulator: PyTorch SusceptibilityNN Predictor
                                                       DistrictDossier: Geotechnical failure probability
9. /api/v1/satellite/ndvi               POST           DataSourcesView / Dossier: Vegetation index
10. /api/v1/satellite/ndwi              POST           DataSourcesView / Dossier: Flood inundation index
11. /api/v1/satellite/land-cover        POST           DataSourcesView / Dossier: 4-Class LULC analysis
12. /api/v1/osm/buildings/{bbox}        GET            GISMap / Site Evaluator: Footprint density
13. /api/v1/osm/roads/{bbox}            GET            GISMap / Site Evaluator: Transit access
14. /api/v1/osm/waterways/{bbox}        GET            GISMap / Site Evaluator: Flood buffer safety
15. /api/v1/osm/features/{bbox}         GET            GISMap / Site Evaluator: Combined infrastructure
16. /api/v1/weather/current/{lat}/{lon} GET            DisasterContext: fetchLiveWeather()
17. /api/v1/weather/forecast/{lat}/{lon}GET            ScenarioSimulator: Forecast precipitation
18. /api/v1/weather/cloudburst-check    GET            DisasterContext: fetchCloudburstCheck()
```

### Resilient Dual-Mode Execution (Zero-Downtime Design)

1. **Online Mode (`BACKEND: ONLINE [FastAPI + PyTorch]`)**:
   - Automatically polls `/api/health` on initial load.
   - Fetches live GeoJSON FeatureCollections for Red Zones, Safe Sites, and Resettlement Queues.
   - Executes live INT8 quantized PyTorch model inferences for hazard susceptibility.
   - Executes on-demand multi-criteria candidate site evaluations.
2. **Offline Standby Mode (`BACKEND: STANDBY [CACHE]`)**:
   - If the backend server is not running or unreachable, the frontend automatically falls back to comprehensive mock datasets in [`frontend/src/data/disasterData.ts`](file:///home/shaurya/Documents/SIH26191/frontend/src/data/disasterData.ts).
   - Generates simulated yet mathematically accurate responses for site evaluations and AI susceptibility predictions, ensuring total platform stability during demonstrations or disconnected field operations.

---

## 4. State Management & Data Architecture (`DisasterContext.tsx`)

The global application state is managed cleanly via React Context and Custom Hooks in [`frontend/src/context/DisasterContext.tsx`](file:///home/shaurya/Documents/SIH26191/frontend/src/context/DisasterContext.tsx).

### Key State Vectors

- **District Intelligence & Selection**: Tracks all 6 operational districts (Chamoli, Wayanad, Joshimath, Subansiri, Uttarkashi, Mandi) with deep geotechnical and meteorological telemetry.
- **Dynamic Simulation Engine**:
  - `rainfallMultiplier` ($0.5\times - 3.0\times$): Connected directly to dynamic Red Zone buffer recalculation (`/api/v1/evaluate/red-zones?rainfall_mm=...`).
  - `damDischargeMultiplier` ($0.5\times - 3.0\times$): Computes downstream inundation risk.
  - `soilSaturation` ($50\% - 100\%$): Triggers liquefaction and slope shear warnings.
  - `windIntensity` ($20 - 180\text{ km/h}$): Models squall and structural vulnerability.
- **GIS Map Overlay States**:
  - `redZones`: Dynamic multi-hazard polygon rendering.
  - `liveSafeSites`: Safe relocation parcels with Carrying Capacity Index ($CCI$).
  - `liveResettlementQueue`: Habitations ranked by urgency (Immediate, Short-Term, Medium-Term).
  - `evacuationRoutes`: Primary evacuation corridors with NDRF clearance status.
  - `infrastructure`: Hospitals, bridges, dams, shelters, helipads.
  - `weatherRadar`: Doppler radar precipitation buffer.
- **Statutory Audit Trail**: Implements an immutable log of statutory evacuation orders and relocation authorizations signed by IAS District Magistrates with generated SHA-256 cryptographic authorization hashes.
- **Accessibility & Localization**: Multi-lingual interface switching (English / Hindi) and dynamic text scaling (`sm`, `base`, `lg`) with high-contrast accessibility compliance.

---

## 5. Component Taxonomy & UI Modules

```
frontend/src/components/
├── common/                          # Reusable UI Atoms & Government Design System
│   ├── DataTransparencyBadge.tsx   # Attribution to NDMA, IMD, ISRO, CWC, Survey of India
│   ├── OperationalCard.tsx         # Bento-styled executive metric cards
│   ├── RiskScoreGauge.tsx          # 0-100 Circular risk severity meter
│   └── StatusBadge.tsx             # NDMA hazard classification badges
│
├── gis/                             # Spatial GIS & Interactive Map
│   └── GISMap.tsx                  # Leaflet engine rendering GeoJSON vector layers & HUD
│
├── operations/                      # High-Level Situational Awareness
│   ├── NationalOverview.tsx        # Multi-district macro view & active incident ticker
│   ├── IncidentCommandEOC.tsx      # Stage-3 national mobilization command center
│   └── ActiveAlertsView.tsx        # Live broadcast alert matrix & acknowledgement
│
├── intelligence/                    # Geotechnical & District Dossiers
│   └── DistrictDossier.tsx         # In-depth single-district analysis & telemetry
│
├── decision/                        # Decision Support & Relocation Engines
│   ├── ScenarioSimulator.tsx       # Hydrodynamic simulator & PyTorch Susceptibility predictor
│   └── ProactiveRelocationModule.tsx# MCDA Candidate Site Evaluator & Order Authorization
│
├── analytics/                       # Mathematical & Capacity Modeling
│   ├── CarryingCapacityView.tsx    # 6-vector carrying capacity index & deficit analysis
│   └── VulnerabilityAssessmentView.tsx # Vulnerability matrix & infrastructure exposure
│
├── system/                          # Government Compliance & Sensor Monitoring
│   ├── DataSourcesView.tsx         # Backend microservices & 12 national telemetry feeds
│   ├── OfficialSITREPReport.tsx    # Standardized printable NDMA SitRep briefing
│   └── AuditLogView.tsx            # Cryptographic statutory audit trail & DM signatures
│
├── navigation/                      # Command Navigation & Frame
│   ├── CommandSidebar.tsx          # Sectional EOC navigation drawer
│   └── GovernmentHeader.tsx        # State emblem, EOC status, and live clock
│
└── landing/                         # Public Portal
    └── LandingPage.tsx             # Interactive briefing and public-facing portal
```

---

## 6. Mathematical Formulations & Algorithmic Alignments

The frontend components accurately render the mathematical formulations specified in the project's root `README.md`:

### 1. Multi-Hazard Susceptibility Index ($HI$)
Calculated and displayed across `DistrictDossier`, `GISMap`, and `ScenarioSimulator`:
$$HI = \alpha \cdot S + \beta \cdot P + \gamma \cdot D_f + \delta \cdot D_r + \epsilon \cdot L$$
- **Slope Angle ($S$)**: Weighted at $0.30$ (critical threshold $> 30^\circ$).
- **Precipitation ($P$)**: Weighted at $0.25$ ($> 100\text{ mm}/24\text{h}$ triggers red alert).
- **Distance to Fault Lines ($D_f$)**: Weighted at $0.20$ (seismic shear risk).
- **Distance to River Channels ($D_r$)**: Weighted at $0.15$ (hydro-dynamic flood line).
- **Land Use / Land Cover ($L$)**: Weighted at $0.10$ (unstable barren scree vs. dense forest).

### 2. Carrying Capacity Index ($CCI$)
Evaluated on-demand in `CarryingCapacityView` and `ProactiveRelocationModule`:
$$CCI = \frac{\sum_{i=1}^{n} w_i \cdot S_i}{\text{Population Density Factor}}$$
Where multi-criteria weights are:
- **Terrain Slope ($w_1 = 0.30$)**: Optimal buildable land $< 15^\circ$.
- **Road Network Proximity ($w_2 = 0.25$)**: Distance $\le 2.0\text{ km}$ from arterial highways.
- **Flood Corridor Safety ($w_3 = 0.25$)**: Distance $> 500\text{ m}$ from high flood lines.
- **Sentinel-2 Unbuilt Land ($w_4 = 0.20$)**: Percentage of buildable, unbuilt land.

### 3. Resettlement Priority Queue Ranking
- **Immediate (0–30 Days)**: Habitations with $HI \ge 0.70$ or active ground subsidence.
- **Short-Term (1–6 Months)**: Habitations with $0.50 \le HI < 0.70$ and road connectivity vulnerabilities.
- **Medium-Term (Strategic)**: Habitations with $HI < 0.50$ requiring long-term slope stabilization.

---

## 7. Build & Execution Instructions

### Prerequisites
- Node.js $\ge 18.0.0$
- npm $\ge 9.0.0$
- FastAPI Backend running on `http://localhost:8000` (optional for live data, fully fallback-compatible in standalone mode)

### Installation & Execution

```bash
# 1. Navigate to frontend directory
cd /home/shaurya/Documents/SIH26191/frontend

# 2. Install all dependencies
npm install

# 3. Start development server with Hot Module Replacement
npm run dev

# 4. Build optimized production bundle
npm run build

# 5. Preview production build locally
npm run preview
```

### Environment Configuration (`.env`)
```env
# URL pointing to the FastAPI backend
VITE_API_URL=http://localhost:8000
```
