/**
 * ScrapeGuardian AI - Demo Lab & Reliability Engine
 */

import React, { useEffect, useState } from 'react';
import { useApp, DemoStage } from '../../context/AppContext';
import { DOMInspectorSimulator } from './DOMInspectorSimulator';
import { ReliabilityLabView } from './ReliabilityLabView';
import confetti from 'canvas-confetti';
import {
  FlaskConical,
  Play,
  Pause,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Terminal,
  Activity,
  Zap,
  Radio,
  Layers,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const DemoLabView: React.FC = () => {
  const {
    demoStage,
    setDemoStage,
    simulateNextStep,
    isAutoPlaying,
    setIsAutoPlaying,
    resetDemo,
    demoLogs,
  } = useApp();

  const [labTab, setLabTab] = useState<'dom_simulator' | 'reliability_lab'>('dom_simulator');

  const stages: { id: DemoStage; title: string; subtitle: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
    {
      id: 'healthy',
      title: '1. Healthy Website',
      subtitle: 'Selectors match, 100% data extraction rate',
      icon: CheckCircle2,
      color: 'emerald',
    },
    {
      id: 'changed',
      title: '2. Website Changed',
      subtitle: 'Target deploys React redesign with hashed classes',
      icon: AlertTriangle,
      color: 'amber',
    },
    {
      id: 'failure',
      title: '3. Failure Detected',
      subtitle: 'Parser returns 0 items, DOM drift anomaly score: 0.94',
      icon: AlertTriangle,
      color: 'rose',
    },
    {
      id: 'healing',
      title: '4. Healing Triggered',
      subtitle: 'Gemini 3.7 Flash tokenizes DOM & synthesizes replacement AST',
      icon: RefreshCw,
      color: 'blue',
    },
    {
      id: 'validated',
      title: '5. Validation Passed',
      subtitle: '10/10 Synthetic test queries pass via Bright Data Web Unlocker',
      icon: Sparkles,
      color: 'emerald',
    },
    {
      id: 'recovered',
      title: '6. Recovered',
      subtitle: 'Hot-patch deployed to production. Zero data lost!',
      icon: ShieldCheck,
      color: 'emerald',
    },
  ];

  // Trigger confetti on recovery
  useEffect(() => {
    if (demoStage === 'recovered') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#22C55E', '#3B82F6', '#10B981', '#F59E0B'],
        });
      } catch {
        // Safe fallback if canvas not available
      }
    }
  }, [demoStage]);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200" id="demo-lab-view">
      {/* Control Room Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold tracking-tight text-slate-100 font-mono flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-emerald-400" />
              <span>Interactive Self-Healing & Reliability Lab</span>
            </h1>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-mono font-semibold text-emerald-400 border border-emerald-500/20">
              Interactive Simulator
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Simulate breaking website changes, test AST healing with Gemini 3.7 Flash & 24+ AI models, and verify 0-downtime hot patches.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setLabTab('dom_simulator')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              labTab === 'dom_simulator'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            DOM Mutation Inspector
          </button>
          <button
            onClick={() => setLabTab('reliability_lab')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              labTab === 'reliability_lab'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            7-Stage Reliability Engine
          </button>
        </div>
      </div>

      {labTab === 'reliability_lab' ? (
        <ReliabilityLabView />
      ) : (
        <>
          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <button
                id="btn-simulate-next"
                onClick={simulateNextStep}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-4 py-2 text-xs font-mono font-bold text-slate-950 shadow-md shadow-emerald-500/20 transition-all"
              >
                <Zap className="h-3.5 w-3.5" />
                <span>Simulate Next Step</span>
              </button>

              <button
                id="btn-autoplay"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-mono font-semibold transition-all border',
                  isAutoPlaying
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-sm'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                )}
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="h-3.5 w-3.5 text-amber-400" />
                    <span>Pause Auto-Play</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Auto-Play Full Flow</span>
                  </>
                )}
              </button>
            </div>

            <button
              id="btn-reset-demo"
              onClick={resetDemo}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-800/80 px-3 py-2 text-xs font-mono font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Scenario</span>
            </button>
          </div>

          {/* Stepper Wizard Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {stages.map((st, idx) => {
              const Icon = st.icon;
              const isActive = demoStage === st.id;
              const isPast =
                stages.findIndex((s) => s.id === demoStage) > idx;

              return (
                <button
                  key={st.id}
                  onClick={() => setDemoStage(st.id)}
                  className={cn(
                    'flex flex-col items-start p-3 rounded-xl border text-left transition-all',
                    isActive
                      ? 'bg-slate-900 border-emerald-500/80 shadow-md shadow-emerald-500/10 scale-[1.02]'
                      : isPast
                      ? 'bg-slate-900/40 border-emerald-500/30 text-slate-400 opacity-90'
                      : 'bg-slate-950/40 border-slate-800/60 text-slate-500 hover:border-slate-700 opacity-60'
                  )}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      STEP {idx + 1}
                    </span>
                    <Icon
                      className={cn(
                        'h-4 w-4',
                        isActive
                          ? 'text-emerald-400 animate-pulse'
                          : isPast
                          ? 'text-emerald-400'
                          : 'text-slate-600'
                      )}
                    />
                  </div>
                  <h4
                    className={cn(
                      'text-xs font-bold font-mono truncate w-full',
                      isActive ? 'text-slate-100' : 'text-slate-300'
                    )}
                  >
                    {st.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2 mt-1 leading-tight">
                    {st.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Main Control Room Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: DOM Inspector & Visual Browser Simulator */}
            <div className="lg:col-span-2">
              <DOMInspectorSimulator stage={demoStage} />
            </div>

            {/* Right 1 Col: Control Room Telemetry & Live Stream Logs */}
            <div className="space-y-5">
              {/* Telemetry Metrics Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
                    <h3 className="text-xs font-semibold text-slate-200 font-mono">
                      ACTIVE CONTROL ROOM TELEMETRY
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    PORT 9222
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Extraction SLA:</span>
                    <span
                      className={cn(
                        'font-bold',
                        demoStage === 'failure'
                          ? 'text-rose-400'
                          : demoStage === 'changed'
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      )}
                    >
                      {demoStage === 'failure' ? '0.0% (OUTAGE)' : demoStage === 'healing' ? 'REPAIRING...' : '100.0% NOMINAL'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Drift Anomaly Score:</span>
                    <span className="text-slate-200 font-bold">
                      {demoStage === 'healthy' ? '0.02' : '0.94 (Critical)'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Proxy Superproxy:</span>
                    <span className="text-emerald-400 font-bold">
                      Bright Data Residential Unlocker
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">AI Model Router:</span>
                    <span className="text-indigo-400 font-bold">
                      Gemini 3.7 Flash
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">MTTR (Time to Heal):</span>
                    <span className="text-emerald-400 font-bold">
                      680ms (Autonomous)
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Terminal Log Viewer */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Terminal className="h-4 w-4 text-emerald-400" />
                    <span className="font-semibold text-xs text-slate-200">TELEMETRY EVENT STREAM</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Live Ingestion Mesh</span>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {demoLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] leading-relaxed">
                      <span className="text-emerald-400 select-none">❯</span>
                      <span
                        className={cn(
                          log.includes('FAILURE') || log.includes('0 records')
                            ? 'text-rose-400'
                            : log.includes('CHANGED')
                            ? 'text-amber-300'
                            : log.includes('HEALING')
                            ? 'text-blue-300'
                            : 'text-slate-300'
                        )}
                      >
                        {log}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
