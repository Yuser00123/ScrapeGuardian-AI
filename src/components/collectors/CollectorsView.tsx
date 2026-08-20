import React, { useState } from 'react';
import { Collector } from '../../types/firestore';
import { CollectorTable } from './CollectorTable';
import { CollectorDetailModal } from './CollectorDetailModal';
import { NewCollectorModal } from './NewCollectorModal';
import { Database, Plus, Sparkles, Globe, Cpu } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CollectorsView: React.FC = () => {
  const { collectors } = useApp();
  const [selectedCollector, setSelectedCollector] = useState<Collector | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const healthyCount = collectors.filter((c) => c.status === 'healthy').length;
  const healingCount = collectors.filter((c) => c.status === 'healing').length;
  const brokenCount = collectors.filter((c) => c.status === 'broken').length;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold tracking-tight text-slate-100 font-mono">
              Bright Data Scraper Studio Mesh
            </h2>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-mono font-semibold text-emerald-400 border border-emerald-500/20">
              {collectors.length} Pipelines
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Orchestrate continuous web intelligence extraction with automated anti-bot bypass
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-4 text-xs font-mono border-r border-slate-800 pr-4">
            <span className="text-slate-400">
              <strong className="text-emerald-400">{healthyCount}</strong> Healthy
            </span>
            {healingCount > 0 && (
              <span className="text-blue-400 animate-pulse">
                <strong>{healingCount}</strong> Healing
              </span>
            )}
            {brokenCount > 0 && (
              <span className="text-rose-400">
                <strong>{brokenCount}</strong> Broken
              </span>
            )}
          </div>

          <button
            onClick={() => setIsNewModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-mono font-semibold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Provision Collector</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <CollectorTable
        onSelectCollector={(col) => setSelectedCollector(col)}
        onOpenNewModal={() => setIsNewModalOpen(true)}
      />

      {/* Detail Modal */}
      {selectedCollector && (
        <CollectorDetailModal
          collector={selectedCollector}
          onClose={() => setSelectedCollector(null)}
        />
      )}

      {/* New Collector Modal */}
      {isNewModalOpen && (
        <NewCollectorModal onClose={() => setIsNewModalOpen(false)} />
      )}
    </div>
  );
};
