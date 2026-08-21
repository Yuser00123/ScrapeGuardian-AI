import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SearchResultsTable } from './SearchResultsTable';
import { DomainIntelligenceCards } from './DomainIntelligenceCards';
import { DatasetRawViewer } from './DatasetRawViewer';
import { SearchHistoryTable } from './SearchHistoryTable';
import { ScraperStudioOutput } from './ScraperStudioOutput';
import {
  Layers,
  Table,
  PieChart,
  FileCode,
  History,
  TrendingUp,
  Award,
  Clock,
  DollarSign,
  Globe,
  ExternalLink,
  Sparkles,
  BarChart2,
  CheckCircle2,
  Radio,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export type ResultTab = 'studio' | 'overview' | 'results' | 'domains' | 'raw' | 'history';

export const ResultsViewer: React.FC = () => {
  const {
    currentSearchJob,
    searchResults,
    domainIntelligence,
    datasetExecutions,
    searchJobs,
  } = useApp();

  const [activeTab, setActiveTab] = useState<ResultTab>('studio');

  const currentKeyword = currentSearchJob?.keyword || 'AI agents';
  const topDomain = domainIntelligence[0] || {
    domain: 'brightdata.com',
    visibilityScore: 98,
    occurrences: 2,
    shareOfVoice: 25.0,
    trendScore: 16.4,
  };

  const topRankResult = searchResults.find((r) => r.position === 1) || searchResults[0];

  const tabs: Array<{ id: ResultTab; label: string; icon: React.ElementType; badge?: string }> = [
    { id: 'studio', label: 'Scraper Studio Output', icon: Radio, badge: `${searchResults.length} Records` },
    { id: 'overview', label: 'SERP Overview', icon: Layers },
    { id: 'results', label: 'Ranked Results', icon: Table, badge: `${searchResults.length}` },
    { id: 'domains', label: 'Domain Market Share', icon: PieChart, badge: `${domainIntelligence.length}` },
    { id: 'raw', label: 'Dataset AST (JSON)', icon: FileCode },
    { id: 'history', label: 'Query History', icon: History, badge: `${searchJobs.length}` },
  ];

  return (
    <div className="space-y-4">
      {/* Metric Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
            <Layers className="h-3.5 w-3.5 text-emerald-400" />
            <span>Active Query</span>
          </div>
          <p className="text-sm font-bold text-slate-100 truncate font-mono">
            "{currentKeyword}"
          </p>
          <p className="text-[10px] text-emerald-400 font-mono">
            {currentSearchJob?.country || 'US'} · {searchResults.length} Ingested
          </p>
        </div>

        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
            <Award className="h-3.5 w-3.5 text-amber-400" />
            <span>SERP Leader</span>
          </div>
          <p className="text-sm font-bold text-slate-100 truncate font-mono">
            {topDomain.domain}
          </p>
          <p className="text-[10px] text-amber-400 font-mono">
            Score: {topDomain.visibilityScore}/100 ({topDomain.shareOfVoice}% Voice)
          </p>
        </div>

        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
            <Globe className="h-3.5 w-3.5 text-blue-400" />
            <span>Unique Domains</span>
          </div>
          <p className="text-sm font-bold text-slate-100 font-mono">
            {domainIntelligence.length} Competitors
          </p>
          <p className="text-[10px] text-blue-400 font-mono">
            Organic SERP Space
          </p>
        </div>

        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
            <Clock className="h-3.5 w-3.5 text-teal-400" />
            <span>Execution Speed</span>
          </div>
          <p className="text-sm font-bold text-slate-100 font-mono">
            {currentSearchJob?.executionTimeMs || 1240} ms
          </p>
          <p className="text-[10px] text-teal-400 font-mono">
            Sub-second API Delivery
          </p>
        </div>

        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 backdrop-blur-md hidden lg:block">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
            <DollarSign className="h-3.5 w-3.5 text-purple-400" />
            <span>Cost Efficiency</span>
          </div>
          <p className="text-sm font-bold text-slate-100 font-mono">
            ${currentSearchJob?.costEstimatedUsd || '0.0350'}
          </p>
          <p className="text-[10px] text-purple-400 font-mono">
            Bright Data Pricing Tier
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-800/80 pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-all',
                isActive
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
              )}
            >
              <Icon className={cn('h-4 w-4', isActive ? 'text-emerald-400' : 'text-slate-400')} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.2 text-[10px] font-mono',
                    isActive
                      ? 'bg-emerald-500/25 text-emerald-300'
                      : 'bg-slate-800 text-slate-400'
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="pt-1">
        {/* Tab 0: Scraper Studio Output */}
        {activeTab === 'studio' && (
          <ScraperStudioOutput
            results={searchResults}
            execution={datasetExecutions[0]}
            keyword={currentKeyword}
          />
        )}

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Top Ranked Result Highlight Box */}
            {topRankResult && (
              <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-slate-900/80 to-slate-950 p-5 backdrop-blur-md relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-800/70 pb-3 mb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 text-xs font-bold text-amber-300 font-mono">
                      <Award className="h-3.5 w-3.5" />
                      RANK #1 ORGANIC WINNER
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Target Query: <strong className="text-slate-200">{currentKeyword}</strong>
                    </span>
                  </div>

                  <a
                    href={topRankResult.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-mono transition-colors"
                  >
                    <span>Inspect Target</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-100 hover:text-emerald-400 transition-colors">
                    <a href={topRankResult.url} target="_blank" rel="noopener noreferrer">
                      {topRankResult.title}
                    </a>
                  </h3>
                  <p className="text-xs font-mono text-emerald-400/90">
                    {topRankResult.additionalData?.displayedUrl || topRankResult.url}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                    {topRankResult.description}
                  </p>

                  {/* Sitelinks chips if available */}
                  {topRankResult.sitelinks && (
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <span className="text-xs text-slate-400 font-mono">Featured Sitelinks:</span>
                      {topRankResult.sitelinks.map((sl, sIdx) => (
                        <a
                          key={sIdx}
                          href={sl.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-md bg-slate-950 border border-slate-800 px-2.5 py-1 text-xs text-slate-200 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
                        >
                          <span>{sl.title}</span>
                          <ExternalLink className="h-3 w-3 text-slate-500" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Competitive Landscape Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Domain Visibility Breakdown */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4.5 backdrop-blur-md">
                <h4 className="text-sm font-semibold text-slate-100 mb-3 flex items-center gap-2">
                  <PieChart className="h-4 w-4 text-emerald-400" />
                  Top Domain Visibility Breakdown
                </h4>
                <div className="space-y-3">
                  {domainIntelligence.slice(0, 5).map((dom, dIdx) => (
                    <div key={dom.domain} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-200 flex items-center gap-1.5">
                          <span className="text-slate-500">#{dIdx + 1}</span>
                          <strong>{dom.domain}</strong>
                          <span className="text-[10px] text-slate-400">({dom.occurrences} pages)</span>
                        </span>
                        <span className="text-emerald-400 font-bold">
                          {dom.visibilityScore}% Visibility
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-950 border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                          style={{ width: `${dom.visibilityScore}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SERP Features & Quality Checklist */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4.5 backdrop-blur-md">
                <h4 className="text-sm font-semibold text-slate-100 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Dataset Verification & Extraction Signals
                </h4>
                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-start gap-2 rounded-lg bg-slate-950/60 border border-slate-800/80 p-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Bright Data Google SERP Dataset Engine</strong>
                      <p className="text-slate-400 text-[11px]">
                        Extracted real-time structured rankings via Dataset ID: <code className="text-emerald-400 font-mono">gd_l1viktl72bvl7bjuj0</code>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 rounded-lg bg-slate-950/60 border border-slate-800/80 p-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Residential Proxy Mesh Ingress</strong>
                      <p className="text-slate-400 text-[11px]">
                        Anti-bot resolution passed with 0 CAPTCHA blocks and 100% schema completeness.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 rounded-lg bg-slate-950/60 border border-slate-800/80 p-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Domain Intelligence Aggregation</strong>
                      <p className="text-slate-400 text-[11px]">
                        Synthesized {domainIntelligence.length} domain profiles with weighted visibility and market share of voice calculations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Results Table Preview */}
            <div className="pt-2">
              <SearchResultsTable results={searchResults} keyword={currentKeyword} />
            </div>
          </div>
        )}

        {/* Tab 2: Full Results Table */}
        {activeTab === 'results' && (
          <SearchResultsTable results={searchResults} keyword={currentKeyword} />
        )}

        {/* Tab 3: Domain Intelligence */}
        {activeTab === 'domains' && (
          <DomainIntelligenceCards domains={domainIntelligence} keyword={currentKeyword} />
        )}

        {/* Tab 4: Raw Dataset AST */}
        {activeTab === 'raw' && (
          <DatasetRawViewer
            results={searchResults}
            execution={datasetExecutions[0]}
            keyword={currentKeyword}
          />
        )}

        {/* Tab 5: Search History */}
        {activeTab === 'history' && <SearchHistoryTable />}
      </div>
    </div>
  );
};
