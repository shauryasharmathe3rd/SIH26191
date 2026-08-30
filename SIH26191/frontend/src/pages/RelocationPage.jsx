import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { useGIS } from '../context/GISContext';
import { fetchNationalRoadStatuses, fetchActiveHazards, fetchBatchEvacuationPlan } from '../services/apiService';

export const RelocationPage = () => {
  const {
    sourceHabitation,
    destSafeSite,
    relocationStep,
    setRelocationStep,
    habitations,
    safeSites,
    setSourceHabitation,
    setDestSafeSite,
  } = useGIS();

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routeLayerRef = useRef(null);
  const dangerLayerRef = useRef(null);
  const convoyMarkerRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Selected route option: 'primary' | 'secondary' | 'emergency'
  const [selectedRouteType, setSelectedRouteType] = useState('primary');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [navActive, setNavActive] = useState(false);
  const [convoyProgress, setConvoyProgress] = useState(0);
  const [mapLayerType, setMapLayerType] = useState('street');

  // Road status and batch modal state
  const [roadStatuses, setRoadStatuses] = useState([]);
  const [activeHazards, setActiveHazards] = useState([]);
  const [showRoadsModal, setShowRoadsModal] = useState(false);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [batchPlanData, setBatchPlanData] = useState(null);

  // Define route options
  const routeOptions = {
    primary: {
      id: 'primary',
      name: 'Primary Highway Route (NH-7 Direct)',
      desc: 'Fastest paved highway with active police convoy escorts.',
      color: '#1a237e',
      distanceKm: sourceHabitation?.routeTelemetry?.distanceKm || 31.4,
      time: sourceHabitation?.routeTelemetry?.estimatedTime || '1h 05m',
      clearPct: sourceHabitation?.routeTelemetry?.clearPct || 84,
      cautionPct: sourceHabitation?.routeTelemetry?.cautionPct || 16,
      waypoints: sourceHabitation?.streetRouteWaypoints || [
        [30.5564, 79.5658],
        [30.5480, 79.5520],
        [30.5350, 79.5310],
        [30.5218, 79.5085],
        [30.4910, 79.4750],
        [30.4620, 79.4480],
        [30.4310, 79.4280]
      ],
      dangerPoints: [
        {
          id: 'DP-01',
          lat: 30.5480,
          lng: 79.5520,
          type: 'Subsidence Fissure',
          severity: 'CRITICAL',
          desc: 'Upper Bazaar Fissure Zone - Active ground displacement',
          speedLimit: '20 km/h',
          chainage: '1.2 km'
        },
        {
          id: 'DP-02',
          lat: 30.4620,
          lng: 79.4480,
          type: 'Rockfall Scree',
          severity: 'HIGH',
          desc: 'Tangni Scree Choke Point - Falling rocks during rainfall',
          speedLimit: '30 km/h',
          chainage: '24.8 km'
        }
      ]
    },
    secondary: {
      id: 'secondary',
      name: 'Secondary Ridge Bypass (High Safety)',
      desc: 'Traverses elevated stable bedrock ridge (slope < 15°), avoiding river flood buffer.',
      color: '#005312',
      distanceKm: ((sourceHabitation?.routeTelemetry?.distanceKm || 31.4) * 1.15).toFixed(1),
      time: '1h 25m',
      clearPct: 94,
      cautionPct: 6,
      waypoints: [
        [30.5564, 79.5658],
        [30.5400, 79.5450],
        [30.5050, 79.5100],
        [30.4500, 79.4400],
        [30.4310, 79.4280]
      ],
      dangerPoints: [
        {
          id: 'DP-03',
          lat: 30.5400,
          lng: 79.5450,
          type: 'Narrow Ridge Track',
          severity: 'MEDIUM',
          desc: 'Urgam Ridge Track - Single lane unpaved bedrock',
          speedLimit: '25 km/h',
          chainage: '3.5 km'
        }
      ]
    },
    emergency: {
      id: 'emergency',
      name: 'Emergency Valley Cut (Rapid 4x4)',
      desc: 'Direct downhill cutoff for 4x4 offroad emergency rescue units.',
      color: '#b6171e',
      distanceKm: ((sourceHabitation?.routeTelemetry?.distanceKm || 31.4) * 0.85).toFixed(1),
      time: '45 mins',
      clearPct: 65,
      cautionPct: 35,
      waypoints: [
        [30.5564, 79.5658],
        [30.5350, 79.5310],
        [30.5100, 79.4900],
        [30.4310, 79.4280]
      ],
      dangerPoints: [
        {
          id: 'DP-04',
          lat: 30.5100,
          lng: 79.4900,
          type: 'River Flood Cross',
          severity: 'CRITICAL',
          desc: 'Alaknanda Embankment Cut - High water table risk if rain > 150mm',
          speedLimit: '15 km/h',
          chainage: '12.0 km'
        }
      ]
    }
  };

  const activeRoute = routeOptions[selectedRouteType];

  // Fetch live roads & hazards on load
  useEffect(() => {
    fetchNationalRoadStatuses().then((data) => setRoadStatuses(data));
    fetchActiveHazards().then((data) => setActiveHazards(data));
    fetchBatchEvacuationPlan().then((data) => setBatchPlanData(data));
  }, []);

  // Initialize Leaflet Street Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [sourceHabitation?.lat || 30.5564, sourceHabitation?.lng || 79.5658],
      zoom: 11,
      zoomControl: false,
    });

    mapInstanceRef.current = map;
    routeLayerRef.current = L.layerGroup().addTo(map);
    dangerLayerRef.current = L.layerGroup().addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Base Tile Layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    let tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let attribution = '&copy; OpenStreetMap Street View';

    if (mapLayerType === 'satellite') {
      tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = 'Tiles &copy; Esri World Imagery';
    } else if (mapLayerType === 'topo') {
      tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      attribution = '&copy; OpenTopoMap DEM';
    }

    L.tileLayer(tileUrl, { maxZoom: 19, attribution }).addTo(map);

    if (mapLayerType === 'satellite') {
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        zIndex: 500,
      }).addTo(map);
    }
  }, [mapLayerType]);

  // Render Routes, Alternative Lines, Danger Points, and Convoy Marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    const routeLayer = routeLayerRef.current;
    const dangerLayer = dangerLayerRef.current;
    if (!map || !routeLayer || !dangerLayer) return;

    routeLayer.clearLayers();
    dangerLayer.clearLayers();

    // 1. Draw Inactive Alternative Routes in light muted styles
    Object.keys(routeOptions).forEach((key) => {
      if (key !== selectedRouteType) {
        const altRoute = routeOptions[key];
        const altLine = L.polyline(altRoute.waypoints, {
          color: altRoute.color,
          weight: 3,
          opacity: 0.35,
          dashArray: '6, 6',
        });
        altLine.bindTooltip(`<strong>${altRoute.name}</strong><br/>${altRoute.distanceKm} km (${altRoute.time})`, {
          sticky: true,
        });
        routeLayer.addLayer(altLine);
      }
    });

    // 2. Draw Active Selected Route
    const activeLine = L.polyline(activeRoute.waypoints, {
      color: activeRoute.color,
      weight: 6,
      opacity: 0.95,
      lineCap: 'round',
      lineJoin: 'round',
    });
    routeLayer.addLayer(activeLine);

    // Animated dashed overlay
    const dashLine = L.polyline(activeRoute.waypoints, {
      color: '#ffffff',
      weight: 3,
      dashArray: '8, 8',
      className: 'animate-[dash_1s_linear_infinite]',
    });
    routeLayer.addLayer(dashLine);

    // 3. Source & Destination Markers
    const srcHtml = `
      <div class="relative flex items-center justify-center">
        <div class="w-9 h-9 rounded-full bg-error ring-4 ring-error/40 border-2 border-white shadow-2xl flex items-center justify-center animate-bounce">
          <span class="material-symbols-outlined text-white text-[18px]">warning</span>
        </div>
        <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-bold rounded shadow-lg whitespace-nowrap border border-slate-700">
          Source: ${sourceHabitation?.name} (${sourceHabitation?.slopeAngle}° Slope)
        </div>
      </div>
    `;
    const srcMarker = L.marker(activeRoute.waypoints[0], {
      icon: L.divIcon({ html: srcHtml, className: 'custom-src', iconSize: [36, 36], iconAnchor: [18, 18] }),
    });
    routeLayer.addLayer(srcMarker);

    const destHtml = `
      <div class="relative flex items-center justify-center">
        <div class="w-10 h-10 rounded-xl bg-emerald-700 ring-4 ring-emerald-500/30 border-2 border-white shadow-2xl flex items-center justify-center">
          <span class="material-symbols-outlined text-white text-[20px]">health_and_safety</span>
        </div>
        <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2.5 py-1 bg-emerald-950 text-white text-[11px] font-bold rounded shadow-lg whitespace-nowrap border border-emerald-500">
          Safe Site: ${destSafeSite?.name} (CCI: ${destSafeSite?.cciScore})
        </div>
      </div>
    `;
    const destMarker = L.marker(activeRoute.waypoints[activeRoute.waypoints.length - 1], {
      icon: L.divIcon({ html: destHtml, className: 'custom-dest', iconSize: [40, 40], iconAnchor: [20, 20] }),
    });
    routeLayer.addLayer(destMarker);

    // 4. Render Danger Indicators along the active route
    activeRoute.dangerPoints.forEach((dp) => {
      const dangerIconHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group">
          <div class="w-7 h-7 rounded-full bg-amber-600 ring-4 ring-amber-400/40 border-2 border-white shadow-xl flex items-center justify-center animate-pulse">
            <span class="material-symbols-outlined text-white text-[15px]">report_problem</span>
          </div>
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 bg-amber-950 text-amber-200 text-[10px] font-bold rounded shadow-lg whitespace-nowrap border border-amber-500">
            ⚠️ ${dp.type} (${dp.speedLimit})
          </div>
        </div>
      `;
      const dangerMarker = L.marker([dp.lat, dp.lng], {
        icon: L.divIcon({ html: dangerIconHtml, className: 'danger-marker', iconSize: [28, 28], iconAnchor: [14, 14] }),
      });
      dangerMarker.bindPopup(`
        <div class="p-1">
          <div class="flex items-center gap-1 text-xs font-bold text-amber-700 uppercase">
            <span class="material-symbols-outlined text-[16px]">warning</span> ${dp.severity} Hazard Point
          </div>
          <h4 class="font-bold text-sm text-slate-900 mt-1">${dp.type}</h4>
          <p class="text-xs text-slate-600 mt-0.5 leading-tight">${dp.desc}</p>
          <div class="mt-2 pt-1 border-t border-slate-200 flex justify-between text-[11px] font-mono font-bold text-slate-700">
            <span>Chainage: ${dp.chainage}</span>
            <span class="text-amber-800">Max: ${dp.speedLimit}</span>
          </div>
        </div>
      `);
      dangerLayer.addLayer(dangerMarker);
    });

    // 5. Convoy Moving Marker
    const convoyHtml = `
      <div class="w-8 h-8 rounded-full bg-amber-500 ring-4 ring-amber-300 border-2 border-slate-900 shadow-2xl flex items-center justify-center">
        <span class="material-symbols-outlined text-slate-900 text-[18px]">local_shipping</span>
      </div>
    `;
    const convoy = L.marker(activeRoute.waypoints[0], {
      icon: L.divIcon({ html: convoyHtml, className: 'convoy-marker', iconSize: [32, 32], iconAnchor: [16, 16] }),
      zIndexOffset: 1000,
    });
    convoyMarkerRef.current = convoy;
    routeLayer.addLayer(convoy);

    map.flyToBounds(L.latLngBounds(activeRoute.waypoints), { padding: [60, 60], duration: 1.0 });
  }, [sourceHabitation, destSafeSite, selectedRouteType]);

  // Convoy Animation Loop
  useEffect(() => {
    if (!navActive) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    const waypoints = activeRoute.waypoints;
    if (waypoints.length < 2) return;

    let startTime = null;
    const duration = 12000;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min((elapsed % duration) / duration, 1);
      setConvoyProgress(Math.round(progress * 100));

      const totalSegments = waypoints.length - 1;
      const segmentIndex = Math.min(Math.floor(progress * totalSegments), totalSegments - 1);
      const segmentProgress = (progress * totalSegments) - segmentIndex;

      const p1 = waypoints[segmentIndex];
      const p2 = waypoints[segmentIndex + 1];

      const currentLat = p1[0] + (p2[0] - p1[0]) * segmentProgress;
      const currentLng = p1[1] + (p2[1] - p1[1]) * segmentProgress;

      if (convoyMarkerRef.current) {
        convoyMarkerRef.current.setLatLng([currentLat, currentLng]);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [navActive, selectedRouteType]);

  const handleConfirm = () => {
    setIsConfirmed(true);
    setRelocationStep(5);
    setNavActive(true);
    setTimeout(() => {
      setIsConfirmed(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-80px)] relative overflow-hidden">
      {/* Top Floating Status Overlay with Road Status & Batch Planner Buttons */}
      <div className="absolute top-md right-xl z-20 flex gap-sm items-center">
        <button
          onClick={() => setShowBatchModal(true)}
          className="px-md py-sm rounded-full bg-primary text-white shadow-xl flex items-center gap-sm border border-white/20 hover:bg-primary-container transition-colors text-xs font-bold"
        >
          <span className="material-symbols-outlined text-[16px]">groups</span>
          Batch Evac Planner ({batchPlanData?.total_habitations || 2} Zones)
        </button>

        <button
          onClick={() => setShowRoadsModal(true)}
          className="px-md py-sm rounded-full bg-surface/95 backdrop-blur-md text-on-surface shadow-lg flex items-center gap-sm border border-outline-variant/40 hover:bg-surface-variant transition-colors text-xs font-bold"
        >
          <span className="material-symbols-outlined text-primary text-[16px]">traffic</span>
          National Highway Status ({roadStatuses.filter((r) => r.status === 'OPEN').length}/{roadStatuses.length} Open)
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden h-full">
        {/* Left: Street Map Area with Layer Controls & Route Option Toolbar */}
        <div className="flex-1 relative flex flex-col justify-between p-lg overflow-hidden bg-surface-container">
          {/* Top Left: Layer Selector & Multi-Route Mode Switcher */}
          <div className="absolute top-md left-md z-20 flex flex-col gap-sm">
            {/* Base Layer Switcher */}
            <div className="flex bg-surface/95 backdrop-blur-md rounded-lg shadow-lg p-1 border border-outline-variant/40">
              <button
                onClick={() => setMapLayerType('street')}
                className={`px-sm py-1 text-xs font-bold rounded transition-colors flex items-center gap-1 ${
                  mapLayerType === 'street'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">map</span>
                Street View
              </button>
              <button
                onClick={() => setMapLayerType('satellite')}
                className={`px-sm py-1 text-xs font-bold rounded transition-colors flex items-center gap-1 ${
                  mapLayerType === 'satellite'
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

            {/* Multiple Route Option Selector (Primary, Secondary, Emergency) */}
            <div className="bg-surface/95 backdrop-blur-md rounded-xl shadow-xl p-2 border border-outline-variant/40 flex flex-col gap-1 w-80">
              <span className="text-[10px] font-mono-data font-bold text-on-surface-variant uppercase tracking-wider px-1">
                Route Calculation Options
              </span>
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => setSelectedRouteType('primary')}
                  className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-all flex flex-col items-center gap-0.5 border ${
                    selectedRouteType === 'primary'
                      ? 'bg-primary text-white border-primary shadow-md'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-variant border-outline-variant/30'
                  }`}
                >
                  <span className="text-[11px]">Primary</span>
                  <span className="text-[9px] opacity-80">NH Highway</span>
                </button>
                <button
                  onClick={() => setSelectedRouteType('secondary')}
                  className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-all flex flex-col items-center gap-0.5 border ${
                    selectedRouteType === 'secondary'
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-md'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-variant border-outline-variant/30'
                  }`}
                >
                  <span className="text-[11px]">Secondary</span>
                  <span className="text-[9px] opacity-80">Ridge Bypass</span>
                </button>
                <button
                  onClick={() => setSelectedRouteType('emergency')}
                  className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-all flex flex-col items-center gap-0.5 border ${
                    selectedRouteType === 'emergency'
                      ? 'bg-error text-white border-error shadow-md'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-variant border-outline-variant/30'
                  }`}
                >
                  <span className="text-[11px]">Emergency</span>
                  <span className="text-[9px] opacity-80">Direct Cutoff</span>
                </button>
              </div>
            </div>
          </div>

          {/* Leaflet Map DOM Element */}
          <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

          {/* Bottom Left Route Telemetry & Danger Warning Card */}
          <div className="relative z-10 bg-surface/95 backdrop-blur-md p-md rounded-xl shadow-2xl w-88 border border-outline-variant/50 mt-auto">
            <div className="flex items-center justify-between mb-xs">
              <h4 className="font-label-md text-on-surface-variant uppercase tracking-widest font-bold text-xs">
                {activeRoute.name}
              </h4>
              {navActive && (
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-800 text-[10px] font-mono font-bold rounded-full animate-pulse flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span> Convoy Progress ({convoyProgress}%)
                </span>
              )}
            </div>

            <div className="flex justify-between items-end mb-sm">
              <div>
                <span className="font-display-lg text-primary tracking-tighter font-extrabold text-3xl">
                  {activeRoute.distanceKm}
                </span>
                <span className="font-body-sm text-on-surface-variant font-medium ml-1">km</span>
              </div>
              <div className="text-right">
                <span className="font-headline-md text-on-surface font-bold">{activeRoute.time}</span>
                <p className="font-label-md text-secondary mt-0.5 flex items-center gap-xs justify-end font-semibold text-xs">
                  <span className="material-symbols-outlined text-[14px]">warning</span>
                  {activeRoute.dangerPoints.length} Hazard Choke Points
                </p>
              </div>
            </div>

            {/* Segmented Safety / Caution Bar */}
            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden flex">
              <div className="h-full" style={{ width: `${activeRoute.clearPct}%`, backgroundColor: activeRoute.color }}></div>
              <div className="bg-secondary/40 h-full relative overflow-hidden" style={{ width: `${activeRoute.cautionPct}%` }}>
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(182,23,30,0.6)_2px,rgba(182,23,30,0.6)_4px)]"></div>
              </div>
            </div>
            <div className="flex justify-between mt-xs font-label-md text-on-surface-variant font-medium text-xs">
              <span className="font-semibold" style={{ color: activeRoute.color }}>
                Safe Sector ({activeRoute.clearPct}%)
              </span>
              <span className="text-secondary font-semibold">Caution Sector ({activeRoute.cautionPct}%)</span>
            </div>
          </div>
        </div>

        {/* Right: Step-by-Step Relocation Workbench & Turn-by-Turn Panel */}
        <div className="w-[460px] bg-surface flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.08)] z-10 border-l border-outline-variant/30 h-full">
          {/* Stepper Header */}
          <div className="bg-surface-container-lowest p-md shrink-0 border-b border-outline-variant/20">
            <h2 className="font-headline-md text-primary tracking-tight mb-sm font-bold text-xl">Relocation &amp; Evacuation Plan</h2>
            <div className="relative flex justify-between items-center w-full mt-sm px-2">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-surface-container"></div>
              {steps.map((step) => {
                const isCompleted = step.num < relocationStep;
                const isActive = step.num === relocationStep;
                return (
                  <button
                    key={step.num}
                    onClick={() => setRelocationStep(step.num)}
                    className="relative z-10 flex flex-col items-center gap-sm group focus:outline-none"
                    title={step.label}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-mono-data font-semibold text-xs transition-all ${
                        isCompleted
                          ? 'bg-primary text-on-primary shadow-sm'
                          : isActive
                          ? 'bg-surface-container-lowest text-primary ring-2 ring-primary shadow-md scale-110 font-bold'
                          : 'bg-surface-container text-on-surface-variant hover:bg-surface-variant'
                      }`}
                    >
                      {isCompleted ? (
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      ) : (
                        step.num
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-center font-label-md text-primary mt-sm uppercase tracking-widest font-bold text-xs">
              {steps.find((s) => s.num === relocationStep)?.label || 'Calculate Street Route'}
            </p>
          </div>

          {/* Panel Content Scrollable */}
          <div className="flex-1 overflow-y-auto p-md space-y-md bg-surface-container-lowest">
            {/* Source Node */}
            <div className="bg-surface p-md rounded-xl shadow-sm relative overflow-hidden border border-outline-variant/30">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-label-md text-on-surface-variant uppercase tracking-wider block mb-xs font-semibold text-[10px]">
                    1. Source Vulnerable Settlement (Immediate Priority)
                  </span>
                  <select
                    value={sourceHabitation?.id || ''}
                    onChange={(e) => {
                      const hab = habitations.find((h) => h.id === e.target.value);
                      if (hab) setSourceHabitation(hab);
                    }}
                    className="font-title-md text-on-surface mb-xs font-bold bg-transparent border-b border-outline-variant/40 focus:outline-none focus:border-primary cursor-pointer w-full text-base"
                  >
                    {habitations.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} ({h.district})
                      </option>
                    ))}
                  </select>
                  <p className="font-mono-data text-on-surface-variant text-xs mt-0.5">
                    Elevation: {sourceHabitation?.elevation}m ASL | Critical Slope: {sourceHabitation?.slopeAngle}°
                  </p>
                </div>
                <div className="bg-secondary/10 px-sm py-xs rounded flex flex-col items-center ml-2 shrink-0">
                  <span className="font-label-md text-secondary font-bold text-[10px]">HAZARD IDX</span>
                  <span className="font-headline-md text-secondary font-bold text-lg">
                    {sourceHabitation?.hazardIndex?.toFixed(3) || '0.892'}
                  </span>
                </div>
              </div>
              <div className="mt-sm flex gap-sm flex-wrap">
                <span className="px-sm py-xs rounded bg-surface-container text-on-surface-variant font-label-md flex items-center gap-xs font-semibold text-xs">
                  <span className="material-symbols-outlined text-[14px]">groups</span> Pop:{' '}
                  {sourceHabitation?.population?.toLocaleString()} ({sourceHabitation?.families} Families)
                </span>
                <span className="px-sm py-xs rounded bg-surface-container text-on-surface-variant font-label-md flex items-center gap-xs font-semibold text-xs">
                  <span className="material-symbols-outlined text-[14px]">payments</span> Cost:{' '}
                  {sourceHabitation?.estRelocationCost}
                </span>
              </div>
            </div>

            {/* Connection Arrow */}
            <div className="flex flex-col items-center -my-sm relative z-0">
              <div className="w-[2px] h-6 bg-outline-variant/50 border-l-2 border-dashed border-outline-variant"></div>
              <div className="bg-surface-container-lowest p-xs rounded-full border border-outline-variant text-primary shadow-sm">
                <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
              </div>
              <div className="w-[2px] h-6 bg-outline-variant/50 border-l-2 border-dashed border-outline-variant"></div>
            </div>

            {/* Destination Node */}
            <div className="bg-surface p-md rounded-xl shadow-sm relative overflow-hidden border border-outline-variant/30">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-tertiary-container"></div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-label-md text-on-surface-variant uppercase tracking-wider block mb-xs font-semibold text-[10px]">
                    2. Destination Safe Receiving Site (CCI &gt; 85)
                  </span>
                  <select
                    value={destSafeSite?.id || ''}
                    onChange={(e) => {
                      const site = safeSites.find((s) => s.id === e.target.value);
                      if (site) setDestSafeSite(site);
                    }}
                    className="font-title-md text-on-surface mb-xs font-bold bg-transparent border-b border-outline-variant/40 focus:outline-none focus:border-primary cursor-pointer w-full text-base"
                  >
                    {safeSites.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <p className="font-mono-data text-on-surface-variant text-xs mt-0.5">
                    Zone: {destSafeSite?.landClassification || 'Government Revenue Land'}
                  </p>
                </div>
                <div className="bg-tertiary-container/10 px-sm py-xs rounded flex flex-col items-center ml-2 shrink-0">
                  <span className="font-label-md text-tertiary-container font-bold text-[10px]">CCI SCORE</span>
                  <span className="font-headline-md text-tertiary-container font-bold text-lg">
                    {destSafeSite?.cciScore?.toFixed(1) || '94.5'}
                  </span>
                </div>
              </div>
              <div className="mt-sm flex gap-sm flex-wrap">
                <span className="px-sm py-xs rounded bg-surface-container text-on-surface-variant font-label-md flex items-center gap-xs font-semibold text-xs">
                  <span className="material-symbols-outlined text-[14px]">local_hospital</span> Medical: Yes
                </span>
                <span className="px-sm py-xs rounded bg-surface-container text-on-surface-variant font-label-md flex items-center gap-xs font-semibold text-xs">
                  <span className="material-symbols-outlined text-[14px]">warehouse</span> Capacity:{' '}
                  {destSafeSite?.capacityFamilies?.toLocaleString()} Families
                </span>
              </div>
            </div>

            {/* Turn-by-Turn Street Directions */}
            <div className="bg-surface p-md rounded-xl border border-outline-variant/30 shadow-sm">
              <h4 className="font-label-md text-on-surface uppercase mb-sm font-bold tracking-wider flex items-center gap-1 text-xs">
                <span className="material-symbols-outlined text-primary text-[18px]">turn_right</span>
                Street Navigation Directions (OpenStreetMap)
              </h4>
              <div className="space-y-sm">
                {(sourceHabitation?.turnByTurnDirections || []).map((dir) => (
                  <div
                    key={dir.step}
                    className="p-sm bg-surface-container-low rounded-lg border border-outline-variant/20 text-xs flex gap-sm items-start"
                  >
                    <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                      {dir.step}
                    </span>
                    <div className="flex-1">
                      <p className="text-on-surface font-medium leading-tight">{dir.text}</p>
                      <div className="flex items-center gap-md mt-1 font-mono text-[11px] text-on-surface-variant">
                        <span>{dir.distance}</span>
                        <span>•</span>
                        <span>{dir.time}</span>
                        <span>•</span>
                        <span className="text-primary font-semibold">{dir.alert}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mountain Elevation Descent Profile Chart */}
            <div className="bg-surface p-md rounded-xl border border-outline-variant/30 shadow-sm">
              <h4 className="font-label-md text-on-surface-variant uppercase mb-sm font-bold tracking-wider text-xs flex items-center justify-between">
                <span>Elevation Gradient Profile</span>
                <span className="font-mono text-primary">
                  {sourceHabitation?.elevation}m &rarr; {destSafeSite?.slopeAngle ? '1250m' : '1100m'}
                </span>
              </h4>
              <div className="h-20 w-full relative bg-surface-container-low rounded-lg p-2 flex items-end border border-outline-variant/20">
                <svg className="w-full h-full text-primary" preserveAspectRatio="none" viewBox="0 0 100 40">
                  <path
                    d="M0,40 L0,10 C15,15 30,22 50,28 C70,34 85,36 100,38 L100,40 Z"
                    fill="currentColor"
                    fillOpacity="0.12"
                  ></path>
                  <path
                    d="M0,10 C15,15 30,22 50,28 C70,34 85,36 100,38"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    vectorEffect="non-scaling-stroke"
                  ></path>
                  <circle cx={`${convoyProgress || 10}`} cy={`${10 + convoyProgress * 0.28}`} fill="#b6171e" r="3" className="animate-ping"></circle>
                  <circle cx={`${convoyProgress || 10}`} cy={`${10 + convoyProgress * 0.28}`} fill="#b6171e" r="2.5"></circle>
                </svg>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-md bg-surface-container-lowest shadow-[0_-4px_20px_rgba(0,0,0,0.06)] shrink-0 space-y-sm border-t border-outline-variant/20">
            <button
              onClick={handleConfirm}
              className={`w-full font-title-md py-sm rounded-lg transition-all shadow-md flex items-center justify-center gap-sm font-bold text-sm ${
                isConfirmed
                  ? 'bg-tertiary-container text-on-tertiary-container'
                  : 'bg-primary hover:bg-on-primary-fixed-variant text-on-primary'
              }`}
            >
              {isConfirmed ? (
                <>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  Relocation Plan Dispatched to SDMA
                </>
              ) : (
                <>
                  Confirm Relocation Plan <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
            <div className="flex gap-sm">
              <button
                onClick={() => setNavActive((prev) => !prev)}
                className={`flex-1 font-title-md py-2 rounded-lg transition-colors ring-1 ring-outline-variant shadow-sm flex items-center justify-center gap-xs font-semibold text-xs ${
                  navActive
                    ? 'bg-amber-600 text-white ring-amber-600'
                    : 'bg-surface hover:bg-surface-container text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">navigation</span>
                {navActive ? 'Pause Nav Simulation' : 'Start Street Nav'}
              </button>
              <button
                onClick={() => {
                  alert(`Generating Official SDMA Relocation Dossier for ${sourceHabitation?.name} -> ${destSafeSite?.name}`);
                }}
                className="flex-1 bg-surface hover:bg-surface-container text-on-surface font-title-md py-2 rounded-lg transition-colors ring-1 ring-outline-variant shadow-sm flex items-center justify-center gap-xs font-semibold text-xs"
              >
                <span className="material-symbols-outlined text-[16px]">description</span> Export Dossier
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: National Highway Status Drawer */}
      {showRoadsModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-md">
          <div className="bg-surface rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-outline-variant overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-md bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary text-[24px]">traffic</span>
                <h3 className="font-headline-md text-primary text-lg font-bold">National Highway &amp; Corridor Status (India)</h3>
              </div>
              <button onClick={() => setShowRoadsModal(false)} className="p-1 hover:bg-surface-container rounded-full">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-md overflow-y-auto space-y-sm flex-1">
              {roadStatuses.map((road) => (
                <div key={road.highway_code} className="p-md bg-surface-container-lowest rounded-xl border border-outline-variant/30 flex items-center justify-between shadow-sm">
                  <div>
                    <div className="flex items-center gap-sm">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary font-mono font-bold rounded text-xs">
                        {road.highway_code}
                      </span>
                      <h4 className="font-bold text-on-surface text-sm">{road.name}</h4>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1">{road.condition}</p>
                    <div className="flex gap-md mt-2 text-[11px] font-mono text-on-surface-variant">
                      <span>Clearance: {road.clearance_pct}%</span>
                      <span>•</span>
                      <span>Active Convoys: {road.active_convoys}</span>
                      <span>•</span>
                      <span>Cleared: {road.last_cleared}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    road.status === 'OPEN' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {road.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Batch Multi-Habitation Evacuation Planner */}
      {showBatchModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-md">
          <div className="bg-surface rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col border border-outline-variant overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-md bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary text-[24px]">groups</span>
                <div>
                  <h3 className="font-headline-md text-primary text-lg font-bold">Multi-Habitation Batch Evacuation Planner</h3>
                  <p className="text-xs text-on-surface-variant font-medium">State Disaster Management Authority (SDMA) Dispatch Hub</p>
                </div>
              </div>
              <button onClick={() => setShowBatchModal(false)} className="p-1 hover:bg-surface-container rounded-full">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-md overflow-y-auto space-y-md flex-1">
              <div className="grid grid-cols-3 gap-md">
                <div className="p-sm bg-surface-container-low rounded-xl border border-outline-variant/30 text-center">
                  <span className="text-xs font-bold text-on-surface-variant uppercase block">Target Zones</span>
                  <span className="text-2xl font-bold text-primary">{batchPlanData?.total_habitations || 2}</span>
                </div>
                <div className="p-sm bg-surface-container-low rounded-xl border border-outline-variant/30 text-center">
                  <span className="text-xs font-bold text-on-surface-variant uppercase block">Population Affected</span>
                  <span className="text-2xl font-bold text-error">{(batchPlanData?.total_population_affected || 4480).toLocaleString()}</span>
                </div>
                <div className="p-sm bg-surface-container-low rounded-xl border border-outline-variant/30 text-center">
                  <span className="text-xs font-bold text-on-surface-variant uppercase block">Buses/Trucks Required</span>
                  <span className="text-2xl font-bold text-on-tertiary-container">{batchPlanData?.total_vehicles_dispatched || 698}</span>
                </div>
              </div>

              <div className="border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-surface-container font-bold text-on-surface-variant uppercase">
                    <tr>
                      <th className="p-2">Habitation</th>
                      <th className="p-2">Priority</th>
                      <th className="p-2">Population</th>
                      <th className="p-2">Assigned Safe Site</th>
                      <th className="p-2">Distance / ETA</th>
                      <th className="p-2">Vehicles</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(batchPlanData?.plans || []).map((plan) => (
                      <tr key={plan.habitation_id} className="border-t border-surface-container hover:bg-surface-container-low">
                        <td className="p-2 font-bold text-primary">{plan.habitation_name}</td>
                        <td className="p-2">
                          <span className="px-2 py-0.5 bg-error/10 text-error rounded font-bold">{plan.priority}</span>
                        </td>
                        <td className="p-2 font-mono">{plan.population.toLocaleString()} ({plan.families} fam)</td>
                        <td className="p-2 text-emerald-800 font-medium">{plan.assigned_safe_site_name}</td>
                        <td className="p-2 font-mono">{plan.distance_km} km ({plan.eta_minutes}m)</td>
                        <td className="p-2 font-bold font-mono text-primary">{plan.vehicles_required} Units</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-md bg-surface-container-low border-t border-outline-variant flex justify-end gap-sm">
              <button
                onClick={() => {
                  alert('SDMA Batch Dispatch Order Transmitted. Emergency Convoy Escorts Assigned.');
                  setShowBatchModal(false);
                }}
                className="px-md py-sm bg-primary text-white font-bold text-xs rounded-lg shadow hover:bg-primary-container transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">send</span>
                Transmit SDMA Evacuation Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
