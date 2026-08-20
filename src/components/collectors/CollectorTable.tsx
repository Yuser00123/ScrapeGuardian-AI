import React, { useState, useMemo } from 'react';
import { Collector, CollectorStatus } from '../../types/firestore';
import { StatusBadge } from '../common/StatusBadge';
import { EmptyState } from '../common/EmptyState';
import { formatTimeAgo, formatNumber, cn } from '../../lib/utils';
import {
  Play,
  Pause,
  Eye,
  Trash2,
  Search,
  Filter,
  ArrowUpDown,
  CheckSquare,
  Square,
  Globe,
  Database,
  RefreshCw,
  Plus,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CollectorTableProps {
  onSelectCollector: (collector: Collector) => void;
  onOpenNewModal: () => void;
}

export const CollectorTable: React.FC<CollectorTableProps> = ({
  onSelectCollector,
  onOpenNewModal,
}) => {
  const {
    collectors,
    triggerCollectorRun,
    toggleCollectorStatus,
    deleteCollector,
    addToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [proxyFilter, setProxyFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'successRate' | 'records' | 'lastRun' | 'name'>('successRate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filter & sort
  const filteredCollectors = useMemo(() => {
    return collectors
      .filter((col) => {
        const matchesSearch =
          col.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          col.targetDomain.toLowerCase().includes(searchQuery.toLowerCase()) ||
          col.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesStatus = statusFilter === 'all' || col.status === statusFilter;
        const matchesProxy = proxyFilter === 'all' || col.proxyType === proxyFilter;

        return matchesSearch && matchesStatus && matchesProxy;
      })
      .sort((a, b) => {
        let comp = 0;
        if (sortBy === 'successRate') comp = a.successRate - b.successRate;
        else if (sortBy === 'records') comp = a.totalRecordsHarvested - b.totalRecordsHarvested;
        else if (sortBy === 'lastRun') comp = new Date(a.lastRunAt).getTime() - new Date(b.lastRunAt).getTime();
        else if (sortBy === 'name') comp = a.name.localeCompare(b.name);

        return sortOrder === 'asc' ? comp : -comp;
      });
  }, [collectors, searchQuery, statusFilter, proxyFilter, sortBy, sortOrder]);

  const handleSelectAll = () => {
    if (selectedIds.length === filteredCollectors.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCollectors.map((c) => c.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkRun = () => {
    selectedIds.forEach((id) => triggerCollectorRun(id));
    addToast({
      title: 'Batch Execution Dispatched',
      description: `Triggered ${selectedIds.length} collectors across Bright Data infrastructure.`,
      type: 'info',
    });
    setSelectedIds([]);
  };

  const handleBulkPause = () => {
    selectedIds.forEach((id) => toggleCollectorStatus(id));
    addToast({
      title: 'Batch Status Changed',
      description: `Toggled operational status for ${selectedIds.length} collectors.`,
      type: 'info',
    });
    setSelectedIds([]);
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-xl backdrop-blur-md">
        {/* Left: Search input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, target domain, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none font-mono"
          />
        </div>

        {/* Right: Filters & Sort */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-950/80 px-2.5 py-1 text-xs font-mono text-slate-300">
            <Filter className="h-3 w-3 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="healthy">Healthy</option>
              <option value="healing">Healing Active</option>
              <option value="degraded">Degraded</option>
              <option value="broken">Broken</option>
              <option value="paused">Paused</option>
            </select>
          </div>

          {/* Proxy Filter */}
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-950/80 px-2.5 py-1 text-xs font-mono text-slate-300">
            <Globe className="h-3 w-3 text-slate-400" />
            <select
              value={proxyFilter}
              onChange={(e) => setProxyFilter(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all">All Proxy Zones</option>
              <option value="web_unlocker">Web Unlocker</option>
              <option value="residential">Residential</option>
              <option value="mobile">Mobile</option>
              <option value="datacenter">Datacenter</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-950/80 px-2.5 py-1 text-xs font-mono text-slate-300">
            <ArrowUpDown className="h-3 w-3 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="successRate">Sort: Success %</option>
              <option value="records">Sort: Records</option>
              <option value="lastRun">Sort: Last Run</option>
              <option value="name">Sort: Name</option>
            </select>
            <button
              onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
              className="text-[10px] text-emerald-400 uppercase font-bold"
            >
              {sortOrder}
            </button>
          </div>

          <button
            onClick={onOpenNewModal}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-mono font-semibold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Collector</span>
          </button>
        </div>
      </div>

      {/* Bulk Actions Bar (if any selected) */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 backdrop-blur-md animate-in fade-in duration-150">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
            <span className="font-bold">{selectedIds.length}</span>
            <span>collectors selected</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkRun}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1 text-xs font-mono font-semibold text-slate-950 hover:bg-emerald-400 transition-colors"
            >
              <Play className="h-3 w-3" />
              <span>Batch Run</span>
            </button>

            <button
              onClick={handleBulkPause}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-mono text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <Pause className="h-3 w-3" />
              <span>Toggle Status</span>
            </button>

            <button
              onClick={() => setSelectedIds([])}
              className="text-xs font-mono text-slate-400 hover:text-white px-2 py-1"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Collectors Table */}
      {filteredCollectors.length === 0 ? (
        <EmptyState
          title="No Collectors Found"
          description="No scrapers match the current search filters. Provision a new Bright Data collector to get started."
          icon={Database}
          actionLabel="Provision Collector"
          onAction={onOpenNewModal}
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/60 shadow-xl backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-slate-800 bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="p-3.5 w-8">
                    <button
                      onClick={handleSelectAll}
                      className="text-slate-400 hover:text-slate-200"
                    >
                      {selectedIds.length === filteredCollectors.length ? (
                        <CheckSquare className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="p-3.5 font-semibold">Name & Target Domain</th>
                  <th className="p-3.5 font-semibold">Status</th>
                  <th className="p-3.5 font-semibold">Proxy Mesh</th>
                  <th className="p-3.5 font-semibold">Last Run</th>
                  <th className="p-3.5 font-semibold">Success Rate</th>
                  <th className="p-3.5 font-semibold">Records</th>
                  <th className="p-3.5 text-right font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredCollectors.map((col) => {
                  const isSelected = selectedIds.includes(col.id);

                  return (
                    <tr
                      key={col.id}
                      className={cn(
                        'transition-colors hover:bg-slate-800/50',
                        isSelected ? 'bg-emerald-500/5' : ''
                      )}
                    >
                      {/* Checkbox */}
                      <td className="p-3.5">
                        <button
                          onClick={() => handleToggleSelect(col.id)}
                          className="text-slate-400 hover:text-slate-200"
                        >
                          {isSelected ? (
                            <CheckSquare className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <Square className="h-4 w-4" />
                          )}
                        </button>
                      </td>

                      {/* Name & Target */}
                      <td className="p-3.5">
                        <div
                          onClick={() => onSelectCollector(col)}
                          className="cursor-pointer group"
                        >
                          <p className="font-semibold text-slate-100 group-hover:text-emerald-400 transition-colors">
                            {col.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] text-slate-400 font-sans">
                              {col.targetDomain}
                            </span>
                            <span className="text-slate-600">•</span>
                            <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[9px] text-slate-400 border border-slate-700 uppercase">
                              {col.category}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-3.5">
                        <StatusBadge status={col.status} size="sm" />
                      </td>

                      {/* Proxy Mesh */}
                      <td className="p-3.5">
                        <span className="rounded bg-slate-800/80 border border-slate-700 px-2 py-0.5 text-[10px] text-slate-300 uppercase">
                          {col.proxyType.replace('_', ' ')}
                        </span>
                      </td>

                      {/* Last Run */}
                      <td className="p-3.5">
                        <p className="text-slate-200">
                          {formatTimeAgo(col.lastRunAt)}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          Next: {formatTimeAgo(col.schedule.nextScheduledRun)}
                        </p>
                      </td>

                      {/* Success Rate */}
                      <td className="p-3.5">
                        <div className="w-24">
                          <div className="flex items-center justify-between text-[11px] mb-1">
                            <span
                              className={cn(
                                'font-bold',
                                col.successRate >= 98
                                  ? 'text-emerald-400'
                                  : col.successRate >= 90
                                  ? 'text-amber-400'
                                  : 'text-rose-400'
                              )}
                            >
                              {col.successRate}%
                            </span>
                            <span className="text-slate-500 text-[10px]">
                              {col.failedRuns} fail
                            </span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className={cn(
                                'h-full rounded-full',
                                col.successRate >= 98
                                  ? 'bg-emerald-500'
                                  : col.successRate >= 90
                                  ? 'bg-amber-500'
                                  : 'bg-rose-500'
                              )}
                              style={{ width: `${col.successRate}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Records Harvested */}
                      <td className="p-3.5 font-bold text-slate-200">
                        {formatNumber(col.totalRecordsHarvested)}
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => triggerCollectorRun(col.id)}
                            title="Run Immediately via Bright Data"
                            className="rounded p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                          >
                            <Play className="h-3.5 w-3.5" />
                          </button>

                          <button
                            onClick={() => onSelectCollector(col)}
                            title="Inspect Schema & AST"
                            className="rounded p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>

                          <button
                            onClick={() => toggleCollectorStatus(col.id)}
                            title={col.status === 'paused' ? 'Resume' : 'Pause'}
                            className="rounded p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                          >
                            <Pause className="h-3.5 w-3.5" />
                          </button>

                          <button
                            onClick={() => deleteCollector(col.id)}
                            title="Delete Collector"
                            className="rounded p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
