import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useGIS } from '../../context/GISContext';

export const MapView = ({ fullHeight = false }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);
  const routeLayerRef = useRef(null);

  const {
    rainfall,
    riskPriorities,
    hazardTypes,
    habitations,
    safeSites,
    selectedHabitation,
    handleSelectHabitation,
    activeRouteHabitationId,
    selectedRegion,
    setSelectedRegion,
  } = useGIS();

  // 'street' | 'hybrid' | 'satellite' | 'topo'
  const [mapLayerType, setMapLayerType] = useState('street');

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Centered on Northern India / Himalayan Disaster Belt
    const map = L.map(mapContainerRef.current, {
      center: [31.6, 78.2],
      zoom: 8,
      zoomControl: false,
    });

    mapInstanceRef.current = map;
    layerGroupRef.current = L.layerGroup().addTo(map);
    routeLayerRef.current = L.layerGroup().addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Base Tile Layer with high-accuracy street map and satellite options
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    let tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors | Resite-GIS India';

    if (mapLayerType === 'street') {
      // Clear Street Map View with high-contrast Indian road labels
      tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      attribution = '&copy; OpenStreetMap Street View (India)';
    } else if (mapLayerType === 'hybrid') {
      // Esri Satellite with Street / Highway Overlays
      tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = 'Tiles &copy; Esri &mdash; High-Resolution Satellite View';
    } else if (mapLayerType === 'topo') {
      tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      attribution = '&copy; OpenTopoMap (SRTM 90m DEM)';
    }

    L.tileLayer(tileUrl, {
      maxZoom: 19,
      attribution,
    }).addTo(map);

    // If hybrid, add road labels overlay
    if (mapLayerType === 'hybrid') {
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        zIndex: 500,
      }).addTo(map);
    }
  }, [mapLayerType]);

  // Update GeoJSON markers, dynamic buffers, and safe sites
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    // Red Zone Polygon dynamic buffer calculation based on rainfall
    const bufferMultiplier = 1 + (rainfall - 150) / 350;

    // Spiti & Chamoli High-Risk Polygons (Real Coordinates in India)
    const spitiRedZone = [
      [31.66 * bufferMultiplier - (bufferMultiplier - 1) * 31.6, 78.92],
      [31.72, 79.02],
      [31.64, 79.08],
      [31.59 * bufferMultiplier - (bufferMultiplier - 1) * 31.6, 78.96],
      [31.61, 78.89],
    ];

    const chamoliRedZone = [
      [30.58 * bufferMultiplier - (bufferMultiplier - 1) * 30.5, 79.52],
      [30.60, 79.62],
      [30.53, 79.64],
      [30.49 * bufferMultiplier - (bufferMultiplier - 1) * 30.5, 79.58],
      [30.51, 79.49],
    ];

    const p1 = L.polygon(spitiRedZone, {
      color: '#ba1a1a',
      weight: 2,
      fillColor: '#ba1a1a',
      fillOpacity: Math.min(0.55, 0.22 + (rainfall / 300) * 0.35),
      dashArray: '5, 5',
    });
    p1.bindTooltip(`<strong>Active Red Zone (Spiti Valley, HP)</strong><br/>Dynamic Rainfall Buffer: ${rainfall}mm`, {
      sticky: true,
    });
    layerGroup.addLayer(p1);

    const p2 = L.polygon(chamoliRedZone, {
      color: '#ba1a1a',
      weight: 2,
      fillColor: '#ba1a1a',
      fillOpacity: Math.min(0.55, 0.22 + (rainfall / 300) * 0.35),
      dashArray: '5, 5',
    });
    p2.bindTooltip(`<strong>Active Red Zone (Joshimath-Chamoli, UK)</strong><br/>Dynamic Rainfall Buffer: ${rainfall}mm`, {
      sticky: true,
    });
    layerGroup.addLayer(p2);

    // River / Flash Flood Corridors (Alaknanda & Sutlej)
    if (hazardTypes.flood || rainfall > 110) {
      const floodCorridor = [
        [30.28, 78.98],
        [30.43, 79.42],
        [30.55, 79.56],
        [30.58, 79.59],
        [30.54, 79.61],
        [30.41, 79.45],
        [30.26, 78.99],
      ];
      const floodPoly = L.polygon(floodCorridor, {
        color: '#da3433',
        weight: 1.5,
        fillColor: '#da3433',
        fillOpacity: 0.28 + (rainfall / 300) * 0.25,
      });
      floodPoly.bindTooltip('<strong>High-Velocity Flash Flood Corridor (Alaknanda Catchment)</strong>', {
        sticky: true,
      });
      layerGroup.addLayer(floodPoly);
    }

    // Add Indian Habitation Markers
    habitations.forEach((hab) => {
      if (hab.priority === 'Immediate' && !riskPriorities.immediate) return;
      if (hab.priority === 'Short-Term' && !riskPriorities.shortTerm) return;
      if (hab.priority === 'Medium-Term' && !riskPriorities.mediumTerm) return;

      const isImmediate = hab.priority === 'Immediate';
      const isSelected = selectedHabitation?.id === hab.id;

      const markerHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group">
          <div class="w-8 h-8 rounded-full ${
            isImmediate
              ? 'bg-error ring-4 ring-error/40 animate-pulse'
              : hab.priority === 'Short-Term'
              ? 'bg-secondary ring-2 ring-secondary/30'
              : 'bg-primary'
          } border-2 border-white shadow-xl flex items-center justify-center transition-transform hover:scale-125">
            <span class="material-symbols-outlined text-[16px] text-white" style="font-variation-settings: 'FILL' 1;">
              ${isImmediate ? 'priority_high' : 'location_on'}
            </span>
          </div>
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-md shadow-lg opacity-95 whitespace-nowrap pointer-events-none border border-slate-700">
            ${hab.shortName} (${hab.elevation}m | HI: ${hab.hazardIndex.toFixed(2)})
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-hab-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([hab.lat, hab.lng], { icon: customIcon });
      marker.on('click', () => {
        handleSelectHabitation(hab);
      });
      layerGroup.addLayer(marker);
    });

    // Add Safe Site Markers
    safeSites.forEach((site) => {
      const safeSiteHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group">
          <div class="w-9 h-9 rounded-lg bg-emerald-700 border-2 border-white shadow-xl flex items-center justify-center hover:scale-115 transition-transform">
            <span class="material-symbols-outlined text-[18px] text-white" style="font-variation-settings: 'FILL' 1;">health_and_safety</span>
          </div>
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 bg-emerald-900 text-white text-[11px] font-bold rounded shadow-lg opacity-95 whitespace-nowrap pointer-events-none border border-emerald-500">
            ${site.shortName} (CCI: ${site.cciScore})
          </div>
        </div>
      `;

      const safeIcon = L.divIcon({
        html: safeSiteHtml,
        className: 'custom-safe-marker',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const siteMarker = L.marker([site.lat, site.lng], { icon: safeIcon });
      siteMarker.bindTooltip(
        `<strong>${site.name}</strong><br/>CCI Score: ${site.cciScore} | Capacity: ${site.capacityFamilies.toLocaleString()} Families`,
        { sticky: true }
      );
      layerGroup.addLayer(siteMarker);
    });
  }, [rainfall, riskPriorities, hazardTypes, habitations, safeSites, selectedHabitation]);

  // Route drawing logic
  useEffect(() => {
    const map = mapInstanceRef.current;
    const routeLayer = routeLayerRef.current;
    if (!map || !routeLayer) return;

    routeLayer.clearLayers();

    if (activeRouteHabitationId) {
      const hab = habitations.find((h) => h.id === activeRouteHabitationId);
      if (hab && hab.targetCoords) {
        const p1 = [hab.lat, hab.lng];
        const p4 = hab.targetCoords;
        const p2 = [(p1[0] * 2 + p4[0]) / 3 + 0.08, (p1[1] * 2 + p4[1]) / 3 - 0.1];
        const p3 = [(p1[0] + p4[0] * 2) / 3 - 0.05, (p1[1] + p4[1] * 2) / 3 + 0.08];

        const pathPoints = [p1, p2, p3, p4];

        const polyline = L.polyline(pathPoints, {
          color: '#1a237e',
          weight: 5,
          dashArray: '10, 10',
          className: 'animate-[dash_1s_linear_infinite]',
        });

        routeLayer.addLayer(polyline);
        map.flyToBounds(L.latLngBounds(pathPoints), { padding: [60, 60], duration: 1.2 });
      }
    }
  }, [activeRouteHabitationId, habitations]);

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetView = () => mapInstanceRef.current?.flyTo([31.6, 78.2], 8);

  return (
    <div className={`w-full ${fullHeight ? 'h-full' : 'min-h-[540px] h-full'} relative overflow-hidden rounded-xl group`}>
      {/* Top Left Navigation Zoom Controls */}
      <div className="absolute top-md left-md z-20 flex flex-col gap-sm">
        <button
          onClick={handleZoomIn}
          aria-label="Zoom In"
          className="w-10 h-10 bg-surface rounded-lg shadow-md flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors border border-outline-variant/30 focus:outline-none"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
        </button>
        <button
          onClick={handleZoomOut}
          aria-label="Zoom Out"
          className="w-10 h-10 bg-surface rounded-lg shadow-md flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors border border-outline-variant/30 focus:outline-none"
        >
          <span className="material-symbols-outlined text-[20px]">remove</span>
        </button>
        <button
          onClick={handleResetView}
          aria-label="Reset View"
          className="w-10 h-10 bg-surface rounded-lg shadow-md flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors border border-outline-variant/30 focus:outline-none mt-xs"
          title="Reset to Himalayan Disaster Belt"
        >
          <span className="material-symbols-outlined text-[20px]">my_location</span>
        </button>
      </div>

      {/* Layer Selector & Indian Region Filter Bar */}
      <div className="absolute top-md left-20 z-20 flex items-center gap-sm">
        {/* Layer Switcher */}
        <div className="flex bg-surface/95 backdrop-blur-md rounded-lg shadow-md p-1 border border-outline-variant/40">
          <button
            onClick={() => setMapLayerType('street')}
            className={`px-sm py-1 text-xs font-bold rounded transition-colors flex items-center gap-1 ${
              mapLayerType === 'street'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">map</span>
            Street View (India)
          </button>
          <button
            onClick={() => setMapLayerType('hybrid')}
            className={`px-sm py-1 text-xs font-bold rounded transition-colors flex items-center gap-1 ${
              mapLayerType === 'hybrid'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">satellite_alt</span>
            Satellite Hybrid
          </button>
          <button
            onClick={() => setMapLayerType('topo')}
            className={`px-sm py-1 text-xs font-bold rounded transition-colors flex items-center gap-1 ${
              mapLayerType === 'topo'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">terrain</span>
            Topo DEM
          </button>
        </div>

        {/* Region Dropdown */}
        <div className="bg-surface/95 backdrop-blur-md rounded-lg shadow-md px-2 py-1 border border-outline-variant/40 flex items-center gap-1">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Region:</span>
          <select
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              if (e.target.value === 'Uttarakhand') {
                mapInstanceRef.current?.flyTo([30.5, 79.3], 9);
              } else if (e.target.value === 'Himachal Pradesh') {
                mapInstanceRef.current?.flyTo([32.1, 77.8], 9);
              } else {
                mapInstanceRef.current?.flyTo([31.6, 78.2], 8);
              }
            }}
            className="bg-transparent text-xs font-bold text-primary focus:outline-none cursor-pointer"
          >
            <option value="All">All Himalayan Belt (UK &amp; HP)</option>
            <option value="Uttarakhand">Uttarakhand (Chamoli/Joshimath/Tehri)</option>
            <option value="Himachal Pradesh">Himachal Pradesh (Spiti/Kullu/Manali)</option>
          </select>
        </div>
      </div>

      {/* Top Right Live IMD Weather Alert Card */}
      <div className="absolute top-md right-md z-20 bg-surface/95 backdrop-blur-md rounded-xl p-md shadow-lg min-w-[240px] max-w-[300px] border border-outline-variant/40">
        <div className="flex items-center justify-between mb-sm">
          <span className="font-label-md text-error uppercase font-bold tracking-wider flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
            IMD Elevated Warning
          </span>
          <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>
            warning
          </span>
        </div>
        <p className="font-body-sm text-on-surface-variant leading-tight text-xs">
          Himalayan catchment radar indicates heavy cloudburst &amp; landslide trigger over Chamoli &amp; Spiti.
        </p>
        <div className="mt-sm pt-sm border-t border-outline-variant/30 flex justify-between items-end">
          <span className="font-mono-data text-primary font-bold text-base">{rainfall} mm</span>
          <span className="font-label-md text-on-surface-variant">Live Precipitation</span>
        </div>
      </div>

      {/* Bottom Left Map Legend */}
      <div className="absolute bottom-md left-md z-20 bg-surface/95 backdrop-blur-md rounded-xl p-md shadow-lg border border-outline-variant/40">
        <h4 className="font-label-md text-on-surface-variant mb-sm uppercase font-bold tracking-wider">Map Legend</h4>
        <div className="space-y-sm text-body-sm">
          <div className="flex items-center gap-sm">
            <div className="w-4 h-4 bg-error/40 border border-error rounded-sm"></div>
            <span className="text-on-surface text-xs font-medium">Dynamic Red Zone (Slope &gt; 30°)</span>
          </div>
          <div className="flex items-center gap-sm">
            <div className="w-3.5 h-3.5 bg-error rounded-full animate-pulse border border-white"></div>
            <span className="text-on-surface text-xs font-medium">Habitation (Immediate Priority)</span>
          </div>
          <div className="flex items-center gap-sm">
            <div className="w-4 h-4 bg-emerald-700 rounded border border-white"></div>
            <span className="text-on-surface text-xs font-medium">Safe Receiving Site (CCI &gt; 85)</span>
          </div>
        </div>
      </div>

      {/* Leaflet DOM Node */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[500px]" />
    </div>
  );
};
