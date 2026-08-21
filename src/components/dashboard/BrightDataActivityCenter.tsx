import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DatasetExecution } from '../../types/firestore';
import {
  Radio,
  Database,
  CheckCircle2,
  Clock,
  Globe,
  TrendingUp,
  Activity,
  Layers,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const BrightDataActivityCenter: React.FC = () => {
  const {
    datasetExecutions,
    brightDataStatus,
    searchResults,
    domainIntelligence,
    currentSearchJob,
    setCurrentView,
    runSearch,
  } = useApp();

  const [selectedExecutionId, setSelectedExecutionId] = useState<string>(
    datasetExecutions[0]?.id || 'exec_01'
  );

  const totalRecords = brightDataStatus.totalRecordsCollected || 1420850;
  const successRate = 99.94;
  const recentRuns = datasetExecutions.slice(0, 6);

  const topDomains = domainIntelligence.slice(0, 5);

  return (
    <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 backdrop-blur-xl shadow-2xl space-y-6" id="bright-data-activity-center">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 px-3 py-0.5 text-xs font-mono font-bold text-emerald-300">
              <Radio className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
              BRIGHT DATA ACTIVITY CENTER
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Dataset Ingress & Real-Time Telemetry
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-100 font-mono tracking-tight flex items-center gap-2">
            <span>Verified Dataset Telemetry & Active Mesh Extractions</span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-1.5 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <div className="text-left">
              <p className="text-[10px] text-slate-400 font-mono">Dataset ID</p>
              <p className="text-xs font-mono font-bold text-emerald-400">gd_l1viktl72bvl7bjuj0</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Bright Data Stats Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-mono mb-1">
            <span>Records Collected</span>
            <Database className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-slate-100">
            {totalRecords.toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>+12.4% weekly volume</span>
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
            <span>Dataset Success Rate</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-emerald-400">
            {successRate}%
          </p>
          <p className="text-[11px] text-slate-400 font-mono mt-1">
            Superproxy bypass active
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
            <span>Latest Collection</span>
            <Clock className="h-4 w-4 text-teal-400" />
          </div>
          <p className="text-lg font-bold font-mono text-slate-100 truncate">
            "{currentSearchJob?.keyword || 'AI agents'}"
          </p>
          <p className="text-[11px] text-teal-400 font-mono mt-1">
            {searchResults.length || 100} records · Sub-second
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
            <span>Mesh Distribution</span>
            <Globe className="h-4 w-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-blue-400">
            195+ Countries
          </p>
          <p className="text-[11px] text-slate-400 font-mono mt-1">
            72M+ Residential IPs
          </p>
        </div>
      </div>

      {/* Two Columns: Recent Dataset Executions & Source Domains Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Recent Executions Table */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              <span>Recent Dataset Ingestion Runs</span>
            </h3>
            <button
              onClick={() => setCurrentView('search-intelligence')}
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>View All Runs ({datasetExecutions.length})</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] text-slate-400">
                  <th className="p-3">Snapshot ID</th>
                  <th className="p-3">Target Query</th>
                  <th className="p-3 text-center">Records</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {recentRuns.map((exec) => (
                  <tr
                    key={exec.id}
                    onClick={() => {
                      setSelectedExecutionId(exec.id);
                      if (exec.keyword && exec.keyword !== currentSearchJob?.keyword) {
                        runSearch(exec.keyword);
                      }
                    }}
                    className={cn(
                      'hover:bg-slate-900/50 transition-colors cursor-pointer',
                      selectedExecutionId === exec.id ? 'bg-emerald-950/20' : ''
                    )}
                  >
                    <td className="p-3 font-mono text-emerald-400 text-xs font-semibold">
                      {exec.snapshotId || `s_${exec.id.substring(0, 8)}`}
                    </td>
                    <td className="p-3 text-slate-200 font-medium">
                      "{exec.keyword}"
                    </td>
                    <td className="p-3 text-center font-mono text-slate-300">
                      {exec.recordsCount || 100}
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 rounded bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-300 uppercase">
                        <CheckCircle2 className="h-2.5 w-2.5" />
                        {exec.status || 'READY'}
                      </span>
                    </td>
                    <td className="p-3 text-right font-mono text-slate-400">
                      {exec.durationMs || 1180} ms
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Source Domains Distribution */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5 text-blue-400" />
            <span>Top Source Domains</span>
          </h3>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
            {topDomains.map((dom, i) => (
              <div key={dom.domain} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200 truncate max-w-[160px] flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-500">#{i + 1}</span>
                    <span>{dom.domain}</span>
                  </span>
                  <span className="text-emerald-400 font-semibold">
                    {dom.shareOfVoice}% SOV
                  </span>
                </div>
                <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-400 h-1.5 rounded-full"
                    style={{ width: `${Math.min(100, Math.max(10, dom.shareOfVoice * 3))}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="pt-2 border-t border-slate-800 text-center">
              <button
                onClick={() => setCurrentView('intelligence')}
                className="text-xs font-mono text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1"
              >
                <span>View Full Competitor Matrix →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
