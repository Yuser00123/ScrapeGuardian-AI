import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Globe, User, Terminal, ArrowUpRight, Radio } from 'lucide-react';
import { formatTimeAgo } from '../../lib/utils';

export const ActivityFeed: React.FC = () => {
  const { activityLogs, setCurrentView } = useApp();

  const getActorIcon = (type: string) => {
    switch (type) {
      case 'healing_engine':
        return <Sparkles className="h-3.5 w-3.5 text-blue-400" />;
      case 'bright_data_webhook':
        return <Globe className="h-3.5 w-3.5 text-emerald-400" />;
      case 'system_agent':
        return <Terminal className="h-3.5 w-3.5 text-purple-400" />;
      default:
        return <User className="h-3.5 w-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="flex flex-col rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md glow-card">
      <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
        <div className="flex items-center gap-2">
          <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
          <h3 className="text-sm font-semibold text-slate-100 font-mono">
            Live Stream Activity
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
          REAL-TIME
        </span>
      </div>

      <div className="mt-3 flex-1 overflow-y-auto max-h-[380px] space-y-2.5 pr-1">
        {activityLogs.slice(0, 7).map((log) => (
          <div
            key={log.id}
            className="group flex items-start gap-3 rounded-lg border border-slate-800/50 bg-slate-950/40 p-2.5 hover:border-slate-700/80 hover:bg-slate-900/60 transition-all"
          >
            <div className="mt-0.5 rounded p-1.5 bg-slate-900 border border-slate-800 shrink-0">
              {getActorIcon(log.actor.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-semibold text-slate-200 font-mono truncate">
                  {log.actor.name}
                </span>
                <span className="text-[10px] text-slate-500 font-mono shrink-0">
                  {formatTimeAgo(log.timestamp)}
                </span>
              </div>

              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                {log.action}
              </p>

              {log.details && (
                <p className="text-[11px] text-slate-500 mt-1 font-mono line-clamp-1">
                  {log.details}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 font-mono">
          Showing latest events
        </span>
        <button
          onClick={() => setCurrentView('healing')}
          className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-mono transition-colors"
        >
          <span>View Self-Healing Logs</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
