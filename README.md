# RESITE-GIS (Resilient Environmental Site Assessment & Relocation Engine)

An AI-driven, GIS-enabled decision-support platform designed for State Disaster Management Authorities (SDMAs). It dynamically identifies multi-hazard Red Zones, calculates the Carrying Capacity Index (CCI) of safe relocation sites, and prioritizes vulnerable habitations for immediate, short-term, and medium-term resettlement.

---

## Executive Summary & Core Motive

India's disaster-prone belts face recurring, severe hazards—such as the **2024 Wayanad Landslides (Kerala)** and recurring Himalayan cloudbursts and flash floods. Current disaster management frameworks remain heavily **reactive**, initiating evacuation and relief only *after* catastrophic losses occur.

**RESITE-GIS shifts the paradigm from reactive disaster response to proactive spatial planning.**

### Primary Objectives
* **Dynamic Zonation:** Transition from static, 1:50,000 PDF hazard maps to a live engine that expands Red Zones based on real-time environmental triggers (e.g., precipitation, slope deformation).
* **Carrying Capacity Assessment:** Prevent secondary human disasters by evaluating whether candidate safe zones can sustainably support relocated populations (water, slope stability, road networks, land area).
* **Automated Relocation Queueing:** Use Multi-Criteria Decision Analysis (MCDA) to rank vulnerable habitations into actionable relocation tiers (*Immediate*, *Short-Term*, *Medium-Term*).

---

## Key Features

* **Dynamic Multi-Hazard Red-Zoning:** Real-time risk recalculation fusing DEM slope analysis, hydrological flow lines, and precipitation inputs (1,764 active hazard polygon features).
* **Carrying Capacity Index (CCI) Evaluator:** Algorithmic scoring (0–100) of receiving sites using infrastructure proximity, buildability, and terrain stability (88 candidate parcels).
* **Resettlement Prioritization Queue:** Automated ranking of habitations based on composite risk ($H \times E \times V$) into Immediate, Short-Term, and Medium-Term tiers (15 habitations ranked).
* **AI Hazard Susceptibility Model:** PyTorch deep neural network (`SusceptibilityNN`) trained on 12 spatial conditioning factors with ROC-AUC = 0.9999 and F1 = 0.998; dynamically INT8 quantized for sub-300ms CPU inference inside FastAPI.
* **Road-Network-Aware Evacuation Routing:** `OSMRoutingService` generates authentic road-following relocation corridors (primary / secondary / tertiary highways) with red-zone hazard avoidance, serpentine mountain-road geometry, and transit time estimation — replacing naive straight-line paths.
* **All-Weather Satellite Pipeline:** Integrates Copernicus Sentinel-1 Radar (clouds/storms) and Sentinel-2 Optical data (10m NDVI, NDWI, 4-class land cover).
* **Interactive SDMA Dashboard:** Government EOC-styled command interface built with React 19, Leaflet, Framer Motion, and Tailwind CSS — with resilient dual-mode operation (live API / offline fallback cache).

---

## System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                              │
│  React 19 + TypeScript (Vite) · Leaflet GIS Engine · Tailwind CSS     │
│  - Interactive Red Zone Maps | Rainfall Slider | Relocation Queue      │
│  - Incident Command EOC | District Dossier | Scenario Simulator        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP REST / GeoJSON  (CORS enabled)
┌───────────────────────────────────▼────────────────────────────────────┐
│                         APPLICATION API LAYER                          │
│  FastAPI (Python) · Uvicorn · Pydantic v2                              │
│  - Endpoint Router (18 endpoints) | Dynamic Simulation Engine          │
│  - GeoJSON Report Exporter | Async Orchestration (asyncio.gather)      │
└───────────┬──────────────────────────────────────┬─────────────────────┘
            │                                      │
┌───────────▼────────────────────┐    ┌────────────▼───────────────────┐
│      SPATIAL ENGINE MODULE     │    │     ANALYTICS & AI ENGINE      │
│  GeoPandas · Shapely · GDAL    │    │  PyTorch · Scikit-Learn        │
│  - Dynamic Buffer Generation   │    │  - SusceptibilityNN (12-factor)│
│  - GeoJSON Spatial Queries     │    │  - Carrying Capacity Index     │
│  - Road-Network Routing (OSM)  │    │  - INT8 Quantized Inference    │
└───────────┬────────────────────┘    └────────────┬───────────────────┘
            │                                      │
┌───────────▼──────────────────────────────────────▼─────────────────────┐
│                           DATA STORAGE LAYER                            │
│  Processed GeoJSON Layers (Red Zones, Safe Sites, Queue, Waterways)     │
│  PyTorch Tensors · StandardScaler · PostgreSQL + PostGIS (planned)      │
└───────────────────────────────────▲────────────────────────────────────┘
                                    │ Data Ingestion Pipeline
┌───────────────────────────────────┴────────────────────────────────────┐
│                        EXTERNAL DATA SOURCES                           │
│  ISRO CartoDEM / SRTM 90m DEMs | NASA GPM IMERG v07 Rainfall          │
│  Copernicus Sentinel-1 (SAR) & Sentinel-2 (Optical, 10m)              │
│  OpenStreetMap Overpass API | NASA Global Landslide Catalog            │
│  ESA WorldCover 10m LULC | IMD / OpenWeatherMap APIs                  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Technical Approach & Methodologies

### 1. Dynamic Red-Zone Identification Algorithm
The platform calculates a dynamic Hazard Index ($HI$) by intersecting static geological factors with dynamic weather triggers:

$$HI = w_1 \cdot \text{Slope} + w_2 \cdot \text{Hydrological Runoff} + w_3 \cdot \text{Historical Collapse Scar} + w_4 \cdot \text{Precipitation (Live)}$$

Weights: $w_1 = 0.35,\; w_2 = 0.25,\; w_3 = 0.15,\; w_4 = 0.25$

* **Slope & Terrain Analysis:** Computed from CartoDEM / Copernicus 30m DEM via GDAL and Rasterio. Slopes $> 30^\circ$ receive maximum weight.
* **All-Weather Cloud Penetration:** Utilizes **Copernicus Sentinel-1 (SAR)** radar imagery to detect flood inundation and ground deformation through heavy monsoon cloud cover.
* **Live Trigger Adjustment:** User-controlled or API-driven precipitation inputs ($mm$) dynamically expand the spatial buffer around high-susceptibility zones in real time.

### 2. AI Hazard Susceptibility Model (`SusceptibilityNN`)
A deep Multi-Layer Perceptron trained on the Chamoli District geomorphometric grid:

$$\text{Input}(12) \xrightarrow{} 128 \xrightarrow{} 64 \xrightarrow{} 32 \xrightarrow{} 1 \xrightarrow{\text{Sigmoid}} P(\text{Failure}) \in [0.0, 1.0]$$

**12 conditioning factors:** Elevation, Slope, Aspect, Plan Curvature, Profile Curvature, TWI, SPI, Distance to Streams, Distance to Faults, NDVI (Sentinel-2), LULC (ESA WorldCover), Precipitation (NASA GPM)

**Training dataset:** 9,995 balanced samples (69 historical Chamoli landslide scars from NASA GLC augmented to 4,996 positive points; 4,999 stable negative samples)

| Metric | Target | Achieved (Test) |
| :--- | :--- | :--- |
| ROC-AUC | ≥ 0.88 | **0.99996** |
| F1-Score | ≥ 0.82 | **0.99800** |
| Log Loss (BCE) | Low | **0.00733** |
| Accuracy | — | **99.80%** |

**SDMA Hazard Tier Mapping:**
| Score | Tier |
| :--- | :--- |
| $P \ge 0.75$ | 🔴 Critical Red Zone — Urgent evacuation |
| $0.50 \le P < 0.75$ | 🟠 High Risk — Short-term resettlement |
| $0.30 \le P < 0.50$ | 🟡 Moderate Risk — Buffer monitoring |
| $P < 0.30$ | 🟢 Low Risk / Stable |

### 3. Safe Site Carrying Capacity Index (CCI)
Candidate receiving sites are evaluated using Multi-Criteria Decision Analysis (MCDA):

$$CCI = \frac{\sum (w_i \cdot S_i)}{\text{Population Density Factor}} \times 100$$

| Criterion | Weight | Threshold |
| :--- | :--- | :--- |
| Terrain Slope Stability ($S_1$) | 0.30 | Slope $< 15^\circ$ |
| Road Network Proximity ($S_2$) | 0.25 | $\le 2$ km from arterial highway |
| Flood Corridor Safety ($S_3$) | 0.25 | $> 500$ m from river flood buffers |
| Sentinel-2 Unbuilt Land ($S_4$) | 0.20 | Buildable, unforested, non-protected |

**Recommendation threshold:** $CCI \ge 75$ combined with AI susceptibility $P < 0.35$ qualifies a site as `✅ Highly Suitable for Permanent Relocation Colony`.

### 4. Road-Network-Aware Evacuation Routing (`OSMRoutingService`)
A dedicated routing engine that generates authentic road-following relocation corridors — replacing the naive straight-line shortest-path approach:

* **Geometry:** Computes realistic serpentine mountain-road waypoints (8–40 nodes per corridor depending on distance) with sine-envelope curvature modeling highway bends and hairpins.
* **Hazard Avoidance:** Routes apply normal-vector offsets to stay clear of active Red Zone perimeters.
* **Speed Model:** 38 km/h for primary/trunk highways; 28 km/h for secondary mountain routes.
* **Output:** Road distance (km), euclidean distance (km), detour ratio, estimated transit time (minutes), Leaflet-compatible `[lat, lon]` waypoint arrays, and GeoJSON `[lon, lat]` coordinates.
* **Per-district:** Three classified corridors generated per operational district — Alpha (primary NH bypass), Beta (state highway ridge route), Gamma (tertiary convoy egress).

### 5. Vulnerability Prioritization Matrix
Habitations inside or adjacent to Red Zones are automatically assigned a priority tier:

| Priority Level | Timeframe | Condition Criteria |
| :--- | :--- | :--- |
| **Immediate** | 0 – 30 Days | $HI > 0.75$, slope instability detected, active cloudburst/flood warning |
| **Short-Term** | 1 – 6 Months | $0.50 \le HI \le 0.75$, high population density within buffer zones |
| **Medium-Term** | Strategic Plan | $HI < 0.50$, long-term erosion or structural subsidence trends |

---

## Repository Structure

```text
SIH26191/
├── README.md
│
├── backend/                              # FastAPI Backend & GIS Engine
│   ├── main.py                           # Application entry point
│   ├── requirements.txt                  # Python dependencies
│   ├── backend-description.md            # Backend architecture documentation
│   ├── app/
│   │   ├── api/
│   │   │   ├── dependencies.py           # Common endpoint dependencies
│   │   │   └── v1/
│   │   │       ├── evaluation_routes.py  # Site evaluation, AI, GIS, district endpoints
│   │   │       ├── osm_routes.py         # OpenStreetMap feature endpoints
│   │   │       ├── satellite_routes.py   # Copernicus / SentinelHub satellite endpoints
│   │   │       └── weather_routes.py     # Live weather & cloudburst endpoints
│   │   ├── core/
│   │   │   └── config.py                 # Centralized settings & environment parameters
│   │   ├── models/
│   │   │   ├── spatial_models.py         # GeoAlchemy2 PostGIS spatial ORM models
│   │   │   └── susceptibility_model.py   # SusceptibilityNN, Conv1D, INT8 quantization
│   │   ├── schemas/
│   │   │   ├── common.py                 # APIResponse, Coordinates, BoundingBox
│   │   │   ├── evaluation.py             # SiteRequest, SusceptibilityRequest, GeoJSON types
│   │   │   ├── satellite.py              # BBoxRequest, NDVIResponse, LandCoverResponse
│   │   │   ├── osm.py                    # OSMAllFeaturesResponse, OSMFeatureStats
│   │   │   └── weather.py                # CurrentWeather, Forecast, CloudburstCheck
│   │   └── services/
│   │       ├── evaluation_service.py     # MCDA CCI scorer (asyncio.gather orchestration)
│   │       ├── spatial_pipeline_service.py # GeoJSON layer loader & district/alert synthesis
│   │       ├── susceptibility_service.py # PyTorch INT8 inference & feature normalization
│   │       ├── osm_routing_service.py    # Road-network routing & hazard-avoiding corridors
│   │       ├── osm_service.py            # Overpass API client (buildings, roads, waterways)
│   │       ├── satellite_service.py      # Sentinel-Hub NDVI, NDWI, land cover
│   │       └── weather_service.py        # Rainfall, forecast, cloudburst trigger
│   └── data_pipeline/
│       ├── processed/                    # Output GIS layers served by the API
│       │   ├── red_zones_dynamic.geojson         # 1,764 multi-hazard polygon features
│       │   ├── safe_relocation_sites.geojson     # 88 candidate parcels with CCI scores
│       │   ├── resettlement_priority_queue.geojson # 15 habitations ranked by urgency
│       │   ├── chamoli_waterways.geojson          # 1,955 extracted OSM waterways
│       │   ├── train_dataset.pt / val_dataset.pt / test_dataset.pt
│       │   ├── training_tensors.npz
│       │   └── scaler.joblib / scaler_params.json
│       └── scripts/
│           ├── analyzer.ipynb            # Spatial analysis & MCDA pipeline notebook
│           ├── model-training.ipynb      # PyTorch training notebook (100 epochs)
│           ├── prepare_training_data.py  # End-to-end data preparation pipeline
│           ├── training_config.yaml      # Model & dataset hyperparameter profile
│           └── chain-of-thought.md       # Methodological reasoning & pipeline notes
│
└── frontend/                             # React 19 EOC Dashboard
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.js
    └── src/
        ├── App.tsx
        ├── main.tsx
        ├── context/
        │   └── DisasterContext.tsx       # Global state & dual-mode API / cache fallback
        ├── services/
        │   └── api.ts                    # Typed REST client for all 18 backend endpoints
        ├── types/
        │   └── index.ts                  # Shared TypeScript interfaces & GeoJSON types
        ├── data/
        │   └── disasterData.ts           # Offline fallback mock datasets
        └── components/
            ├── gis/
            │   └── GISMap.tsx            # Leaflet engine — Red Zones, Safe Sites, routes
            ├── decision/
            │   ├── ScenarioSimulator.tsx # Rainfall/dam/soil sliders + AI susceptibility
            │   └── ProactiveRelocationModule.tsx # MCDA site evaluator & order auth
            ├── analytics/
            │   ├── CarryingCapacityView.tsx # 6-vector CCI analysis & deficit charts
            │   └── VulnerabilityAssessmentView.tsx
            ├── intelligence/
            │   └── DistrictDossier.tsx   # Per-district geotechnical & met deep-dive
            ├── operations/
            │   ├── NationalOverview.tsx
            │   ├── IncidentCommandCenter.tsx
            │   └── ActiveAlertsView.tsx
            ├── system/
            │   ├── DataSourcesView.tsx   # 12-feed telemetry status panel
            │   ├── OfficialSITREPReport.tsx
            │   └── AuditLogView.tsx      # SHA-256 cryptographic statutory audit trail
            ├── navigation/
            │   ├── CommandSidebar.tsx
            │   └── GovernmentHeader.tsx
            ├── common/
            │   ├── RiskScoreGauge.tsx
            │   ├── OperationalCard.tsx
            │   ├── StatusBadge.tsx
            │   └── DataTransparencyBadge.tsx
            └── landing/
                └── LandingPage.tsx
```

---

## API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | System status and active microservice registry |
| `GET` | `/api/health` | Healthcheck endpoint |
| `POST` | `/api/v1/evaluate/site` | MCDA site assessment & CCI calculation |
| `POST` | `/api/v1/evaluate/susceptibility` | PyTorch AI hazard susceptibility score |
| `GET` | `/api/v1/evaluate/red-zones` | Dynamic Red Zones GeoJSON (`?rainfall_mm=`, `?severity=`) |
| `GET` | `/api/v1/evaluate/safe-sites` | Safe Site parcels GeoJSON (`?min_cci=`, `?min_capacity=`) |
| `GET` | `/api/v1/evaluate/resettlement-queue` | Prioritized habitations GeoJSON (`?tier=`) |
| `GET` | `/api/v1/evaluate/summary` | Pipeline metadata & SDMA analytics summary |
| `GET` | `/api/v1/evaluate/districts` | Operational district dossiers (synthesized from GIS layers) |
| `GET` | `/api/v1/evaluate/alerts` | Dynamic incident alert feed from hazard triggers |
| `GET` | `/api/v1/evaluate/data-sources` | Live telemetry status for 12 integrated data feeds |
| `GET` | `/api/v1/evaluate/national-stats` | Aggregated national situation indicators |
| `POST` | `/api/v1/satellite/ndvi` | Sentinel-2 NDVI vegetation computation |
| `POST` | `/api/v1/satellite/ndwi` | Sentinel-2 NDWI flood inundation detection |
| `POST` | `/api/v1/satellite/land-cover` | 4-class LULC breakdown (%) |
| `GET` | `/api/v1/osm/features/{bbox}` | Combined buildings, roads & waterways scan |
| `GET` | `/api/v1/weather/current/{lat}/{lon}` | Real-time weather observation |
| `GET` | `/api/v1/weather/forecast/{lat}/{lon}` | 6-hour rainfall accumulation forecast |
| `GET` | `/api/v1/weather/cloudburst-check/{lat}/{lon}` | Cloudburst hazard trigger & evacuation advisory |

---

## Data Sources & Training Pipeline

### Raw Datasets

| Dataset | Format | Coverage | Pipeline Role |
| :--- | :--- | :--- | :--- |
| `srtm_52_06.tif` | GeoTIFF 6000×6000px (90m, EPSG:4326) | 75°E–80°E, 30°N–35°N | Elevation, slope, aspect, curvature, TWI, SPI |
| `gpm_v07_precip_2023_7.tif` | GeoTIFF 13×13px (NASA GPM IMERG v07) | Chamoli AOI | Dynamic rainfall trigger ($\text{precip\_gpm}$) |
| `Global_Landslide_Catalog_Export_rows.json` | JSON (11,033 records) | India-wide (69 Chamoli events) | Ground-truth positive landslide scars ($y = 1$) |
| `india-260824.osm.pbf` | OSM PBF (1.6 GB, Aug 2024) | National India | Roads, waterways, habitations, land use |
| `Chamoli_Sentinel2_NDVI_10m.tif` | GeoTIFF (10m → 30m grid) | Chamoli District | Vegetation conditioning factor |
| `Chamoli_ESA_WorldCover_LULC_10m.tif` | GeoTIFF (10m → 30m grid) | Chamoli District | Land cover class conditioning factor |
| `population_ind_pak_general/` | 14 GeoTIFF tiles | India + Pakistan | Exposure metrics & CCI population density |
| `wsrll_soil_data/` | Arc/Info .e00 | Global | Soil texture & ground stability classification |

### Training Results Summary

* **Study grid:** 3,860 × 4,586 pixels (14,349,161 valid Chamoli land cells at 30m)
* **Dataset:** 9,995 balanced samples — Train 70% (6,996) / Val 15% (1,499) / Test 15% (1,500)
* **Target ROC-AUC ≥ 0.88 → Achieved: 0.99996** on holdout test set
* **Target F1 ≥ 0.82 → Achieved: 0.99800** on holdout test set

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, TypeScript 5.x, Vite 8.x, Tailwind CSS, Leaflet + React-Leaflet, Framer Motion, Recharts, Lucide React |
| **Backend** | Python 3.10+, FastAPI, Uvicorn, Pydantic v2 |
| **AI / ML** | PyTorch (SusceptibilityNN, INT8 quantization), Scikit-Learn (StandardScaler), Joblib |
| **GIS / Spatial** | GeoPandas, Shapely, GDAL, Rasterio, PySAL, pyogrio |
| **Database** | PostgreSQL + PostGIS extension, GeoAlchemy2, SQLAlchemy 2.0 (planned) |
| **Satellite Data** | Copernicus CDSE / SentinelHub SDK, ESA WorldCover, NASA GPM IMERG |
| **Vector Data** | OpenStreetMap (Overpass API + india-260824.osm.pbf), ISRO CartoDEM / SRTM |

---

## Quickstart Guide

### Prerequisites

* Docker & Docker Compose
* Python 3.10+
* Node.js 18+
* PostgreSQL with PostGIS extension enabled

### 1. Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate
pip install --no-cache-dir -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Interactive API documentation available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Optionally create `frontend/.env`:
```env
VITE_API_URL=http://localhost:8000
```

### 3. Docker Deployment (Recommended)

```bash
docker-compose up --build
```

---

## Roadmap & Scalability Beyond Hackathon

* [ ] **PostGIS Full Integration:** Migrate processed GeoJSON layers into live PostgreSQL/PostGIS spatial tables with GeoAlchemy2 ORM for sub-millisecond spatial queries.
* [ ] **True OSM Graph Routing:** Replace the current road-geometry model in `OSMRoutingService` with a full OSM graph engine (e.g., OSMnx / NetworkX A* routing) using the `india-260824.osm.pbf` road network for precise turn-by-turn evacuation paths.
* [ ] **IoT Sensor Integration:** Connect ground-deformation sensors and automated rain gauges for live telemetry feeds.
* [ ] **e-Governance Linkage:** Integrate with state land record portals (e.g., e-District) to streamline land allocation for displaced families.
* [ ] **3D Terrain Simulation:** Implement CesiumJS for 3D volumetric landslide movement and inundation simulations.
* [ ] **Federated Learning:** Leverage the `Susceptibility-Mapping-FL-Hetero` module for privacy-preserving multi-district model training.
* [ ] **Offline Edge Mode:** Package lightweight spatial layers for offline deployment in local Emergency Operation Centers (EOCs).


┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 1: TELEMETRY & INGESTION WORKFLOW                                                                                │
│                                                                                                                        │
│  [ CartoDEM / SRTM 90m ]         [ Sentinel-1 SAR & Sentinel-2 Optical ]         [ NASA GPM IMERG & OpenWeather ]     │
│  (Elevation z, 6000×6000 px)     (10m Bands: NDVI, NDWI, WorldCover LULC)         (Monsoon Precip Trigger: P_live)     │
│            │                                         │                                           │                     │
│            ▼                                         ▼                                           ▼                     │
│   ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐                  │
│   │ Coordinate Harmonization & Feature Extraction Pipeline (EPSG:32643 UTM Grid)                   │                  │
│   │ • Geodesic Rescaling: Δx = Δλ·111320·cos(φ), Δy = Δφ·111320                                      │                  │
│   │ • Geomorphometry Fitting: Slope θ = arctan(|∇z|)·(180/π), Aspect, Curvatures (Plan/Profile)     │                  │
│   │ • Hydrological & Proximity Derivatives: TWI, SPI, Dist_to_Streams (OSM), Dist_to_Faults (MCT)   │                  │
│   └────────────────────────────────────────────────┬────────────────────────────────────────────────┘                  │
└────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────────┘
                                                     │ 12 Normalized Spatial Conditioning Variables (C = 12)
                                                     ▼
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 2: DYNAMIC ANALYTICS & AI RISK INFERENCE WORKFLOW                                                                │
│                                                                                                                        │
│  ┌───────────────────────────────────────────────────────┐   ┌──────────────────────────────────────────────────────┐  │
│  │ A. Dynamic Multi-Hazard Red-Zoning Pipeline (MCDA)    │   │ B. AI Hazard Susceptibility Workflow                │  │
│  │                                                       │   │    (`SusceptibilityNN` PyTorch Engine)               │  │
│  │   Hazard Index Formula:                               │   │                                                      │  │
│  │   HI = w₁·Slope + w₂·Runoff + w₃·Scar + w₄·P_live     │   │   Input Vector (C=12)                                │  │
│  │   Where:                                              │   │     │ (StandardScaler Normalization)                 │  │
│  │   • w₁ = 0.35 (Terrain Slope > 30°)                   │   │     ▼                                                │  │
│  │   • w₂ = 0.25 (Hydrological Drainage Corridors)       │   │   Dense(12 → 128) + BatchNorm + ReLU (Dropout p=0.3)    │  │
│  │   • w₃ = 0.15 (NASA GLC Historical Scars)             │   │     │                                                │  │
│  │   • w₄ = 0.25 (Live Rain Trigger, e.g., P_live=150mm)│   │     ▼                                                │  │
│  │                                                       │   │   Dense(128 → 64) + BatchNorm + ReLU (Dropout p=0.2)     │  │
│  │   Output: Continuous Spatial Hazard Grid              │   │     │                                                │  │
│  └───────────────────────────┬───────────────────────────┘   │     ▼                                                │  │
│                              │                               │   Dense(64 → 32)   + BatchNorm + ReLU                   │  │
│                              │                               │     │                                                │  │
│                              │                               │     ▼                                                │  │
│                              │                               │   Dense(32 → 1)    + Sigmoid Activation              │  │
│                              │                               │     │                                                │  │
│                              │                               │     ▼ (INT8 CPU Quantized Inference: <300ms)         │  │
│                              │                               │   Output: Failure Probability P(Failure) ∈ [0.0, 1.0] │  │
│                              │                               └──────────────────────────┬───────────────────────────┘  │
└──────────────────────────────┼──────────────────────────────────────────────────────────┼──────────────────────────────┘
                               └───────────────────────────┬──────────────────────────────┘
                                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 3: HAZARD ZONATION & SETTLEMENT INTERSECTION WORKFLOW                                                           │
│                                                                                                                        │
│                         [ Spatial Decision Gate: HI & P(Failure) Thresholds ]                                          │
│                                                   │                                                                    │
│                     ┌─────────────────────────────┴─────────────────────────────┐                                      │
│                     ▼ (HI ≥ 0.75 OR P ≥ 0.75)                                  ▼ (0.50 ≤ HI < 0.75)                     │
│              🔴 Dynamic Red Zone                                         🟠 Warning Buffer Zone                         │
│       (Critical Evacuation Polygon Features)                     (Pre-Monsoon Slope Monitoring)                        │
└─────────────────────────────┬──────────────────────────────────────────────────────────────────────────────────────────┘
                              │ Spatial Intersects OpenStreetMap Habitations (Points & Residential Polygons)
                              ▼
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 4: RESETTLEMENT QUEUEING & RECEIVING SITE EVALUATION WORKFLOW                                                    │
│                                                                                                                        │
│  ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ A. Vulnerability Prioritization Workflow                                                                        │  │
│  │    Habitation Risk Scoring: R = Hazard (HI) × Exposure (Pop Density) × Vulnerability                              │  │
│  │                                                                                                                  │  │
│  │   ├── Tier 1: 🚨 Immediate Evacuation (0–30 Days)  │ HI > 0.75 or Active Failure Scars                            │  │
│  │   ├── Tier 2: ⚠️ Short-Term Resettlement (1–6 Mos) │ 0.50 ≤ HI ≤ 0.75 or High-Density Buffer Zones                │  │
│  │   └── Tier 3: 🔵 Medium-Term Resettlement (Strategic)│ HI < 0.50 or Subsidence Trends                                │  │
│  └─────────────────────────────────────────────────────────┬────────────────────────────────────────────────────────┘  │
│                                                            │ Spatial Pairing: Match Habitation to Nearest Candidate Parcel
│                                                            ▼                                                           │
│  ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ B. Carrying Capacity Index (CCI) Evaluation Workflow (Multi-Criteria Decision Analysis)                          │  │
│  │                                                                                                                  │  │
│  │                             w₁·S₁ + w₂·S₂ + w₃·S₃ + w₄·S₄                                                       │  │
│  │                    CCI = ─────────────────────────────────── × 100                                               │  │
│  │                                 Population Density Factor                                                        │  │
│  │                                                                                                                  │  │
│  │   Evaluated Parcel Vector Criteria:                                                                              │  │
│  │   • S₁: Terrain Slope Stability (Weight = 0.30, Slope < 15°)                                                    │  │
│  │   • S₂: River Buffer Distance (Weight = 0.25, Buffer > 500m outside Flood Inundation)                            │  │
│  │   • S₃: Highway Proximity (Weight = 0.25, Distance ≤ 2km from Arterial Network)                                  │  │
│  │   • S₄: Unbuilt Land Cover (Weight = 0.20, Sentinel-2 Buildability Validation)                                   │  │
│  │                                                                                                                  │  │
│  │   [ Decision Logic Gate ]                                                                                        │  │
│  │   IF (CCI ≥ 75) AND (P(Failure) < 0.35) ──► ✅ Approved Permanent Relocation Parcel                               │  │
│  │   ELSE ─────────────────────────────────► ❌ Rejected Parcel (Triggers Alternate Parcel Scan)                   │  │
│  └──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┬──────────────────────────────────────────────────────────────┘
                                                          │ Verified Relocation Vectors & Route Geometry
                                                          ▼
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ STAGE 5: ROAD ROUTING & DISASTER RESPONSE WORKFLOW                                                                     │
│                                                                                                                        │
│  ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ OSMRoutingService Egress Workflow                                                                                │  │
│  │ • Waypoint Processing: Computes serpentine mountain-road corridors (8–40 nodes) along OSM highways                │  │
│  │ • Hazard Avoidance Offset: Applies normal-vector offsets to stay clear of active Red Zone perimeters             │  │
│  │ • Transit Time Estimation: 38 km/h (Primary Highways) / 28 km/h (Secondary Mountain Roads)                        │  │
│  └─────────────────────────────────────────────────────────┬────────────────────────────────────────────────────────┘  │
│                                                            │ Structured GeoJSON Data Streams & Dynamic API Endpoints
│                                                            ▼
│  ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ React 19 SDMA Dashboard Workflow                                                                                 │  │
│  │ • Live Map Layers: Interactive Leaflet Red Zone Overlays & Road Evacuation Corridors                              │  │
│  │ • Operational Simulation: Dynamic Rainfall Slider recalculates hazard boundaries in real time                     │  │
│  │ • Government Governance: Cryptographic SHA-256 Audit Trail & Official SITREP GeoJSON Exporter                    │  │
│  └──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
