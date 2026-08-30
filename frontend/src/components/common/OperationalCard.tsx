import React from 'react';

interface OperationalCardProps {
  title: string;
  value: string | number;
  subvalue?: string;
  caption?: string;
  icon?: React.ReactNode;
  status?: 'critical' | 'warning' | 'normal' | 'info' | 'neutral';
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    label: string;
  };
  onClick?: () => void;
  className?: string;
}

export const OperationalCard: React.FC<OperationalCardProps> = ({
  title,
  value,
  subvalue,
  caption,
  icon,
  status = 'neutral',
  trend,
  onClick,
  className = '',
}) => {
  const getStatusBorder = () => {
    switch (status) {
      case 'critical':
        return 'border-l-4 border-l-red-600 border-gov-slate-700/60 bg-[#0B192C]';
      case 'warning':
        return 'border-l-4 border-l-amber-500 border-gov-slate-700/60 bg-[#0B192C]';
      case 'normal':
        return 'border-l-4 border-l-emerald-500 border-gov-slate-700/60 bg-[#0B192C]';
      case 'info':
        return 'border-l-4 border-l-sky-500 border-gov-slate-700/60 bg-[#0B192C]';
      case 'neutral':
      default:
        return 'border border-gov-slate-700/60 bg-[#0B192C]';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative p-3.5 rounded shadow-gov-sm transition-all duration-150 ${getStatusBorder()} ${onClick ? 'cursor-pointer hover:border-slate-500 hover:bg-[#0f2139]' : ''} ${className}`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold truncate">
          {title}
        </span>
        {icon && <span className="text-slate-400/80 shrink-0">{icon}</span>}
      </div>

      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="text-2xl font-bold font-mono text-white tracking-tight">
          {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
        </span>
        {subvalue && (
          <span className="text-xs font-mono text-slate-400">
            {subvalue}
          </span>
        )}
      </div>

      {(caption || trend) && (
        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
          {caption && <span className="truncate">{caption}</span>}
          {trend && (
            <span
              className={`font-mono font-medium flex items-center gap-0.5 ${
                trend.direction === 'up' && status === 'critical'
                  ? 'text-red-400'
                  : trend.direction === 'down' && status === 'normal'
                  ? 'text-emerald-400'
                  : 'text-slate-300'
              }`}
            >
              {trend.direction === 'up' ? '▲' : trend.direction === 'down' ? '▼' : '—'} {trend.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
