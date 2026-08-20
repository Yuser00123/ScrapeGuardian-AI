/**
 * ScrapeGuardian AI - Multi-Provider AI Health & Routing Grid
 * 
 * Displays telemetry across 24+ AI models in the failover waterfall.
 */

import React, { useState } from 'react';
import {
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Activity,
  DollarSign,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProviderMetric, ProviderTier } from '../../types/firestore';

export const MultiProviderHealthGrid: React.FC = () => {
  const { providerMetrics } = useApp();
  const [selectedTier, setSelectedTier] = useState<string>('all');

  const filtered =
    selectedTier === 'all'
      ? providerMetrics
      : providerMetrics.filter((p) => p.tier.toLowerCase().includes(selectedTier.toLowerCase()));

  return (
    <div className="space-y-4" id="multi-provider-health-grid">
      {/* Tier Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 font-mono">
            <Cpu className="w-4 h-4 text-indigo-400" />
            <span>Multi-Provider AI Router Waterfall:</span>
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {providerMetrics.length} AI Models Active with Sub-100ms Failover
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedTier('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedTier === 'all'
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            All Models ({providerMetrics.length})
          </button>
          <button
            onClick={() => setSelectedTier('Frontier')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedTier === 'Frontier'
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            Tier 1 (Gemini)
          </button>
          <button
            onClick={() => setSelectedTier('LLaMA')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedTier === 'LLaMA'
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            Tier 2 (LLaMA/Groq)
          </button>
          <button
            onClick={() => setSelectedTier('Enterprise')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedTier === 'Enterprise'
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            Tier 3 (Mistral/Cohere)
          </button>
          <button
            onClick={() => setSelectedTier('Universal')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedTier === 'Universal'
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            Tier 4 (Fallback)
          </button>
        </div>
      </div>

      {/* Grid of Providers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filtered.map((p) => {
          const isHealthy = p.status === 'operational' || p.status === 'standby';
          return (
            <div
              key={p.id}
              className="rounded-xl bg-slate-950/70 border border-slate-800/80 p-3.5 hover:border-slate-700 transition-all flex flex-col justify-between shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <span className="text-xs font-bold text-slate-100 truncate">{p.modelName}</span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      p.status === 'operational'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : p.status === 'standby'
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        p.status === 'operational' ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'
                      }`}
                    />
                    {p.status}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 font-mono mb-2 truncate">
                  {p.providerId}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="rounded bg-slate-900/80 p-1.5 border border-slate-800 text-center">
                    <div className="text-[9px] text-slate-400 font-bold uppercase">Latency</div>
                    <div className="font-bold text-slate-200 mt-0.5">{p.latencyMs}ms</div>
                  </div>
                  <div className="rounded bg-slate-900/80 p-1.5 border border-slate-800 text-center">
                    <div className="text-[9px] text-slate-400 font-bold uppercase">Success SLA</div>
                    <div className="font-bold text-emerald-400 mt-0.5">{p.successRatePercent.toFixed(1)}%</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                <span className="truncate">Tokens: {(p.totalTokensProcessed / 1000).toFixed(0)}k</span>
                <span className="font-semibold text-slate-300">Pri #{p.priorityOrder}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
