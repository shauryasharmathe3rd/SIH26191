export type RiskSeverity = 'LOW' | 'MODERATE' | 'HIGH' | 'VERY_HIGH' | 'CRITICAL' | 'WARNING' | 'INFO';

export type HazardCategory = 
  | 'Flash Flood' 
  | 'Landslide & Slope Failure' 
  | 'Cyclone & Storm Surge' 
  | 'Glacial Lake Outburst (GLOF)' 
  | 'Land Subsidence' 
  | 'Urban Waterlogging' 
  | 'Seismic Vulnerability';

export interface GeoCoordinate {
  lat: number;
  lng: number;
}

export interface HazardZone {
  id: string;
  name: string;
  type: 'flood_inundation' | 'landslide_debris' | 'cyclone_surge' | 'seismic_fault' | 'subsidence';
  severity: RiskSeverity;
  coordinates: [number, number][]; // Polygon vertices
  areaSqKm: number;
  affectedPopulation: number;
  bufferRadiusMeters?: number;
  waterLevelMeters?: number;
  slopeAngleDeg?: number;
}

export interface CriticalInfrastructure {
  id: string;
  name: string;
  type: 'hospital' | 'shelter' | 'bridge' | 'fire_station' | 'power_grid' | 'helipad' | 'relief_hub' | 'dam';
  status: 'operational' | 'at_risk' | 'inundated' | 'evacuated';
  coordinates: [number, number];
  capacity?: number;
  currentOccupancy?: number;
  contact?: string;
  districtId: string;
  criticality: 'CRITICAL' | 'ESSENTIAL' | 'SUPPORT';
}

export interface EvacuationRoute {
  id: string;
  code?: string;
  name: string;
  fromZone?: string;
  toShelter?: string;
  coordinates: [number, number][];
  distanceKm?: number;
  estimatedTransitMins?: number;
  clearanceStatus?: 'CLEAR' | 'CONGESTED' | 'BLOCKED' | 'CAUTION';
  status?: 'CLEAR' | 'CONGESTED' | 'BLOCKED' | 'CAUTION';
  roadCapacityVehiclesPerHour?: number;
  transitCapacityPerHour?: number;
  currentFlowPerHour?: number;
  bottleneckLocation?: string;
  ndrfEscortAssigned?: boolean;
  alternativeRouteAvailable?: boolean;
}

export interface CapacityMetric {
  name: string;
  current: number;
  max: number;
  unit: string;
  deficitOrSurplus: number; // positive = surplus, negative = deficit
  status: 'SURPLUS' | 'ADEQUATE' | 'DEFICIT' | 'CRITICAL_DEFICIT';
  burnRatePerDay?: string;
}

export interface DistrictCarryingCapacity {
  shelterBeds: CapacityMetric;
  potableWater: CapacityMetric;
  medicalIcuBeds: CapacityMetric;
  foodRations: CapacityMetric;
  roadEvacuationFlow: CapacityMetric;
  emergencyResponders: CapacityMetric;
  compositeCapacityRatio: number; // 0 to 100%
}

export interface VulnerabilityAssessment {
  populationVulnerability: number; // 0 - 100
  infrastructureVulnerability: number;
  socioEconomicVulnerability: number;
  accessibilityVulnerability: number;
  environmentalVulnerability: number;
  historicalExposure: number;
  compositeIndex: number; // 0 - 100
  keyRiskDrivers: string[];
}

export interface ExplainableFactor {
  factor: string;
  weightPercent: number;
  indicatorValue: string;
  description: string;
}

export interface AiDecisionRecommendation {
  id: string;
  priority: 'PRIORITY_1' | 'PRIORITY_2' | 'PRIORITY_3' | 'PRIORITY_4';
  priorityLabel: 'Priority 1 — Immediate Relocation' | 'Priority 2 — High Readiness Relocation' | 'Priority 3 — Moderate Watch' | 'Priority 4 — Routine Monitoring';
  actionTitle: string;
  executiveSummary: string;
  confidenceScore: number; // e.g. 94%
  riskTrajectory: 'RAPIDLY_ESCALATING' | 'INCREASING' | 'STABLE' | 'SUBSIDING';
  populationToRelocate: number;
  recommendedEvacuationWindow: string; // e.g. "4–6 hours before cutoff"
  designatedShelterIds: string[];
  designatedShelterNames: string[];
  explainableFactors: ExplainableFactor[];
  requiredTransportUnits: {
    buses: number;
    ambulances: number;
    boats: number;
    ndrfPersonnel: number;
  };
  approved: boolean;
  approvedBy?: string;
  approvalTimestamp?: string;
  orderNumber?: string;
}

export interface DistrictData {
  id: string;
  name: string;
  state: string;
  code: string;
  coordinates: [number, number];
  bounds?: [[number, number], [number, number]];
  riskScore: number; // 0 - 100
  riskLevel: RiskSeverity;
  primaryHazard: HazardCategory;
  secondaryHazard?: HazardCategory;
  totalPopulation: number;
  exposedPopulation: number;
  vulnerableDemographics: {
    elderly: number;
    children: number;
    differentlyAbled: number;
    livestockCount: number;
  };
  operationalStatus: 'STANDBY' | 'STAGE_1_ALERT' | 'STAGE_2_WARNING' | 'EMERGENCY_RED_ALERT';
  carryingCapacity: DistrictCarryingCapacity;
  vulnerability: VulnerabilityAssessment;
  aiRecommendation: AiDecisionRecommendation;
  hazardZones: HazardZone[];
  infrastructure: CriticalInfrastructure[];
  evacuationRoutes: EvacuationRoute[];
  dataSources: string[];
  lastUpdated: string;
  weatherTelemetry: {
    rainfall24hMm: number;
    rainfallForecastNext6hMm: number;
    soilMoisturePercent: number;
    riverDischargeCusecs?: number;
    waterLevelAboveDangerMm?: number;
    windSpeedKmph?: number;
  };
  historicalEventsCount: number;
}

export interface IncidentAlert {
  id: string;
  timestamp: string;
  districtId: string;
  districtName: string;
  state: string;
  severity: RiskSeverity;
  category: HazardCategory;
  title: string;
  message: string;
  sourceAgency: string;
  coordinates: [number, number];
  affectedPopulation: number;
  acknowledged: boolean;
  actionRequired: boolean;
}

export interface DataSourceTelemetry {
  id: string;
  name: string;
  agency: string;
  protocol: string;
  latencyMs: number;
  status: 'ONLINE' | 'DEGRADED' | 'SYNCING' | 'OFFLINE';
  lastSync: string;
  recordsIngestedToday: number;
  confidence: 'High' | 'Moderate' | 'Low';
  coverageType: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  officerName: string;
  designation: string;
  actionType: 'ORDER_ISSUED' | 'RELOCATION_APPROVED' | 'ALERT_BROADCAST' | 'RESOURCE_DISPATCHED' | 'SIMULATION_EXECUTED';
  targetDistrict: string;
  details: string;
  authorizationHash: string;
}

export interface NationalStats {
  activeIncidents: number;
  criticalDistrictsCount: number;
  highRiskDistrictsCount: number;
  totalPopulationAtRisk: number;
  evacuationRequiredCount: number;
  evacuatedSoFar: number;
  shelterCapacityTotal: number;
  shelterCapacityOccupied: number;
  criticalInfrastructureAtRisk: number;
  ndrfBattalionsDeployed: number;
  sdrfTeamsActive: number;
  helicoptersOnStandby: number;
  lastSyncTime: string;
  systemStatus: 'OPERATIONAL' | 'DEGRADED' | 'CRITICAL';
  connectedDataSourcesCount: number;
}

export type ActiveTab = 
  | 'landing_page'
  | 'national_overview'
  | 'state_intelligence'
  | 'district_intelligence'
  | 'incident_command'
  | 'active_alerts'
  | 'risk_map'
  | 'red_zones'
  | 'carrying_capacity'
  | 'vulnerability_assessment'
  | 'relocation_intelligence'
  | 'scenario_simulation'
  | 'data_sources'
  | 'reports_sitrep'
  | 'audit_logs'
  | 'settings';

// ==========================================
// BACKEND REST API SCHEMAS & INTERFACES
// ==========================================

export interface SiteEvaluationRequest {
  lat: number;
  lon: number;
  radius_km?: number;
}

export interface SiteEvaluationAnalysis {
  osm: {
    buildings_count: number;
    roads_count: number;
    waterways_count: number;
    density_status: string;
  };
  land_cover: {
    unbuilt_land_pct: number;
    vegetation_dense_pct: number;
    cropland_sparse_pct: number;
    water_pct: number;
  };
  weather: {
    rainfall_3h_mm: number;
    cloudburst_risk: boolean;
    temperature_c?: number;
  };
  terrain?: {
    elevation_m?: number;
    slope_deg?: number;
    stability?: string;
  };
}

export interface SiteEvaluationResponse {
  status: string;
  site: { lat: number; lon: number };
  radius_km: number;
  score: number; // 0-100 Carrying Capacity Index
  recommendation: string;
  analysis: SiteEvaluationAnalysis;
  hazard_risk_level: string;
  viable_family_capacity?: number;
}

export interface SusceptibilityFeatureInput {
  elevation: number;
  slope: number;
  aspect: number;
  plan_curvature?: number;
  profile_curvature?: number;
  twi?: number;
  spi?: number;
  dist_to_streams: number;
  dist_to_faults: number;
  ndvi?: number;
  lulc?: number;
  precip_gpm: number;
}

export interface SusceptibilityRequest {
  lat?: number;
  lon?: number;
  features?: SusceptibilityFeatureInput;
  rainfall_mm?: number;
}

export interface SusceptibilityResponse {
  status: string;
  susceptibility_score: number;
  hazard_tier: string;
  model_version: string;
  input_features: Record<string, number>;
  action_advisory: string;
}

export interface GeoJSONFeature {
  type: 'Feature';
  properties: Record<string, any>;
  geometry: {
    type: 'Point' | 'Polygon' | 'MultiPolygon' | 'LineString';
    coordinates: any;
  };
}

export interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  name?: string;
  crs?: any;
  total_count?: number;
  features: GeoJSONFeature[];
}

export interface PipelineSummaryResponse {
  status: string;
  study_area?: {
    district: string;
    crs: string;
    spatial_resolution: string;
    dem_elevation_range_m: [number, number];
    active_grid_cells: number;
  };
  hazard_zonation?: {
    critical_red_zones_count: number;
    warning_buffer_count: number;
    total_high_risk_area_sqkm: number;
  };
  relocation_parcels?: {
    identified_safe_sites_count: number;
    mean_carrying_capacity_index: number;
    total_family_capacity: number;
  };
  resettlement_queue?: {
    total_monitored_habitations: number;
    immediate_urgent_villages: number;
    short_term_relocation_villages: number;
    medium_term_villages: number;
    total_population_at_risk: number;
  };
  ai_susceptibility_model?: {
    architecture: string;
    validation_roc_auc: number;
    test_f1_score: number;
    quantization: string;
  };
  [key: string]: any;
}

export interface NDVIResponse {
  status: string;
  bbox: [number, number, number, number];
  time_range?: string;
  mean_ndvi: number;
  min_ndvi: number;
  max_ndvi: number;
  vegetation_class: string;
  raster_preview_url?: string | null;
}

export interface NDWIResponse {
  status: string;
  bbox: [number, number, number, number];
  time_range?: string;
  mean_ndwi: number;
  flood_detected: boolean;
  water_surface_percentage: number;
}

export interface LandCoverResponse {
  status: string;
  bbox: [number, number, number, number];
  time_range?: string;
  breakdown: {
    dense_vegetation_pct: number;
    sparse_vegetation_pct: number;
    barren_land_pct: number;
    water_pct: number;
  };
  unbuilt_land_percentage: number;
}

export interface OSMAllFeaturesResponse {
  status: string;
  bbox: string;
  statistics: {
    building_count: number;
    road_count: number;
    waterway_count: number;
  };
  buildings: any[];
  roads: any[];
  waterways: any[];
}

export interface WeatherCurrentResponse {
  status: string;
  coord: { lat: number; lon: number };
  station_name: string;
  weather: {
    temp_celsius: number;
    feels_like_celsius?: number;
    humidity_percent: number;
    wind_speed_kmh: number;
    pressure_hpa?: number;
    description: string;
  };
  timestamp: string;
}

export interface WeatherForecastResponse {
  status: string;
  coord: { lat: number; lon: number };
  total_rainfall_3h_mm: number;
  total_rainfall_6h_mm: number;
  cloudburst_detected: boolean;
  forecast: Array<{
    time_offset_hours: number;
    rain_mm: number;
    condition: string;
  }>;
}

export interface CloudburstCheckResponse {
  status: string;
  coord: { lat: number; lon: number };
  cloudburst_trigger: boolean;
  severity: 'NORMAL' | 'ELEVATED' | 'CRITICAL';
  total_rainfall_3h_mm: number;
  threshold_3h_mm: number;
  advisory: string;
}

export interface BackendRootResponse {
  status: string;
  system: string;
  environment: string;
  api_version: string;
  docs_url: string;
  endpoints: Record<string, string>;
  services: Record<string, string>;
}

