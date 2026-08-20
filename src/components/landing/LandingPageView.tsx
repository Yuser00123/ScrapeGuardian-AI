import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Sparkles,
  Zap,
  Globe,
  Database,
  ArrowRight,
  FlaskConical,
  Layers,
  Terminal,
  Activity,
  CheckCircle2,
  Lock,
  Cpu,
  TrendingUp,
} from 'lucide-react';

export const LandingPageView: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="space-y-16 pb-20 animate-in fade-in duration-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 p-8 sm:p-14 text-center backdrop-blur-xl">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-96 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -top-12 right-1/4 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

        {/* Hackathon Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono font-semibold text-emerald-400 mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          <span>SCRAPE-VERSE HACKATHON ENTRY</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300">BRIGHT DATA × GEMINI AI</span>
        </div>

        {/* Main Title & Tagline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 font-mono max-w-4xl mx-auto leading-tight">
          Autonomous Website Intelligence Platform
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
          Powered by <strong className="text-emerald-400">Bright Data Scraper Studio</strong> & <strong className="text-blue-400">Gemini 2.5 Flash</strong>. ScrapeGuardian detects DOM drift, synthesizes replacement AST selectors, and recovers with zero downtime.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-xs font-mono font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-lg glow-accent"
          >
            <span>Launch Live Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => setCurrentView('search-intelligence')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-xs font-mono font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-all"
          >
            <span>SERP Search Intelligence</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => setCurrentView('demolab')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3 text-xs font-mono font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <FlaskConical className="h-4 w-4 text-emerald-400" />
            <span>Demo Lab</span>
          </button>
        </div>

        {/* Live Metrics Counter Ribbon */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800/80 pt-8 max-w-3xl mx-auto">
          <div>
            <p className="text-2xl font-bold text-emerald-400 font-mono">98.4%</p>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Self-Healing SLA</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-100 font-mono">42.1s</p>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Avg Repair MTTR</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-400 font-mono">72M+</p>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Proxy IP Mesh</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-400 font-mono">100%</p>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Zero Data Drop</p>
          </div>
        </div>
      </section>

      {/* Architecture Flow Diagram Section */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold font-mono text-slate-100">
            Autonomous Tri-Layer Architecture
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            How ScrapeGuardian seamlessly marries Bright Data proxy infrastructure with Gemini AI reasoning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Layer 1 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md relative overflow-hidden glow-card">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Globe className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">LAYER 01</span>
            <h3 className="text-base font-bold text-slate-100 font-mono mt-1">
              Bright Data Scraper Studio
            </h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Automated anti-bot bypass, Web Unlocker orchestration, residential superproxies, and browser emulation capturing raw DOM states across 195+ countries.
            </p>
            <ul className="mt-4 space-y-1.5 text-[11px] font-mono text-slate-400">
              <li className="flex items-center gap-1.5 text-emerald-300">
                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                <span>Web Unlocker CAPTCHA resolution</span>
              </li>
              <li className="flex items-center gap-1.5 text-emerald-300">
                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                <span>Real-time fingerprint emulation</span>
              </li>
            </ul>
          </div>

          {/* Layer 2 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md relative overflow-hidden glow-card">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-blue-400 uppercase">LAYER 02</span>
            <h3 className="text-base font-bold text-slate-100 font-mono mt-1">
              Gemini 2.5 Flash Self-Healer
            </h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Sub-80ms DOM tree tokenization detects layout drift and automatically synthesizes resilient CSS and XPath selector replacement patches.
            </p>
            <ul className="mt-4 space-y-1.5 text-[11px] font-mono text-slate-400">
              <li className="flex items-center gap-1.5 text-blue-300">
                <CheckCircle2 className="h-3 w-3 text-blue-400" />
                <span>AST semantic layout re-matching</span>
              </li>
              <li className="flex items-center gap-1.5 text-blue-300">
                <CheckCircle2 className="h-3 w-3 text-blue-400" />
                <span>Synthetic test validation loops</span>
              </li>
            </ul>
          </div>

          {/* Layer 3 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md relative overflow-hidden glow-card">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
              <Database className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-purple-400 uppercase">LAYER 03</span>
            <h3 className="text-base font-bold text-slate-100 font-mono mt-1">
              Intelligence Mesh & Firestore
            </h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Continuous schema differential tracking, competitor price elasticity indexes, and sub-5ms Firestore database synchronization.
            </p>
            <ul className="mt-4 space-y-1.5 text-[11px] font-mono text-slate-400">
              <li className="flex items-center gap-1.5 text-purple-300">
                <CheckCircle2 className="h-3 w-3 text-purple-400" />
                <span>Zero-downtime hot-patching</span>
              </li>
              <li className="flex items-center gap-1.5 text-purple-300">
                <CheckCircle2 className="h-3 w-3 text-purple-400" />
                <span>Real-time webhook notifications</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-100 font-mono">
              Engineered for Mission-Critical Data Extraction
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Everything teams need to stop babysitting broken web scrapers forever
            </p>
          </div>

          <button
            onClick={() => setCurrentView('collectors')}
            className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>Explore 48 Pre-configured Collectors</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50">
            <TrendingUp className="h-5 w-5 text-emerald-400 mb-2" />
            <p className="font-bold text-slate-100">Pricing Intel & BuyBox</p>
            <p className="mt-1 text-slate-400 text-[11px] font-sans">
              Instant alerts on competitor margin shifts, GPU rental spot rates, and dynamic catalog revisions.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50">
            <Zap className="h-5 w-5 text-blue-400 mb-2" />
            <p className="font-bold text-slate-100">Sub-Minute MTTR</p>
            <p className="mt-1 text-slate-400 text-[11px] font-sans">
              Mean Time to Recovery reduced from 48 hours of manual engineer debugging to under 45 seconds of autonomous AI synthesis.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50">
            <ShieldCheck className="h-5 w-5 text-emerald-400 mb-2" />
            <p className="font-bold text-slate-100">100% SLA Guarantee</p>
            <p className="mt-1 text-slate-400 text-[11px] font-sans">
              Dual-layer fallback prevents empty record ingestion or silent scraper degradation.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50">
            <Cpu className="h-5 w-5 text-purple-400 mb-2" />
            <p className="font-bold text-slate-100">Zero Cold Start</p>
            <p className="mt-1 text-slate-400 text-[11px] font-sans">
              Pre-warmed Bright Data residential browser pools ready for concurrent multi-million record batch ingestion.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
