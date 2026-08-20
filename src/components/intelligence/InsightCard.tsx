import React, { useState } from 'react';
import { IntelligenceReport } from '../../types/firestore';
import { StatusBadge } from '../common/StatusBadge';
import { DiffVisualizer } from './DiffVisualizer';
import { formatTimeAgo } from '../../lib/utils';
import {
  Pin,
  ExternalLink,
  Sparkles,
  Share2,
  ChevronDown,
  ChevronUp,
  Download,
  Check,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface InsightCardProps {
  report: IntelligenceReport;
}

export const InsightCard: React.FC<InsightCardProps> = ({ report }) => {
  const { togglePinReport, addToast } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = () => {
    setIsCopied(true);
    addToast({
      title: 'Report Copied to Clipboard',
      description: `Copied intelligence payload for "${report.title}".`,
      type: 'success',
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `intel_${report.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    addToast({
      title: 'Export Complete',
      description: `Downloaded JSON report for ${report.title}`,
      type: 'info',
    });
  };

  return (
    <div className="relative rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md transition-all duration-200 glow-card hover:border-slate-700/80">
      {/* Top Meta Bar */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-800/60 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge status={report.impactLevel} size="sm" />
          
          <span className="rounded bg-slate-800/80 border border-slate-700 px-2 py-0.5 text-[10px] font-mono text-slate-300 uppercase">
            {report.category.replace('_', ' ')}
          </span>

          <span className="text-[11px] font-mono text-slate-400">
            Source: <strong className="text-slate-200">{report.sourceDomain}</strong>
          </span>

          <span className="text-slate-600">•</span>

          <span className="text-[11px] font-mono text-slate-400">
            {formatTimeAgo(report.detectedAt)}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Confidence Score Pill */}
          <div className="flex items-center gap-1 rounded bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
            <Sparkles className="h-2.5 w-2.5" />
            <span>{(report.confidenceScore * 100).toFixed(0)}% AI CONFIDENCE</span>
          </div>

          {/* Pin Button */}
          <button
            onClick={() => togglePinReport(report.id)}
            title={report.pinned ? 'Unpin' : 'Pin to top'}
            className={`rounded p-1 transition-colors ${
              report.pinned ? 'text-amber-400 bg-amber-500/10' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Pin className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-3 space-y-3">
        <div>
          <h3 className="text-sm font-bold text-slate-100 font-mono leading-snug">
            {report.title}
          </h3>
          <p className="mt-1 text-xs text-slate-300 leading-relaxed">
            {report.summary}
          </p>
        </div>

        {/* Diff Visualizer Box */}
        {report.diffs && report.diffs.length > 0 && (
          <div className="mt-2">
            <p className="text-[10px] font-semibold text-slate-400 uppercase font-mono mb-1.5 flex items-center gap-1">
              <Zap className="h-3 w-3 text-emerald-400" />
              <span>Extracted Schema Differential</span>
            </p>
            <DiffVisualizer diffs={report.diffs} />
          </div>
        )}

        {/* Expanded Deep Analysis */}
        {isExpanded && (
          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3.5 space-y-2 animate-in fade-in duration-150">
            <p className="text-[10px] font-semibold text-slate-400 uppercase font-mono">
              Deep Intelligence Analysis
            </p>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {report.detailedAnalysis}
            </p>
            <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800/80">
              <a
                href={report.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
              >
                <span>Inspect Target Source URL</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <span>Extracted via Bright Data Scraper Studio</span>
            </div>
          </div>
        )}

        {/* Tags & Action Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/40">
          <div className="flex items-center gap-1.5 flex-wrap">
            {report.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-700/50"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Copy to Clipboard"
              className="flex items-center gap-1 rounded border border-slate-700 bg-slate-800 px-2 py-1 text-[11px] font-mono text-slate-300 hover:bg-slate-700 transition-colors"
            >
              {isCopied ? <Check className="h-3 w-3 text-emerald-400" /> : <Share2 className="h-3 w-3" />}
              <span>Share</span>
            </button>

            <button
              onClick={handleExportJson}
              title="Export Report JSON"
              className="flex items-center gap-1 rounded border border-slate-700 bg-slate-800 px-2 py-1 text-[11px] font-mono text-slate-300 hover:bg-slate-700 transition-colors"
            >
              <Download className="h-3 w-3" />
              <span>Export</span>
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 rounded border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-mono text-slate-200 hover:bg-slate-700 transition-colors"
            >
              <span>{isExpanded ? 'Less' : 'Analyze'}</span>
              {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
