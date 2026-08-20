import React, { useState } from 'react';
import { SelectorPatch } from '../../types/firestore';
import { Code2, Sparkles, CheckCircle2, ArrowRight, Eye, Copy, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SelectorPatchCardProps {
  patch: SelectorPatch;
}

export const SelectorPatchCard: React.FC<SelectorPatchCardProps> = ({ patch }) => {
  const { addToast } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(patch.newSelector);
    setCopied(true);
    addToast({
      title: 'Selector Copied',
      description: `Copied synthesized selector for ${patch.fieldName}`,
      type: 'success',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-bold text-slate-100 font-mono">
            Field: {patch.fieldName}
          </span>
          <span className="rounded bg-slate-800 border border-slate-700 px-1.5 py-0.2 text-[10px] font-mono text-slate-300 uppercase">
            {patch.selectorType}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
            <Sparkles className="h-2.5 w-2.5" />
            <span>{(patch.synthesisConfidence * 100).toFixed(0)}% AST MATCH</span>
          </div>

          <span className="text-[11px] font-mono text-slate-400">
            Matches: <strong className="text-emerald-400">{patch.testedMatchesCount} DOM nodes</strong>
          </span>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
        {/* Broken Selector */}
        <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
          <p className="text-[10px] uppercase font-bold text-rose-400 mb-1">
            ORIGINAL (BROKEN / DRIFTED)
          </p>
          <code className="block text-slate-300 line-through opacity-80 break-all bg-slate-900/60 p-1.5 rounded border border-rose-500/20">
            {patch.oldSelector}
          </code>
        </div>

        {/* Synthesized Replacement */}
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 relative group">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
              <Sparkles className="h-2.5 w-2.5" />
              <span>AI SYNTHESIZED REPLACEMENT</span>
            </p>
            <button
              onClick={handleCopy}
              className="text-slate-400 hover:text-white transition-colors"
              title="Copy Selector"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>
          <code className="block text-emerald-300 font-bold break-all bg-slate-900/90 p-1.5 rounded border border-emerald-500/30">
            {patch.newSelector}
          </code>
        </div>
      </div>

      {/* Visual match preview snippet */}
      {patch.visualPreviewMatchSnippet && (
        <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-2.5 text-xs">
          <p className="text-[10px] font-mono font-semibold text-slate-400 uppercase mb-1">
            Synthetic Match Extraction Node Preview
          </p>
          <code className="text-[11px] font-mono text-emerald-400 break-all">
            {patch.visualPreviewMatchSnippet}
          </code>
        </div>
      )}
    </div>
  );
};
