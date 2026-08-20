import React, { useState } from 'react';
import { DomainIntelligence } from '../../types/firestore';
import { searchResultService } from '../../services/searchResult.service';
import { useApp } from '../../context/AppContext';
import {
  Globe,
  TrendingUp,
  TrendingDown,
  Award,
  Layers,
  ExternalLink,
  Download,
  BarChart3,
  Sparkles,
  PieChart,
  Tag,
  ArrowUpRight,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface DomainIntelligenceCardsProps {
  domains: DomainIntelligence[];
  keyword: string;
}

export const DomainIntelligenceCards: React.FC<DomainIntelligenceCardsProps> = ({
  domains,
  keyword,
}) => {
  const { addToast } = useApp();
  const [sortKey, setSortKey] = useState<'visibility' | 'voice' | 'rank'>('visibility');

  const sortedDomains = [...domains].sort((a, b) => {
    if (sortKey === 'visibility') return b.visibilityScore - a.visibilityScore;
    if (sortKey === 'voice') return b.shareOfVoice - a.shareOfVoice;
    return a.topRank - b.topRank;
  });

  const handleExportDomainCSV = () => {
    const filename = `domain-intelligence-${keyword.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.csv`;
    searchResultService.exportDomainIntelligenceToCSV(domains, filename);
    addToast({
      title: 'Domain Intelligence Exported',
      description: `Downloaded ${domains.length} domain profiles as CSV.`,
      type: 'success',
    });
  };

  const getVisibilityColor = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-teal-400 text-emerald-400';
    if (score >= 50) return 'from-blue-500 to-cyan-400 text-blue-400';
    if (score >= 30) return 'from-amber-500 to-orange-400 text-amber-400';
    return 'from-slate-500 to-slate-400 text-slate-400';
  };

  return (
    <div className="space-y-4">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 backdrop-blur-md">
        <div>
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <PieChart className="h-4 w-4 text-emerald-400" />
            Competitive Domain Ecosystem ({domains.length} Unique Domains)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Aggregated visibility metrics, market share of voice, and landing page coverage
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Sort By:</span>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as any)}
              aria-label="Sort Domains By"
              className="rounded border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
            >
              <option value="visibility">Visibility Score</option>
              <option value="voice">Share of Voice (%)</option>
              <option value="rank">Top Rank Position</option>
            </select>
          </div>

          <button
            onClick={handleExportDomainCSV}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 text-xs font-medium text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-emerald-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Domain Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {sortedDomains.map((dom, index) => {
          const isWinner = index === 0;
          return (
            <div
              key={dom.domain}
              className={cn(
                'rounded-xl border p-4.5 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between transition-all hover:border-slate-700/80 relative overflow-hidden group',
                isWinner
                  ? 'border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                  : 'border-slate-800/80'
              )}
            >
              {isWinner && (
                <div className="absolute -top-10 -right-10 h-24 w-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
              )}

              <div>
                {/* Domain Header */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-800/70 pb-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 border border-slate-800 font-mono text-sm font-bold text-slate-200 group-hover:border-emerald-500/40 group-hover:text-emerald-300 transition-colors">
                      {dom.domain.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-semibold text-slate-100 text-sm font-mono flex items-center gap-1">
                          {dom.domain}
                        </h4>
                        {isWinner && (
                          <span className="inline-flex items-center gap-1 rounded bg-amber-500/20 border border-amber-500/40 px-1.5 py-0.2 text-[9px] font-bold text-amber-300 font-mono">
                            <Award className="h-2.5 w-2.5" />
                            #1 LEADER
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="rounded bg-slate-950 px-1.5 py-0.2 text-[10px] text-slate-400 font-mono border border-slate-800">
                          {dom.categoryTag || 'Enterprise Web'}
                        </span>
                        {dom.hasSiteLinks && (
                          <span className="text-[10px] text-emerald-400 font-mono">
                            + Sitelinks
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Trend Score */}
                  <div
                    className={cn(
                      'inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-mono font-medium border',
                      dom.trendScore >= 0
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    )}
                  >
                    {dom.trendScore >= 0 ? (
                      <TrendingUp className="h-2.5 w-2.5" />
                    ) : (
                      <TrendingDown className="h-2.5 w-2.5" />
                    )}
                    <span>{dom.trendScore >= 0 ? `+${dom.trendScore}%` : `${dom.trendScore}%`}</span>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 mb-3.5 text-center">
                  <div className="rounded-lg bg-slate-950/70 border border-slate-800/80 p-2">
                    <p className="text-[10px] text-slate-400 font-mono uppercase">Top Rank</p>
                    <p className="text-sm font-bold text-slate-100 font-mono">#{dom.topRank}</p>
                  </div>
                  <div className="rounded-lg bg-slate-950/70 border border-slate-800/80 p-2">
                    <p className="text-[10px] text-slate-400 font-mono uppercase">Indexed Pages</p>
                    <p className="text-sm font-bold text-slate-100 font-mono">{dom.occurrences}</p>
                  </div>
                  <div className="rounded-lg bg-slate-950/70 border border-slate-800/80 p-2">
                    <p className="text-[10px] text-slate-400 font-mono uppercase">Share of Voice</p>
                    <p className="text-sm font-bold text-emerald-400 font-mono">{dom.shareOfVoice}%</p>
                  </div>
                </div>

                {/* Visibility Score Progress Bar */}
                <div className="space-y-1 mb-3.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1 font-mono">
                      <BarChart3 className="h-3 w-3 text-slate-400" />
                      Visibility Index
                    </span>
                    <span className="font-mono font-bold text-slate-200">
                      {dom.visibilityScore} / 100
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-950 border border-slate-800">
                    <div
                      className={cn(
                        'h-full bg-gradient-to-r transition-all duration-500 rounded-full',
                        getVisibilityColor(dom.visibilityScore)
                      )}
                      style={{ width: `${dom.visibilityScore}%` }}
                    />
                  </div>
                </div>

                {/* Sample Indexed Landing Pages */}
                {dom.sampleTitles && dom.sampleTitles.length > 0 && (
                  <div className="space-y-1.5 border-t border-slate-800/60 pt-2.5">
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      Indexed Landing Pages ({dom.sampleTitles.length}):
                    </p>
                    <ul className="space-y-1">
                      {dom.sampleTitles.slice(0, 2).map((title, tIdx) => (
                        <li key={tIdx} className="truncate text-xs text-slate-300">
                          <a
                            href={dom.sampleUrls[tIdx] || `https://${dom.domain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1 max-w-full"
                          >
                            <span className="truncate">• {title}</span>
                            <ArrowUpRight className="h-2.5 w-2.5 text-slate-500 shrink-0" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="mt-3.5 pt-2.5 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">
                  Avg Position: #{dom.averagePosition}
                </span>
                <a
                  href={`https://${dom.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-slate-400 hover:text-emerald-400 inline-flex items-center gap-1 font-mono transition-colors"
                >
                  <span>Visit Domain</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
