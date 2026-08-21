import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Radio,
  FileCode,
  Database,
  Sparkles,
  FileText,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const DataPipelineSection: React.FC = () => {
  const {
    currentSearchJob,
    searchResults,
    datasetExecutions,
    executiveReports,
    setCurrentView,
    runSearch,
  } = useApp();

  const [activeStep, setActiveStep] = useState<number>(3);

  const keyword = currentSearchJob?.keyword || 'AI agents';
  const recordsCount = searchResults.length || 100;
  const snapshotId = currentSearchJob?.snapshotId || datasetExecutions[0]?.snapshotId || 's_serp_994_live';

  const PIPELINE_STEPS = [
    {
      step: 1,
      name: 'Keyword Search',
      tech: 'Parameter Dispatcher',
      icon: Search,
      color: 'emerald',
      status: 'Completed',
      desc: `Query "${keyword}" configured for country US (en) with 100 max results.`,
      actionLabel: 'Change Query',
      onAction: () => setCurrentView('search-intelligence'),
    },
    {
      step: 2,
      name: 'Bright Data Dataset Execution',
      tech: 'gd_l1viktl72bvl7bjuj0',
      icon: Radio,
      color: 'emerald',
      status: 'Ready / Delivered',
      desc: `Triggered Google SERP dataset via Bright Data proxy mesh. Snapshot ID: ${snapshotId}.`,
      actionLabel: 'View Dataset',
      onAction: () => setCurrentView('search-intelligence'),
    },
    {
      step: 3,
      name: 'Structured Output Generated',
      tech: 'Normalized AST Nodes',
      icon: FileCode,
      color: 'cyan',
      status: `${recordsCount} Records`,
      desc: `Harvested ${recordsCount} organic ranks, sitelinks, ratings, URLs, and rich snippets.`,
      actionLabel: 'Inspect JSON/Table',
      onAction: () => setCurrentView('search-intelligence'),
    },
    {
      step: 4,
      name: 'Firestore Storage',
      tech: 'datasetExecutions & structuredOutputs',
      icon: Database,
      color: 'blue',
      status: 'Synchronized',
      desc: `Persisted structured outputs, execution telemetry, and domain nodes to Firestore collections.`,
      actionLabel: 'View History',
      onAction: () => setCurrentView('search-intelligence'),
    },
    {
      step: 5,
      name: 'AI Analysis',
      tech: 'Gemini 2.5 Flash & Frontier Routers',
      icon: Sparkles,
      color: 'purple',
      status: 'Market Vectorized',
      desc: `Synthesized competitor share of voice, domain dominance, and volatility indicators.`,
      actionLabel: 'Explore Insights',
      onAction: () => setCurrentView('intelligence'),
    },
    {
      step: 6,
      name: 'Executive Report',
      tech: 'Boardroom Intelligence Brief',
      icon: FileText,
      color: 'indigo',
      status: 'Ready for C-Suite',
      desc: `Strategic actionable briefs with citations, risk signals, and PDF/MD export capabilities.`,
      actionLabel: 'Open Briefing',
      onAction: () => setCurrentView('intelligence'),
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden" id="data-pipeline-section">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 rounded bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[11px] font-bold text-emerald-300 font-mono">
              <Zap className="h-3 w-3" />
              END-TO-END WORKFLOW
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Bright Data Scraper Studio → AI Intelligence
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-100 font-mono tracking-tight flex items-center gap-2">
            <span>DATA PIPELINE</span>
            <span className="text-xs font-normal text-slate-400 font-sans hidden sm:inline">
              (6-Stage Autonomous Transformation Flow)
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('search-intelligence')}
            className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-mono font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-all"
          >
            <span>Run New Pipeline</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Pipeline Visual Flow Ribbon (Horizontal on Desktop, Stack on Mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 relative">
        {PIPELINE_STEPS.map((item, idx) => {
          const Icon = item.icon;
          const isSelected = activeStep === item.step;

          return (
            <div
              key={item.step}
              onClick={() => setActiveStep(item.step)}
              className={cn(
                'group relative rounded-xl border p-3.5 transition-all cursor-pointer flex flex-col justify-between',
                isSelected
                  ? 'border-emerald-500/60 bg-emerald-950/20 shadow-lg shadow-emerald-500/5'
                  : 'border-slate-800/80 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/60'
              )}
            >
              {/* Connector arrow on desktop */}
              {idx < PIPELINE_STEPS.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-800 text-slate-400 text-[9px] border border-slate-700">
                    →
                  </span>
                </div>
              )}

              <div>
                {/* Step number badge */}
                <div className="flex items-center justify-between gap-1 mb-2.5">
                  <span className={cn(
                    'text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border',
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  )}>
                    STEP {item.step}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className={cn(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors',
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-900 border-slate-800 text-slate-300 group-hover:text-emerald-300'
                  )}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-slate-100 truncate font-mono">
                      {item.name}
                    </h3>
                  </div>
                </div>

                <p className="text-[10px] font-mono text-emerald-400 truncate mb-1">
                  {item.tech}
                </p>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[10px] font-mono font-semibold text-slate-300">
                  {item.status}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  View →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Step Drilldown Card */}
      {activeStep && (
        <div className="mt-4 rounded-xl border border-emerald-500/30 bg-slate-950/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-200">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                Active Inspection: Step {PIPELINE_STEPS[activeStep - 1].step} — {PIPELINE_STEPS[activeStep - 1].name}
              </span>
              <span className="text-xs text-slate-500 font-mono">•</span>
              <span className="text-xs text-slate-300 font-mono">
                {PIPELINE_STEPS[activeStep - 1].tech}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              {PIPELINE_STEPS[activeStep - 1].desc}
            </p>
          </div>

          <button
            onClick={PIPELINE_STEPS[activeStep - 1].onAction}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-4 py-2 text-xs font-mono font-bold text-slate-950 transition-colors shadow shrink-0"
          >
            <span>{PIPELINE_STEPS[activeStep - 1].actionLabel}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
