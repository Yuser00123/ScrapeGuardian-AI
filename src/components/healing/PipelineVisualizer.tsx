import React from 'react';
import { HealingPipelineStage } from '../../types/firestore';
import { AlertCircle, Stethoscope, Wrench, CheckCircle, Rocket, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PipelineVisualizerProps {
  currentStage: HealingPipelineStage;
  progressPercent: number;
}

export const PipelineVisualizer: React.FC<PipelineVisualizerProps> = ({
  currentStage,
  progressPercent,
}) => {
  const stages: { id: HealingPipelineStage; label: string; icon: React.ComponentType<{ className?: string }>; description: string }[] = [
    { id: 'detection', label: '1. Detection', icon: AlertCircle, description: 'DOM Drift & parse miss spotted' },
    { id: 'diagnosis', label: '2. Diagnosis', icon: Stethoscope, description: 'AST tree diff & layout analysis' },
    { id: 'repair', label: '3. Repair', icon: Wrench, description: 'AI synthesizes resilient CSS/XPath' },
    { id: 'validation', label: '4. Validation', icon: CheckCircle, description: 'Synthetic test crawl validation' },
    { id: 'deployment', label: '5. Deployment', icon: Rocket, description: 'Hot-patch deployed zero downtime' },
  ];

  const stageOrder = ['detection', 'diagnosis', 'repair', 'validation', 'deployment', 'completed'];
  const currentIndex = stageOrder.indexOf(currentStage);

  return (
    <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-5 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono">
            Autonomous Self-Healing Pipeline
          </h4>
          <p className="text-[11px] text-slate-400">
            End-to-end AST resolution powered by Gemini 2.5 Flash & Bright Data Web Unlocker
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 font-bold">
            {currentStage === 'completed' ? '100%' : `${progressPercent}%`}
          </span>
          <div className="h-2 w-24 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${currentStage === 'completed' ? 100 : progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 5-step Pipeline Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
        {stages.map((st, idx) => {
          const Icon = st.icon;
          const isPassed = currentIndex > idx || currentStage === 'completed';
          const isCurrent = currentStage === st.id;
          const isPending = currentIndex < idx && currentStage !== 'completed';

          return (
            <div
              key={st.id}
              className={cn(
                'relative flex flex-col items-center text-center p-3 rounded-xl border transition-all',
                isCurrent
                  ? 'border-blue-500/50 bg-blue-500/10 text-blue-300 shadow-md ring-1 ring-blue-500/30'
                  : isPassed
                  ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400'
                  : 'border-slate-800 bg-slate-900/40 text-slate-500'
              )}
            >
              {/* Step Circle */}
              <div
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full border mb-2 transition-all',
                  isCurrent
                    ? 'border-blue-400 bg-blue-500/20 text-blue-300 animate-pulse'
                    : isPassed
                    ? 'border-emerald-400 bg-emerald-500/20 text-emerald-400'
                    : 'border-slate-700 bg-slate-800 text-slate-500'
                )}
              >
                {isPassed ? <Check className="h-4 w-4 stroke-[3]" /> : <Icon className="h-4 w-4" />}
              </div>

              <p className="text-xs font-bold font-mono text-slate-200">{st.label}</p>
              <p className="mt-1 text-[10px] text-slate-400 leading-tight">
                {st.description}
              </p>

              {isCurrent && (
                <span className="mt-2 rounded-full bg-blue-400/20 px-2 py-0.2 text-[9px] font-mono text-blue-300 font-semibold border border-blue-400/30 animate-pulse">
                  IN PROGRESS
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
