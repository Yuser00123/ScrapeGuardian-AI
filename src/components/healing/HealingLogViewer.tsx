import React from 'react';
import { HealingJob, HealingLogEntry } from '../../types/firestore';
import { Terminal, Clock, CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react';
import { formatTimeAgo } from '../../lib/utils';

interface HealingLogViewerProps {
  logs: HealingLogEntry[];
}

export const HealingLogViewer: React.FC<HealingLogViewerProps> = ({ logs }) => {
  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'success':
        return <span className="text-emerald-400 font-bold">[SUCCESS]</span>;
      case 'warn':
        return <span className="text-amber-400 font-bold">[WARN]</span>;
      case 'error':
        return <span className="text-rose-400 font-bold">[ERROR]</span>;
      default:
        return <span className="text-blue-400 font-bold">[INFO]</span>;
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs shadow-inner">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <div className="flex items-center gap-2 text-slate-300">
          <Terminal className="h-4 w-4 text-emerald-400" />
          <span className="font-semibold text-xs text-slate-200">HEALING ENGINE CONSOLE LOGS</span>
        </div>
        <span className="text-[10px] text-slate-500">
          Streaming from AI Worker Pod
        </span>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
        {logs.map((log, idx) => (
          <div key={idx} className="flex items-start gap-2 text-[11px] leading-relaxed">
            <span className="text-slate-600 shrink-0 select-none">{log.timestamp.split('T')[1].replace('Z', '')}</span>
            <span className="shrink-0">{getLevelBadge(log.level)}</span>
            <span className="text-slate-400 uppercase font-bold shrink-0">[{log.stage}]</span>
            <span className="text-slate-200 break-all">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
