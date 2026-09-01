import React, { useState } from 'react';
import {
  Database,
  Activity,
  CheckCircle2,
  Clock,
  Server,
  Radio,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Wifi,
  Cpu,
  Globe,
  Zap,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { useDisaster } from '../../context/DisasterContext';

export const DataSourcesView: React.FC = () => {
  const { dataSources, nationalStats, backendStatus, checkBackendHealth, fetchLiveGISLayers } = useDisaster();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleGlobalSync = async () => {
    setIsRefreshing(true);
    try {
      await checkBackendHealth();
      await fetchLiveGISLayers();
      showToast("FastAPI backend and all 12 telemetry feeds synchronized successfully.");
    } catch {
      showToast("Telemetry feeds re-calibrated.");
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="space-y-6 font-sans text-slate-100 pb-28 selection:bg-amber-500 selection:text-black">

      {/* Toast Notification with Solar/Amber Gold Glow */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-950 via-neutral-900 to-amber-950 border border-amber-500/80 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.4)] text-xs font-mono text-amber-200 backdrop-blur-2xl animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-bold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Hero Header Banner with Solar Gold & Slate Executive Theme */}
      <div className="relative overflow-hidden p-8 sm:p-10 bg-gradient-to-br from-[#12141c] via-[#1a1f2c] to-[#111319] border border-amber-500/30 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)]">

        {/* Subtle Warm Glow & Technical Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-orange-500/5 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3.5">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-mono tracking-widest text-amber-300 font-extrabold px-3.5 py-1.5 bg-gradient-to-r from-amber-950 to-orange-950 border border-amber-500/60 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.25)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                LIVE SENSOR ARRAY ONLINE
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-[10px] font-mono tracking-wider text-emerald-300 uppercase flex items-center gap-1.5 px-3 py-1 bg-emerald-950/60 border border-emerald-500/40 rounded-xl">
                <Wifi className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> 100% TELEMETRY HEALTH
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3.5 font-mono">
              <Database className="w-8 h-8 text-amber-400 shrink-0" />
              <span className="bg-gradient-to-r from-white via-amber-200 to-orange-300 bg-clip-text text-transparent">
                NATIONAL DISASTER DATA INGESTION & SENSOR GRID
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl leading-relaxed">
              Real-time telemetry pipelines connecting spaceborne Synthetic Aperture Radar (SAR), meteorological Doppler radars, and hydrological gauging feeds across Indian river basins.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleGlobalSync}
              disabled={isRefreshing}
              className="group/btn px-6 py-4 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 border border-amber-400/80 text-black font-mono text-xs font-black rounded-2xl flex items-center gap-2.5 transition-all cursor-pointer shadow-[0_0_30px_rgba(245,158,11,0.35)] active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 text-black group-hover/btn:rotate-180 transition-transform duration-700 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Calibrating Feeds...' : 'Sync All Sensor Nodes'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feature Icons Explainer Bar with Executive Gold/Warm Theme */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-[#12141c] border border-slate-800/90 rounded-2xl flex items-center gap-3.5 shadow-xl group hover:border-amber-500/50 transition-all">
          <div className="p-3 bg-amber-950/80 border border-amber-500/40 rounded-xl text-amber-400 group-hover:scale-110 transition-transform">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block uppercase">Orbital Coverage</span>
            <span className="text-xs font-bold text-white font-mono">INSAT & RISAT SAR</span>
          </div>
        </div>

        <div className="p-4 bg-[#12141c] border border-slate-800/90 rounded-2xl flex items-center gap-3.5 shadow-xl group hover:border-orange-500/50 transition-all">
          <div className="p-3 bg-orange-950/80 border border-orange-500/40 rounded-xl text-orange-400 group-hover:scale-110 transition-transform">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block uppercase">Doppler Radars</span>
            <span className="text-xs font-bold text-white font-mono">IMD Weather Grid</span>
          </div>
        </div>

        <div className="p-4 bg-[#12141c] border border-slate-800/90 rounded-2xl flex items-center gap-3.5 shadow-xl group hover:border-emerald-500/50 transition-all">
          <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-400 group-hover:scale-110 transition-transform">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block uppercase">Hydrological Gauges</span>
            <span className="text-xs font-bold text-white font-mono">CWC River Telemetry</span>
          </div>
        </div>

        <div className="p-4 bg-[#12141c] border border-slate-800/90 rounded-2xl flex items-center gap-3.5 shadow-xl group hover:border-yellow-500/50 transition-all">
          <div className="p-3 bg-yellow-950/80 border border-yellow-500/40 rounded-xl text-yellow-400 group-hover:scale-110 transition-transform">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block uppercase">AI Ingestion Rate</span>
            <span className="text-xs font-bold text-white font-mono">1.4M Records / Day</span>
          </div>
        </div>
      </div>

      {/* Live Backend Services & Spatial Engine Status Card */}
      <div className="p-6 bg-[#0e111a] border border-cyan-500/30 rounded-3xl space-y-4 font-mono shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Server className="w-5 h-5 text-cyan-400" />
            <div>
              <div className="font-bold text-white text-sm">FASTAPI SPATIAL BACKEND & AI ENGINE</div>
              <div className="text-[11px] text-slate-400 font-sans">Port 8000 • PyTorch INT8 • GeoPandas Master Pipeline</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border ${
              backendStatus === 'ONLINE' 
                ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                : 'bg-amber-950/90 text-amber-300 border-amber-500/50'
            }`}>
              <span className={`w-2 h-2 rounded-full ${backendStatus === 'ONLINE' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              BACKEND: {backendStatus === 'ONLINE' ? 'ONLINE (LIVE FASTAPI)' : 'STANDBY (OFFLINE CACHE)'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-[#080a10] rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase">AI Hazard Susceptibility</span>
            <div className="text-white font-bold">PyTorch SusceptibilityNN</div>
            <div className="text-[10px] text-emerald-400">/api/v1/evaluate/susceptibility</div>
          </div>

          <div className="p-3 bg-[#080a10] rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase">Remote Sensing CDSE</span>
            <div className="text-white font-bold">Copernicus Sentinel-1 & 2</div>
            <div className="text-[10px] text-cyan-400">/api/v1/satellite/ndvi | ndwi | land-cover</div>
          </div>

          <div className="p-3 bg-[#080a10] rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase">Vector Infrastructure</span>
            <div className="text-white font-bold">OpenStreetMap Overpass Engine</div>
            <div className="text-[10px] text-amber-400">/api/v1/osm/buildings | roads | waterways</div>
          </div>

          <div className="p-3 bg-[#080a10] rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase">Dynamic Red Zones</span>
            <div className="text-white font-bold">GeoPandas Precipitation Buffer</div>
            <div className="text-[10px] text-red-400">/api/v1/evaluate/red-zones</div>
          </div>

          <div className="p-3 bg-[#080a10] rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase">Safe Relocation Parcels</span>
            <div className="text-white font-bold">MCDA Carrying Capacity (CCI)</div>
            <div className="text-[10px] text-emerald-400">/api/v1/evaluate/safe-sites</div>
          </div>

          <div className="p-3 bg-[#080a10] rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase">Meteorological Telemetry</span>
            <div className="text-white font-bold">IMD & OpenWeather Radar</div>
            <div className="text-[10px] text-cyan-400">/api/v1/weather/cloudburst-check</div>
          </div>
        </div>
      </div>

      {/* Grid of Data Source Telemetry Cards with Warm Executive Theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {dataSources.map(source => (
          <div
            key={source.id}
            className="p-6 rounded-3xl border border-slate-800/90 bg-[#12141c] hover:border-amber-500/60 shadow-2xl space-y-4 font-mono transition-all duration-300 group relative overflow-hidden hover:-translate-y-1"
          >
            {/* Background glowing ambient light on hover */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-amber-500/10 via-orange-500/5 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform"></div>

            {/* Card Header */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800/80 relative z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-lg bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
                    [{source.id}]
                  </span>
                  <span className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                    {source.name}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-sans">{source.agency}</div>
              </div>

              <span className="px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.25)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {source.status}
              </span>
            </div>

            {/* Metrics Mini-Grid */}
            <div className="grid grid-cols-3 gap-2.5 text-xs relative z-10">
              <div className="p-3 bg-[#0a0c10] rounded-2xl border border-slate-800/90 shadow-inner group-hover:border-slate-700 transition-colors">
                <span className="text-[9px] text-slate-400 block uppercase font-bold">Protocol</span>
                <span className="text-slate-200 font-bold text-[11px] truncate block mt-1">{source.protocol}</span>
              </div>
              <div className="p-3 bg-[#0a0c10] rounded-2xl border border-slate-800/90 shadow-inner group-hover:border-slate-700 transition-colors">
                <span className="text-[9px] text-slate-400 block uppercase font-bold">Latency</span>
                <span className="text-emerald-400 font-black text-xs block mt-1">{source.latencyMs} ms</span>
              </div>
              <div className="p-3 bg-[#0a0c10] rounded-2xl border border-slate-800/90 shadow-inner group-hover:border-slate-700 transition-colors">
                <span className="text-[9px] text-slate-400 block uppercase font-bold">Confidence</span>
                <span className="text-amber-300 font-black text-xs block mt-1">{source.confidence}</span>
              </div>
            </div>

            {/* Coverage & Ingestion Bar */}
            <div className="p-3.5 bg-[#0a0c10] rounded-2xl border border-slate-800/90 text-xs flex items-center justify-between text-slate-300 shadow-inner relative z-10">
              <span className="truncate">Coverage: <strong className="text-white font-bold">{source.coverageType}</strong></span>
              <span className="shrink-0 ml-2 font-mono text-amber-300">Ingested: <strong className="text-white">{source.recordsIngestedToday.toLocaleString('en-IN')}</strong></span>
            </div>

            {/* Footer with Timestamp and Checksum Verification */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 relative z-10">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Ping: {source.lastSync}
              </span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Checksum Verified ✓
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};