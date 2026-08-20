import React from 'react';
import { LucideIcon, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

interface EmptyStateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon: Icon,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-900/30 p-12 text-center backdrop-blur-sm',
        className
      )}
    >
      <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-emerald-400">
        <Icon className="h-7 w-7" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
          <Sparkles className="h-2.5 w-2.5" />
        </span>
      </div>

      <h4 className="text-base font-semibold text-slate-100 font-mono tracking-tight">
        {title}
      </h4>

      <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-slate-400">
        {description}
      </p>

      {(actionLabel || secondaryActionLabel) && (
        <div className="mt-6 flex items-center gap-3">
          {secondaryActionLabel && onSecondaryAction && (
            <button
              onClick={onSecondaryAction}
              className="rounded-lg border border-slate-700 bg-slate-800/80 px-3.5 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            >
              {secondaryActionLabel}
            </button>
          )}

          {actionLabel && onAction && (
            <button
              onClick={onAction}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-1.5 text-xs font-medium text-slate-950 shadow-sm transition-all hover:bg-emerald-400 font-mono"
            >
              <span>{actionLabel}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
