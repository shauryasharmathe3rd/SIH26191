import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sliders,
  RotateCcw,
  AlertTriangle,
  Droplets,
  Wind,
  Waves,
  Layers,
  Users,
  Activity,
  ShieldAlert,
  Zap,
  Gauge,
  Compass,
  Sparkles,
  ChevronRight,
  MapPin,
  Eye,
  Maximize2,
  Globe,
  Radio
} from 'lucide-react';
import { useDisaster } from '../../context/DisasterContext';
import { GISMap } from '../gis/GISMap';
import { StatusBadge } from '../common/StatusBadge';
import { SusceptibilityResponse } from '../../types';

export const ScenarioSimulator: React.FC = () => {
  const {
    selectedDistrict,
    simulationParams,
    updateSimulationParams,
    resetSimulationParams,
    districts,
    setSelectedDistrict,
    predictAISusceptibility,
    backendStatus
  } = useDisaster();

  const [isSimulating, setIsSimulating] = useState(false);
  const [aiInferenceLoading, setAiInferenceLoading] = useState(false);
  const [aiSusceptibilityResult, setAiSusceptibilityResult] = useState<SusceptibilityResponse | null>(null);
  const [activeLayers, setActiveLayers] = useState({
    floodHeatmap: true,
    evacRoutes: true,
    telemetrySensors: false,
    elevationContours: true
  });

  const district = selectedDistrict || districts[0];

  if (!district) {
    return (
      <div className="flex items-center justify-center p-16 text-slate-400 font-mono text-xs">
        <Zap className="w-5 h-5 animate-spin text-cyan-400 mr-2" />
        <span>Loading hydrodynamic scenario simulator from FastAPI backend...</span>
      </div>
    );
  }

  // Dynamic calculations
  const baselineRainfall = district.weatherTelemetry.rainfall24hMm;
  const simulatedRainfall = (baselineRainfall * simulationParams.rainfallMultiplier).toFixed(1);

  const baselinePop = district.exposedPopulation;
  const popExpansionFactor =
    (simulationParams.rainfallMultiplier - 1.0) * 0.45 +
    (simulationParams.damDischargeMultiplier - 1.0) * 0.35 +
    ((simulationParams.soilSaturation - 85) / 100) * 0.4;

  const simulatedExposedPop = Math.max(
    baselinePop,
    Math.round(baselinePop * (1 + Math.max(0, popExpansionFactor)))
  );

  const additionalPop = simulatedExposedPop - baselinePop;

  const baseWindowHours = 6.0;
  const simulatedWindowHours = Math.max(
    1.5,
    baseWindowHours / (simulationParams.rainfallMultiplier * (simulationParams.soilSaturation / 80))
  ).toFixed(1);

  const simulatedRiskScore = Math.min(
    99,
    Math.round(district.riskScore * Math.max(1, 1 + popExpansionFactor * 0.4))
  );

  const handleRunSimulation = () => {
    setIsSimulating(true);
    handleRunAiInference();
    setTimeout(() => setIsSimulating(false), 900);
  };

  const handleRunAiInference = async () => {
    setAiInferenceLoading(true);
    try {
      const res = await predictAISusceptibility({
        lat: district.coordinates[0],
        lon: district.coordinates[1],
        rainfall_mm: parseFloat(simulatedRainfall),
      });
      setAiSusceptibilityResult(res);
    } catch {
      // handled in context
    } finally {
      setAiInferenceLoading(false);
    }
  };

  const toggleLayer = (layerKey: keyof typeof activeLayers) => {
    setActiveLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  return (
    <div className="space-y-6 font-mono text-slate-100 max-w-[1600px] mx-auto pb-8 relative">
      {/* Terminal Grid Background Overlay / HUD Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

      {/* Top Command Bar (HUD & Glassmorphism) */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 bg-slate-900/90 backdrop-blur-xl border-2 border-cyan-500/30 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-amber-500 to-red-500 animate-pulse" />

        {/* HUD Corner Accents */}
        <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
        <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />

        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/40 rounded-xl text-amber-400 shadow-[inset_0_2px_4px_rgba(251,191,36,0.2)]">
            <Sliders className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="font-mono text-lg font-black tracking-widest text-white flex items-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              HYDRODYNAMIC & CLIMATE STRESS SIMULATOR
              <span className="text-[10px] font-semibold bg-cyan-950 text-cyan-300 px-2.5 py-0.5 rounded-full border border-cyan-700/60 shadow-inner">
                AI ENGINE V4.2 [GEOSPATIAL HUD]
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5 tracking-tight">
              &gt; Predictive geospatial modeling for flood inundation polygons, dam spillway surges, and terrain saturation.
            </p>
          </div>
        </div>

        {/* Sector Selector & Skeuomorphic Run Action */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950/90 border border-slate-700/80 px-3.5 py-2 rounded-xl font-mono text-xs shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
            <span className="text-slate-400">SECTOR://</span>
            <select
              value={district.id}
              onChange={(e) => {
                const found = districts.find(d => d.id === e.target.value);
                if (found) setSelectedDistrict(found);
              }}
              className="bg-transparent border-none text-amber-300 font-bold focus:outline-none cursor-pointer"
            >
              {districts.map(d => (
                <option key={d.id} value={d.id} className="bg-slate-900 text-slate-100">
                  {d.name} ({d.state})
                </option>
              ))}
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98, y: 1 }}
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="px-5 py-2.5 bg-gradient-to-b from-amber-500 via-orange-600 to-red-700 hover:from-amber-400 hover:to-red-600 text-white font-mono text-xs font-bold rounded-xl shadow-[0_6px_20px_rgba(220,38,38,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] flex items-center gap-2 border border-amber-400/50 transition-all cursor-pointer"
          >
            <Zap className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
            {isSimulating ? 'RECALCULATING...' : 'EXECUTE SIMULATION'}
          </motion.button>
        </div>
      </motion.div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Claymorphic Parameter Matrix & Sliders */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-5 space-y-5"
        >
          <div className="p-6 bg-slate-900/80 backdrop-blur-2xl border border-slate-700/80 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] space-y-6 relative">

            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                Scenario Parameter Matrix
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetSimulationParams}
                className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-700 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Defaults
              </motion.button>
            </div>

            {/* Slider 1: Precipitation Intensity */}
            <div className="space-y-2.5 p-3.5 bg-slate-950/40 rounded-2xl border border-slate-800/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-slate-300 flex items-center gap-2 font-medium">
                  <Droplets className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
                  Precipitation Intensity
                </span>
                <span className="font-bold text-cyan-300 bg-cyan-950/90 px-2.5 py-0.5 rounded-lg border border-cyan-800 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                  {simulationParams.rainfallMultiplier.toFixed(1)}x ({simulatedRainfall} mm)
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={simulationParams.rainfallMultiplier}
                onChange={(e) => updateSimulationParams({ rainfallMultiplier: parseFloat(e.target.value) })}
                className="w-full h-2.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-slate-700/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>0.5x (Drizzle)</span>
                <span>1.0x (Baseline)</span>
                <span>3.0x (Cloudburst)</span>
              </div>
            </div>

            {/* Slider 2: Dam Spillway Discharge */}
            <div className="space-y-2.5 p-3.5 bg-slate-950/40 rounded-2xl border border-slate-800/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-slate-300 flex items-center gap-2 font-medium">
                  <Waves className="w-4 h-4 text-blue-400 drop-shadow-[0_0_6px_rgba(96,165,250,0.6)]" />
                  Dam Spillway Discharge
                </span>
                <span className="font-bold text-blue-300 bg-blue-950/90 px-2.5 py-0.5 rounded-lg border border-blue-800 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                  {simulationParams.damDischargeMultiplier.toFixed(1)}x ({Math.round((district.weatherTelemetry.riverDischargeCusecs || 45000) * simulationParams.damDischargeMultiplier).toLocaleString('en-IN')} Cusecs)
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={simulationParams.damDischargeMultiplier}
                onChange={(e) => updateSimulationParams({ damDischargeMultiplier: parseFloat(e.target.value) })}
                className="w-full h-2.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-blue-400 border border-slate-700/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>0.5x (Min)</span>
                <span>1.0x (Regulated)</span>
                <span>3.0x (Emergency Peak)</span>
              </div>
            </div>

            {/* Slider 3: Soil Saturation */}
            <div className="space-y-2.5 p-3.5 bg-slate-950/40 rounded-2xl border border-slate-800/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-slate-300 flex items-center gap-2 font-medium">
                  <Layers className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                  Soil Saturation Level
                </span>
                <span className="font-bold text-red-400 bg-red-950/90 px-2.5 py-0.5 rounded-lg border border-red-800 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                  {simulationParams.soilSaturation}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                step="1"
                value={simulationParams.soilSaturation}
                onChange={(e) => updateSimulationParams({ soilSaturation: parseInt(e.target.value) })}
                className="w-full h-2.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-red-500 border border-slate-700/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>50% (Dry)</span>
                <span>75% (Moderate)</span>
                <span>100% (Liquefaction Risk)</span>
              </div>
            </div>

            {/* Slider 4: Wind Intensity */}
            <div className="space-y-2.5 p-3.5 bg-slate-950/40 rounded-2xl border border-slate-800/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-slate-300 flex items-center gap-2 font-medium">
                  <Wind className="w-4 h-4 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
                  Squall & Wind Velocity
                </span>
                <span className="font-bold text-amber-300 bg-amber-950/90 px-2.5 py-0.5 rounded-lg border border-amber-800 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                  {simulationParams.windIntensity} km/h
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="180"
                step="5"
                value={simulationParams.windIntensity}
                onChange={(e) => updateSimulationParams({ windIntensity: parseInt(e.target.value) })}
                className="w-full h-2.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-400 border border-slate-700/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>20 km/h (Breeze)</span>
                <span>90 km/h (Storm)</span>
                <span>180 km/h (Cyclone)</span>
              </div>
            </div>

            {/* Quick Stress Presets */}
            <div className="pt-3 border-t border-slate-800/80">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-2.5">
                Emergency Scenario Presets
              </span>
              <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateSimulationParams({ rainfallMultiplier: 2.2, soilSaturation: 98, damDischargeMultiplier: 2.0 })}
                  className="p-3.5 bg-gradient-to-br from-red-950/60 to-slate-900 border border-red-800/80 rounded-2xl text-left text-red-200 transition-all cursor-pointer shadow-[0_4px_15px_rgba(153,27,27,0.2)]"
                >
                  <div className="font-bold flex items-center gap-1.5 text-red-300">
                    <Sparkles className="w-3.5 h-3.5" /> Cloudburst Crisis
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">+120% rain, 98% saturation</div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateSimulationParams({ damDischargeMultiplier: 2.8, rainfallMultiplier: 1.5, soilSaturation: 92 })}
                  className="p-3.5 bg-gradient-to-br from-blue-950/60 to-slate-900 border border-blue-800/80 rounded-2xl text-left text-blue-200 transition-all cursor-pointer shadow-[0_4px_15px_rgba(30,58,138,0.2)]"
                >
                  <div className="font-bold flex items-center gap-1.5 text-blue-300">
                    <Waves className="w-3.5 h-3.5" /> Spillway Surge
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">2.8x Peak Cusecs outflow</div>
                </motion.button>
              </div>
            </div>

            {/* PyTorch AI Susceptibility Neural Model Predictor Card */}
            <div className="pt-4 border-t border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase text-cyan-300 font-bold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  PyTorch AI Susceptibility (SusceptibilityNN)
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-950/90 border border-cyan-800 text-cyan-300">
                  INT8 Quantized
                </span>
              </div>

              <div className="p-3.5 bg-[#080d1a] border border-cyan-500/30 rounded-2xl space-y-2.5 shadow-inner font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[10px]">Predicted Failure Probability:</span>
                  <span className={`font-black text-sm ${
                    (aiSusceptibilityResult?.susceptibility_score || 0.72) > 0.8
                      ? 'text-red-400'
                      : (aiSusceptibilityResult?.susceptibility_score || 0.72) > 0.6
                      ? 'text-orange-400'
                      : 'text-emerald-400'
                  }`}>
                    {((aiSusceptibilityResult?.susceptibility_score || 0.72) * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-700 ${
                      (aiSusceptibilityResult?.susceptibility_score || 0.72) > 0.8
                        ? 'bg-red-500'
                        : (aiSusceptibilityResult?.susceptibility_score || 0.72) > 0.6
                        ? 'bg-orange-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, (aiSusceptibilityResult?.susceptibility_score || 0.72) * 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Hazard Classification:</span>
                  <span className="text-amber-300 font-bold">
                    {aiSusceptibilityResult?.hazard_tier || (simulatedRiskScore > 75 ? 'Critical Red Zone' : 'High')}
                  </span>
                </div>

                <div className="text-[10px] text-slate-300 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 leading-relaxed font-sans">
                  {aiSusceptibilityResult?.action_advisory ||
                    'Advisory: Heavy precipitation triggers dynamic hazard buffer expansion. Initiate high-risk zone monitoring.'}
                </div>

                <button
                  onClick={handleRunAiInference}
                  disabled={aiInferenceLoading}
                  className="w-full py-2 bg-cyan-950/80 hover:bg-cyan-900/90 border border-cyan-600/50 text-cyan-200 rounded-xl font-mono text-[10px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Zap className={`w-3 h-3 ${aiInferenceLoading ? 'animate-spin' : ''}`} />
                  <span>{aiInferenceLoading ? 'Inferencing PyTorch NN...' : 'Recompute Susceptibility Score'}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Real-Time Telemetry & Geospatial UI Sandbox Map */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-7 space-y-5"
        >
          {/* Dynamic Impact Cards */}
          <div className="p-6 bg-slate-900/80 backdrop-blur-2xl border border-slate-700/80 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 animate-bounce text-red-400" />
                Simulated Impact Telemetry Matrix
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-400">Risk Severity Score:</span>
                <span className={`px-3 py-1 rounded-xl font-mono text-xs font-extrabold shadow-md border ${simulatedRiskScore > 80 ? 'bg-red-950 text-red-300 border-red-700 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.4)]' :
                  simulatedRiskScore > 60 ? 'bg-orange-950 text-orange-300 border-orange-700' :
                    'bg-amber-950 text-amber-300 border-amber-700'
                  }`}>
                  {simulatedRiskScore} / 100
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs font-mono">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] flex flex-col justify-between">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Pop. Exposed</span>
                <div className="my-1.5">
                  <span className="text-lg font-black text-red-400 font-mono">
                    {simulatedExposedPop.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[10px] text-red-400 font-bold bg-red-950/80 px-2 py-0.5 rounded-lg w-fit border border-red-900">
                  +{additionalPop.toLocaleString('en-IN')} (+{((additionalPop / baselinePop) * 100).toFixed(0)}%)
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] flex flex-col justify-between">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Evac Window</span>
                <div className="my-1.5">
                  <span className="text-lg font-black text-amber-400 font-mono">
                    {simulatedWindowHours} Hrs
                  </span>
                </div>
                <span className="text-[10px] text-amber-400 font-semibold bg-amber-950/80 px-2 py-0.5 rounded-lg w-fit border border-amber-900">
                  -{Math.max(0, 6 - parseFloat(simulatedWindowHours)).toFixed(1)}h cutoff
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] flex flex-col justify-between">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Shelter Capacity</span>
                <div className="my-1.5">
                  <span className={`text-lg font-black font-mono ${district.carryingCapacity.shelterBeds.max >= simulatedExposedPop ? 'text-emerald-400' : 'text-red-400'}`}>
                    {district.carryingCapacity.shelterBeds.max >= simulatedExposedPop ? 'SURPLUS' : 'DEFICIT'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">
                  Max: {district.carryingCapacity.shelterBeds.max.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] flex flex-col justify-between">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Transport Fleet</span>
                <div className="my-1.5">
                  <span className="text-lg font-black text-white font-mono">
                    {Math.ceil(simulatedExposedPop / 50)} Units
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">
                  ~50 seats/bus
                </span>
              </div>
            </div>

            {/* Terminal AI Warning Advisory Box */}
            <div className="p-4 bg-gradient-to-r from-red-950/50 via-slate-950/80 to-slate-950/80 border border-red-800/80 rounded-2xl font-mono text-xs text-slate-200 space-y-1.5 shadow-[0_8px_25px_rgba(153,27,27,0.2),inset_0_1px_0_rgba(255,255,255,0.05)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-500 animate-pulse" />
              <div className="font-bold text-red-300 flex items-center gap-2 pl-2">
                <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
                TERMINAL COMMAND ADVISORY://
              </div>
              <div className="text-[11px] text-slate-300 leading-relaxed pl-2">
                &gt; Under parameters ({simulatedRainfall}mm rain, {simulationParams.soilSaturation}% soil saturation), safe evacuation windows are restricted to <strong className="text-amber-300">{simulatedWindowHours} hours</strong>. Immediate dispatch of <strong className="text-white">{Math.ceil(additionalPop / 50)} transport units</strong> and 8 NDRF rapid response teams is recommended.
              </div>
            </div>
          </div>

          {/* Interactive Geospatial UI Sandbox Map */}
          <div className="h-[340px] sm:h-[460px] rounded-3xl overflow-hidden border-2 border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative flex flex-col">

            {/* Geospatial Overlay Toolbar (Layer Controllers & Projections) */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 flex flex-wrap gap-2 pointer-events-auto max-w-[calc(100%-1.5rem)]">
              <button
                onClick={() => toggleLayer('floodHeatmap')}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl font-mono text-[9px] sm:text-[10px] font-bold border flex items-center gap-1.5 backdrop-blur-md transition-all shadow-lg cursor-pointer ${activeLayers.floodHeatmap ? 'bg-cyan-950/90 text-cyan-300 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-slate-900/80 text-slate-400 border-slate-700'
                  }`}
              >
                <Droplets className="w-3 h-3" /> Flood Inundation
              </button>
              <button
                onClick={() => toggleLayer('evacRoutes')}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl font-mono text-[9px] sm:text-[10px] font-bold border flex items-center gap-1.5 backdrop-blur-md transition-all shadow-lg cursor-pointer ${activeLayers.evacRoutes ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500 shadow-[0_0_15px_rgba(52,211,153,0.3)]' : 'bg-slate-900/80 text-slate-400 border-slate-700'
                  }`}
              >
                <Compass className="w-3 h-3" /> Routes
              </button>
              <button
                onClick={() => toggleLayer('telemetrySensors')}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl font-mono text-[9px] sm:text-[10px] font-bold border flex items-center gap-1.5 backdrop-blur-md transition-all shadow-lg cursor-pointer ${activeLayers.telemetrySensors ? 'bg-amber-950/90 text-amber-300 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-slate-900/80 text-slate-400 border-slate-700'
                  }`}
              >
                <Radio className="w-3 h-3" /> IoT Nodes
              </button>
            </div>

            {/* Geospatial GIS Map Container */}
            <div className="flex-1 w-full h-full relative">
              <GISMap height="100%" />
            </div>

            {/* Bottom Geospatial HUD Telemetry Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400 z-10 px-4">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-cyan-400">
                  <Globe className="w-3.5 h-3.5 animate-spin" /> PROJECTION: EPSG:4326 (WGS 84)
                </span>
                <span className="hidden sm:inline text-slate-500">|</span>
                <span className="hidden sm:flex items-center gap-1">
                  <span className="hidden sm:flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-400" />
                    Lat: 28.6139° N, Lon: 77.2090° E
                  </span>                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-slate-900 border border-slate-700 px-2 py-0.5 rounded text-[10px] text-amber-300">
                  ZOOM: 12.4x
                </span>
                <span className="bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded text-[10px] text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> GIS FEED LIVE
                </span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};