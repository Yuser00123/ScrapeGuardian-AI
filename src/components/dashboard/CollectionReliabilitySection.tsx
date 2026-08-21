import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Radio,
  Clock,
  Globe,
  RotateCcw,
  Zap,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const CollectionReliabilitySection: React.FC = () => {
  const { reliabilityScores, healingJobs, setCurrentView } = useApp();

  const activeRepairs = healingJobs.filter((j) => j.status === 'running' || j.status === 'succeeded').length;

  const RELIABILITY_METRICS = [
    {
      title: 'Successful Collections',
      value: '99.94%',
      subtext: '1,420,850 queries served',
      icon: CheckCircle2,
      color: 'emerald',
      badge: 'HEALTHY',
    },
    {
      title: 'Failed Collections',
      value: '0.06%',
      subtext: 'Bypassed with zero data drop',
      icon: AlertTriangle,
      color: 'amber',
      badge: 'INTERCEPTED',
    },
    {
      title: 'Recovery Events',
      value: '428',
      subtext: 'Auto-switched proxy route',
      icon: RotateCcw,
      color: 'blue',
      badge: 'SUB-50MS',
    },
    {
      title: 'Self-Healing Events',
      value: `${activeRepairs + 38}`,
      subtext: 'AST DOM mutations repaired',
      icon: Sparkles,
      color: 'purple',
      badge: '98.4% PASS',
    },
    {
      title: 'Dataset Availability',
      value: '99.98%',
      subtext: 'Bright Data SERP API SLA',
      icon: ShieldCheck,
      color: 'emerald',
      badge: 'OPERATIONAL',
    },
    {
      title: 'Data Freshness',
      value: '< 45s',
      subtext: 'Real-time live Google SERP',
      icon: Clock,
      color: 'cyan',
      badge: 'REAL-TIME',
    },
    {
      title: 'Collection Coverage',
      value: '195+ Geos',
      subtext: '72M+ Residential IP nodes',
      icon: Globe,
      color: 'teal',
      badge: 'GLOBAL',
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 backdrop-blur-xl shadow-2xl space-y-5" id="collection-reliability-section">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 px-3 py-0.5 text-xs font-mono font-bold text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              COLLECTION RELIABILITY & FAULT TOLERANCE
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Scraper Studio Ingress SLA
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-100 font-mono tracking-tight flex items-center gap-2">
            <span>High-Resilience Extraction Telemetry</span>
          </h2>
        </div>

        <button
          onClick={() => setCurrentView('healing')}
          className="flex items-center gap-1.5 rounded-lg border border-purple-500/40 bg-purple-500/10 px-3.5 py-1.5 text-xs font-mono font-semibold text-purple-300 hover:bg-purple-500/20 transition-all"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Self-Healing Center</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      {/* Grid of 7 Reliability Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {RELIABILITY_METRICS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <Icon className="h-4 w-4 text-emerald-400" />
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    {item.badge}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-slate-400 truncate mb-1">
                  {item.title}
                </p>
                <p className="text-xl font-bold font-mono text-slate-100">
                  {item.value}
                </p>
              </div>
              <p className="text-[10px] text-slate-500 font-mono mt-2 truncate">
                {item.subtext}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
