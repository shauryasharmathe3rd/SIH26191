import React from 'react';
import { RiskSeverity } from '../../types';

interface RiskScoreGaugeProps {
  score: number; // 0 to 100
  severity?: RiskSeverity;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showCategory?: boolean;
}

export const RiskScoreGauge: React.FC<RiskScoreGaugeProps> = ({
  score,
  size = 'md',
  label = 'RISK SCORE',
  showCategory = true,
}) => {
  const getScoreColor = (val: number) => {
    if (val >= 90) return { stroke: '#DC2626', bg: 'text-red-500', text: 'CRITICAL' };
    if (val >= 80) return { stroke: '#EA580C', bg: 'text-orange-500', text: 'VERY HIGH' };
    if (val >= 65) return { stroke: '#D97706', bg: 'text-amber-500', text: 'HIGH' };
    if (val >= 40) return { stroke: '#CA8A04', bg: 'text-yellow-500', text: 'MODERATE' };
    return { stroke: '#059669', bg: 'text-emerald-500', text: 'LOW' };
  };

  const { stroke, bg, text } = getScoreColor(score);

  const radius = size === 'sm' ? 24 : size === 'lg' ? 44 : 34;
  const strokeWidth = size === 'sm' ? 4 : size === 'lg' ? 7 : 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const dimension = (radius + strokeWidth) * 2;

  return (
    <div className="flex items-center gap-3">
      <div className="relative inline-flex items-center justify-center shrink-0">
        <svg
          width={dimension}
          height={dimension}
          className="transform -rotate-90"
        >
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke="#1E293B"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className={`font-mono font-bold text-white ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-xl' : 'text-sm'}`}>
            {score}
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-medium">
          {label}
        </span>
        {showCategory && (
          <span className={`text-xs font-mono font-bold uppercase tracking-wide ${bg}`}>
            {text}
          </span>
        )}
      </div>
    </div>
  );
};
