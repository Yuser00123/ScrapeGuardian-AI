import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockUser, mockWorkspace } from '../../data/mockData';
import {
  User,
  Building2,
  Sparkles,
  Globe,
  Bell,
  Webhook,
  Check,
  Key,
  Shield,
  Save,
  Radio,
  RefreshCw,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const SettingsView: React.FC = () => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'workspace' | 'ai' | 'brightdata' | 'notifications' | 'integrations'>('brightdata');

  // Form states
  const [apiKey, setApiKey] = useState(mockWorkspace.brightDataConfig.apiKeyMasked);
  const [zone, setZone] = useState(mockWorkspace.brightDataConfig.customerZone);
  const [network, setNetwork] = useState(mockWorkspace.brightDataConfig.preferredNetwork);
  const [concurrency, setConcurrency] = useState(mockWorkspace.brightDataConfig.concurrencyLimit);
  const [aiModel, setAiModel] = useState('gemini-2.5-flash');
  const [temperature, setTemperature] = useState(0.1);
  const [slackWebhook, setSlackWebhook] = useState('https://hooks.slack.com/services/T00/B00/X984a...');
  const [autoApproval, setAutoApproval] = useState(true);

  const tabs = [
    { id: 'brightdata', label: 'Bright Data Configuration', icon: Globe },
    { id: 'ai', label: 'AI Providers', icon: Sparkles },
    { id: 'workspace', label: 'Workspace', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations & Webhooks', icon: Webhook },
    { id: 'profile', label: 'Profile', icon: User },
  ] as const;

  const handleSave = (sectionName: string) => {
    addToast({
      title: 'Settings Saved',
      description: `${sectionName} parameters updated successfully.`,
      type: 'success',
    });
  };

  const handleTestConnection = (service: string) => {
    addToast({
      title: `Testing ${service} Connection...`,
      description: 'Pinging superproxy handshake socket...',
      type: 'info',
    });
    setTimeout(() => {
      addToast({
        title: `${service} Test Succeeded`,
        description: 'Response time 38ms. Handshake verified 100% OK.',
        type: 'success',
      });
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold tracking-tight text-slate-100 font-mono">
              System Settings & Architecture
            </h2>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-mono font-semibold text-emerald-400 border border-emerald-500/20">
              Enterprise Grade
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Manage Bright Data credentials, AI model hyperparameters, and automated webhook dispatch
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Tabs */}
        <div className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-mono transition-all',
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm font-semibold'
                    : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-200 border border-transparent'
                )}
              >
                <Icon className={cn('h-4 w-4', isActive ? 'text-emerald-400' : 'text-slate-400')} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-md glow-card">
            {/* Bright Data Section */}
            {activeTab === 'brightdata' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-100 font-mono">
                      Bright Data Scraper Studio & Proxy Mesh
                    </h3>
                    <p className="text-xs text-slate-400">
                      Configure your official Bright Data API credentials and superproxy settings
                    </p>
                  </div>
                  <button
                    onClick={() => handleTestConnection('Bright Data')}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-mono text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    <RefreshCw className="h-3 w-3 text-emerald-400" />
                    <span>Test Ping</span>
                  </button>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Scraper Studio API Key
                    </label>
                    <input
                      type="text"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      Encrypted and stored in Firebase Firestore vault.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Customer Zone ID
                      </label>
                      <input
                        type="text"
                        value={zone}
                        onChange={(e) => setZone(e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Preferred Network Type
                      </label>
                      <select
                        value={network}
                        onChange={(e) => setNetwork(e.target.value as any)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="web_unlocker">Web Unlocker (Automated Unblock)</option>
                        <option value="residential">Residential Proxies (72M+ IPs)</option>
                        <option value="mobile">Mobile Proxies (4G/5G ASN)</option>
                        <option value="datacenter">Datacenter Proxies (High Speed)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Concurrency Limit (Parallel Worker Threads)
                    </label>
                    <input
                      type="number"
                      value={concurrency}
                      onChange={(e) => setConcurrency(Number(e.target.value))}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => handleSave('Bright Data Configuration')}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-mono font-semibold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>Save Bright Data Settings</span>
                  </button>
                </div>
              </div>
            )}

            {/* AI Providers Section */}
            {activeTab === 'ai' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-100 font-mono">
                      AI Provider Configuration
                    </h3>
                    <p className="text-xs text-slate-400">
                      Hyperparameters for DOM AST tokenization and selector re-synthesis
                    </p>
                  </div>
                  <button
                    onClick={() => handleTestConnection('Gemini 2.5 Flash')}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-mono text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    <Sparkles className="h-3 w-3 text-blue-400" />
                    <span>Test AI Inference</span>
                  </button>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Primary Self-Healing AI Model
                    </label>
                    <select
                      value={aiModel}
                      onChange={(e) => setAiModel(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="gemini-2.5-flash">Gemini 2.5 Flash (Recommended - Sub-80ms)</option>
                      <option value="gemini-1.5-pro">Gemini 1.5 Pro (Deep AST Multi-Page Reasoning)</option>
                      <option value="custom-endpoint">Custom OpenAI / Claude Compatible Endpoint</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Synthesis Temperature ({temperature})
                    </label>
                    <input
                      type="range"
                      min="0.0"
                      max="0.7"
                      step="0.05"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      Lower temperature guarantees deterministic CSS & XPath selectors.
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-200">Auto-Apply Synthesized Patches</p>
                      <p className="text-[11px] text-slate-400 font-sans">
                        Automatically promote selectors that pass 100% of synthetic validation runs.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoApproval}
                      onChange={(e) => setAutoApproval(e.target.checked)}
                      className="h-4 w-4 accent-emerald-500 rounded"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => handleSave('AI Provider Configuration')}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-mono font-semibold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>Save AI Settings</span>
                  </button>
                </div>
              </div>
            )}

            {/* Workspace Section */}
            {activeTab === 'workspace' && (
              <div className="space-y-5">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-slate-100 font-mono">
                    Workspace & Team Quotas
                  </h3>
                  <p className="text-xs text-slate-400">
                    Manage team seats, plan tier, and data retention limits
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Workspace Name
                    </label>
                    <input
                      type="text"
                      defaultValue={mockWorkspace.name}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Plan Tier
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Enterprise Hackathon Edition"
                      className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-emerald-400 font-bold"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => handleSave('Workspace Settings')}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-mono font-semibold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>Save Workspace</span>
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Section */}
            {activeTab === 'notifications' && (
              <div className="space-y-5">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-slate-100 font-mono">
                    Notification & Alert Webhooks
                  </h3>
                  <p className="text-xs text-slate-400">
                    Receive real-time alerts on competitor price drops, DOM drifts, and self-healing patches
                  </p>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Slack Incoming Webhook URL
                    </label>
                    <input
                      type="text"
                      value={slackWebhook}
                      onChange={(e) => setSlackWebhook(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-slate-300">
                      <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                      <span>Instant Critical Intelligence Alerts</span>
                    </label>

                    <label className="flex items-center gap-2 text-slate-300">
                      <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                      <span>Autonomous Self-Healing Success Reports</span>
                    </label>

                    <label className="flex items-center gap-2 text-slate-300">
                      <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                      <span>Daily Digest & Extraction Rollups</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => handleSave('Notification Channels')}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-mono font-semibold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>Save Notifications</span>
                  </button>
                </div>
              </div>
            )}

            {/* Integrations Section */}
            {activeTab === 'integrations' && (
              <div className="space-y-5">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-slate-100 font-mono">
                    Cloud Storage & Pipeline Destinations
                  </h3>
                  <p className="text-xs text-slate-400">
                    Stream harvested web datasets into your data warehouse
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-200">Firebase Firestore Real-time</p>
                      <p className="text-[10px] text-emerald-400">Connected • Sub-5ms Sync</p>
                    </div>
                    <span className="rounded bg-emerald-500/10 text-emerald-400 px-2 py-0.5 text-[10px] border border-emerald-500/20">
                      ACTIVE
                    </span>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-200">Snowflake & BigQuery Sync</p>
                      <p className="text-[10px] text-slate-400">Continuous Parquet export</p>
                    </div>
                    <button className="rounded border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] text-slate-300 hover:bg-slate-700">
                      Configure
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Section */}
            {activeTab === 'profile' && (
              <div className="space-y-5">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-slate-100 font-mono">
                    User Profile & Security
                  </h3>
                  <p className="text-xs text-slate-400">
                    Manage session credentials and personal preferences
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-base font-mono font-bold text-emerald-400">
                    AV
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 font-mono">{mockUser.displayName}</h4>
                    <p className="text-xs text-slate-400 font-mono">{mockUser.email}</p>
                    <span className="mt-1 inline-block rounded bg-slate-800 px-2 py-0.2 text-[10px] font-mono text-slate-300 uppercase">
                      Role: {mockUser.role}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
