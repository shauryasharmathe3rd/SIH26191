import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import {
  ShieldAlert,
  Map,
  Activity,
  BrainCircuit,
  FileCheck,
  ArrowRight,
  Navigation,
  Cpu,
  Terminal,
  Radio,
  Zap,
  ChevronRight,
  Satellite,
  Waves,
  ShieldCheck,
  Flame,
  CloudRain,
  Lock,
  Sparkles,
  Layers,
  Database,
  Building2,
  Users,
  RadioTower,
  CheckCircle2,
  Compass,
  Globe2,
  Eye,
  SlidersHorizontal,
  Workflow,
  Share2,
  HelpCircle,      // added for FAQ
  MessageCircle,   // added for solution
  AlertTriangle,   // added for problem
  XCircle,         // added for problem
  TrendingUp,      // added for solution
  BarChart3,       // added for solution
} from 'lucide-react';
import { useDisaster } from '../../context/DisasterContext';
import { GovernmentFooter } from './GovernmentFooter';

export const LandingPage: React.FC = () => {
  const { setActiveTab, nationalStats } = useDisaster();
  const [activeWorkflow, setActiveWorkflow] = useState<number>(0);
  const [activeStakeholderTab, setActiveStakeholderTab] = useState<number>(0);
  const [tickerIndex, setTickerIndex] = useState<number>(0);
  const [simulationMode, setSimulationMode] = useState<'standard' | 'hyper-resilience'>('hyper-resilience');
  const [heroImageTab, setHeroImageTab] = useState<'satellite' | 'hydro' | 'command'>('satellite');
  const [faqOpen, setFaqOpen] = useState<number | null>(null); // new state for FAQ

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const liveFeedsTicker = [
    "ISRO CARTOSAT-3: InSAR Ground Deformation Velocity Stable across Chamoli Sector [0.4 mm/day]",
    "IMD DOPPLER ARRAY: C-Band Radar Operational at Paradeep & Kolkata | Rain Rate: 42 mm/h",
    "CWC HYDROLOGY: Brahmaputra Basin at Dibrugarh Warning Level (-0.15m below danger mark)",
    "NDMA EOC: Section 34 Statutory Protocols Ready for Automated State Dispatch"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % liveFeedsTicker.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [liveFeedsTicker.length]);

  // Enhanced Advanced Workflow Steps with Imagery Context
  const workflowSteps = [
    {
      step: '01',
      title: 'Multi-Sensor Telemetry Ingestion',
      subtitle: 'Spaceborne & Terrestrial Fusion',
      icon: <Satellite className="w-6 h-6 text-cyan-400" />,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
      description: 'Continuous real-time ingestion from ISRO Cartosat-3 InSAR radar, IMD 34-Doppler radar array, CWC 338 river hydrograph gauges, and NSDI socio-economic Census geospatial databases.',
      highlights: ['Sub-millimeter InSAR Radar', 'Doppler Rain Rate Vectoring', 'Live Hydrograph Gauges'],
      telemetryPayload: '{ feed_status: "ONLINE", latency_ms: 38, packet_loss: "0.00%", source: "ISRO_INSAR_v5" }'
    },
    {
      step: '02',
      title: 'Physics-Guided AI Hydro-Modeling',
      subtitle: 'Predictive Subsurface Stress Analysis',
      icon: <BrainCircuit className="w-6 h-6 text-amber-400" />,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200',
      description: 'Advanced neural networks calculate subsurface ground deformation velocity (mm/day), pore-water soil saturation thresholds, and hydrodynamic flood crest routing across complex basins.',
      highlights: ['PINN Hydrodynamic Engine', 'Pore Pressure Thresholding', 'Slope Failure Probability'],
      telemetryPayload: '{ model_type: "PINN_HYDRO_v3", confidence: "99.1%", pore_pressure_kpa: 148.2 }'
    },
    {
      step: '03',
      title: 'Red-Zone & Carrying Capacity Check',
      subtitle: 'Multi-Vector Balance Analysis',
      icon: <Waves className="w-6 h-6 text-rose-400" />,
      image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=1200',
      description: 'Delineates dynamic red-zone hazard polygons and performs multi-vector carrying capacity balance checks (Shelter beds, Potable water, ICU beds, Food packs, Arterial road clearance throughput).',
      highlights: ['6 Life-Support Vectors', 'Surplus/Deficit Auditing', 'Dynamic Hazard Buffers'],
      telemetryPayload: '{ red_zones_active: 14, capacity_surplus_pct: 81.4, vectors_checked: 6 }'
    },
    {
      step: '04',
      title: 'Explainable AI Relocation Planning',
      subtitle: 'Transparent Decision Logistics',
      icon: <Navigation className="w-6 h-6 text-emerald-400" />,
      image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=1200',
      description: 'Generates transparent, explainable relocation advisories with confidence percentages, evacuation cutoff windows, vehicle convoy requirements, and designated high-plinth shelters.',
      highlights: ['Priority Matrix (P1-P4)', 'XAI Feature Weights', 'Convoy Fleet Sizing'],
      telemetryPayload: '{ evac_priority: "P1_IMMEDIATE", convoy_units: 42, matching_algorithm: "XAI_SHAP" }'
    },
    {
      step: '05',
      title: 'Statutory Order Authorization',
      subtitle: 'DM Act 2005 Legal Compliance',
      icon: <FileCheck className="w-6 h-6 text-purple-400" />,
      image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200',
      description: 'District Magistrates and DDMA Chairpersons authorize legally binding evacuation orders under Section 34 of the Disaster Management Act, 2005 with immutable SHA-256 cryptographic audit logs.',
      highlights: ['Section 34 DMA Enactment', 'Cryptographic SHA-256 Logs', 'MHA Protocol Compliance'],
      telemetryPayload: '{ sha256_hash: "a9f21b7c...4e12", legal_compliance: "VERIFIED_DMA_2005" }'
    },
    {
      step: '06',
      title: 'Incident Command EOC Execution',
      subtitle: 'Tactical Multi-Agency Dispatch',
      icon: <Flame className="w-6 h-6 text-rose-500" />,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
      description: 'Activates Emergency Operations Center (EOC) Red State: NDRF/SDRF battalion dispatch, arterial road clearance coordination, live SITREP broadcasting, and emergency public cell broadcast SMS.',
      highlights: ['NDRF / SDRF SAR Routing', 'Cell Broadcast SMS Push', 'Live SITREP Broadcasts'],
      telemetryPayload: '{ eoc_state: "RED_ACTIVE", ndrf_dispatched: 20, cell_broadcasts_sent: 510000 }'
    }
  ];

  // Enhanced Modern Stakeholder Profiles with Imagery
  const stakeholders = [
    {
      id: 'national',
      title: 'National & State Authorities',
      agency: 'NDMA / MHA / SDMAs',
      badge: 'Strategic Command',
      icon: <Building2 className="w-6 h-6 text-amber-400" />,
      image: 'https://theindianeye.com/wp-content/uploads/2023/08/Cover-1.jpg',
      description: 'High-level federal and state disaster governance providing pan-India situational awareness, inter-state resource allocation, and unified national policy coordination.',
      capabilities: [
        'Macro-level national risk aggregation and multi-hazard forecasting',
        'Inter-state NDRF battalion mobilization and aerial asset dispatch',
        'Standardized MHA situation reporting (SITREP) automation'
      ],
      metrics: '36 States & UTs Connected • 24/7 National EOC'
    },
    {
      id: 'district',
      title: 'District Magistrates & Collectors',
      agency: 'DDMA Chairpersons',
      badge: 'Operational Authority',
      icon: <ShieldAlert className="w-6 h-6 text-red-400" />,
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1000',
      description: 'Frontline administrative leaders responsible for local vulnerability dossiers, explainable AI relocation advisories, and legally binding evacuation order execution.',
      capabilities: [
        'Section 34 Disaster Management Act 2005 statutory order authorization',
        'Real-time district carrying capacity balance checks (Shelters & Medical)',
        'Automated multilingual public cell broadcast SMS dispatch'
      ],
      metrics: '766 Districts Mapped • 100% Cryptographic Audit Logs'
    },
    {
      id: 'tactical',
      title: 'First Responders & SAR Forces',
      agency: 'NDRF / SDRF / Armed Forces',
      badge: 'Tactical Field Command',
      icon: <Users className="w-6 h-6 text-cyan-400" />,
      image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&q=80&w=1000',
      description: 'Specialized search, rescue, and medical evacuation units operating in high-risk red zones with GPS-guided routing and real-time operational feedback.',
      capabilities: [
        'GPS-guided tactical convoy routing avoiding blocked arterial corridors',
        'High-ground triage hub coordination and field hospital sync',
        'Live ground-level hazard tagging and situation reporting'
      ],
      metrics: '180+ Active Battalions • Sub-meter Field GIS'
    },
    {
      id: 'planners',
      title: 'Urban Planners & Engineers',
      agency: 'Municipal Corps & Town Planning',
      badge: 'Infrastructure Resilience',
      icon: <Compass className="w-6 h-6 text-emerald-400" />,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000',
      description: 'Infrastructure experts leveraging historical telemetry and hydrodynamic scenario simulations for long-term climate resilience and structural zoning.',
      capabilities: [
        'Interactive hydrodynamic stress-testing and flood crest routing',
        'Carrying capacity deficit mapping for urban expansion planning',
        'Critical asset vulnerability indexing and hardening'
      ],
      metrics: 'Advanced Sandbox Simulator • NSDI Census Integration'
    }
  ];

  const platformPillars = [
    {
      title: 'GIS Red-Zone Precision',
      icon: <Map className="w-6 h-6 text-red-400" />,
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800',
      description: 'Full Leaflet GIS integration with real Indian district polygons, contour hazard intensity overlays, and critical infrastructure tracking.',
      actionTab: 'risk_map' as const,
      actionText: 'Explore GIS Map',
      badge: 'GIS CORE'
    },
    {
      title: 'Explainable AI Decision Engine',
      icon: <Cpu className="w-6 h-6 text-amber-400" />,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
      description: 'Transparent decision trees explaining precisely why an evacuation is recommended, replacing black-box models with administrative credibility.',
      actionTab: 'relocation_intelligence' as const,
      actionText: 'View Relocation Hub',
      badge: 'XAI ENGINE'
    },
    {
      title: 'Carrying Capacity Matrix',
      icon: <Activity className="w-6 h-6 text-emerald-400" />,
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
      description: 'Real-time calculation of resource surpluses and deficits across shelters, potable water, medical ICU beds, and emergency rescue troops.',
      actionTab: 'carrying_capacity' as const,
      actionText: 'Analyze Capacities',
      badge: 'LIVE BALANCE'
    },
    {
      title: 'Hydrodynamic Scenario Simulator',
      icon: <CloudRain className="w-6 h-6 text-cyan-400" />,
      image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800',
      description: 'Interactive what-if stress-testing sandbox with precipitation intensity, dam spillway outflow, and soil saturation sliders.',
      actionTab: 'scenario_simulation' as const,
      actionText: 'Launch Simulator',
      badge: 'SANDBOX'
    },
    {
      title: 'Incident Command System (EOC)',
      icon: <ShieldAlert className="w-6 h-6 text-rose-500" />,
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
      description: 'Emergency Operations Center layout displaying live search and rescue teams, road blockages, and cell broadcast SMS alerts.',
      actionTab: 'incident_command' as const,
      actionText: 'Enter Incident Command',
      badge: 'TACTICAL'
    },
    {
      title: 'Official NDMA SITREP Briefings',
      icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
      description: 'Standardized national situation reporting with printable and PDF-exportable documentation compliant with MHA protocols.',
      actionTab: 'reports_sitrep' as const,
      actionText: 'View SITREP Reports',
      badge: 'COMPLIANT'
    }
  ];

  // FAQ data
  const faqItems = [
    {
      question: 'What data sources power AAPDA Intelligence?',
      answer: 'AAPDA Intelligence ingests real-time data from ISRO’s Cartosat-3 InSAR radar, IMD’s 34‑Doppler weather radar network, CWC’s 338 river gauges, NSDI socio‑economic census layers, and state‑level emergency operation logs. All feeds are validated and fused into a unified telemetry stream.'
    },
    {
      question: 'How does the AI ensure explainability for evacuation decisions?',
      answer: 'Our Physics‑Informed Neural Networks (PINN) and SHAP‑based feature attribution provide transparent, human‑understandable explanations. Every relocation advisory includes a confidence score and a ranked list of contributing factors (soil saturation, rainfall intensity, population density) so administrators can trust and verify recommendations.'
    },
    {
      question: 'Is AAPDA Intelligence compliant with Indian disaster laws?',
      answer: 'Yes. The platform is built to align with the Disaster Management Act, 2005, and supports statutory orders under Section 34. All legal authorisations are logged with SHA‑256 cryptographic hashes to ensure audit‑trail integrity and MHA protocol compliance.'
    },
    {
      question: 'Can the platform handle state‑level and district‑level customisation?',
      answer: 'Absolutely. Every state and district has its own vulnerability profiles, resource inventories, and local hazard maps. AAPDA Intelligence adapts through configurable carrying‑capacity thresholds, regional language support for cell broadcasts, and integration with state‑level SDMA dashboards.'
    },
    {
      question: 'How scalable is the system during a major multi‑state disaster?',
      answer: 'The microservices architecture and cloud‑native deployment allow seamless scaling to handle millions of simultaneous data points. During peak events, the platform can sustain 10,000+ concurrent users across national, state, and district command centres without performance degradation.'
    },
    {
      question: 'What training and support is provided to field officers?',
      answer: 'We offer role‑based onboarding, live simulation drills, and a dedicated 24×7 helpline. The interface is designed with an intuitive HUD and contextual guidance, reducing the learning curve for first‑time users while empowering experienced commanders with advanced analytics.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#010308] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200 flex flex-col relative overflow-x-hidden">

      {/* Ambient Background Glows */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-1/6 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[180px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-1/6 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[180px] pointer-events-none"
      />

      {/* 1. ADVANCED HERO SECTION WITH IMAGE TABS & HUD */}
      <section className="relative overflow-hidden pt-16 pb-24 px-4 md:px-8 border-b border-slate-800/80 bg-[#010308]">

        {/* Dynamic Background Image Switcher */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            key={heroImageTab}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.22, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center filter contrast-125 saturate-150 mix-blend-screen"
            style={{
              backgroundImage: `url('${heroImageTab === 'satellite' ? 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000' :
                heroImageTab === 'hydro' ? 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=2000' :
                  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=2000'
                }')`
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-end gap-3 mb-6 sm:mb-8 font-mono text-xs"
          >
            {/* Hero Image Context Selector */}
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-700/80 backdrop-blur-md max-w-full overflow-x-auto">
              <button
                onClick={() => setHeroImageTab('satellite')}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all whitespace-nowrap ${heroImageTab === 'satellite' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Satellite Radar
              </button>
              <button
                onClick={() => setHeroImageTab('hydro')}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all whitespace-nowrap ${heroImageTab === 'hydro' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Hydro Models
              </button>
              <button
                onClick={() => setHeroImageTab('command')}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all whitespace-nowrap ${heroImageTab === 'command' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                EOC Command
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-7 space-y-5 sm:space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-red-950/90 border border-red-700/80 text-red-300 font-mono text-[10px] sm:text-xs font-extrabold uppercase tracking-widest shadow-md">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                <span>NATIONAL DECISION SUPPORT PLATFORM</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[1.05] font-mono break-words">
                AAPDA <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 drop-shadow-md">INTELLIGENCE</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-sans font-normal max-w-2xl">
                AI-assisted GIS-enabled national disaster risk analysis, dynamic red-zone delineation, carrying capacity threshold evaluation, and proactive relocation decision-support system for India.
              </p>

              <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 font-mono text-sm">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(217,119,6,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTab('national_overview')}
                  className="px-6 sm:px-7 py-3.5 sm:py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-extrabold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2.5 border border-amber-400/50 group cursor-pointer"
                >
                  <span>ENTER COMMAND CENTER</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTab('risk_map')}
                  className="px-5 sm:px-6 py-3.5 sm:py-4 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold rounded-2xl shadow-xl backdrop-blur-md transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Map className="w-4 h-4 text-amber-400" />
                  <span>EXPLORE GIS RISK MAP</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Interactive Image-backed HUD Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              onMouseMove={handleMouseMove}
              className="lg:col-span-5 relative group"
            >
              <div className="p-7 rounded-3xl bg-slate-900/85 backdrop-blur-2xl border border-slate-700/80 shadow-2xl relative overflow-hidden group-hover:border-amber-500/50 transition-colors">

                {/* Card Thumbnail Background */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none mix-blend-luminosity filter contrast-125"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800')` }}
                />
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between pb-4 border-b border-slate-800 font-mono text-xs relative z-10">
                  <div className="flex items-center gap-2 text-amber-400">
                    <Terminal className="w-4 h-4" />
                    <span className="font-extrabold tracking-widest">COMMAND HUD v5.0</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold">
                    {simulationMode === 'hyper-resilience' ? 'HYPER-ACTIVE' : 'STANDARD'}
                  </span>
                </div>

                <div className="py-6 space-y-5 font-mono relative z-10">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Inhabitant Risk Exposure</span>
                      <span className="text-red-400 font-bold">{nationalStats.totalPopulationAtRisk.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <motion.div initial={{ width: 0 }} animate={{ width: '78%' }} transition={{ duration: 1.2 }} className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Shelter Capacity Headroom</span>
                      <span className="text-amber-400 font-bold">{nationalStats.shelterCapacityTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <motion.div initial={{ width: 0 }} animate={{ width: '42%' }} transition={{ duration: 1.2, delay: 0.2 }} className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Active SAR Battalions</span>
                      <span className="text-cyan-400 font-bold">{nationalStats.ndrfBattalionsDeployed} NDRF / {nationalStats.sdrfTeamsActive} SDRF</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <motion.div initial={{ width: 0 }} animate={{ width: '90%' }} transition={{ duration: 1.2, delay: 0.4 }} className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400 relative z-10">
                  <span>LATENCY: 12ms</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-bold">
                    <Zap className="w-3 h-3 text-amber-400 animate-bounce" /> AI SYNCHRONIZED
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 font-mono">
            {[
              { label: 'Tracked Inhabitants', val: nationalStats.totalPopulationAtRisk.toLocaleString('en-IN'), sub: '⚠️ In Active Red-Zones', color: 'text-white', subColor: 'text-red-400' },
              { label: 'Data Feeds Ingested', val: '12 Live Feeds', sub: 'ISRO • IMD • CWC • GSI', color: 'text-emerald-400', subColor: 'text-slate-400' },
              { label: 'Active Shelter Headroom', val: nationalStats.shelterCapacityTotal.toLocaleString('en-IN'), sub: '✓ 23% Occupied (Ample)', color: 'text-amber-400', subColor: 'text-emerald-400' },
              { label: 'SAR Deployment', val: `${nationalStats.ndrfBattalionsDeployed} NDRF Bn`, sub: `${nationalStats.sdrfTeamsActive} SDRF Tactical Teams`, color: 'text-white', subColor: 'text-sky-400' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6, borderColor: 'rgba(217, 119, 6, 0.6)' }}
                className="p-6 rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-slate-800 shadow-xl transition-all group cursor-pointer"
              >
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wide block">{stat.label}</span>
                <div className={`text-2xl sm:text-3xl font-black ${stat.color} mt-2 tracking-tight`}>{stat.val}</div>
                <span className={`text-[11px] ${stat.subColor} font-semibold block mt-1.5`}>{stat.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. PROBLEM STATEMENT SECTION */}
      <section className="py-28 px-4 md:px-8 border-b border-slate-800/80 bg-[#010308] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-700/80 text-red-300 font-mono text-xs font-bold uppercase tracking-wider shadow-md">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                <span>The Challenge</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
                Why India Needs <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-400">Smarter Disaster Intelligence</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-lg">
                Despite technological advances, disaster management in India still grapples with fragmented data, delayed decisions, and opaque reasoning – costing lives and resources.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  { icon: <XCircle className="w-5 h-5 text-red-400" />, title: 'Fragmented Data Silos', desc: 'ISRO, IMD, CWC, and state agencies operate in isolation – no unified telemetry fusion.' },
                  { icon: <XCircle className="w-5 h-5 text-red-400" />, title: 'Black‑Box Decision Making', desc: 'AI models lack explainability – administrators cannot justify evacuation orders with confidence.' },
                  { icon: <XCircle className="w-5 h-5 text-red-400" />, title: 'Resource Mismatch', desc: 'Real‑time carrying capacity (shelters, water, ICU) is not dynamically tracked – leading to shortages.' },
                  { icon: <XCircle className="w-5 h-5 text-red-400" />, title: 'Legal & Logistical Bottlenecks', desc: 'Manual statutory authorisations and convoy planning cause critical delays in the golden window.' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm hover:border-red-800/50 transition-colors"
                  >
                    <div className="mt-0.5">{item.icon}</div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-mono">{item.title}</h4>
                      <p className="text-xs text-slate-400 font-sans">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1000"
                  alt="Disaster management challenges"
                  className="w-full h-80 object-cover filter contrast-110 saturate-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#010308] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                  <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-lg border border-slate-800 text-slate-300">
                    ⚠️ Complex multi‑hazard scenarios
                  </span>
                  <span className="text-red-400 font-bold">CRITICAL GAPS</span>
                </div>
              </div>
              {/* floating stat */}
              <div className="absolute -bottom-6 -right-6 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl p-4 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Annual loss (avg.)</span>
                    <span className="text-lg font-black text-white">₹1.2L Cr</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. SOLUTION SECTION */}
      <section className="py-28 px-4 md:px-8 border-b border-slate-800/80 bg-slate-950/40 relative overflow-hidden">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/80 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>The AAPDA Intelligence Solution</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
              From Data to Action – <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Integrated & Explainable</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              AAPDA Intelligence closes the gap between raw telemetry and statutory evacuation orders, delivering a unified, transparent, and legally‑compliant decision support system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Database className="w-8 h-8 text-cyan-400" />,
                title: 'Unified Data Mesh',
                desc: 'Ingests and harmonises ISRO, IMD, CWC, and NSDI in real‑time, creating a single source of truth for all stakeholders.',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400'
              },
              {
                icon: <BrainCircuit className="w-8 h-8 text-amber-400" />,
                title: 'Physics‑Guided XAI',
                desc: 'Neural networks with transparent feature attribution – every evacuation recommendation comes with a clear, auditable rationale.',
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=400'
              },
              {
                icon: <Activity className="w-8 h-8 text-emerald-400" />,
                title: 'Dynamic Capacity Balancing',
                desc: 'Continuously updates shelter, water, ICU, and food inventories – flagging surpluses and deficits before they become critical.',
                image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=400'
              },
              {
                icon: <Lock className="w-8 h-8 text-purple-400" />,
                title: 'Legally Binding Workflows',
                desc: 'Section 34 DMA 2005 authorisation with SHA‑256 audit trails – ensures every order is tamper‑proof and legally defensible.',
                image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=400'
              },
              {
                icon: <Share2 className="w-8 h-8 text-indigo-400" />,
                title: 'Multi‑Agency Coordination',
                desc: 'Seamless handshake between NDMA, state SDMAs, district collectors, and field responders – all on a single operational picture.',
                image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=400'
              },
              {
                icon: <Radio className="w-8 h-8 text-rose-400" />,
                title: 'Real‑Time Incident Command',
                desc: 'EOC dashboard with live SAR tracking, cell broadcast SMS push, and automated SITREP generation for MHA compliance.',
                image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400'
              }
            ].map((sol, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 hover:border-emerald-500/50 shadow-xl overflow-hidden group transition-all"
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={sol.image} alt={sol.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-700 flex items-center justify-center shadow-inner">
                      {sol.icon}
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-white font-mono tracking-tight">{sol.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">{sol.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ADVANCED IMAGE-RICH "HOW IT WORKS" SECTION */}
      <section className="py-28 px-4 md:px-8 border-b border-slate-800/80 bg-[#010308] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-700/80 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>END-TO-END INTELLIGENCE PIPELINE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
              HOW AAPDA INTELLIGENCE WORKS
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
              An interactive 6-stage operational pipeline transforming raw satellite InSAR radar and meteorological feeds into legally binding statutory evacuation orders.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
            {workflowSteps.map((step, idx) => (
              <motion.button
                key={step.step}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveWorkflow(idx)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${activeWorkflow === idx
                  ? 'bg-gradient-to-b from-amber-600/20 to-slate-900 border-amber-500 text-white shadow-xl shadow-amber-600/10 ring-1 ring-amber-500/40'
                  : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-black ${activeWorkflow === idx ? 'text-amber-400' : 'text-slate-500'}`}>
                    STAGE {step.step}
                  </span>
                  {activeWorkflow === idx && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
                </div>
                <span className="text-xs font-bold font-sans line-clamp-2 text-slate-200">
                  {step.title}
                </span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeWorkflow}
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
              transition={{ duration: 0.4 }}
              className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-slate-700/80 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="lg:col-span-6 space-y-6 relative z-10">
                <div className="flex items-center gap-3.5">
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-700 shadow-inner">
                    {workflowSteps[activeWorkflow].icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-amber-400 font-extrabold tracking-widest block">
                      Stage {workflowSteps[activeWorkflow].step} • {workflowSteps[activeWorkflow].subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight mt-1">
                      {workflowSteps[activeWorkflow].title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                  {workflowSteps[activeWorkflow].description}
                </p>

                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-bold">Key Operational Highlights:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {workflowSteps[activeWorkflow].highlights.map((highlight, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-xs font-medium text-slate-200">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Explanatory Image & Telemetry Box */}
              <div className="lg:col-span-6 space-y-4 relative z-10">
                <div className="relative h-56 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl group">
                  <div className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('${workflowSteps[activeWorkflow].image}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#010308] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-200">
                    <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-lg border border-slate-800">📷 VISUAL CONTEXT: STAGE {workflowSteps[activeWorkflow].step}</span>
                    <span className="text-amber-400 font-bold">VERIFIED 100%</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-3 font-mono">
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-900">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <Terminal className="w-3.5 h-3.5" /> LIVE TELEMETRY PAYLOAD
                    </span>
                    <span className="text-emerald-400 text-[10px]">SECURE NODE</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#010308] border border-cyan-950 text-cyan-300 text-xs overflow-x-auto shadow-inner">
                    <code>{workflowSteps[activeWorkflow].telemetryPayload}</code>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 5. ADVANCED IMAGE-RICH "WHO USES IT" SECTION */}
      <section className="py-28 px-4 md:px-8 border-b border-slate-800/80 bg-slate-950/40 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-700/80 text-blue-300 font-mono text-xs font-bold uppercase tracking-wider shadow-md">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>INSTITUTIONAL GOVERNANCE ECOSYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
              WHO USES AAPDA INTELLIGENCE?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              Interlocking governance connecting central federal command authorities down to grassroots district collectors and tactical first responders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stakeholders.map((s, idx) => (
              <motion.div
                key={s.id}
                whileHover={{ y: -6 }}
                onClick={() => setActiveStakeholderTab(idx)}
                className={`rounded-3xl border transition-all flex flex-col justify-between overflow-hidden cursor-pointer relative ${activeStakeholderTab === idx
                  ? 'bg-slate-900/95 border-amber-500 shadow-2xl shadow-amber-500/10 ring-2 ring-amber-500/30'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                  }`}
              >
                {/* Stakeholder Card Image Header */}
                <div className="relative h-40 overflow-hidden border-b border-slate-800">
                  <div className="absolute inset-0 bg-cover bg-center filter contrast-110" style={{ backgroundImage: `url('${s.image}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className="p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700 shadow-inner">
                      {s.icon}
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] font-mono text-amber-400 font-extrabold uppercase tracking-wider block">{s.badge}</span>
                    <span className="text-xs font-mono text-slate-300 font-bold">{s.agency}</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-bold text-white font-mono tracking-tight">{s.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {s.description}
                  </p>

                  <div className="pt-4 border-t border-slate-800 space-y-3 font-mono">
                    <span className="text-[10px] text-cyan-400 font-bold block uppercase tracking-wider">Key Capabilities:</span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {s.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="font-sans text-[11px] leading-tight">{cap}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-3 text-[10px] text-slate-400 font-mono border-t border-slate-900/80">
                      ⚡ {s.metrics}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CORE PLATFORM PILLARS & MODULES WITH IMAGERY */}
      <section className="py-24 px-4 md:px-8 border-b border-slate-800/80 bg-[#010308]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/80 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider shadow-md">
              PLATFORM PILLARS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
              MISSION-CRITICAL CAPABILITIES
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              Built specifically for disaster administrators, field commanders, and emergency planners facing rapid-onset crises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformPillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8, scale: 1.01 }}
                className="rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden hover:border-slate-600 transition-all group"
              >
                {/* Pillar Image Preview */}
                <div className="relative h-44 overflow-hidden border-b border-slate-800">
                  <div className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('${pillar.image}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-700 flex items-center justify-center shadow-inner">
                      {pillar.icon}
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full bg-slate-950/90 backdrop-blur-md border border-slate-800 font-mono text-[10px] text-slate-300 font-extrabold tracking-wider">
                      {pillar.badge}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white font-mono tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: '#d97706' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(pillar.actionTab)}
                    className="w-full py-3.5 bg-slate-800/80 hover:bg-amber-600 text-slate-200 hover:text-white border border-slate-700 rounded-2xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg mt-4"
                  >
                    <span>{pillar.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="py-28 px-4 md:px-8 border-b border-slate-800/80 bg-slate-950/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-700/80 text-purple-300 font-mono text-xs font-bold uppercase tracking-wider shadow-md">
              <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
              Your Queries, Answered
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
              Everything you need to know about AAPDA Intelligence – from data sources to legal compliance.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 overflow-hidden shadow-lg hover:border-purple-800/50 transition-colors"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="text-sm sm:text-base font-bold text-white font-sans pr-8">{item.question}</span>
                  <motion.span
                    animate={{ rotate: faqOpen === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center border border-slate-700 group-hover:border-purple-500/50"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-400 transition-colors" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {faqOpen === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 text-sm text-slate-300 leading-relaxed font-sans border-t border-slate-800/60">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-xs text-slate-500 font-mono">
              Still have questions? Reach out to our support team at <span className="text-amber-400">support@aapda.gov.in</span>
            </p>
          </div>
        </div>
      </section>

      {/* 8. QUICK LAUNCH CTA SECTION */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-[#050b16] via-[#0d1d36] to-[#050b16] border-b border-[#142642] relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none filter contrast-125"
          style={{ backgroundImage: `url('https://plus.unsplash.com/premium_photo-1749010150570-366f704b7c96?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29tbWFuZCUyMGNlbnRlciUyMGltYWdlfGVufDB8fDB8fHww)` }}
        />
        <div className="absolute inset-0 bg-amber-500/5 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h3 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
            READY FOR OPERATIONAL COMMAND?
          </h3>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Access live GIS hazard polygons, interactive carrying capacity gauges, and statutory relocation workflows across all active national disaster sectors.
          </p>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4 font-mono text-sm">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(217, 119, 6, 0.5)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab('national_overview')}
              className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-2xl shadow-2xl shadow-amber-600/30 transition-all flex items-center gap-2.5 border border-amber-500/40"
            >
              <span>LAUNCH NATIONAL OVERVIEW</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab('reports_sitrep')}
              className="px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-600 text-slate-200 font-bold rounded-2xl transition-all shadow-xl backdrop-blur-md"
            >
              <span>VIEW OFFICIAL SITREP</span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* 9. COMPREHENSIVE GOVERNMENT FOOTER */}
      <GovernmentFooter />
    </div>
  );
};