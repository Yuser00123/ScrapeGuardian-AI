import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Database,
  Activity,
  ShieldCheck,
  Zap,
  Globe,
  Radio,
  Clock,
  Server,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

export const BrightDataStatusCard: React.FC = () => {
  const { brightDataStatus, currentSearchJob } = useApp();

  const quotaPercent = Math.min(
    100,
    Math.round((brightDataStatus.monthlyQuotaUsed / brightDataStatus.monthlyQuotaLimit) * 100)
  );

  return (
    <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md relative overflow-hidden group hover:border-slate-700/80 transition-all">
      <div className="absolute top-0 right-0 h-28 w-28 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
      
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-slate-800/70 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Radio className="h-4 w-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-100">Bright Data SERP Engine</h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                Bright Data
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Dataset: <span className="text-emerald-400 font-semibold">{brightDataStatus.datasetId}</span>
            </p>
          </div>
        </div>

        <a
          href="https://brightdata.com/products/datasets/serp"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <span>Docs</span>
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="rounded-lg bg-slate-950/60 border border-slate-800/80 p-2.5">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            <span>Success Rate</span>
          </div>
          <p className="text-base font-bold text-slate-100 font-mono">
            {brightDataStatus.successRatePercent}%
          </p>
          <p className="text-[10px] text-emerald-400/80">SLA Guaranteed</p>
        </div>

        <div className="rounded-lg bg-slate-950/60 border border-slate-800/80 p-2.5">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span>Avg Latency</span>
          </div>
          <p className="text-base font-bold text-slate-100 font-mono">
            {brightDataStatus.latencyMs} <span className="text-xs font-normal text-slate-400">ms</span>
          </p>
          <p className="text-[10px] text-amber-400/80">Sub-second Stream</p>
        </div>

        <div className="rounded-lg bg-slate-950/60 border border-slate-800/80 p-2.5">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
            <Globe className="h-3.5 w-3.5 text-blue-400" />
            <span>Proxy Pool</span>
          </div>
          <p className="text-base font-bold text-slate-100 font-mono">
            {(brightDataStatus.activeProxiesCount / 1000000).toFixed(1)}M
          </p>
          <p className="text-[10px] text-blue-400/80">195 Countries</p>
        </div>

        <div className="rounded-lg bg-slate-950/60 border border-slate-800/80 p-2.5">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
            <Layers className="h-3.5 w-3.5 text-purple-400" />
            <span>Total Harvest</span>
          </div>
          <p className="text-base font-bold text-slate-100 font-mono">
            {(brightDataStatus.totalRecordsCollected / 1000).toFixed(1)}k
          </p>
          <p className="text-[10px] text-purple-400/80">SERP AST Nodes</p>
        </div>
      </div>

      {/* Monthly Quota Progress */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400 flex items-center gap-1">
            <Server className="h-3 w-3 text-slate-400" />
            Monthly SERP API Quota
          </span>
          <span className="font-mono text-slate-300">
            {brightDataStatus.monthlyQuotaUsed.toLocaleString()} / {brightDataStatus.monthlyQuotaLimit.toLocaleString()} ({quotaPercent}%)
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 rounded-full"
            style={{ width: `${quotaPercent}%` }}
          />
        </div>
      </div>

      {/* Active Snapshot Tag if current job exists */}
      {currentSearchJob?.snapshotId && (
        <div className="mt-3.5 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-400 flex items-center gap-1">
            <Clock className="h-3 w-3 text-emerald-400" />
            Latest Snapshot:
          </span>
          <span className="text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-[10px]">
            {currentSearchJob.snapshotId}
          </span>
        </div>
      )}
    </div>
  );
};
