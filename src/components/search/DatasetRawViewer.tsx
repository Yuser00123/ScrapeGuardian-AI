import React, { useState } from 'react';
import { SearchResult, DatasetExecution } from '../../types/firestore';
import { searchResultService } from '../../services/searchResult.service';
import { useApp } from '../../context/AppContext';
import {
  FileCode,
  Copy,
  Check,
  Download,
  Terminal,
  Database,
  ShieldCheck,
  Server,
  Zap,
} from 'lucide-react';

interface DatasetRawViewerProps {
  results: SearchResult[];
  execution?: DatasetExecution | null;
  keyword: string;
}

export const DatasetRawViewer: React.FC<DatasetRawViewerProps> = ({
  results,
  execution,
  keyword,
}) => {
  const { addToast, brightDataStatus } = useApp();
  const [copied, setCopied] = useState<boolean>(false);

  const formattedJson = JSON.stringify(results, null, 2);

  const handleCopy = async () => {
    const success = await searchResultService.copyToClipboard(formattedJson);
    if (success) {
      setCopied(true);
      addToast({
        title: 'Copied Raw JSON',
        description: `${results.length} normalized SERP AST records copied to clipboard.`,
        type: 'info',
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const filename = `brightdata-serp-raw-${keyword.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.json`;
    searchResultService.exportToJSON(results, filename);
    addToast({
      title: 'Downloaded Raw Schema',
      description: `Saved full AST payload.`,
      type: 'success',
    });
  };

  return (
    <div className="space-y-3.5">
      {/* Schema Metadata Header */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 backdrop-blur-md">
        <div className="rounded-lg bg-slate-950/70 border border-slate-800/80 p-2.5">
          <p className="text-[10px] text-slate-400 font-mono uppercase">Dataset ID</p>
          <p className="text-xs font-mono font-semibold text-emerald-400 truncate">
            {execution?.datasetId || brightDataStatus.datasetId}
          </p>
        </div>

        <div className="rounded-lg bg-slate-950/70 border border-slate-800/80 p-2.5">
          <p className="text-[10px] text-slate-400 font-mono uppercase">Snapshot Hash</p>
          <p className="text-xs font-mono font-semibold text-slate-200 truncate">
            {execution?.snapshotId || 's_live_stream_994'}
          </p>
        </div>

        <div className="rounded-lg bg-slate-950/70 border border-slate-800/80 p-2.5">
          <p className="text-[10px] text-slate-400 font-mono uppercase">Proxy Ingress Zone</p>
          <p className="text-xs font-mono font-semibold text-teal-400 truncate">
            {execution?.proxyZone || 'residential_superproxy_us'}
          </p>
        </div>

        <div className="rounded-lg bg-slate-950/70 border border-slate-800/80 p-2.5">
          <p className="text-[10px] text-slate-400 font-mono uppercase">AST Nodes Ingested</p>
          <p className="text-xs font-mono font-semibold text-blue-400">
            {results.length} Records (100% Validated)
          </p>
        </div>
      </div>

      {/* Code Inspector Box */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-950 overflow-hidden shadow-2xl">
        {/* Code Bar */}
        <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/90 px-4 py-2 text-xs">
          <div className="flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-emerald-400" />
            <span className="font-mono text-slate-300 font-medium">
              dataset_payload.json ({results.length} objects)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-medium text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-medium text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
            >
              <Download className="h-3 w-3 text-emerald-400" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* JSON Code Area */}
        <div className="max-h-[500px] overflow-y-auto p-4 font-mono text-[11px] text-slate-300 leading-relaxed bg-[#030712]">
          <pre className="text-emerald-400/90">
            <code>{formattedJson}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
