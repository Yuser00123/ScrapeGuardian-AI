import React from 'react';
import { useApp, AppView } from '../../context/AppContext';
import {
  LayoutDashboard,
  Search,
  Database,
  Layers,
  Sparkles,
  FlaskConical,
  Settings,
  BookOpen,
  Github,
  HelpCircle,
  ShieldCheck,
  Globe,
  Radio,
  ChevronRight,
  History,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, healingJobs, collectors, searchResults } = useApp();

  const activeHealingCount = healingJobs.filter(
    (j) => j.status === 'running' || j.currentStage !== 'completed'
  ).length;

  const brokenCollectorCount = collectors.filter((c) => c.status === 'broken').length;

  const navigationItems = [
    {
      id: 'dashboard' as AppView,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: undefined,
    },
    {
      id: 'search-intelligence' as AppView,
      label: 'Search Intelligence',
      icon: Search,
      badge: 'Bright Data',
      badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 font-mono',
    },
    {
      id: 'collectors' as AppView,
      label: 'Collectors',
      icon: Database,
      badge: brokenCollectorCount > 0 ? `${brokenCollectorCount} broken` : `${collectors.length}`,
      badgeColor: brokenCollectorCount > 0 ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-slate-800 text-slate-400',
    },
    {
      id: 'intelligence' as AppView,
      label: 'Intelligence Center',
      icon: Layers,
      badge: '5 New',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    },
    {
      id: 'healing' as AppView,
      label: 'Healing Center',
      icon: Sparkles,
      badge: activeHealingCount > 0 ? `${activeHealingCount} Active` : undefined,
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30 animate-pulse',
    },
    {
      id: 'history' as AppView,
      label: 'Collection Lineage',
      icon: History,
      badge: 'Provenance',
      badgeColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30 font-mono',
    },
    {
      id: 'demolab' as AppView,
      label: 'Demo Lab',
      icon: FlaskConical,
      badge: 'LIVE',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    },
    {
      id: 'settings' as AppView,
      label: 'Settings',
      icon: Settings,
      badge: undefined,
    },
  ];

  return (
    <aside className="hidden md:flex shrink-0 w-64 h-full flex-col border-r border-slate-800/80 bg-slate-950/95 backdrop-blur-xl z-20 transition-all duration-300">
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-slate-800/80 px-4">
        <div
          onClick={() => setCurrentView('landing')}
          className="flex cursor-pointer items-center gap-2.5 group"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-sm group-hover:border-emerald-400 transition-colors">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-slate-100 font-mono flex items-center gap-1.5">
              <span>ScrapeGuardian</span>
              <span className="rounded bg-emerald-500/20 px-1 py-0.2 text-[9px] text-emerald-400 font-semibold uppercase">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Bright Data Mesh
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentView('landing')}
          className="rounded p-1 text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          title="Product Landing Page"
        >
          <Globe className="h-4 w-4" />
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <p className="px-3 pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-widest font-mono">
          PLATFORM
        </p>

        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={cn(
                'group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-mono transition-all duration-150',
                isActive
                  ? 'bg-slate-800/90 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-200 border border-transparent'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    'h-4 w-4 transition-colors',
                    isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'
                  )}
                />
                <span className="font-medium text-[13px]">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={cn(
                    'rounded border px-1.5 py-0.5 text-[10px] font-mono tracking-tight font-medium',
                    item.badgeColor
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Hackathon Badge Banner */}
        <div className="pt-6 px-1">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold">
              <Radio className="h-3.5 w-3.5 animate-pulse" />
              <span>Scrape-Verse 2026</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
              Hackathon Edition with Bright Data Scraper Studio & Gemini Self-Healing Core.
            </p>
            <button
              onClick={() => setCurrentView('demolab')}
              className="mt-2.5 flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono hover:text-emerald-300 transition-colors font-medium"
            >
              <span>Launch Demo Lab</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-800/80 p-3 space-y-1 bg-slate-950">
        <p className="px-3 pb-1 text-[10px] font-semibold text-slate-400 uppercase tracking-widest font-mono">
          RESOURCES
        </p>

        <a
          href="#docs"
          onClick={(e) => {
            e.preventDefault();
            setCurrentView('landing');
          }}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-colors font-mono"
        >
          <BookOpen className="h-3.5 w-3.5 text-slate-400" />
          <span>Documentation</span>
        </a>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-colors font-mono"
        >
          <Github className="h-3.5 w-3.5 text-slate-400" />
          <span>GitHub Repo</span>
        </a>

        <a
          href="#support"
          onClick={(e) => {
            e.preventDefault();
            setCurrentView('settings');
          }}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-colors font-mono"
        >
          <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
          <span>Support & Status</span>
        </a>

        {/* User Card */}
        <div className="mt-2 flex items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-900/60 p-2">
          <div className="h-7 w-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xs font-mono font-bold text-emerald-400">
            AV
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-200 truncate font-mono">Alex Vance</p>
            <p className="text-[10px] text-slate-400 truncate">Staff Architect</p>
          </div>
          <span className="h-2 w-2 rounded-full bg-emerald-400" title="Online" />
        </div>
      </div>
    </aside>
  );
};
