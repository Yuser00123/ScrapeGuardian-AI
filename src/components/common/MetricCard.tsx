import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { AnimatedCounter } from './AnimatedCounter';

interface MetricCardProps {
  title: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
  icon: LucideIcon;
  badge?: string;
  accentColor?: 'emerald' | 'rose' | 'amber' | 'blue' | 'purple' | 'teal' | 'cyan' | 'orange' | string;
  subtext?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  trend,
  icon: Icon,
  badge,
  accentColor = 'emerald',
  subtext,
  className,
}) => {
  const colorMap: Record<string, { iconBg: string; glow: string; tag: string }> = {
    emerald: {
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      glow: 'hover:border-emerald-500/30',
      tag: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    },
    teal: {
      iconBg: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
      glow: 'hover:border-teal-500/30',
      tag: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
    },
    cyan: {
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      glow: 'hover:border-cyan-500/30',
      tag: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    },
    rose: {
      iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      glow: 'hover:border-rose-500/30',
      tag: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    },
    amber: {
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      glow: 'hover:border-amber-500/30',
      tag: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    },
    orange: {
      iconBg: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      glow: 'hover:border-orange-500/30',
      tag: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    },
    blue: {
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      glow: 'hover:border-blue-500/30',
      tag: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    },
    purple: {
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      glow: 'hover:border-purple-500/30',
      tag: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    },
  };

  const scheme = colorMap[accentColor] || colorMap.emerald;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md transition-all duration-200 glow-card hover:bg-slate-900/90',
        scheme.glow,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-3xl font-bold tracking-tight text-slate-50 font-mono">
              <AnimatedCounter
                value={value}
                decimals={decimals}
                prefix={prefix}
                suffix={suffix}
              />
            </h3>
            {badge && (
              <span className={cn('rounded px-1.5 py-0.5 text-[10px] font-mono font-medium border', scheme.tag)}>
                {badge}
              </span>
            )}
          </div>
        </div>

        <div className={cn('rounded-lg border p-2.5', scheme.iconBg)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-800/60 pt-3 text-xs">
        {trend ? (
          <div className="flex items-center gap-1.5 font-medium">
            <span
              className={cn(
                'flex items-center gap-0.5 font-mono text-xs font-semibold',
                trend.isPositive ? 'text-emerald-400' : 'text-rose-400'
              )}
            >
              {trend.isPositive ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {trend.value > 0 ? `+${trend.value}%` : `${trend.value}%`}
            </span>
            <span className="text-slate-400">{trend.label}</span>
          </div>
        ) : (
          <span className="text-slate-400 text-[11px]">{subtext || 'Bright Data live telemetry'}</span>
        )}

        <div className="flex h-1.5 w-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
      </div>
    </div>
  );
};
