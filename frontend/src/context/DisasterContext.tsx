import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  DistrictData,
  IncidentAlert,
  DataSourceTelemetry,
  AuditLogEntry,
  ActiveTab,
  RiskSeverity,
  GeoJSONFeatureCollection,
  PipelineSummaryResponse,
  SiteEvaluationResponse,
  SusceptibilityRequest,
  SusceptibilityResponse,
  WeatherCurrentResponse,
  CloudburstCheckResponse,
  NationalStats,
} from '../types';
import { DEFAULT_NATIONAL_STATS, INITIAL_AUDIT_LOGS } from '../data/disasterData';
import { apiService } from '../services/api';

export interface MapLayerState {
  redZones: boolean;
  hazardBuffers: boolean;
  infrastructure: boolean;
  evacuationRoutes: boolean;
  shelters: boolean;
  weatherRadar: boolean;
  populationHeatmap: boolean;
  liveSafeSites: boolean;
  liveResettlementQueue: boolean;
  basemapType: 'dark' | 'satellite' | 'topo' | 'osm';
}

export interface SimulationParams {
  rainfallMultiplier: number; // 0.5 to 2.5x
  damDischargeMultiplier: number; // 0.5 to 3.0x
  soilSaturation: number; // 50 to 100%
  windIntensity: number; // 20 to 180 km/h
}

interface DisasterContextType {
  districts: DistrictData[];
  selectedDistrict: DistrictData | null;
  setSelectedDistrict: (district: DistrictData | null) => void;
  selectDistrictById: (id: string) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  incidentCommandMode: boolean;
  setIncidentCommandMode: (enabled: boolean) => void;
  toggleIncidentCommandMode: () => void;
  activeAlerts: IncidentAlert[];
  acknowledgeAlert: (id: string) => void;
  dismissAlert: (id: string) => void;
  selectedSeverityFilter: RiskSeverity | 'ALL';
  setSelectedSeverityFilter: (filter: RiskSeverity | 'ALL') => void;
  activeMapLayers: MapLayerState;
  toggleMapLayer: (layerKey: keyof Omit<MapLayerState, 'basemapType'>) => void;
  setBasemapType: (type: 'dark' | 'satellite' | 'topo' | 'osm') => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  language: 'EN' | 'HI';
  setLanguage: (lang: 'EN' | 'HI') => void;
  fontSizeScale: 'sm' | 'base' | 'lg';
  setFontSizeScale: (scale: 'sm' | 'base' | 'lg') => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  simulationParams: SimulationParams;
  updateSimulationParams: (params: Partial<SimulationParams>) => void;
  resetSimulationParams: () => void;
  approveAiRecommendation: (recId: string, officerName: string, designation: string) => void;
  auditLogs: AuditLogEntry[];
  addAuditLog: (entry: { officerName: string; designation: string; actionType: AuditLogEntry['actionType']; targetDistrict: string; details: string }) => void;
  dataSources: DataSourceTelemetry[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  nationalStats: NationalStats;
  refreshData: () => Promise<void>;
  isLoadingData: boolean;

  // Backend Integration State & Methods
  backendStatus: 'ONLINE' | 'OFFLINE' | 'CHECKING';
  backendSummary: PipelineSummaryResponse | null;
  liveRedZones: GeoJSONFeatureCollection | null;
  liveSafeSites: GeoJSONFeatureCollection | null;
  liveResettlementQueue: GeoJSONFeatureCollection | null;
  isLiveGISLoading: boolean;
  liveRainfallTrigger: number;
  setLiveRainfallTrigger: (rainfall: number) => void;
  fetchLiveGISLayers: (rainfall_mm?: number) => Promise<void>;
  evaluateCandidateSite: (lat: number, lon: number, radius_km?: number) => Promise<SiteEvaluationResponse>;
  predictAISusceptibility: (params: SusceptibilityRequest) => Promise<SusceptibilityResponse>;
  fetchLiveWeather: (lat: number, lon: number) => Promise<WeatherCurrentResponse | null>;
  fetchCloudburstCheck: (lat: number, lon: number) => Promise<CloudburstCheckResponse | null>;
  checkBackendHealth: () => Promise<boolean>;
}

const VALID_TABS: ActiveTab[] = [
  'landing_page',
  'national_overview',
  'state_intelligence',
  'district_intelligence',
  'incident_command',
  'active_alerts',
  'risk_map',
  'red_zones',
  'carrying_capacity',
  'vulnerability_assessment',
  'relocation_intelligence',
  'scenario_simulation',
  'data_sources',
  'reports_sitrep',
  'audit_logs',
  'settings'
];

// Helper to get initial tab from URL hash or localStorage
const getInitialTab = (): ActiveTab => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.replace('#/', '').replace('#', '') as ActiveTab;
    if (VALID_TABS.includes(hash)) {
      return hash;
    }
    const saved = localStorage.getItem('aapda_active_tab') as ActiveTab;
    if (VALID_TABS.includes(saved)) {
      return saved;
    }
  }
  return 'landing_page';
};

const DisasterContext = createContext<DisasterContextType | undefined>(undefined);

export const DisasterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [districts, setDistricts] = useState<DistrictData[]>([]);
  const [selectedDistrict, setSelectedDistrictState] = useState<DistrictData | null>(null);
  const [activeTab, setActiveTabState] = useState<ActiveTab>(getInitialTab);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [incidentCommandMode, setIncidentCommandMode] = useState<boolean>(false);
  const [activeAlerts, setActiveAlerts] = useState<IncidentAlert[]>([]);
  const [selectedSeverityFilter, setSelectedSeverityFilter] = useState<RiskSeverity | 'ALL'>('ALL');
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [dataSources, setDataSources] = useState<DataSourceTelemetry[]>([]);
  const [nationalStats, setNationalStats] = useState<NationalStats>(DEFAULT_NATIONAL_STATS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');
  const [fontSizeScale, setFontSizeScale] = useState<'sm' | 'base' | 'lg'>('base');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  // Backend Integration State
  const [backendStatus, setBackendStatus] = useState<'ONLINE' | 'OFFLINE' | 'CHECKING'>('CHECKING');
  const [backendSummary, setBackendSummary] = useState<PipelineSummaryResponse | null>(null);
  const [liveRedZones, setLiveRedZones] = useState<GeoJSONFeatureCollection | null>(null);
  const [liveSafeSites, setLiveSafeSites] = useState<GeoJSONFeatureCollection | null>(null);
  const [liveResettlementQueue, setLiveResettlementQueue] = useState<GeoJSONFeatureCollection | null>(null);
  const [isLiveGISLoading, setIsLiveGISLoading] = useState<boolean>(false);
  const [liveRainfallTrigger, setLiveRainfallTrigger] = useState<number>(0);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  // Close mobile sidebar on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  // Lock body scroll on mobile when sidebar is open
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sidebarOpen && window.innerWidth < 1024) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const [activeMapLayers, setActiveMapLayers] = useState<MapLayerState>({
    redZones: true,
    hazardBuffers: true,
    infrastructure: true,
    evacuationRoutes: true,
    shelters: true,
    weatherRadar: true,
    populationHeatmap: false,
    liveSafeSites: true,
    liveResettlementQueue: true,
    basemapType: 'dark'
  });

  const defaultSimulation: SimulationParams = {
    rainfallMultiplier: 1.0,
    damDischargeMultiplier: 1.0,
    soilSaturation: 85,
    windIntensity: 45
  };
  const [simulationParams, setSimulationParams] = useState<SimulationParams>(defaultSimulation);

  // Set active tab with localStorage and hash synchronization (auto-closes mobile sidebar)
  const setActiveTab = (tab: ActiveTab) => {
    setActiveTabState(tab);
    setSidebarOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aapda_active_tab', tab);
      window.location.hash = `#/${tab}`;
    }
  };

  // Set selected district with localStorage persistence
  const setSelectedDistrict = (district: DistrictData | null) => {
    setSelectedDistrictState(district);
    if (typeof window !== 'undefined' && district) {
      localStorage.setItem('aapda_selected_district_id', district.id);
    }
  };

  const selectDistrictById = (id: string) => {
    const found = districts.find(d => d.id === id);
    if (found) {
      setSelectedDistrict(found);
    }
  };

  // Listen to browser hash changes (back/forward navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '') as ActiveTab;
      if (VALID_TABS.includes(hash) && hash !== activeTab) {
        setActiveTabState(hash);
        localStorage.setItem('aapda_active_tab', hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeTab]);

  // Synchronize initial hash if not set
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.location.hash = `#/${activeTab}`;
    }
  }, [activeTab]);

  // =========================================================================
  // BACKEND API INTEGRATION HANDLERS
  // =========================================================================

  const checkBackendHealth = useCallback(async (): Promise<boolean> => {
    try {
      const health = await apiService.checkHealth();
      if (health.status === 'healthy') {
        setBackendStatus('ONLINE');
        return true;
      }
      setBackendStatus('OFFLINE');
      return false;
    } catch {
      setBackendStatus('OFFLINE');
      return false;
    }
  }, []);

  const fetchLiveGISLayers = useCallback(async (rainfall_mm?: number) => {
    setIsLiveGISLoading(true);
    try {
      const [redZones, safeSites, queue, summary] = await Promise.allSettled([
        apiService.getDynamicRedZones({ rainfall_mm: rainfall_mm !== undefined ? rainfall_mm : (liveRainfallTrigger || undefined) }),
        apiService.getSafeRelocationSites(),
        apiService.getResettlementQueue(),
        apiService.getPipelineSummary()
      ]);

      if (redZones.status === 'fulfilled') {
        setLiveRedZones(redZones.value);
      }
      if (safeSites.status === 'fulfilled') {
        setLiveSafeSites(safeSites.value);
      }
      if (queue.status === 'fulfilled') {
        setLiveResettlementQueue(queue.value);
      }
      if (summary.status === 'fulfilled') {
        setBackendSummary(summary.value);
      }
      setBackendStatus('ONLINE');
    } catch {
      // Log failure
    } finally {
      setIsLiveGISLoading(false);
    }
  }, [liveRainfallTrigger]);

  const refreshData = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const [districtsRes, alertsRes, dataSourcesRes, statsRes, summaryRes, redZonesRes, safeSitesRes, queueRes] = await Promise.allSettled([
        apiService.getDistricts(),
        apiService.getActiveAlerts(),
        apiService.getDataSources(),
        apiService.getNationalStats(),
        apiService.getPipelineSummary(),
        apiService.getDynamicRedZones(),
        apiService.getSafeRelocationSites(),
        apiService.getResettlementQueue()
      ]);

      if (districtsRes.status === 'fulfilled' && districtsRes.value.length > 0) {
        const loadedDistricts = districtsRes.value;
        setDistricts(loadedDistricts);

        // Restore selected district if available
        setSelectedDistrictState(prev => {
          if (prev) {
            const match = loadedDistricts.find(d => d.id === prev.id);
            if (match) return match;
          }
          const savedId = typeof window !== 'undefined' ? localStorage.getItem('aapda_selected_district_id') : null;
          if (savedId) {
            const savedMatch = loadedDistricts.find(d => d.id === savedId);
            if (savedMatch) return savedMatch;
          }
          return loadedDistricts[0];
        });
      }

      if (alertsRes.status === 'fulfilled') {
        setActiveAlerts(alertsRes.value);
      }

      if (dataSourcesRes.status === 'fulfilled') {
        setDataSources(dataSourcesRes.value);
      }

      if (statsRes.status === 'fulfilled') {
        setNationalStats(statsRes.value);
      }

      if (summaryRes.status === 'fulfilled') {
        setBackendSummary(summaryRes.value);
      }

      if (redZonesRes.status === 'fulfilled') {
        setLiveRedZones(redZonesRes.value);
      }

      if (safeSitesRes.status === 'fulfilled') {
        setLiveSafeSites(safeSitesRes.value);
      }

      if (queueRes.status === 'fulfilled') {
        setLiveResettlementQueue(queueRes.value);
      }

      setBackendStatus('ONLINE');
    } catch {
      setBackendStatus('OFFLINE');
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  // Initial Backend Data Loading
  useEffect(() => {
    let isMounted = true;
    const initializeData = async () => {
      try {
        await refreshData();
      } catch {
        if (isMounted) setBackendStatus('OFFLINE');
      }
    };
    initializeData();
    return () => {
      isMounted = false;
    };
  }, [refreshData]);

  // Candidate Site Evaluation via Backend
  const evaluateCandidateSite = async (lat: number, lon: number, radius_km: number = 5.0): Promise<SiteEvaluationResponse> => {
    try {
      const response = await apiService.evaluateSite({ lat, lon, radius_km });
      addAuditLog({
        officerName: 'SDMA Automated Engine',
        designation: 'MCDA Carrying Capacity Evaluator',
        actionType: 'SIMULATION_EXECUTED',
        targetDistrict: `Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`,
        details: `Site evaluation completed. CCI Score: ${response.score.toFixed(1)}/100, Verdict: ${response.recommendation}`
      });
      return response;
    } catch (err: any) {
      throw err;
    }
  };

  // AI Hazard Susceptibility Prediction via Backend
  const predictAISusceptibility = async (params: SusceptibilityRequest): Promise<SusceptibilityResponse> => {
    return await apiService.predictSusceptibility(params);
  };

  // Live Weather Fetch via Backend
  const fetchLiveWeather = async (lat: number, lon: number): Promise<WeatherCurrentResponse | null> => {
    try {
      return await apiService.getCurrentWeather(lat, lon);
    } catch {
      return null;
    }
  };

  // Live Cloudburst Check via Backend
  const fetchCloudburstCheck = async (lat: number, lon: number): Promise<CloudburstCheckResponse | null> => {
    try {
      return await apiService.checkCloudburstTrigger(lat, lon);
    } catch {
      return null;
    }
  };

  const toggleIncidentCommandMode = () => {
    setIncidentCommandMode(prev => {
      const next = !prev;
      if (next) {
        addAuditLog({
          officerName: 'National EOC Commander',
          designation: 'NDMA EOC Incident Commander',
          actionType: 'ORDER_ISSUED',
          targetDistrict: selectedDistrict?.name || 'National Grid',
          details: 'Escalated system to INCIDENT COMMAND MODE (EOC Red Protocol active).'
        });
      }
      return next;
    });
  };

  const acknowledgeAlert = (id: string) => {
    setActiveAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
  };

  const dismissAlert = (id: string) => {
    setActiveAlerts(prev => prev.filter(a => a.id !== id));
  };

  const toggleMapLayer = (layerKey: keyof Omit<MapLayerState, 'basemapType'>) => {
    setActiveMapLayers(prev => ({
      ...prev,
      [layerKey]: !prev[layerKey]
    }));
  };

  const setBasemapType = (type: 'dark' | 'satellite' | 'topo' | 'osm') => {
    setActiveMapLayers(prev => ({ ...prev, basemapType: type }));
  };

  const updateSimulationParams = (params: Partial<SimulationParams>) => {
    setSimulationParams(prev => {
      const next = { ...prev, ...params };
      // Sync dynamic rainfall trigger to live GIS buffer calculation
      if (params.rainfallMultiplier !== undefined && selectedDistrict) {
        const simulatedMm = selectedDistrict.weatherTelemetry.rainfall24hMm * params.rainfallMultiplier;
        setLiveRainfallTrigger(simulatedMm);
        fetchLiveGISLayers(simulatedMm);
      }
      return next;
    });
  };

  const resetSimulationParams = () => {
    setSimulationParams(defaultSimulation);
    setLiveRainfallTrigger(0);
    fetchLiveGISLayers(0);
  };

  const addAuditLog = (entry: { officerName: string; designation: string; actionType: AuditLogEntry['actionType']; targetDistrict: string; details: string }) => {
    const newEntry: AuditLogEntry = {
      id: `AUDIT-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST',
      officerName: entry.officerName,
      designation: entry.designation,
      actionType: entry.actionType,
      targetDistrict: entry.targetDistrict,
      details: entry.details,
      authorizationHash: 'SHA256:' + Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10)
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  const approveAiRecommendation = (recId: string, officerName: string, designation: string) => {
    setDistricts(prev => prev.map(d => {
      if (d.aiRecommendation.id === recId) {
        const updatedRec = {
          ...d.aiRecommendation,
          approved: true,
          approvedBy: `${officerName} (${designation})`,
          approvalTimestamp: new Date().toLocaleTimeString('en-IN') + ' IST',
          orderNumber: `DM/RELOC/2026/${Math.floor(1000 + Math.random() * 9000)}`
        };
        return {
          ...d,
          aiRecommendation: updatedRec
        };
      }
      return d;
    }));

    if (selectedDistrict && selectedDistrict.aiRecommendation.id === recId) {
      const updatedDistrict: DistrictData = {
        ...selectedDistrict,
        aiRecommendation: {
          ...selectedDistrict.aiRecommendation,
          approved: true,
          approvedBy: `${officerName} (${designation})`,
          approvalTimestamp: new Date().toLocaleTimeString('en-IN') + ' IST',
          orderNumber: `DM/RELOC/2026/${Math.floor(1000 + Math.random() * 9000)}`
        }
      };
      setSelectedDistrict(updatedDistrict);
    }

    addAuditLog({
      officerName,
      designation,
      actionType: 'RELOCATION_APPROVED',
      targetDistrict: selectedDistrict?.name || 'Assigned District',
      details: `Statutory order approved for proactive relocation: ${selectedDistrict?.aiRecommendation.actionTitle}`
    });
  };

  // Synchronize HTML classes for typography & high contrast
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-scale-sm', 'font-scale-base', 'font-scale-lg');
    root.classList.add(`font-scale-${fontSizeScale}`);

    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [fontSizeScale, highContrast]);

  return (
    <DisasterContext.Provider
      value={{
        districts,
        selectedDistrict,
        setSelectedDistrict,
        selectDistrictById,
        activeTab,
        setActiveTab,
        incidentCommandMode,
        setIncidentCommandMode,
        toggleIncidentCommandMode,
        activeAlerts,
        acknowledgeAlert,
        dismissAlert,
        selectedSeverityFilter,
        setSelectedSeverityFilter,
        activeMapLayers,
        toggleMapLayer,
        setBasemapType,
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        language,
        setLanguage,
        fontSizeScale,
        setFontSizeScale,
        highContrast,
        setHighContrast,
        simulationParams,
        updateSimulationParams,
        resetSimulationParams,
        approveAiRecommendation,
        auditLogs,
        addAuditLog,
        dataSources,
        searchQuery,
        setSearchQuery,
        nationalStats,
        refreshData,
        isLoadingData,

        // Backend state & methods
        backendStatus,
        backendSummary,
        liveRedZones,
        liveSafeSites,
        liveResettlementQueue,
        isLiveGISLoading,
        liveRainfallTrigger,
        setLiveRainfallTrigger,
        fetchLiveGISLayers,
        evaluateCandidateSite,
        predictAISusceptibility,
        fetchLiveWeather,
        fetchCloudburstCheck,
        checkBackendHealth,
      }}
    >
      {children}
    </DisasterContext.Provider>
  );
};

export const useDisaster = () => {
  const context = useContext(DisasterContext);
  if (!context) {
    throw new Error('useDisaster must be used within a DisasterProvider');
  }
  return context;
};
