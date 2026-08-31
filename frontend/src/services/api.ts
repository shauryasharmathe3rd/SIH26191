import {
  BackendRootResponse,
  CloudburstCheckResponse,
  DataSourceTelemetry,
  DistrictData,
  GeoJSONFeatureCollection,
  IncidentAlert,
  LandCoverResponse,
  NationalStats,
  NDVIResponse,
  NDWIResponse,
  OSMAllFeaturesResponse,
  PipelineSummaryResponse,
  SiteEvaluationRequest,
  SiteEvaluationResponse,
  SusceptibilityRequest,
  SusceptibilityResponse,
  WeatherCurrentResponse,
  WeatherForecastResponse,
  DangerToSafeRouteRequest,
  DangerToSafeRouteResponse,
} from '../types';

// API Base URLs
const API_ROOT = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000';
const API_V1 = `${API_ROOT}/api/v1`;

class ApiService {
  private rootUrl: string;
  private v1Url: string;

  constructor() {
    this.rootUrl = API_ROOT;
    this.v1Url = API_V1;
  }

  public getBaseUrl(): string {
    return this.v1Url;
  }

  public getRootUrl(): string {
    return this.rootUrl;
  }

  private async request<T>(url: string, options?: RequestInit): Promise<T> {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options?.headers,
      },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.detail) {
          errorMessage = typeof errorData.detail === 'string' 
            ? errorData.detail 
            : JSON.stringify(errorData.detail);
        }
      } catch {
        // Fallback to generic statusText
      }
      throw new Error(errorMessage);
    }

    return response.json();
  }

  // =========================================================================
  // 1. SYSTEM & HEALTH ENDPOINTS
  // =========================================================================

  /**
   * Root metadata & connected services status
   */
  public async getRootInfo(): Promise<BackendRootResponse> {
    return this.request<BackendRootResponse>(`${this.rootUrl}/`);
  }

  /**
   * Healthcheck endpoint
   */
  public async checkHealth(): Promise<{ status: string; service: string; version: string }> {
    return this.request<{ status: string; service: string; version: string }>(`${this.rootUrl}/api/health`);
  }

  // =========================================================================
  // 2. SITE EVALUATION & SPATIAL ENGINE ENDPOINTS
  // =========================================================================

  /**
   * Multi-criteria evaluation of a candidate relocation site:
   * Computes Carrying Capacity Index (0-100), OSM infrastructure, LULC, and weather safety.
   */
  public async evaluateSite(payload: SiteEvaluationRequest): Promise<SiteEvaluationResponse> {
    return this.request<SiteEvaluationResponse>(`${this.v1Url}/evaluate/site`, {
      method: 'POST',
      body: JSON.stringify({
        lat: payload.lat,
        lon: payload.lon,
        radius_km: payload.radius_km ?? 5.0,
      }),
    });
  }

  /**
   * AI Hazard Susceptibility Prediction using PyTorch INT8 Quantized SusceptibilityNN model
   */
  public async predictSusceptibility(payload: SusceptibilityRequest): Promise<SusceptibilityResponse> {
    return this.request<SusceptibilityResponse>(`${this.v1Url}/evaluate/susceptibility`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  /**
   * Get dynamic multi-hazard Red Zones GeoJSON layer with optional rainfall expansion simulation
   */
  public async getDynamicRedZones(params?: {
    min_hazard_index?: number;
    severity?: string;
    rainfall_mm?: number;
  }): Promise<GeoJSONFeatureCollection> {
    const queryParams = new URLSearchParams();
    if (params?.min_hazard_index !== undefined) {
      queryParams.append('min_hazard_index', params.min_hazard_index.toString());
    }
    if (params?.severity) {
      queryParams.append('severity', params.severity);
    }
    if (params?.rainfall_mm !== undefined) {
      queryParams.append('rainfall_mm', params.rainfall_mm.toString());
    }

    const qs = queryParams.toString();
    const url = `${this.v1Url}/evaluate/red-zones${qs ? `?${qs}` : ''}`;
    return this.request<GeoJSONFeatureCollection>(url);
  }

  /**
   * Get candidate safe relocation parcels GeoJSON layer with Carrying Capacity Index (CCI) metrics
   */
  public async getSafeRelocationSites(params?: {
    min_cci?: number;
    min_capacity?: number;
  }): Promise<GeoJSONFeatureCollection> {
    const queryParams = new URLSearchParams();
    if (params?.min_cci !== undefined) {
      queryParams.append('min_cci', params.min_cci.toString());
    }
    if (params?.min_capacity !== undefined) {
      queryParams.append('min_capacity', params.min_capacity.toString());
    }

    const qs = queryParams.toString();
    const url = `${this.v1Url}/evaluate/safe-sites${qs ? `?${qs}` : ''}`;
    return this.request<GeoJSONFeatureCollection>(url);
  }

  /**
   * Get prioritized habitation resettlement queue GeoJSON paired with nearest designated safe sites
   */
  public async getResettlementQueue(params?: {
    tier?: string;
  }): Promise<GeoJSONFeatureCollection> {
    const queryParams = new URLSearchParams();
    if (params?.tier) {
      queryParams.append('tier', params.tier);
    }

    const qs = queryParams.toString();
    const url = `${this.v1Url}/evaluate/resettlement-queue${qs ? `?${qs}` : ''}`;
    return this.request<GeoJSONFeatureCollection>(url);
  }

  /**
   * Get high-level spatial pipeline, model evaluation benchmarks, and habitation statistics
   */
  public async getPipelineSummary(): Promise<PipelineSummaryResponse> {
    return this.request<PipelineSummaryResponse>(`${this.v1Url}/evaluate/summary`);
  }

  /**
   * Get all dynamic operational district dossiers synthesized from the GIS pipeline
   */
  public async getDistricts(): Promise<DistrictData[]> {
    return this.request<DistrictData[]>(`${this.v1Url}/evaluate/districts`);
  }

  /**
   * Get dynamic incident alerts stream generated from high-risk red zones
   */
  public async getActiveAlerts(): Promise<IncidentAlert[]> {
    return this.request<IncidentAlert[]>(`${this.v1Url}/evaluate/alerts`);
  }

  /**
   * Get live status and latency telemetry for integrated data feeds
   */
  public async getDataSources(): Promise<DataSourceTelemetry[]> {
    return this.request<DataSourceTelemetry[]>(`${this.v1Url}/evaluate/data-sources`);
  }

  /**
   * Get aggregated national situation statistics calculated dynamically
   */
  public async getNationalStats(): Promise<NationalStats> {
    return this.request<NationalStats>(`${this.v1Url}/evaluate/national-stats`);
  }

  // =========================================================================
  // 3. COPERNICUS SATELLITE REMOTE SENSING ENDPOINTS
  // =========================================================================

  /**
   * Compute Normalized Difference Vegetation Index (NDVI) for study bounding box
   */
  public async computeNDVI(payload: {
    bbox: [number, number, number, number];
    time_range?: string;
  }): Promise<NDVIResponse> {
    return this.request<NDVIResponse>(`${this.v1Url}/satellite/ndvi`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  /**
   * Compute Normalized Difference Water Index (NDWI) for flood inundation detection
   */
  public async computeNDWI(payload: {
    bbox: [number, number, number, number];
    time_range?: string;
  }): Promise<NDWIResponse> {
    return this.request<NDWIResponse>(`${this.v1Url}/satellite/ndwi`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  /**
   * Analyze 4-class multi-spectral Land Cover (Dense Vegetation, Sparse Vegetation, Barren Land, Water)
   */
  public async analyzeLandCover(payload: {
    bbox: [number, number, number, number];
    time_range?: string;
  }): Promise<LandCoverResponse> {
    return this.request<LandCoverResponse>(`${this.v1Url}/satellite/land-cover`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // =========================================================================
  // 4. OPENSTREETMAP INFRASTRUCTURE VECTOR ENGINE ENDPOINTS
  // =========================================================================

  /**
   * Extract residential and commercial building footprints from OSM within bounding box
   */
  public async getOSMBuildings(bbox: string): Promise<{ status: string; count: number; data: any[] }> {
    return this.request<{ status: string; count: number; data: any[] }>(`${this.v1Url}/osm/buildings/${bbox}`);
  }

  /**
   * Extract road transit networks, highways, and evacuation corridors within bounding box
   */
  public async getOSMRoads(bbox: string): Promise<{ status: string; count: number; data: any[] }> {
    return this.request<{ status: string; count: number; data: any[] }>(`${this.v1Url}/osm/roads/${bbox}`);
  }

  /**
   * Extract river channels, mountain streams, and drainage waterways within bounding box
   */
  public async getOSMWaterways(bbox: string): Promise<{ status: string; count: number; data: any[] }> {
    return this.request<{ status: string; count: number; data: any[] }>(`${this.v1Url}/osm/waterways/${bbox}`);
  }

  /**
   * Combined infrastructure scan (buildings, roads, waterways) and summary statistics
   */
  public async getOSMAllFeatures(bbox: string): Promise<OSMAllFeaturesResponse> {
    return this.request<OSMAllFeaturesResponse>(`${this.v1Url}/osm/features/${bbox}`);
  }

  // =========================================================================
  // 5. METEOROLOGICAL & CLOUDBURST MONITORING ENDPOINTS
  // =========================================================================

  /**
   * Live real-time weather observations at coordinate location
   */
  public async getCurrentWeather(lat: number, lon: number): Promise<WeatherCurrentResponse> {
    return this.request<WeatherCurrentResponse>(`${this.v1Url}/weather/current/${lat}/${lon}`);
  }

  /**
   * Precipitation forecast and 3-hour / 6-hour cumulative rainfall accumulations
   */
  public async getWeatherForecast(lat: number, lon: number, hours: number = 6): Promise<WeatherForecastResponse> {
    return this.request<WeatherForecastResponse>(`${this.v1Url}/weather/forecast/${lat}/${lon}?hours=${hours}`);
  }

  /**
   * Evaluate real-time cloudburst hazard trigger criteria (>100mm in 3h) and return SDMA advisory
   */
  public async checkCloudburstTrigger(lat: number, lon: number): Promise<CloudburstCheckResponse> {
    return this.request<CloudburstCheckResponse>(`${this.v1Url}/weather/cloudburst-check/${lat}/${lon}`);
  }

  // =========================================================================
  // 6. OSM ROAD-ROUTING & POPULATION DISTRIBUTION ENDPOINTS
  // =========================================================================

  /**
   * Get all road-network relocation corridors connecting prioritized habitations
   * to designated safe sites along verified OSM highways, avoiding red hazard zones.
   */
  public async getRelocationCorridors(params?: { tier?: string }): Promise<GeoJSONFeatureCollection> {
    const queryParams = new URLSearchParams();
    if (params?.tier) {
      queryParams.append('tier', params.tier);
    }
    const qs = queryParams.toString();
    const url = `${this.v1Url}/evaluate/relocation-corridors${qs ? `?${qs}` : ''}`;
    return this.request<GeoJSONFeatureCollection>(url);
  }

  /**
   * Get multi-tier population distribution grid across operational districts,
   * including direct gridded density clusters and dasymetric settlement estimation for data-sparse areas.
   */
  public async getPopulationDistribution(params?: { district_id?: string }): Promise<GeoJSONFeatureCollection> {
    const queryParams = new URLSearchParams();
    if (params?.district_id) {
      queryParams.append('district_id', params.district_id);
    }
    const qs = queryParams.toString();
    const url = `${this.v1Url}/evaluate/population-distribution${qs ? `?${qs}` : ''}`;
    return this.request<GeoJSONFeatureCollection>(url);
  }

  /**
   * Compute and fetch driving route path from Danger/Red Zone to Safe Relocation Zone
   * using OSRM Vector Engine from overlay_mapping/overlay.py.
   */
  public async getDangerToSafeOverlayRoute(payload: DangerToSafeRouteRequest): Promise<DangerToSafeRouteResponse> {
    return this.request<DangerToSafeRouteResponse>(`${this.v1Url}/osm/route`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
}

export const apiService = new ApiService();
export default apiService;

