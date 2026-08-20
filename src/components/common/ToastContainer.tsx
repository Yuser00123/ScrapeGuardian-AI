import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  const iconMap = {
    success: <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />,
    warning: <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />,
    error: <XCircle className="h-4 w-4 text-rose-400 shrink-0" />,
    info: <Info className="h-4 w-4 text-blue-400 shrink-0" />,
  };

  const borderMap = {
    success: 'border-emerald-500/30 bg-slate-900/95',
    warning: 'border-amber-500/30 bg-slate-900/95',
    error: 'border-rose-500/30 bg-slate-900/95',
    info: 'border-blue-500/30 bg-slate-900/95',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'pointer-events-auto flex items-start gap-3 rounded-xl border p-3.5 shadow-2xl backdrop-blur-md transition-all animate-in slide-in-from-bottom-5 duration-200',
            borderMap[toast.type]
          )}
        >
          {iconMap[toast.type]}
          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-semibold text-slate-100 font-mono">
              {toast.title}
            </h5>
            <p className="mt-0.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {toast.description}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="rounded p-1 text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
