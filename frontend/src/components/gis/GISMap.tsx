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
  Compass
} from 'lucide-react';
import { useDisaster } from '../../context/DisasterContext';
import { DistrictData, CriticalInfrastructure, EvacuationRoute, HazardZone } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { RiskScoreGauge } from '../common/RiskScoreGauge';

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
    isLiveGISLoading,
    liveRainfallTrigger,
  } = useDisaster();

  const [mouseCoords, setMouseCoords] = useState<{ lat: number; lng: number }>({ lat: 22.5937, lng: 78.9629 });
  const [layersMenuOpen, setLayersMenuOpen] = useState(false);
  const [basemapMenuOpen, setBasemapMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

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
        <MouseCoordinateTracker onCoordChange={(lat, lng) => setMouseCoords({ lat, lng })} />

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
                        <div className="text-[11px] space-y-1 text-slate-300">
                          <div>Hazard Type: <strong className="text-white">{zone.type.replace('_', ' ').toUpperCase()}</strong></div>
                          <div>Area: <strong className="text-white">{zone.areaSqKm} sq.km</strong></div>
                          <div>Exposed Population: <strong className="text-white">{zone.affectedPopulation.toLocaleString('en-IN')}</strong></div>
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

        {/* 2. Live Safe Relocation Parcels Layer (Carrying Capacity Index - CCI) */}
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

        {/* 3. Live Resettlement Priority Queue Habitations Layer */}
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

        {/* 4. Evacuation Corridors */}
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

        {/* 5. Critical Infrastructure Markers */}
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

        {/* 6. District Command Hotspot Centroids */}
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
      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-[1000] flex flex-col gap-1.5 sm:gap-2 pointer-events-none max-w-[65%] sm:max-w-none">
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
          {isLiveGISLoading && (
            <span className="text-cyan-400 text-[10px] animate-pulse">| SYNCING...</span>
          )}
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 truncate">
            <strong className="text-amber-300">{selectedDistrict?.name || 'HIMALAYAN MASTER GRID'}</strong>
          </span>
        </div>

        {/* Severity Filter Quick Pills */}
        <div className="flex items-center gap-1 bg-[#0B192C]/90 backdrop-blur p-1 rounded-xl border border-slate-700 pointer-events-auto overflow-x-auto max-w-full">
          {(['ALL', 'CRITICAL', 'VERY_HIGH', 'HIGH'] as const).map(sev => (
            <button
              key={sev}
              onClick={() => setSelectedSeverityFilter(sev)}
              className={`px-1.5 sm:px-2 py-0.5 rounded-lg font-mono text-[9px] sm:text-[10px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${selectedSeverityFilter === sev
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              {sev === 'VERY_HIGH' ? 'V.HIGH' : sev}
            </button>
          ))}
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
            <div className="absolute right-0 top-full mt-1.5 w-60 max-w-[calc(100vw-32px)] bg-[#0B192C] border border-slate-700 rounded-xl shadow-gov-lg p-2.5 z-50 text-xs font-mono space-y-2">
              <div className="font-bold text-slate-200 pb-1 border-b border-slate-800 flex items-center justify-between">
                <span>GIS Vector Overlays</span>
                <span className="text-[10px] text-slate-400">WFS / GeoJSON</span>
              </div>

              <div className="space-y-1.5">
                {[
                  { key: 'redZones' as const, label: 'Dynamic Red-Zone Polygons', color: 'bg-red-500' },
                  { key: 'liveSafeSites' as const, label: 'Safe Relocation Parcels (CCI)', color: 'bg-emerald-500' },
                  { key: 'liveResettlementQueue' as const, label: 'Resettlement Priority Queue', color: 'bg-yellow-400' },
                  { key: 'evacuationRoutes' as const, label: 'Evacuation Corridors', color: 'bg-cyan-500' },
                  { key: 'infrastructure' as const, label: 'Critical Infrastructure', color: 'bg-blue-500' },
                  { key: 'shelters' as const, label: 'Relief Shelters & Hubs', color: 'bg-indigo-500' },
                  { key: 'weatherRadar' as const, label: 'IMD Doppler Radar Buffer', color: 'bg-purple-500' },
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

      {/* BOTTOM LEFT: Official Government Map Legend */}
      <div className="hidden sm:block absolute bottom-3 left-3 z-[1000] p-2.5 bg-[#0B192C]/90 backdrop-blur border border-slate-700 rounded-xl shadow-gov font-mono text-[11px]">
        <div className="text-[10px] uppercase font-bold text-slate-400 pb-1 mb-1.5 border-b border-slate-800 flex items-center justify-between gap-4">
          <span>HAZARD SEVERITY INDEX</span>
          <span className="text-[9px] text-slate-400">NDMA CLASSIFICATION</span>
        </div>
        <div className="grid grid-cols-5 gap-1.5 text-center">
          <div className="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-600/70 text-emerald-300 text-[10px] font-bold">
            LOW
          </div>
          <div className="px-1.5 py-0.5 rounded bg-yellow-950/80 border border-yellow-600/70 text-yellow-300 text-[10px] font-bold">
            MODERATE
          </div>
          <div className="px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-600/70 text-amber-300 text-[10px] font-bold">
            HIGH
          </div>
          <div className="px-1.5 py-0.5 rounded bg-orange-950/80 border border-orange-600/70 text-orange-300 text-[10px] font-bold">
            V.HIGH
          </div>
          <div className="px-1.5 py-0.5 rounded bg-red-950/80 border border-red-600/70 text-red-300 text-[10px] font-bold animate-pulse">
            CRITICAL
          </div>
        </div>
      </div>

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
