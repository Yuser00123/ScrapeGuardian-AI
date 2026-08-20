/**
 * ScrapeGuardian AI - Trend & Volatility Signals View
 */

import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TrendSignalsView: React.FC = () => {
  const { trendReport } = useApp();

  if (!trendReport) {
    return (
      <div className="p-8 text-center text-slate-400">
        No trend report available. Run a search to populate.
      </div>
    );
  }

  return (
    <div className="space-y-6" id="trend-signals-view">
      {/* Volatility & Metric Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4">
          <div className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center justify-between">
            <span>SERP Volatility Index</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-400 mt-1">
            {trendReport.volatilityIndex} <span className="text-xs text-slate-400 font-normal">/ 100</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Active Rank Movement Band
          </div>
        </div>

        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4">
          <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
            New Entrant Domains
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-1">
            +{trendReport.newEntrantsCount}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Broke into top 10 positions this cycle
          </div>
        </div>

        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4">
          <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
            Timeframe Snapshot
          </div>
          <div className="text-sm font-bold text-slate-200 mt-1">
            {trendReport.timeframe}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Grounded against Bright Data history
          </div>
        </div>
      </div>

      {/* Narrative Synthesis */}
      <div className="rounded-xl bg-slate-900/70 border border-cyan-500/30 p-5 shadow-md">
        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SERP Market Velocity Assessment</span>
        </h3>
        <p className="text-sm text-slate-200 leading-relaxed">
          {trendReport.marketVelocitySummary}
        </p>
        <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
          <strong className="text-slate-300">14-Day Predictive Forecast:</strong> {trendReport.forecastSummary}
        </div>
      </div>

      {/* Domain Movement Table */}
      <div className="rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-lg">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Domain Position Shifts & Velocity Scores
          </h3>
          <span className="text-xs text-slate-400">
            {trendReport.domainMovements.length} Domains Tracked
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 font-bold uppercase border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Domain</th>
                <th className="py-3 px-4">Previous Rank</th>
                <th className="py-3 px-4">Current Rank</th>
                <th className="py-3 px-4">Rank Delta</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Velocity Index</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {trendReport.domainMovements.map((m, i) => (
                <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-200">{m.domain}</td>
                  <td className="py-3 px-4 text-slate-400">#{m.previousRank}</td>
                  <td className="py-3 px-4 font-bold text-slate-100">#{m.currentRank}</td>
                  <td className="py-3 px-4 font-bold">
                    {m.delta > 0 ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        +{m.delta}
                      </span>
                    ) : m.delta < 0 ? (
                      <span className="text-rose-400 flex items-center gap-1">
                        <ArrowDownRight className="w-3.5 h-3.5" />
                        {m.delta}
                      </span>
                    ) : (
                      <span className="text-slate-500 flex items-center gap-1">
                        <Minus className="w-3.5 h-3.5" />
                        0
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        m.status === 'rising'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : m.status === 'falling'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : m.status === 'new_entrant'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {m.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-indigo-400">{m.velocityScore} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
