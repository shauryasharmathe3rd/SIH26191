# RESITE-GIS Backend Architecture & Working Documentation

**RESITE-GIS** (*Resilient Environmental Site Assessment & Relocation Engine*) is an AI-driven, GIS-enabled decision-support platform designed for State Disaster Management Authorities (SDMAs). The backend dynamically identifies multi-hazard Red Zones, calculates the Carrying Capacity Index (CCI) of safe relocation sites, and prioritizes vulnerable habitations for immediate, short-term, and medium-term resettlement.

---

## 1. System Architecture Overview

```mermaid
graph TB
    subgraph ClientLayer ["1. Client / Presentation Layer"]
        UI["React / Mapbox GL JS / Deck.gl Dashboard"]
    end

    subgraph APIGateway ["2. API & Routing Layer (FastAPI)"]
        Main["FastAPI Application (main.py)"]
        Core["Core Config & Settings (app/core/config.py)"]
        
        EvalRoutes["/api/v1/evaluate (evaluation_routes.py)"]
        SatRoutes["/api/v1/satellite (satellite_routes.py)"]
        OSMRoutes["/api/v1/osm (osm_routes.py)"]
        WeatherRoutes["/api/v1/weather (weather_routes.py)"]
    end

    subgraph ServiceLayer ["3. Business Logic & Computing Services (app/services/)"]
        EvalSvc["EvaluationService (evaluation_service.py)"]
        SatSvc["SatelliteService (satellite_service.py)"]
        OSMSvc["OSMService (osm_service.py)"]
        WeatherSvc["WeatherService (weather_service.py)"]
    end

    subgraph SpatialEngine ["4. Spatial Engine & Data Pipeline (data_pipeline/)"]
        GeoEngine["Vector & Raster Compute (GeoPandas, GDAL, Rasterio, Shapely)"]
        DEMProcessing["DEM Slope & Hydrological Inundation Analyzers"]
        Outputs["Processed GeoJSON Outputs (Red Zones, Safe Sites, Queue)"]
    end

    subgraph PersistenceLayer ["5. Storage & Persistence (Planned)"]
        PostGIS[("PostgreSQL + PostGIS Extension")]
        ORM["SQLAlchemy 2.0 + GeoAlchemy2"]
    end

    subgraph ExternalSources ["6. External Data Integrations"]
        Copernicus["Copernicus CDSE / Sentinel-1 (SAR) & Sentinel-2 (Optical)"]
        Overpass["OpenStreetMap (Overpass API)"]
        WeatherAPIs["OpenWeatherMap / IMD API"]
    end

    %% Flow Connections
    UI <-->|HTTP / REST (JSON & GeoJSON)| Main
    Main --> EvalRoutes & SatRoutes & OSMRoutes & WeatherRoutes
    Main -.-> Core

    EvalRoutes --> EvalSvc
    SatRoutes --> SatSvc
    OSMRoutes --> OSMSvc
    WeatherRoutes --> WeatherSvc

    %% Service Orchestration
    EvalSvc -->|Parallel Execution via asyncio.gather| OSMSvc
    EvalSvc -->|Parallel Execution via asyncio.gather| SatSvc
    EvalSvc -->|Parallel Execution via asyncio.gather| WeatherSvc

    %% External APIs
    SatSvc -->|WMS Requests via SentinelHub SDK| Copernicus
    OSMSvc -->|Overpass QL Queries via HTTPX| Overpass
    WeatherSvc -->|REST Weather Endpoints| WeatherAPIs

    %% Spatial Pipeline
    DEMProcessing --> GeoEngine --> Outputs
    GeoEngine -.-> ORM --> PostGIS
```

---

## 2. Directory Structure

The backend directory layout complies with the standard project specification:

```text
backend/
├── main.py                    # Application entry point & FastAPI instance
├── requirements.txt           # Python dependencies
├── backend-description.md     # Backend architecture & working documentation
├── app/
│   ├── api/                   # API versioning & dependencies
│   │   ├── dependencies.py    # Common endpoint dependencies
│   │   └── v1/
│   │       ├── endpoints/     # Router endpoint re-exports
│   │       ├── evaluation_routes.py # Site evaluation endpoints
│   │       ├── osm_routes.py        # OpenStreetMap features endpoints
│   │       ├── satellite_routes.py  # Copernicus/SentinelHub satellite endpoints
│   │       └── weather_routes.py    # Live weather & cloudburst endpoints
│   ├── core/                  # Core configurations & DB connections
│   │   └── config.py          # Centralized settings & environment parameters
│   ├── config.py              # Root app settings module
│   ├── models/                # GeoAlchemy2 & SQLAlchemy spatial models
│   ├── schemas/               # Pydantic schemas and GeoJSON response interfaces
│   └── services/              # Business logic & geospatial services
│       ├── evaluation_service.py # Site evaluation & suitability scoring
│       ├── osm_service.py        # Overpass API client for infrastructure
│       ├── satellite_service.py  # Copernicus CDSE & Sentinel-Hub processing
│       └── weather_service.py    # Meteorological & Cloudburst analysis
└── data_pipeline/             # Offline GIS & DEM processing scripts
    ├── processed/             # Output GeoJSON datasets (Red Zones, Safe Sites)
    └── scripts/               # Raster analysis notebooks & pipeline scripts
        ├── analyzer.ipynb     # Spatial analysis and MCDA notebook
        └── chain-of-thought.md# Methodological reasoning and pipeline notes
```

---

## 3. Core Modules & Services Breakdown

### 1. `app/core/config.py` & `app/config.py`
Manages application configuration, reading from system environment variables and `.env`:
- `ENVIRONMENT`: Current runtime environment (`development` / `production`).
- `API_VERSION`: API version prefix (defaults to `v1`).
- `COPERNICUS_CLIENT_ID` / `COPERNICUS_CLIENT_SECRET`: OAuth2 credentials for Copernicus Data Space Ecosystem (CDSE).
- `SENTINELHUB_CLIENT_ID` / `SENTINELHUB_CLIENT_SECRET`: Sentinel-Hub credentials.
- `OPENWEATHER_API_KEY` / `IMD_API_KEY`: Meteorological data provider access keys.
- `VITE_MAPBOX_TOKEN`: Mapbox GL JS access token.

---

### 2. `app/services/evaluation_service.py`
Implements the multi-criteria evaluation algorithm:
- **Parallel Data Fetching**: Uses `asyncio.gather` to concurrently query OpenStreetMap features, Sentinel satellite land cover, and weather data.
- **Safety Score Calculation**:
  - Building density penalty: $\max(0, 30 - \text{building\_count}) \times 0.3$
  - Unbuilt land weight: $\text{unbuilt\_land\_percentage} \times 0.5$
  - Road connectivity bonus: $\min(20, \text{road\_count} \times 2)$
  - Output Score: Normalized between $0 - 100$.
- **Recommendation Threshold**: Flags sites with score $> 70$ as `✅ Suitable for relocation` and $\le 70$ as `⚠️ Further evaluation needed`.

---

### 3. `app/services/satellite_service.py`
Integrates with the Copernicus Data Space Ecosystem (CDSE) and Sentinel-Hub SDK:
- **NDVI (Normalized Difference Vegetation Index)**:
  $$\text{NDVI} = \frac{\text{NIR} - \text{Red}}{\text{NIR} + \text{Red}}$$
  Classifies pixels into:
  - $\text{NDVI} > 0.6$: Dense vegetation (forest)
  - $0.3 < \text{NDVI} \le 0.6$: Sparse vegetation / cropland
  - $0.0 \le \text{NDVI} \le 0.3$: Barren land / buildable unbuilt land
  - $\text{NDVI} < 0.0$: Water bodies
- **NDWI (Normalized Difference Water Index)**:
  $$\text{NDWI} = \frac{\text{Green} - \text{NIR}}{\text{Green} + \text{NIR}}$$
  Identifies flood inundation zones when $\text{NDWI} > 0.3$.
- **True Color (RGB)**: Fetches WMS true-color imagery for visual overlay.

---

### 4. `app/services/osm_service.py`
Queries the OpenStreetMap Overpass API (`https://overpass-api.de/api/interpreter`) using Overpass QL:
- **Buildings Query**: Identifies existing residential habitations and structures within a bounding box.
- **Road Network Query**: Extracts highways, primary roads, and rural access routes.
- **Waterways Query**: Extracts river corridors and streams to establish flood buffer exclusions.

---

### 5. `app/services/weather_service.py`
Provides real-time weather analytics and disaster threshold triggers:
- **Precipitation Monitoring**: Gathers rainfall accumulation across hourly intervals.
- **Cloudburst Trigger Detection**: Monitors 3-hour cumulative precipitation; triggers alerts if cumulative rainfall exceeds $100\text{ mm / 3h}$.

---

## 4. API Endpoints Reference

| Method | Endpoint | Description | Request Body / Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | API status and connected service details | None |
| `GET` | `/api/health` | Healthcheck endpoint | None |
| `POST` | `/api/v1/evaluate/site` | Relocation site assessment | `{ "lat": float, "lon": float, "radius_km": float }` |
| `POST` | `/api/v1/satellite/ndvi` | Compute NDVI raster for BBox | `{ "bbox": [minX, minY, maxX, maxY], "time_range": "YYYY-MM-DD" }` |
| `POST` | `/api/v1/satellite/ndwi` | Compute NDWI flood raster | `{ "bbox": [minX, minY, maxX, maxY], "time_range": "YYYY-MM-DD" }` |
| `POST` | `/api/v1/satellite/land-cover` | Land cover breakdown % | `{ "bbox": [minX, minY, maxX, maxY], "time_range": "YYYY-MM-DD" }` |
| `GET` | `/api/v1/osm/buildings/{bbox}` | Extract building footprints | Path param: `bbox` (`minLat,minLon,maxLat,maxLon`) |
| `GET` | `/api/v1/osm/roads/{bbox}` | Extract road network vectors | Path param: `bbox` (`minLat,minLon,maxLat,maxLon`) |
| `GET` | `/api/v1/weather/current/{lat}/{lon}` | Real-time weather data | Path params: `lat`, `lon` |
| `GET` | `/api/v1/weather/forecast/{lat}/{lon}` | 6-hour rainfall forecast | Path params: `lat`, `lon`, `hours` (optional) |
| `GET` | `/api/v1/weather/cloudburst-check/{lat}/{lon}` | Cloudburst trigger check | Path params: `lat`, `lon` |

---

## 5. Decision Models & Mathematical Formulations

### A. Dynamic Red-Zone Identification (Hazard Index - $HI$)
$$HI = w_1 \cdot \text{Slope} + w_2 \cdot \text{Hydrological Runoff} + w_3 \cdot \text{Historical Scar} + w_4 \cdot \text{Live Rainfall}$$
- **Slope**: Computed from CartoDEM / Copernicus 30m DEM via GDAL/Rasterio. Slopes $> 30^\circ$ receive critical risk weighting.
- **Runoff & Flood**: Dynamic buffer expansion driven by live precipitation telemetry.

### B. Carrying Capacity Index (CCI) for Safe Relocation
$$CCI = \frac{\sum (w_i \cdot S_i)}{\text{Population Density Factor}}$$
Evaluates:
1. **Terrain Stability**: Slope $< 15^\circ$ for constructability.
2. **Access**: Distance $\le 2\text{ km}$ to road corridors.
3. **Flood Protection**: Distance $> 500\text{ m}$ from dynamic flood buffers.
4. **Land Availability**: High percentage of unbuilt barren/sparse vegetation land.

### C. Resettlement Prioritization Queue
- **Immediate (0–30 Days)**: $HI > 0.8$, slope instability detected, active cloudburst warning.
- **Short-Term (1–6 Months)**: $0.5 < HI \le 0.8$, high population density in dynamic risk buffer.
- **Medium-Term (Strategic)**: $HI \le 0.5$, monitoring long-term erosion patterns.

---

## 6. How to Run the Backend

### Prerequisites
- Python 3.10+
- Virtual environment (`venv` or `conda`)

### Local Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Interactive API Documentation
Once running, Swagger UI documentation is available at:
- `http://localhost:8000/docs`
- `http://localhost:8000/redoc`
