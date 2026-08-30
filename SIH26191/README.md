```markdown
# RESITE-GIS (Resilient Environmental Site Assessment & Relocation Engine)

An AI-driven, GIS-enabled decision-support platform designed for State Disaster Management Authorities (SDMAs). It dynamically identifies multi-hazard Red Zones, calculates the Carrying Capacity Index (CCI) of safe relocation sites, and prioritizes vulnerable habitations for immediate, short-term, and medium-term resettlement.

---

## Executive Summary & Core Motive

India’s disaster-prone belts face recurring, severe hazards—such as the **2024 Wayanad Landslides (Kerala)** and recurring Himalayan cloudbursts and flash floods. Current disaster management frameworks remain heavily **reactive**, initiating evacuation and relief only *after* catastrophic losses occur. 

**RESITE-GIS shifts the paradigm from reactive disaster response to proactive spatial planning.**

### Primary Objectives
* **Dynamic Zonation:** Transition from static, 1:50,000 PDF hazard maps to a live engine that expands Red Zones based on real-time environmental triggers (e.g., precipitation, slope deformation).
* **Carrying Capacity Assessment:** Prevent secondary human disasters by evaluating whether candidate safe zones can sustainably support relocated populations (water, slope stability, road networks, land area).
* **Automated Relocation Queueing:** Use Multi-Criteria Decision Analysis (MCDA) to rank vulnerable habitations into actionable relocation tiers (*Immediate*, *Short-Term*, *Medium-Term*).

---

## Key Features

* **Dynamic Multi-Hazard Red-Zoning:** Real-time risk recalculation fusing DEM slope analysis, hydrological flow lines, and precipitation inputs.
* **Carrying Capacity Index (CCI) Evaluator:** Algorithmic scoring (0–100) of receiving sites using infrastructure proximity, buildability, and terrain stability.
* **Resettlement Prioritization Queue:** Automated ranking of habitations based on composite risk ($H \times E \times V$).
* **All-Weather Satellite Pipeline:** Integrates Copernicus Sentinel-1 Radar (clouds/storms) and Sentinel-2 Optical data (10m land cover).
* **Interactive SDMA Dashboard:** GPU-accelerated interactive map interface built with Mapbox GL JS and React.

---

## System Architecture


```

┌────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                              │
│  React.js + Mapbox GL JS / Deck.gl Map Dashboard                       │
│  - Interactive Red Zone Maps | Live Rainfall Slider | Relocation Queue │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Web REST API / GeoJSON
┌───────────────────────────────────▼────────────────────────────────────┐
│                         APPLICATION API LAYER                          │
│  FastAPI (Python) Framework                                            │
│  - Endpoint Router | Dynamic Simulation Engine | Report Exporter       │
└───────────────────┬───────────────────────────────┬────────────────────┘
                    │                               │
┌───────────────────▼───────────┐       ┌───────────▼────────────────────┐
│      SPATIAL ENGINE MODULE    │       │     ANALYTICS & AI ENGINE      │
│  GeoPandas + PostGIS + GDAL   │       │  PyTorch / Scikit-Learn        │
│  - Dynamic Buffer Generation  │       │  - Hazard Risk Score Engine    │
│  - Spatial Polygon Overlays   │       │  - Carrying Capacity Index     │
└───────────────────┬───────────┘       └───────────┬────────────────────┘
                    │                               │
┌───────────────────▼───────────────────────────────▼────────────────────┐
│                           DATA STORAGE LAYER                           │
│  PostgreSQL + PostGIS Extension                                        │
│  - Geometry Tables (Village Polygons, Roads, Rivers, Slope Contours)   │
└───────────────────────────────────▲────────────────────────────────────┘
                                    │ Data Ingestion Pipeline
┌───────────────────────────────────┴────────────────────────────────────┐
│                        EXTERNAL DATA SOURCES                           │
│  ISRO Bhuvan (DEMs) | IMD API (Rainfall) | Copernicus Sentinel-1 & 2   │
└────────────────────────────────────────────────────────────────────────┘

```

---

## Technical Approach & Methodologies

### 1. Dynamic Red-Zone Identification Algorithm
The platform calculates a dynamic Hazard Index ($HI$) by intersecting static geological factors with dynamic weather triggers:

$$HI = w_1 \cdot \text{Slope} + w_2 \cdot \text{Hydrological Runoff} + w_3 \cdot \text{Historical Collapse Scar} + w_4 \cdot \text{Precipitation (Live)}$$

* **Slope & Terrain Analysis:** Computed from **CartoDEM / Copernicus 30m DEM** via GDAL and Rasterio. Slopes $> 30^\circ$ receive maximum weight.
* **All-Weather Cloud Penetration:** Utilizes **Copernicus Sentinel-1 (SAR)** radar imagery to detect flood inundation and ground deformation through heavy monsoon cloud cover.
* **Live Trigger Adjustment:** User-controlled or API-driven precipitation inputs ($mm$) expand the dynamic spatial buffer around high-susceptibility zones.

### 2. Safe Site Carrying Capacity Index (CCI)
Candidate receiving sites are evaluated using Multi-Criteria Decision Analysis (MCDA):

$$CCI = \frac{\sum (w_i \cdot S_i)}{\text{Population Density Factor}}$$

Where criteria ($S_i$) include:
* **Slope Stability:** Unbuilt land with slope $< 15^\circ$.
* **Road & Grid Access:** Network distance ($\le 2 \text{ km}$) to primary/secondary roads via OpenStreetMap vectors.
* **Hydrological Safety:** Location outside 500m river flood buffers and high-risk runoffs.
* **Buildability:** Unforested, non-protected land extracted via 10m **Sentinel-2 LULC** classification.

### 3. Vulnerability Prioritization Matrix
Habitations inside or adjacent to Red Zones are automatically assigned a priority tier:

| Priority Level | Timeframe | Condition Criteria |
| :--- | :--- | :--- |
| **Immediate** | 0 – 30 Days | $HI > 0.8$, slope instability detected, active cloudburst/flood warning. |
| **Short-Term** | 1 – 6 Months | $0.5 < HI \le 0.8$, high population density within buffer zones. |
| **Medium-Term** | Strategic Plan | $HI \le 0.5$, long-term erosion or structural subsidence trends. |

---

## Repository Structure

```text
disaster-resite-platform/
├── docker-compose.yml             # PostGIS + FastAPI + Web app stack
├── .env.example
│
├── backend/                       # FASTAPI BACKEND & GIS ENGINE
│   ├── main.py                    # Application entry point
│   ├── requirements.txt           # Python dependencies
│   ├── app/
│   │   ├── api/v1/endpoints/     # REST Endpoints (hazards, relocation, queue)
│   │   ├── core/                  # Configurations & PostGIS DB connection
│   │   ├── models/                # GeoAlchemy2 ORM Spatial Models
│   │   ├── schemas/               # Pydantic GeoJSON interfaces
│   │   └── services/              # GIS Engine, CCI, & Risk Calculator
│   └── data_pipeline/            # DEM & OSM processing scripts
│
└── frontend/                      # REACT / NEXT.JS DASHBOARD
    ├── package.json
    └── src/
        ├── components/
        │   ├── map/               # Mapbox GL canvas, RedZone, SafeSite layers
        │   └── sidebar/           # Control Panel, Rainfall Slider, Queue Table
        ├── services/              # API connections to FastAPI
        └── App.jsx

```

---

## Tech Stack

* **Frontend:** React.js / Next.js, Tailwind CSS, Mapbox GL JS / Deck.gl
* **Backend:** Python (FastAPI), Uvicorn, Pydantic
* **Spatial & GIS Libraries:** GeoPandas, Shapely, GDAL, Rasterio, PySAL
* **Database:** PostgreSQL + PostGIS extension, GeoAlchemy2, SQLAlchemy
* **Satellite Data Sources:** Copernicus Sentinel-1 (SAR) & Sentinel-2 (Multispectral), ISRO CartoDEM, OpenStreetMap (OSM)

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
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install --no-cache-dir -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000

```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev

```

### 3. Docker Deployment (Recommended)

```bash
docker-compose up --build

```

---

## Roadmap & Scalability Beyond Hackathon

* [ ] **IoT Sensor Integration:** Connect ground-deformation sensors and automated rain gauges for live telemetry feeds.
* [ ] **e-Governance Linkage:** Integrate with state land record portals (e.g., e-District) to streamline land allocation for displaced families.
* [ ] **3D Terrain Simulation:** Implement CesiumJS for 3D volumetric landslide movement and inundation simulations.
* [ ] **Offline Edge Mode:** Package lightweight spatial layers for offline deployment in local emergency operation centers (EOCs).

```

<ElicitationsGroup message="What would you like to build or finalize next for the project?">

  <Elicitation label="Generate a docker-compose.yml file for PostGIS, Backend, and Frontend" query="Provide a complete docker-compose.yml file orchestrating PostgreSQL/PostGIS, the FastAPI backend, and React frontend."/>

  <Elicitation label="Create demo script and mock GeoJSON data for hackathon presentation" query="Generate a sample GeoJSON payload for dynamic Red Zones and Safe Sites to use during the pitch presentation."/>

</ElicitationsGroup>

```