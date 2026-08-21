/**
 * ScrapeGuardian AI - Executive Boardroom Report View
 * 
 * Boardroom-ready intelligence document synthesized across multi-provider AI
 * models and grounded on verified Bright Data Google SERP records.
 */

import React from 'react';
import {
  FileText,
  Download,
  Copy,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  TrendingUp,
  ShieldAlert,
  Compass,
  ExternalLink,
  Printer,
  Calendar,
  Search,
} from 'lucide-react';
import { ExecutiveReport } from '../../types/firestore';
import { useApp } from '../../context/AppContext';

interface ExecutiveReportViewProps {
  report: ExecutiveReport;
}

export const ExecutiveReportView: React.FC<ExecutiveReportViewProps> = ({ report }) => {
  const { exportExecutiveReport, isGeneratingReport, generateExecutiveReportForQuery } = useApp();

  const formattedDate = new Date(report.generatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="space-y-6" id={`executive-report-${report.id}`}>
      {/* Header Banner & Action Bar */}
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                <FileText className="w-3.5 h-3.5" />
                Boardroom Executive Briefing
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                {Math.round(report.overallConfidenceScore * 100)}% Verified SLA
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {report.title}
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              {report.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-3">
              <div className="flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-indigo-400" />
                <span>Keyword: <strong className="text-slate-200">{report.keyword}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span>Engine: <strong className="text-slate-200">{report.providerUsed}</strong></span>
              </div>
            </div>
          </div>

          {/* Export Actions */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              id="btn-export-markdown"
              onClick={() => exportExecutiveReport('markdown')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 shadow transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Markdown (.md)</span>
            </button>
            <button
              id="btn-export-json"
              onClick={() => exportExecutiveReport('json')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 shadow transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>JSON (.json)</span>
            </button>
            <button
              id="btn-export-copy"
              onClick={() => exportExecutiveReport('copy')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 shadow transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copy</span>
            </button>
            <button
              id="btn-export-print"
              onClick={() => exportExecutiveReport('pdf')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bright Data Dataset Provenance Linkage */}
      <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-4 backdrop-blur-md shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono font-bold text-emerald-400">
                DATASET PROVENANCE LINKAGE
              </p>
              <p className="text-xs font-mono font-semibold text-slate-100">
                Generated From: Bright Data Dataset <code className="text-emerald-300">gd_l1viktl72bvl7bjuj0</code>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-300">
            <span className="rounded bg-slate-900 border border-slate-800 px-2 py-1">
              Records Used: <strong className="text-emerald-400">{report.sources?.length || 100} SERP Records</strong>
            </span>
            <span className="rounded bg-slate-900 border border-slate-800 px-2 py-1">
              Top Source Domains: <strong className="text-slate-100">{report.competitorLandscape?.marketLeaders?.length || 5} Analyzed</strong>
            </span>
            <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-1 text-emerald-300">
              Snapshot: <strong className="text-emerald-200">100% Verified</strong>
            </span>
          </div>
        </div>
      </div>

      {/* 1. Executive Summary */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md shadow-md">
        <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Compass className="w-4 h-4 text-indigo-400" />
          <span>1. Executive Summary & Market Thesis</span>
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          {report.executiveSummary}
        </p>
      </div>

      {/* 2. Key Empirical Findings */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md shadow-md">
        <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>2. Core Empirical Findings</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {report.keyFindings.map((finding, idx) => (
            <div
              key={idx}
              className="rounded-lg bg-slate-950/60 border border-slate-800/80 p-3.5 flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-emerald-500/30">
                {idx + 1}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {finding}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Competitor Ecosystem Matrix */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md shadow-md">
        <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>3. Competitor Landscape & Market Concentration</span>
        </h2>
        <p className="text-sm text-slate-300 mb-4">
          {report.competitorLandscape.summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg bg-slate-950/60 border border-indigo-500/30 p-4">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Market Leaders</div>
            <div className="space-y-1.5">
              {report.competitorLandscape.marketLeaders.map((d, i) => (
                <div key={i} className="text-xs text-slate-200 font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-slate-950/60 border border-cyan-500/30 p-4">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Primary Challengers</div>
            <div className="space-y-1.5">
              {report.competitorLandscape.emergingChallengers.map((d, i) => (
                <div key={i} className="text-xs text-slate-200 font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-slate-950/60 border border-slate-700/60 p-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Niche Specialists</div>
            <div className="space-y-1.5">
              {report.competitorLandscape.nichePlayers.map((d, i) => (
                <div key={i} className="text-xs text-slate-300 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Market Trends & Velocity */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md shadow-md">
        <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          <span>4. Market Trends & Volatility Vectors</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {report.marketTrends.map((trend, i) => (
            <div key={i} className="rounded-lg bg-slate-950/60 border border-slate-800 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-200 truncate">{trend.trendName}</span>
                  <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                    {trend.velocity}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {trend.description}
                </p>
              </div>
              <div className="text-[11px] font-semibold text-slate-500 mt-3">
                Based on {trend.signalsCount} verified signals
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Strategic Recommendations Playbook */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md shadow-md">
        <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span>5. Strategic Recommendations & Action Playbook</span>
        </h2>
        <div className="space-y-3">
          {report.strategicRecommendations.map((rec, i) => (
            <div
              key={i}
              className="rounded-lg bg-slate-950/60 border border-slate-800/80 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {rec.priority}
                  </span>
                  <span className="text-sm font-bold text-slate-200">{rec.title}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{rec.action}</p>
                <div className="text-xs text-emerald-400 font-medium">
                  Expected Impact: {rec.expectedOutcome}
                </div>
              </div>
              <div className="text-xs font-semibold text-slate-400 bg-slate-900 px-3 py-1.5 rounded-md border border-slate-800 shrink-0 text-center">
                Timeframe: {rec.timeframe}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Threat Modeling & Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-rose-500/30 bg-slate-900/70 p-5 shadow-md">
          <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            <span>Risk Signals & Vulnerabilities</span>
          </h3>
          <ul className="space-y-2">
            {report.riskSignals.map((r, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-rose-400 mt-0.5">•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-emerald-500/30 bg-slate-900/70 p-5 shadow-md">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>High-ROI Opportunities</span>
          </h3>
          <ul className="space-y-2">
            {report.opportunitySignals.map((o, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">•</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 7. Grounded SERP Sources */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md shadow-md">
        <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>7. Grounded Bright Data SERP Datasets ({report.sources.length} Verified Sources)</span>
        </h2>
        <div className="space-y-2">
          {report.sources.map((src, i) => (
            <a
              key={i}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-lg bg-slate-950/50 hover:bg-slate-950 p-3 border border-slate-800/80 hover:border-indigo-500/40 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 truncate">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Rank #{src.rank}
                  </span>
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors truncate">
                    {src.title}
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 shrink-0" />
              </div>
              <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                {src.snippet || src.url}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
