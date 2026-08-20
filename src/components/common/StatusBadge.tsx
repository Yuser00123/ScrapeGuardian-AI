import React from 'react';
import { CollectorStatus, HealingPipelineStage, ImpactLevel } from '../../types/firestore';
import { cn } from '../../lib/utils';
import { Activity, AlertTriangle, CheckCircle2, PauseCircle, RefreshCw, XCircle, Zap } from 'lucide-react';

interface StatusBadgeProps {
  status: CollectorStatus | HealingPipelineStage | ImpactLevel | 'success' | 'warning' | 'error' | 'info';
  showIcon?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showIcon = true,
  className,
  size = 'md',
}) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'healthy':
      case 'success':
      case 'completed':
      case 'succeeded':
        return {
          label: 'HEALTHY',
          icon: CheckCircle2,
          bgColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          dotColor: 'bg-emerald-400',
        };
      case 'degraded':
      case 'warning':
      case 'medium':
        return {
          label: 'DEGRADED',
          icon: AlertTriangle,
          bgColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          dotColor: 'bg-amber-400',
        };
      case 'broken':
      case 'error':
      case 'critical':
      case 'failed':
        return {
          label: 'BROKEN',
          icon: XCircle,
          bgColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          dotColor: 'bg-rose-400',
        };
      case 'healing':
      case 'repair':
      case 'diagnosis':
      case 'detection':
      case 'validation':
      case 'deployment':
        return {
          label: status.toUpperCase(),
          icon: RefreshCw,
          bgColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30 animate-pulse',
          dotColor: 'bg-blue-400',
        };
      case 'paused':
        return {
          label: 'PAUSED',
          icon: PauseCircle,
          bgColor: 'bg-slate-800 text-slate-400 border-slate-700',
          dotColor: 'bg-slate-500',
        };
      case 'high':
        return {
          label: 'HIGH IMPACT',
          icon: Zap,
          bgColor: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
          dotColor: 'bg-orange-400',
        };
      case 'low':
      case 'info':
      default:
        return {
          label: status.toUpperCase(),
          icon: Activity,
          bgColor: 'bg-slate-800/80 text-slate-300 border-slate-700',
          dotColor: 'bg-slate-400',
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-[11px] gap-1.5' 
    : 'px-2.5 py-1 text-xs gap-1.5 font-medium';

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border font-mono uppercase tracking-wider',
        config.bgColor,
        sizeClasses,
        className
      )}
    >
      {showIcon && (
        <span className={cn('relative flex h-1.5 w-1.5 rounded-full', config.dotColor)}>
          {status === 'healing' && (
            <span className="absolute -inset-0.5 rounded-full bg-blue-400 opacity-75 animate-ping" />
          )}
        </span>
      )}
      <Icon className={cn('h-3 w-3', status === 'healing' ? 'animate-spin' : '')} />
      <span>{config.label}</span>
    </span>
  );
};
