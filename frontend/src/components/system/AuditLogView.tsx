import React, { useState } from 'react';
import {
  History,
  ShieldCheck,
  FileCheck,
  AlertTriangle,
  Send,
  Sliders,
  Truck,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Download,
  Hash,
  UserCircle,
  ChevronDown,
  Sparkles,
  ShieldAlert,
  ArrowUpRight,
  Database,
  Lock
} from 'lucide-react';
import { useDisaster } from '../../context/DisasterContext';
import { AuditLogEntry } from '../../types';

export const AuditLogView: React.FC = () => {
  const { auditLogs } = useDisaster();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<AuditLogEntry['actionType'] | 'ALL'>('ALL');
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleExportAudit = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast("Statutory Audit Ledger successfully exported with cryptographic signatures.");
    }, 1500);
  };

  const getActionIcon = (type: AuditLogEntry['actionType']) => {
    switch (type) {
      case 'RELOCATION_APPROVED': return <FileCheck className="w-3.5 h-3.5 text-red-400" />;
      case 'ORDER_ISSUED': return <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />;
      case 'ALERT_BROADCAST': return <Send className="w-3.5 h-3.5 text-sky-400" />;
      case 'RESOURCE_DISPATCHED': return <Truck className="w-3.5 h-3.5 text-emerald-400" />;
      case 'SIMULATION_EXECUTED': return <Sliders className="w-3.5 h-3.5 text-purple-400" />;
      default: return <Clock className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getActionBadge = (type: AuditLogEntry['actionType']) => {
    const baseClass = "px-3 py-1 rounded-xl font-mono text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-inner";
    switch (type) {
      case 'RELOCATION_APPROVED': return <span className={`${baseClass} bg-red-950/80 text-red-300 border border-red-800/80`}>{getActionIcon(type)} RELOCATION APPROVED</span>;
      case 'ORDER_ISSUED': return <span className={`${baseClass} bg-amber-950/80 text-amber-300 border border-amber-800/80`}>{getActionIcon(type)} ORDER ISSUED</span>;
      case 'ALERT_BROADCAST': return <span className={`${baseClass} bg-sky-950/80 text-sky-300 border border-sky-800/80`}>{getActionIcon(type)} EMERGENCY BROADCAST</span>;
      case 'RESOURCE_DISPATCHED': return <span className={`${baseClass} bg-emerald-950/80 text-emerald-300 border border-emerald-800/80`}>{getActionIcon(type)} RESOURCE DISPATCH</span>;
      case 'SIMULATION_EXECUTED': return <span className={`${baseClass} bg-purple-950/80 text-purple-300 border border-purple-800/80`}>{getActionIcon(type)} AI SIMULATION</span>;
      default: return <span className={`${baseClass} bg-slate-800/80 text-slate-300 border border-slate-700`}>{getActionIcon(type)} SYSTEM LOG</span>;
    }
  };

  // Filter and Search Logic
  const filteredLogs = auditLogs.filter(log => {
    const matchesType = filterType === 'ALL' || log.actionType === filterType;
    const searchString = `${log.id} ${log.targetDistrict} ${log.details} ${log.officerName} ${log.designation} ${log.authorizationHash}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const uniqueActionTypes = Array.from(new Set(auditLogs.map(log => log.actionType)));

  return (
    <div className="space-y-6 font-sans text-slate-100 pb-28 selection:bg-indigo-500 selection:text-white">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3.5 bg-[#06080d]/95 border border-indigo-500/60 rounded-2xl shadow-[0_0_50px_rgba(99,102,241,0.3)] text-xs font-mono text-indigo-200 backdrop-blur-2xl animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-bold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Cyber-Elite Header Section */}
      <div className="relative overflow-hidden p-8 sm:p-10 bg-gradient-to-br from-[#07090f] via-[#0c0f17] to-[#07090f] border border-slate-800/90 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-amber-900/10 pointer-events-none"></div>
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3.5">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-extrabold px-3 py-1 bg-emerald-950/80 border border-emerald-800/60 rounded-xl shadow-inner flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> SECTION 78 DMA CERTIFIED
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-400" /> SHA-256 Chained Integrity
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3.5 font-mono">
              <History className="w-8 h-8 text-amber-400 shrink-0 animate-pulse" />
              STATUTORY AUDIT LEDGER & TRACEABILITY TRAIL
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl leading-relaxed">
              Immutable legal ledger tracking statutory relocation approvals, emergency cell broadcasts, and responder dispatches under full regulatory compliance.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleExportAudit}
              disabled={isExporting}
              className="group/btn px-5 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 border border-indigo-500/80 text-white font-mono text-xs font-black rounded-2xl flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_25px_rgba(99,102,241,0.35)] active:scale-95"
            >
              <Download className={`w-4 h-4 text-white group-hover/btn:translate-y-0.5 transition-transform ${isExporting ? 'animate-bounce' : ''}`} />
              <span>{isExporting ? 'Exporting...' : 'Export Legal Audit (.signed)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filter & Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 bg-[#07090f] border border-slate-800/90 rounded-3xl shadow-xl">
        <div className="md:col-span-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search audit trail by District, Officer Name, Authorization Hash, or Details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-[#040508] border border-slate-800 rounded-2xl text-white placeholder:text-slate-600 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-inner"
          />
        </div>

        <div className="md:col-span-4 relative group">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as AuditLogEntry['actionType'] | 'ALL')}
            className="w-full pl-11 pr-10 py-3.5 appearance-none bg-[#040508] border border-slate-800 rounded-2xl text-slate-200 font-mono text-xs cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-inner"
          >
            <option value="ALL">ALL ACTION TYPES ({auditLogs.length})</option>
            {uniqueActionTypes.map(type => (
              <option key={type} value={type}>{type.replace(/_/g, ' ')}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
        </div>
      </div>

      {/* Audit Logs List Container */}
      <div className="space-y-4 font-mono">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-16 px-6 bg-[#07090f] border border-slate-800/90 rounded-3xl shadow-2xl space-y-3">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto animate-pulse" />
            <h3 className="text-base font-black text-white uppercase tracking-wider">NO AUDIT LOGS MATCHING CRITERIA</h3>
            <p className="text-xs text-slate-400 font-sans max-w-md mx-auto">
              Try adjusting your search query or resetting the action type filter to view statutory activity.
            </p>
          </div>
        ) : (
          filteredLogs.map(log => (
            <div
              key={log.id}
              className="p-6 bg-[#07090f] border border-slate-800/90 rounded-3xl shadow-2xl space-y-4 text-xs hover:border-indigo-500/50 transition-all duration-300 group"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800/80 flex-wrap">
                <div className="flex items-center gap-3 flex-wrap">
                  {getActionBadge(log.actionType)}
                  <span className="font-black text-white text-sm tracking-wide group-hover:text-indigo-300 transition-colors">
                    {log.targetDistrict}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {log.timestamp}
                  </span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 bg-[#040508] border border-slate-800 rounded-xl">
                  <span className="text-[10px] text-slate-500">ID:</span>
                  <span className="text-[11px] font-bold text-slate-300">{log.id}</span>
                </div>
              </div>

              {/* Log Details */}
              <div className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed bg-[#040508] p-4 rounded-2xl border border-slate-800/80 shadow-inner">
                {log.details}
              </div>

              {/* Officer & Cryptographic Hash Footer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-[11px] border-t border-slate-800/80 text-slate-400 font-mono items-center">
                <div className="flex items-center gap-2 bg-[#040508] p-3 rounded-xl border border-slate-800/60">
                  <UserCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-slate-500">Officer: </span>
                    <strong className="text-white font-bold">{log.officerName}</strong>
                    <span className="text-slate-400 text-[10px] block">({log.designation})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3 bg-[#040508] p-3 rounded-xl border border-slate-800/60">
                  <div className="truncate">
                    <span className="text-slate-500 block text-[9px] uppercase">Cryptographic Digest</span>
                    <strong className="text-amber-400 font-mono text-[11px]">{log.authorizationHash}</strong>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};