import React, { useState, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  Radio,
  FileCode,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const SelfHealingWorkflow: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(6);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const STAGES = [
    {
      id: 1,
      title: 'Collection Started',
      badge: 'Bright Data Ingress',
      desc: 'Dataset scraper initiated against target search endpoint with DOM target queries.',
      icon: Radio,
      status: 'success',
    },
    {
      id: 2,
      title: 'Extraction Failure Detected',
      badge: 'DOM Drift / 403',
      desc: 'Target website mutated CSS class names from .g-card to .MjjYud-updated.',
      icon: AlertTriangle,
      status: 'warning',
    },
    {
      id: 3,
      title: 'Schema Validation',
      badge: 'AST Node Inspector',
      desc: 'Validator detects missing rating and snippet nodes in 34% of extracted objects.',
      icon: FileCode,
      status: 'info',
    },
    {
      id: 4,
      title: 'Recovery Triggered',
      badge: 'AI Selector Healer',
      desc: 'Autonomous AST parser computes resilient semantic XPath and CSS selectors.',
      icon: Sparkles,
      status: 'purple',
    },
    {
      id: 5,
      title: 'Re-Collection',
      badge: 'Superproxy Resend',
      desc: 'Re-runs scraper via Bright Data residential superproxy with new selector schema.',
      icon: RotateCcw,
      status: 'cyan',
    },
    {
      id: 6,
      title: 'Success (98.4% Quality)',
      badge: '100% Ingestion Verified',
      desc: 'All 100 organic SERP records normalized and persisted to Firestore.',
      icon: CheckCircle2,
      status: 'success',
    },
  ];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveStage(1);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimulating && activeStage < 6) {
      timer = setTimeout(() => {
        setActiveStage((prev) => prev + 1);
      }, 1000);
    } else if (activeStage === 6 && isSimulating) {
      setIsSimulating(false);
    }
    return () => clearTimeout(timer);
  }, [isSimulating, activeStage]);

  return (
    <div className="rounded-2xl border border-purple-500/40 bg-slate-950/90 p-6 backdrop-blur-xl shadow-2xl space-y-6" id="self-healing-workflow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/15 border border-purple-500/40 px-3 py-0.5 text-xs font-mono font-bold text-purple-300">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              SELF-HEALING ARCHITECTURE
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Zero-Downtime Scraper Recovery
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-100 font-mono tracking-tight flex items-center gap-2">
            <span>Automated 6-Stage Resilience & Repair Pipeline</span>
          </h2>
        </div>

        <button
          onClick={handleRunSimulation}
          disabled={isSimulating}
          className="flex items-center gap-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 px-4 py-2 text-xs font-mono font-bold text-white transition-colors shadow"
        >
          {isSimulating ? (
            <>
              <RotateCcw className="h-3.5 w-3.5 animate-spin" />
              <span>Simulating Repair...</span>
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Simulate Self-Healing Flow</span>
            </>
          )}
        </button>
      </div>

      {/* Stage visual ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {STAGES.map((s) => {
          const Icon = s.icon;
          const isPassed = activeStage >= s.id;
          const isCurrent = activeStage === s.id;

          return (
            <div
              key={s.id}
              onClick={() => setActiveStage(s.id)}
              className={cn(
                'rounded-xl border p-3.5 flex flex-col justify-between transition-all cursor-pointer relative',
                isCurrent
                  ? 'border-purple-500 bg-purple-950/30 shadow-lg shadow-purple-500/10 ring-1 ring-purple-500'
                  : isPassed
                  ? 'border-emerald-500/40 bg-slate-900/80'
                  : 'border-slate-800 bg-slate-950/50 opacity-60'
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className={cn(
                    'text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border',
                    isCurrent
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                      : isPassed
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  )}>
                    STAGE {s.id}
                  </span>
                  {isPassed && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className={cn(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border',
                    isCurrent
                      ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  )}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-100 font-mono truncate">
                    {s.title}
                  </h3>
                </div>

                <p className="text-[10px] font-mono text-purple-400 truncate mb-1">
                  {s.badge}
                </p>

                <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
                {isPassed ? '✓ Verified' : 'Pending'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
