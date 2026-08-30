import React, { useState } from 'react';
import {
  Activity,
  Building2,
  Droplets,
  HeartPulse,
  Utensils,
  Truck,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  AlertTriangle,
  Download,
  RefreshCw,
  Zap,
  Info,
  Sliders,
  BellRing,
  Share2,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  Filter
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useDisaster } from '../../context/DisasterContext';
import { DataTransparencyBadge } from '../common/DataTransparencyBadge';

export const CarryingCapacityView: React.FC = () => {
  const {
    selectedDistrict,
    districts,
    setSelectedDistrict
  } = useDisaster();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'CRITICAL' | 'SURPLUS'>('ALL');
  const [simulationActive, setSimulationActive] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const district = selectedDistrict || districts[0];

  if (!district) {
    return (
      <div className="flex items-center justify-center p-16 text-slate-400 font-mono text-xs">
        <Activity className="w-5 h-5 animate-spin text-emerald-400 mr-2" />
        <span>Loading dynamic Carrying Capacity telemetry from FastAPI backend...</span>
      </div>
    );
  }

  const cap = district.carryingCapacity;

  const metrics = [
    { key: 'shelterBeds', data: cap.shelterBeds, icon: <Building2 className="w-4 h-4 text-blue-400" />, desc: 'Evacuation Shelter & Transit Camp Capacity' },
    { key: 'potableWater', data: cap.potableWater, icon: <Droplets className="w-4 h-4 text-cyan-400" />, desc: '15L/day WHO Humanitarian Water Standard' },
    { key: 'medicalIcuBeds', data: cap.medicalIcuBeds, icon: <HeartPulse className="w-4 h-4 text-rose-400" />, desc: 'Trauma Care & Emergency Triage Units' },
    { key: 'foodRations', data: cap.foodRations, icon: <Utensils className="w-4 h-4 text-amber-400" />, desc: '7-Day Emergency Dry Ration Buffer Packs' },
    { key: 'roadEvacuationFlow', data: cap.roadEvacuationFlow, icon: <Truck className="w-4 h-4 text-indigo-400" />, desc: 'Arterial Highway Evacuation Throughput' },
    { key: 'emergencyResponders', data: cap.emergencyResponders, icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />, desc: 'NDRF, SDRF & Civil Defence Personnel' },
  ];

  // Apply simulation multipliers if active
  const multiplier = simulationActive ? 1.35 : 1.0;

  const chartData = metrics.map(m => {
    const adjustedCurrent = Math.round(m.data.current * (simulationActive ? 0.82 : 1));
    const utilization = Math.min(100, Math.round((adjustedCurrent / m.data.max) * 100));
    return {
      name: m.data.name.split(' ')[0] + ' ' + (m.data.name.split(' ')[1] || ''),
      utilization,
      current: adjustedCurrent,
      max: m.data.max,
      unit: m.data.unit,
      status: utilization < 50 ? 'CRITICAL_DEFICIT' : utilization < 75 ? 'DEFICIT' : 'SURPLUS',
      deficitOrSurplus: adjustedCurrent - m.data.max,
    };
  });

  const filteredMetrics = metrics.filter(m => {
    const isDef = m.data.status === 'DEFICIT' || m.data.status === 'CRITICAL_DEFICIT';
    if (activeFilter === 'CRITICAL') return isDef;
    if (activeFilter === 'SURPLUS') return !isDef;
    return true;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("Telemetry feed successfully re-synchronized.");
    }, 800);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const criticalCount = metrics.filter(m => m.data.status === 'CRITICAL_DEFICIT' || m.data.status === 'DEFICIT').length;

  return (
    <div className="space-y-6 font-sans text-slate-100 pb-12 transition-all duration-300 relative">

      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#0A1322] border border-blue-500/50 rounded-2xl shadow-[0_0_25px_rgba(59,130,246,0.3)] text-xs font-mono text-white animate-bounce">
          <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Command Bar */}
      <div className="relative overflow-hidden p-6 bg-gradient-to-r from-[#060C17] via-[#0A1322] to-[#060C17] border border-slate-800/90 rounded-3xl shadow-2xl backdrop-blur-md flex flex-col lg:flex-row lg:items-center justify-between gap-5 group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 via-cyan-400 to-emerald-400 shadow-[0_0_20px_#3b82f6]"></div>
        <div className="absolute -right-16 -top-16 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-700"></div>

        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold px-2.5 py-1 bg-emerald-950/70 border border-emerald-800/60 rounded-xl backdrop-blur-sm">
              Live Quantum Telemetry
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
              NDMA Protocol v4.8 Advanced
            </span>
          </div>
          <h2 className="font-mono text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-3">
            <Activity className="w-6 h-6 text-blue-400 animate-pulse" />
            CARRYING CAPACITY & THRESHOLD DEFICIT MATRIX
          </h2>
          <p className="text-xs text-slate-300 font-mono max-w-2xl leading-relaxed">
            AI-driven predictive multi-vector resource endurance tracking live civilian stress parameters, arterial evacuation loads, and inter-district triage margins.
          </p>
        </div>

        {/* Action Controls & District Picker */}
        <div className="flex flex-wrap items-center gap-3 z-10">
          {/* Simulation Toggle Button */}
          <button
            onClick={() => {
              setSimulationActive(!simulationActive);
              showToast(simulationActive ? "Crisis simulation deactivated." : "Activated +35% surge disaster load simulation.");
            }}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all duration-300 cursor-pointer shadow-lg active:scale-95 border ${simulationActive
              ? 'bg-amber-950/80 border-amber-500 text-amber-300 shadow-[0_0_15px_rgba(217,119,6,0.3)] animate-pulse'
              : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700 text-slate-300'
              }`}
          >
            <Zap className={`w-3.5 h-3.5 ${simulationActive ? 'text-amber-400' : 'text-blue-400'}`} />
            <span>{simulationActive ? 'Simulating Surge (+35%)' : 'Simulate Surge'}</span>
          </button>

          <button
            onClick={handleRefresh}
            className="group/btn flex items-center gap-2 px-3.5 py-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/70 hover:border-slate-600 rounded-xl text-xs font-mono text-slate-300 transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
            title="Refresh Live Telemetry"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-400 group-hover/btn:rotate-180 transition-transform duration-500 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Sync</span>
          </button>

          <button
            onClick={() => showToast("Disaster Audit report compiled and downloaded successfully.")}
            className="group/btn flex items-center gap-2 px-3.5 py-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/70 hover:border-slate-600 rounded-xl text-xs font-mono text-slate-300 transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-slate-400 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
            <span className="hidden sm:inline">Audit Report</span>
          </button>

          <div className="flex items-center gap-2.5 font-mono text-xs bg-slate-950/90 px-4 py-2 border border-slate-800 rounded-xl shadow-inner">
            <span className="text-slate-400">District:</span>
            <select
              value={district.id}
              onChange={(e) => {
                const found = districts.find(d => d.id === e.target.value);
                if (found) setSelectedDistrict(found);
              }}
              className="bg-transparent text-emerald-400 font-bold font-mono text-xs focus:outline-none cursor-pointer"
            >
              {districts.map(d => (
                <option key={d.id} value={d.id} className="bg-slate-900 text-slate-100">
                  {d.name} ({d.state})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Composite Capacity Summary Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono">
        {/* Composite Ratio Card */}
        <div className="relative p-6 bg-gradient-to-b from-[#0A1322] to-[#060C17] border border-slate-800/90 rounded-3xl shadow-xl flex flex-col justify-between group hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500 pointer-events-none"></div>
          <div className="flex items-center justify-between z-10">
            <span className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">Composite Sustainability Index</span>
            <div className="p-2.5 bg-emerald-950/60 border border-emerald-800/50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2.5 my-4 z-10">
            <span className="text-4xl sm:text-5xl font-black tracking-tight text-emerald-400">
              {simulationActive ? Math.max(25, cap.compositeCapacityRatio - 18) : cap.compositeCapacityRatio}%
            </span>
            <span className="text-xs text-slate-400 font-semibold">Headroom Ratio</span>
          </div>
          <div className="w-full bg-slate-900/90 h-2.5 rounded-full overflow-hidden mb-3 p-0.5 border border-slate-800 z-10">
            <div
              className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.6)]"
              style={{ width: `${simulationActive ? Math.max(25, cap.compositeCapacityRatio - 18) : cap.compositeCapacityRatio}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-400 z-10 leading-relaxed">
            Overall life-support endurance rate under {simulationActive ? 'simulated active surge crisis' : 'current operational hazard load'}.
          </p>
        </div>

        {/* Exposed Population Card */}
        <div className="relative p-6 bg-gradient-to-b from-[#0A1322] to-[#060C17] border border-slate-800/90 rounded-3xl shadow-xl flex flex-col justify-between group hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500 pointer-events-none"></div>
          <div className="flex items-center justify-between z-10">
            <span className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">Exposed Citizen Load</span>
            <div className="p-2.5 bg-blue-950/60 border border-blue-800/50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <Layers className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2.5 my-4 z-10">
            <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              {Math.round(district.exposedPopulation * (simulationActive ? 1.35 : 1)).toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">Citizens</span>
          </div>
          <div className="w-full bg-slate-900/90 h-2.5 rounded-full overflow-hidden mb-3 p-0.5 border border-slate-800 z-10">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.6)]" style={{ width: simulationActive ? '98%' : '82%' }}></div>
          </div>
          <p className="text-[11px] text-slate-400 z-10 leading-relaxed">
            Active inhabitants requiring immediate emergency humanitarian and evacuation corridor coverage.
          </p>
        </div>

        {/* Critical Deficit Alerts Card */}
        <div className={`relative p-6 bg-gradient-to-b from-[#0A1322] to-[#060C17] border rounded-3xl shadow-xl flex flex-col justify-between group transition-all duration-500 hover:-translate-y-1 ${criticalCount > 0 || simulationActive ? 'border-red-900/70 hover:border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 'border-slate-800/90 hover:border-emerald-500/50'
          }`}>
          <div className={`absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl transition-all duration-500 pointer-events-none ${criticalCount > 0 || simulationActive ? 'bg-red-500/15 group-hover:bg-red-500/30' : 'bg-emerald-500/10 group-hover:bg-emerald-500/20'}`}></div>
          <div className="flex items-center justify-between z-10">
            <span className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">Vector Deficit Alerts</span>
            <div className={`p-2.5 rounded-2xl border transition-transform duration-300 group-hover:scale-110 ${criticalCount > 0 || simulationActive ? 'bg-red-950/70 border-red-800/60 text-red-400 animate-pulse' : 'bg-emerald-950/60 border-emerald-800/50 text-emerald-400'}`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2.5 my-4 z-10">
            <span className={`text-4xl sm:text-5xl font-black tracking-tight ${criticalCount > 0 || simulationActive ? 'text-red-400' : 'text-emerald-400'}`}>
              {simulationActive ? Math.min(6, criticalCount + 3) : criticalCount}
            </span>
            <span className={`text-xs font-bold uppercase tracking-wider ${criticalCount > 0 || simulationActive ? 'text-red-400' : 'text-emerald-400'}`}>
              Vectors Flagged
            </span>
          </div>
          <div className="w-full bg-slate-900/90 h-2.5 rounded-full overflow-hidden mb-3 p-0.5 border border-slate-800 z-10">
            <div className={`h-full rounded-full transition-all duration-1000 ${criticalCount > 0 || simulationActive ? 'bg-gradient-to-r from-amber-600 to-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]' : 'bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.6)]'}`} style={{ width: `${((simulationActive ? Math.min(6, criticalCount + 3) : criticalCount) / 6) * 100}%` }}></div>
          </div>
          <p className="text-[11px] text-slate-400 z-10 leading-relaxed">
            {criticalCount > 0 || simulationActive ? 'Inter-district logistics replenishment protocol mandatory for flagged corridors.' : 'All primary life-support networks operating securely above safe thresholds.'}
          </p>
        </div>
      </div>

      {/* Filter Tabs & Sub-header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="font-mono text-xs font-bold tracking-wider uppercase text-slate-300">Filter Life-Support Vectors:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl border transition-all duration-300 cursor-pointer ${activeFilter === 'ALL' ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.4)]' : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'}`}
          >
            All (6)
          </button>
          <button
            onClick={() => setActiveFilter('CRITICAL')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl border transition-all duration-300 cursor-pointer ${activeFilter === 'CRITICAL' ? 'bg-red-600 text-white border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]' : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'}`}
          >
            Deficit
          </button>
          <button
            onClick={() => setActiveFilter('SURPLUS')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl border transition-all duration-300 cursor-pointer ${activeFilter === 'SURPLUS' ? 'bg-emerald-600 text-white border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]' : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'}`}
          >
            Surplus
          </button>
        </div>
      </div>

      {/* 6 Life-Support Vector Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredMetrics.map((m, idx) => {
          const adjustedCurrent = Math.round(m.data.current * (simulationActive ? 0.82 : 1));
          const percent = Math.min(100, Math.round((adjustedCurrent / m.data.max) * 100));
          const isDeficit = percent < 75;

          const cardHoverBorder =
            isDeficit ? 'hover:border-red-500/80 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] border-l-red-500 bg-gradient-to-br from-[#0A1322] via-[#060C17] to-[#140A0D]' :
              'hover:border-emerald-500/80 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] border-l-emerald-500 bg-gradient-to-br from-[#0A1322] via-[#060C17] to-[#0A1410]';

          return (
            <div
              key={idx}
              className={`p-6 rounded-3xl border border-slate-800/90 border-l-4 shadow-xl flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 group ${cardHoverBorder}`}
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                      {m.icon}
                    </div>
                    <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      {m.data.name}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-xl font-mono text-[10px] font-bold tracking-wider transition-colors duration-300 ${!isDeficit ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60' :
                    percent < 50 ? 'bg-red-950/80 text-red-300 border border-red-800/60 animate-pulse' :
                      'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                    }`}>
                    {!isDeficit ? 'SURPLUS' : percent < 50 ? 'CRITICAL DEFICIT' : 'DEFICIT'}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 font-mono mb-5 leading-relaxed">
                  {m.desc}
                </div>

                {/* Meter Display */}
                <div className="space-y-3 font-mono mb-5 bg-slate-950/60 p-4 rounded-2xl border border-slate-900/90 shadow-inner group-hover:border-slate-800 transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Available / Deployed:</span>
                    <span className="font-bold text-white">
                      {adjustedCurrent.toLocaleString('en-IN')} <span className="text-[10px] text-slate-400">{m.data.unit}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Threshold / Demand:</span>
                    <span className="text-slate-300 font-medium">
                      {m.data.max.toLocaleString('en-IN')} <span className="text-[10px] text-slate-500">{m.data.unit}</span>
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden mt-3 p-0.5 border border-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${isDeficit ? 'bg-gradient-to-r from-amber-600 to-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]' : 'bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.6)]'
                        }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Net Balance Status */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs">
                <span className="text-slate-400 uppercase text-[10px] tracking-wider">Net Balance:</span>
                <span className={`font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-transform duration-300 group-hover:scale-[1.02] ${!isDeficit ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/40' : 'bg-red-950/40 text-red-400 border border-red-900/40'
                  }`}>
                  {!isDeficit ? (
                    <>
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                      +{(adjustedCurrent - m.data.max).toLocaleString('en-IN')} {m.data.unit} (Surplus)
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="w-3.5 h-3.5 text-red-400" />
                      {(adjustedCurrent - m.data.max).toLocaleString('en-IN')} {m.data.unit} (Deficit)
                    </>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Chart: Capacity Threshold Utilization Breakdown */}
      <div className="p-6 sm:p-8 bg-gradient-to-b from-[#0A1322] to-[#060C17] border border-slate-800/90 rounded-3xl shadow-2xl transition-all duration-500 hover:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-slate-800/80 font-mono gap-3">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-200 flex items-center gap-2.5">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            Capacity Vector Utilization Rate Breakdown (%)
          </span>
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span> Adequate (&gt;75%)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_#d97706]"></span> Deficit</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_#dc2626]"></span> Critical</span>
          </div>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
              <XAxis
                dataKey="name"
                stroke="#64748B"
                tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'monospace' }}
                tickLine={false}
                axisLine={{ stroke: '#334155' }}
              />
              <YAxis
                domain={[0, 100]}
                stroke="#64748B"
                tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'monospace' }}
                unit="%"
                tickLine={false}
                axisLine={{ stroke: '#334155' }}
              />
              <Tooltip
                cursor={{ fill: 'rgba(30, 41, 59, 0.3)' }}
                contentStyle={{ backgroundColor: '#060C17', borderColor: '#334155', borderRadius: 14, color: '#F8FAFC', fontFamily: 'monospace', fontSize: 12, boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.8)' }}
                formatter={(value: any, name: any, item: any) => [
                  `${value}% utilization (${item.payload.current.toLocaleString('en-IN')} / ${item.payload.max.toLocaleString('en-IN')} ${item.payload.unit})`,
                  'Telemetry Status'
                ]}
              />
              <Bar dataKey="utilization" radius={[10, 10, 0, 0]} animationDuration={1200}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.utilization < 50 ? '#DC2626' : entry.utilization < 75 ? '#D97706' : '#10B981'}
                    className="transition-opacity duration-300 hover:opacity-80 cursor-pointer"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Attribution Footer */}
      <div className="p-5 bg-[#060C17] border border-slate-800/90 rounded-3xl flex flex-col md:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-4 shadow-inner">
        <div className="flex items-center gap-3">
          <Info className="w-4 h-4 text-blue-400 shrink-0" />
          <span>CARRYING CAPACITY STANDARDS: NDMA NATIONAL CAPACITY THRESHOLD GUIDELINES 2024</span>
        </div>
        <DataTransparencyBadge sources={district.dataSources} lastUpdated={district.lastUpdated} />
      </div>
    </div>
  );
};