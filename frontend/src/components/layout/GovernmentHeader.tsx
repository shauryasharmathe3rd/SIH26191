import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Bell,
  Radio,
  Globe,
  Eye,
  AlertTriangle,
  ChevronDown,
  CheckCircle2,
  FileText,
  Activity,
  Zap,
  Lock,
  Cpu,
  Compass,
  Shield,
  Layers,
  Server,
  Terminal,
  Wifi,
  RadioTower,
  Sparkles,
  Command,
  Sliders,
  Flame,
  Binary,
  Menu,
  X
} from 'lucide-react';
import { useDisaster } from '../../context/DisasterContext';

export const GovernmentHeader: React.FC = () => {
  const {
    districts,
    selectedDistrict,
    selectDistrictById,
    incidentCommandMode,
    toggleIncidentCommandMode,
    activeAlerts,
    language,
    setLanguage,
    fontSizeScale,
    setFontSizeScale,
    highContrast,
    setHighContrast,
    setActiveTab,
    nationalStats,
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar
  } = useDisaster();

  const [alertsDropdownOpen, setAlertsDropdownOpen] = useState(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [accessMenuOpen, setAccessMenuOpen] = useState(false);
  const [commandPaletteActive, setCommandPaletteActive] = useState(false);

  const unacknowledgedAlerts = activeAlerts.filter(a => !a.acknowledged);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40 w-full bg-[#050811]/95 backdrop-blur-2xl border-b border-indigo-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] select-none font-sans"
    >
      {/* Main Enterprise Navbar */}
      <div className="px-3 sm:px-6 md:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4 max-w-full">
        {/* Brand & Platform Identifier */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0 min-w-0">
          {/* Mobile Hamburger Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"}
            className="lg:hidden flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-2xl bg-indigo-950/70 hover:bg-indigo-900/90 border border-cyan-500/40 text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-md transition-all shrink-0 cursor-pointer"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.08, rotate: 3 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setActiveTab('landing_page')}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 border border-indigo-400/50 cursor-pointer group relative overflow-hidden shrink-0"
          >
            <div className="absolute inset-0 bg-white/25 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Flame className="w-5 h-5 text-white drop-shadow" />
          </motion.div>
          <div className="cursor-pointer group truncate" onClick={() => setActiveTab('landing_page')}>
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <h1 className="font-mono text-sm sm:text-base md:text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-300 group-hover:text-amber-400 transition-colors truncate">
                AAPDA_INTEL
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/40 text-indigo-300 font-mono text-[9px] sm:text-[10px] font-extrabold shadow-[0_0_10px_rgba(99,102,241,0.2)] shrink-0">
                V4.8
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-indigo-300/70 font-medium hidden md:block truncate">
              Autonomous Disaster Intelligence & Real-Time Neural Command System
            </p>
          </div>
        </div>

        {/* Operational District Selector */}
        <div className="relative hidden md:flex items-center gap-2.5">
          <span className="text-[11px] font-mono text-indigo-300/80 uppercase font-bold flex items-center gap-1.5 shrink-0">
            <Compass className="w-4 h-4 text-amber-400 animate-spin-slow" /> Sector:
          </span>
          <motion.button
            whileHover={{ scale: 1.01, borderColor: 'rgba(245, 158, 11, 0.6)' }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-xl bg-indigo-950/40 border border-indigo-800/80 text-indigo-200 text-xs font-mono transition-all group shadow-inner backdrop-blur-md cursor-pointer"
          >
            <Radio className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
            <span className="font-bold text-white tracking-wide truncate max-w-[130px] lg:max-w-[180px]">{selectedDistrict?.name || 'All National Sectors'}</span>
            <span className="text-amber-300/90 text-[10px] bg-indigo-900/80 px-2 py-0.5 rounded-md border border-indigo-700/50 shrink-0">[{selectedDistrict?.state || 'INDIA'}]</span>
            <ChevronDown className={`w-4 h-4 text-indigo-400 transition-transform duration-300 shrink-0 ${regionDropdownOpen ? 'rotate-180' : ''}`} />
          </motion.button>

          <AnimatePresence>
            {regionDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.97 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute top-full left-0 mt-2.5 w-80 sm:w-88 max-w-[calc(100vw-2rem)] max-h-96 overflow-y-auto bg-[#070b19]/95 backdrop-blur-2xl border border-indigo-500/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 p-2.5"
              >
                <div className="px-3 py-2 text-[10px] font-mono uppercase text-indigo-300 font-bold border-b border-indigo-900/60 mb-2 flex items-center justify-between">
                  <span>Select Tactical Grid Zone</span>
                  <Binary className="w-3.5 h-3.5 text-amber-400" />
                </div>
                {districts.map(d => (
                  <motion.button
                    key={d.id}
                    whileHover={{ scale: 1.01, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      selectDistrictById(d.id);
                      setRegionDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-mono flex items-center justify-between transition-all my-1.5 border ${selectedDistrict?.id === d.id
                      ? 'bg-gradient-to-r from-indigo-900/80 to-indigo-950 text-indigo-100 font-bold border-indigo-500 shadow-md shadow-indigo-900/50'
                      : 'bg-indigo-950/20 text-indigo-300/80 border-indigo-900/30 hover:bg-indigo-900/40 hover:text-white'
                      }`}
                  >
                    <div>
                      <div className="font-bold text-white tracking-wide">{d.name}</div>
                      <div className="text-[10px] text-indigo-300/60 mt-0.5">{d.state} • {d.primaryHazard}</div>
                    </div>
                    <span className={`text-[10px] px-2.5 py-1 rounded-lg font-black tracking-wider ${d.riskScore >= 90 ? 'bg-red-950/80 text-red-300 border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'bg-amber-950/80 text-amber-300 border border-amber-500/50'
                      }`}>
                      RISK: {d.riskScore}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enterprise Actions & Advanced Tools */}
        <div className="flex items-center gap-3">
          {/* AI Command Palette Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCommandPaletteActive(!commandPaletteActive)}
            className="hidden xl:flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-700/40 text-indigo-200 font-mono text-xs font-bold transition-all shadow-sm"
          >
            <Command className="w-4 h-4 text-cyan-400" />
            <span>COMMAND [⌘K]</span>
          </motion.button>

          {/* Incident Command Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={toggleIncidentCommandMode}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-mono text-xs font-black transition-all border shadow-lg ${incidentCommandMode
              ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white border-red-400 shadow-red-600/50 animate-pulse'
              : 'bg-indigo-950/60 hover:bg-indigo-900/70 text-indigo-200 border-indigo-700/60'
              }`}
          >
            <Zap className={`w-4 h-4 ${incidentCommandMode ? 'text-white' : 'text-amber-400 animate-bounce'}`} />
            <span className="hidden sm:inline">EOC COMMAND MODE</span>
            <span className="sm:hidden">EOC</span>
            <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${incidentCommandMode ? 'bg-red-950 text-white' : 'bg-indigo-900 text-indigo-300'}`}>
              {incidentCommandMode ? 'ACTIVE' : 'STANDBY'}
            </span>
          </motion.button>

          {/* SITREP Briefing Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab('reports_sitrep')}
            className="hidden lg:flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-700/50 text-indigo-200 text-xs font-mono transition-all shadow-sm"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span className="font-bold">SITREP_AI</span>
          </motion.button>

          {/* Alerts Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setAlertsDropdownOpen(!alertsDropdownOpen)}
              className="relative p-2.5 rounded-xl bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-700/50 text-indigo-200 transition-all shadow-sm"
              title="Tactical Notifications"
            >
              <Bell className="w-4 h-4 text-indigo-300" />
              {unacknowledgedAlerts.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-tr from-red-600 to-rose-500 text-white font-mono text-[10px] font-black rounded-full flex items-center justify-center shadow-lg shadow-red-600/50 animate-bounce">
                  {unacknowledgedAlerts.length}
                </span>
              )}
            </motion.button>

            <AnimatePresence>
              {alertsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-3 w-[calc(100vw-2rem)] max-w-sm sm:max-w-md bg-[#070b19]/95 backdrop-blur-2xl border border-indigo-500/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 p-4 font-sans"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-indigo-900/60 mb-3">
                    <div className="flex items-center gap-2 text-indigo-100 font-mono text-xs font-bold">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>Critical Feeds ({activeAlerts.length})</span>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('active_alerts');
                        setAlertsDropdownOpen(false);
                      }}
                      className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 font-semibold transition-colors cursor-pointer py-1 px-2"
                    >
                      View Stream →
                    </button>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
                    {activeAlerts.slice(0, 4).map(alert => (
                      <motion.div
                        key={alert.id}
                        whileHover={{ scale: 1.01, x: 2 }}
                        onClick={() => {
                          selectDistrictById(alert.districtId);
                          setActiveTab('district_intelligence');
                          setAlertsDropdownOpen(false);
                        }}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${alert.severity === 'CRITICAL'
                          ? 'bg-red-950/30 border-red-500/40 hover:bg-red-950/50 shadow-sm'
                          : 'bg-indigo-950/30 border-indigo-800/40 hover:bg-indigo-900/40'
                          }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-mono font-bold text-white flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${alert.severity === 'CRITICAL' ? 'bg-red-500 animate-ping' : 'bg-amber-400'}`} />
                            {alert.districtName}
                          </span>
                          <span className="text-[10px] font-mono text-indigo-300/60">{alert.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-indigo-200/80 line-clamp-2 leading-relaxed">{alert.message}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accessibility Settings */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setAccessMenuOpen(!accessMenuOpen)}
              className="p-2.5 rounded-xl bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-700/50 text-indigo-200 transition-all shadow-sm cursor-pointer"
              title="Interface Accessibility"
              aria-label="Interface Accessibility Settings"
            >
              <Sliders className="w-4 h-4 text-indigo-300" />
            </motion.button>

            <AnimatePresence>
              {accessMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-3 w-[calc(100vw-2rem)] max-w-xs sm:w-72 bg-[#070b19]/95 backdrop-blur-2xl border border-indigo-500/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 p-4 font-sans text-xs"
                >
                  <div className="font-mono text-xs font-bold text-indigo-100 border-b border-indigo-900/60 pb-2.5 mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-cyan-400"><Cpu className="w-4 h-4" /> Neural UI Matrix</span>
                  </div>

                  <div className="mb-3.5">
                    <span className="text-[10px] font-mono uppercase text-indigo-300/70 font-bold block mb-2">Typography Scale</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'sm', label: 'Compact' },
                        { id: 'base', label: 'Optimal' },
                        { id: 'lg', label: 'Magnified' },
                      ].map((btn) => (
                        <motion.button
                          key={btn.id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setFontSizeScale(btn.id as any)}
                          className={`px-2.5 py-2 rounded-xl font-mono text-[11px] font-bold transition-all ${fontSizeScale === btn.id
                            ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-600/30'
                            : 'bg-indigo-950/40 text-indigo-300 hover:bg-indigo-900/60 border border-indigo-800/40'
                            }`}
                        >
                          {btn.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center justify-between cursor-pointer p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 hover:bg-indigo-900/40 transition-colors">
                      <span className="text-indigo-200 font-mono text-xs font-semibold">High Contrast Matrix</span>
                      <input
                        type="checkbox"
                        checked={highContrast}
                        onChange={(e) => setHighContrast(e.target.checked)}
                        className="rounded bg-indigo-950 border-indigo-700 text-indigo-500 focus:ring-indigo-400 w-4 h-4 cursor-pointer"
                      />
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile Badge */}
          <div className="hidden xl:flex items-center gap-3 pl-3.5 border-l border-indigo-900/80">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-900 to-indigo-950 border border-indigo-600/50 flex items-center justify-center text-cyan-400 font-mono text-xs font-black shadow-inner">
              NE
            </div>
            <div className="text-left">
              <div className="text-[11px] font-mono text-indigo-100 font-bold flex items-center gap-1.5">
                Commander
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-[9px] text-indigo-400/80 font-mono tracking-wider">LEVEL-4 OVERRIDE</div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};