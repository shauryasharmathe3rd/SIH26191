import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Terminal,
  ActivitySquare,
  RadioReceiver,
  MapPin,
  Cpu,
  Layers,
  SlidersHorizontal,
  FileSpreadsheet,
  DatabaseZap,
  History,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  Command,
  ShieldCheck,
  Zap,
  Globe2,
  Users,
  X
} from 'lucide-react';
import { useDisaster } from '../../context/DisasterContext';
import { ActiveTab } from '../../types';

export const CommandSidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    activeAlerts,
    incidentCommandMode,
    sidebarOpen,
    setSidebarOpen
  } = useDisaster();

  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedTabs, setBookmarkedTabs] = useState<ActiveTab[]>(['incident_command', 'active_alerts']);

  const unacknowledgedCount = activeAlerts.filter(a => !a.acknowledged).length;

  const toggleBookmark = (e: React.MouseEvent, id: ActiveTab) => {
    e.stopPropagation();
    setBookmarkedTabs(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const navSections = [
    {
      title: 'OPERATIONAL PROTOCOLS',
      items: [
        { id: 'national_overview' as ActiveTab, label: 'National Report Hub', code: 'SYS-01', icon: <Globe2 className="w-4 h-4" /> },
        { id: 'district_intelligence' as ActiveTab, label: 'District Command', code: 'SEC-04', icon: <RadioReceiver className="w-4 h-4" /> },
        {
          id: 'incident_command' as ActiveTab,
          label: 'Emergency Command (EOC)',
          code: 'EOC-X9',
          icon: <ShieldAlert className="w-4 h-4" />,
          badge: incidentCommandMode ? 'LIVE_OVERRIDE' : 'STANDBY',
          badgeClass: 'bg-rose-950/90 text-rose-300 border border-rose-500/50 shadow-[0_0_12px_rgba(244,63,94,0.4)] animate-pulse'
        },
        {
          id: 'active_alerts' as ActiveTab,
          label: 'Tactical Threat Alerts',
          code: 'THV-88',
          icon: <Zap className="w-4 h-4" />,
          badge: unacknowledgedCount > 0 ? `${unacknowledgedCount} ALERTS` : 'SECURE',
          badgeClass: unacknowledgedCount > 0 ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white font-black shadow-lg shadow-red-600/50' : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
        },
      ]
    },
    {
      title: 'GEOSPATIAL INTELLIGENCE',
      items: [
        { id: 'risk_map' as ActiveTab, label: 'Orbital Hazard GIS Map', code: 'GIS-SAT', icon: <MapPin className="w-4 h-4" /> },
      ]
    },
    {
      title: 'QUANTUM ANALYTICS',
      items: [
        { id: 'carrying_capacity' as ActiveTab, label: 'Carrying Capacity Matrix', code: 'ECO-CAP', icon: <ActivitySquare className="w-4 h-4" /> },
        { id: 'vulnerability_assessment' as ActiveTab, label: 'Vulnerability Index', code: 'VUL-6D', icon: <Layers className="w-4 h-4" /> },
      ]
    },
    {
      title: 'AUTONOMOUS DECISION CORE',
      items: [
        { id: 'relocation_intelligence' as ActiveTab, label: 'Proactive Relocation Planner', code: 'EXODUS', icon: <Users className="w-4 h-4" />, badge: 'AI-GEN', badgeClass: 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40' },
        { id: 'scenario_simulation' as ActiveTab, label: 'Simulation Lab', code: 'SIM-99', icon: <SlidersHorizontal className="w-4 h-4" /> },
      ]
    },
    {
      title: 'SYSTEMS & TELEMETRY',
      items: [
        { id: 'data_sources' as ActiveTab, label: 'Data Integration Center', code: 'IO-NET', icon: <DatabaseZap className="w-4 h-4" />, badge: '12 NODES', badgeClass: 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40' },
        { id: 'reports_sitrep' as ActiveTab, label: 'NDMA SITREP Reports', code: 'REP-AI', icon: <FileSpreadsheet className="w-4 h-4" /> },
        { id: 'audit_logs' as ActiveTab, label: 'Statutory Audit Trail', code: 'LOG-X', icon: <History className="w-4 h-4" /> },
      ]
    }
  ];

  const allItems = navSections.flatMap(s => s.items);
  const bookmarkedItems = allItems.filter(item => bookmarkedTabs.includes(item.id));
  const filteredSections = navSections.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  // Common Nav Content inside Sidebar
  const renderSidebarContent = (isMobile: boolean) => (
    <div className="flex-1 overflow-y-auto py-4 px-3 scrollbar-none flex flex-col justify-between">
      <div>
        {/* Header inside Sidebar */}
        <div className="px-2 pb-3.5 mb-4 flex items-center justify-between border-b border-indigo-950/80">
          {!collapsed || isMobile ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Command className="w-4 h-4 animate-spin-slow" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs font-black tracking-widest text-slate-100 flex items-center gap-1.5">
                  COMMAND_HUB <span className="text-[9px] bg-cyan-950 text-cyan-400 px-1.5 py-0.2 rounded border border-cyan-500/30">v4.2</span>
                </span>
                <span className="text-[9px] font-mono text-cyan-400/60 tracking-wider">SECURE_TUNNEL // 256-BIT</span>
              </div>
            </motion.div>
          ) : (
            <div className="mx-auto text-cyan-400 font-mono font-bold text-xs tracking-widest">AI</div>
          )}

          {isMobile ? (
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close navigation menu"
              className="p-2 rounded-xl text-cyan-300 hover:text-white bg-indigo-950/80 border border-cyan-800/60 transition-colors shadow-inner flex items-center justify-center min-w-[38px] min-h-[38px] cursor-pointer"
            >
              <X className="w-5 h-5 text-cyan-400" />
            </button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.08, backgroundColor: 'rgba(6, 182, 212, 0.15)' }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setCollapsed(!collapsed)}
              className={`p-2 rounded-xl text-cyan-300 hover:text-white bg-indigo-950/60 border border-cyan-900/50 transition-colors shadow-inner cursor-pointer ${collapsed ? 'mx-auto' : ''}`}
              title={collapsed ? 'Expand Neural Navigation' : 'Collapse Neural Navigation'}
              aria-label={collapsed ? 'Expand Navigation Sidebar' : 'Collapse Navigation Sidebar'}
            >
              {collapsed ? <ChevronRight className="w-4 h-4 text-cyan-400" /> : <ChevronLeft className="w-4 h-4 text-cyan-400" />}
            </motion.button>
          )}
        </div>

        {/* Cyber Search Bar */}
        {(!collapsed || isMobile) && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 relative"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Query protocol or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#040814] border border-cyan-900/50 rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono text-cyan-100 placeholder-cyan-500/40 focus:outline-none focus:border-cyan-400/70 focus:ring-1 focus:ring-cyan-400/30 transition-all shadow-inner"
            />
          </motion.div>
        )}

        {/* Pinned Protocols Quick Access */}
        {(!collapsed || isMobile) && bookmarkedItems.length > 0 && !searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 pb-3 border-b border-indigo-950/80"
          >
            <div className="px-2 mb-2 flex items-center justify-between">
              <span className="text-[10px] font-mono font-black tracking-widest text-amber-400 uppercase flex items-center gap-1.5">
                <span>★</span> PINNED PIPELINES
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-400/40 to-transparent ml-2" />
            </div>
            <div className="space-y-1.5">
              {bookmarkedItems.map(item => {
                const isActive = activeTab === item.id;
                return (
                  <motion.button
                    key={`pin-${item.id}`}
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono transition-all min-h-[40px] cursor-pointer ${isActive
                      ? 'bg-gradient-to-r from-cyan-950/80 to-indigo-950 text-cyan-200 border border-cyan-500/50 font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                      : 'text-slate-400 hover:bg-cyan-950/30 hover:text-cyan-100'
                      }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-cyan-400">{item.icon}</span>
                      <span className="truncate tracking-wide text-[11px]">{item.label}</span>
                    </div>
                    <span
                      onClick={(e) => toggleBookmark(e, item.id)}
                      className="text-amber-400 hover:text-slate-400 px-1.5 py-1 text-xs"
                      title="Unpin"
                    >
                      ★
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Navigation Sections */}
        <div className="space-y-5">
          {filteredSections.map((section, idx) => (
            <div key={idx} className="space-y-1.5">
              {(!collapsed || isMobile) && (
                <div className="px-3 py-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)]" />
                    <span className="font-mono text-[10px] font-black tracking-widest text-cyan-300 uppercase bg-gradient-to-r from-cyan-950/80 to-transparent px-2.5 py-1 rounded-md border-l-2 border-cyan-400 shadow-sm">
                      {section.title}
                    </span>
                  </div>
                  <div className="h-[1px] flex-1 bg-cyan-900/40 ml-2" />
                </div>
              )}
              <div className="space-y-1">
                {section.items.map(item => {
                  const isActive = activeTab === item.id;
                  const isBookmarked = bookmarkedTabs.includes(item.id);

                  return (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.015, x: (collapsed && !isMobile) ? 0 : 3 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative group"
                    >
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-mono transition-all duration-200 relative overflow-hidden min-h-[44px] cursor-pointer ${isActive
                          ? 'bg-gradient-to-r from-cyan-950/90 via-indigo-950 to-[#050b1a] text-white font-bold shadow-[0_0_25px_rgba(6,182,212,0.4)] border border-cyan-400/60'
                          : 'bg-indigo-950/10 text-indigo-300/80 hover:bg-indigo-950/40 hover:text-cyan-100 border border-indigo-900/30 hover:border-cyan-800/40'
                          } ${collapsed && !isMobile ? 'justify-center px-0 py-3.5' : ''}`}
                        title={item.label}
                      >
                        {/* Active Beam Indicator */}
                        {isActive && (!collapsed || isMobile) && (
                          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(6,182,212,1)]" />
                        )}

                        <div className="flex items-center gap-3 truncate relative z-10">
                          <span className={`transition-colors ${isActive ? 'text-cyan-300' : 'text-cyan-500/70 group-hover:text-cyan-300'}`}>
                            {item.icon}
                          </span>
                          {(!collapsed || isMobile) && (
                            <div className="flex flex-col text-left truncate">
                              <span className="truncate tracking-wide text-[11px] font-bold">
                                {item.label}
                              </span>
                              <span className="text-[9px] text-cyan-400/60 font-mono tracking-wider">
                                [{item.code}]
                              </span>
                            </div>
                          )}
                        </div>

                        {(!collapsed || isMobile) && (
                          <div className="flex items-center gap-2 relative z-10">
                            {/* Pin Toggle */}
                            <span
                              onClick={(e) => toggleBookmark(e, item.id)}
                              className={`p-1 text-xs transition-opacity ${isBookmarked ? 'opacity-100 text-amber-400' : 'opacity-0 group-hover:opacity-100 text-indigo-700 hover:text-amber-400'}`}
                              title={isBookmarked ? 'Unpin view' : 'Pin to top'}
                            >
                              {isBookmarked ? '★' : '☆'}
                            </span>

                            {item.badge && (
                              <span className={`px-2 py-0.5 rounded-md font-mono text-[9px] font-black tracking-wider shadow-sm ${item.badgeClass || 'bg-cyan-950 text-cyan-200 border border-cyan-800/50'}`}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Interactive Hover Sweep */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. DESKTOP PERMANENT / COLLAPSIBLE SIDEBAR (screens >= 1024px) */}
      <motion.aside
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`hidden lg:flex relative bg-[#02040a]/95 backdrop-blur-3xl border-r border-cyan-500/20 flex-col justify-between transition-all duration-300 select-none z-30 shadow-[20px_0_60px_rgba(0,0,0,0.9)] ${collapsed ? 'w-24' : 'w-80'
          }`}
      >
        {/* Neon Cyber Glow Border Line */}
        <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent pointer-events-none" />
        {renderSidebarContent(false)}
      </motion.aside>

      {/* 2. MOBILE OFF-CANVAS DRAWER WITH BACKDROP (screens < 1024px) */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Dark Translucent Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/65 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Slide-out Mobile Navigation Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden fixed top-0 bottom-0 left-0 z-50 w-80 max-w-[85vw] h-full bg-[#02040a]/98 backdrop-blur-3xl border-r border-cyan-500/40 flex flex-col justify-between shadow-[25px_0_60px_rgba(0,0,0,0.95)] select-none overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              {/* Neon Cyber Accent Line */}
              <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-cyan-400 via-indigo-500 to-cyan-400 pointer-events-none" />
              {renderSidebarContent(true)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};