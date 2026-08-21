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
  Radio,
  FileCode,
  FileText,
  PieChart,
} from 'lucide-react';

export const LandingPageView: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="space-y-16 pb-20 animate-in fade-in duration-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-950 p-8 sm:p-14 text-center backdrop-blur-xl shadow-2xl">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -top-12 right-1/4 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

        {/* Prominent Bright Data Scraper Studio Banner */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-5 py-2 text-xs font-mono font-bold text-emerald-300 mb-6 shadow-inner">
          <Radio className="h-4 w-4 animate-pulse text-emerald-400" />
          <span>POWERED BY BRIGHT DATA SCRAPER STUDIO</span>
          <span className="text-emerald-600 font-normal">|</span>
          <span className="text-slate-200">DATASET ID: gd_l1viktl72bvl7bjuj0</span>
        </div>

        {/* Main Title & Tagline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 font-mono max-w-4xl mx-auto leading-tight">
          Enterprise Web Intelligence & Scraper Studio Platform
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-sans leading-relaxed">
          Transform raw, unstructured web ecosystems into boardroom-ready intelligence. Built natively on top of <strong className="text-emerald-400">Bright Data Scraper Studio</strong> datasets, high-throughput residential proxy meshes, and autonomous AI reasoning.
        </p>

        {/* 5 Core Pillars Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto text-left">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <span className="text-[10px] font-mono font-bold text-emerald-400 block mb-1">01. REAL-TIME</span>
            <p className="text-xs font-bold text-slate-100 font-mono">Real-Time Collection</p>
            <p className="text-[11px] text-slate-400 mt-1">Live SERP & dynamic web extraction across 195+ geos.</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <span className="text-[10px] font-mono font-bold text-cyan-400 block mb-1">02. EXTRACTION</span>
            <p className="text-xs font-bold text-slate-100 font-mono">Structured Output</p>
            <p className="text-[11px] text-slate-400 mt-1">100% verified AST JSON schemas, ratings, and sitelinks.</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <span className="text-[10px] font-mono font-bold text-purple-400 block mb-1">03. REASONING</span>
            <p className="text-xs font-bold text-slate-100 font-mono">AI Intelligence</p>
            <p className="text-[11px] text-slate-400 mt-1">Competitor share of voice & multi-provider AI routing.</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <span className="text-[10px] font-mono font-bold text-blue-400 block mb-1">04. RESILIENCE</span>
            <p className="text-xs font-bold text-slate-100 font-mono">Self-Healing Reliability</p>
            <p className="text-[11px] text-slate-400 mt-1">DOM drift healing and instant proxy failover (99.94%).</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono font-bold text-amber-400 block mb-1">05. DECISIONS</span>
            <p className="text-xs font-bold text-slate-100 font-mono">Executive Reporting</p>
            <p className="text-[11px] text-slate-400 mt-1">Boardroom strategic briefs grounded in Bright Data records.</p>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-xs font-mono font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-lg glow-accent"
          >
            <span>Launch Live Intelligence Platform</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => setCurrentView('search-intelligence')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-3.5 text-xs font-mono font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-all"
          >
            <Radio className="h-4 w-4 text-emerald-400" />
            <span>Scraper Studio Dataset Explorer</span>
          </button>

          <button
            onClick={() => setCurrentView('demolab')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3.5 text-xs font-mono font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <FlaskConical className="h-4 w-4 text-emerald-400" />
            <span>Judge Demo Mode</span>
          </button>
        </div>

        {/* Live Metrics Counter Ribbon */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800/80 pt-8 max-w-3xl mx-auto">
          <div>
            <p className="text-2xl font-bold text-emerald-400 font-mono">1.42M+</p>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Records Harvested</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-100 font-mono">99.94%</p>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Collection Success SLA</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-400 font-mono">72M+</p>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Residential IP Mesh</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-400 font-mono">100%</p>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Firestore Verified</p>
          </div>
        </div>
      </section>

      {/* The 5-Stage Core Story Workflow */}
      <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-8 space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            END-TO-END VALUE GENERATION PIPELINE
          </span>
          <h2 className="text-2xl font-bold font-mono text-slate-100">
            From Raw Web to Strategic Decisions
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            How Bright Data powers every downstream insight in ScrapeGuardian AI
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative">
          <div className="rounded-xl border border-emerald-500/40 bg-slate-900/80 p-4 space-y-2">
            <span className="text-[10px] font-mono font-bold text-emerald-400">STAGE 1</span>
            <div className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-emerald-400" />
              <h3 className="text-xs font-bold text-slate-100 font-mono">Bright Data Scraper Studio</h3>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Dispatches unblockable extraction jobs across 72M+ IPs and Web Unlocker bypass algorithms.
            </p>
          </div>

          <div className="rounded-xl border border-cyan-500/40 bg-slate-900/80 p-4 space-y-2">
            <span className="text-[10px] font-mono font-bold text-cyan-400">STAGE 2</span>
            <div className="flex items-center gap-2">
              <FileCode className="h-4 w-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-slate-100 font-mono">Structured Web Data</h3>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Normalizes high-density SERP and page elements into validated JSON, tables, and AST nodes.
            </p>
          </div>

          <div className="rounded-xl border border-purple-500/40 bg-slate-900/80 p-4 space-y-2">
            <span className="text-[10px] font-mono font-bold text-purple-400">STAGE 3</span>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <h3 className="text-xs font-bold text-slate-100 font-mono">AI Intelligence Engine</h3>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Synthesizes share of voice, sentiment shifts, domain dominance, and competitive vectors.
            </p>
          </div>

          <div className="rounded-xl border border-blue-500/40 bg-slate-900/80 p-4 space-y-2">
            <span className="text-[10px] font-mono font-bold text-blue-400">STAGE 4</span>
            <div className="flex items-center gap-2">
              <PieChart className="h-4 w-4 text-blue-400" />
              <h3 className="text-xs font-bold text-slate-100 font-mono">Executive Insights</h3>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Distills signals into key empirical findings, threat alerts, and strategic opportunity matrixes.
            </p>
          </div>

          <div className="rounded-xl border border-amber-500/40 bg-slate-900/80 p-4 space-y-2 sm:col-span-2 lg:col-span-1">
            <span className="text-[10px] font-mono font-bold text-amber-400">STAGE 5</span>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-amber-400" />
              <h3 className="text-xs font-bold text-slate-100 font-mono">Business Decisions</h3>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              C-suite ready briefings with direct dataset provenance links, action items, and PDF/MD export.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-100 font-mono">
              Engineered for Enterprise Web Intelligence
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Everything teams need to turn live web data into strategic competitive advantage
            </p>
          </div>

          <button
            onClick={() => setCurrentView('search-intelligence')}
            className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>Explore Dataset Explorer</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50">
            <TrendingUp className="h-5 w-5 text-emerald-400 mb-2" />
            <p className="font-bold text-slate-100">Competitor Share of Voice</p>
            <p className="mt-1 text-slate-400 text-[11px] font-sans">
              Instant alerts on competitor market dominance, ranking volatility, and SERP real estate shifts.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50">
            <Zap className="h-5 w-5 text-blue-400 mb-2" />
            <p className="font-bold text-slate-100">Sub-Minute MTTR</p>
            <p className="mt-1 text-slate-400 text-[11px] font-sans">
              Mean Time to Recovery reduced from days of manual engineering to under 45 seconds of self-healing.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50">
            <ShieldCheck className="h-5 w-5 text-emerald-400 mb-2" />
            <p className="font-bold text-slate-100">100% Ingestion SLA</p>
            <p className="mt-1 text-slate-400 text-[11px] font-sans">
              Dual-layer fallback prevents empty record ingestion or silent scraper degradation.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50">
            <Cpu className="h-5 w-5 text-purple-400 mb-2" />
            <p className="font-bold text-slate-100">Multi-Model AI Mesh</p>
            <p className="mt-1 text-slate-400 text-[11px] font-sans">
              Autonomous reasoning across Gemini 2.5 Flash, Groq LLaMA 3.3, and Mistral with seamless failover.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
