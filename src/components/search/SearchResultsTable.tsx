import React, { useState } from 'react';
import { SearchResult } from '../../types/firestore';
import { searchResultService } from '../../services/searchResult.service';
import { useApp } from '../../context/AppContext';
import {
  Search,
  ExternalLink,
  Copy,
  Check,
  Download,
  Filter,
  ArrowUpDown,
  Star,
  Globe,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  FileJson,
  FileSpreadsheet,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SearchResultsTableProps {
  results: SearchResult[];
  keyword: string;
}

export const SearchResultsTable: React.FC<SearchResultsTableProps> = ({ results, keyword }) => {
  const { addToast } = useApp();

  const [filterQuery, setFilterQuery] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rank' | 'domain' | 'title'>('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract unique domains for filter dropdown
  const uniqueDomains = Array.from(new Set(results.map((r) => r.domain))).sort();

  // Apply filters and sorting
  const filtered = searchResultService.filterResults(results, filterQuery, selectedDomain);
  const sorted = searchResultService.sortResults(filtered, sortBy, sortOrder);

  // Pagination slice
  const totalPages = Math.ceil(sorted.length / pageSize) || 1;
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleCopy = async (text: string, id: string, label = 'URL') => {
    const success = await searchResultService.copyToClipboard(text);
    if (success) {
      setCopiedId(id);
      addToast({
        title: 'Copied to clipboard',
        description: `${label} copied successfully.`,
        type: 'info',
      });
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleExportCSV = () => {
    const filename = `serp-${keyword.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.csv`;
    searchResultService.exportToCSV(results, filename);
    addToast({
      title: 'Export Complete',
      description: `Downloaded ${results.length} SERP results as CSV.`,
      type: 'success',
    });
  };

  const handleExportJSON = () => {
    const filename = `serp-${keyword.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.json`;
    searchResultService.exportToJSON(results, filename);
    addToast({
      title: 'Export Complete',
      description: `Downloaded ${results.length} SERP records as JSON.`,
      type: 'success',
    });
  };

  const getRankBadgeClass = (rank: number) => {
    if (rank === 1) return 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold';
    if (rank === 2) return 'bg-slate-300/20 text-slate-200 border-slate-400/40 font-semibold';
    if (rank === 3) return 'bg-amber-700/20 text-amber-400 border-amber-600/40 font-semibold';
    return 'bg-slate-800 text-slate-400 border-slate-700';
  };

  return (
    <div className="space-y-3.5">
      {/* Controls Bar: Filter, Domain select, Sorting, Export */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 backdrop-blur-md">
        {/* Search within results */}
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => {
                setFilterQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Filter results by keyword, domain or text..."
              className="w-full rounded-lg border border-slate-800 bg-slate-950/80 py-1.5 pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-500/60 focus:outline-none"
            />
          </div>

          {/* Domain Filter */}
          <select
            value={selectedDomain}
            onChange={(e) => {
              setSelectedDomain(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Filter by Domain"
            className="rounded-lg border border-slate-800 bg-slate-950/80 px-2.5 py-1.5 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none"
          >
            <option value="all">All Domains ({uniqueDomains.length})</option>
            {uniqueDomains.map((dom) => (
              <option key={dom} value={dom}>
                {dom}
              </option>
            ))}
          </select>
        </div>

        {/* Sort & Export Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <ArrowUpDown className="h-3 w-3" />
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort Results By"
              className="rounded border border-slate-800 bg-slate-950 px-2 py-1 text-xs text-slate-200 focus:outline-none"
            >
              <option value="rank">Rank / Position</option>
              <option value="domain">Domain Name</option>
              <option value="title">Title</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="rounded border border-slate-800 bg-slate-950 px-2 py-1 text-xs text-slate-300 hover:border-slate-700 font-mono"
            >
              {sortOrder.toUpperCase()}
            </button>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          {/* Export Buttons */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-medium text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
            title="Download CSV"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-400" />
            <span>CSV</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-medium text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
            title="Download JSON"
          >
            <FileJson className="h-3.5 w-3.5 text-teal-400" />
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* Results Table Container */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800/80 font-mono uppercase text-[10px] text-slate-400 tracking-wider">
              <tr>
                <th className="py-3 px-4 w-16 text-center">Rank</th>
                <th className="py-3 px-4 min-w-[320px]">Title, Snippet & Landing Page</th>
                <th className="py-3 px-4 w-40">Domain & Signals</th>
                <th className="py-3 px-4 w-28 text-center">Geo / Lang</th>
                <th className="py-3 px-4 w-24 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No SERP results match the current filters.
                  </td>
                </tr>
              ) : (
                paginated.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Rank Badge */}
                    <td className="py-3.5 px-4 text-center align-top">
                      <span
                        className={cn(
                          'inline-flex items-center justify-center h-6 w-6 rounded-md border text-xs font-mono',
                          getRankBadgeClass(item.position)
                        )}
                      >
                        #{item.position}
                      </span>
                    </td>

                    {/* Title, Snippet, Sitelinks */}
                    <td className="py-3.5 px-4 align-top space-y-1.5">
                      <div>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-slate-100 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 group/link text-sm"
                        >
                          <span>{item.title}</span>
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity text-slate-400" />
                        </a>
                      </div>

                      {/* Displayed URL breadcrumb */}
                      <p className="text-[11px] font-mono text-emerald-400/90 truncate max-w-xl">
                        {item.additionalData?.displayedUrl || item.url}
                      </p>

                      {/* Snippet / Description */}
                      <p className="text-slate-300 text-xs leading-relaxed max-w-2xl line-clamp-2">
                        {item.description}
                      </p>

                      {/* Expandable Sitelinks */}
                      {item.sitelinks && item.sitelinks.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-[10px] text-slate-500 font-mono">Sitelinks:</span>
                          {item.sitelinks.map((sl, idx) => (
                            <a
                              key={idx}
                              href={sl.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded bg-slate-950/80 border border-slate-800 px-2 py-0.5 text-[10px] text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
                            >
                              <span>{sl.title}</span>
                              <ExternalLink className="h-2.5 w-2.5 text-slate-500" />
                            </a>
                          ))}
                        </div>
                      )}
                    </td>

                    {/* Domain & Signals */}
                    <td className="py-3.5 px-4 align-top space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Globe className="h-3.5 w-3.5 text-slate-400" />
                        <span className="font-mono text-xs font-medium text-slate-200">
                          {item.domain}
                        </span>
                      </div>

                      {/* Rating & Reviews */}
                      {item.additionalData?.rating && (
                        <div className="flex items-center gap-1 text-[11px] text-amber-400">
                          <Star className="h-3 w-3 fill-amber-400" />
                          <span className="font-semibold">{item.additionalData.rating}</span>
                          {item.additionalData.reviewsCount && (
                            <span className="text-[10px] text-slate-400">
                              ({item.additionalData.reviewsCount.toLocaleString()})
                            </span>
                          )}
                        </div>
                      )}

                      {item.additionalData?.isAd && (
                        <span className="inline-block rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 text-[9px] font-semibold">
                          SPONSORED
                        </span>
                      )}
                    </td>

                    {/* Geo & Lang */}
                    <td className="py-3.5 px-4 align-top text-center">
                      <div className="inline-flex items-center gap-1 rounded-md bg-slate-950/80 border border-slate-800 px-2 py-1 font-mono text-[11px] text-slate-300">
                        <span>{item.country}</span>
                        <span className="text-slate-500">/</span>
                        <span className="text-slate-400">{item.language}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 align-top text-right space-x-1">
                      <button
                        onClick={() => handleCopy(item.url, `url_${item.id}`, 'URL')}
                        className="rounded p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                        title="Copy Landing URL"
                      >
                        {copiedId === `url_${item.id}` ? (
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                        title="Open in new tab"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer: Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-800/80 bg-slate-950/80 px-4 py-2.5 text-xs text-slate-400">
          <div>
            Showing{' '}
            <span className="font-mono text-slate-200 font-medium">
              {filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
            </span>{' '}
            to{' '}
            <span className="font-mono text-slate-200 font-medium">
              {Math.min(currentPage * pageSize, filtered.length)}
            </span>{' '}
            of <span className="font-mono text-slate-200 font-medium">{filtered.length}</span> results
          </div>

          <div className="flex items-center gap-2">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              aria-label="Results Per Page"
              className="rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-slate-300 focus:outline-none"
            >
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page (All)</option>
              <option value={200}>200 per page</option>
            </select>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous Page"
                className="rounded border border-slate-800 bg-slate-900 p-1 text-slate-300 hover:bg-slate-800 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <span className="font-mono px-2 text-slate-300">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
                className="rounded border border-slate-800 bg-slate-900 p-1 text-slate-300 hover:bg-slate-800 disabled:opacity-40 transition-colors"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
