import React, { useState } from 'react';
import {
  Zap,
  CheckCircle2,
  AlertTriangle,
  Building2,
  MapPin,
  Clock,
  Filter,
  ShieldAlert,
  ChevronRight,
  Radio,
  Activity,
  Sparkles,
  RefreshCw,
  Search,
  BellRing,
  Layers,
  TrendingUp,
  ShieldCheck,
  Compass,
  Users
} from 'lucide-react';
import { useDisaster } from '../../context/DisasterContext';
import { StatusBadge } from '../common/StatusBadge';
import { RiskSeverity } from '../../types';

export const ActiveAlertsView: React.FC = () => {
  const {
    activeAlerts,
    acknowledgeAlert,
    selectDistrictById,
    setActiveTab,
    selectedSeverityFilter,
    setSelectedSeverityFilter
  } = useDisaster();

  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = ['ALL', 'METEOROLOGICAL', 'HYDROLOGICAL', 'GEOLOGICAL', 'INFRASTRUCTURE'];

  const filteredAlerts = activeAlerts.filter(alert => {
    const matchesSeverity = selectedSeverityFilter === 'ALL' || alert.severity === selectedSeverityFilter;
    const matchesCategory = selectedCategory === 'ALL' || alert.category?.toUpperCase().includes(selectedCategory);
    const matchesSearch =
      alert.districtName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      alert.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      alert.state.toLowerCase().includes(searchFilter.toLowerCase()) ||
      alert.sourceAgency.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesSeverity && matchesCategory && matchesSearch;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("Tactical emergency telemetry stream synchronized.");
    }, 800);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const criticalCount = activeAlerts.filter(a => a.severity === 'CRITICAL').length;
  const totalAffected = activeAlerts.reduce((acc, curr) => acc + (curr.affectedPopulation || 0), 0);

  return (
    <div className="space-y-6 font-sans text-slate-100 pb-16 selection:bg-amber-500 selection:text-black">

      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3.5 bg-slate-950/95 border border-amber-500/60 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.25)] text-xs font-mono text-amber-200 backdrop-blur-xl animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Hero Header Command Center */}
      <div className="relative overflow-hidden p-8 bg-gradient-to-br from-[#040812] via-[#091122] to-[#040812] border border-slate-800/80 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b from-red-600 via-amber-500 to-orange-500 shadow-[0_0_20px_#ef4444]"></div>
        <div className="absolute -right-20 -top-20 w-72 h-72 bg-red-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-red-400 font-bold px-3 py-1 bg-red-950/80 border border-red-700/50 rounded-xl shadow-inner">
                LIVE TACTICAL STREAM
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                IMD • CWC • ISRO Telemetry
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3 font-mono">
              <Radio className="w-7 h-7 text-red-500 animate-pulse" />
              NATIONAL EMERGENCY ALERTS COMMAND
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl leading-relaxed font-normal">
              Real-time multi-agency hazard broadcasting feed monitoring cloudbursts, hydrograph surges, and InSAR surface deformation triggers.
            </p>
          </div>

          {/* Quick Metrics & Sync Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl flex items-center gap-3 shadow-inner">
              <BellRing className="w-4 h-4 text-red-400 animate-bounce" />
              <div className="font-mono text-xs">
                <span className="text-slate-400 block text-[10px]">Active Critical:</span>
                <span className="text-red-400 font-black">{criticalCount} Streams</span>
              </div>
            </div>

            <div className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl flex items-center gap-3 shadow-inner">
              <Users className="w-4 h-4 text-amber-400" />
              <div className="font-mono text-xs">
                <span className="text-slate-400 block text-[10px]">At-Risk Population:</span>
                <span className="text-amber-300 font-black">{totalAffected.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              className="group/btn flex items-center gap-2 px-4 py-3 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-2xl text-xs font-mono text-slate-200 transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 text-amber-400 group-hover/btn:rotate-180 transition-transform duration-500 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="font-bold">Sync</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar Section */}
      <div className="p-5 bg-gradient-to-r from-[#080E1C] via-[#040812] to-[#080E1C] border border-slate-800/80 rounded-3xl shadow-xl space-y-4">

        {/* Search Input & Counter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search district, state, agency (e.g., IMD, Dam)..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 font-mono text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all shadow-inner"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs w-full md:w-auto justify-end">
            <span className="text-slate-400 font-bold mr-2">Severity:</span>
            {(['ALL', 'CRITICAL', 'HIGH', 'WARNING'] as const).map(sev => (
              <button
                key={sev}
                onClick={() => setSelectedSeverityFilter(sev)}
                className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer border ${selectedSeverityFilter === sev
                  ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills & Total Tally */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-slate-400 font-bold mr-1">Category:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer border ${selectedCategory === cat
                  ? 'bg-slate-800 text-amber-300 border-amber-500/60 shadow-inner'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800">
            Showing <strong className="text-white font-bold">{filteredAlerts.length}</strong> of <strong className="text-white font-bold">{activeAlerts.length}</strong> Broadcasts
          </div>
        </div>

      </div>

      {/* Alerts Stream List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center bg-slate-950/60 border border-slate-800 rounded-3xl space-y-3">
            <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto animate-pulse" />
            <h3 className="font-mono text-sm font-bold text-white uppercase">No Active Alerts Matching Criteria</h3>
            <p className="text-xs font-sans text-slate-400">All monitored districts are currently operating within safe operational thresholds.</p>
          </div>
        ) : (
          filteredAlerts.map(alert => {
            const isCritical = alert.severity === 'CRITICAL';
            return (
              <div
                key={alert.id}
                className={`p-6 rounded-3xl border transition-all duration-300 bg-gradient-to-r from-[#080E1C] via-[#040812] to-[#080E1C] shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-5 group hover:border-amber-500/50 ${isCritical
                  ? 'border-l-4 border-l-red-600 border-slate-800 shadow-[0_0_25px_rgba(239,68,68,0.15)]'
                  : 'border-l-4 border-l-amber-500 border-slate-800'
                  }`}
              >
                <div className="flex-1 space-y-3 font-mono">

                  {/* Top Metadata Line */}
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <StatusBadge severity={alert.severity} size="xs" pulse={isCritical} />
                    <span className="text-sm font-black text-white tracking-wide">
                      {alert.districtName} ({alert.state})
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-amber-400 font-bold bg-amber-950/70 border border-amber-900/50 px-2.5 py-0.5 rounded-lg">
                      {alert.category}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      {alert.timestamp}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-black text-slate-100 uppercase tracking-tight font-mono">
                    {alert.title}
                  </h3>

                  {/* Message body */}
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {alert.message}
                  </p>

                  {/* Footer telemetry details */}
                  <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-4 pt-2 border-t border-slate-900">
                    <span className="flex items-center gap-1">
                      Source Agency: <strong className="text-slate-200 font-bold">{alert.sourceAgency}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      Affected Population: <strong className="text-amber-400 font-bold">{alert.affectedPopulation.toLocaleString('en-IN')} citizens</strong>
                    </span>
                  </div>

                </div>

                {/* Action Buttons & Status */}
                <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 shrink-0 font-mono text-xs pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-900">
                  {alert.acknowledged ? (
                    <span className="px-3 py-1.5 bg-emerald-950/90 border border-emerald-700/80 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-inner">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ACKNOWLEDGED
                    </span>
                  ) : (
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200 transition-colors cursor-pointer font-bold shadow-md active:scale-95"
                    >
                      Acknowledge Alert
                    </button>
                  )}

                  <button
                    onClick={() => {
                      selectDistrictById(alert.districtId);
                      setActiveTab('district_intelligence');
                    }}
                    className="group/btn px-4 py-2 bg-amber-600 hover:bg-amber-500 text-black rounded-xl font-black transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.3)] active:scale-95"
                  >
                    <span>District Dossier</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};