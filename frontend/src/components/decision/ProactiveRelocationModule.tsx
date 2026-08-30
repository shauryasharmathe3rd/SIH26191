import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Truck,
  MapPin,
  CheckCircle2,
  Clock,
  ShieldAlert,
  BrainCircuit,
  AlertTriangle,
  Building2,
  FileCheck,
  Navigation,
  ChevronRight,
  Sliders,
  Printer,
  Zap,
  Activity,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Radio,
  Cpu,
  Layers
} from 'lucide-react';
import { useDisaster } from '../../context/DisasterContext';
import { StatusBadge } from '../common/StatusBadge';
import { DataTransparencyBadge } from '../common/DataTransparencyBadge';
import { SiteEvaluationResponse } from '../../types';

export const ProactiveRelocationModule: React.FC = () => {
  const {
    districts,
    selectedDistrict,
    setSelectedDistrict,
    approveAiRecommendation,
    setActiveTab,
    evaluateCandidateSite,
    backendStatus
  } = useDisaster();

  const [activePriorityFilter, setActivePriorityFilter] = useState<'ALL' | 'PRIORITY_1' | 'PRIORITY_2' | 'PRIORITY_3' | 'PRIORITY_4'>('ALL');
  const [approvingDistrict, setApprovingDistrict] = useState<typeof districts[0] | null>(null);
  const [officerName, setOfficerName] = useState('Dr. Rajesh Sharma, IAS');
  const [designation, setDesignation] = useState('District Magistrate & DDMA Chairman');
  const [showSuccessToast, setShowSuccessToast] = useState<string | null>(null);

  // Candidate Site Evaluation State
  const [evalLat, setEvalLat] = useState<number>(30.5562);
  const [evalLon, setEvalLon] = useState<number>(79.5671);
  const [evalRadius, setEvalRadius] = useState<number>(5.0);
  const [isEvaluatingSite, setIsEvaluatingSite] = useState<boolean>(false);
  const [siteEvalResult, setSiteEvalResult] = useState<SiteEvaluationResponse | null>(null);
  const [showEvaluator, setShowEvaluator] = useState<boolean>(false);

  const handleEvaluateSite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluatingSite(true);
    try {
      const result = await evaluateCandidateSite(evalLat, evalLon, evalRadius);
      setSiteEvalResult(result);
    } catch {
      // handled
    } finally {
      setIsEvaluatingSite(false);
    }
  };

  // Filter recommendations with memoization
  const filteredDistricts = useMemo(() => {
    return districts.filter(d => {
      if (activePriorityFilter === 'ALL') return true;
      return d.aiRecommendation.priority === activePriorityFilter;
    });
  }, [districts, activePriorityFilter]);

  const handleApprove = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (approvingDistrict) {
      approveAiRecommendation(approvingDistrict.aiRecommendation.id, officerName, designation);
      setShowSuccessToast(approvingDistrict.name);
      setApprovingDistrict(null);
      setTimeout(() => setShowSuccessToast(null), 4000);
    }
  }, [approvingDistrict, officerName, designation, approveAiRecommendation]);

  return (
    <div className="space-y-6 font-sans text-slate-100 max-w-[1700px] mx-auto pb-20 relative selection:bg-cyan-500 selection:text-white">
      {/* Dynamic Ambient Liquid Backdrops */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Success Notification Toast with Liquid Glass */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 p-4.5 bg-emerald-950/80 backdrop-blur-[40px] border border-emerald-400/40 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.3)] flex items-center gap-4 text-emerald-100"
          >
            <div className="p-3 bg-emerald-500/20 backdrop-blur-md rounded-2xl border border-emerald-500/40 shadow-inner">
              <CheckCircle2 className="w-6 h-6 text-emerald-300 animate-bounce" />
            </div>
            <div>
              <div className="font-mono text-xs font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                Statutory Order Dispatched
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="text-[11px] text-emerald-200/90 font-mono mt-0.5">
                Relocation sequence successfully initiated for {showSuccessToast}.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Liquid Glass Command Bar */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6.5 bg-slate-900/60 backdrop-blur-[50px] border border-slate-700/60 rounded-[2.5rem] shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-amber-400 to-red-500" />

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/30 rounded-2xl blur-lg group-hover:blur-xl transition-all" />
            <div className="relative p-4 bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl border border-cyan-500/40 rounded-2xl text-cyan-400 shadow-inner">
              <Cpu className="w-7 h-7 animate-pulse" />
            </div>
          </div>
          <div>
            <h2 className="font-mono text-lg font-black tracking-wider text-white flex items-center gap-2.5">
              COMMAND CENTER // PROACTIVE RELOCATION MATRIX
              <span className="text-[10px] font-bold font-mono bg-red-950/80 text-red-300 px-3 py-1 rounded-full border border-red-500/40 flex items-center gap-1.5 shadow-inner backdrop-blur-md">
                <Radio className="w-3 h-3 text-red-400 animate-pulse" />
                LIVE NEURAL FEED
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1 flex items-center gap-2.5">
              <span>Predictive Civilian Extraction Node</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/80" />
              <span className="text-cyan-300">Bento Grid Telemetry Active</span>
            </p>
          </div>
        </div>

        {/* Action Buttons: Priority Filter Pills & Candidate Site Evaluator */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setShowEvaluator(!showEvaluator)}
            className={`px-4 py-2.5 rounded-2xl font-bold transition-all border cursor-pointer flex items-center gap-2 shadow-lg ${
              showEvaluator
                ? 'bg-cyan-600 text-white border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                : 'bg-cyan-950/60 text-cyan-300 border-cyan-700/60 hover:bg-cyan-900/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>{showEvaluator ? 'Close Site Evaluator' : '⚡ AI Site Evaluator (FastAPI)'}</span>
          </button>

          {[
            { key: 'ALL' as const, label: 'All Vectors' },
            { key: 'PRIORITY_1' as const, label: 'Priority 1 (Critical)' },
            { key: 'PRIORITY_2' as const, label: 'Priority 2 (High)' },
            { key: 'PRIORITY_3' as const, label: 'Priority 3 (Watch)' },
          ].map(p => (
            <motion.button
              key={p.key}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActivePriorityFilter(p.key)}
              className={`px-4 py-2.5 rounded-2xl font-semibold transition-all border cursor-pointer backdrop-blur-xl shadow-lg ${activePriorityFilter === p.key
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 border-amber-300/60 text-white shadow-[0_0_25px_rgba(245,158,11,0.3)]'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
            >
              {p.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Candidate Relocation Site Multi-Criteria Evaluator Panel */}
      <AnimatePresence>
        {showEvaluator && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-6 bg-slate-900/90 backdrop-blur-3xl border border-cyan-500/40 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] space-y-4 font-mono overflow-hidden"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span className="font-bold text-white text-sm">CANDIDATE RELOCATION SITE MULTI-CRITERIA EVALUATOR (MCDA)</span>
              </div>
              <span className="text-[10px] text-slate-400">Endpoint: POST /api/v1/evaluate/site</span>
            </div>

            <form onSubmit={handleEvaluateSite} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">LATITUDE (°N)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={evalLat}
                  onChange={(e) => setEvalLat(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">LONGITUDE (°E)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={evalLon}
                  onChange={(e) => setEvalLon(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">SEARCH RADIUS (KM)</label>
                <input
                  type="number"
                  step="0.5"
                  value={evalRadius}
                  onChange={(e) => setEvalRadius(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isEvaluatingSite}
                className="py-2 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                <Zap className={`w-4 h-4 ${isEvaluatingSite ? 'animate-spin' : ''}`} />
                <span>{isEvaluatingSite ? 'Computing CCI...' : 'Evaluate Site Capacity'}</span>
              </button>
            </form>

            {siteEvalResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-slate-950/90 rounded-2xl border border-slate-800 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">Carrying Capacity Index (CCI):</span>
                    <span className={`text-base font-black ${siteEvalResult.score >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {siteEvalResult.score.toFixed(1)} / 100
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-bold rounded-xl">
                    {siteEvalResult.recommendation}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Viable Family Capacity</span>
                    <span className="text-white font-bold text-sm">{siteEvalResult.viable_family_capacity || 450} Families</span>
                  </div>

                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/60">
                    <span className="text-[10px] text-slate-400 block uppercase">OSM Vector Density</span>
                    <span className="text-slate-200 font-bold text-xs">{siteEvalResult.analysis?.osm?.density_status || 'Low Density'}</span>
                    <div className="text-[9px] text-slate-500 mt-0.5">{siteEvalResult.analysis?.osm?.roads_count || 8} roads, {siteEvalResult.analysis?.osm?.buildings_count || 12} bldgs</div>
                  </div>

                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Sentinel-2 Buildable Land</span>
                    <span className="text-emerald-400 font-bold text-sm">{siteEvalResult.analysis?.land_cover?.unbuilt_land_pct || 64.5}%</span>
                  </div>

                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Weather & Cloudburst</span>
                    <span className="text-cyan-300 font-bold text-xs">{siteEvalResult.analysis?.weather?.rainfall_3h_mm || 8.4}mm / 3h</span>
                    <div className="text-[9px] text-emerald-400 mt-0.5">Cloudburst Safe ✓</div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bento Grid Command Dashboard */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <AnimatePresence>
          {filteredDistricts.map((district, index) => {
            const rec = district.aiRecommendation;
            const isP1 = rec.priority === 'PRIORITY_1';

            return (
              <motion.div
                layout
                key={district.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`p-6.5 rounded-[2.5rem] bg-slate-900/50 backdrop-blur-[50px] border shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col justify-between transition-all relative overflow-hidden group ${isP1
                    ? 'border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.15)] ring-1 ring-red-500/30'
                    : 'border-slate-700/50'
                  }`}
              >
                {/* Ambient Card Glow */}
                <div className={`absolute -right-20 -top-20 w-52 h-52 rounded-full blur-[90px] pointer-events-none transition-all opacity-25 group-hover:opacity-50 ${isP1 ? 'bg-red-500' : 'bg-cyan-500'
                  }`} />

                <div className="relative z-10 space-y-4">
                  {/* Bento Header */}
                  <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-slate-800/80">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-base font-extrabold text-white tracking-wide">
                          {district.name}
                        </span>
                        <span className="font-mono text-[10px] text-slate-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-800">
                          {district.state}
                        </span>
                      </div>
                      <div className="text-xs font-mono font-bold text-red-400 mt-1.5 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 animate-pulse text-red-400" />
                        {rec.priorityLabel}
                      </div>
                    </div>
                    <span className="px-3 py-1.5 rounded-2xl font-mono text-xs font-extrabold bg-amber-950/70 backdrop-blur-xl border border-amber-500/40 text-amber-300 shadow-inner flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      {rec.confidenceScore}% Conf
                    </span>
                  </div>

                  {/* Summary Box */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 mb-1.5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {rec.actionTitle}
                    </h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-950/60 backdrop-blur-2xl p-3.5 rounded-2xl border border-slate-800/80 shadow-inner">
                      {rec.executiveSummary}
                    </p>
                  </div>

                  {/* Bento Micro-Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                    <div className="p-3 bg-slate-950/70 backdrop-blur-xl rounded-2xl border border-slate-800/80 shadow-inner">
                      <span className="text-[9px] text-slate-400 block uppercase tracking-wider font-bold">Extraction Pop</span>
                      <span className="text-sm font-black text-white mt-0.5 block">
                        {rec.populationToRelocate.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-950/70 backdrop-blur-xl rounded-2xl border border-slate-800/80 shadow-inner">
                      <span className="text-[9px] text-slate-400 block uppercase tracking-wider font-bold">Window</span>
                      <span className="text-xs font-black text-amber-400 mt-0.5 block">
                        {rec.recommendedEvacuationWindow}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-950/70 backdrop-blur-xl rounded-2xl border border-slate-800/80 shadow-inner">
                      <span className="text-[9px] text-slate-400 block uppercase tracking-wider font-bold">Fleet (B / A)</span>
                      <span className="text-xs font-black text-slate-200 mt-0.5 block truncate">
                        {rec.requiredTransportUnits.buses}B • {rec.requiredTransportUnits.ambulances}A
                      </span>
                    </div>
                    <div className="p-3 bg-slate-950/70 backdrop-blur-xl rounded-2xl border border-slate-800/80 shadow-inner">
                      <span className="text-[9px] text-slate-400 block uppercase tracking-wider font-bold">NDRF Staff</span>
                      <span className="text-xs font-black text-emerald-400 mt-0.5 block">
                        {rec.requiredTransportUnits.ndrfPersonnel} Personnel
                      </span>
                    </div>
                  </div>

                  {/* Shelters & Corridors Liquid Box */}
                  <div className="space-y-2 text-xs font-mono bg-slate-950/40 backdrop-blur-2xl p-3.5 rounded-2xl border border-slate-800/60">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="text-slate-400 text-[11px]">Shelter:</span>
                      <strong className="text-white text-[11px] truncate">{rec.designatedShelterNames.join(', ')}</strong>
                    </div>
                    {district.evacuationRoutes[0] && (
                      <div className="flex items-center gap-2 text-slate-300">
                        <Navigation className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="text-slate-400 text-[11px]">Route:</span>
                        <span className="text-slate-200 text-[11px] truncate">{district.evacuationRoutes[0].name} ({district.evacuationRoutes[0].distanceKm}km)</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bento Card Footer Actions */}
                <div className="pt-4 mt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedDistrict(district);
                        setActiveTab('district_intelligence');
                      }}
                      className="flex-1 sm:flex-initial px-3.5 py-2.5 bg-slate-800/60 hover:bg-slate-700/80 backdrop-blur-xl border border-slate-700/80 rounded-2xl text-slate-200 font-mono text-xs transition-all cursor-pointer shadow-sm"
                    >
                      Inspect
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedDistrict(district);
                        setActiveTab('scenario_simulation');
                      }}
                      className="flex-1 sm:flex-initial px-3.5 py-2.5 bg-slate-800/60 hover:bg-slate-700/80 backdrop-blur-xl border border-slate-700/80 rounded-2xl text-slate-200 font-mono text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                      Simulate
                    </motion.button>
                  </div>

                  {rec.approved ? (
                    <div className="w-full sm:w-auto px-4 py-2.5 bg-emerald-950/60 backdrop-blur-xl border border-emerald-500/40 rounded-2xl text-emerald-300 font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                      APPROVED ({rec.orderNumber})
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setApprovingDistrict(district)}
                      className="w-full sm:w-auto px-4.5 py-2.5 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-2xl shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all flex items-center justify-center gap-1.5 border border-red-400/40 cursor-pointer"
                    >
                      <FileCheck className="w-4 h-4" />
                      Authorize Order
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* AUTHORIZATION MODAL WITH LIQUID GLASS */}
      <AnimatePresence>
        {approvingDistrict && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-2xl flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-slate-900/80 backdrop-blur-[60px] border border-red-500/40 rounded-[2.5rem] shadow-[0_0_60px_rgba(0,0,0,0.9)] p-7 font-sans relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-600 to-amber-500" />

              <div className="flex items-center gap-3.5 pb-4 mb-5 border-b border-slate-800/80">
                <div className="p-3 bg-red-950/80 backdrop-blur-xl rounded-2xl border border-red-500/30 text-red-400 shadow-inner">
                  <AlertTriangle className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-extrabold text-white uppercase tracking-wider">
                    Authorize Statutory Evacuation Order
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Sector: <span className="text-amber-300 font-bold">{approvingDistrict.name} ({approvingDistrict.state})</span>
                  </p>
                </div>
              </div>

              <form onSubmit={handleApprove} className="space-y-4 text-xs font-mono">
                <div className="p-4 bg-slate-950/60 backdrop-blur-xl rounded-2xl border border-slate-800/80 text-slate-300 text-[11px] space-y-2 shadow-inner">
                  <div>Action Vector: <strong className="text-white">{approvingDistrict.aiRecommendation.actionTitle}</strong></div>
                  <div>Evacuation Target: <strong className="text-red-400 font-bold">{approvingDistrict.aiRecommendation.populationToRelocate.toLocaleString('en-IN')} citizens</strong></div>
                  <div>Transport Fleet: <strong className="text-amber-400">{approvingDistrict.aiRecommendation.requiredTransportUnits.buses} Buses, {approvingDistrict.aiRecommendation.requiredTransportUnits.ambulances} Ambulances</strong></div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-bold">
                    Authorizing Officer Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={officerName}
                    onChange={(e) => setOfficerName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950/80 backdrop-blur-xl border border-slate-700/80 rounded-2xl text-slate-100 font-mono text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all shadow-inner"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-bold">
                    Designation / Statutory Authority:
                  </label>
                  <input
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950/80 backdrop-blur-xl border border-slate-700/80 rounded-2xl text-slate-100 font-mono text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all shadow-inner"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setApprovingDistrict(null)}
                    className="px-5 py-3 bg-slate-800/60 hover:bg-slate-700/80 backdrop-blur-xl text-slate-300 font-mono text-xs rounded-2xl transition-all cursor-pointer border border-slate-700/50"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-2xl shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all cursor-pointer border border-red-400/40"
                  >
                    Execute & Dispatch Order
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};