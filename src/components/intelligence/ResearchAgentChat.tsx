/**
 * ScrapeGuardian AI - Autonomous Research Agent Chat
 * 
 * Interactive natural language agent for deep interrogations over live
 * Bright Data SERP datasets and competitor movements.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Cpu,
  CheckCircle2,
  ExternalLink,
  Trash2,
  CornerDownLeft,
  Search,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const PRESET_QUERIES = [
  'Who dominates this search market?',
  'What changed this week in SERP ranks?',
  'Which competitor is gaining visibility fastest?',
  'What strategic trends are emerging?',
];

export const ResearchAgentChat: React.FC = () => {
  const {
    agentMessages,
    askResearchAgent,
    isAgentThinking,
    clearAgentChat,
    currentSearchJob,
  } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [agentMessages, isAgentThinking]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputQuery.trim() || isAgentThinking) return;

    const q = inputQuery.trim();
    setInputQuery('');
    await askResearchAgent(q);
  };

  const handleSelectPreset = (preset: string) => {
    setInputQuery(preset);
  };

  return (
    <div className="flex flex-col h-[680px] rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md shadow-2xl overflow-hidden">
      {/* Agent Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-100">
                ScrapeGuardian Autonomous Research Agent
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Mesh Connected
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Grounded on <strong className="text-slate-200">{currentSearchJob?.keyword || 'Active Search Query'}</strong> via Bright Data SERP Datasets
            </p>
          </div>
        </div>

        <button
          onClick={clearAgentChat}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors border border-slate-800"
          title="Reset conversation"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Quick Prompt Pills */}
      <div className="px-5 py-2.5 bg-slate-950/30 border-b border-slate-800/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] uppercase font-bold text-slate-500 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-400" />
          Suggested:
        </span>
        {PRESET_QUERIES.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectPreset(preset)}
            className="shrink-0 text-xs font-medium px-3 py-1 rounded-full bg-slate-800/80 hover:bg-indigo-600/20 hover:text-indigo-300 hover:border-indigo-500/40 border border-slate-700/60 text-slate-300 transition-all duration-150"
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {agentMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-4xl ${
              msg.role === 'user' ? 'ml-auto justify-end' : 'mr-auto justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-indigo-400" />
              </div>
            )}

            <div
              className={`rounded-xl p-4 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-600/20'
                  : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
              }`}
            >
              {/* Render Assistant Output with Markdown support */}
              <div className="prose prose-invert prose-sm max-w-none space-y-2 whitespace-pre-wrap">
                {msg.content}
              </div>

              {/* Citations & Grounding Provenance Footer */}
              {msg.role === 'assistant' && (msg.confidenceScore || msg.providerUsed) && (
                <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    {msg.confidenceScore && (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3 h-3" />
                        {Math.round(msg.confidenceScore * 100)}% Confidence
                      </span>
                    )}
                    {msg.providerUsed && (
                      <span className="inline-flex items-center gap-1 text-slate-300 font-medium px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                        <Cpu className="w-3 h-3 text-indigo-400" />
                        {msg.providerUsed}
                      </span>
                    )}
                    {msg.sourcesCount && (
                      <span className="text-slate-400">
                        ({msg.sourcesCount} Bright Data SERP nodes)
                      </span>
                    )}
                  </div>

                  {msg.reasoningSummary && (
                    <span className="text-slate-400 italic">
                      {msg.reasoningSummary}
                    </span>
                  )}
                </div>
              )}

              {/* Cited Sources Links */}
              {msg.citedSources && msg.citedSources.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-slate-800/60 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Direct SERP Citations:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {msg.citedSources.map((src, i) => (
                      <a
                        key={i}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-xs text-indigo-400 hover:text-indigo-300 bg-slate-900/60 px-2 py-1 rounded border border-slate-800 hover:border-indigo-500/40 truncate"
                      >
                        <span className="truncate">{src.title}</span>
                        <ExternalLink className="w-3 h-3 shrink-0 ml-1" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4 text-slate-300" />
              </div>
            )}
          </div>
        ))}

        {/* Thinking Indicator */}
        {isAgentThinking && (
          <div className="flex gap-3 items-center mr-auto justify-start">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-indigo-400 animate-spin" />
            </div>
            <div className="rounded-xl px-4 py-3 bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
              <div className="flex space-x-1">
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
              <span>Multi-provider router synthesizing Bright Data SERP extractions...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Query Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center gap-2"
      >
        <div className="relative flex-1">
          <input
            id="input-research-agent"
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask research agent anything about competitor visibility, domain movements, or ranking gaps..."
            disabled={isAgentThinking}
            className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors disabled:opacity-50"
          />
          <Search className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
        </div>

        <button
          id="btn-send-research-agent"
          type="submit"
          disabled={!inputQuery.trim() || isAgentThinking}
          className="px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all duration-150"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Ask Agent</span>
        </button>
      </form>
    </div>
  );
};
