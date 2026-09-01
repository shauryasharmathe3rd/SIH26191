import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  PhoneCall,
  ArrowUpRight,
  MapPin,
  ExternalLink,
  Radio,
  Lock,
  Layers,
  Globe,
  Award,
  FileCheck,
  ShieldCheck,
  Activity,
  Zap
} from 'lucide-react';
import { useDisaster } from '../../context/DisasterContext';
import { ActiveTab } from '../../types';
import { motion, Variants } from 'framer-motion';

export const GovernmentFooter: React.FC = () => {
  const { setActiveTab } = useDisaster();
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [systemPing, setSystemPing] = useState<number>(6);
  const [activeTabIndicator, setActiveTabIndicator] = useState<ActiveTab>('risk_map');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    const pingTimer = setInterval(() => {
      setSystemPing(Math.floor(Math.random() * 3) + 5);
    }, 4000);

    return () => clearInterval(pingTimer);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="bg-[#070f22] text-slate-300 font-sans border-t-4 border-cyan-500 mt-28 relative overflow-hidden shadow-[0_-40px_120px_rgba(0,0,0,0.9)]"
    >

      {/* ========================================================================
        BACKGROUND BLURRED IMAGE MATRIX & GLOW EFFECTS
        ======================================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-screen">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-950 via-[#070f22]/90 to-[#070f22]" />
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070&auto=format&fit=crop"
          alt="Tactical Geospatial Matrix"
          className="w-full h-full object-cover filter brightness-50 contrast-125 saturate-150 blur-[2px]"
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d40a_1px,transparent_1px),linear-gradient(to_bottom,#06b6d40a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none z-0" />
      <div className="absolute -top-24 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* ========================================================================
        OFFICIAL GOVERNMENT STRIP & CERTIFICATION BADGES BAR
        ======================================================================== */}
      <motion.div
        variants={itemVariants}
        className="bg-[#040814]/90 backdrop-blur-md border-b border-cyan-500/20 px-4 md:px-12 py-3 text-xs relative z-10"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="bg-cyan-950/80 text-cyan-300 font-bold px-2.5 py-1 rounded border border-cyan-700/50 flex items-center gap-1.5 uppercase text-[10px] tracking-wider shadow-sm"
            >
              <Award className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> S3WaaS Framework
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="bg-slate-900/90 text-slate-300 font-semibold px-2.5 py-1 rounded border border-slate-700/80 flex items-center gap-1.5 text-[10px] shadow-sm"
            >
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" /> STQC Certified Secure
            </motion.span>
            <span className="text-slate-400 text-[11px] hidden lg:inline flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Designed, Developed and Hosted by National Informatics Centre (NIC)
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="text-cyan-400 flex items-center gap-1 bg-cyan-950/50 px-2.5 py-1 rounded border border-cyan-500/20">
              <Radio className="w-3 h-3 animate-pulse text-cyan-400" /> EOC-PING: {systemPing}ms
            </span>
            <span className="text-emerald-400 flex items-center gap-1 bg-emerald-950/50 px-2.5 py-1 rounded border border-emerald-500/20">
              <Lock className="w-3 h-3" /> SSL TLS 1.3
            </span>
          </div>

        </div>
      </motion.div>

      {/* ========================================================================
        MAIN PRODUCTION FOOTER ARCHITECTURE (4 COLUMNS) WITH STAGGERED MOTION
        ======================================================================== */}
      <motion.div
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10"
      >

        {/* Column 1: About Portal & Authority */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg border border-cyan-400/40 shrink-0"
            >
              <ShieldAlert className="w-5 h-5" />
            </motion.div>
            <div>
              <h3 className="text-white font-bold text-sm tracking-wide uppercase">AAPDA INTELLIGENCE</h3>
              <p className="text-[10px] text-cyan-400 font-medium flex items-center gap-1">
                <Activity className="w-3 h-3 animate-pulse" /> National Disaster Management Authority
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-300/90 leading-relaxed">
            A comprehensive sovereign decision support system for multi-hazard risk assessment, predictive analytics, and real-time emergency coordination across India.
          </p>

          <div className="pt-2 text-[11px] text-slate-400 space-y-1 font-mono bg-slate-900/60 p-3 rounded-xl border border-cyan-500/15">
            <p className="text-cyan-300 font-semibold flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-cyan-400" /> Ministry of Home Affairs
            </p>
            <p className="text-slate-300">Government of India</p>
          </div>
        </motion.div>

        {/* Column 2: Quick Command Links */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-cyan-500/30 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-cyan-400" /> Command Modules
          </h4>
          <ul className="space-y-2 text-xs">
            {[
              { label: 'Multi-Hazard GIS Risk Map', tab: 'risk_map' as ActiveTab },
              { label: 'Red-Zone Buffers & Polygons', tab: 'red_zones' as ActiveTab },
              { label: 'Carrying Capacity Matrix', tab: 'carrying_capacity' as ActiveTab },
              { label: 'Relocation Logistics Suite', tab: 'relocation_intelligence' as ActiveTab },
              { label: 'Incident Command (EOC)', tab: 'incident_command' as ActiveTab },
            ].map((link, idx) => (
              <motion.li key={idx} whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                <button
                  onClick={() => {
                    setActiveTab(link.tab);
                    setActiveTabIndicator(link.tab);
                  }}
                  className={`w-full text-left flex items-center justify-between py-2 px-2.5 rounded-lg transition-all border ${activeTabIndicator === link.tab
                    ? 'bg-cyan-950/80 text-cyan-300 font-semibold border-cyan-500/50 shadow-sm'
                    : 'bg-slate-900/40 hover:bg-slate-900 border-transparent hover:border-cyan-500/30 text-slate-400 hover:text-cyan-300'
                    }`}
                >
                  <span className="truncate flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className="truncate">{link.label}</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 opacity-60 shrink-0 text-cyan-400" />
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Column 3: Important Government Links */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-cyan-500/30 flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-cyan-400" /> Related Portals
          </h4>
          <ul className="space-y-2 text-xs">
            {[
              { name: 'National Disaster Management Authority', url: 'https://ndma.gov.in' },
              { name: 'Ministry of Home Affairs (MHA)', url: 'https://mha.gov.in' },
              { name: 'India Meteorological Department', url: 'https://mausam.imd.gov.in' },
              { name: 'Central Water Commission', url: 'https://cwc.gov.in' },
              { name: 'ISRO National Remote Sensing Centre', url: 'https://nrsc.gov.in' },
            ].map((portal, idx) => (
              <motion.li key={idx} whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-300 flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-slate-900/30 hover:bg-slate-900/80 border border-transparent hover:border-cyan-500/20 transition-all truncate"
                >
                  <span className="truncate">{portal.name}</span>
                  <ExternalLink className="w-3 h-3 opacity-50 shrink-0 text-cyan-400" />
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Column 4: Emergency Contacts & Location */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white pb-2 border-b border-cyan-500/30 flex items-center gap-2">
            <PhoneCall className="w-3.5 h-3.5 text-cyan-400 animate-bounce" /> Emergency Helpline
          </h4>

          <div className="space-y-2 text-xs">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-slate-900/80 backdrop-blur p-2.5 rounded-xl border border-cyan-500/20 flex items-center justify-between shadow-sm"
            >
              <span className="text-slate-300">NDMA Control Room:</span>
              <a href="tel:1078" className="text-cyan-400 font-bold text-sm tracking-wider hover:underline flex items-center gap-1">
                1078
              </a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-slate-900/80 backdrop-blur p-2.5 rounded-xl border border-cyan-500/20 flex items-center justify-between shadow-sm"
            >
              <span className="text-slate-300">National Emergency SOS:</span>
              <a href="tel:112" className="text-cyan-400 font-bold text-sm tracking-wider hover:underline flex items-center gap-1">
                112
              </a>
            </motion.div>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1.5 bg-slate-900/40 p-3 rounded-xl border border-cyan-500/10">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">NDMA Bhawan, A-1, Safdarjung Enclave, New Delhi - 110029</span>
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>

      {/* ========================================================================
        BOTTOM COPYRIGHT & COMPLIANCE FOOTER DISCLAIMER BAR
        ======================================================================== */}
      <motion.div
        variants={itemVariants}
        className="bg-[#040814] border-t border-cyan-500/20 px-4 md:px-12 py-5 text-xs text-slate-400 relative z-10"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">

          <div className="space-y-1">
            <p className="text-slate-300 font-medium">
              © {currentYear} All Rights Reserved.
            </p>

          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
            <a href="#terms" className="hover:text-cyan-300 transition-colors">Terms & Conditions</a>
            <span className="text-slate-600">|</span>
            <a href="#privacy" className="hover:text-cyan-300 transition-colors">Privacy Policy</a>
            <span className="text-slate-600">|</span>
            <a href="#hyperlink" className="hover:text-cyan-300 transition-colors">Hyperlinking Policy</a>
            <span className="text-slate-600">|</span>
            <a href="#disclaimer" className="hover:text-cyan-300 transition-colors">Disclaimer</a>
          </div>

        </div>
      </motion.div>
    </motion.footer>
  );
};