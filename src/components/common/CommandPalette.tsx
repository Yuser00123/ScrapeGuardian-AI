import React, { useState, useEffect } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import {
  Search,
  LayoutDashboard,
  Database,
  Layers,
  Sparkles,
  FlaskConical,
  Settings,
  ArrowRight,
  Zap,
  Globe,
  RefreshCw,
  X,
} from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    setCurrentView,
    collectors,
    triggerCollectorRun,
    setDemoStage,
    addToast,
  } = useApp();

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const navigationItems: { title: string; view: AppView; icon: React.ComponentType<{ className?: string }>; description: string }[] = [
    { title: 'Dashboard', view: 'dashboard', icon: LayoutDashboard, description: 'Overview, live telemetry & metrics' },
    { title: 'Search Intelligence', view: 'search-intelligence', icon: Search, description: 'Bright Data Google SERP Dataset & domain ranking intelligence' },
    { title: 'Collectors', view: 'collectors', icon: Database, description: 'Bright Data scraping pipelines' },
    { title: 'Intelligence Center', view: 'intelligence', icon: Layers, description: 'AI-detected web diffs and insights' },
    { title: 'Healing Center', view: 'healing', icon: Sparkles, description: 'Autonomous AST & selector repair pipeline' },
    { title: 'Demo Lab', view: 'demolab', icon: FlaskConical, description: 'Interactive Hackathon control room simulator' },
    { title: 'Landing Page', view: 'landing', icon: Globe, description: 'Product overview & architecture specs' },
    { title: 'Settings', view: 'settings', icon: Settings, description: 'Bright Data, AI models & webhook configs' },
  ];

  const filteredNavigation = navigationItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCollectors = collectors.filter(
    (col) =>
      col.name.toLowerCase().includes(query.toLowerCase()) ||
      col.targetDomain.toLowerCase().includes(query.toLowerCase()) ||
      col.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectView = (view: AppView) => {
    setCurrentView(view);
    setIsCommandPaletteOpen(false);
  };

  const handleRunCollector = (collectorId: string, name: string) => {
    triggerCollectorRun(collectorId);
    setIsCommandPaletteOpen(false);
  };

  const handleTriggerDemoStep = (stage: 'healthy' | 'changed' | 'failure' | 'healing' | 'validated' | 'recovered') => {
    setDemoStage(stage);
    setCurrentView('demolab');
    setIsCommandPaletteOpen(false);
    addToast({
      title: 'Demo Lab Triggered',
      description: `Jumped to simulation stage: ${stage.toUpperCase()}`,
      type: 'info',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 pt-20 sm:pt-28 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input bar */}
        <div className="relative flex items-center border-b border-slate-800 px-4 py-3.5 bg-slate-950/60">
          <Search className="h-5 w-5 text-emerald-400 shrink-0" />
          <input
            type="text"
            placeholder="Type a command, collector name, or jump to view..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="ml-3 flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none font-mono"
          />
          <span className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400">
            ESC to close
          </span>
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="ml-2 rounded p-1 text-slate-500 hover:text-slate-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Quick Actions */}
          <div>
            <p className="px-2 pb-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
              Quick Simulation Actions
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
              <button
                onClick={() => handleTriggerDemoStep('changed')}
                className="flex items-center gap-2.5 rounded-lg border border-slate-800/80 bg-slate-950/40 p-2 text-left text-xs text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors"
              >
                <Zap className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span className="font-mono truncate">Simulate Target DOM Redesign</span>
              </button>
              <button
                onClick={() => handleTriggerDemoStep('healing')}
                className="flex items-center gap-2.5 rounded-lg border border-slate-800/80 bg-slate-950/40 p-2 text-left text-xs text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                <span className="font-mono truncate">Launch Gemini AST Self-Heal</span>
              </button>
            </div>
          </div>

          {/* Navigation Views */}
          <div>
            <p className="px-2 pb-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
              Pages & Navigation
            </p>
            <div className="space-y-1">
              {filteredNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.view}
                    onClick={() => handleSelectView(item.view)}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-300 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded p-1 bg-slate-800 border border-slate-700 text-slate-400 group-hover:text-emerald-400 group-hover:border-emerald-500/40 transition-colors">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <p className="font-medium font-mono text-slate-200 group-hover:text-emerald-300">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 text-emerald-400 transition-opacity" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Collectors */}
          {filteredCollectors.length > 0 && (
            <div>
              <p className="px-2 pb-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                Collectors ({filteredCollectors.length})
              </p>
              <div className="space-y-1">
                {filteredCollectors.slice(0, 4).map((col) => (
                  <div
                    key={col.id}
                    onClick={() => handleRunCollector(col.id, col.name)}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded p-1 bg-slate-800 border border-slate-700 text-emerald-400">
                        <Database className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <p className="font-medium font-mono text-slate-200">{col.name}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{col.targetDomain} • {col.proxyType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-400 rounded bg-slate-800 px-2 py-0.5 border border-slate-700">
                        Run Now
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/80 px-4 py-2 text-[11px] text-slate-500 font-mono">
          <span>ScrapeGuardian AI • Scrape-Verse Hackathon</span>
          <span>Powered by Bright Data Scraper Studio</span>
        </div>
      </div>
    </div>
  );
};
