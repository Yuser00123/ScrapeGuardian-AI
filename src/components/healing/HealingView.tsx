import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HealingJob } from '../../types/firestore';
import { PipelineVisualizer } from './PipelineVisualizer';
import { SelectorPatchCard } from './SelectorPatchCard';
import { HealingLogViewer } from './HealingLogViewer';
import { StatusBadge } from '../common/StatusBadge';
import { formatTimeAgo } from '../../lib/utils';
import {
  Sparkles,
  RefreshCw,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Play,
  Shield,
  Activity,
  Code2,
} from 'lucide-react';

export const HealingView: React.FC = () => {
  const { healingJobs, collectors, setHealingJobs, addToast, setCurrentView } = useApp();
  const [selectedJobId, setSelectedJobId] = useState<string>(healingJobs[0]?.id || '');

  const activeJob = healingJobs.find((j) => j.id === selectedJobId) || healingJobs[0];

  const handleSimulateHealProgress = () => {
    if (!activeJob) return;

    const stagesList = ['detection', 'diagnosis', 'repair', 'validation', 'deployment', 'completed'] as const;
    const currentIndex = stagesList.indexOf(activeJob.currentStage as any);
    const nextIndex = Math.min(currentIndex + 1, stagesList.length - 1);
    const nextStage = stagesList[nextIndex];
    const isFinished = nextStage === 'completed';

    const updatedJob: HealingJob = {
      ...activeJob,
      currentStage: nextStage,
      stageProgressPercent: isFinished ? 100 : Math.min(100, (nextIndex + 1) * 20),
      status: isFinished ? 'succeeded' : 'running',
      completedAt: isFinished ? new Date().toISOString() : undefined,
      logs: [
        {
          timestamp: new Date().toISOString(),
          stage: nextStage,
          message: isFinished
            ? 'Hot-patch deployed to Bright Data Scraper Studio mesh! 100% extraction recovery.'
            : `Advanced healing pipeline transitioned into stage: ${nextStage.toUpperCase()}.`,
          level: isFinished ? 'success' : 'info',
        },
        ...activeJob.logs,
      ],
    };

    setHealingJobs((prev) =>
      prev.map((j) => (j.id === activeJob.id ? updatedJob : j))
    );

    addToast({
      title: isFinished ? 'Self-Healing Completed!' : 'Pipeline Advanced',
      description: `Job ${activeJob.collectorName} reached stage: ${nextStage.toUpperCase()}`,
      type: isFinished ? 'success' : 'info',
    });
  };

  const handleTriggerNewHeal = () => {
    const broken = collectors.find((c) => c.status === 'broken');
    if (!broken) {
      addToast({
        title: 'All Collectors Healthy',
        description: 'No broken scrapers detected. Open Demo Lab to trigger simulated DOM drifts!',
        type: 'info',
      });
      return;
    }

    const newJob: HealingJob = {
      id: `heal_${Date.now()}`,
      collectorId: broken.id,
      collectorName: broken.name,
      failureId: `fail_${Date.now()}`,
      workspaceId: 'ws_bright_01',
      currentStage: 'detection',
      stageProgressPercent: 20,
      aiModelUsed: 'Gemini 2.5 Flash',
      patchesProposed: [
        {
          fieldName: 'primary_entity',
          oldSelector: 'span.obsolete-class-453',
          newSelector: '//div[contains(@class, "entity-row")]//h3',
          selectorType: 'xpath',
          synthesisConfidence: 0.98,
          testedMatchesCount: 50,
          visualPreviewMatchSnippet: '<h3>Enterprise AI Batch Specification</h3>',
        },
      ],
      syntheticTestsRun: 10,
      syntheticTestsPassed: 10,
      validationScore: 99.2,
      startedAt: new Date().toISOString(),
      status: 'running',
      logs: [
        {
          timestamp: new Date().toISOString(),
          stage: 'detection',
          message: `DOM Drift anomaly triggered on ${broken.name}. Initiating AST re-synthesis.`,
          level: 'warn',
        },
      ],
    };

    setHealingJobs((prev) => [newJob, ...prev]);
    setSelectedJobId(newJob.id);

    addToast({
      title: 'Healing Job Initiated',
      description: `Autonomous agent analyzing AST for ${broken.name}`,
      type: 'info',
    });
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold tracking-tight text-slate-100 font-mono">
              Autonomous Self-Healing Center
            </h2>
            <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-mono font-semibold text-blue-400 border border-blue-500/20 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              AST AI Synthesis
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Zero-downtime website drift detection, selector re-synthesis, and synthetic test validation
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentView('demolab')}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-mono font-medium text-slate-200 hover:bg-slate-700 transition-colors"
          >
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            <span>Interactive Simulator</span>
          </button>

          <button
            onClick={handleTriggerNewHeal}
            className="flex items-center gap-1.5 rounded-lg bg-blue-500 px-3.5 py-2 text-xs font-mono font-semibold text-slate-950 hover:bg-blue-400 transition-colors shadow-sm"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Trigger Self-Heal</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout: Left Job Selector & Right Pipeline Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Healing Jobs List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Active & Recent Healing Sessions ({healingJobs.length})
            </h3>
            <span className="text-[10px] font-mono text-emerald-400">98.4% Success Rate</span>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {healingJobs.map((job) => {
              const isSelected = job.id === activeJob?.id;

              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  className={`cursor-pointer rounded-xl border p-3.5 transition-all ${
                    isSelected
                      ? 'border-blue-500/60 bg-slate-900 shadow-lg ring-1 ring-blue-500/30'
                      : 'border-slate-800/80 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-bold text-slate-100 font-mono">
                      {job.collectorName}
                    </p>
                    <StatusBadge status={job.currentStage} size="sm" />
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Validation Score: <strong className="text-emerald-400">{job.validationScore}%</strong></span>
                    <span>{formatTimeAgo(job.startedAt)}</span>
                  </div>

                  {/* Mini Progress */}
                  <div className="mt-2.5 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${job.stageProgressPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Active Job Deep Inspector */}
        {activeJob && (
          <div className="lg:col-span-2 space-y-5">
            {/* Visual Pipeline */}
            <PipelineVisualizer
              currentStage={activeJob.currentStage}
              progressPercent={activeJob.stageProgressPercent}
            />

            {/* Job Controls Bar */}
            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg p-2 bg-slate-800 border border-slate-700 text-blue-400">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-100 font-mono">
                    AI Engine: {activeJob.aiModelUsed}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Synthetic tests passed: <strong className="text-emerald-400">{activeJob.syntheticTestsPassed} / {activeJob.syntheticTestsRun}</strong>
                  </p>
                </div>
              </div>

              {activeJob.currentStage !== 'completed' && (
                <button
                  onClick={handleSimulateHealProgress}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-1.5 text-xs font-mono font-semibold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>Advance Pipeline Stage</span>
                </button>
              )}
            </div>

            {/* Proposed Patches Section */}
            {activeJob.patchesProposed.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-emerald-400" />
                  <span>Synthesized Replacement Selectors ({activeJob.patchesProposed.length})</span>
                </h4>

                <div className="space-y-2.5">
                  {activeJob.patchesProposed.map((patch, idx) => (
                    <SelectorPatchCard key={idx} patch={patch} />
                  ))}
                </div>
              </div>
            )}

            {/* Live Console Logs */}
            <HealingLogViewer logs={activeJob.logs} />
          </div>
        )}
      </div>
    </div>
  );
};
