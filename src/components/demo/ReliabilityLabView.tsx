/**
 * ScrapeGuardian AI - Reliability Lab & Self-Healing Simulation
 * 
 * Demonstrates the 7-step autonomous self-healing workflow:
 * Healthy -> Failure -> Diagnosis -> Repair -> Validation -> Recovery.
 */

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Play,
  RotateCcw,
  FastForward,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Zap,
  Activity,
  Layers,
  Code2,
  Terminal,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { reliabilityEngine, ReliabilityStage } from '../../services/reliability.service';

export const ReliabilityLabView: React.FC = () => {
  const {
    reliabilityScores,
    reliabilityEvents,
    reliabilityStage,
    setReliabilityStage,
    triggerReliabilityStep,
    resetReliabilityLab,
  } = useApp();

  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const stages = reliabilityEngine.getSelfHealingWorkflowStages(reliabilityStage);

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        const order: ReliabilityStage[] = [
          'healthy',
          'simulated_failure',
          'detection',
          'ai_diagnosis',
          'repair_recommendation',
          'validation',
          'recovery',
        ];
        const currentIdx = order.indexOf(reliabilityStage);
        if (currentIdx === order.length - 1) {
          setIsAutoPlaying(false);
        } else {
          setReliabilityStage(order[currentIdx + 1]);
        }
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, reliabilityStage, setReliabilityStage]);

  return (
    <div className="space-y-6" id="reliability-lab-view">
      {/* Top Banner & Control Deck */}
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                Reliability & Self-Healing Lab
              </span>
              <span className="text-xs font-mono text-slate-400">
                Autonomous AST DOM Drift Remediation
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Self-Healing Scraping Pipeline Simulator
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Experience how ScrapeGuardian AI autonomously detects broken HTML structures, diagnoses AST mutations via Gemini 3.7 Flash, synthesizes resilient fallback selectors, and hot-patches collectors with zero downtime.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              id="btn-simulate-step"
              onClick={triggerReliabilityStep}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-colors"
            >
              <FastForward className="w-4 h-4" />
              <span>Next Simulation Stage</span>
            </button>

            <button
              id="btn-toggle-autoplay"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                isAutoPlaying
                  ? 'bg-amber-600 hover:bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-600/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>{isAutoPlaying ? 'Pause Auto-Run' : 'Auto-Run Simulation'}</span>
            </button>

            <button
              id="btn-reset-reliability"
              onClick={() => {
                setIsAutoPlaying(false);
                resetReliabilityLab();
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
              title="Reset to Healthy Baseline"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reliability Scores Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4">
          <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
            Overall Reliability
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-1">
            {reliabilityScores.overallReliabilityScore}%
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Superproxy Uptime: {reliabilityScores.superproxyUptime}%
          </div>
        </div>

        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4">
          <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
            Data Quality SLA
          </div>
          <div className="text-2xl font-black text-indigo-400 mt-1">
            {reliabilityScores.dataQualityScore}%
          </div>
          <div className="text-xs text-slate-400 mt-1">
            AST Schema Validation
          </div>
        </div>

        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4">
          <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
            Auto-Repairs Total
          </div>
          <div className="text-2xl font-black text-cyan-400 mt-1">
            {reliabilityScores.autoRepairsTotal}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Autonomous Heals
          </div>
        </div>

        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4">
          <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
            Active Mesh Pipelines
          </div>
          <div className="text-2xl font-black text-purple-400 mt-1">
            {reliabilityScores.activeSelfHealingPipelines}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Self-Healing Collectors
          </div>
        </div>
      </div>

      {/* 7-Step Workflow Pipeline Visualizer */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-400" />
          <span>Autonomous Self-Healing Stage Progression</span>
        </h2>

        <div className="space-y-3">
          {stages.map((stg, idx) => {
            const isActive = stg.stage === reliabilityStage;
            const isDone = stg.status === 'completed';

            return (
              <div
                key={stg.stage}
                onClick={() => setReliabilityStage(stg.stage)}
                className={`cursor-pointer rounded-xl border p-4.5 transition-all ${
                  isActive
                    ? 'bg-slate-900/90 border-indigo-500/70 shadow-lg shadow-indigo-500/10'
                    : isDone
                    ? 'bg-slate-900/50 border-emerald-500/30 opacity-90'
                    : 'bg-slate-950/40 border-slate-800/60 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border ${
                        isActive
                          ? 'bg-indigo-600 text-white border-indigo-400 animate-pulse'
                          : isDone
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-100">{stg.title}</h3>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            isActive
                              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                              : isDone
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          {stg.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {stg.description}
                      </p>
                    </div>
                  </div>

                  {/* Stage Metrics */}
                  <div className="flex items-center gap-3 shrink-0">
                    {stg.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="rounded-md bg-slate-950/80 px-2.5 py-1 border border-slate-800/80 text-center"
                      >
                        <div className="text-[9px] uppercase font-bold text-slate-400">{m.label}</div>
                        <div className="text-xs font-bold text-slate-200 mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Snippet if present in stage */}
                {stg.codeSnippet && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{stg.codeSnippet.title}</span>
                    </div>
                    <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
                      {stg.codeSnippet.code}
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Telemetry Audit Log Table */}
      <div className="rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-lg">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Real-Time Reliability Audit Stream</span>
          </h3>
          <span className="text-xs text-slate-400">Live Ingestion Telemetry</span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {reliabilityEvents.map((ev) => (
            <div key={ev.id} className="p-3.5 hover:bg-slate-800/30 transition-colors flex items-start gap-3 text-xs">
              <span
                className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  ev.severity === 'success'
                    ? 'bg-emerald-400'
                    : ev.severity === 'warn'
                    ? 'bg-amber-400'
                    : 'bg-indigo-400'
                }`}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-slate-200">{ev.message}</span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {new Date(ev.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                  {ev.domain && <span>Domain: <strong className="text-slate-300">{ev.domain}</strong></span>}
                  {ev.recoveryTimeMs && (
                    <span className="text-emerald-400 font-semibold">
                      MTTR: {ev.recoveryTimeMs}ms
                    </span>
                  )}
                  {ev.confidenceScore && (
                    <span>Confidence: {Math.round(ev.confidenceScore * 100)}%</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
