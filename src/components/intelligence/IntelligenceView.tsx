/**
 * ScrapeGuardian AI - Comprehensive AI Intelligence Center
 * 
 * Houses the full autonomous web intelligence suite:
 * 1. Strategic AI Insights (8 Categories)
 * 2. Boardroom Executive Reports
 * 3. Competitor Visibility Matrix
 * 4. SERP Trend & Movement Signals
 * 5. Autonomous Research Agent Chat
 * 6. Web Diffs & Ingestion History
 */

import React, { useState } from 'react';
import {
  Sparkles,
  FileText,
  Layers,
  TrendingUp,
  Bot,
  Compass,
  RefreshCw,
  Award,
  Search,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AIInsightCard } from './AIInsightCard';
import { ExecutiveReportView } from './ExecutiveReportView';
import { CompetitorMatrixView } from './CompetitorMatrixView';
import { TrendSignalsView } from './TrendSignalsView';
import { ResearchAgentChat } from './ResearchAgentChat';
import { InsightCard } from './InsightCard';
import { EmptyState } from '../common/EmptyState';
import { AIInsightCategory } from '../../types/firestore';

export type IntelSubTab =
  | 'insights'
  | 'executive_report'
  | 'competitor_matrix'
  | 'trend_signals'
  | 'research_agent'
  | 'web_diffs';

const INSIGHT_CATEGORY_TABS: { id: AIInsightCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Categories' },
  { id: 'executive_summary', label: 'Executive' },
  { id: 'competitor_analysis', label: 'Competitors' },
  { id: 'trend_analysis', label: 'Trends' },
  { id: 'market_insights', label: 'Market Value' },
  { id: 'risk_signals', label: 'Risks' },
  { id: 'opportunity_signals', label: 'Opportunities' },
  { id: 'key_findings', label: 'Key Findings' },
  { id: 'strategic_recommendations', label: 'Strategic Playbook' },
];

export const IntelligenceView: React.FC = () => {
  const {
    aiInsights,
    selectedInsightCategory,
    setSelectedInsightCategory,
    generateInsightsForQuery,
    isGeneratingInsights,
    currentExecutiveReport,
    generateExecutiveReportForQuery,
    isGeneratingReport,
    intelligenceReports,
    currentSearchJob,
  } = useApp();

  const [activeTab, setActiveTab] = useState<IntelSubTab>('insights');
  const [insightSearch, setInsightSearch] = useState('');

  const filteredInsights = aiInsights.filter((ins) => {
    const matchesCat =
      selectedInsightCategory === 'all' || ins.category === selectedInsightCategory;
    const matchesSearch =
      insightSearch === '' ||
      ins.title.toLowerCase().includes(insightSearch.toLowerCase()) ||
      ins.summary.toLowerCase().includes(insightSearch.toLowerCase()) ||
      ins.tags.some((t) => t.toLowerCase().includes(insightSearch.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200" id="intelligence-view">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold tracking-tight text-slate-100 font-mono">
              ScrapeGuardian AI Intelligence Suite
            </h1>
            <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-mono font-bold text-indigo-400 border border-indigo-500/30">
              Autonomous Mesh Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Autonomous multi-provider AI reasoning grounded on real-time Bright Data SERP Datasets for: <strong className="text-slate-200">"{currentSearchJob?.keyword || 'Active Search Query'}"</strong>
          </p>
        </div>

        {/* Global Action: Generate Intelligence */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            id="btn-generate-ai-suite"
            onClick={() => generateInsightsForQuery()}
            disabled={isGeneratingInsights}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all duration-150"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isGeneratingInsights ? 'animate-spin' : ''}`} />
            <span>{isGeneratingInsights ? 'Synthesizing with AI...' : 'Re-synthesize Intelligence'}</span>
          </button>
        </div>
      </div>

      {/* Main Feature Sub-Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('insights')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'insights'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Strategic AI Insights</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-950/60 text-indigo-300">
            {aiInsights.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('executive_report')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'executive_report'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Boardroom Report</span>
        </button>

        <button
          onClick={() => setActiveTab('competitor_matrix')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'competitor_matrix'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Competitor Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab('trend_signals')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'trend_signals'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>SERP Movement & Trends</span>
        </button>

        <button
          onClick={() => setActiveTab('research_agent')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'research_agent'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Bot className="w-3.5 h-3.5 text-cyan-400" />
          <span>Ask Research Agent</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-cyan-500/20 text-cyan-300 font-bold">
            Live
          </span>
        </button>

        <button
          onClick={() => setActiveTab('web_diffs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'web_diffs'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Historical Web Diffs</span>
        </button>
      </div>

      {/* Tab 1: AI Insights */}
      {activeTab === 'insights' && (
        <div className="space-y-5">
          {/* Category Filter Pills & Search */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {INSIGHT_CATEGORY_TABS.map((cat) => {
                const isSelected = selectedInsightCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedInsightCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                        : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div className="relative min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Filter insights..."
                value={insightSearch}
                onChange={(e) => setInsightSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          {/* Insights Cards List */}
          {filteredInsights.length === 0 ? (
            <EmptyState
              title="No Insights Matching Query"
              description="Click 'Re-synthesize Intelligence' to generate new multi-model intelligence."
              icon={Sparkles}
              actionLabel="View All Insights"
              onAction={() => {
                setSelectedInsightCategory('all');
                setInsightSearch('');
              }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredInsights.map((ins) => (
                <AIInsightCard key={ins.id} insight={ins} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Executive Boardroom Report */}
      {activeTab === 'executive_report' && (
        <div>
          {currentExecutiveReport ? (
            <ExecutiveReportView report={currentExecutiveReport} />
          ) : (
            <div className="text-center p-12 bg-slate-900/60 rounded-2xl border border-slate-800">
              <FileText className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-100">No Executive Report Generated</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Generate a boardroom briefing covering market share of voice, trends, and strategic playbooks.
              </p>
              <button
                onClick={() => generateExecutiveReportForQuery()}
                disabled={isGeneratingReport}
                className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md"
              >
                {isGeneratingReport ? 'Generating Briefing...' : 'Generate Executive Report'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Competitor Matrix */}
      {activeTab === 'competitor_matrix' && <CompetitorMatrixView />}

      {/* Tab 4: SERP Movement & Trends */}
      {activeTab === 'trend_signals' && <TrendSignalsView />}

      {/* Tab 5: Ask Research Agent */}
      {activeTab === 'research_agent' && <ResearchAgentChat />}

      {/* Tab 6: Web Diffs */}
      {activeTab === 'web_diffs' && (
        <div className="space-y-4">
          {intelligenceReports.map((report) => (
            <InsightCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
};
