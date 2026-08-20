import React from 'react';
import { Collector } from '../../types/firestore';
import { StatusBadge } from '../common/StatusBadge';
import { X, Play, RefreshCw, Globe, Shield, Clock, Layers, Sparkles, CheckCircle2, Code2 } from 'lucide-react';
import { formatTimeAgo, formatNumber } from '../../lib/utils';
import { useApp } from '../../context/AppContext';

interface CollectorDetailModalProps {
  collector: Collector;
  onClose: () => void;
}

export const CollectorDetailModal: React.FC<CollectorDetailModalProps> = ({
  collector,
  onClose,
}) => {
  const { triggerCollectorRun, toggleCollectorStatus, setCurrentView } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl transition-all max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 bg-slate-950/80 p-5">
          <div className="flex items-start gap-3">
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-emerald-400">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-base font-bold text-slate-100 font-mono">
                  {collector.name}
                </h3>
                <StatusBadge status={collector.status} />
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                {collector.targetUrlTemplate}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <p className="text-[10px] font-semibold text-slate-500 uppercase font-mono">Success Rate</p>
              <p className="text-lg font-bold text-emerald-400 font-mono mt-1">
                {collector.successRate}%
              </p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                {collector.successfulRuns} / {collector.totalRuns} runs
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <p className="text-[10px] font-semibold text-slate-500 uppercase font-mono">Records Harvested</p>
              <p className="text-lg font-bold text-slate-100 font-mono mt-1">
                {formatNumber(collector.totalRecordsHarvested)}
              </p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                Schema validated
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <p className="text-[10px] font-semibold text-slate-500 uppercase font-mono">Proxy Mesh Zone</p>
              <p className="text-sm font-bold text-slate-200 font-mono mt-1 uppercase">
                {collector.proxyType.replace('_', ' ')}
              </p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                Bright Data Studio
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <p className="text-[10px] font-semibold text-slate-500 uppercase font-mono">Schedule</p>
              <p className="text-sm font-bold text-slate-200 font-mono mt-1 uppercase">
                {collector.schedule.frequency}
              </p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                Next: {formatTimeAgo(collector.schedule.nextScheduledRun)}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono mb-2">
              Collector Objective
            </h4>
            <p className="text-xs text-slate-300 bg-slate-950/40 border border-slate-800 rounded-lg p-3 leading-relaxed">
              {collector.description}
            </p>
          </div>

          {/* Active Healing status banner if active */}
          {collector.status === 'healing' && (
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-blue-400 animate-spin" />
                <div>
                  <h5 className="text-xs font-bold text-blue-200 font-mono">
                    Self-Healing Pipeline Active
                  </h5>
                  <p className="text-[11px] text-blue-300/80">
                    Gemini 2.5 Flash is currently synthesizing replacement CSS/XPath selectors for modified DOM elements.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  setCurrentView('healing');
                }}
                className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-mono font-medium text-slate-950 hover:bg-blue-400 transition-colors shrink-0"
              >
                Open Healing Center
              </button>
            </div>
          )}

          {/* Extracted Schema Fields */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
                <Code2 className="h-4 w-4 text-emerald-400" />
                <span>Extracted Schema Specification ({collector.schema.length} fields)</span>
              </h4>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                AST VALIDATED
              </span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden divide-y divide-slate-800/80">
              {collector.schema.map((field) => (
                <div key={field.fieldName} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-100 font-mono">
                        {field.fieldName}
                      </span>
                      <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[10px] font-mono text-slate-400 border border-slate-700">
                        {field.dataType}
                      </span>
                      {field.required && (
                        <span className="rounded bg-rose-500/10 text-rose-400 px-1.5 py-0.2 text-[10px] font-mono border border-rose-500/20">
                          REQUIRED
                        </span>
                      )}
                    </div>
                    <code className="mt-1 block text-[11px] font-mono text-emerald-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800 truncate max-w-xl">
                      {field.selector}
                    </code>
                  </div>

                  <div className="flex items-center gap-2 text-right">
                    <span className="text-[11px] font-mono text-slate-400">
                      Confidence: <strong className="text-slate-200">{(field.confidenceScore * 100).toFixed(0)}%</strong>
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/90 p-4">
          <button
            onClick={() => {
              toggleCollectorStatus(collector.id);
              onClose();
            }}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-mono text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            {collector.status === 'paused' ? 'Resume Collector' : 'Pause Collector'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-800 px-3.5 py-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                triggerCollectorRun(collector.id);
                onClose();
              }}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-1.5 text-xs font-mono font-semibold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm"
            >
              <Play className="h-3.5 w-3.5" />
              <span>Run Now via Bright Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
