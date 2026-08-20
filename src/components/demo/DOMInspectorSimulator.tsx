import React from 'react';
import { DemoStage } from '../../context/AppContext';
import { ShieldCheck, AlertTriangle, Sparkles, CheckCircle2, RefreshCw, Layers, Terminal } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DOMInspectorSimulatorProps {
  stage: DemoStage;
}

export const DOMInspectorSimulator: React.FC<DOMInspectorSimulatorProps> = ({ stage }) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/80 overflow-hidden shadow-2xl backdrop-blur-md flex flex-col">
      {/* Mock Browser Title Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="ml-3 flex items-center gap-2 rounded-md bg-slate-950 px-3 py-1 text-[11px] font-mono text-slate-300 border border-slate-800 w-64 sm:w-80 truncate">
            <span className="text-emerald-400">https://</span>
            <span>shop.enterprise-retail.com/products/h100-gpu</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-400 border border-slate-700">
            Bright Data Web Unlocker
          </span>
        </div>
      </div>

      {/* Browser Viewport with Interactive Visual DOM */}
      <div className="p-5 flex-1 min-h-[320px] flex flex-col justify-between">
        {/* Mock Product Page Content */}
        <div className="rounded-lg border border-slate-800/80 bg-slate-900/40 p-4 relative">
          {/* Stage Visual Overlay Indicator */}
          <div className="absolute top-3 right-3">
            {stage === 'healthy' && (
              <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                <CheckCircle2 className="h-3 w-3" />
                <span>SELECTORS MATCH 100%</span>
              </span>
            )}
            {stage === 'changed' && (
              <span className="flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 animate-pulse">
                <AlertTriangle className="h-3 w-3" />
                <span>REACT 19 HYDRATION SHIFT</span>
              </span>
            )}
            {stage === 'failure' && (
              <span className="flex items-center gap-1 text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30 animate-pulse">
                <AlertTriangle className="h-3 w-3" />
                <span>0/50 RECORDS PARSED</span>
              </span>
            )}
            {stage === 'healing' && (
              <span className="flex items-center gap-1 text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/30 animate-spin">
                <RefreshCw className="h-3 w-3" />
                <span>AI RE-SYNTHESIZING</span>
              </span>
            )}
            {stage === 'validated' && (
              <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                <Sparkles className="h-3 w-3" />
                <span>10/10 SYNTHETIC PASS</span>
              </span>
            )}
            {stage === 'recovered' && (
              <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/40">
                <ShieldCheck className="h-3 w-3" />
                <span>HOT-PATCH ACTIVE (0 DOWNTIME)</span>
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            {/* Product Image Mock */}
            <div className="h-28 w-28 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 flex items-center justify-center text-slate-500 shrink-0">
              <Layers className="h-10 w-10 text-emerald-500/40" />
            </div>

            {/* Product Details & Highlighted Selectors */}
            <div className="flex-1 min-w-0 space-y-2">
              {/* Product Title DOM Element */}
              <div
                className={cn(
                  'rounded p-2 transition-all border',
                  stage === 'healthy'
                    ? 'border-emerald-500/50 bg-emerald-500/5'
                    : stage === 'changed' || stage === 'failure'
                    ? 'border-rose-500/60 bg-rose-500/10 animate-pulse'
                    : stage === 'healing'
                    ? 'border-blue-500/60 bg-blue-500/10'
                    : 'border-emerald-500/60 bg-emerald-500/10'
                )}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-0.5">
                  <span>
                    {stage === 'healthy'
                      ? 'SELECTOR: h2.product-title'
                      : stage === 'changed' || stage === 'failure'
                      ? 'DOM DRIFT: class="_prod_h9x2" (Old selector MISS)'
                      : 'AI PATCH: a[data-test="prod-title"] span'}
                  </span>
                  <span
                    className={cn(
                      'font-bold',
                      stage === 'healthy' || stage === 'validated' || stage === 'recovered'
                        ? 'text-emerald-400'
                        : stage === 'healing'
                        ? 'text-blue-400'
                        : 'text-rose-400'
                    )}
                  >
                    {stage === 'healthy' || stage === 'validated' || stage === 'recovered'
                      ? 'EXTRACTED'
                      : stage === 'healing'
                      ? 'RE-SYNTHESIZING'
                      : 'FAILED (0 MATCH)'}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-100">
                  NVIDIA H100 80GB SXM5 Enterprise Accelerator
                </h4>
              </div>

              {/* Price DOM Element */}
              <div
                className={cn(
                  'rounded p-2 transition-all border inline-block',
                  stage === 'healthy'
                    ? 'border-emerald-500/50 bg-emerald-500/5'
                    : stage === 'changed' || stage === 'failure'
                    ? 'border-rose-500/60 bg-rose-500/10 animate-pulse'
                    : stage === 'healing'
                    ? 'border-blue-500/60 bg-blue-500/10'
                    : 'border-emerald-500/60 bg-emerald-500/10'
                )}
              >
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 mb-0.5">
                  <span>
                    {stage === 'healthy'
                      ? 'span.price-whole'
                      : stage === 'changed' || stage === 'failure'
                      ? 'span._price_num_81 (MISS)'
                      : 'span[data-test="unit-price"]'}
                  </span>
                </div>
                <span className="text-lg font-bold font-mono text-emerald-400">
                  $28,700.00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Realtime DOM Tree Diff Code Block */}
        <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-300">
          <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800 pb-1.5 mb-2">
            <span>AST PARSER TELEMETRY</span>
            <span>Target DOM Redesign Level: {stage === 'healthy' ? '0.0 (None)' : '0.94 (Significant)'}</span>
          </div>

          <div className="text-[11px] leading-relaxed overflow-x-auto">
            {stage === 'healthy' && (
              <pre className="text-emerald-400">
                {`// Target HTML Tree:
<div class="product-card">
  <h2 class="product-title">NVIDIA H100 80GB SXM5</h2>
  <span class="price-whole">$28,700.00</span>
</div>
// Match Status: 100% of 48 items captured.`}
              </pre>
            )}

            {stage === 'changed' && (
              <pre className="text-amber-300">
                {`// Target Frontend Deployed Webpack 5 Minified Bundle:
<div class="_card_container_9x12">
  <a data-test="prod-title" class="_prod_h9x2">NVIDIA H100 80GB SXM5</a>
  <span data-test="unit-price" class="_price_num_81">$28,700.00</span>
</div>
// Anomaly: CSS classes hashed. Legacy selectors broken.`}
              </pre>
            )}

            {stage === 'failure' && (
              <pre className="text-rose-400">
                {`[ERROR] Document.querySelector('h2.product-title') returned NULL.
[ERROR] Document.querySelector('span.price-whole') returned NULL.
[SCRAPER FAULT] 0/50 target records parsed on shop.enterprise-retail.com
[ALERT TRIGGERED] DOM Drift Score: 0.94 -> Handing off to Gemini 2.5 Flash.`}
              </pre>
            )}

            {stage === 'healing' && (
              <pre className="text-blue-300">
                {`[GEMINI 2.5 FLASH AST REPAIR]
- Tokenized mutated DOM Tree (48,200 tokens parsed).
- Identified semantic parent container: <div class="_card_container_9x12">
- Synthesized candidate selector: a[data-test="prod-title"] span (Confidence: 0.98)
- Synthesized candidate selector: span[data-test="unit-price"] (Confidence: 0.99)
- Running 10 synthetic test scrapes through Bright Data Web Unlocker...`}
              </pre>
            )}

            {stage === 'validated' && (
              <pre className="text-emerald-400">
                {`[SYNTHETIC TEST SUITE]
✓ Test 1: 50/50 records matched schema (100%)
✓ Test 2: 50/50 records matched schema (100%)
✓ Test 3: Type checks passed (product_title: string, price: number)
✓ Validation Score: 100%
✓ Ready for hot-patch deployment.`}
              </pre>
            )}

            {stage === 'recovered' && (
              <pre className="text-emerald-400">
                {`[PRODUCTION HOT-PATCH DEPLOYED]
- Ingested 50 fresh records into Firestore database.
- Zero collector restart needed.
- Zero web data dropped.
- Autonomous recovery duration: 42.1s.`}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
