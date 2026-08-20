import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  History,
  Search,
  RotateCcw,
  Eye,
  Trash2,
  Globe,
  Clock,
  Zap,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const SearchHistoryTable: React.FC = () => {
  const {
    searchJobs,
    currentSearchJob,
    loadPreviousSearch,
    runSearch,
    clearSearchHistory,
    isSearching,
  } = useApp();

  return (
    <div className="space-y-3.5">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 backdrop-blur-md">
        <div>
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <History className="h-4 w-4 text-emerald-400" />
            SERP Dataset Query Log ({searchJobs.length} Searches Recorded)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit trail of historical keyword requests, snapshot hashes, and ingestion SLAs
          </p>
        </div>

        {searchJobs.length > 0 && (
          <button
            onClick={clearSearchHistory}
            className="flex items-center gap-1.5 rounded-lg border border-rose-500/20 bg-rose-500/10 px-2.5 py-1 text-xs font-medium text-rose-300 hover:bg-rose-500/20 hover:border-rose-500/40 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800/80 font-mono uppercase text-[10px] text-slate-400 tracking-wider">
              <tr>
                <th className="py-3 px-4">Keyword Query</th>
                <th className="py-3 px-4 text-center">Geo / Lang</th>
                <th className="py-3 px-4 text-center">Dataset Snapshot</th>
                <th className="py-3 px-4 text-center">Records</th>
                <th className="py-3 px-4 text-center">Latency</th>
                <th className="py-3 px-4 text-center">Timestamp</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {searchJobs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No historical SERP jobs found. Execute a search to populate history.
                  </td>
                </tr>
              ) : (
                searchJobs.map((job) => {
                  const isCurrent = currentSearchJob?.id === job.id;
                  return (
                    <tr
                      key={job.id}
                      className={cn(
                        'hover:bg-slate-800/40 transition-colors group',
                        isCurrent && 'bg-emerald-500/5'
                      )}
                    >
                      {/* Keyword */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-950 border border-slate-800 text-slate-400">
                            <Search className="h-3.5 w-3.5 text-emerald-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-slate-100">{job.keyword}</span>
                              {isCurrent && (
                                <span className="rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-1.5 py-0.2 text-[9px] font-mono font-medium">
                                  ACTIVE
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 mt-0.5">
                              <span className="rounded bg-slate-950 px-1.5 py-0.2 text-[9px] text-slate-400 font-mono border border-slate-800 uppercase">
                                {job.searchType}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Geo / Lang */}
                      <td className="py-3 px-4 text-center">
                        <span className="font-mono text-[11px] text-slate-300 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                          {job.country} / {job.language}
                        </span>
                      </td>

                      {/* Snapshot ID */}
                      <td className="py-3 px-4 text-center">
                        <span className="font-mono text-[11px] text-emerald-400">
                          {job.snapshotId || 's_live_stream'}
                        </span>
                      </td>

                      {/* Records Count */}
                      <td className="py-3 px-4 text-center font-mono font-semibold text-slate-200">
                        {job.resultsCount}
                      </td>

                      {/* Latency */}
                      <td className="py-3 px-4 text-center font-mono text-slate-400">
                        {job.executionTimeMs} ms
                      </td>

                      {/* Timestamp */}
                      <td className="py-3 px-4 text-center font-mono text-[11px] text-slate-400">
                        {new Date(job.createdAt).toLocaleTimeString()}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right space-x-1.5">
                        <button
                          onClick={() => loadPreviousSearch(job.id)}
                          className={cn(
                            'rounded-md px-2.5 py-1 text-xs font-medium border transition-colors inline-flex items-center gap-1',
                            isCurrent
                              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                              : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700 hover:text-white'
                          )}
                          title="View Snapshot Results"
                        >
                          <Eye className="h-3 w-3" />
                          <span>View</span>
                        </button>

                        <button
                          onClick={() => runSearch(job.keyword, job.country, job.language, job.resultLimit, job.searchType)}
                          disabled={isSearching}
                          className="rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-medium text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors inline-flex items-center gap-1 disabled:opacity-40"
                          title="Rerun Search"
                        >
                          <RotateCcw className="h-3 w-3" />
                          <span>Rerun</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
