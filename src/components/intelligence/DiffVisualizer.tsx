import React from 'react';
import { DiffPayload } from '../../types/firestore';
import { ArrowRight, Minus, Plus, TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DiffVisualizerProps {
  diffs: DiffPayload[];
}

export const DiffVisualizer: React.FC<DiffVisualizerProps> = ({ diffs }) => {
  if (!diffs || diffs.length === 0) return null;

  return (
    <div className="space-y-2 font-mono text-xs">
      {diffs.map((diff, idx) => (
        <div
          key={idx}
          className="rounded-lg border border-slate-800 bg-slate-950/80 p-2.5 overflow-hidden"
        >
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
            <span className="font-semibold text-slate-300">
              {diff.fieldName}
            </span>
            {diff.percentageDelta !== undefined && diff.percentageDelta !== 0 && (
              <span
                className={cn(
                  'flex items-center gap-0.5 rounded px-1.5 py-0.2 text-[10px] font-bold',
                  diff.percentageDelta < 0
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                )}
              >
                {diff.percentageDelta < 0 ? (
                  <TrendingDown className="h-3 w-3" />
                ) : (
                  <TrendingUp className="h-3 w-3" />
                )}
                {diff.percentageDelta > 0 ? `+${diff.percentageDelta}%` : `${diff.percentageDelta}%`}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            {/* Before */}
            <div className="flex items-start gap-1.5 rounded bg-rose-500/5 border border-rose-500/20 p-2 text-rose-300">
              <Minus className="h-3.5 w-3.5 text-rose-400 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-wider text-rose-400 font-bold">PREVIOUS VALUE</p>
                <p className="mt-0.5 break-all font-mono text-slate-300 line-through opacity-80">
                  {diff.before === null ? 'null / empty' : String(diff.before)}
                </p>
              </div>
            </div>

            {/* After */}
            <div className="flex items-start gap-1.5 rounded bg-emerald-500/5 border border-emerald-500/20 p-2 text-emerald-300">
              <Plus className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold">DETECTED CHANGE</p>
                <p className="mt-0.5 break-all font-mono text-emerald-200 font-bold">
                  {diff.after === null ? 'null / empty' : String(diff.after)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
