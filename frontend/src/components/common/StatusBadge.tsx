import React from 'react';
import { RiskSeverity } from '../../types';

interface StatusBadgeProps {
  severity?: RiskSeverity;
  label?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'subtle';
  pulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  severity = 'LOW',
  label,
  size = 'sm',
  variant = 'subtle',
  pulse = false,
}) => {
  const getSeverityStyles = () => {
    switch (severity) {
      case 'CRITICAL':
        return {
          bg: 'bg-red-950/80',
          text: 'text-red-300',
          border: 'border-red-600/80',
          indicator: 'bg-red-500',
          glow: 'shadow-sm shadow-red-900/50',
        };
      case 'VERY_HIGH':
        return {
          bg: 'bg-orange-950/80',
          text: 'text-orange-300',
          border: 'border-orange-600/80',
          indicator: 'bg-orange-500',
          glow: 'shadow-sm shadow-orange-900/50',
        };
      case 'HIGH':
        return {
          bg: 'bg-amber-950/80',
          text: 'text-amber-300',
          border: 'border-amber-600/80',
          indicator: 'bg-amber-500',
          glow: 'shadow-sm shadow-amber-900/50',
        };
      case 'MODERATE':
        return {
          bg: 'bg-yellow-950/60',
          text: 'text-yellow-300',
          border: 'border-yellow-600/60',
          indicator: 'bg-yellow-500',
          glow: '',
        };
      case 'LOW':
      default:
        return {
          bg: 'bg-emerald-950/60',
          text: 'text-emerald-300',
          border: 'border-emerald-600/60',
          indicator: 'bg-emerald-500',
          glow: '',
        };
    }
  };

  const styles = getSeverityStyles();
  const displayLabel = label || severity.replace('_', ' ');

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm font-semibold',
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono uppercase tracking-wider font-medium rounded border ${styles.bg} ${styles.text} ${styles.border} ${styles.glow} ${sizeClasses}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${styles.indicator} ${pulse || severity === 'CRITICAL' ? 'animate-ping inline-flex' : ''}`}
      />
      <span>{displayLabel}</span>
    </span>
  );
};
