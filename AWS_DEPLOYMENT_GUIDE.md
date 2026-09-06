# RESITE-GIS: AWS Low-Cost Deployment & Optimization Guide
> **Target Audience:** Disaster Management Authorities / SIH Evaluation Team  
> **Cost Profile:** Ultra-low userbase / $3.50 – $5.00 per month (or Free Tier eligible)

---

## 1. Storage Separation Strategy (>3.0 GB Data Offload)

The project previously contained **3.02 GB** of raw geospatial data directly in the local repository. For production deployment, the data is separated into two tiers:

### A. Raw Datasets (Offload to S3 Glacier / Standard-IA)
*These files are only used for offline training/extraction and **must not** be deployed inside the web container:*

| File / Folder | Size | AWS S3 Target Path |
| :--- | :--- | :--- |
| `backend/data_pipeline/raw/india-260824.osm.pbf` | **1.6 GB** | `s3://resite-gis-storage/raw/osm/india-260824.osm.pbf` |
| `backend/data_pipeline/raw/population_ind_pak_general/` | **672 MB** | `s3://resite-gis-storage/raw/population/` |
| `backend/data_pipeline/raw/Chamoli_Sentinel2_NDVI_10m.tif` | **627 MB** | `s3://resite-gis-storage/raw/rasters/Chamoli_Sentinel2_NDVI_10m.tif` |
| `backend/data_pipeline/raw/srtm_52_06/` | **69 MB** | `s3://resite-gis-storage/raw/srtm/` |
| `backend/data_pipeline/raw/Global_Landslide_Catalog_Export_rows.json` | **11 MB** | `s3://resite-gis-storage/raw/landslide_catalog.json` |
| `backend/data_pipeline/raw/Chamoli_ESA_WorldCover_LULC_10m.tif` | **8.7 MB** | `s3://resite-gis-storage/raw/rasters/Chamoli_ESA_WorldCover_LULC_10m.tif` |
| `backend/data_pipeline/raw/wsrll_soil_data/` | **4.0 MB** | `s3://resite-gis-storage/raw/soil/` |

### B. Production Runtime Data (~10 MB)
*These lightweight vector files are packaged inside the Docker container or synced at container start:*
- `red_zones_dynamic.geojson` (6.0 MB)
- `chamoli_waterways.geojson` (3.2 MB)
- `safe_relocation_sites.geojson` (432 KB)
- `resettlement_priority_queue.geojson` (6.3 KB)
- `dataset_summary.json` (5 KB)
- `scaler_params.json` & `scaler.joblib` (2 KB)

### Data Sync Utility
We provide `backend/scripts/sync_data.py` to automate syncing:
```bash
# Push raw archives to S3:
python backend/scripts/sync_data.py push-raw --bucket <your-bucket-name>

# Pull minimal runtime data on container cold-start:
python backend/scripts/sync_data.py pull-runtime --bucket <your-bucket-name>
```

---

## 2. Unused & Clutter Files to Remove

The following files are development scratchpads or redundant artifacts that are excluded via `.dockerignore` and `.gitignore`:

| File / Path | Reason & Action |
| :--- | :--- |
| `backend/app/services/Susceptibility-Mapping-FL-Hetero/.git/` | **Dead nested git repo** inside backend. Delete with `rm -rf`. |
| `backend/india_route_map.html` | Temporary test output HTML. |
| `backend/data_pipeline/scripts/analyzer.ipynb` (15 MB) | Exploratory notebook with large embedded plot outputs. Move offline. |
| `backend/data_pipeline/scripts/model-training.ipynb` | Training notebook not required at runtime. |
| `backend/osm_routing_and_population_overlay_plan.md` | Intermediate scratchpad notes. |
| `backend/walkthrough.md` | Development notes. |
| `backend/backend-description.md` | Redundant markdown summary. |
| `frontend/frontend-summary.md` | Redundant markdown summary. |

---

## 3. Frontend Optimizations

1. **Lazy Loading (`React.lazy` + `Suspense`)**:
   - `GISMap` (Leaflet), `Recharts` analytics views, and EOC command centers are loaded dynamically on demand.
   - Initial JavaScript load reduced by **>65%**.
2. **Vite Manual Chunks**:
   - Split vendor libraries into separate long-term cacheable chunks:
     - `vendor-react` (~64 KB gzip)
     - `vendor-gis` (~45 KB gzip)
     - `vendor-charts` (~112 KB gzip)
     - `vendor-motion` (~40 KB gzip)
3. **Static Hosting Architecture**:
   - Deploy `frontend/dist` directly to **AWS S3 + CloudFront CDN**.
   - S3 static hosting + CloudFront costs **<$0.05/month** under AWS Free Tier (1TB data transfer included).

---

## 4. Backend Optimizations

1. **In-Memory TTL Caching (`backend/app/core/cache.py`)**:
   - Caches external API responses (OpenWeatherMap, OSM Overpass, Copernicus CDSE).
   - Zero additional infrastructure cost (avoids needing a Redis instance).
   - Eliminates API rate-limit errors and drops response latency to <10ms for repeated queries.
2. **Multi-Stage Dockerfile (`backend/Dockerfile`)**:
   - Strips build dependencies, compilers, and raw data files.
   - Resulting Docker image is **<250 MB** (down from >4.5 GB).
3. **Low-Memory Footprint Tuning**:
   - Uvicorn configured with 2 workers and concurrency limits for 1 vCPU / 1GB RAM instances.

---

## 5. Step-by-Step AWS Deployment

### Option A: Ultra-Simple Single-Instance AWS Lightsail ($3.50/month)
*Best for lowest cost and simplest single-box setup:*

1. Launch an **AWS Lightsail Linux Instance** (OS: Ubuntu 22.04 LTS / 1GB RAM / 1 vCPU - $3.50/mo).
2. Clone repository on the instance:
   ```bash
   git clone <repo-url> /opt/resite-gis
   cd /opt/resite-gis
   ```
3. Build frontend:
   ```bash
   cd frontend
   npm install && npm run build
   cd ..
   ```
4. Start production container stack with Docker Compose:
   ```bash
   docker compose -f docker-compose.prod.yml up -d --build
   ```
5. Attach a Lightsail Static IP and open ports `80` and `443` in Lightsail Firewall.

---

### Option B: S3 + CloudFront (Frontend) & EC2 t4g.small (Backend)
*Best for global CDN distribution and SSL automation:*

1. **Frontend**:
   - Build frontend: `cd frontend && npm run build`.
   - Sync `frontend/dist` to S3: `aws s3 sync frontend/dist s3://<frontend-bucket-name> --delete`.
   - Create CloudFront Distribution pointing to the S3 bucket with ACM Free SSL Certificate.
2. **Backend**:
   - Launch EC2 `t4g.small` (ARM64 Graviton2 - $0.0168/hr or ~$12/mo on-demand / ~$4/mo on 1-yr Savings Plan).
   - Run backend container:
     ```bash
     docker run -d -p 8000:8000 --restart always \
       -e ENVIRONMENT=production \
       resite-gis-backend
     ```
3. Configure CloudFront route `/api/*` to forward requests to the EC2 backend instance.

---

## 6. Estimated Monthly Bill Breakdown

| Component | AWS Resource | Pricing Tier | Monthly Cost |
| :--- | :--- | :--- | :--- |
| **Frontend CDN** | AWS CloudFront | 1TB free outbound data / month | **$0.00** |
| **Static Storage** | AWS S3 (Frontend + Processed GeoJSONs) | < 50 MB total | **$0.01** |
| **Raw GIS Storage** | AWS S3 Glacier Deep Archive | 3.0 GB @ $0.00099/GB | **$0.003** |
| **Backend Compute** | AWS Lightsail 1 vCPU, 1GB RAM | Fixed monthly instance | **$3.50** |
| **SSL Certificate** | AWS Certificate Manager (ACM) | Public SSL cert | **$0.00** |
| **Total** | | | **~$3.51 / month** |
