import React from 'react';
import { SearchPanel } from './SearchPanel';
import { BrightDataStatusCard } from './BrightDataStatusCard';
import { ResultsViewer } from './ResultsViewer';
import {
  Search,
  Sparkles,
  Database,
  Radio,
  Globe,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const SearchIntelligenceView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Title & Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Search className="h-3.5 w-3.5" />
            </span>
            <h1 className="text-xl font-bold tracking-tight text-slate-100 font-mono flex items-center gap-2">
              <span>Search Intelligence</span>
              <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-medium text-emerald-400 font-sans">
                Bright Data Engine
              </span>
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Extract, normalize, and monitor real-time Google SERP rankings and domain visibility powered by Bright Data Dataset <code className="text-emerald-400 font-mono">gd_l1viktl72bvl7bjuj0</code>
          </p>
        </div>

        {/* Global Dataset Status Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 backdrop-blur-md">
            <Radio className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            <div className="text-left">
              <p className="text-[10px] text-slate-400 leading-none">Ingestion Network</p>
              <p className="text-xs font-semibold text-slate-200 leading-tight">Bright Data SERP Mesh</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Dispatcher & Status Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 xl:col-span-8">
          <SearchPanel />
        </div>
        <div className="lg:col-span-5 xl:col-span-4">
          <BrightDataStatusCard />
        </div>
      </div>

      {/* Main Results Viewer */}
      <div className="pt-2">
        <ResultsViewer />
      </div>
    </div>
  );
};
