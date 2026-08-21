import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Globe,
  SlidersHorizontal,
  Sparkles,
  Loader2,
  Tag,
  ArrowRight,
  Filter,
  RefreshCw,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const PRESET_QUERIES = [
  { label: 'Electric vehicles', tag: 'Automotive', country: 'US' },
  { label: 'Cricket analytics', tag: 'Sports', country: 'IN' },
  { label: 'Cloud hosting', tag: 'Infrastructure', country: 'US' },
  { label: 'Restaurants in Delhi', tag: 'Hospitality', country: 'IN' },
  { label: 'Smartphones', tag: 'Consumer Tech', country: 'US' },
  { label: 'Cybersecurity', tag: 'Enterprise', country: 'US' },
  { label: 'Travel agencies', tag: 'Tourism', country: 'UK' },
  { label: 'Universities', tag: 'Education', country: 'US' },
  { label: 'Real estate', tag: 'Property', country: 'US' },
];

const COUNTRIES = [
  { code: 'US', label: 'United States', flag: '🇺🇸' },
  { code: 'UK', label: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DE', label: 'Germany', flag: '🇩🇪' },
  { code: 'FR', label: 'France', flag: '🇫🇷' },
  { code: 'JP', label: 'Japan', flag: '🇯🇵' },
  { code: 'CA', label: 'Canada', flag: '🇨🇦' },
  { code: 'IN', label: 'India', flag: '🇮🇳' },
  { code: 'AU', label: 'Australia', flag: '🇦🇺' },
  { code: 'BR', label: 'Brazil', flag: '🇧🇷' },
  { code: 'SG', label: 'Singapore', flag: '🇸🇬' },
];

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
  { code: 'de', label: 'German' },
  { code: 'fr', label: 'French' },
  { code: 'ja', label: 'Japanese' },
  { code: 'pt', label: 'Portuguese' },
];

const LIMITS = [20, 50, 100, 200];

const SEARCH_TYPES: Array<{ id: 'organic' | 'news' | 'shopping' | 'jobs' | 'images'; label: string }> = [
  { id: 'organic', label: 'Organic SERP' },
  { id: 'news', label: 'News SERP' },
  { id: 'shopping', label: 'Commercial Shopping' },
  { id: 'jobs', label: 'Jobs / Hiring' },
];

export const SearchPanel: React.FC = () => {
  const { runSearch, isSearching, searchProgress } = useApp();

  const [keyword, setKeyword] = useState<string>('Electric vehicles');
  const [country, setCountry] = useState<string>('US');
  const [language, setLanguage] = useState<string>('en');
  const [limit, setLimit] = useState<number>(100);
  const [searchType, setSearchType] = useState<'organic' | 'news' | 'shopping' | 'jobs' | 'images'>('organic');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!keyword.trim() || isSearching) return;
    runSearch(keyword.trim(), country, language, limit, searchType);
  };

  const handleApplyPreset = (preset: typeof PRESET_QUERIES[0]) => {
    setKeyword(preset.label);
    setCountry(preset.country);
    runSearch(preset.label, preset.country, language, limit, searchType);
  };

  return (
    <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md relative overflow-hidden">
      {/* Background Accent glow */}
      <div className="absolute -left-10 -top-10 h-32 w-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/70 pb-3.5 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <Search className="h-4 w-4 text-emerald-400" />
              SERP Intelligence Dispatcher
            </h2>
            <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono font-medium text-emerald-400">
              Bright Data Real-time
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Query structured Google search positions and domain market share via Bright Data SERP Dataset
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={cn(
            'self-start sm:self-auto flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors',
            showAdvanced
              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
              : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          )}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>{showAdvanced ? 'Simple Mode' : 'Parameters'}</span>
        </button>
      </div>

      {/* Search Input Form */}
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter any search query (e.g. Electric vehicles, Cricket analytics, Restaurants in Delhi, Cloud hosting)..."
            disabled={isSearching}
            className="w-full rounded-lg border border-slate-800 bg-slate-950/80 py-3 pl-10 pr-28 text-sm text-slate-100 placeholder-slate-500 focus:border-emerald-500/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 transition-all font-sans shadow-inner"
          />

          <div className="absolute inset-y-0 right-1.5 flex items-center gap-1">
            <button
              type="submit"
              disabled={isSearching || !keyword.trim()}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-semibold shadow-sm transition-all',
                isSearching
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium active:scale-95'
              )}
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Harvesting...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Execute</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Search Type Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-medium text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3" />
            SERP Type:
          </span>
          {SEARCH_TYPES.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setSearchType(type.id)}
              disabled={isSearching}
              className={cn(
                'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                searchType === type.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-950/50 text-slate-400 border border-slate-800/80 hover:text-slate-300 hover:border-slate-700'
              )}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Advanced Parameter Controls */}
        {showAdvanced && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-lg bg-slate-950/70 border border-slate-800/80 p-3.5 animate-fadeIn">
            {/* Country Selector */}
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                <Globe className="h-3 w-3 text-slate-400" />
                Target Geography
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                disabled={isSearching}
                aria-label="Target Geography"
                className="w-full rounded-md border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.label} ({c.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Language Selector */}
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">
                SERP Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                disabled={isSearching}
                aria-label="SERP Language"
                className="w-full rounded-md border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label} ({l.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Result Limit */}
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">
                Dataset Result Limit
              </label>
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                disabled={isSearching}
                aria-label="Dataset Result Limit"
                className="w-full rounded-md border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
              >
                {LIMITS.map((lim) => (
                  <option key={lim} value={lim}>
                    {lim} Ranked Results
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-slate-400 flex items-center gap-1 mr-1">
            <Tag className="h-3 w-3" />
            Presets:
          </span>
          {PRESET_QUERIES.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => handleApplyPreset(p)}
              disabled={isSearching}
              className="group inline-flex items-center gap-1.5 rounded-full border border-slate-800/90 bg-slate-950/60 px-2.5 py-1 text-[11px] text-slate-300 hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:text-emerald-300 transition-colors disabled:opacity-50"
            >
              <span>{p.label}</span>
              <span className="rounded bg-slate-800 px-1 py-0.2 text-[9px] text-slate-400 group-hover:text-emerald-400">
                {p.tag}
              </span>
            </button>
          ))}
        </div>
      </form>

      {/* Searching Live Progress Bar */}
      {isSearching && (
        <div className="mt-4 pt-3.5 border-t border-slate-800/80 animate-fadeIn space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 flex items-center gap-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              {searchProgress.message || 'Executing Bright Data SERP Dataset...'}
            </span>
            <span className="text-slate-400 font-semibold">{searchProgress.percent}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500 transition-all duration-300 rounded-full"
              style={{ width: `${searchProgress.percent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
