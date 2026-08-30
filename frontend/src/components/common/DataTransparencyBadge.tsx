import React, { useState } from 'react';
import { ShieldCheck, Info, Database, Clock, Activity } from 'lucide-react';

interface DataTransparencyBadgeProps {
  sources?: string[];
  lastUpdated?: string;
  confidence?: 'High' | 'Moderate' | 'Low' | number;
  modelMethod?: string;
  className?: string;
}

export const DataTransparencyBadge: React.FC<DataTransparencyBadgeProps> = ({
  sources = ['IMD Doppler Radar', 'ISRO Bhuvan InSAR', 'CWC Hydrology', 'Census GIS'],
  lastUpdated = '10:42 IST',
  confidence = 'High',
  modelMethod = 'ISRO-GSI Multi-Hazard Susceptibility Model v4.2',
  className = '',
}) => {
  const [open, setOpen] = useState(false);

  const confidenceDisplay = typeof confidence === 'number' ? `${confidence}%` : confidence;
  const confidenceColor = 
    typeof confidence === 'number' 
      ? confidence >= 90 ? 'text-emerald-400' : confidence >= 75 ? 'text-amber-400' : 'text-orange-400'
      : confidence === 'High' ? 'text-emerald-400' : 'text-amber-400';

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#070F1E] hover:bg-slate-800 border border-slate-700/70 text-[11px] font-mono text-slate-300 transition-colors"
        title="Click to view Government Data Transparency & Provenance"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-slate-400">DATA PROVENANCE:</span>
        <span className="text-slate-200 font-semibold">{sources[0] || 'Multi-Agency'}</span>
        <span className="text-slate-500">•</span>
        <span className={confidenceColor}>Confidence: {confidenceDisplay}</span>
        <Info className="w-3 h-3 text-slate-400 ml-0.5" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-80 p-3 bg-[#0B192C] border border-slate-700 rounded shadow-gov-lg z-50 text-xs font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-slate-700/80 mb-2.5">
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-slate-300 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-amber-500" />
              Intelligence Data Provenance
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-white font-mono text-xs"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">
                Integrated Data Sources
              </span>
              <div className="flex flex-wrap gap-1">
                {sources.map((src, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-200 font-mono"
                  >
                    {src}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Last Telemetry Sync
                </span>
                <span className="font-mono text-slate-200 font-medium">{lastUpdated}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                  <Activity className="w-3 h-3" /> Confidence Index
                </span>
                <span className={`font-mono font-bold ${confidenceColor}`}>{confidenceDisplay}</span>
              </div>
            </div>

            <div className="pt-1 border-t border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">
                Decision Calculation Model
              </span>
              <span className="text-[11px] text-slate-300 font-mono">
                {modelMethod}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
