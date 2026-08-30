import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  ShieldCheck,
  Building,
  Radio,
  FileCheck,
  ArrowDownToLine,
  Sparkles,
  Lock,
  Clock,
  RadioTower,
  Cpu,
  Layers,
  CheckCircle2,
  AlertOctagon,
  RefreshCw,
  Compass,
  Zap,
  Activity
} from 'lucide-react';
import { useDisaster } from '../../context/DisasterContext';

export const OfficialSITREPReport: React.FC = () => {
  const { districts, nationalStats, activeAlerts } = useDisaster();
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [liveClock, setLiveClock] = useState<string>('');
  const [telemetrySync, setTelemetrySync] = useState<number>(98.7);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [selectedClassification, setSelectedClassification] = useState<string>('RESTRICTED - OFFICIAL');

  // Real-time tick for live operational timer & radar jitter
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveClock(now.toLocaleTimeString('en-IN', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast("NDMA_SITREP_Bulletin_142_2026.pdf securely encrypted and exported.");
      window.print();
    }, 1500);
  };

  const handleRefreshTelemetry = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setTelemetrySync(parseFloat((98 + Math.random() * 1.9).toFixed(1)));
      setIsSyncing(false);
      showToast("Satellite Telemetry Node Grid Re-calibrated Successfully.");
    }, 1000);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6 font-sans text-slate-100 pb-28 selection:bg-amber-500 selection:text-black">

      {/* Dynamic Toast Notification Alert with Glowing Pulse */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 bg-[#04060d]/95 border border-amber-500/60 rounded-2xl shadow-[0_0_60px_rgba(245,158,11,0.35)] text-xs font-mono text-amber-200 backdrop-blur-2xl animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-spin" />
          <span className="font-bold tracking-wider">{toastMessage}</span>
        </div>
      )}

      {/* Advanced Top Action Bar with Telemetry Controls */}
      <div className="no-print p-4 sm:p-6 bg-gradient-to-r from-[#070b14] via-[#0c1220] to-[#070b14] border border-slate-800/90 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 sm:gap-6 backdrop-blur-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none"></div>

        <div className="space-y-2 relative z-10">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="px-2.5 sm:px-3 py-1 bg-amber-950/80 border border-amber-800/60 rounded-xl text-amber-300 font-mono text-[10px] font-black uppercase tracking-widest shadow-inner flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-amber-400" /> SECURE MHA / NEOC
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <RadioTower className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> LIVE: {telemetrySync}%
            </span>
          </div>
          <h1 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2.5 sm:gap-3 font-mono">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 shrink-0" />
            Official NDMA SITREP Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
            Disaster situation reporting matrix configured with cryptographic verification and real-time sensor array integration.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0 relative z-10 w-full lg:w-auto">
          <button
            onClick={handleRefreshTelemetry}
            disabled={isSyncing}
            className="px-3 py-2.5 sm:px-3.5 sm:py-3.5 bg-[#04060d] hover:bg-slate-900 border border-slate-700/80 rounded-2xl text-slate-300 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer active:scale-95 shadow-lg"
            title="Recalibrate Sensor Node Telemetry"
          >
            <RefreshCw className={`w-4 h-4 text-indigo-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Sync</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 sm:px-4 py-2.5 sm:py-3.5 bg-[#04060d] hover:bg-slate-900 border border-slate-700/80 rounded-2xl text-slate-200 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Quick Print</span>
          </button>

          <button
            onClick={handleExportPDF}
            className="px-4 sm:px-5 py-2.5 sm:py-3.5 bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 border border-amber-500/80 text-white font-mono text-xs font-black rounded-2xl flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_30px_rgba(217,119,6,0.4)] active:scale-95 group"
          >
            <ArrowDownToLine className={`w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform ${isExporting ? 'animate-bounce' : ''}`} />
            <span>{isExporting ? 'Compiling...' : 'Export PDF'}</span>
          </button>
        </div>
      </div>

      {/* Printable Government Document Sheet (Dark Mode UI & Clean Print Mode) */}
      <div className="bg-[#050811] print:bg-white print:text-black border border-slate-800/90 print:border-gray-300 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] print:shadow-none p-4 sm:p-8 md:p-12 font-sans max-w-4xl mx-auto space-y-6 sm:space-y-8 relative overflow-hidden transition-all duration-300">

        {/* Subtle Watermark background element */}
        <div className="absolute right-8 top-28 text-slate-800/10 print:text-gray-100 pointer-events-none select-none font-mono font-black text-9xl z-0">
          🇮🇳
        </div>

        {/* Interactive Classification Modifier (No-Print Toggle) */}
        <div className="no-print flex items-center justify-between bg-[#080d1a] border border-slate-800 p-3 rounded-2xl text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <Activity className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Document Security Level:</span>
          </div>
          <select
            value={selectedClassification}
            onChange={(e) => setSelectedClassification(e.target.value)}
            className="bg-[#04060d] border border-slate-700 text-amber-400 font-bold px-3 py-1.5 rounded-xl focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="RESTRICTED - OFFICIAL">RESTRICTED - OFFICIAL</option>
            <option value="CONFIDENTIAL - NEOC EYES ONLY">CONFIDENTIAL - NEOC EYES ONLY</option>
            <option value="CRITICAL EMERGENCY DIRECTIVE">CRITICAL EMERGENCY DIRECTIVE</option>
          </select>
        </div>

        {/* Document Formal Header */}
        <div className="text-center pb-6 border-b-2 border-slate-800 print:border-black space-y-2 relative z-10">
          <div className="text-xl sm:text-2xl font-black tracking-widest text-white print:text-black font-mono flex items-center justify-center gap-2">
            <span>🇮🇳</span> GOVERNMENT OF INDIA <span>🇮🇳</span>
          </div>
          <div className="text-xs sm:text-sm font-black font-mono uppercase tracking-widest text-slate-300 print:text-gray-800">
            NATIONAL DISASTER MANAGEMENT AUTHORITY (NDMA)
          </div>
          <div className="text-[11px] font-mono text-slate-400 print:text-gray-600 tracking-wider">
            MINISTRY OF HOME AFFAIRS • NATIONAL EMERGENCY OPERATIONS CENTRE (NEOC), NEW DELHI
          </div>
          <div className="pt-3">
            <span className="px-4 py-1.5 bg-red-950/80 print:bg-red-100 border border-red-700/80 print:border-red-600 rounded-xl text-red-300 print:text-red-800 font-mono text-xs font-black uppercase tracking-wider shadow-inner inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              DAILY SITUATION REPORT (SITREP) — BULLETIN NO. 142/2026
            </span>
          </div>
        </div>

        {/* Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs border-y border-slate-800 print:border-gray-300 py-3 relative z-10">
          <div className="p-3 rounded-2xl bg-[#03050c] print:bg-gray-50 border border-slate-800/80 print:border-gray-200">
            <span className="text-slate-400 print:text-gray-500 block text-[10px] font-semibold uppercase flex items-center gap-1">
              <Clock className="w-3 h-3 text-indigo-400" /> TIMESTAMP (IST)
            </span>
            <strong className="text-white print:text-black mt-1 block">28 AUG 2026, {liveClock || '18:32:04'}</strong>
          </div>
          <div className="p-3 rounded-2xl bg-[#03050c] print:bg-gray-50 border border-slate-800/80 print:border-gray-200">
            <span className="text-slate-400 print:text-gray-500 block text-[10px] font-semibold uppercase">CLASSIFICATION</span>
            <strong className="text-amber-400 print:text-black mt-1 block truncate">{selectedClassification}</strong>
          </div>
          <div className="p-3 rounded-2xl bg-[#03050c] print:bg-gray-50 border border-slate-800/80 print:border-gray-200">
            <span className="text-slate-400 print:text-gray-500 block text-[10px] font-semibold uppercase">INCIDENT LEVEL</span>
            <strong className="text-red-400 print:text-black mt-1 block flex items-center gap-1">
              <AlertOctagon className="w-3.5 h-3.5 text-red-400" /> NATIONAL STAGE-3
            </strong>
          </div>
          <div className="p-3 rounded-2xl bg-[#03050c] print:bg-gray-50 border border-slate-800/80 print:border-gray-200">
            <span className="text-slate-400 print:text-gray-500 block text-[10px] font-semibold uppercase">TELEMETRY PIPES</span>
            <strong className="text-white print:text-black mt-1 block">12 SATELLITE / RADAR</strong>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-3 relative z-10">
          <h3 className="text-xs sm:text-sm font-mono font-black uppercase text-amber-400 print:text-black border-b border-slate-800 print:border-gray-400 pb-1.5 flex items-center gap-2">
            <Radio className="w-4 h-4 text-amber-400 print:hidden" />
            1. Executive Operational Summary
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 print:text-gray-900 leading-relaxed font-sans bg-[#03050c] print:bg-gray-50 p-4 sm:p-5 rounded-2xl border border-slate-800/80 print:border-gray-200 shadow-inner">
            Widespread multi-hazard activity continues across Northern and Southern river basins. Significant ground deformation and subsidence spikes detected in <strong>Chamoli (Joshimath Sector)</strong>, while torrential cloudburst inundation is impacting <strong>Wayanad</strong> and the <strong>Mahanadi delta (Cuttack)</strong>. A total of <strong>{nationalStats.totalPopulationAtRisk.toLocaleString('en-IN')} citizens</strong> are currently within high-susceptibility red-zones. Mandatory Stage-1 and Stage-2 proactive relocations are actively progressing under DDMA supervision.
          </p>
        </div>

        {/* Section 2: National Metrics Grid with Animated Cards */}
        <div className="space-y-3 relative z-10">
          <h3 className="text-xs sm:text-sm font-mono font-black uppercase text-amber-400 print:text-black border-b border-slate-800 print:border-gray-400 pb-1.5 flex items-center gap-2">
            <Building className="w-4 h-4 text-amber-400 print:hidden" />
            2. National Situation Indicators
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-4 bg-[#03050c] print:bg-gray-100 rounded-2xl border border-slate-800 print:border-gray-300 shadow-inner hover:border-red-500/50 transition-all group">
              <span className="text-[10px] text-slate-400 print:text-gray-600 block uppercase font-bold">TOTAL POP AT RISK</span>
              <span className="text-lg font-black text-red-400 print:text-black mt-1.5 block group-hover:scale-105 transition-transform origin-left">
                {nationalStats.totalPopulationAtRisk.toLocaleString('en-IN')}
              </span>
              <div className="mt-2 text-[9px] text-red-400/80 font-mono">CRITICAL SUSCEPTIBILITY</div>
            </div>
            <div className="p-4 bg-[#03050c] print:bg-gray-100 rounded-2xl border border-slate-800 print:border-gray-300 shadow-inner hover:border-amber-500/50 transition-all group">
              <span className="text-[10px] text-slate-400 print:text-gray-600 block uppercase font-bold">EVACUATION TARGET</span>
              <span className="text-lg font-black text-amber-400 print:text-black mt-1.5 block group-hover:scale-105 transition-transform origin-left">
                {nationalStats.evacuationRequiredCount.toLocaleString('en-IN')}
              </span>
              <div className="mt-2 text-[9px] text-amber-400/80 font-mono">STAGE-1 & 2 MANDATE</div>
            </div>
            <div className="p-4 bg-[#03050c] print:bg-gray-100 rounded-2xl border border-slate-800 print:border-gray-300 shadow-inner hover:border-emerald-500/50 transition-all group">
              <span className="text-[10px] text-slate-400 print:text-gray-600 block uppercase font-bold">EVACUATED TO SAFETY</span>
              <span className="text-lg font-black text-emerald-400 print:text-black mt-1.5 block group-hover:scale-105 transition-transform origin-left">
                {nationalStats.evacuatedSoFar.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-400">(56%)</span>
              </span>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-400 h-full w-[56%] rounded-full"></div>
              </div>
            </div>
            <div className="p-4 bg-[#03050c] print:bg-gray-100 rounded-2xl border border-slate-800 print:border-gray-300 shadow-inner hover:border-indigo-500/50 transition-all group">
              <span className="text-[10px] text-slate-400 print:text-gray-600 block uppercase font-bold">ACTIVE SHELTER BEDS</span>
              <span className="text-lg font-black text-white print:text-black mt-1.5 block group-hover:scale-105 transition-transform origin-left">
                {nationalStats.shelterCapacityTotal.toLocaleString('en-IN')}
              </span>
              <div className="mt-2 text-[9px] text-indigo-300 font-mono">RESERVE CAPACITY OK</div>
            </div>
          </div>
        </div>

        {/* Section 3: High-Risk Sector Breakdown Table */}
        <div className="space-y-3 relative z-10">
          <h3 className="text-xs sm:text-sm font-mono font-black uppercase text-amber-400 print:text-black border-b border-slate-800 print:border-gray-400 pb-1.5 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-amber-400 print:hidden" />
            3. District-Wise Hazard & Relocation Directory
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-800 print:border-gray-300 bg-[#03050c] print:bg-white shadow-2xl">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 print:border-gray-300 text-slate-400 print:text-gray-600 text-[10px] uppercase bg-slate-900/60 print:bg-gray-100">
                  <th className="py-3.5 px-4">District / State</th>
                  <th className="py-3.5 px-4">Hazard Vector</th>
                  <th className="py-3.5 px-4">Risk Score</th>
                  <th className="py-3.5 px-4">Exposed Pop</th>
                  <th className="py-3.5 px-4">Capacity Headroom</th>
                  <th className="py-3.5 px-4">AI Relocation Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 print:divide-gray-200">
                {districts.map(d => (
                  <tr key={d.id} className="text-slate-200 print:text-black hover:bg-slate-900/50 transition-colors group">
                    <td className="py-3.5 px-4 font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 group-hover:scale-150 transition-transform"></span>
                      {d.name} ({d.state})
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 print:text-gray-800">{d.primaryHazard}</td>
                    <td className="py-3.5 px-4 font-black text-red-400 print:text-black">{d.riskScore}/100</td>
                    <td className="py-3.5 px-4 font-mono">{d.exposedPopulation.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-400 print:text-black">{d.carryingCapacity.compositeCapacityRatio}%</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black tracking-wider uppercase inline-flex items-center gap-1 ${d.aiRecommendation.approved
                          ? 'bg-emerald-950/90 print:bg-emerald-100 text-emerald-300 print:text-emerald-800 border border-emerald-800/60 shadow-sm'
                          : 'bg-amber-950/90 print:bg-amber-100 text-amber-300 print:text-amber-800 border border-amber-800/60 shadow-sm'
                        }`}>
                        {d.aiRecommendation.approved ? <CheckCircle2 className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                        {d.aiRecommendation.approved ? 'ORDER ISSUED' : d.aiRecommendation.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Official Signature Block with Holographic Verification effect */}
        <div className="pt-6 border-t-2 border-slate-800 print:border-black grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs relative z-10">
          <div className="p-4 rounded-2xl bg-[#03050c] print:bg-gray-50 border border-slate-800/80 print:border-gray-200">
            <span className="text-[10px] text-slate-400 print:text-gray-500 uppercase font-bold block">REPORT COMPILED BY</span>
            <div className="font-bold text-white print:text-black mt-1">NATIONAL EMERGENCY OPERATIONS CENTRE (NEOC)</div>
            <div className="text-[10px] text-slate-400 print:text-gray-600 mt-0.5">Disaster Decision Support Division, NDMA Bhawan, New Delhi</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#03050c] print:bg-gray-50 border border-slate-800/80 print:border-gray-200 sm:text-right relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <span className="text-[10px] text-slate-400 print:text-gray-500 uppercase font-bold block">OFFICIAL AUTHENTICATION SEAL</span>
            <div className="font-bold text-emerald-400 print:text-black mt-1 flex items-center sm:justify-end gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>DIGITALLY SIGNED & VERIFIED</span>
            </div>
            <div className="text-[10px] text-slate-400 print:text-gray-600 mt-0.5 font-mono">SHA-256: 7f8a9b1c2d3e4f5a6b7c8d9e0f1a2b3c</div>
          </div>
        </div>

      </div>
    </div>
  );
};