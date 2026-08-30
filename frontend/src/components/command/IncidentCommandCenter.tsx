import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Radio,
  Truck,
  Users,
  ShieldAlert,
  Send,
  Navigation,
  CheckCircle2,
  Flame,
  Building2,
  Activity,
  PhoneCall,
  Video,
  FileCheck,
  Compass,
  MapPin,
  Globe,
  Zap,
  Sliders,
  Layers,
  Maximize2,
  Terminal,
  Cpu,
  ShieldCheck,
  RadioTower
} from 'lucide-react';
import { useDisaster } from '../../context/DisasterContext';
import { StatusBadge } from '../common/StatusBadge';
import { GISMap } from '../gis/GISMap';

export const IncidentCommandCenter: React.FC = () => {
  const {
    selectedDistrict,
    districts,
    activeAlerts,
    nationalStats,
    addAuditLog,
    setSelectedDistrict
  } = useDisaster();

  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);
  const [activeIncidentTab, setActiveIncidentTab] = useState<'sitrep' | 'sar' | 'roads' | 'dispatch'>('sitrep');
  const [activeGeoLayer, setActiveGeoLayer] = useState<'sat' | 'heat' | 'routes'>('heat');
  const [isSyncingNode, setIsSyncingNode] = useState(false);

  const district = selectedDistrict || districts[0];

  if (!district) {
    return (
      <div className="flex items-center justify-center p-16 text-slate-400 font-mono text-xs">
        <Radio className="w-5 h-5 animate-spin text-cyan-400 mr-2" />
        <span>Loading NEOC Incident Command telemetry from FastAPI backend...</span>
      </div>
    );
  }

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;

    addAuditLog({
      officerName: 'NEOC Incident Commander',
      designation: 'National Emergency Operations Center',
      actionType: 'ALERT_BROADCAST',
      targetDistrict: district.name,
      details: `Disaster Cell Broadcast Dispatched: "${broadcastMessage}"`
    });

    setBroadcastSuccess(true);
    setBroadcastMessage('');
    setTimeout(() => setBroadcastSuccess(false), 5000);
  };

  const handleSyncNode = () => {
    setIsSyncingNode(true);
    setTimeout(() => setIsSyncingNode(false), 1200);
  };

  // Derive dynamic road blockages from all high-risk districts & routes
  const roadBlockages = districts
    .flatMap(d => d.evacuationRoutes.map(r => ({
      corridor: `${r.name} (${d.name})`,
      status: r.status === 'CONGESTED' ? 'CONGESTED' : (r.status === 'BLOCKED' ? 'BLOCKED' : 'CAUTION'),
      debrisVolume: r.bottleneckLocation || `${d.weatherTelemetry.rainfall24hMm}mm Rainfall Inundation`,
      machinery: `${Math.ceil(d.exposedPopulation / 3000) + 1} Heavy Earthmovers + State PWD Units`,
      etaClearance: r.status === 'CLEAR' ? 'Clear' : '2-4 Hours Active Clearance'
    })))
    .slice(0, 5);

  // Derive dynamic SAR teams from emergency responders & districts
  const sarTeams = districts.map((d, idx) => ({
    teamCode: `NDRF-BN-${(idx + 1).toString().padStart(2, '0')} (${d.code})`,
    location: `${d.name}, High-Ground Command Post`,
    strength: `${d.carryingCapacity.emergencyResponders.current} Responders`,
    task: `Sector mandatory relocation and tactical medical triage (${d.aiRecommendation.priorityLabel})`,
    status: d.riskLevel === 'CRITICAL' ? 'DEPLOYED' : 'OPERATIONAL'
  }));


  return (
    <div className="space-y-6 font-mono text-slate-100 max-w-[1650px] mx-auto pb-10 relative">

      {/* Cyberpunk Grid Overlay + HUD Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ff1_1px,transparent_1px),linear-gradient(to_bottom,#0ff1_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none opacity-25" />

      {/* Cyberpunk / Glassmorphism Top Command HUD */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 bg-slate-950/85 backdrop-blur-2xl border-2 border-cyan-500/50 rounded-3xl shadow-[0_0_40px_rgba(6,182,212,0.25),inset_0_0_15px_rgba(6,182,212,0.1)] flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative overflow-hidden"
      >
        {/* Neon Cyber Glow Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 animate-pulse shadow-[0_0_15px_rgba(6,182,212,0.8)]" />

        {/* HUD Targeting Reticles */}
        <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
        <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-fuchsia-400 pointer-events-none" />

        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-gradient-to-br from-cyan-500/20 via-blue-600/10 to-fuchsia-600/20 border-2 border-cyan-400/60 rounded-2xl text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <ShieldAlert className="w-7 h-7 animate-bounce text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-mono text-base font-black tracking-widest text-white drop-shadow-[0_2px_8px_rgba(0,255,255,0.4)]">
                NEOC // TACTICAL INCIDENT COMMAND SYSTEM
              </h2>
              <span className="text-[10px] font-bold bg-gradient-to-r from-red-600 to-fuchsia-600 text-white px-3 py-1 rounded-full border border-red-400/50 shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                RED PROTOCOL ACTIVE [HUD V6.4]
              </span>
            </div>
            <p className="text-xs text-cyan-300/80 font-mono mt-1 tracking-tight flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-fuchsia-400" />
              SECTOR: <strong className="text-amber-300">{district.name} ({district.state})</strong> • Neobrutalist Multi-Agency Telemetry Grid
            </p>
          </div>
        </div>

        {/* Neobrutalist Controls & Selector */}
        <div className="flex flex-wrap items-center gap-3.5">
          <div className="relative group">
            {/* Cyber-HUD Corner Accents */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-10" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-fuchsia-400 pointer-events-none z-10" />

            <div className="flex items-center gap-3 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-950/95 border-2 border-cyan-500/70 px-4.5 py-3 rounded-2xl font-mono text-xs shadow-[5px_5px_0px_rgba(6,182,212,0.4),0_0_20px_rgba(6,182,212,0.2)] backdrop-blur-xl transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[6px_6px_0px_rgba(6,182,212,0.6),0_0_25px_rgba(6,182,212,0.3)]">

              {/* Interactive Motion Button / Div for Node Sync */}
              <motion.button
                onClick={handleSyncNode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Click to force-sync telemetry node"
                className="flex items-center gap-2 border-r border-slate-700/80 pr-3 cursor-pointer bg-transparent border-none p-0 text-left"
              >
                <motion.span
                  animate={isSyncingNode ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="relative flex h-2 w-2"
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                </motion.span>
                <span className="text-cyan-400 font-black tracking-wider drop-shadow-[0_0_6px_rgba(6,182,212,0.5)] hover:text-cyan-300 transition-colors">
                  NODE://
                </span>
              </motion.button>

              {/* Enhanced Select Wrapper */}
              <div className="relative flex-1">
                <select
                  value={district.id}
                  onChange={(e) => {
                    const found = districts.find(d => d.id === e.target.value);
                    if (found) setSelectedDistrict(found);
                  }}
                  className="w-full bg-transparent border-none text-amber-300 font-black focus:outline-none cursor-pointer tracking-wide appearance-none pr-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                >
                  {districts.map(d => {
                    const isSelected = d.id === district.id;
                    return (
                      <option
                        key={d.id}
                        value={d.id}
                        className={`font-mono py-3 font-bold tracking-wide transition-colors ${isSelected
                          ? 'bg-cyan-950/90 text-amber-300 font-black'
                          : 'bg-slate-950 text-slate-200 hover:bg-slate-900'
                          }`}
                      >
                        {isSelected ? '▶ ' : '• '} {d.name.toUpperCase()} // [{d.state.toUpperCase()}]
                      </option>
                    );
                  })}
                </select>

                {/* Custom Cyber Chevron Indicator */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-400 font-bold text-[10px] animate-pulse">
                  ▼
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/90 border-2 border-fuchsia-500/50 px-4 py-2.5 rounded-2xl font-mono text-xs shadow-[4px_4px_0px_rgba(217,70,239,0.3)]">
            <div className="text-right">
              <span className="text-[9px] text-fuchsia-400 block tracking-wider font-bold">NDRF FORCES</span>
              <span className="text-white font-black">{nationalStats.ndrfBattalionsDeployed} Battalions</span>
            </div>
            <div className="text-right border-l-2 border-fuchsia-500/30 pl-4">
              <span className="text-[9px] text-amber-400 block tracking-wider font-bold">SAR UNITS</span>
              <span className="text-amber-300 font-black">{sarTeams.length} Operational</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Grid: Cyber GIS Map & Neobrutalist Operations Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Geospatial HUD Map + Cell Broadcast Trigger */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Cyberpunk GIS Map Container with Skeuomorphic Glassmorphism */}
          <div className="h-[340px] sm:h-[440px] lg:h-[500px] rounded-3xl overflow-hidden border-2 border-cyan-500/60 shadow-[0_0_35px_rgba(6,182,212,0.3),inset_0_0_20px_rgba(6,182,212,0.15)] relative flex flex-col bg-slate-950/90 backdrop-blur-2xl">

            {/* GIS Layer Controls (Cyberpunk HUD style) */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 flex flex-wrap gap-2 pointer-events-auto max-w-[calc(100%-1.5rem)]">
              <button
                onClick={() => setActiveGeoLayer('heat')}
                className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-mono text-[10px] sm:text-[11px] font-black border-2 transition-all shadow-[3px_3px_0px_rgba(0,0,0,0.8)] backdrop-blur-md cursor-pointer ${activeGeoLayer === 'heat'
                  ? 'bg-cyan-950/90 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5),3px_3px_0px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-900/80 text-slate-400 border-slate-700'
                  }`}
              >
                <Activity className="w-3.5 h-3.5 inline mr-1.5 text-cyan-400" /> Inundation
              </button>
              <button
                onClick={() => setActiveGeoLayer('routes')}
                className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-mono text-[10px] sm:text-[11px] font-black border-2 transition-all shadow-[3px_3px_0px_rgba(0,0,0,0.8)] backdrop-blur-md cursor-pointer ${activeGeoLayer === 'routes'
                  ? 'bg-emerald-950/90 text-emerald-300 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5),3px_3px_0px_rgba(52,211,153,0.4)]'
                  : 'bg-slate-900/80 text-slate-400 border-slate-700'
                  }`}
              >
                <Compass className="w-3.5 h-3.5 inline mr-1.5 text-emerald-400" /> Routes
              </button>
              <button
                onClick={() => setActiveGeoLayer('sat')}
                className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-mono text-[10px] sm:text-[11px] font-black border-2 transition-all shadow-[3px_3px_0px_rgba(0,0,0,0.8)] backdrop-blur-md cursor-pointer ${activeGeoLayer === 'sat'
                  ? 'bg-fuchsia-950/90 text-fuchsia-300 border-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.5),3px_3px_0px_rgba(217,70,239,0.4)]'
                  : 'bg-slate-900/80 text-slate-400 border-slate-700'
                  }`}
              >
                <Globe className="w-3.5 h-3.5 inline mr-1.5 text-fuchsia-400" /> Satellite
              </button>
            </div>

            <div className="flex-1 w-full h-full relative">
              <GISMap height="100%" />
            </div>

            {/* Bottom Geospatial HUD Telemetry Status */}
            <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3.5 bg-slate-950/95 backdrop-blur-xl border-t-2 border-cyan-500/40 flex items-center justify-between text-xs font-mono text-cyan-300 z-10 px-3 sm:px-5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]">
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="flex items-center gap-1.5 text-cyan-400 font-bold text-[10px] sm:text-xs">
                  <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin text-fuchsia-400" /> MESH ACTIVE
                </span>
                <span className="hidden md:inline text-slate-600">|</span>
                <span className="hidden md:flex items-center gap-1.5 text-slate-300 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-red-500 animate-bounce" /> Vector Lock: 28.6139° N, 77.2090° E
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="bg-slate-900 border border-cyan-500/50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[9px] sm:text-[10px] text-amber-300 font-bold shadow-[2px_2px_0px_rgba(6,182,212,0.3)]">
                  ZOOM: 14.2x
                </span>
                <span className="bg-emerald-950/90 border border-emerald-500 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[9px] sm:text-[10px] text-emerald-300 font-bold flex items-center gap-1 shadow-[2px_2px_0px_rgba(52,211,153,0.3)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> SECURE
                </span>
              </div>
            </div>

          </div>

          {/* Neobrutalist Emergency Cell Broadcast Trigger */}
          <div className="p-4 sm:p-6 bg-slate-950/90 backdrop-blur-2xl border-2 border-red-500/60 rounded-3xl shadow-[6px_6px_0px_rgba(239,68,68,0.4),0_0_30px_rgba(239,68,68,0.15)] space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-red-500/30 font-mono">
              <span className="text-xs font-black uppercase text-red-400 flex items-center gap-2">
                <RadioTower className="w-5 h-5 text-red-500 animate-pulse shrink-0" />
                <span>EMERGENCY CELL BROADCAST TRIGGER</span>
              </span>
              <span className="text-[10px] text-slate-400 bg-slate-900 px-3 py-1 rounded-xl border border-red-500/40 font-bold self-start sm:self-auto">
                Target: {district.name} Mobile Mesh
              </span>
            </div>

            {broadcastSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3.5 bg-emerald-950/90 border-2 border-emerald-500 rounded-2xl text-xs font-mono text-emerald-300 flex items-center gap-3 shadow-[4px_4px_0px_rgba(52,211,153,0.4)]"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-bold">EMERGENCY SMS BROADCASTED SUCCESSFULLY TO 48,000+ ACTIVE DEVICES IN SECTOR.</span>
              </motion.div>
            )}

            <form onSubmit={handleBroadcast} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder={`Type urgent emergency alert in English/Hindi for ${district.name} civilians...`}
                className="flex-1 px-4 py-3 sm:px-4.5 sm:py-3.5 bg-slate-900/90 border-2 border-slate-700 focus:border-red-500 rounded-2xl text-slate-100 font-mono text-xs focus:outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]"
              />
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98, y: 1 }}
                type="submit"
                className="px-5 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-mono text-xs font-black uppercase rounded-2xl shadow-[4px_4px_0px_rgba(239,68,68,0.6)] transition-all flex items-center justify-center gap-2.5 shrink-0 border-2 border-red-400 cursor-pointer"
              >
                <Send className="w-4 h-4 animate-pulse" />
                <span>Broadcast SMS</span>
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Right Column: Glassmorphic Tactical Consoles & SITREP */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="p-6 bg-slate-950/85 backdrop-blur-2xl border-2 border-cyan-500/40 rounded-3xl shadow-[0_0_35px_rgba(6,182,212,0.2),inset_0_0_15px_rgba(6,182,212,0.1)] space-y-5 relative">

            {/* Neobrutalist / Glassmorphic Tab Selector */}
            <div className="grid grid-cols-3 gap-2.5 pb-4 border-b-2 border-cyan-500/30 font-mono text-xs">
              {[
                { key: 'sitrep' as const, label: 'Live SITREP' },
                { key: 'sar' as const, label: 'SAR Teams' },
                { key: 'roads' as const, label: 'Road Clearance' },
              ].map(t => (
                <motion.button
                  key={t.key}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveIncidentTab(t.key)}
                  className={`py-3 rounded-2xl font-black text-center transition-all cursor-pointer border-2 shadow-[3px_3px_0px_rgba(0,0,0,0.6)] ${activeIncidentTab === t.key
                    ? 'bg-gradient-to-br from-cyan-950 via-slate-900 to-fuchsia-950 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4),3px_3px_0px_rgba(6,182,212,0.4)]'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border-slate-800'
                    }`}
                >
                  {t.label}
                </motion.button>
              ))}
            </div>

            {/* Subtab 1: Live SITREP */}
            {activeIncidentTab === 'sitrep' && (
              <div className="space-y-3.5 max-h-[480px] overflow-y-auto pr-1">
                {activeAlerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`p-4.5 rounded-2xl border-2 font-mono text-xs space-y-2.5 shadow-[4px_4px_0px_rgba(0,0,0,0.8)] ${alert.severity === 'CRITICAL'
                      ? 'bg-red-950/40 border-red-500/80 shadow-[0_0_20px_rgba(239,68,68,0.25),4px_4px_0px_rgba(239,68,68,0.3)]'
                      : 'bg-slate-900/80 border-cyan-500/30'
                      }`}
                  >
                    <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
                      <span className="font-black text-white flex items-center gap-2">
                        <StatusBadge severity={alert.severity} size="xs" />
                        {alert.districtName}
                      </span>
                      <span className="text-[10px] text-cyan-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-cyan-500/40">{alert.timestamp}</span>
                    </div>
                    <div className="font-bold text-amber-300 text-xs tracking-wide">{alert.title}</div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{alert.message}</p>
                    <div className="pt-2.5 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between font-bold">
                      <span className="text-cyan-400">Source: {alert.sourceAgency}</span>
                      <span className="text-red-400 bg-red-950 px-2.5 py-0.5 rounded border border-red-800">Pop: {alert.affectedPopulation.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Subtab 2: Search and Rescue Teams */}
            {activeIncidentTab === 'sar' && (
              <div className="space-y-3.5 max-h-[480px] overflow-y-auto pr-1">
                {sarTeams.map((team, idx) => (
                  <div key={idx} className="p-4.5 bg-slate-900/80 border-2 border-fuchsia-500/40 rounded-2xl font-mono text-xs space-y-2.5 shadow-[4px_4px_0px_rgba(217,70,239,0.25)]">
                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                      <span className="font-black text-white text-xs">{team.teamCode}</span>
                      <span className="px-2.5 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-500 text-[10px] font-black shadow-[2px_2px_0px_rgba(52,211,153,0.3)]">
                        {team.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300">Sector: <strong className="text-amber-300">{team.location}</strong></div>
                    <div className="text-[11px] text-slate-300">Strength: <strong className="text-white">{team.strength}</strong></div>
                    <div className="text-[10px] text-slate-200 bg-slate-950 p-3 rounded-xl border border-fuchsia-500/30 mt-1 shadow-inner">
                      <span className="text-fuchsia-400 font-black block mb-1 uppercase tracking-wider">Mission Directive:</span>
                      {team.task}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Subtab 3: Road Clearance & Arterial Corridor Status */}
            {activeIncidentTab === 'roads' && (
              <div className="space-y-3.5 max-h-[480px] overflow-y-auto pr-1">
                {roadBlockages.map((road, idx) => (
                  <div key={idx} className="p-4.5 bg-slate-900/80 border-2 border-amber-500/40 rounded-2xl font-mono text-xs space-y-2.5 shadow-[4px_4px_0px_rgba(245,158,11,0.25)]">
                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                      <span className="font-black text-white text-xs">{road.corridor}</span>
                      <span className={`px-2.5 py-1 rounded-xl font-black text-[10px] border shadow-[2px_2px_0px_rgba(0,0,0,0.5)] ${road.status === 'BLOCKED' || road.status === 'SEVERED' ? 'bg-red-950 text-red-300 border-red-500' : 'bg-amber-950 text-amber-300 border-amber-500'
                        }`}>
                        {road.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300">Volume: <strong className="text-white">{road.debrisVolume}</strong></div>
                    <div className="text-[11px] text-slate-300">Clearing Force: <strong className="text-cyan-300">{road.machinery}</strong></div>
                    <div className="text-[10px] text-emerald-300 font-black bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-500/60 mt-1">
                      Est. Clearance: {road.etaClearance}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};