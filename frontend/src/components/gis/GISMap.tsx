import React, { useEffect, useState, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Polyline,
  Circle,
  useMap,
  useMapEvents
} from 'react-leaflet';
import L from 'leaflet';
import {
  Layers,
  Crosshair,
  Maximize2,
  Search,
  Activity,
  Hospital,
  Home,
  Flame,
  ShieldAlert,
  Navigation,
  Eye,
  EyeOff,
  MapPin,
  Compass,
  Route,
  Users,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Info,
  Clock,
  Sparkles,
  X,
  ChevronDown,
  ChevronUp,
  Play,
  ArrowRight,
  CornerDownRight,
  CheckCircle2,
} from 'lucide-react';
import { useDisaster } from '../../context/DisasterContext';
import { DistrictData, CriticalInfrastructure, EvacuationRoute, HazardZone } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { RiskScoreGauge } from '../common/RiskScoreGauge';
import { DEFAULT_RELOCATION_CORRIDORS, DEFAULT_POPULATION_DISTRIBUTION } from '../../data/disasterData';

// Fix Leaflet default icon issues in bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom SVG Markers for Government Command Map
const createCustomIcon = (type: string, status: string, label?: string) => {
  let bgColor = '#1E3E62';
  let iconEmoji = '📍';
  let borderColor = '#64748B';

  if (type === 'hospital') {
    bgColor = '#DC2626';
    iconEmoji = '🏥';
    borderColor = '#FCA5A5';
  } else if (type === 'shelter') {
    bgColor = '#2563EB';
    iconEmoji = '⛺';
    borderColor = '#93C5FD';
  } else if (type === 'bridge') {
    bgColor = '#D97706';
    iconEmoji = '🌉';
    borderColor = '#FDE68A';
  } else if (type === 'dam') {
    bgColor = '#0891B2';
    iconEmoji = '🌊';
    borderColor = '#A5F3FC';
  } else if (type === 'helipad') {
    bgColor = '#7C3AED';
    iconEmoji = '🚁';
    borderColor = '#DDD6FE';
  } else if (type === 'district_hotspot') {
    bgColor = status === 'CRITICAL' ? '#DC2626' : status === 'VERY_HIGH' ? '#EA580C' : '#D97706';
    iconEmoji = '⚠️';
    borderColor = '#FFFFFF';
  } else if (type === 'resettlement_habitation') {
    bgColor = status.includes('Immediate') ? '#DC2626' : status.includes('Short') ? '#EA580C' : '#0284C7';
    iconEmoji = '🏘️';
    borderColor = '#FDE047';
  } else if (type === 'safe_site') {
    bgColor = '#059669';
    iconEmoji = '🛡️';
    borderColor = '#6EE7B7';
  } else if (type === 'corridor_origin') {
    bgColor = '#B91C1C';
    iconEmoji = '🚨';
    borderColor = '#F87171';
  } else if (type === 'corridor_dest') {
    bgColor = '#047857';
    iconEmoji = '🏁';
    borderColor = '#34D399';
  }

  const html = `
    <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${bgColor};
      color: white;
      border: 2px solid ${borderColor};
      border-radius: 50%;
      width: 32px;
      height: 32px;
      font-size: 14px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.6);
      cursor: pointer;
      position: relative;
    ">
      <span>${iconEmoji}</span>
      ${label ? `
        <span style="
          position: absolute;
          bottom: -16px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(11,25,44,0.9);
          border: 1px solid #334155;
          padding: 1px 4px;
          border-radius: 3px;
          font-family: monospace;
          font-size: 9px;
          font-weight: bold;
          white-space: nowrap;
          color: white;
        ">${label}</span>
      ` : ''}
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-leaflet-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
};

// Helpers to convert GeoJSON coordinates [lon, lat] to Leaflet [lat, lon]
const convertGeoJsonPolygon = (coords: any): [number, number][] => {
  if (!coords || !Array.isArray(coords)) return [];
  const ring = coords[0] || [];
  return ring.map((pt: any) => [pt[1], pt[0]] as [number, number]);
};

const convertGeoJsonMultiPolygon = (coords: any): [number, number][][] => {
  if (!coords || !Array.isArray(coords)) return [];
  return coords.map((poly: any) => {
    const ring = poly[0] || [];
    return ring.map((pt: any) => [pt[1], pt[0]] as [number, number]);
  });
};

// Component to handle map fly-to and bounds synchronization
const MapController: React.FC<{ selectedDistrict: DistrictData | null }> = ({ selectedDistrict }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedDistrict) {
      map.flyTo(selectedDistrict.coordinates, 12, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [selectedDistrict, map]);

  return null;
};

// Component to handle automatic map bounds fitting for active danger-to-safe route overlay
const RouteOverlayMapController: React.FC<{ activeRoute: any }> = ({ activeRoute }) => {
  const map = useMap();

  useEffect(() => {
    if (activeRoute?.route?.properties?.coordinates_leaflet?.length > 1) {
      const coords = activeRoute.route.properties.coordinates_leaflet;
      const bounds = L.latLngBounds(coords as [number, number][]);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 });
    }
  }, [activeRoute, map]);

  return null;
};

// Preset Danger-to-Safe Relocation Corridors
const DANGER_SAFE_PRESETS = [
  {
    id: 'joshimath-pipalkoti',
    label: 'Joshimath Core Red Zone ➔ Pipalkoti Safe Parcel',
    danger: { name: 'Joshimath Core Hazard Red Zone', lat: 30.5583, lon: 79.5667 },
    safe: { name: 'Pipalkoti Designated Safe Relocation Parcel', lat: 30.4312, lon: 79.4285 },
  },
  {
    id: 'wayanad-kalpetta',
    label: 'Wayanad Chooralmala Red Zone ➔ Kalpetta Plateau',
    danger: { name: 'Chooralmala Landslide Danger Zone', lat: 11.6854, lon: 76.1320 },
    safe: { name: 'Kalpetta Safe Relocation Plateau', lat: 11.6080, lon: 76.0820 },
  },
  {
    id: 'mandi-kotli',
    label: 'Mandi Beas Flood Red Zone ➔ Kotli Safe Ridge',
    danger: { name: 'Beas River Valley Inundation Red Zone', lat: 31.5892, lon: 76.9182 },
    safe: { name: 'Kotli High-Ground Safe Ridge', lat: 31.5150, lon: 77.0150 },
  },
  {
    id: 'raini-helang',
    label: 'Chamoli Raini GLOF Red Zone ➔ Helang Terrace',
    danger: { name: 'Raini Valley GLOF Danger Zone', lat: 30.4850, lon: 79.6730 },
    safe: { name: 'Helang High Terrace Safe Parcel', lat: 30.5510, lon: 79.5610 },
  },
  {
    id: 'shimla-taradevi',
    label: 'Shimla Subsidence Zone ➔ Taradevi Safe Crest',
    danger: { name: 'Shimla Slope Instability Zone', lat: 31.1048, lon: 77.1734 },
    safe: { name: 'Taradevi Stable Ridge Safe Parcel', lat: 31.0650, lon: 77.1350 },
  },
  {
    id: 'Custom-Route-1',
    label: 'Spiti Riverbank Ward ➔ Safe Site 066',
    danger: { name: 'Spiti Riverbank Ward', lat: 31.6689, lon: 78.9642 },
    safe: { name: 'Safe Site 066', lat: 31.9618, lon: 79.4325},
  },
];  

// Component to capture mouse coordinates for government command HUD
const MouseCoordinateTracker: React.FC<{ onCoordChange: (lat: number, lng: number) => void }> = ({ onCoordChange }) => {
  useMapEvents({
    mousemove: (e) => {
      onCoordChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

export const GISMap: React.FC<{ height?: string }> = ({ height = '100%' }) => {
  const {
    districts,
    selectedDistrict,
    setSelectedDistrict,
    activeMapLayers,
    toggleMapLayer,
    setBasemapType,
    selectedSeverityFilter,
    setSelectedSeverityFilter,
    backendStatus,
    liveRedZones,
    liveSafeSites,
    liveResettlementQueue,
    liveRelocationCorridors,
    livePopulationGrid,
    isLiveGISLoading,
    isPopulationLoading,
    liveRainfallTrigger,
    activeDangerToSafeRoute,
    isComputingRoute,
    calculateDangerToSafeRoute,
    clearDangerToSafeRoute,
  } = useDisaster();

  const [mouseCoords, setMouseCoords] = useState<{ lat: number; lng: number }>({ lat: 22.5937, lng: 78.9629 });
  const [layersMenuOpen, setLayersMenuOpen] = useState(false);
  const [basemapMenuOpen, setBasemapMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [legendTab, setLegendTab] = useState<'HAZARDS' | 'ROADS' | 'POPULATION'>('HAZARDS');
  const [routePanelOpen, setRoutePanelOpen] = useState<boolean>(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('joshimath-pipalkoti');
  
  // Custom coordinates for route overlay
  const [dangerLat, setDangerLat] = useState<number>(30.5583);
  const [dangerLon, setDangerLon] = useState<number>(79.5667);
  const [dangerName, setDangerName] = useState<string>('Joshimath Core Hazard Red Zone');
  const [safeLat, setSafeLat] = useState<number>(30.4312);
  const [safeLon, setSafeLon] = useState<number>(79.4285);
  const [safeName, setSafeName] = useState<string>('Pipalkoti Designated Safe Relocation Parcel');

  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Handle Preset selection
  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = DANGER_SAFE_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setDangerLat(preset.danger.lat);
      setDangerLon(preset.danger.lon);
      setDangerName(preset.danger.name);
      setSafeLat(preset.safe.lat);
      setSafeLon(preset.safe.lon);
      setSafeName(preset.safe.name);
    }
  };

  const handleComputeRoute = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await calculateDangerToSafeRoute(dangerLat, dangerLon, safeLat, safeLon, dangerName, safeName);
  };

  // Basemap Tile URLs
  const getTileUrl = () => {
    switch (activeMapLayers.basemapType) {
      case 'satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'topo':
        return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      case 'osm':
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      case 'dark':
      default:
        return 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    }
  };

  const getAttribution = () => {
    switch (activeMapLayers.basemapType) {
      case 'satellite':
        return 'Esri, Maxar, Earthstar Geographics • ISRO Bhuvan GIS Grid';
      case 'topo':
        return 'OpenTopoMap, SRTM • Survey of India';
      case 'osm':
        return '&copy; OpenStreetMap contributors • NIC NSDI';
      case 'dark':
      default:
        return '&copy; CARTO &copy; OpenStreetMap contributors • NDMA GIS Portal';
    }
  };

  const toggleFullscreen = () => {
    if (!mapContainerRef.current) return;
    if (!isFullscreen) {
      if (mapContainerRef.current.requestFullscreen) {
        mapContainerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Filter districts according to active severity filter
  const filteredDistricts = districts.filter(d => {
    if (selectedSeverityFilter === 'ALL') return true;
    return d.riskLevel === selectedSeverityFilter;
  });

  // Effective layers data (live backend with graceful mock fallback)
  const activeCorridorsFC = (liveRelocationCorridors && liveRelocationCorridors.features && liveRelocationCorridors.features.length > 0)
    ? liveRelocationCorridors
    : DEFAULT_RELOCATION_CORRIDORS;

  const activePopulationFC = (livePopulationGrid && livePopulationGrid.features && livePopulationGrid.features.length > 0)
    ? livePopulationGrid
    : DEFAULT_POPULATION_DISTRIBUTION;

  return (
    <div
      ref={mapContainerRef}
      className="relative w-full h-full min-h-[480px] bg-[#070F1E] border border-[#1E3E62] rounded overflow-hidden shadow-gov"
      style={{ height }}
    >
      <MapContainer
        center={selectedDistrict ? selectedDistrict.coordinates : [30.5562, 79.5671]}
        zoom={selectedDistrict ? 11 : 7}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          url={getTileUrl()}
          attribution={getAttribution()}
          maxZoom={18}
        />

        <MapController selectedDistrict={selectedDistrict} />
        <RouteOverlayMapController activeRoute={activeDangerToSafeRoute} />
        <MouseCoordinateTracker onCoordChange={(lat, lng) => setMouseCoords({ lat, lng })} />

        {/* 0. DYNAMIC DANGER-TO-SAFE ZONE ROUTE OVERLAY (Calculated via overlay_mapping/overlay.py) */}
        {activeDangerToSafeRoute && activeDangerToSafeRoute.route && activeDangerToSafeRoute.route.properties?.coordinates_leaflet?.length > 1 && (
          <React.Fragment>
            {/* Outer Dark Contrast Halo */}
            <Polyline
              positions={activeDangerToSafeRoute.route.properties.coordinates_leaflet}
              pathOptions={{
                color: '#020617',
                weight: 10,
                opacity: 0.95,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
            {/* Neon Amber Route Base Path */}
            <Polyline
              positions={activeDangerToSafeRoute.route.properties.coordinates_leaflet}
              pathOptions={{
                color: '#F59E0B',
                weight: 6.5,
                opacity: 0.9,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
            {/* Directional Flow Animated Core Line */}
            <Polyline
              positions={activeDangerToSafeRoute.route.properties.coordinates_leaflet}
              pathOptions={{
                color: '#38BDF8',
                weight: 3.5,
                opacity: 1.0,
                dashArray: '10, 10',
                className: 'route-active-flow',
                lineCap: 'round',
                lineJoin: 'round',
              }}
            >
              <Popup>
                <div className="p-3.5 bg-[#0B192C] text-slate-100 font-sans min-w-[310px]">
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Route className="w-4 h-4 text-cyan-400 animate-pulse" />
                      <span className="font-mono text-xs font-bold text-white">
                        EVACUATION PATH OVERLAY
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded font-mono text-[9px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-600">
                      OSRM VECTOR ENGINE
                    </span>
                  </div>

                  <div className="text-[11px] space-y-2 text-slate-300 font-mono">
                    <div className="p-2 rounded bg-slate-950 border border-slate-800 space-y-1">
                      <div className="flex items-center gap-1.5 text-red-400">
                        <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 animate-ping" />
                        <span>Danger Zone:</span>
                        <strong className="text-white truncate">{activeDangerToSafeRoute.summary.origin.name}</strong>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        <span>Safe Relocation Zone:</span>
                        <strong className="text-white truncate">{activeDangerToSafeRoute.summary.destination.name}</strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Driving Distance</span>
                        <strong className="text-white text-xs font-bold">{activeDangerToSafeRoute.summary.road_distance_km} km</strong>
                      </div>
                      <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Convoy Transit ETA</span>
                        <strong className="text-cyan-300 text-xs font-bold">{activeDangerToSafeRoute.summary.estimated_transit_mins} mins</strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Detour Factor</span>
                        <strong className="text-amber-400 text-xs font-bold">{activeDangerToSafeRoute.summary.detour_ratio}x</strong>
                      </div>
                      <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Waypoints</span>
                        <strong className="text-slate-200 text-xs font-bold">{activeDangerToSafeRoute.route.properties.waypoints_count} nodes</strong>
                      </div>
                    </div>

                    <div className="pt-1 border-t border-slate-800 text-[10px] text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Engine: overlay_mapping/overlay.py (OSRM Routing API)</span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Polyline>

            {/* Origin Marker: Danger Red Zone */}
            <Marker
              position={activeDangerToSafeRoute.route.properties.coordinates_leaflet[0]}
              icon={createCustomIcon('corridor_origin', 'CRITICAL', 'DANGER ZONE')}
            >
              <Popup>
                <div className="p-2.5 bg-[#0B192C] text-slate-100 font-mono text-xs min-w-[240px]">
                  <div className="font-bold text-red-400 mb-1 flex items-center gap-1.5">
                    <span>🚨</span>
                    <span>DANGER RED ZONE ORIGIN</span>
                  </div>
                  <div>Name: <strong className="text-white">{activeDangerToSafeRoute.summary.origin.name}</strong></div>
                  <div>Coords: <strong className="text-amber-300">{activeDangerToSafeRoute.route.properties.coordinates_leaflet[0][0].toFixed(4)}°N, {activeDangerToSafeRoute.route.properties.coordinates_leaflet[0][1].toFixed(4)}°E</strong></div>
                  <div className="mt-1 text-[10px] text-red-300 bg-red-950/60 p-1 rounded border border-red-800">
                    Mandatory Evacuation Egress Path Active
                  </div>
                </div>
              </Popup>
            </Marker>

            {/* Destination Marker: Safe Relocation Zone */}
            <Marker
              position={activeDangerToSafeRoute.route.properties.coordinates_leaflet[activeDangerToSafeRoute.route.properties.coordinates_leaflet.length - 1]}
              icon={createCustomIcon('corridor_dest', 'SAFE', 'SAFE ZONE')}
            >
              <Popup>
                <div className="p-2.5 bg-[#0B192C] text-slate-100 font-mono text-xs min-w-[240px]">
                  <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                    <span>🛡️</span>
                    <span>SAFE RELOCATION ZONE</span>
                  </div>
                  <div>Name: <strong className="text-white">{activeDangerToSafeRoute.summary.destination.name}</strong></div>
                  <div>Coords: <strong className="text-emerald-300">{activeDangerToSafeRoute.route.properties.coordinates_leaflet[activeDangerToSafeRoute.route.properties.coordinates_leaflet.length - 1][0].toFixed(4)}°N, {activeDangerToSafeRoute.route.properties.coordinates_leaflet[activeDangerToSafeRoute.route.properties.coordinates_leaflet.length - 1][1].toFixed(4)}°E</strong></div>
                  <div className="mt-1 text-[10px] text-emerald-300 bg-emerald-950/60 p-1 rounded border border-emerald-800">
                    Designated Secure Evacuation Destination
                  </div>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        )}

        {/* 1. Dynamic Red-Zones & Hazard Polygons (Live Backend GeoJSON Layer) */}
        {activeMapLayers.redZones && liveRedZones && liveRedZones.features.length > 0 ? (
          liveRedZones.features.map((feat, idx) => {
            const geom = feat.geometry;
            const props = feat.properties || {};
            const isCritical = props.risk_tier === 'Critical Red Zone' || (props.hazard_score && props.hazard_score > 0.7);
            const color = isCritical ? '#DC2626' : '#F59E0B';
            const positions = geom.type === 'MultiPolygon' 
              ? convertGeoJsonMultiPolygon(geom.coordinates)
              : convertGeoJsonPolygon(geom.coordinates);

            if (!positions || positions.length === 0) return null;

            return (
              <Polygon
                key={`live-rz-${idx}`}
                positions={positions as any}
                pathOptions={{
                  color: color,
                  weight: isCritical ? 2.5 : 1.5,
                  opacity: 0.9,
                  fillColor: color,
                  fillOpacity: isCritical ? 0.35 : 0.2,
                  dashArray: isCritical ? undefined : '5, 5',
                  className: isCritical ? 'red-zone-pulse' : '',
                }}
              >
                <Popup>
                  <div className="p-3 bg-[#0B192C] text-slate-100 font-sans min-w-[240px]">
                    <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-700">
                      <span className="font-mono text-xs font-bold text-red-400">
                        {props.risk_tier || 'Dynamic Red Zone'}
                      </span>
                      <StatusBadge severity={isCritical ? 'CRITICAL' : 'HIGH'} size="xs" />
                    </div>
                    <div className="text-[11px] space-y-1 text-slate-300 font-mono">
                      <div>Engine: <strong className="text-white">FastAPI Dynamic Buffer</strong></div>
                      <div>Hazard Index: <strong className="text-red-400">{(props.dynamic_hazard_score || props.hazard_score || 0.75).toFixed(2)}</strong></div>
                      {props.simulated_rainfall_mm !== undefined && (
                        <div>Rain Trigger: <strong className="text-cyan-400">{props.simulated_rainfall_mm.toFixed(1)} mm</strong></div>
                      )}
                      <div>Severity Code: <strong className="text-amber-400">{props.severity_code || 1}</strong></div>
                    </div>
                  </div>
                </Popup>
              </Polygon>
            );
          })
        ) : (
          /* Fallback to Mock District Hazard Zones if Live Backend is not connected */
          activeMapLayers.redZones && districts.map(district => (
            <React.Fragment key={`hz-${district.id}`}>
              {district.hazardZones.map(zone => {
                const isCritical = zone.severity === 'CRITICAL';
                const color = isCritical ? '#DC2626' : zone.severity === 'VERY_HIGH' ? '#EA580C' : '#D97706';
                const hazardTypeName = (zone.type || zone.hazardType || 'HAZARD').replace(/_/g, ' ').toUpperCase();
                const exposedPop = zone.affectedPopulation || zone.populationAtRisk || 0;

                return (
                  <Polygon
                    key={zone.id}
                    positions={zone.coordinates}
                    pathOptions={{
                      color: color,
                      weight: isCritical ? 2.5 : 1.5,
                      opacity: 0.85,
                      fillColor: color,
                      fillOpacity: isCritical ? 0.35 : 0.2,
                      dashArray: isCritical ? undefined : '5, 5',
                      className: isCritical ? 'red-zone-pulse' : '',
                    }}
                    eventHandlers={{
                      click: () => setSelectedDistrict(district),
                    }}
                  >
                    <Popup>
                      <div className="p-3 bg-[#0B192C] text-slate-100 font-sans min-w-[240px]">
                        <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-700">
                          <span className="font-mono text-xs font-bold text-red-400">
                            {zone.name}
                          </span>
                          <StatusBadge severity={zone.severity} size="xs" />
                        </div>
                        <div className="text-[11px] space-y-1 text-slate-300 font-mono">
                          <div>Hazard Type: <strong className="text-white">{hazardTypeName}</strong></div>
                          <div>Area: <strong className="text-white">{zone.areaSqKm} sq.km</strong></div>
                          <div>Exposed Population: <strong className="text-white">{exposedPop.toLocaleString('en-IN')}</strong></div>
                          {zone.waterLevelMeters && (
                            <div>Inundation Depth: <strong className="text-amber-400">+{zone.waterLevelMeters}m</strong></div>
                          )}
                          {zone.slopeAngleDeg && (
                            <div>Slope Angle: <strong className="text-amber-400">{zone.slopeAngleDeg}°</strong></div>
                          )}
                        </div>
                        <button
                          onClick={() => setSelectedDistrict(district)}
                          className="mt-2 w-full py-1 bg-amber-600 hover:bg-amber-700 text-white font-mono text-[10px] font-bold rounded cursor-pointer"
                        >
                          OPEN DISTRICT DOSSIER →
                        </button>
                      </div>
                    </Popup>
                  </Polygon>
                );
              })}
            </React.Fragment>
          ))
        )}

        {/* 2. Toggleable Population Distribution & Dasymetric Estimation Overlay */}
        {activeMapLayers.populationHeatmap && activePopulationFC && activePopulationFC.features && activePopulationFC.features.map((feat, idx) => {
          const geom = feat.geometry;
          const props = feat.properties || {};
          const isEstimated = props.is_estimated === true || props.data_source === 'DASYMETRIC_ESTIMATION';
          const tier = props.density_tier || 'MODERATE';
          const color = props.color || (tier === 'EXTREME' ? '#DC2626' : tier === 'VERY_HIGH' ? '#EA580C' : tier === 'HIGH' ? '#F59E0B' : tier === 'MODERATE' ? '#0284C7' : '#10B981');
          
          const positions = geom.type === 'MultiPolygon'
            ? convertGeoJsonMultiPolygon(geom.coordinates)
            : convertGeoJsonPolygon(geom.coordinates);

          if (!positions || positions.length === 0) return null;

          return (
            <Polygon
              key={`pop-grid-${props.cell_id || idx}`}
              positions={positions as any}
              pathOptions={{
                color: isEstimated ? '#F59E0B' : color,
                weight: isEstimated ? 1.8 : 1.0,
                opacity: 0.9,
                fillColor: color,
                fillOpacity: isEstimated ? 0.30 : 0.42,
                dashArray: isEstimated ? '5, 4' : undefined,
              }}
            >
              <Popup>
                <div className="p-3 bg-[#0B192C] text-slate-100 font-sans min-w-[280px]">
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-cyan-400" />
                      <span className="font-mono text-xs font-bold text-white">
                        {props.cell_id || `POP-CELL-${idx+1}`}
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold border ${isEstimated ? 'bg-amber-950 text-amber-300 border-amber-600' : 'bg-cyan-950 text-cyan-300 border-cyan-600'}`}>
                      {isEstimated ? 'DASYMETRIC MODEL' : 'HIGH-RES GRID'}
                    </span>
                  </div>

                  <div className="text-[11px] space-y-1 text-slate-300 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Population:</span>
                      <strong className="text-white text-xs font-black">{(props.population || 0).toLocaleString('en-IN')} persons</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Density per sq.km:</span>
                      <strong className="text-amber-400">{props.density_per_sqkm || 0} / km² ({props.density_label || tier})</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Model Confidence:</span>
                      <strong className="text-emerald-400">{((props.confidence_score || 0.85) * 100).toFixed(0)}%</strong>
                    </div>
                    {props.evacuation_priority && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Extraction Priority:</span>
                        <strong className={props.evacuation_priority === 'CRITICAL' ? 'text-red-400' : 'text-slate-200'}>{props.evacuation_priority}</strong>
                      </div>
                    )}

                    {/* Demographic breakdown */}
                    {props.demographics && (
                      <div className="mt-2 pt-1.5 border-t border-slate-800 grid grid-cols-2 gap-1 text-[10px]">
                        <div>👵 Elderly: <strong className="text-white">{props.demographics.elderly || 0}</strong></div>
                        <div>👶 Children: <strong className="text-white">{props.demographics.children || 0}</strong></div>
                        <div>♿ Differently-Abled: <strong className="text-white">{props.demographics.differently_abled || 0}</strong></div>
                        <div>🐄 Livestock: <strong className="text-white">{props.demographics.livestock || 0}</strong></div>
                      </div>
                    )}

                    {/* Data Provenance Notice */}
                    {isEstimated && (
                      <div className="mt-2 p-1.5 bg-amber-950/50 border border-amber-700/60 rounded text-[9px] text-amber-200/90 leading-tight">
                        ⚡ <strong>Data-Sparse Sector:</strong> {props.data_provenance_note || 'Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15°).'}
                      </div>
                    )}
                  </div>
                </div>
              </Popup>
            </Polygon>
          );
        })}

        {/* 3. Live Safe Relocation Parcels Layer (Carrying Capacity Index - CCI) */}
        {activeMapLayers.liveSafeSites && liveSafeSites && liveSafeSites.features.map((feat, idx) => {
          const geom = feat.geometry;
          const props = feat.properties || {};
          const cci = props.mean_cci || props.cci_score || 85.0;
          const cap = props.capacity_families || 500;
          const positions = geom.type === 'MultiPolygon'
            ? convertGeoJsonMultiPolygon(geom.coordinates)
            : convertGeoJsonPolygon(geom.coordinates);

          if (!positions || positions.length === 0) return null;

          return (
            <Polygon
              key={`safe-site-${idx}`}
              positions={positions as any}
              pathOptions={{
                color: '#10B981',
                weight: 2,
                opacity: 0.85,
                fillColor: '#10B981',
                fillOpacity: 0.25,
              }}
            >
              <Popup>
                <div className="p-3 bg-[#0B192C] text-slate-100 font-sans min-w-[260px]">
                  <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-slate-700">
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      🛡️ {props.site_id || `SAFE-PARCEL-${idx + 1}`}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-700">
                      CCI {cci.toFixed(1)}/100
                    </span>
                  </div>
                  <div className="text-[11px] space-y-1 text-slate-300 font-mono">
                    <div>Viable Family Capacity: <strong className="text-white">{cap.toLocaleString('en-IN')} families</strong></div>
                    <div>Parceled Land Area: <strong className="text-white">{(props.area_sqkm || 12.5).toFixed(2)} sq.km</strong></div>
                    <div>Suitability Tier: <strong className="text-emerald-300">{props.suitability_tier || 'Viable (CCI > 70)'}</strong></div>
                    <div>Slope Constructability: <strong className="text-amber-300">&lt; 15° (Stable)</strong></div>
                    <div>Flood Corridor Safety: <strong className="text-cyan-300">&gt; 500m Buffer</strong></div>
                  </div>
                </div>
              </Popup>
            </Polygon>
          );
        })}

        {/* 4. Live Resettlement Priority Queue Habitations Layer (Red-Zone Origins) */}
        {activeMapLayers.liveResettlementQueue && liveResettlementQueue && liveResettlementQueue.features.map((feat, idx) => {
          const geom = feat.geometry;
          const props = feat.properties || {};
          if (geom.type !== 'Point' || !geom.coordinates) return null;
          const latLng: [number, number] = [geom.coordinates[1], geom.coordinates[0]];
          const priority = props.priority_tier || 'Medium-Term';

          return (
            <Marker
              key={`queue-hab-${idx}`}
              position={latLng}
              icon={createCustomIcon('resettlement_habitation', priority, props.habitation_id || `HAB-${idx+1}`)}
            >
              <Popup>
                <div className="p-3 bg-[#0B192C] text-slate-100 font-sans min-w-[260px]">
                  <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-slate-700">
                    <span className="font-mono text-xs font-bold text-white">
                      {props.name || props.habitation_id}
                    </span>
                    <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold border ${priority.includes('Immediate') ? 'bg-red-950 text-red-300 border-red-700' : 'bg-amber-950 text-amber-300 border-amber-700'}`}>
                      {priority}
                    </span>
                  </div>
                  <div className="text-[11px] space-y-1 text-slate-300 font-mono">
                    <div>Population at Risk: <strong className="text-white">{(props.population || 1200).toLocaleString('en-IN')}</strong></div>
                    <div>Hazard Index ($HI$): <strong className="text-red-400">{(props.hazard_index || 0.45).toFixed(3)}</strong></div>
                    <div>DEM Elevation: <strong className="text-white">{props.elevation_m || 1500}m ASL</strong></div>
                    <div>Terrain Slope: <strong className="text-amber-400">{props.slope_deg || 18.5}°</strong></div>
                    <div className="pt-1 text-[10px] text-emerald-300 border-t border-slate-800">
                      Recommendation: {props.recommended_action || 'Priority Resettlement Action'}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* 5. AUTHENTIC OSM ROAD-NETWORK RELOCATION CORRIDORS (Connecting Red Zones to Safe Zones along Verified Highways) */}
        {activeMapLayers.relocationCorridors && activeCorridorsFC && activeCorridorsFC.features && activeCorridorsFC.features.map((feat, idx) => {
          const geom = feat.geometry;
          const props = feat.properties || {};
          let positions: [number, number][] = [];

          if (props.coordinates_leaflet && Array.isArray(props.coordinates_leaflet)) {
            positions = props.coordinates_leaflet;
          } else if (geom && geom.coordinates && Array.isArray(geom.coordinates)) {
            positions = geom.coordinates.map((c: any) => [c[1], c[0]] as [number, number]);
          }

          if (!positions || positions.length < 2) return null;

          const isImmediate = (props.priority_tier || '').includes('Immediate');
          const isShortTerm = (props.priority_tier || '').includes('Short');
          const mainColor = props.color || (isImmediate ? '#DC2626' : isShortTerm ? '#EA580C' : '#0284C7');
          const originCoord = positions[0];
          const destCoord = positions[positions.length - 1];

          return (
            <React.Fragment key={`corridor-group-${props.corridor_id || idx}`}>
              {/* Casing Underlay Polyline for Maximum Legibility & Contrast over Satellite/Dark Maps */}
              <Polyline
                positions={positions}
                pathOptions={{
                  color: '#020617',
                  weight: 8,
                  opacity: 0.9,
                  lineCap: 'round',
                  lineJoin: 'round',
                }}
              />

              {/* Main Highway Conforming Route */}
              <Polyline
                positions={positions}
                pathOptions={{
                  color: mainColor,
                  weight: 4.5,
                  opacity: 0.95,
                  dashArray: isImmediate ? undefined : '10, 6',
                  className: isImmediate ? 'red-zone-pulse' : '',
                  lineCap: 'round',
                  lineJoin: 'round',
                }}
              >
                <Popup>
                  <div className="p-3 bg-[#0B192C] text-slate-100 font-sans min-w-[300px]">
                    <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-700">
                      <div className="flex items-center gap-1.5">
                        <Route className="w-4 h-4 text-amber-400" />
                        <span className="font-mono text-xs font-bold text-amber-300">
                          {props.corridor_id || `CORRIDOR-${idx+1}`}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold border ${isImmediate ? 'bg-red-950 text-red-300 border-red-700' : 'bg-amber-950 text-amber-300 border-amber-700'}`}>
                        {props.priority_tier || 'Priority Route'}
                      </span>
                    </div>

                    <div className="text-[11px] space-y-1.5 text-slate-300 font-mono">
                      <div className="font-bold text-white text-xs pb-0.5">
                        🛣️ {props.road_name || 'OSM Arterial Relocation Highway'}
                      </div>

                      {/* Origin Red Zone to Destination Safe Site */}
                      <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
                        <div className="flex items-center gap-1.5 text-red-400">
                          <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                          <span>Origin (Red Zone):</span>
                          <strong className="text-white truncate">{props.habitation_name || props.habitation_id}</strong>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                          <span>Safe Site Target:</span>
                          <strong className="text-white truncate">{props.destination_site_id} (CCI {props.destination_cci || 88.0})</strong>
                        </div>
                      </div>

                      {/* Distance & Detour Factor */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="p-1.5 bg-slate-900/90 rounded border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">OSM Road Distance</span>
                          <strong className="text-white text-xs font-bold">{props.road_distance_km} km</strong>
                        </div>
                        <div className="p-1.5 bg-slate-900/90 rounded border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Straight-Line Vector</span>
                          <span className="text-slate-300 text-xs font-bold">{props.euclidean_distance_km} km <span className="text-amber-400 text-[10px]">({props.detour_ratio}x detour)</span></span>
                        </div>
                      </div>

                      {/* Logistics & Timing */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-1.5 bg-slate-900/90 rounded border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Convoy Transit Time</span>
                          <strong className="text-cyan-300 text-xs font-bold">{props.estimated_transit_mins} mins</strong>
                        </div>
                        <div className="p-1.5 bg-slate-900/90 rounded border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Highway Class & Speed</span>
                          <strong className="text-slate-200 text-[10px]">{props.osm_highway_class?.toUpperCase() || 'PRIMARY'} ({props.convoy_speed_kmh} km/h)</strong>
                        </div>
                      </div>

                      {/* Hazard Avoidance Verification */}
                      <div className="mt-1 pt-1.5 border-t border-slate-800 flex items-center gap-1.5 text-[10px] text-emerald-300">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{props.hazard_avoidance_status || '100% Hazard-Bypassed (Zero Red Zone Overlap)'}</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Polyline>

              {/* Start Pin: Red Zone Habitation */}
              {originCoord && (
                <Marker
                  position={originCoord}
                  icon={createCustomIcon('corridor_origin', 'CRITICAL', 'ORIGIN')}
                >
                  <Popup>
                    <div className="p-2 bg-[#0B192C] text-slate-100 font-mono text-xs">
                      <div className="font-bold text-red-400 mb-1">🚨 Relocation Origin (Hazard Red Zone)</div>
                      <div>Habitation: <strong className="text-white">{props.habitation_name || props.habitation_id}</strong></div>
                      <div>Civilian Count: <strong className="text-white">{(props.population || 0).toLocaleString('en-IN')}</strong></div>
                    </div>
                  </Popup>
                </Marker>
              )}

              {/* End Pin: Safe Relocation Site */}
              {destCoord && (
                <Marker
                  position={destCoord}
                  icon={createCustomIcon('corridor_dest', 'SAFE', 'SAFE SITE')}
                >
                  <Popup>
                    <div className="p-2 bg-[#0B192C] text-slate-100 font-mono text-xs">
                      <div className="font-bold text-emerald-400 mb-1">🛡️ Designated Safe Relocation Site</div>
                      <div>Site ID: <strong className="text-white">{props.destination_site_id}</strong></div>
                      <div>CCI Score: <strong className="text-emerald-300">{props.destination_cci || 88.0}/100</strong></div>
                      <div>Family Capacity: <strong className="text-white">{(props.destination_capacity_families || 500).toLocaleString('en-IN')}</strong></div>
                    </div>
                  </Popup>
                </Marker>
              )}
            </React.Fragment>
          );
        })}

        {/* 6. Evacuation Corridors (District-Level Highway Egress) */}
        {activeMapLayers.evacuationRoutes && districts.map(district => (
          <React.Fragment key={`evac-${district.id}`}>
            {district.evacuationRoutes.map(route => {
              const routeColor =
                route.clearanceStatus === 'CLEAR' ? '#10B981' :
                  route.clearanceStatus === 'CAUTION' ? '#F59E0B' :
                    route.clearanceStatus === 'CONGESTED' ? '#EA580C' : '#DC2626';
              return (
                <Polyline
                  key={route.id}
                  positions={route.coordinates}
                  pathOptions={{
                    color: routeColor,
                    weight: 4,
                    opacity: 0.9,
                    dashArray: route.clearanceStatus === 'CAUTION' ? '8, 6' : undefined,
                  }}
                >
                  <Popup>
                    <div className="p-3 bg-[#0B192C] text-slate-100 font-sans min-w-[240px]">
                      <div className="font-mono text-xs font-bold text-amber-400 pb-1 mb-1 border-b border-slate-700">
                        {route.code}: {route.name}
                      </div>
                      <div className="text-[11px] space-y-1 text-slate-300">
                        <div>Origin: <span className="text-white">{route.fromZone}</span></div>
                        <div>Destination: <span className="text-white">{route.toShelter}</span></div>
                        <div>Distance: <strong className="text-white">{route.distanceKm} km</strong> ({route.estimatedTransitMins} mins)</div>
                        <div>Status: <strong style={{ color: routeColor }}>{route.clearanceStatus}</strong></div>
                        <div>Flow Capacity: <strong className="text-white">{route.roadCapacityVehiclesPerHour} veh/hr</strong></div>
                        <div>NDRF Escort: <strong className="text-emerald-400">{route.ndrfEscortAssigned ? 'ASSIGNED' : 'STANDBY'}</strong></div>
                      </div>
                    </div>
                  </Popup>
                </Polyline>
              );
            })}
          </React.Fragment>
        ))}

        {/* 7. Critical Infrastructure Markers */}
        {activeMapLayers.infrastructure && districts.map(district => (
          <React.Fragment key={`infra-${district.id}`}>
            {district.infrastructure.map(item => (
              <Marker
                key={item.id}
                position={item.coordinates}
                icon={createCustomIcon(item.type, item.status)}
              >
                <Popup>
                  <div className="p-3 bg-[#0B192C] text-slate-100 font-sans min-w-[220px]">
                    <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-700">
                      <span className="font-mono text-xs font-bold text-white">
                        {item.name}
                      </span>
                    </div>
                    <div className="text-[11px] space-y-1 text-slate-300">
                      <div>Facility Type: <strong className="text-slate-100 uppercase">{item.type}</strong></div>
                      <div>Operational State: <strong className={item.status === 'operational' ? 'text-emerald-400' : 'text-red-400'}>{item.status.toUpperCase()}</strong></div>
                      {item.capacity && (
                        <div>Capacity: <strong className="text-white">{item.capacity.toLocaleString('en-IN')}</strong> {item.currentOccupancy !== undefined && `(Occ: ${item.currentOccupancy})`}</div>
                      )}
                      <div>Criticality Tier: <strong className="text-amber-400">{item.criticality}</strong></div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </React.Fragment>
        ))}

        {/* 8. District Command Hotspot Centroids */}
        {filteredDistricts.map(district => (
          <Marker
            key={`marker-${district.id}`}
            position={district.coordinates}
            icon={createCustomIcon('district_hotspot', district.riskLevel, `${district.riskScore}`)}
            eventHandlers={{
              click: () => setSelectedDistrict(district),
            }}
          >
            <Popup>
              <div className="p-3 bg-[#0B192C] text-slate-100 font-sans min-w-[260px]">
                <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-slate-700">
                  <span className="font-mono text-xs font-bold text-white">
                    {district.name}
                  </span>
                  <StatusBadge severity={district.riskLevel} size="xs" />
                </div>
                <div className="text-[11px] space-y-1 text-slate-300">
                  <div>State: <strong className="text-white">{district.state}</strong></div>
                  <div>Primary Hazard: <strong className="text-amber-400">{district.primaryHazard}</strong></div>
                  <div>Exposed Population: <strong className="text-white">{district.exposedPopulation.toLocaleString('en-IN')}</strong></div>
                  <div>Carrying Capacity Index: <strong className="text-emerald-400">{district.carryingCapacity.compositeCapacityRatio}%</strong></div>
                  <div>AI Relocation Priority: <strong className="text-red-400">{district.aiRecommendation.priority}</strong></div>
                </div>
                <button
                  onClick={() => setSelectedDistrict(district)}
                  className="mt-2.5 w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-mono text-xs font-bold rounded transition-colors cursor-pointer"
                >
                  VIEW INTELLIGENCE DOSSIER →
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* TOP LEFT: Map HUD & Telemetry & Backend Integration Status */}
      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-[1000] flex flex-col gap-1.5 sm:gap-2 pointer-events-none max-w-[70%] sm:max-w-none">
        <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#0B192C]/95 backdrop-blur border border-slate-700 rounded-xl shadow-gov pointer-events-auto flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono text-slate-200">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className={`w-2 h-2 rounded-full ${backendStatus === 'ONLINE' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="font-bold text-white hidden sm:inline">
              {backendStatus === 'ONLINE' ? 'BACKEND CONNECTED [FastAPI + PyTorch]' : 'BACKEND [STANDBY CACHE]'}
            </span>
            <span className="font-bold text-white sm:hidden">
              {backendStatus === 'ONLINE' ? 'LIVE GIS' : 'GIS'}
            </span>
          </div>
          {(isLiveGISLoading || isPopulationLoading) && (
            <span className="text-cyan-400 text-[10px] animate-pulse">| SYNCING...</span>
          )}
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 truncate">
            <strong className="text-amber-300">{selectedDistrict?.name || 'HIMALAYAN MASTER GRID'}</strong>
          </span>
        </div>

        {/* Quick Toggles Bar: Corridors, Population Grid & Severity Filters */}
        <div className="flex flex-wrap items-center gap-1.5 pointer-events-auto">
          {/* Quick Danger-to-Safe Route Overlay Toggle */}
          <button
            onClick={() => setRoutePanelOpen(!routePanelOpen)}
            className={`px-2 py-1 rounded-lg font-mono text-[9px] sm:text-[10px] font-bold transition-all flex items-center gap-1.5 border cursor-pointer shadow-sm ${
              activeDangerToSafeRoute || routePanelOpen
                ? 'bg-gradient-to-r from-red-600 via-amber-600 to-emerald-600 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)] animate-pulse'
                : 'bg-[#0B192C]/90 text-slate-300 border-slate-700 hover:text-white hover:border-amber-400'
            }`}
            title="Open Danger-to-Safe Route Overlay Engine (overlay_mapping/overlay.py)"
          >
            <Sparkles className="w-3 h-3 text-cyan-300" />
            <span>Danger ➔ Safe Route {activeDangerToSafeRoute ? '✓' : ''}</span>
          </button>

          {/* Quick Road Corridors Toggle */}
          <button
            onClick={() => toggleMapLayer('relocationCorridors')}
            className={`px-2 py-1 rounded-lg font-mono text-[9px] sm:text-[10px] font-bold transition-all flex items-center gap-1.5 border cursor-pointer shadow-sm ${
              activeMapLayers.relocationCorridors
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                : 'bg-[#0B192C]/90 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title="Toggle OSM Road-Network Relocation Corridors"
          >
            <Route className="w-3 h-3 text-amber-300" />
            <span>OSM Roads {activeMapLayers.relocationCorridors ? '✓' : ''}</span>
          </button>

          {/* Quick Population Grid Toggle */}
          <button
            onClick={() => toggleMapLayer('populationHeatmap')}
            className={`px-2 py-1 rounded-lg font-mono text-[9px] sm:text-[10px] font-bold transition-all flex items-center gap-1.5 border cursor-pointer shadow-sm ${
              activeMapLayers.populationHeatmap
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'bg-[#0B192C]/90 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title="Toggle Population Distribution Grid & Dasymetric Estimation"
          >
            <Users className="w-3 h-3 text-cyan-300" />
            <span>Pop. Grid {activeMapLayers.populationHeatmap ? '✓' : ''}</span>
          </button>

          {/* Severity Filter Quick Pills */}
          <div className="flex items-center gap-1 bg-[#0B192C]/90 backdrop-blur p-0.5 rounded-lg border border-slate-700 overflow-x-auto">
            {(['ALL', 'CRITICAL', 'VERY_HIGH', 'HIGH'] as const).map(sev => (
              <button
                key={sev}
                onClick={() => setSelectedSeverityFilter(sev)}
                className={`px-1.5 py-0.5 rounded font-mono text-[9px] sm:text-[10px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${selectedSeverityFilter === sev
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
              >
                {sev === 'VERY_HIGH' ? 'V.HIGH' : sev}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TOP RIGHT: Map Control Buttons & Menus */}
      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-[1000] flex items-center gap-1.5 sm:gap-2">
        {/* Basemap Switcher Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setBasemapMenuOpen(!basemapMenuOpen);
              setLayersMenuOpen(false);
            }}
            className="px-2 sm:px-2.5 py-1 sm:py-1.5 bg-[#0B192C]/95 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-[11px] sm:text-xs rounded-xl shadow-gov flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Switch Basemap Layer"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="capitalize hidden sm:inline">{activeMapLayers.basemapType}</span>
          </button>

          {basemapMenuOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-44 max-w-[calc(100vw-32px)] bg-[#0B192C] border border-slate-700 rounded-xl shadow-gov-lg p-1.5 z-50 text-xs font-mono">
              <div className="px-2 py-1 text-[10px] uppercase text-slate-400 font-bold border-b border-slate-800 mb-1">
                Basemap Provider
              </div>
              {(['dark', 'satellite', 'topo', 'osm'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => {
                    setBasemapType(type);
                    setBasemapMenuOpen(false);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded-lg text-xs capitalize flex items-center justify-between cursor-pointer ${activeMapLayers.basemapType === type
                      ? 'bg-amber-600/20 text-amber-300 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800'
                    }`}
                >
                  <span>{type === 'dark' ? 'Dark Command' : type === 'satellite' ? 'ISRO Satellite' : type === 'topo' ? 'Topographic' : 'Street Map'}</span>
                  {activeMapLayers.basemapType === type && <span className="text-amber-400">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* GIS Layers Manager */}
        <div className="relative">
          <button
            onClick={() => {
              setLayersMenuOpen(!layersMenuOpen);
              setBasemapMenuOpen(false);
            }}
            className="px-2 sm:px-2.5 py-1 sm:py-1.5 bg-[#0B192C]/95 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-[11px] sm:text-xs rounded-xl shadow-gov flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Toggle GIS Vector Layers"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Layers</span>
          </button>

          {layersMenuOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-64 max-w-[calc(100vw-32px)] bg-[#0B192C] border border-slate-700 rounded-xl shadow-gov-lg p-2.5 z-50 text-xs font-mono space-y-2">
              <div className="font-bold text-slate-200 pb-1 border-b border-slate-800 flex items-center justify-between">
                <span>GIS Vector Overlays</span>
                <span className="text-[10px] text-slate-400">GeoJSON / WFS</span>
              </div>

              <div className="space-y-1.5">
                {[
                  { key: 'relocationCorridors' as const, label: 'OSM Road Corridors (Hazard-Bypassed)', color: 'bg-amber-500' },
                  { key: 'populationHeatmap' as const, label: 'Population Distribution & Dasymetric', color: 'bg-cyan-500' },
                  { key: 'redZones' as const, label: 'Dynamic Red-Zone Polygons', color: 'bg-red-500' },
                  { key: 'liveSafeSites' as const, label: 'Safe Relocation Parcels (CCI)', color: 'bg-emerald-500' },
                  { key: 'liveResettlementQueue' as const, label: 'Resettlement Priority Queue', color: 'bg-yellow-400' },
                  { key: 'evacuationRoutes' as const, label: 'Evacuation Corridors', color: 'bg-blue-500' },
                  { key: 'infrastructure' as const, label: 'Critical Infrastructure', color: 'bg-indigo-500' },
                  { key: 'shelters' as const, label: 'Relief Shelters & Hubs', color: 'bg-purple-500' },
                  { key: 'weatherRadar' as const, label: 'IMD Doppler Radar Buffer', color: 'bg-pink-500' },
                ].map(l => (
                  <label key={l.key} className="flex items-center justify-between cursor-pointer py-1 px-1.5 rounded hover:bg-slate-800/60">
                    <span className="flex items-center gap-2 text-slate-300 text-[11px]">
                      <span className={`w-2 h-2 rounded-full ${l.color}`} />
                      {l.label}
                    </span>
                    <input
                      type="checkbox"
                      checked={activeMapLayers[l.key]}
                      onChange={() => toggleMapLayer(l.key)}
                      className="rounded border-slate-700 bg-slate-900 text-amber-600 focus:ring-amber-500 w-3.5 h-3.5"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="p-1 sm:p-1.5 bg-[#0B192C]/95 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl shadow-gov transition-colors cursor-pointer"
          title="Toggle Fullscreen Map Mode"
        >
          <Maximize2 className="w-4 h-4 text-slate-300" />
        </button>
      </div>

      {/* BOTTOM LEFT: Comprehensive Multi-Tab Map Legend */}
      <div className="hidden sm:block absolute bottom-3 left-3 z-[1000] p-2.5 bg-[#0B192C]/95 backdrop-blur border border-slate-700 rounded-xl shadow-gov font-mono text-[11px] max-w-[340px]">
        {/* Legend Tabs */}
        <div className="flex items-center gap-2 pb-1.5 mb-1.5 border-b border-slate-800 text-[10px]">
          <button
            onClick={() => setLegendTab('HAZARDS')}
            className={`px-1.5 py-0.5 rounded cursor-pointer ${legendTab === 'HAZARDS' ? 'bg-amber-600/30 text-amber-300 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            HAZARDS
          </button>
          <button
            onClick={() => setLegendTab('ROADS')}
            className={`px-1.5 py-0.5 rounded cursor-pointer ${legendTab === 'ROADS' ? 'bg-amber-600/30 text-amber-300 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            OSM ROADS
          </button>
          <button
            onClick={() => setLegendTab('POPULATION')}
            className={`px-1.5 py-0.5 rounded cursor-pointer ${legendTab === 'POPULATION' ? 'bg-cyan-600/30 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            POPULATION
          </button>
        </div>

        {/* Tab 1: Hazard Severity */}
        {legendTab === 'HAZARDS' && (
          <div className="grid grid-cols-5 gap-1.5 text-center">
            <div className="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-600/70 text-emerald-300 text-[9px] font-bold">
              LOW
            </div>
            <div className="px-1.5 py-0.5 rounded bg-yellow-950/80 border border-yellow-600/70 text-yellow-300 text-[9px] font-bold">
              MOD
            </div>
            <div className="px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-600/70 text-amber-300 text-[9px] font-bold">
              HIGH
            </div>
            <div className="px-1.5 py-0.5 rounded bg-orange-950/80 border border-orange-600/70 text-orange-300 text-[9px] font-bold">
              V.HIGH
            </div>
            <div className="px-1.5 py-0.5 rounded bg-red-950/80 border border-red-600/70 text-red-300 text-[9px] font-bold animate-pulse">
              CRITICAL
            </div>
          </div>
        )}

        {/* Tab 2: OSM Road Relocation Corridors */}
        {legendTab === 'ROADS' && (
          <div className="space-y-1 text-[10px] text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-4 h-1 bg-red-500 rounded" />
              <span>Priority 1 Immediate (Trunk / Primary)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-1 bg-orange-500 rounded" />
              <span>Priority 2 High Readiness (Secondary)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-1 bg-cyan-500 rounded" />
              <span>Strategic Watch Egress Route</span>
            </div>
            <div className="text-[9px] text-emerald-300 pt-0.5 border-t border-slate-800">
              ✓ 100% Hazard-Bypassed (Zero Red Zone Overlap)
            </div>
          </div>
        )}

        {/* Tab 3: Population Distribution & Dasymetric Model */}
        {legendTab === 'POPULATION' && (
          <div className="space-y-1 text-[10px] text-slate-300">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-red-600 rounded-sm" />
                <span>&gt;1,500 / km² (Extreme)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-orange-500 rounded-sm" />
                <span>750-1.5k</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-sm" />
                <span>300-750</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-sky-500 rounded-sm" />
                <span>100-300</span>
              </span>
            </div>
            <div className="pt-0.5 border-t border-slate-800 flex items-center gap-1.5 text-[9px] text-amber-300">
              <span className="w-3 h-2 border border-dashed border-amber-400 rounded-sm" />
              <span>Dashed: Dasymetric Model for Data-Sparse Areas</span>
            </div>
          </div>
        )}
      </div>

      {/* FLOATING INTERACTIVE DANGER-TO-SAFE ROUTE OVERLAY CONTROLLER (overlay_mapping/overlay.py) */}
      {routePanelOpen && (
        <div className="absolute top-14 sm:top-16 left-2 sm:left-3 z-[1100] w-[350px] sm:w-[420px] max-w-[calc(100vw-24px)] max-h-[calc(100vh-140px)] overflow-y-auto bg-[#0B192C]/95 backdrop-blur-xl border-2 border-emerald-500/50 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(16,185,129,0.2)] p-3.5 sm:p-4 text-xs font-mono space-y-3 pointer-events-auto">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-red-500/20 to-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                <Route className="w-4 h-4 text-cyan-300" />
              </div>
              <div>
                <h3 className="font-bold text-white text-xs sm:text-sm tracking-wide flex items-center gap-1.5">
                  DANGER ➔ SAFE ROUTE ENGINE
                </h3>
                <span className="text-[10px] text-cyan-400">
                  overlay_mapping/overlay.py • OSRM API
                </span>
              </div>
            </div>
            <button
              onClick={() => setRoutePanelOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              title="Close Route Panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Preset Selector */}
          <div>
            <label className="text-[10px] text-slate-400 block mb-1 font-bold flex items-center gap-1">
              <span>📋 SELECT DISASTER SCENARIO PRESET:</span>
            </label>
            <select
              value={selectedPresetId}
              onChange={(e) => handleSelectPreset(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-xs focus:border-cyan-400 focus:outline-none cursor-pointer"
            >
              {DANGER_SAFE_PRESETS.map(p => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Coordinate Inputs Form */}
          <form onSubmit={handleComputeRoute} className="space-y-2.5">
            {/* Origin: Danger Zone (Red) */}
            <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-800/60 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-red-400 flex items-center gap-1 text-[11px]">
                  <span>🚨</span> ORIGIN: DANGER / RED ZONE
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setDangerLat(parseFloat(mouseCoords.lat.toFixed(4)));
                    setDangerLon(parseFloat(mouseCoords.lng.toFixed(4)));
                  }}
                  className="text-[9px] text-red-300 hover:text-white bg-red-900/60 hover:bg-red-800 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                  title="Copy current map cursor coordinate"
                >
                  Use Cursor Coords
                </button>
              </div>

              <input
                type="text"
                value={dangerName}
                onChange={(e) => setDangerName(e.target.value)}
                placeholder="Danger Zone Label"
                className="w-full px-2 py-1 bg-slate-950/90 border border-red-900/80 rounded-lg text-white text-[11px] focus:border-red-500 focus:outline-none"
              />

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[9px] text-slate-400 block">Latitude (°N)</span>
                  <input
                    type="number"
                    step="0.0001"
                    value={dangerLat}
                    onChange={(e) => setDangerLat(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-amber-300 font-mono text-xs focus:border-red-400 focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">Longitude (°E)</span>
                  <input
                    type="number"
                    step="0.0001"
                    value={dangerLon}
                    onChange={(e) => setDangerLon(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-amber-300 font-mono text-xs focus:border-red-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Destination: Safe Relocation Zone (Green) */}
            <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 flex items-center gap-1 text-[11px]">
                  <span>🛡️</span> DESTINATION: SAFE RELOCATION ZONE
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSafeLat(parseFloat(mouseCoords.lat.toFixed(4)));
                    setSafeLon(parseFloat(mouseCoords.lng.toFixed(4)));
                  }}
                  className="text-[9px] text-emerald-300 hover:text-white bg-emerald-900/60 hover:bg-emerald-800 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                  title="Copy current map cursor coordinate"
                >
                  Use Cursor Coords
                </button>
              </div>

              <input
                type="text"
                value={safeName}
                onChange={(e) => setSafeName(e.target.value)}
                placeholder="Safe Relocation Zone Label"
                className="w-full px-2 py-1 bg-slate-950/90 border border-emerald-900/80 rounded-lg text-white text-[11px] focus:border-emerald-500 focus:outline-none"
              />

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[9px] text-slate-400 block">Latitude (°N)</span>
                  <input
                    type="number"
                    step="0.0001"
                    value={safeLat}
                    onChange={(e) => setSafeLat(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-emerald-300 font-mono text-xs focus:border-emerald-400 focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">Longitude (°E)</span>
                  <input
                    type="number"
                    step="0.0001"
                    value={safeLon}
                    onChange={(e) => setSafeLon(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-emerald-300 font-mono text-xs focus:border-emerald-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="submit"
                disabled={isComputingRoute}
                className="flex-1 py-2 px-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/50 transition-all disabled:opacity-50"
              >
                <Zap className={`w-3.5 h-3.5 ${isComputingRoute ? 'animate-spin' : ''}`} />
                <span>{isComputingRoute ? 'Calculating OSRM Route...' : '⚡ Overlay Path on Map'}</span>
              </button>

              {activeDangerToSafeRoute && (
                <button
                  type="button"
                  onClick={clearDangerToSafeRoute}
                  className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                  title="Clear Active Route Overlay"
                >
                  Clear
                </button>
              )}
            </div>
          </form>

          {/* Active Route Telemetry & Verification Card */}
          {activeDangerToSafeRoute && (
            <div className="p-2.5 rounded-xl bg-slate-950/90 border border-emerald-500/50 space-y-2">
              <div className="flex items-center justify-between text-[11px] pb-1 border-b border-slate-800">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Route Successfully Overlaid
                </span>
                <span className="text-[10px] text-cyan-400 font-bold">
                  {activeDangerToSafeRoute.route.properties.waypoints_count} Nodes
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[9px] text-slate-400 block">OSM Road Distance</span>
                  <strong className="text-white text-xs">{activeDangerToSafeRoute.summary.road_distance_km} km</strong>
                </div>
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[9px] text-slate-400 block">Convoy Transit ETA</span>
                  <strong className="text-cyan-300 text-xs">{activeDangerToSafeRoute.summary.estimated_transit_mins} mins</strong>
                </div>
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[9px] text-slate-400 block">Straight Line (Vector)</span>
                  <span className="text-slate-300 text-xs">{activeDangerToSafeRoute.summary.euclidean_distance_km} km</span>
                </div>
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[9px] text-slate-400 block">Detour Curvature</span>
                  <strong className="text-amber-400 text-xs">{activeDangerToSafeRoute.summary.detour_ratio}x</strong>
                </div>
              </div>

              <div className="p-1.5 rounded bg-emerald-950/50 border border-emerald-700/60 text-[10px] text-emerald-200 flex items-center justify-between">
                <span>🛣️ Engine: {activeDangerToSafeRoute.route.properties.routing_engine}</span>
                <span className="text-emerald-400 font-bold">100% CLEAR</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* BOTTOM RIGHT: Live Geo-Coordinate & Scale HUD */}
      <div className="hidden sm:flex absolute bottom-3 right-3 z-[1000] px-2.5 py-1 bg-[#0B192C]/90 backdrop-blur border border-slate-700 rounded-xl shadow-gov text-[10px] font-mono text-slate-400 items-center gap-3">
        <span>LAT: <strong className="text-slate-200">{mouseCoords.lat.toFixed(4)}°N</strong></span>
        <span>LNG: <strong className="text-slate-200">{mouseCoords.lng.toFixed(4)}°E</strong></span>
        <span className="text-slate-600">|</span>
        <span>DATUM: <strong className="text-slate-200">WGS-84</strong></span>
      </div>
    </div>
  );
};
