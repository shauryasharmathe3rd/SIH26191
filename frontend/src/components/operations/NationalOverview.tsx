import React, { useState } from 'react';
import {
  ShieldAlert,
  Activity,
  Users,
  Truck,
  Building2,
  AlertTriangle,
  MapPin,
  TrendingUp,
  ChevronRight,
  Flame,
  Radio,
  FileText,
  Sparkles,
  RefreshCw,
  Compass,
  ArrowUpRight,
  Layers,
  Zap,
  ShieldCheck,
  Globe,
  SlidersHorizontal,
  BellRing
} from 'lucide-react';
import { useDisaster } from '../../context/DisasterContext';
import { OperationalCard } from '../common/OperationalCard';
import { StatusBadge } from '../common/StatusBadge';
import { GISMap } from '../gis/GISMap';
import { RiskScoreGauge } from '../common/RiskScoreGauge';
import { DataTransparencyBadge } from '../common/DataTransparencyBadge';

export const NationalOverview: React.FC = () => {
  const {
    districts,
    selectedDistrict,
    setSelectedDistrict,
    selectDistrictById,
    setActiveTab,
    nationalStats,
    activeAlerts
  } = useDisaster();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeFilterTab, setActiveFilterTab] = useState<'ALL' | 'CRITICAL' | 'WARNING'>('ALL');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("NEOC satellite telemetry stream fully synchronized.");
    }, 900);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredDistricts = districts.filter(d => {
    if (activeFilterTab === 'CRITICAL') return d.riskLevel === 'CRITICAL';
    if (activeFilterTab === 'WARNING') return d.riskLevel === 'HIGH' || d.riskLevel === 'WARNING';
    return true;
  });

  return (
    <div className="space-y-6 font-sans text-slate-100 pb-24 selection:bg-indigo-500 selection:text-white">

      {/* Dynamic Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3.5 bg-[#06080d]/95 border border-indigo-500/60 rounded-2xl shadow-[0_0_50px_rgba(99,102,241,0.3)] text-xs font-mono text-indigo-200 backdrop-blur-2xl animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-bold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Cyber-Elite Command Hero Header */}
      <div className="relative overflow-hidden p-8 sm:p-10 bg-gradient-to-br from-[#07090f] via-[#0c0f17] to-[#07090f] border border-slate-800/90 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-emerald-900/10 pointer-events-none"></div>
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3.5">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-red-400 font-extrabold px-3 py-1 bg-red-950/80 border border-red-800/60 rounded-xl shadow-inner">
                STAGE-3 NATIONAL MOBILIZATION
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                NEOC Command Matrix Active
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3.5 font-mono">
              <Flame className="w-8 h-8 text-red-500 animate-pulse shrink-0" />
              NATIONAL DISASTER SITUATION REPORT
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl leading-relaxed">
              Autonomous multi-hazard intelligence mesh fusing 12 space-borne telemetry feeds, IMD nowcasts, and CWC hydrological vectors.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('reports_sitrep')}
              className="group/btn px-4 py-3.5 bg-[#040508] hover:bg-slate-900 border border-slate-700/80 rounded-2xl text-slate-200 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <FileText className="w-4 h-4 text-indigo-400 group-hover/btn:scale-110 transition-transform" />
              <span>SitRep Briefing</span>
            </button>

            <button
              onClick={() => setActiveTab('incident_command')}
              className="group/btn px-5 py-3.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 border border-red-500/80 text-white font-mono text-xs font-black rounded-2xl flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_25px_rgba(239,68,68,0.4)] active:scale-95"
            >
              <AlertTriangle className="w-4 h-4 text-white animate-bounce shrink-0" />
              <span>Incident Command EOC</span>
            </button>

            <button
              onClick={handleRefresh}
              className="group/btn px-4 py-3.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/50 text-indigo-200 font-mono text-xs font-bold rounded-2xl flex items-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 text-indigo-400 group-hover/btn:rotate-180 transition-transform duration-500 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync Matrix</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. National Situation Status - Operational Indicator Cards (Bento Metric Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <OperationalCard
          title="Active Incidents"
          value={nationalStats.activeIncidents}
          subvalue="Districts"
          status="critical"
          icon={<Flame className="w-4 h-4 text-red-400" />}
          caption="6 Red Alert Zones"
          trend={{ direction: 'up', label: '+2 today' }}
        />
        <OperationalCard
          title="Population at Risk"
          value={nationalStats.totalPopulationAtRisk}
          subvalue="Citizens"
          status="critical"
          icon={<Users className="w-4 h-4 text-red-400" />}
          caption="Exposed settlements"
          trend={{ direction: 'up', label: 'Escalating' }}
        />
        <OperationalCard
          title="Evacuation Required"
          value={nationalStats.evacuationRequiredCount}
          subvalue="Target"
          status="warning"
          icon={<Truck className="w-4 h-4 text-amber-400" />}
          caption={`${nationalStats.evacuatedSoFar.toLocaleString('en-IN')} Evacuated (56%)`}
          trend={{ direction: 'up', label: 'Active Transit' }}
        />
        <OperationalCard
          title="Shelter Capacity"
          value={nationalStats.shelterCapacityTotal}
          subvalue="Beds"
          status="normal"
          icon={<Building2 className="w-4 h-4 text-emerald-400" />}
          caption={`${nationalStats.shelterCapacityOccupied.toLocaleString('en-IN')} Occupied (23%)`}
          trend={{ direction: 'neutral', label: 'Adequate Headroom' }}
        />
        <OperationalCard
          title="Critical Infra at Risk"
          value={nationalStats.criticalInfrastructureAtRisk}
          subvalue="Units"
          status="warning"
          icon={<ShieldAlert className="w-4 h-4 text-amber-400" />}
          caption="Hospitals & Bridges"
          trend={{ direction: 'neutral', label: 'Secured' }}
        />
        <OperationalCard
          title="NDRF / SDRF Deployed"
          value={nationalStats.ndrfBattalionsDeployed}
          subvalue="Battalions"
          status="info"
          icon={<Activity className="w-4 h-4 text-indigo-400" />}
          caption={`${nationalStats.sdrfTeamsActive} SDRF Teams Active`}
          trend={{ direction: 'up', label: '16 Helis Standby' }}
        />
      </div>

      {/* 2. Main Center Grid: Hero GIS Map + Priority District Watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">

        {/* Left Column: Hero GIS Map & Live Incident Ticker */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          <div className="h-[340px] sm:h-[440px] lg:h-[550px] rounded-3xl overflow-hidden border border-slate-800/90 shadow-[0_15px_40px_rgba(0,0,0,0.7)] bg-[#07090f] relative group">
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 px-3 py-1.5 bg-[#040508]/90 border border-slate-700/80 rounded-2xl backdrop-blur-md flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-slate-300 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>GIS Vector Active</span>
            </div>
            <GISMap height="100%" />
          </div>

          {/* Bottom Live Alerts Ticker */}
          <div className="p-6 bg-[#07090f] border border-slate-800/90 rounded-3xl font-mono text-xs shadow-xl space-y-3.5">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80">
              <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Radio className="w-4 h-4 text-indigo-400 animate-pulse" />
                Live Incident Ticker ({activeAlerts.length} Active Feeds)
              </span>
              <button
                onClick={() => setActiveTab('active_alerts')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 group cursor-pointer"
              >
                <span>Full Alert Stream</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            <div className="space-y-2.5">
              {activeAlerts.slice(0, 2).map(alert => (
                <div
                  key={alert.id}
                  onClick={() => {
                    selectDistrictById(alert.districtId);
                    setActiveTab('district_intelligence');
                  }}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#040508] hover:bg-slate-900 border border-slate-800/90 cursor-pointer transition-all shadow-inner group"
                >
                  <div className="flex items-center gap-3 truncate">
                    <StatusBadge severity={alert.severity} size="xs" />
                    <span className="font-bold text-white tracking-wide truncate">{alert.districtName}:</span>
                    <span className="text-slate-300 truncate text-xs font-sans">{alert.title}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="text-[11px] text-slate-500 font-mono">{alert.timestamp}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: High-Risk Districts & AI Decision Priority List */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="p-6 bg-[#07090f] border border-slate-800/90 rounded-3xl shadow-2xl flex flex-col h-full">

            {/* Header & Filter Selector */}
            <div className="flex flex-col gap-3 pb-4 mb-4 border-b border-slate-800/80 font-mono">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />
                  Priority Disaster Sectors
                </h3>
                <span className="text-xs text-indigo-400 font-black bg-indigo-950/80 border border-indigo-800/50 px-3 py-1 rounded-xl shadow-inner">
                  {filteredDistricts.length} Zones
                </span>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 pt-1 text-[11px]">
                {(['ALL', 'CRITICAL', 'WARNING'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilterTab(tab)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer border ${activeFilterTab === tab
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.35)]'
                      : 'bg-[#040508] text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Districts Stream List */}
            <div className="space-y-3.5 overflow-y-auto max-h-[560px] pr-1">
              {filteredDistricts.length === 0 ? (
                <div className="py-12 text-center text-slate-500 font-mono text-xs">
                  No districts match the selected risk filter.
                </div>
              ) : (
                filteredDistricts.map(district => {
                  const isSelected = selectedDistrict?.id === district.id;
                  return (
                    <div
                      key={district.id}
                      onClick={() => setSelectedDistrict(district)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer group hover:border-indigo-500/50 ${isSelected
                        ? 'bg-indigo-950/30 border-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.25)]'
                        : 'bg-[#040508] border-slate-800/90 hover:bg-slate-900/50'
                        }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="font-mono text-xs font-black text-white tracking-wide group-hover:text-indigo-300 transition-colors">
                            {district.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            {district.state} • {district.code}
                          </div>
                        </div>
                        <StatusBadge severity={district.riskLevel} size="xs" />
                      </div>

                      <div className="grid grid-cols-2 gap-2 py-2 border-y border-slate-800/80 my-2 font-mono text-xs">
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase font-semibold">Exposed Pop</span>
                          <span className="text-white font-bold">
                            {district.exposedPopulation.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase font-semibold">Capacity Index</span>
                          <span className={`font-bold ${district.carryingCapacity.compositeCapacityRatio >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {district.carryingCapacity.compositeCapacityRatio}%
                          </span>
                        </div>
                      </div>

                      {/* AI Recommendation Snippet */}
                      <div className="mt-2 p-2.5 rounded-xl bg-[#07090f] border border-slate-800/90 font-mono text-xs space-y-1 shadow-inner">
                        <div className="flex items-center justify-between text-indigo-300 font-bold text-[11px]">
                          <span>{district.aiRecommendation.priority}</span>
                          <span className="text-emerald-400">{district.aiRecommendation.confidenceScore}% Conf</span>
                        </div>
                        <div className="text-slate-300 line-clamp-1 font-sans text-xs">
                          {district.aiRecommendation.actionTitle}
                        </div>
                      </div>

                      <div className="mt-3 pt-1 flex items-center justify-between font-mono text-[11px]">
                        <span className="text-slate-500">Sync: {district.lastUpdated}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDistrict(district);
                            setActiveTab('district_intelligence');
                          }}
                          className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 cursor-pointer group/btn"
                        >
                          <span>Dossier</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

      </div>

      {/* 3. Bottom Operational Briefing: Data Transparency & Audit Attribution */}
      <div className="p-5 bg-[#07090f] border border-slate-800/90 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400 shadow-xl">
        <div className="flex items-center gap-3">
          <Layers className="w-5 h-5 text-indigo-400 shrink-0" />
          <span className="font-bold tracking-wide text-slate-300">OPERATIONAL AUTHORITY: NDMA / MHA / STATE DISASTER MANAGEMENT AUTHORITIES</span>
        </div>
        <DataTransparencyBadge />
      </div>

    </div>
  );
};