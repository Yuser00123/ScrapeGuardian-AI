import React from 'react';
import { cn } from '../../lib/utils';
import { LucideIcon } from 'lucide-react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  badge?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  icon: Icon,
  badge,
  headerAction,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md glow-card',
        className
      )}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="rounded-md border border-slate-700 bg-slate-800/70 p-1.5 text-emerald-400">
              <Icon className="h-4 w-4" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-tight">
                {title}
              </h3>
              {badge && (
                <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 text-[10px] font-mono text-emerald-400">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-slate-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {headerAction && (
          <div className="flex items-center gap-2">
            {headerAction}
          </div>
        )}
      </div>

      <div className="w-full flex-1 min-h-[220px]">
        {children}
      </div>
    </div>
  );
};
