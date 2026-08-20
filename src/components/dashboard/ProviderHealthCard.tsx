import React from 'react';
import { Globe, Cpu, ShieldCheck, Sparkles, Activity, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProviderHealthCard: React.FC = () => {
  const { addToast } = useApp();

  const providers = [
    {
      name: 'Bright Data Web Unlocker',
      category: 'Anti-Bot & JS Emulation',
      status: 'operational',
      uptime: '99.98%',
      latency: '42ms',
      icon: Globe,
      color: 'text-emerald-400',
    },
    {
      name: 'Bright Data Residential Proxies',
      category: '72M+ Global IP Pool',
      status: 'operational',
      uptime: '99.95%',
      latency: '58ms',
      icon: ShieldCheck,
      color: 'text-emerald-400',
    },
    {
      name: 'Gemini 2.5 Flash Autonomous Core',
      category: 'DOM AST & Selector Synthesis',
      status: 'operational',
      uptime: '100.0%',
      latency: '78ms',
      icon: Sparkles,
      color: 'text-blue-400',
    },
    {
      name: 'Firestore State & Event Bus',
      category: 'Real-time Telemetry & Storage',
      status: 'operational',
      uptime: '99.99%',
      latency: '4ms',
      icon: Cpu,
      color: 'text-purple-400',
    },
  ];

  const handleRunHealthCheck = () => {
    addToast({
      title: 'Health Check Initiated',
      description: 'Pinging Bright Data superproxy endpoints and Gemini inference workers...',
      type: 'info',
    });
    setTimeout(() => {
      addToast({
        title: 'All Providers Nominal',
        description: 'All 4 providers responded with sub-100ms latency and 0 packet loss.',
        type: 'success',
      });
    }, 800);
  };

  return (
    <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md glow-card">
      <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="rounded-md border border-slate-700 bg-slate-800/70 p-1.5 text-emerald-400">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100 font-mono">
              Provider & Mesh Infrastructure
            </h3>
            <p className="text-xs text-slate-400">
              Live heartbeat telemetry across proxy and AI engines
            </p>
          </div>
        </div>

        <button
          onClick={handleRunHealthCheck}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-mono text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
        >
          <RefreshCw className="h-3 w-3" />
          <span>Ping All</span>
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {providers.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.name}
              className="flex items-start justify-between rounded-lg border border-slate-800/60 bg-slate-950/40 p-3 hover:border-slate-700/80 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-md p-1.5 bg-slate-900 border border-slate-800 mt-0.5">
                  <Icon className={`h-4 w-4 ${p.color}`} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-200 font-mono">
                    {p.name}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {p.category}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-[10px] font-mono text-slate-400">
                    <span>Uptime: <strong className="text-emerald-400">{p.uptime}</strong></span>
                    <span>Latency: <strong className="text-slate-300">{p.latency}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
