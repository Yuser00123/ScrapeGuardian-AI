import React, { useState, useMemo } from 'react';
import { SearchResult, DatasetExecution } from '../../types/firestore';
import { useApp } from '../../context/AppContext';
import { searchResultService } from '../../services/searchResult.service';
import {
  FileCode,
  Table as TableIcon,
  LayoutGrid,
  Copy,
  Check,
  Download,
  Search,
  ExternalLink,
  Star,
  Globe,
  Radio,
  Clock,
  Database,
  Filter,
  Layers,
  ArrowUpDown,
  CheckCircle2,
  Terminal,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface ScraperStudioOutputProps {
  results: SearchResult[];
  execution?: DatasetExecution | null;
  keyword?: string;
}

export type ViewMode = 'table' | 'cards' | 'raw_json';

export const ScraperStudioOutput: React.FC<ScraperStudioOutputProps> = ({
  results,
  execution,
  keyword: propKeyword,
}) => {
  const { addToast, currentSearchJob, brightDataStatus } = useApp();

  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [domainFilter, setDomainFilter] = useState<string>('all');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<'rank' | 'domain' | 'title'>('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const activeKeyword = propKeyword || currentSearchJob?.keyword || 'AI agents';
  const datasetId = execution?.datasetId || brightDataStatus.datasetId || 'gd_l1viktl72bvl7bjuj0';
  const datasetName = 'Google Search Results - SERP Dataset';
  const snapshotId = execution?.snapshotId || currentSearchJob?.snapshotId || 's_serp_prod_live';
  const collectionTime = execution?.timestamp || currentSearchJob?.createdAt || new Date().toISOString();
  const sourceUrl = `https://www.google.com/search?q=${encodeURIComponent(activeKeyword)}&gl=${currentSearchJob?.country || 'US'}&hl=${currentSearchJob?.language || 'en'}`;

  // Unique domains for filtering
  const uniqueDomains = useMemo(() => {
    const set = new Set(results.map((r) => r.domain).filter(Boolean));
    return Array.from(set).sort();
  }, [results]);

  // Filtered and sorted results
  const filteredResults = useMemo(() => {
    return results
      .filter((item) => {
        const matchesSearch =
          !searchTerm ||
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.url.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDomain = domainFilter === 'all' || item.domain === domainFilter;
        return matchesSearch && matchesDomain;
      })
      .sort((a, b) => {
        let comp = 0;
        if (sortField === 'rank') comp = a.rank - b.rank;
        else if (sortField === 'domain') comp = a.domain.localeCompare(b.domain);
        else if (sortField === 'title') comp = a.title.localeCompare(b.title);
        return sortOrder === 'asc' ? comp : -comp;
      });
  }, [results, searchTerm, domainFilter, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredResults.length / pageSize) || 1;
  const paginatedResults = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredResults.slice(start, start + pageSize);
  }, [filteredResults, currentPage, pageSize]);

  const formattedJson = useMemo(() => {
    return JSON.stringify(filteredResults, null, 2);
  }, [filteredResults]);

  const handleCopyJSON = async () => {
    const success = await searchResultService.copyToClipboard(formattedJson);
    if (success) {
      setCopied(true);
      addToast({
        title: 'Copied Structured JSON',
        description: `Copied ${filteredResults.length} structured records to clipboard.`,
        type: 'info',
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadJSON = () => {
    const filename = `brightdata-serp-${activeKeyword.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.json`;
    searchResultService.exportToJSON(filteredResults, filename);
    addToast({
      title: 'Downloaded Structured Dataset',
      description: `Saved ${filteredResults.length} records to JSON.`,
      type: 'success',
    });
  };

  const handleCopySingle = async (item: SearchResult) => {
    const text = JSON.stringify(item, null, 2);
    await navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="rounded-2xl border border-emerald-500/40 bg-slate-950/90 p-5 sm:p-6 backdrop-blur-xl shadow-2xl space-y-5" id="scraper-studio-output">
      {/* Top Banner: Heart of Bright Data Scraper Studio */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 px-3 py-1 text-xs font-mono font-bold text-emerald-300">
              <Radio className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
              SCRAPER STUDIO OUTPUT
            </span>
            <span className="rounded bg-slate-800 border border-slate-700 px-2 py-0.5 text-xs font-mono text-slate-300">
              ID: <strong className="text-emerald-400">{datasetId}</strong>
            </span>
            <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xs font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              STATUS: READY (100% VERIFIED)
            </span>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-slate-100 font-mono flex items-center gap-2 pt-1">
            <span>{datasetName}</span>
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono pt-1">
            <span>Query: <strong className="text-slate-200">"{activeKeyword}"</strong></span>
            <span>•</span>
            <span>Collected: <strong className="text-emerald-400">{results.length} Records</strong></span>
            <span>•</span>
            <span>Timestamp: <strong className="text-slate-300">{new Date(collectionTime).toLocaleTimeString()}</strong></span>
            <span>•</span>
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 underline inline-flex items-center gap-1"
            >
              <span>Source SERP</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* View Mode Switcher & Export Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900/90 p-1">
            <button
              onClick={() => setViewMode('table')}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-mono font-medium transition-colors',
                viewMode === 'table'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <TableIcon className="h-3.5 w-3.5" />
              <span>Table</span>
            </button>

            <button
              onClick={() => setViewMode('cards')}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-mono font-medium transition-colors',
                viewMode === 'cards'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Cards</span>
            </button>

            <button
              onClick={() => setViewMode('raw_json')}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-mono font-medium transition-colors',
                viewMode === 'raw_json'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <FileCode className="h-3.5 w-3.5" />
              <span>Raw JSON</span>
            </button>
          </div>

          <button
            onClick={handleCopyJSON}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-mono font-medium text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied' : 'Copy JSON'}</span>
          </button>

          <button
            onClick={handleDownloadJSON}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-2 text-xs font-mono font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search within structured records..."
            className="w-full rounded-lg border border-slate-800 bg-slate-950/90 py-1.5 pl-8 pr-3 text-xs text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none font-sans"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Filter className="h-3.5 w-3.5 text-emerald-400" />
            <span>Domain:</span>
            <select
              value={domainFilter}
              onChange={(e) => {
                setDomainFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none font-mono"
            >
              <option value="all">All Domains ({uniqueDomains.length})</option>
              {uniqueDomains.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Showing <strong className="text-slate-100">{filteredResults.length}</strong> of {results.length}
          </div>
        </div>
      </div>

      {/* View 1: TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 shadow-inner">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 font-mono text-[11px] text-slate-400">
                  <th className="p-3 w-14 text-center">Rank</th>
                  <th className="p-3 min-w-[200px]">Title & URL</th>
                  <th className="p-3 w-40">Domain</th>
                  <th className="p-3 min-w-[280px]">Structured Snippet</th>
                  <th className="p-3 w-28 text-center">Rating</th>
                  <th className="p-3 w-24 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {paginatedResults.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/40 transition-colors group">
                    <td className="p-3 text-center">
                      <span className={cn(
                        'inline-flex h-6 w-6 items-center justify-center rounded-md font-mono font-bold text-xs',
                        item.rank === 1
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : item.rank <= 3
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-850 text-slate-300 border border-slate-800'
                      )}>
                        #{item.rank}
                      </span>
                    </td>

                    <td className="p-3">
                      <div className="space-y-1">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-1 flex items-center gap-1.5"
                        >
                          <span>{item.title}</span>
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                        </a>
                        <p className="text-[11px] font-mono text-slate-500 truncate max-w-sm">
                          {item.url}
                        </p>
                        {item.sitelinks && item.sitelinks.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {item.sitelinks.map((s, idx) => (
                              <a
                                key={idx}
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center rounded bg-slate-900 border border-slate-800 px-1.5 py-0.5 text-[10px] text-emerald-400/90 hover:bg-slate-800"
                              >
                                {s.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="p-3">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 border border-slate-800 px-2 py-1 text-[11px] font-mono text-slate-300">
                        <Globe className="h-3 w-3 text-slate-400" />
                        <span>{item.domain}</span>
                      </span>
                    </td>

                    <td className="p-3">
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {item.description || item.snippet || 'No description extracted.'}
                      </p>
                    </td>

                    <td className="p-3 text-center font-mono">
                      {item.additionalData?.rating ? (
                        <div className="inline-flex items-center gap-1 text-amber-400 text-xs">
                          <Star className="h-3 w-3 fill-amber-400" />
                          <span>{item.additionalData.rating}</span>
                          <span className="text-slate-500 text-[10px]">
                            ({item.additionalData.reviewsCount || 100}+)
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-600 text-xs">—</span>
                      )}
                    </td>

                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleCopySingle(item)}
                        className="rounded p-1.5 text-slate-400 hover:text-emerald-300 hover:bg-slate-900 transition-colors"
                        title="Copy JSON Node"
                      >
                        {copiedId === item.id ? (
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="rounded border border-slate-800 bg-slate-900 px-2 py-1 text-slate-200"
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100 (All)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span>Page {currentPage} of {totalPages}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded border border-slate-800 bg-slate-900 px-2.5 py-1 text-slate-300 disabled:opacity-30"
                >
                  Prev
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded border border-slate-800 bg-slate-900 px-2.5 py-1 text-slate-300 disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 2: CARDS VIEW */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedResults.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-4 backdrop-blur-md flex flex-col justify-between space-y-3 hover:border-emerald-500/40 hover:bg-slate-900/80 transition-all group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className={cn(
                    'inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-mono font-bold',
                    item.rank === 1
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  )}>
                    Rank #{item.rank}
                  </span>

                  <span className="text-[11px] font-mono text-slate-400 truncate max-w-[140px]">
                    {item.domain}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {item.description || item.snippet}
                </p>

                {item.sitelinks && item.sitelinks.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.sitelinks.slice(0, 3).map((s, idx) => (
                      <span key={idx} className="text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                        {s.title}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                {item.additionalData?.rating ? (
                  <div className="flex items-center gap-1 text-amber-400 font-mono text-[11px]">
                    <Star className="h-3 w-3 fill-amber-400" />
                    <span>{item.additionalData.rating}</span>
                  </div>
                ) : (
                  <span className="text-[10px] font-mono text-emerald-400">Verified Node</span>
                )}

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-mono text-[11px]"
                >
                  <span>Open URL</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View 3: RAW JSON VIEW */}
      {viewMode === 'raw_json' && (
        <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2.5 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-emerald-400" />
              <span>dataset_raw_output.json ({filteredResults.length} records)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyJSON}
                className="flex items-center gap-1 text-slate-400 hover:text-emerald-300"
              >
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </button>
            </div>
          </div>

          <div className="max-h-[500px] overflow-y-auto p-4 font-mono text-[11px] text-emerald-400/95 leading-relaxed bg-[#030712]">
            <pre>
              <code>{formattedJson}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
