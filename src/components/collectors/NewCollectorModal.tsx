import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CollectorCategory } from '../../types/firestore';
import { X, Sparkles, Globe, Shield, Plus, Trash2, Cpu } from 'lucide-react';

interface NewCollectorModalProps {
  onClose: () => void;
}

export const NewCollectorModal: React.FC<NewCollectorModalProps> = ({ onClose }) => {
  const { addCollector, addToast } = useApp();

  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [urlTemplate, setUrlTemplate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CollectorCategory>('ecommerce');
  const [proxyType, setProxyType] = useState<'residential' | 'datacenter' | 'mobile' | 'web_unlocker'>('web_unlocker');
  const [frequency, setFrequency] = useState<'hourly' | 'daily' | 'weekly'>('hourly');

  // Initial schema fields
  const [fields, setFields] = useState<Array<{ fieldName: string; selector: string; dataType: 'string' | 'number'; required: boolean }>>([
    { fieldName: 'item_title', selector: 'h1.product-title, h1[data-test="title"]', dataType: 'string', required: true },
    { fieldName: 'price_usd', selector: 'span.price, .current-price', dataType: 'number', required: true },
  ]);

  const handleAddField = () => {
    setFields((prev) => [
      ...prev,
      { fieldName: `field_${prev.length + 1}`, selector: 'div.content-element', dataType: 'string', required: false },
    ]);
  };

  const handleRemoveField = (index: number) => {
    if (fields.length <= 1) return;
    setFields((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateField = (index: number, key: string, value: string | boolean) => {
    setFields((prev) =>
      prev.map((f, i) => (i === index ? { ...f, [key]: value } : f))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !domain || !urlTemplate) {
      addToast({
        title: 'Missing Required Fields',
        description: 'Please provide collector name, target domain, and template URL.',
        type: 'warning',
      });
      return;
    }

    addCollector({
      workspaceId: 'ws_bright_01',
      name,
      description: description || `Autonomous scraper monitoring ${domain}`,
      targetDomain: domain.replace(/^https?:\/\//, '').replace(/\/.*$/, ''),
      targetUrlTemplate: urlTemplate,
      category,
      status: 'healthy',
      proxyType,
      schedule: {
        frequency,
        timezone: 'UTC',
        nextScheduledRun: new Date(Date.now() + 3600000).toISOString(),
      },
      schema: fields.map((f) => ({
        fieldName: f.fieldName,
        selector: f.selector,
        selectorType: 'css',
        dataType: f.dataType,
        required: f.required,
        confidenceScore: 0.98,
      })),
      tags: [category.toUpperCase(), proxyType.toUpperCase()],
    });

    onClose();
  };

  // Presets
  const applyPreset = (type: 'amazon' | 'jobs' | 'pricing') => {
    if (type === 'amazon') {
      setName('Amazon Electronics & Deals Observer');
      setDomain('amazon.com');
      setUrlTemplate('https://www.amazon.com/s?k=wireless+earbuds');
      setDescription('Monitors real-time BuyBox pricing, review velocity, and stock levels.');
      setCategory('pricing');
      setProxyType('residential');
      setFields([
        { fieldName: 'product_title', selector: 'h2 a span', dataType: 'string', required: true },
        { fieldName: 'price_usd', selector: 'span.a-price-whole', dataType: 'number', required: true },
        { fieldName: 'rating_score', selector: 'i.a-icon-star-small span', dataType: 'number', required: false },
      ]);
    } else if (type === 'jobs') {
      setName('LinkedIn Enterprise Tech Hires');
      setDomain('linkedin.com');
      setUrlTemplate('https://www.linkedin.com/jobs/search/?keywords=AI+Engineer');
      setDescription('Tracks AI talent recruitment trends and open positions.');
      setCategory('jobs');
      setProxyType('web_unlocker');
      setFields([
        { fieldName: 'job_title', selector: 'h3.base-search-card__title', dataType: 'string', required: true },
        { fieldName: 'company_name', selector: 'h4.base-search-card__subtitle', dataType: 'string', required: true },
        { fieldName: 'location', selector: 'span.job-search-card__location', dataType: 'string', required: false },
      ]);
    } else {
      setName('Competitor SaaS Tier Matrix');
      setDomain('stripe.com');
      setUrlTemplate('https://stripe.com/pricing');
      setDescription('Monitors payment processing fee tiers and enterprise discounts.');
      setCategory('pricing');
      setProxyType('datacenter');
      setFields([
        { fieldName: 'plan_tier', selector: 'div.plan-name', dataType: 'string', required: true },
        { fieldName: 'rate_percentage', selector: 'span.rate-percentage', dataType: 'number', required: true },
      ]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl transition-all max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 p-5">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2 text-emerald-400">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 font-mono">
                Provision New Bright Data Collector
              </h3>
              <p className="text-xs text-slate-400">
                Configure autonomous scraping targets with self-healing fallback schemas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Quick Presets */}
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase font-mono mb-2">
              Auto-Fill Quick Presets
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => applyPreset('amazon')}
                className="rounded-lg border border-slate-800 bg-slate-950/60 p-2 text-left hover:border-emerald-500/40 hover:bg-slate-800 transition-all text-xs"
              >
                <p className="font-semibold text-slate-200 font-mono">E-Commerce</p>
                <p className="text-[10px] text-slate-400">Amazon GPU Store</p>
              </button>

              <button
                type="button"
                onClick={() => applyPreset('jobs')}
                className="rounded-lg border border-slate-800 bg-slate-950/60 p-2 text-left hover:border-emerald-500/40 hover:bg-slate-800 transition-all text-xs"
              >
                <p className="font-semibold text-slate-200 font-mono">Job Feeds</p>
                <p className="text-[10px] text-slate-400">LinkedIn AI Hires</p>
              </button>

              <button
                type="button"
                onClick={() => applyPreset('pricing')}
                className="rounded-lg border border-slate-800 bg-slate-950/60 p-2 text-left hover:border-emerald-500/40 hover:bg-slate-800 transition-all text-xs"
              >
                <p className="font-semibold text-slate-200 font-mono">Pricing Index</p>
                <p className="text-[10px] text-slate-400">SaaS Tier Monitor</p>
              </button>
            </div>
          </div>

          {/* Collector Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 font-mono mb-1">
                Collector Name *
              </label>
              <input
                type="text"
                placeholder="e.g. NVIDIA H100 Spot Price Observer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 font-mono mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CollectorCategory)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none font-mono"
              >
                <option value="ecommerce">E-Commerce & Retail</option>
                <option value="pricing">Pricing & Rates</option>
                <option value="jobs">Jobs & Hiring</option>
                <option value="real_estate">Real Estate & MLS</option>
                <option value="social">Social & Public Feeds</option>
                <option value="custom">Custom API / Docs</option>
              </select>
            </div>
          </div>

          {/* Target Domain & URL Template */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 font-mono mb-1">
                Target Domain *
              </label>
              <input
                type="text"
                placeholder="e.g. amazon.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 font-mono mb-1">
                Target URL Template *
              </label>
              <input
                type="text"
                placeholder="https://www.target.com/search?q={query}"
                value={urlTemplate}
                onChange={(e) => setUrlTemplate(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Proxy & Schedule Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 font-mono mb-1">
                Bright Data Proxy Mesh
              </label>
              <select
                value={proxyType}
                onChange={(e) => setProxyType(e.target.value as 'residential' | 'datacenter' | 'mobile' | 'web_unlocker')}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none font-mono"
              >
                <option value="web_unlocker">Web Unlocker (Automated Anti-Bot)</option>
                <option value="residential">Residential Proxies (72M+ IPs)</option>
                <option value="mobile">Mobile Proxies (3G/4G/5G ASN)</option>
                <option value="datacenter">Datacenter Proxies (High Speed)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 font-mono mb-1">
                Extraction Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as 'hourly' | 'daily' | 'weekly')}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none font-mono"
              >
                <option value="hourly">Hourly (Real-time Pulse)</option>
                <option value="daily">Daily Batch</option>
                <option value="weekly">Weekly Rollup</option>
              </select>
            </div>
          </div>

          {/* Schema Fields */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300 font-mono">
                Extracted Field Selectors ({fields.length})
              </label>
              <button
                type="button"
                onClick={handleAddField}
                className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-mono"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Field</span>
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {fields.map((field, idx) => (
                <div key={idx} className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/60 p-2">
                  <input
                    type="text"
                    placeholder="Field name"
                    value={field.fieldName}
                    onChange={(e) => handleUpdateField(idx, 'fieldName', e.target.value)}
                    className="w-1/3 rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 font-mono"
                  />
                  <input
                    type="text"
                    placeholder="CSS / XPath selector"
                    value={field.selector}
                    onChange={(e) => handleUpdateField(idx, 'selector', e.target.value)}
                    className="flex-1 rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-emerald-400 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField(idx)}
                    disabled={fields.length <= 1}
                    className="text-slate-500 hover:text-rose-400 disabled:opacity-30 p-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-800 px-4 py-2 text-xs font-mono text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-emerald-500 px-5 py-2 text-xs font-mono font-semibold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm"
            >
              Provision Collector
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
