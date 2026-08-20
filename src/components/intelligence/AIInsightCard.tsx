/**
 * ScrapeGuardian AI - AI Insight Card
 * 
 * Renders categorized AI intelligence outputs with confidence metrics,
 * model provenance, source citations, and actionable key points.
 */

import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  ShieldAlert,
  Compass,
  CheckCircle2,
  Cpu,
  Layers,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Award,
  ExternalLink,
} from 'lucide-react';
import { AIInsight, AIInsightCategory } from '../../types/firestore';

interface AIInsightCardProps {
  insight: AIInsight;
  onPinToggle?: (id: string) => void;
}

const CATEGORY_CONFIG: Record<
  AIInsightCategory,
  { label: string; bg: string; text: string; border: string; icon: React.ReactNode }
> = {
  executive_summary: {
    label: 'Executive Summary',
    bg: 'bg-indigo-500/10',
    text: 'text-indigo-400',
    border: 'border-indigo-500/30',
    icon: <Award className="w-3.5 h-3.5" />,
  },
  competitor_analysis: {
    label: 'Competitor Analysis',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    icon: <Layers className="w-3.5 h-3.5" />,
  },
  trend_analysis: {
    label: 'Trend & Volatility',
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
    icon: <TrendingUp className="w-3.5 h-3.5" />,
  },
  market_insights: {
    label: 'Market & Intent',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    icon: <Compass className="w-3.5 h-3.5" />,
  },
  risk_signals: {
    label: 'Risk & Threats',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    icon: <ShieldAlert className="w-3.5 h-3.5" />,
  },
  opportunity_signals: {
    label: 'Growth Opportunities',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    icon: <Sparkles className="w-3.5 h-3.5" />,
  },
  key_findings: {
    label: 'SLA & Data Quality',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
  strategic_recommendations: {
    label: 'Strategic Playbook',
    bg: 'bg-rose-500/10',
    text: 'text-rose-400',
    border: 'border-rose-500/30',
    icon: <Sparkles className="w-3.5 h-3.5" />,
  },
};

export const AIInsightCard: React.FC<AIInsightCardProps> = ({ insight }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const cat = CATEGORY_CONFIG[insight.category] || CATEGORY_CONFIG.executive_summary;

  const handleCopy = () => {
    const text = `${insight.title}\n\n${insight.summary}\n\nKey Points:\n${insight.keyPoints.map((k) => `• ${k}`).join('\n')}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confidencePercent = Math.round(insight.confidenceScore * 100);

  return (
    <div
      id={`ai-insight-${insight.id}`}
      className="group relative rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md transition-all duration-200 hover:border-slate-700 hover:bg-slate-900/90 shadow-lg shadow-black/20"
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3.5">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${cat.bg} ${cat.text} ${cat.border}`}
          >
            {cat.icon}
            {cat.label}
          </span>

          {insight.impactLevel && (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                insight.impactLevel === 'critical'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : insight.impactLevel === 'high'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {insight.impactLevel} Impact
            </span>
          )}
        </div>

        {/* Confidence Engine Provenance Badges */}
        <div className="flex items-center gap-2 text-xs">
          <div
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium"
            title="Grounded Verification Confidence"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{confidencePercent}% Conf</span>
          </div>

          <div
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-800/90 border border-slate-700/60 text-slate-300 font-medium"
            title={`Synthesized by ${insight.providerUsed}`}
          >
            <Cpu className="w-3 h-3 text-indigo-400" />
            <span className="truncate max-w-[110px]">{insight.providerUsed}</span>
          </div>

          <button
            id={`btn-copy-insight-${insight.id}`}
            onClick={handleCopy}
            className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Copy insight text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Title & Executive Summary */}
      <h3 className="text-base font-semibold text-slate-100 mb-2 group-hover:text-white transition-colors leading-snug">
        {insight.title}
      </h3>
      <p className="text-sm text-slate-300 leading-relaxed mb-4">
        {insight.summary}
      </p>

      {/* Key Takeaways / Points */}
      {insight.keyPoints && insight.keyPoints.length > 0 && (
        <div className="rounded-lg bg-slate-950/40 border border-slate-800/60 p-3 mb-3.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>Key Empirical Signals</span>
          </div>
          <ul className="space-y-1.5">
            {insight.keyPoints.map((pt, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Metric Tiles if available */}
      {insight.metrics && insight.metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3.5">
          {insight.metrics.map((m, i) => (
            <div key={i} className="rounded-md bg-slate-950/60 border border-slate-800/80 p-2 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider truncate">{m.label}</div>
              <div className="text-sm font-bold text-slate-100 mt-0.5 flex items-center justify-center gap-1">
                <span>{m.value}</span>
                {m.change && (
                  <span className="text-[10px] font-semibold text-emerald-400">{m.change}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Expandable Reasoning & Verification Trace */}
      {insight.reasoningSummary && (
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors pt-1"
          >
            <span>{isExpanded ? 'Hide Verification Audit' : 'Show Verification Audit & Sources'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {isExpanded && (
            <div className="mt-2.5 pt-2.5 border-t border-slate-800/60 text-xs text-slate-400 space-y-1.5 animate-fadeIn">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-300">Grounding Audit:</span>
                <span>{insight.reasoningSummary}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-300">Verified Records:</span>
                <span className="text-slate-300">{insight.sourceCount} Bright Data SERP nodes</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
