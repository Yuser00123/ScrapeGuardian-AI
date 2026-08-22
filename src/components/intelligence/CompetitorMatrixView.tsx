/**
 * ScrapeGuardian AI - Competitor Matrix & Market Share View
 */

import React from 'react';
import {
  Layers,
  Award,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CompetitorMatrixView: React.FC = () => {
  const { competitorAnalysis, currentSearchJob } = useApp();

  if (!competitorAnalysis) {
    return (
      <div className="p-8 text-center text-slate-400">
        No competitor analysis available. Run a search to populate.
      </div>
    );
  }

  return (
    <div className="space-y-6" id="competitor-matrix-view">
      {/* Overview Stats Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4">
          <div className="flex items-center justify-between text-xs uppercase font-bold text-slate-400 tracking-wider">
            <span>Market Concentration</span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Derived From Bright Data
            </span>
          </div>
          <div className="text-xl font-bold text-slate-100 mt-1 flex items-center gap-2">
            <span>{competitorAnalysis.marketConcentration}</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Top Leader dominates {competitorAnalysis.leaderDominancePercent.toFixed(1)}% SOV
          </div>
        </div>

        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4">
          <div className="flex items-center justify-between text-xs uppercase font-bold text-slate-400 tracking-wider">
            <span>Total Unique Domains</span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              Derived From Bright Data
            </span>
          </div>
          <div className="text-xl font-bold text-indigo-400 mt-1">
            {competitorAnalysis.totalDomainsAnalyzed} Domains
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Grounded from verified organic nodes
          </div>
        </div>

        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4">
          <div className="flex items-center justify-between text-xs uppercase font-bold text-slate-400 tracking-wider">
            <span>Target Search Cluster</span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Bright Data
            </span>
          </div>
          <div className="text-base font-bold text-emerald-400 mt-1 truncate">
            {competitorAnalysis.keyword}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Real-time Bright Data SERP Dataset
          </div>
        </div>
      </div>

      {/* Competitor Profiles Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-400" />
          <span>Competitor Visibility & Share of Voice Matrix</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {competitorAnalysis.topCompetitors.map((comp, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-slate-900/80 border border-slate-800/90 p-5 hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Domain & Category */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-xs flex items-center justify-center border border-indigo-500/30">
                      #{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100 truncate">{comp.name}</h4>
                      <a
                        href={comp.sampleLandingPage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-400 hover:text-indigo-400 flex items-center gap-1 transition-colors truncate max-w-[200px]"
                      >
                        <span>{comp.domain}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      comp.category === 'Market Leader'
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                        : comp.category === 'Primary Challenger'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {comp.category}
                  </span>
                </div>

                {/* Share of Voice Progress */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-xs text-slate-300 font-medium">
                    <span>Share of Voice (SOV)</span>
                    <span className="font-bold text-indigo-400">{comp.shareOfVoice.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, comp.shareOfVoice * 2.5)}%` }}
                    />
                  </div>
                </div>

                {/* Metric Strip */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="rounded bg-slate-950/60 p-2 border border-slate-800/80">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Top Rank</div>
                    <div className="text-sm font-bold text-slate-100 mt-0.5">#{comp.topRank}</div>
                  </div>
                  <div className="rounded bg-slate-950/60 p-2 border border-slate-800/80">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Avg Position</div>
                    <div className="text-sm font-bold text-slate-100 mt-0.5">{comp.averageRank.toFixed(1)}</div>
                  </div>
                  <div className="rounded bg-slate-950/60 p-2 border border-slate-800/80">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Visibility</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5">{comp.visibilityScore}%</div>
                  </div>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="space-y-2">
                  <div className="space-y-1">
                    {comp.strengths.map((s, i) => (
                      <div key={i} className="text-xs text-emerald-300/90 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    {comp.weaknesses.map((w, i) => (
                      <div key={i} className="text-xs text-amber-300/90 flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{w}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
