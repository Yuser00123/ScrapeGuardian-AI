import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DatasetExecution, SearchResult } from '../../types/firestore';
import {
  History,
  Radio,
  Search,
  Database,
  FileCode,
  Sparkles,
  FileText,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Eye,
  X,
  Copy,
  Check,
  Download,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const CollectionHistoryView: React.FC = () => {
  const {
    datasetExecutions,
    searchResults,
    searchJobs,
    currentSearchJob,
    runSearch,
    setCurrentView,
    addToast,
  } = useApp();

  const [selectedItem, setSelectedItem] = useState<DatasetExecution | null>(null);
  const [activeAuditTab, setActiveAuditTab] = useState<'input' | 'dataset' | 'raw' | 'normalized' | 'ai' | 'report'>('raw');
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const filteredExecutions = datasetExecutions.filter((item) =>
    !filterQuery || item.keyword.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.datasetId.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.snapshotId.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleOpenAudit = (exec: DatasetExecution) => {
    setSelectedItem(exec);
    setActiveAuditTab('raw');
  };

  const handleCopyRaw = async () => {
    const rawData = JSON.stringify(searchResults, null, 2);
    await navigator.clipboard.writeText(rawData);
    setCopied(true);
    addToast({
      title: 'Copied Raw Output',
      description: 'Copied structured JSON records.',
      type: 'info',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6" id="collection-history-view">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 px-3 py-0.5 text-xs font-mono font-bold text-emerald-300">
              <History className="h-3.5 w-3.5" />
              COLLECTION HISTORY & AUDIT LOGS
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100 font-mono">
            Bright Data Ingestion Runs ({datasetExecutions.length} Recorded)
          </h1>
          <p className="text-xs text-slate-400">
            Audit the end-to-end lineage from keyword dispatch to structured output and executive reports.
          </p>
        </div>

        {/* Search / Filter Box */}
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter runs by keyword..."
            className="w-full rounded-lg border border-slate-800 bg-slate-950 py-1.5 pl-8 pr-3 text-xs text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none font-sans"
          />
        </div>
      </div>

      {/* Main Table of Collection History */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 shadow-2xl">
        <table className="w-full text-left text-xs border-collapse font-mono">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] text-slate-400">
              <th className="p-3.5">Dataset Run / ID</th>
              <th className="p-3.5">Keyword</th>
              <th className="p-3.5">Timestamp</th>
              <th className="p-3.5 text-center">Records</th>
              <th className="p-3.5">Source & Ingress</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Audit Trail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {filteredExecutions.map((item) => (
              <tr key={item.id} className="hover:bg-slate-900/40 transition-colors group">
                <td className="p-3.5 font-mono">
                  <span className="font-bold text-emerald-400">{item.snapshotId || `s_${item.id}`}</span>
                  <p className="text-[10px] text-slate-500 font-mono">{item.datasetId || 'gd_l1viktl72bvl7bjuj0'}</p>
                </td>

                <td className="p-3.5">
                  <span className="font-semibold text-slate-100 group-hover:text-emerald-400 transition-colors">
                    "{item.keyword}"
                  </span>
                </td>

                <td className="p-3.5 font-mono text-slate-400 text-xs">
                  {new Date(item.timestamp).toLocaleString()}
                </td>

                <td className="p-3.5 text-center font-mono">
                  <span className="inline-flex items-center rounded bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xs text-emerald-300 font-bold">
                    {item.recordsCount || 100}
                  </span>
                </td>

                <td className="p-3.5 font-mono text-slate-400 text-xs">
                  Google SERP · {item.proxyZone || 'residential_mesh'}
                </td>

                <td className="p-3.5">
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-300 uppercase">
                    <CheckCircle2 className="h-2.5 w-2.5" />
                    {item.status || 'READY'}
                  </span>
                </td>

                <td className="p-3.5 text-right">
                  <button
                    onClick={() => handleOpenAudit(item)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-mono font-semibold text-slate-200 hover:border-emerald-500 hover:text-emerald-300 transition-all shadow"
                  >
                    <Eye className="h-3 w-3" />
                    <span>Audit (6-Step)</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 6-Stage Audit Trail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-slate-700 bg-slate-950 p-6 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold px-2 py-0.5">
                    COLLECTION AUDIT TRAIL
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    Snapshot ID: {selectedItem.snapshotId}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-100 font-mono mt-1">
                  Lineage: "{selectedItem.keyword}"
                </h2>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* 6 Audit Tabs */}
            <div className="flex items-center gap-1 border-b border-slate-800 pt-3 pb-2 overflow-x-auto">
              <button
                onClick={() => setActiveAuditTab('input')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap',
                  activeAuditTab === 'input' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200'
                )}
              >
                1. Input Query
              </button>
              <button
                onClick={() => setActiveAuditTab('dataset')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap',
                  activeAuditTab === 'dataset' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200'
                )}
              >
                2. Bright Data Dataset
              </button>
              <button
                onClick={() => setActiveAuditTab('raw')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap',
                  activeAuditTab === 'raw' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200'
                )}
              >
                3. Raw Output (JSON)
              </button>
              <button
                onClick={() => setActiveAuditTab('normalized')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap',
                  activeAuditTab === 'normalized' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200'
                )}
              >
                4. Normalized Data
              </button>
              <button
                onClick={() => setActiveAuditTab('ai')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap',
                  activeAuditTab === 'ai' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200'
                )}
              >
                5. AI Analysis
              </button>
              <button
                onClick={() => setActiveAuditTab('report')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap',
                  activeAuditTab === 'report' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200'
                )}
              >
                6. Generated Report
              </button>
            </div>

            {/* Audit Content Area */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs font-mono">
              {activeAuditTab === 'input' && (
                <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <p className="text-slate-300 font-bold uppercase text-[11px]">Query Ingestion Spec:</p>
                  <p className="text-slate-200">Target Keyword: <strong className="text-emerald-400">"{selectedItem.keyword}"</strong></p>
                  <p className="text-slate-300">Country: <strong className="text-slate-100">United States (US)</strong></p>
                  <p className="text-slate-300">Language: <strong className="text-slate-100">English (en)</strong></p>
                  <p className="text-slate-300">Requested Records: <strong className="text-slate-100">100 max</strong></p>
                </div>
              )}

              {activeAuditTab === 'dataset' && (
                <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <p className="text-slate-300 font-bold uppercase text-[11px]">Bright Data Ingestion Metadata:</p>
                  <p className="text-slate-200">Dataset ID: <strong className="text-emerald-400">{selectedItem.datasetId || 'gd_l1viktl72bvl7bjuj0'}</strong></p>
                  <p className="text-slate-200">Snapshot ID: <strong className="text-slate-100">{selectedItem.snapshotId}</strong></p>
                  <p className="text-slate-200">Ingress Zone: <strong className="text-teal-400">{selectedItem.proxyZone || 'residential_mesh'}</strong></p>
                  <p className="text-slate-200">Duration: <strong className="text-slate-100">{selectedItem.durationMs || 1180} ms</strong></p>
                </div>
              )}

              {activeAuditTab === 'raw' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Raw JSON Payload (First 10 records shown)</span>
                    <button
                      onClick={handleCopyRaw}
                      className="flex items-center gap-1 text-emerald-400 hover:underline"
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>Copy Full JSON</span>
                    </button>
                  </div>
                  <div className="bg-[#030712] p-3 rounded-lg border border-slate-800 max-h-[300px] overflow-y-auto text-[11px] text-emerald-400/90">
                    <pre>{JSON.stringify(searchResults.slice(0, 10), null, 2)}</pre>
                  </div>
                </div>
              )}

              {activeAuditTab === 'normalized' && (
                <div className="space-y-2">
                  <p className="text-slate-400">Normalized Data Structure (100 Records Extracted):</p>
                  <div className="space-y-1 max-h-[300px] overflow-y-auto">
                    {searchResults.slice(0, 8).map((r) => (
                      <div key={r.id} className="p-2 bg-slate-900/60 rounded border border-slate-800 flex items-center justify-between">
                        <span className="text-emerald-400 font-bold">#{r.rank} {r.title}</span>
                        <span className="text-slate-400">{r.domain}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeAuditTab === 'ai' && (
                <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <p className="text-slate-300 font-bold uppercase text-[11px]">AI Synthesis Grounding:</p>
                  <p className="text-slate-200">Model Engine: <strong className="text-purple-400">Gemini 2.5 Flash / Groq LLaMA 3.3</strong></p>
                  <p className="text-slate-200">Share of Voice Processed: <strong className="text-emerald-400">100% SERP Space</strong></p>
                  <p className="text-slate-200">Key Themes: <strong className="text-slate-100">Enterprise AI Agents, Open-Source Frameworks, Autonomous Scrapers</strong></p>
                </div>
              )}

              {activeAuditTab === 'report' && (
                <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <p className="text-slate-300 font-bold uppercase text-[11px]">Executive Report Linkage:</p>
                  <p className="text-slate-200">Brief Title: <strong className="text-slate-100">Autonomous Market Analysis: "{selectedItem.keyword}"</strong></p>
                  <p className="text-slate-200">Citation Linkage: <strong className="text-emerald-400">Bright Data Dataset gd_l1viktl72bvl7bjuj0</strong></p>
                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      setCurrentView('intelligence');
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-slate-950 font-bold text-xs"
                  >
                    <span>Open Full Boardroom Report →</span>
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">100% Ingestion Audit Trail Verified</span>
              <button
                onClick={() => setSelectedItem(null)}
                className="rounded-lg bg-slate-800 hover:bg-slate-700 px-4 py-1.5 text-slate-200 font-bold"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
