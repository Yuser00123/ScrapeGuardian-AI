import React, { useState } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import {
  Search,
  Command,
  ShieldCheck,
  Zap,
  Menu,
  X,
  Radio,
  ChevronDown,
  Sparkles,
  Database,
  Layers,
  FlaskConical,
  Settings,
  LayoutDashboard,
  Award,
  FileCheck,
} from 'lucide-react';
import { NotificationDropdown } from '../common/NotificationDropdown';
import { GuidedJudgeDemoModal } from '../demo/GuidedJudgeDemoModal';
import { SubmissionReadinessModal } from '../common/SubmissionReadinessModal';
import { cn } from '../../lib/utils';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    setIsCommandPaletteOpen,
    healingJobs,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isJudgeDemoOpen, setIsJudgeDemoOpen] = useState(false);
  const [isSubmissionCheckOpen, setIsSubmissionCheckOpen] = useState(false);

  const activeHealingCount = healingJobs.filter((j) => j.status === 'running').length;

  const mobileNavItems: { id: AppView; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'search-intelligence', label: 'Search Intelligence', icon: Search },
    { id: 'collectors', label: 'Collectors', icon: Database },
    { id: 'intelligence', label: 'Intelligence', icon: Layers },
    { id: 'healing', label: 'Healing Center', icon: Sparkles },
    { id: 'demolab', label: 'Demo Lab', icon: FlaskConical },
    { id: 'inspector', label: 'Data Inspector', icon: ShieldCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-4 md:px-8 backdrop-blur-xl">
        {/* Left side: Mobile Toggle & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Mobile brand */}
          <div
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2 cursor-pointer md:hidden"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <span className="font-mono text-xs font-bold text-slate-100">ScrapeGuardian</span>
          </div>

          {/* Desktop breadcrumb */}
          <div className="hidden md:flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Workspace</span>
            <span className="text-slate-600">/</span>
            <div className="flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900/60 px-2.5 py-1 text-slate-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="font-medium">Acme Data Mesh</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </div>
            <span className="text-slate-600">/</span>
            <span className="font-medium text-emerald-400 uppercase tracking-wider text-[11px]">
              {currentView}
            </span>
          </div>
        </div>

        {/* Center Search / Command Trigger */}
        <div className="flex-1 max-w-md mx-4 hidden sm:block">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="group flex w-full items-center justify-between rounded-lg border border-slate-800/80 bg-slate-900/50 px-3 py-1.5 text-xs text-slate-400 backdrop-blur-sm transition-colors hover:border-slate-700 hover:bg-slate-900/80 hover:text-slate-300"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
              <span className="font-mono">Quick search or command...</span>
            </div>
            <kbd className="flex items-center gap-0.5 rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 group-hover:text-slate-300">
              <Command className="h-2.5 w-2.5" />
              <span>K</span>
            </kbd>
          </button>
        </div>

        {/* Right side: Status indicators & Actions */}
        <div className="flex items-center gap-2.5">
          {/* Submission Diagnostics Button */}
          <button
            id="btn-health-diagnostics"
            onClick={() => setIsSubmissionCheckOpen(true)}
            className="hidden xl:inline-flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 px-2.5 py-1 text-[11px] font-mono font-medium text-indigo-300 transition-colors"
          >
            <FileCheck className="h-3.5 w-3.5 text-indigo-400" />
            <span>Health Diagnostics</span>
          </button>

          {/* Bright Data Status Pill */}
          <div className="hidden lg:flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 text-[11px] font-mono text-emerald-400">
            <Radio className="h-3 w-3 animate-pulse" />
            <span>Bright Data: OK</span>
          </div>

          {/* Active Healing Job alert pill */}
          {activeHealingCount > 0 && (
            <button
              onClick={() => setCurrentView('healing')}
              className="flex items-center gap-1.5 rounded-lg border border-blue-500/40 bg-blue-500/10 px-2.5 py-1 text-[11px] font-mono text-blue-300 animate-pulse hover:bg-blue-500/20 transition-colors"
            >
              <Zap className="h-3 w-3 text-blue-400" />
              <span>{activeHealingCount} Self-Healing</span>
            </button>
          )}

          {/* Judge Demo Mode Button */}
          <button
            id="btn-judge-demo-mode"
            onClick={() => setIsJudgeDemoOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-400/80 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3 py-1 text-xs font-mono font-bold shadow-md shadow-emerald-500/20 transition-all active:scale-95"
          >
            <Award className="h-3.5 w-3.5" />
            <span>Judge Demo</span>
          </button>

          {/* Demo Lab Showcase Button */}
          <button
            onClick={() => setCurrentView('demolab')}
            className={cn(
              'hidden sm:inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-mono font-medium transition-all',
              currentView === 'demolab'
                ? 'border-emerald-400 bg-emerald-500 text-slate-950 shadow-md'
                : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400'
            )}
          >
            <FlaskConical className="h-3.5 w-3.5" />
            <span>Demo Lab</span>
          </button>

          {/* Notification Bell */}
          <NotificationDropdown />
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 border-b border-slate-800 bg-slate-950 p-4 md:hidden shadow-2xl z-50">
            <div className="space-y-1">
              {mobileNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-mono transition-colors',
                      isActive
                        ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                        : 'text-slate-300 hover:bg-slate-900'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <div className="pt-2 mt-2 border-t border-slate-800 space-y-1">
                <button
                  onClick={() => {
                    setIsJudgeDemoOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30"
                >
                  <Award className="h-4 w-4" />
                  <span>Launch Judge Demo Mode</span>
                </button>
                <button
                  onClick={() => {
                    setIsSubmissionCheckOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-mono font-medium text-indigo-300 bg-indigo-500/10"
                >
                  <FileCheck className="h-4 w-4" />
                  <span>Submission Diagnostics</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentView('landing');
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-mono text-slate-400 hover:bg-slate-900"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Product Landing Page</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
      <GuidedJudgeDemoModal isOpen={isJudgeDemoOpen} onClose={() => setIsJudgeDemoOpen(false)} />
      <SubmissionReadinessModal isOpen={isSubmissionCheckOpen} onClose={() => setIsSubmissionCheckOpen(false)} />
    </>
  );
};
