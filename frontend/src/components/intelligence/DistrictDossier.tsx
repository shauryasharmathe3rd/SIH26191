import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  AlertTriangle,
  Users,
  Activity,
  Compass,
  CheckCircle2,
  BrainCircuit,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Flame,
  Truck,
  Clock,
  FileCheck,
  Zap,
  Sliders,
  Printer,
  ShieldAlert,
  Radio,
  Sparkles,
  Layers,
  Award,
  Shield,
  Fingerprint,
  Terminal,
  Cpu,
  Radar
} from 'lucide-react';
import { useDisaster } from '../../context/DisasterContext';
import { StatusBadge } from '../common/StatusBadge';
import { RiskScoreGauge } from '../common/RiskScoreGauge';
import { DataTransparencyBadge } from '../common/DataTransparencyBadge';

// Spatial Holographic Officer Card with Skeuomorphic Metal Bevels & Editorial Typography
const OfficerVCard: React.FC<{ officerName: string; designation: string; state: string }> = ({
  officerName,
  designation,
  state
}) => (
  <motion.div
    whileHover={{ y: -3, scale: 1.01 }}
    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-slate-950/90 backdrop-blur-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_-2px_4px_rgba(0,0,0,0.9)] relative overflow-group group"
  >
    {/* Spatial Ambient Light Halo */}
    <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent pointer-events-none" />

    <div className="flex items-center justify-between gap-3 relative z-10">
      <div className="flex items-center gap-3.5">
        <div className="relative">
          {/* Skeuomorphic Beveled Badge Frame */}
          <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-500/50 to-blue-500/50 opacity-75 blur-sm group-hover:opacity-100 transition duration-500" />
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-b from-slate-800 to-slate-950 flex items-center justify-center font-mono font-black text-cyan-300 text-xs border border-cyan-500/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),0_4px_10px_rgba(0,0,0,0.5)]">
            {officerName.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-extrabold text-white tracking-widest uppercase">{officerName}</span>
            <Fingerprint className="w-3.5 h-3.5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>
          <div className="text-[10px] text-slate-300 font-sans tracking-wide mt-0.5">{designation}</div>
          <div className="text-[9px] font-mono text-cyan-400 tracking-widest mt-1 flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shadow-[0_0_8px_rgba(52,211,153,1)]" />
            SEC-AUTH // {state}
          </div>
        </div>
      </div>
      <div className="text-right">
        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[9px] font-mono bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_15px_rgba(16,185,129,0.3)] backdrop-blur-md">
          L-5 CLEARANCE
        </span>
      </div>
    </div>
  </motion.div>
);

export const DistrictDossier: React.FC = () => {
  const {
    selectedDistrict,
    approveAiRecommendation,
    setActiveTab,
    language
  } = useDisaster();

  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [officerName, setOfficerName] = useState('Dr. Rajesh Sharma, IAS');
  const [designation, setDesignation] = useState('District Magistrate & DDMA Chairman');
  const [actionSuccess, setActionSuccess] = useState(false);

  if (!selectedDistrict) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full flex flex-col items-center justify-center p-8 text-center bg-[#020617] border-l border-white/10 text-slate-400 font-mono text-xs backdrop-blur-3xl"
      >
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" />
          <Compass className="w-14 h-14 text-cyan-400 relative z-10 animate-spin" style={{ animationDuration: '25s' }} />
        </div>
        <span className="tracking-[0.25em] text-slate-200 font-bold mb-1.5 text-xs">NO JURISDICTION SELECTED</span>
        <span className="text-slate-500 max-w-xs text-[11px] font-sans">SELECT A SECTOR FROM THE RADAR MAP OR HEADER TO INITIALIZE SPATIAL DOSSIER INTEL.</span>
      </motion.div>
    );
  }

  const {
    name,
    state,
    code,
    riskScore,
    riskLevel,
    primaryHazard,
    secondaryHazard,
    exposedPopulation,
    totalPopulation,
    vulnerableDemographics,
    carryingCapacity,
    vulnerability,
    aiRecommendation,
    weatherTelemetry,
    dataSources,
    lastUpdated
  } = selectedDistrict;

  const handleApprove = (e: React.FormEvent) => {
    e.preventDefault();
    approveAiRecommendation(aiRecommendation.id, officerName, designation);
    setApprovalModalOpen(false);
    setActionSuccess(true);
    setTimeout(() => setActionSuccess(false), 5000);
  };

  const isCritical = riskLevel === 'CRITICAL';

  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="h-full flex flex-col bg-[#020617]/98 backdrop-blur-3xl border-l border-white/10 overflow-y-auto text-slate-100 font-sans relative shadow-[-30px_0_60px_rgba(0,0,0,0.9)] scrollbar-thin scrollbar-thumb-slate-800"
    >
      {/* Gradient Luminous Mesh Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-rose-500 z-30 shadow-[0_0_25px_rgba(6,182,212,0.9)]" />

      {/* Editorial Header Section */}
      <div className="p-5 bg-gradient-to-b from-slate-900/90 via-slate-900/40 to-transparent border-b border-white/10 relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-56 h-56 bg-gradient-to-br from-cyan-500/15 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-slate-950/90 border border-cyan-500/40 rounded-lg font-mono text-[10px] text-cyan-300 font-bold shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] flex items-center gap-1.5 backdrop-blur-md">
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              {code}
            </span>
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-[0.2em] flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-slate-500" />
              DOSSIER // 2026.ED
            </span>
          </div>
          <StatusBadge severity={riskLevel} size="sm" pulse={isCritical} />
        </div>

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {name}
              {isCritical && (
                <motion.span
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[9px] font-mono bg-rose-950/90 text-rose-400 border border-rose-500/60 shadow-[0_0_20px_rgba(244,63,94,0.6)] backdrop-blur-md"
                >
                  CRITICAL THREAT
                </motion.span>
              )}
            </h2>
            <p className="text-xs text-slate-400 font-mono tracking-wide mt-1">
              ADMINISTRATIVE JURISDICTION: <strong className="text-slate-200">{state}</strong>
            </p>
          </div>
          <div className="p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_8px_20px_rgba(0,0,0,0.5)]">
            <RiskScoreGauge score={riskScore} size="md" />
          </div>
        </div>

        {/* Hazard Editorial Strip */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs font-mono relative z-10">
          <span className="text-slate-400 flex items-center gap-1 tracking-wider uppercase text-[10px]">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> Primary Hazard:
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-rose-950/70 border border-rose-500/50 text-rose-300 font-semibold shadow-[0_0_15px_rgba(244,63,94,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-md">
            {primaryHazard}
          </span>
          {secondaryHazard && (
            <>
              <span className="text-slate-600">/</span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-950/70 border border-amber-500/50 text-amber-300 backdrop-blur-md shadow-[0_0_15px_rgba(251,191,36,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)]">
                {secondaryHazard}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Main Spatial Dossier Layout */}
      <div className="p-4 space-y-4 flex-1">
        {/* Success Alert Banner */}
        <AnimatePresence>
          {actionSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3.5 bg-emerald-950/95 border border-emerald-500/60 backdrop-blur-3xl rounded-2xl text-xs font-mono text-emerald-200 flex items-start gap-3 shadow-[0_0_30px_rgba(16,185,129,0.4),inset_0_1px_2px_rgba(255,255,255,0.3)]"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 drop-shadow-[0_0_10px_rgba(52,211,153,1)]" />
              <div>
                <div className="font-bold tracking-widest text-emerald-300">STATUTORY RELOCATION ORDER EXECUTED</div>
                <div className="text-[11px] text-emerald-400/90 mt-0.5 font-sans">
                  Collector Dispatch ID #{aiRecommendation.orderNumber} authorized under Disaster Management Act, 2005. Convoys rolling.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. OFFICER SPATIAL V-CARD */}
        <OfficerVCard officerName={officerName} designation={designation} state={state} />

        {/* 2. AI DECISION ENGINE CARD (Gradient UI + Spatial Depth) */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="p-4 rounded-2xl border border-amber-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-amber-950/30 backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.25)] relative overflow-hidden group"
        >
          <div className="absolute -right-16 -top-16 w-40 h-40 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/15 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-b from-amber-500/20 to-amber-600/10 border border-amber-500/50 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]">
                <BrainCircuit className="w-4 h-4 text-amber-400 animate-pulse" />
              </div>
              <span className="font-mono text-xs font-black uppercase tracking-[0.15em] text-amber-300 flex items-center gap-1.5">
                AI DECISION MATRIX
                <Sparkles className="w-3.5 h-3.5 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.9)]" />
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold bg-amber-950/90 text-amber-300 border border-amber-500/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_15px_rgba(251,191,36,0.3)] backdrop-blur-md">
              CONFIDENCE: {aiRecommendation.confidenceScore}%
            </span>
          </div>

          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase font-bold text-rose-400 tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping shadow-[0_0_12px_rgba(244,63,94,1)]" />
                {aiRecommendation.priorityLabel}
              </span>
              <span className="text-[10px] font-mono text-slate-300 flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-md shadow-inner">
                <Clock className="w-3 h-3 text-amber-400" />
                WINDOW: <strong className="text-white">{aiRecommendation.recommendedEvacuationWindow}</strong>
              </span>
            </div>

            <div className="text-xs text-white font-bold leading-snug tracking-wide">
              {aiRecommendation.actionTitle}
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-white/10 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
              {aiRecommendation.executiveSummary}
            </p>

            {/* Explainable Risk Factors (Editorial Layout) */}
            <div className="pt-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-amber-400 font-bold block mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Explainable Risk Rationale:
              </span>
              <div className="space-y-2">
                {(aiRecommendation.explainableFactors || []).map((f, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-[11px] transition-all hover:border-white/20 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono font-bold text-slate-200 tracking-wide">{f.factor}</span>
                      <span className="font-mono text-[10px] text-amber-300 font-bold bg-amber-950/90 px-2 py-0.5 rounded border border-amber-500/40 shadow-inner">WEIGHT: {f.weightPercent}%</span>
                    </div>
                    <div className="text-[10px] font-mono text-rose-400 font-bold mb-1">{f.indicatorValue}</div>
                    <div className="text-[10px] text-slate-400 leading-normal font-sans">{f.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logistics Grid with Skeuomorphic Inset Panels */}
            <div className="pt-1 grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/10 flex flex-col justify-between backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">Target Population</span>
                <span className="text-sm font-black text-white font-mono mt-1">
                  {aiRecommendation.populationToRelocate.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/10 flex flex-col justify-between backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">Convoy Units</span>
                <span className="text-[11px] font-bold text-amber-300 font-mono mt-1 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  {aiRecommendation.requiredTransportUnits.buses} Buses • {aiRecommendation.requiredTransportUnits.ndrfPersonnel} NDRF
                </span>
              </div>
            </div>

            {/* Skeuomorphic Action Buttons with Tactile Depression */}
            <div className="pt-2 flex flex-col gap-2.5">
              {aiRecommendation.approved ? (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-xs font-mono text-emerald-300 backdrop-blur-md shadow-inner">
                  <div className="font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    RELOCATION ORDER EXECUTED
                  </div>
                  <div className="text-[10px] text-emerald-400/90 mt-1 font-sans">
                    Authorized By: {aiRecommendation.approvedBy} at {aiRecommendation.approvalTimestamp}
                  </div>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97, boxShadow: "inset 0 4px 6px rgba(0,0,0,0.8)" }}
                  onClick={() => setApprovalModalOpen(true)}
                  className="w-full py-3.5 bg-gradient-to-r from-rose-600 via-rose-700 to-red-600 hover:from-rose-500 hover:to-rose-600 text-white font-mono text-xs font-extrabold uppercase tracking-[0.15em] rounded-xl shadow-[0_6px_25px_rgba(244,63,94,0.6),inset_0_1px_2px_rgba(255,255,255,0.3)] border border-rose-500/60 transition-all flex items-center justify-center gap-2 group backdrop-blur-md"
                >
                  <FileCheck className="w-4 h-4 transition-transform group-hover:scale-110" />
                  Approve Statutory Relocation Order
                </motion.button>
              )}

              <div className="grid grid-cols-2 gap-2">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTab('scenario_simulation')}
                  className="py-2.5 px-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-slate-200 font-mono text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-md"
                >
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  Simulate Scenario
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTab('carrying_capacity')}
                  className="py-2.5 px-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-slate-200 font-mono text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-md"
                >
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  Capacity Matrix
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. DEMOGRAPHIC & EXPOSURE CARD */}
        <div className="p-4 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-transparent backdrop-blur-3xl shadow-[0_12px_35px_rgba(0,0,0,0.6)]">
          <span className="font-mono text-xs uppercase font-black tracking-[0.15em] text-slate-200 block mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            Demographic & Exposure Breakdown
          </span>

          <div className="grid grid-cols-2 gap-2.5 text-xs font-mono mb-3">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-white/10 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">Total Inhabitants</span>
              <span className="text-sm font-black text-white mt-1 block">
                {totalPopulation.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-rose-500/40 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_0_15px_rgba(244,63,94,0.15)]">
              <span className="text-[10px] text-rose-400 block uppercase tracking-wider font-bold">Directly Exposed</span>
              <span className="text-sm font-black text-rose-400 mt-1 block">
                {exposedPopulation.toLocaleString('en-IN')} <span className="text-[10px] font-normal text-slate-400">({((exposedPopulation / totalPopulation) * 100).toFixed(1)}%)</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
            <div className="p-2.5 bg-slate-950/70 rounded-xl border border-white/10 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
              <span className="text-[9px] text-slate-400 block uppercase tracking-wider">Elderly (60+)</span>
              <span className="font-black text-amber-300 mt-1 block">{vulnerableDemographics.elderly.toLocaleString('en-IN')}</span>
            </div>
            <div className="p-2.5 bg-slate-950/70 rounded-xl border border-white/10 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
              <span className="text-[9px] text-slate-400 block uppercase tracking-wider">Children (&lt;10)</span>
              <span className="font-black text-amber-300 mt-1 block">{vulnerableDemographics.children.toLocaleString('en-IN')}</span>
            </div>
            <div className="p-2.5 bg-slate-950/70 rounded-xl border border-white/10 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
              <span className="text-[9px] text-slate-400 block uppercase tracking-wider">Livestock</span>
              <span className="font-black text-emerald-400 mt-1 block">{vulnerableDemographics.livestockCount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* 4. CARRYING CAPACITY STATUS CARD */}
        <div className="p-4 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-transparent backdrop-blur-3xl shadow-[0_12px_35px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <span className="font-mono text-xs uppercase font-black tracking-[0.15em] text-slate-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Carrying Capacity Balance
            </span>
            <span className="font-mono text-[11px] font-bold px-2.5 py-1 bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 rounded-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_15px_rgba(16,185,129,0.3)] backdrop-blur-md">
              {carryingCapacity.compositeCapacityRatio}% INDEX
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            {[
              carryingCapacity.shelterBeds,
              carryingCapacity.potableWater,
              carryingCapacity.medicalIcuBeds,
              carryingCapacity.roadEvacuationFlow,
            ].map((metric, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-950/70 border border-white/10 flex items-center justify-between gap-2 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
                <div className="overflow-hidden">
                  <div className="text-[11px] text-slate-200 font-bold tracking-wide truncate">{metric.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-sans">
                    {metric.current.toLocaleString('en-IN')} / {metric.max.toLocaleString('en-IN')} {metric.unit}
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap backdrop-blur-md shadow-inner ${metric.status === 'SURPLUS' ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]' :
                  metric.status === 'ADEQUATE' ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]' :
                    metric.status === 'DEFICIT' ? 'bg-amber-950/90 text-amber-300 border border-amber-500/40 shadow-[0_0_12px_rgba(251,191,36,0.25)]' :
                      'bg-rose-950/90 text-rose-300 border border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
                  }`}>
                  {metric.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. HYDROMETEOROLOGICAL SENSOR TELEMETRY */}
        <div className="p-4 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-transparent backdrop-blur-3xl shadow-[0_12px_35px_rgba(0,0,0,0.6)] font-mono text-xs">
          <span className="text-xs uppercase font-black tracking-[0.15em] text-slate-200 block mb-3 flex items-center gap-2">
            <Radar className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '12s' }} />
            Sensor Telemetry &amp; Weather Array
          </span>
          <div className="grid grid-cols-2 gap-2.5 text-[11px]">
            <div className="p-3 bg-slate-950/70 rounded-xl border border-white/10 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Rainfall (24h)</span>
              <span className="text-white font-black mt-1 block">{weatherTelemetry.rainfall24hMm} mm</span>
            </div>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-white/10 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Forecast (6h)</span>
              <span className="text-amber-400 font-black mt-1 block">{weatherTelemetry.rainfallForecastNext6hMm} mm</span>
            </div>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-white/10 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Soil Saturation</span>
              <span className="text-rose-400 font-black mt-1 block">{weatherTelemetry.soilMoisturePercent}%</span>
            </div>
            {weatherTelemetry.riverDischargeCusecs && (
              <div className="p-3 bg-slate-950/70 rounded-xl border border-white/10 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">River Discharge</span>
                <span className="text-white font-black mt-1 block">{weatherTelemetry.riverDischargeCusecs.toLocaleString('en-IN')} cusecs</span>
              </div>
            )}
          </div>
        </div>

        {/* 6. DATA TRANSPARENCY BADGE */}
        <div className="pt-1 pb-2">
          <DataTransparencyBadge
            sources={dataSources}
            lastUpdated={lastUpdated}
            confidence={aiRecommendation.confidenceScore}
            className="w-full shadow-2xl rounded-2xl border border-white/15 bg-slate-900/80 backdrop-blur-3xl"
          />
        </div>
      </div>

      {/* STATUTORY RELOCATION APPROVAL MODAL */}
      <AnimatePresence>
        {approvalModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-3xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-slate-950/98 border border-rose-500/60 backdrop-blur-3xl rounded-3xl shadow-[0_0_80px_rgba(244,63,94,0.4),inset_0_1px_2px_rgba(255,255,255,0.3)] p-4 sm:p-6 font-sans relative"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-3.5 pb-4 mb-4 border-b border-white/15 relative z-10">
                <div className="p-2.5 bg-rose-950/90 rounded-xl border border-rose-500/50 backdrop-blur-md shadow-[0_0_25px_rgba(244,63,94,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)]">
                  <AlertTriangle className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <h3 className="font-mono text-xs font-black text-white uppercase tracking-[0.15em]">
                    Statutory Relocation Authorization Order
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Under Sections 30 &amp; 34 of Disaster Management Act, 2005
                  </p>
                </div>
              </div>

              <form onSubmit={handleApprove} className="space-y-4 text-xs relative z-10">
                <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-white/15 text-slate-300 font-mono text-[11px] space-y-2 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <div>Target District: <strong className="text-white">{name} ({state})</strong></div>
                  <div>Relocation Population: <strong className="text-rose-400 font-black">{aiRecommendation.populationToRelocate.toLocaleString('en-IN')} citizens</strong></div>
                  <div>Execution Window: <strong className="text-amber-400 font-bold">{aiRecommendation.recommendedEvacuationWindow}</strong></div>
                  <div>Designated Shelters: <strong className="text-slate-200">{aiRecommendation.designatedShelterNames.join(', ')}</strong></div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                    Authorizing Officer Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={officerName}
                    onChange={(e) => setOfficerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900/95 border border-white/20 rounded-xl text-slate-100 font-mono text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                    Official Designation / Authority:
                  </label>
                  <input
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900/95 border border-white/20 rounded-xl text-slate-100 font-mono text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"
                  />
                </div>

                <div className="p-3.5 bg-rose-950/70 border border-rose-500/50 rounded-xl text-[11px] font-mono text-rose-200 leading-relaxed backdrop-blur-md shadow-sm">
                  ⚠️ This action triggers official dispatch orders to District Police, NDRF Commandant, and generates a legally binding statutory mandate.
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/15">
                  <button
                    type="button"
                    onClick={() => setApprovalModalOpen(false)}
                    className="px-4 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-slate-300 font-mono text-xs rounded-xl transition-all backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-mono text-xs font-black uppercase tracking-wider rounded-xl shadow-[0_6px_25px_rgba(244,63,94,0.6),inset_0_1px_2px_rgba(255,255,255,0.3)] border border-rose-500/50 transition-all backdrop-blur-md"
                  >
                    Authorize &amp; Issue Order
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};