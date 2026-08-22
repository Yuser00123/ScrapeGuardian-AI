import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Collector,
  HealingJob,
  IntelligenceReport,
  ActivityLog,
  AppNotification,
  CollectorStatus,
  IntelligenceCategory,
  SearchJob,
  SearchResult,
  DatasetExecution,
  KeywordHistory,
  DomainIntelligence,
  BrightDataStatus,
  AIInsight,
  AIInsightCategory,
  ExecutiveReport,
  ProviderMetric,
  CompetitorAnalysis,
  TrendReport,
  ReliabilityScores,
  ReliabilityEvent,
  AgentMessage,
  AgentSession,
} from '../types/firestore';
import {
  mockCollectors,
  mockHealingJobs,
  mockIntelligenceReports,
  mockActivityLogs,
  mockNotifications,
  mockSearchJobs,
  mockSearchResults,
  mockDatasetExecutions,
  mockKeywordHistory,
  mockDomainIntelligence,
  mockAIInsights,
  mockExecutiveReport,
} from '../data/mockData';
import { searchExecutionService } from '../services/searchExecution.service';
import { brightDataService } from '../services/brightdata.service';
import { aiProviderManager } from '../services/aiProvider.service';
import { providerHealthService } from '../services/providerHealth.service';
import { insightGenerationService } from '../services/insightGeneration.service';
import { reportGenerationService } from '../services/reportGeneration.service';
import { competitorIntelligenceEngine } from '../services/competitorIntelligence.service';
import { trendDetectionEngine } from '../services/trendDetection.service';
import { reliabilityEngine, ReliabilityStage } from '../services/reliability.service';
import { researchAgentService } from '../services/researchAgent.service';

export type AppView = 'landing' | 'dashboard' | 'search-intelligence' | 'collectors' | 'intelligence' | 'healing' | 'history' | 'demolab' | 'settings' | 'inspector';

export type DemoStage = 'healthy' | 'changed' | 'failure' | 'healing' | 'validated' | 'recovered';

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface SearchProgressState {
  stage: string;
  message: string;
  percent: number;
}

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  collectors: Collector[];
  setCollectors: React.Dispatch<React.SetStateAction<Collector[]>>;
  healingJobs: HealingJob[];
  setHealingJobs: React.Dispatch<React.SetStateAction<HealingJob[]>>;
  intelligenceReports: IntelligenceReport[];
  setIntelligenceReports: React.Dispatch<React.SetStateAction<IntelligenceReport[]>>;
  activityLogs: ActivityLog[];
  notifications: AppNotification[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // Search & Bright Data SERP Operations
  searchJobs: SearchJob[];
  currentSearchJob: SearchJob | null;
  searchResults: SearchResult[];
  datasetExecutions: DatasetExecution[];
  keywordHistory: KeywordHistory[];
  domainIntelligence: DomainIntelligence[];
  isSearching: boolean;
  searchProgress: SearchProgressState;
  brightDataStatus: BrightDataStatus;
  runSearch: (
    keyword: string,
    country?: string,
    language?: string,
    limit?: number,
    searchType?: 'organic' | 'news' | 'shopping' | 'jobs' | 'images'
  ) => Promise<void>;
  loadPreviousSearch: (jobId: string) => void;
  clearSearchHistory: () => void;
  
  // Collector operations
  triggerCollectorRun: (id: string) => void;
  toggleCollectorStatus: (id: string) => void;
  addCollector: (newCol: Omit<Collector, 'id' | 'createdAt' | 'updatedAt' | 'totalRuns' | 'successfulRuns' | 'failedRuns' | 'successRate' | 'totalRecordsHarvested' | 'lastRunAt' | 'lastSuccessAt'>) => void;
  deleteCollector: (id: string) => void;
  
  // Intelligence operations
  togglePinReport: (id: string) => void;
  selectedCategory: IntelligenceCategory | 'all';
  setSelectedCategory: (cat: IntelligenceCategory | 'all') => void;

  // Day 3: AI Intelligence Suite
  aiInsights: AIInsight[];
  selectedInsightCategory: AIInsightCategory | 'all';
  setSelectedInsightCategory: (cat: AIInsightCategory | 'all') => void;
  generateInsightsForQuery: (keyword?: string) => Promise<void>;
  isGeneratingInsights: boolean;

  // Day 3: Executive Boardroom Reports
  executiveReports: ExecutiveReport[];
  currentExecutiveReport: ExecutiveReport | null;
  setCurrentExecutiveReport: (report: ExecutiveReport | null) => void;
  generateExecutiveReportForQuery: (keyword?: string) => Promise<ExecutiveReport>;
  isGeneratingReport: boolean;
  exportExecutiveReport: (format: 'pdf' | 'markdown' | 'json' | 'copy') => void;

  // Day 3: Autonomous Research Agent
  agentMessages: AgentMessage[];
  askResearchAgent: (question: string) => Promise<void>;
  isAgentThinking: boolean;
  clearAgentChat: () => void;

  // Day 3: Competitor & Trend Engines
  competitorAnalysis: CompetitorAnalysis | null;
  runCompetitorAnalysis: (keyword?: string) => void;
  trendReport: TrendReport | null;
  runTrendDetection: (keyword?: string) => void;

  // Day 3: Multi-Provider Health Dashboard
  providerMetrics: ProviderMetric[];
  refreshProviderMetrics: () => void;

  // Day 3: Reliability & Self-Healing Lab
  reliabilityScores: ReliabilityScores;
  reliabilityEvents: ReliabilityEvent[];
  reliabilityStage: ReliabilityStage;
  setReliabilityStage: (stage: ReliabilityStage) => void;
  triggerReliabilityStep: () => void;
  resetReliabilityLab: () => void;

  // Demo Lab State & Controls
  demoStage: DemoStage;
  setDemoStage: (stage: DemoStage) => void;
  simulateNextStep: () => void;
  isAutoPlaying: boolean;
  setIsAutoPlaying: (playing: boolean) => void;
  resetDemo: () => void;
  demoLogs: string[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [collectors, setCollectors] = useState<Collector[]>(mockCollectors);
  const [healingJobs, setHealingJobs] = useState<HealingJob[]>(mockHealingJobs);
  const [intelligenceReports, setIntelligenceReports] = useState<IntelligenceReport[]>(mockIntelligenceReports);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(mockActivityLogs);
  const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<IntelligenceCategory | 'all'>('all');

  // Search & Bright Data SERP Intelligence State
  const [searchJobs, setSearchJobs] = useState<SearchJob[]>(mockSearchJobs);
  const [currentSearchJob, setCurrentSearchJob] = useState<SearchJob | null>(mockSearchJobs[0] || null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>(mockSearchResults);
  const [datasetExecutions, setDatasetExecutions] = useState<DatasetExecution[]>(mockDatasetExecutions);
  const [keywordHistory, setKeywordHistory] = useState<KeywordHistory[]>(mockKeywordHistory);
  const [domainIntelligence, setDomainIntelligence] = useState<DomainIntelligence[]>(mockDomainIntelligence);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchProgress, setSearchProgress] = useState<SearchProgressState>({
    stage: 'idle',
    message: '',
    percent: 0,
  });
  const [brightDataStatus, setBrightDataStatus] = useState<BrightDataStatus>({
    datasetConnected: true,
    datasetId: 'gd_l1viktl72bvl7bjuj0',
    datasetName: 'Bright Data Google SERP Real-time Dataset',
    lastExecution: new Date().toISOString(),
    totalRecordsCollected: 148920,
    totalExecutions: 2430,
    apiHealth: 'operational',
    latencyMs: 42,
    successRatePercent: 99.8,
    monthlyQuotaUsed: 284500,
    monthlyQuotaLimit: 1000000,
    activeProxiesCount: 72400000,
    supportedCountriesCount: 195,
  });

  // Day 3: AI Intelligence State
  const [aiInsights, setAiInsights] = useState<AIInsight[]>(mockAIInsights);
  const [selectedInsightCategory, setSelectedInsightCategory] = useState<AIInsightCategory | 'all'>('all');
  const [isGeneratingInsights, setIsGeneratingInsights] = useState<boolean>(false);

  // Day 3: Executive Boardroom Reports State
  const [executiveReports, setExecutiveReports] = useState<ExecutiveReport[]>([mockExecutiveReport]);
  const [currentExecutiveReport, setCurrentExecutiveReport] = useState<ExecutiveReport | null>(mockExecutiveReport);
  const [isGeneratingReport, setIsGeneratingReport] = useState<boolean>(false);

  // Day 3: Multi-Provider Health State
  const [providerMetrics, setProviderMetrics] = useState<ProviderMetric[]>(
    aiProviderManager.getAllProviderMetrics()
  );

  // Day 3: Competitor & Trend Analysis State
  const [competitorAnalysis, setCompetitorAnalysis] = useState<CompetitorAnalysis | null>(() =>
    competitorIntelligenceEngine.analyzeCompetitors(mockSearchJobs[0]?.keyword || 'Electric vehicles', mockSearchResults, mockDomainIntelligence)
  );
  const [trendReport, setTrendReport] = useState<TrendReport | null>(() =>
    trendDetectionEngine.detectTrends(mockSearchJobs[0]?.keyword || 'Electric vehicles', mockSearchResults, mockDomainIntelligence)
  );

  // Day 3: Autonomous Research Agent Chat
  const [agentMessages, setAgentMessages] = useState<AgentMessage[]>([
    {
      id: 'msg_seed_01',
      role: 'assistant',
      content: `Welcome to **ScrapeGuardian AI Autonomous Research Agent**.\n\nI am connected directly to live **Bright Data Google SERP Datasets** and multi-model reasoning routers. Ask me anything about competitor market shares, ranking velocity, or emerging keyword dynamics.`,
      timestamp: new Date().toISOString(),
      confidenceScore: 0.99,
      providerUsed: 'gemini-3.7-flash',
      sourcesCount: mockSearchResults.length,
      reasoningSummary: 'Initialized session grounded on active search dataset cache.',
    },
  ]);
  const [isAgentThinking, setIsAgentThinking] = useState<boolean>(false);

  // Day 3: Reliability & Self-Healing State
  const [reliabilityScores, setReliabilityScores] = useState<ReliabilityScores>(
    reliabilityEngine.getReliabilityScores()
  );
  const [reliabilityEvents, setReliabilityEvents] = useState<ReliabilityEvent[]>(
    reliabilityEngine.getRecentReliabilityEvents()
  );
  const [reliabilityStage, setReliabilityStage] = useState<ReliabilityStage>('healthy');

  // Demo Lab Simulation
  const [demoStage, setDemoStage] = useState<DemoStage>('healthy');
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [demoLogs, setDemoLogs] = useState<string[]>([
    '[SYSTEM INIT] ScrapeGuardian AI Mesh Engine online.',
    '[BRIGHT DATA] Residential proxy superproxy tunnel connected to target domain.',
    '[COLLECTOR] Running continuous ingestion loop at 100% extraction fidelity.',
  ]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast({
      title: 'Notifications cleared',
      description: 'All pending notifications marked as read.',
      type: 'info',
    });
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const refreshProviderMetrics = () => {
    setProviderMetrics(aiProviderManager.getAllProviderMetrics());
  };

  // Day 3: Generate AI Insights
  const generateInsightsForQuery = async (keyword?: string) => {
    const targetKeyword = keyword || currentSearchJob?.keyword || searchJobs[0]?.keyword || 'Electric vehicles';
    setIsGeneratingInsights(true);

    try {
      const generated = await insightGenerationService.generateFullIntelligenceSuite(
        targetKeyword,
        searchResults,
        domainIntelligence,
        currentSearchJob?.id
      );

      setAiInsights(generated);
      refreshProviderMetrics();

      addToast({
        title: 'AI Insights Generated',
        description: `Synthesized ${generated.length} strategic intelligence layers for "${targetKeyword}".`,
        type: 'success',
      });
    } catch (err: any) {
      addToast({
        title: 'Insight Generation Failed',
        description: err?.message || 'Error executing multi-provider AI pipeline.',
        type: 'error',
      });
    } finally {
      setIsGeneratingInsights(false);
    }
  };

  // Day 3: Generate Executive Report
  const generateExecutiveReportForQuery = async (keyword?: string): Promise<ExecutiveReport> => {
    const targetKeyword = keyword || currentSearchJob?.keyword || searchJobs[0]?.keyword || 'Electric vehicles';
    setIsGeneratingReport(true);

    try {
      const report = await reportGenerationService.generateExecutiveReport(
        targetKeyword,
        searchResults,
        domainIntelligence,
        currentSearchJob?.id
      );

      setExecutiveReports((prev) => [report, ...prev]);
      setCurrentExecutiveReport(report);
      refreshProviderMetrics();

      addToast({
        title: 'Executive Report Created',
        description: `Boardroom briefing generated for "${targetKeyword}".`,
        type: 'success',
      });

      return report;
    } catch (err: any) {
      addToast({
        title: 'Report Generation Failed',
        description: err?.message || 'Failed to synthesize executive report.',
        type: 'error',
      });
      throw err;
    } finally {
      setIsGeneratingReport(false);
    }
  };

  // Day 3: Export Report
  const exportExecutiveReport = (format: 'pdf' | 'markdown' | 'json' | 'copy') => {
    if (!currentExecutiveReport) return;

    if (format === 'markdown') {
      const md = reportGenerationService.exportToMarkdown(currentExecutiveReport);
      const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `executive_report_${currentExecutiveReport.keyword.replace(/\s+/g, '_')}.md`;
      a.click();
      URL.revokeObjectURL(a.href);
      addToast({ title: 'Markdown Exported', description: 'Executive brief saved as .md file.', type: 'info' });
    } else if (format === 'json') {
      const json = JSON.stringify(currentExecutiveReport, null, 2);
      const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `executive_report_${currentExecutiveReport.keyword.replace(/\s+/g, '_')}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
      addToast({ title: 'JSON Exported', description: 'Raw intelligence payload saved.', type: 'info' });
    } else if (format === 'copy') {
      navigator.clipboard?.writeText(reportGenerationService.exportToMarkdown(currentExecutiveReport));
      addToast({ title: 'Report Copied', description: 'Copied executive summary to clipboard.', type: 'success' });
    } else if (format === 'pdf') {
      window.print();
    }
  };

  // Day 3: Ask Research Agent
  const askResearchAgent = async (question: string) => {
    if (!question.trim()) return;

    const userMsg: AgentMessage = {
      id: `msg_user_${Date.now()}`,
      role: 'user',
      content: question,
      timestamp: new Date().toISOString(),
    };

    setAgentMessages((prev) => [...prev, userMsg]);
    setIsAgentThinking(true);

    try {
      const response = await researchAgentService.askAgent(
        question,
        currentSearchJob?.keyword || searchJobs[0]?.keyword || 'Electric vehicles',
        searchResults,
        domainIntelligence,
        agentMessages
      );

      setAgentMessages((prev) => [...prev, response]);
      refreshProviderMetrics();
    } catch (err: any) {
      addToast({
        title: 'Agent Response Failed',
        description: err?.message || 'Agent reasoning pipeline encountered a fault.',
        type: 'error',
      });
    } finally {
      setIsAgentThinking(false);
    }
  };

  const clearAgentChat = () => {
    setAgentMessages([
      {
        id: `msg_reset_${Date.now()}`,
        role: 'assistant',
        content: `Chat session reset. Ready to analyze Bright Data SERP datasets for **"${currentSearchJob?.keyword || searchJobs[0]?.keyword || 'Electric vehicles'}"**.`,
        timestamp: new Date().toISOString(),
        confidenceScore: 0.99,
        providerUsed: 'gemini-3.7-flash',
      },
    ]);
  };

  const runCompetitorAnalysis = (keyword?: string) => {
    const kw = keyword || currentSearchJob?.keyword || searchJobs[0]?.keyword || 'Electric vehicles';
    const analysis = competitorIntelligenceEngine.analyzeCompetitors(kw, searchResults, domainIntelligence);
    setCompetitorAnalysis(analysis);
  };

  const runTrendDetection = (keyword?: string) => {
    const kw = keyword || currentSearchJob?.keyword || searchJobs[0]?.keyword || 'Electric vehicles';
    const trends = trendDetectionEngine.detectTrends(kw, searchResults, domainIntelligence);
    setTrendReport(trends);
  };

  // Day 3: Reliability Lab Controls
  const triggerReliabilityStep = () => {
    const order: ReliabilityStage[] = [
      'healthy',
      'simulated_failure',
      'detection',
      'ai_diagnosis',
      'repair_recommendation',
      'validation',
      'recovery',
    ];
    const currentIdx = order.indexOf(reliabilityStage);
    const nextIdx = (currentIdx + 1) % order.length;
    const nextStage = order[nextIdx];
    setReliabilityStage(nextStage);

    if (nextStage === 'recovery') {
      addToast({
        title: 'Self-Healing Loop Completed',
        description: 'Zero-downtime hot-patch verified across 50 test nodes in 680ms.',
        type: 'success',
      });
    } else if (nextStage === 'simulated_failure') {
      addToast({
        title: 'DOM Drift Injected',
        description: 'Simulated obfuscated CSS change on target page.',
        type: 'warning',
      });
    }
  };

  const resetReliabilityLab = () => {
    setReliabilityStage('healthy');
    addToast({ title: 'Reliability Lab Reset', description: 'Healthy baseline restored.', type: 'info' });
  };

  const triggerCollectorRun = (id: string) => {
    const target = collectors.find((c) => c.id === id);
    if (!target) return;

    addToast({
      title: `Dispatched collector run`,
      description: `Targeting ${target.name} via Bright Data ${target.proxyType} network...`,
      type: 'info',
    });

    setTimeout(() => {
      setCollectors((prev) =>
        prev.map((c) => {
          if (c.id === id) {
            const addedRecords = searchResults.length || 100;
            return {
              ...c,
              totalRuns: c.totalRuns + 1,
              successfulRuns: c.successfulRuns + 1,
              totalRecordsHarvested: c.totalRecordsHarvested + addedRecords,
              lastRunAt: new Date().toISOString(),
              lastSuccessAt: new Date().toISOString(),
            };
          }
          return c;
        })
      );

      const newLog: ActivityLog = {
        id: `act_${Date.now()}`,
        workspaceId: 'ws_bright_01',
        actor: { type: 'bright_data_webhook', id: 'bd_mesh', name: 'Bright Data Scraper Studio' },
        action: `Manual run completed on ${target.name}`,
        targetType: 'collector',
        targetId: target.id,
        targetName: target.name,
        status: 'success',
        timestamp: new Date().toISOString(),
        details: `Harvested fresh payload with 100% schema validation score.`,
      };
      setActivityLogs((prev) => [newLog, ...prev]);

      addToast({
        title: `Extraction Successful`,
        description: `${target.name} harvested records successfully without DOM errors.`,
        type: 'success',
      });
    }, 1200);
  };

  const toggleCollectorStatus = (id: string) => {
    setCollectors((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus: CollectorStatus = c.status === 'paused' ? 'healthy' : 'paused';
          addToast({
            title: `Collector status updated`,
            description: `${c.name} is now ${nextStatus.toUpperCase()}.`,
            type: nextStatus === 'healthy' ? 'success' : 'warning',
          });
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const addCollector = (newColData: Omit<Collector, 'id' | 'createdAt' | 'updatedAt' | 'totalRuns' | 'successfulRuns' | 'failedRuns' | 'successRate' | 'totalRecordsHarvested' | 'lastRunAt' | 'lastSuccessAt'>) => {
    const newCollector: Collector = {
      ...newColData,
      id: `col_${Date.now()}`,
      totalRuns: 0,
      successfulRuns: 0,
      failedRuns: 0,
      successRate: 100,
      totalRecordsHarvested: 0,
      lastRunAt: new Date().toISOString(),
      lastSuccessAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCollectors((prev) => [newCollector, ...prev]);

    const newLog: ActivityLog = {
      id: `act_${Date.now()}`,
      workspaceId: 'ws_bright_01',
      actor: { type: 'user', id: 'usr_staff_01', name: 'Alex Vance' },
      action: `Created new collector ${newCollector.name}`,
      targetType: 'collector',
      targetId: newCollector.id,
      targetName: newCollector.name,
      status: 'success',
      timestamp: new Date().toISOString(),
      details: `Configured for ${newCollector.targetDomain} using Bright Data ${newCollector.proxyType} proxy mesh.`,
    };
    setActivityLogs((prev) => [newLog, ...prev]);

    addToast({
      title: 'Collector Provisioned',
      description: `${newCollector.name} added to autonomous ingestion pool.`,
      type: 'success',
    });
  };

  const deleteCollector = (id: string) => {
    const target = collectors.find((c) => c.id === id);
    setCollectors((prev) => prev.filter((c) => c.id !== id));
    if (target) {
      addToast({
        title: 'Collector Deleted',
        description: `${target.name} has been removed from workspace.`,
        type: 'info',
      });
    }
  };

  const togglePinReport = (id: string) => {
    setIntelligenceReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, pinned: !r.pinned } : r))
    );
  };

  // Demo Lab Simulation Stepper
  const demoStagesList: DemoStage[] = ['healthy', 'changed', 'failure', 'healing', 'validated', 'recovered'];

  const simulateNextStep = () => {
    const currentIndex = demoStagesList.indexOf(demoStage);
    const nextIndex = (currentIndex + 1) % demoStagesList.length;
    const nextStage = demoStagesList[nextIndex];
    setDemoStage(nextStage);

    const logMap: Record<DemoStage, string> = {
      healthy: '[STAGE: HEALTHY] Target e-commerce store operating normally. Selectors: h2.product-title, span.price.',
      changed: '[STAGE: WEBSITE CHANGED] Target vendor deployed Next.js v15 redesign! Obfuscated CSS class hash changed to `._prod_title_9x7a`.',
      failure: '[STAGE: FAILURE DETECTED] Collector parser returned 0 records! Anomaly triggered DOM Drift Alert (Score: 0.94).',
      healing: '[STAGE: HEALING TRIGGERED] Gemini 2.5 Flash Autonomous Agent analyzing DOM tree diff & generating semantic CSS/XPath patches.',
      validated: '[STAGE: VALIDATION PASSED] 10/10 Synthetic test queries through Bright Data Web Unlocker succeeded with 100% schema match!',
      recovered: '[STAGE: RECOVERED] Zero-downtime hot patch deployed to Scraper Studio runtime! Zero data lost.',
    };

    setDemoLogs((prev) => [logMap[nextStage], ...prev.slice(0, 15)]);

    addToast({
      title: `Demo Lab: ${nextStage.toUpperCase()}`,
      description: logMap[nextStage].split('] ')[1],
      type: nextStage === 'failure' ? 'error' : nextStage === 'recovered' || nextStage === 'validated' ? 'success' : 'info',
    });
  };

  const resetDemo = () => {
    setDemoStage('healthy');
    setIsAutoPlaying(false);
    setDemoLogs([
      '[SYSTEM RESET] Demo Lab reset to baseline state.',
      '[COLLECTOR] Operating in healthy baseline mode.',
    ]);
    addToast({
      title: 'Demo Lab Reset',
      description: 'Control room returned to Healthy Website baseline state.',
      type: 'info',
    });
  };

  // Search Operations Handler
  const runSearch = async (
    keyword: string,
    country = 'US',
    language = 'en',
    limit = 100,
    searchType: 'organic' | 'news' | 'shopping' | 'jobs' | 'images' = 'organic'
  ) => {
    if (!keyword.trim()) {
      addToast({
        title: 'Keyword required',
        description: 'Please enter a search query or select an example preset.',
        type: 'warning',
      });
      return;
    }

    setIsSearching(true);
    setSearchProgress({
      stage: 'initiating',
      message: `Connecting to Bright Data SERP Dataset (${brightDataStatus.datasetId})...`,
      percent: 15,
    });

    const startLog: ActivityLog = {
      id: `act_start_${Date.now()}`,
      workspaceId: 'ws_bright_01',
      actor: { type: 'user', id: 'usr_staff_01', name: 'Alex Vance' },
      action: `Search Started: "${keyword}"`,
      targetType: 'search_job',
      targetId: `job_${Date.now()}`,
      targetName: keyword,
      status: 'info',
      timestamp: new Date().toISOString(),
      details: `Dispatched request targeting country ${country} (${language}) with ${limit} limit.`,
    };
    setActivityLogs((prev) => [startLog, ...prev]);

    try {
      const executionResult = await searchExecutionService.executeSearch({
        keyword,
        country,
        language,
        resultLimit: limit,
        searchType,
        onProgress: (stage, message, percent) => {
          setSearchProgress({ stage, message, percent });
        },
      });

      const { job, results, domainIntelligence: dIntel, execution, intelligenceReport } = executionResult;

      // Update state
      setCurrentSearchJob(job);
      setSearchJobs((prev) => [job, ...prev.filter((j) => j.id !== job.id)]);
      setSearchResults(results);
      setDomainIntelligence(dIntel);
      setDatasetExecutions((prev) => [execution, ...prev]);

      if (intelligenceReport) {
        setIntelligenceReports((prev) => [intelligenceReport, ...prev]);
      }

      // Update Keyword History
      const topDomainObj = dIntel[0] || { domain: 'google.com', visibilityScore: 100 };
      setKeywordHistory((prev) => {
        const existing = prev.find((k) => k.keyword.toLowerCase() === keyword.toLowerCase());
        if (existing) {
          return prev.map((k) =>
            k.keyword.toLowerCase() === keyword.toLowerCase()
              ? {
                  ...k,
                  searchCount: k.searchCount + 1,
                  lastSearchedAt: new Date().toISOString(),
                  lastJobId: job.id,
                  topDomain: topDomainObj.domain,
                  topDomainVisibilityScore: topDomainObj.visibilityScore,
                }
              : k
          );
        } else {
          const newKwh: KeywordHistory = {
            id: `kwh_${Date.now()}`,
            workspaceId: 'ws_bright_01',
            keyword,
            country,
            language,
            searchCount: 1,
            lastSearchedAt: new Date().toISOString(),
            lastJobId: job.id,
            averageResultsCount: results.length,
            topDomain: topDomainObj.domain,
            topDomainVisibilityScore: topDomainObj.visibilityScore,
            tags: [searchType.toUpperCase(), country],
            recentSnapshotIds: job.snapshotId ? [job.snapshotId] : [],
          };
          return [newKwh, ...prev];
        }
      });

      // Update Bright Data stats
      setBrightDataStatus((prev) => ({
        ...prev,
        lastExecution: new Date().toISOString(),
        totalRecordsCollected: prev.totalRecordsCollected + results.length,
        totalExecutions: prev.totalExecutions + 1,
      }));

      // Record completed activity logs
      const completedLogs: ActivityLog[] = [
        {
          id: `act_exec_${Date.now()}`,
          workspaceId: 'ws_bright_01',
          actor: { type: 'bright_data_webhook', id: 'bd_serp_dataset', name: 'Bright Data SERP Engine' },
          action: `Dataset Executed: Snapshot ${execution.snapshotId}`,
          targetType: 'dataset_execution',
          targetId: execution.id,
          targetName: execution.datasetName,
          status: 'success',
          timestamp: new Date().toISOString(),
          details: `Processed in ${job.executionTimeMs}ms via Residential proxy mesh.`,
        },
        {
          id: `act_results_${Date.now() + 1}`,
          workspaceId: 'ws_bright_01',
          actor: { type: 'system_agent', id: 'sg_mesh', name: 'ScrapeGuardian Intelligence Core' },
          action: `Results Stored: ${results.length} SERP records for "${keyword}"`,
          targetType: 'search_result',
          targetId: job.id,
          targetName: keyword,
          status: 'success',
          timestamp: new Date().toISOString(),
          details: `Grouped into ${dIntel.length} domain intelligence cards with full AST schemas.`,
        },
      ];
      setActivityLogs((prev) => [...completedLogs, ...prev]);

      addToast({
        title: 'Search Completed',
        description: `Ingested ${results.length} live SERP records for "${keyword}" in ${job.executionTimeMs}ms.`,
        type: 'success',
      });
    } catch (err: any) {
      addToast({
        title: 'Search Execution Error',
        description: err.message || 'Failed to complete SERP dataset query.',
        type: 'error',
      });
    } finally {
      setIsSearching(false);
    }
  };

  const loadPreviousSearch = (jobId: string) => {
    const targetJob = searchJobs.find((j) => j.id === jobId);
    if (!targetJob) return;

    setCurrentSearchJob(targetJob);
    // Filter matching results or regenerate if needed
    const matching = searchResults.filter((r) => r.jobId === jobId);
    if (matching.length > 0) {
      setSearchResults(matching);
      setDomainIntelligence(searchExecutionService['serpDatasetService' as any]?.calculateDomainIntelligence?.(matching) || domainIntelligence);
    }

    addToast({
      title: 'Loaded Previous Search',
      description: `Viewing snapshot for "${targetJob.keyword}" (${targetJob.country}).`,
      type: 'info',
    });
  };

  const clearSearchHistory = () => {
    setSearchJobs([]);
    setKeywordHistory([]);
    addToast({
      title: 'Search History Cleared',
      description: 'Historical query logs reset.',
      type: 'info',
    });
  };

  // Auto-play timer for demo lab
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        simulateNextStep();
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, demoStage]);

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        collectors,
        setCollectors,
        healingJobs,
        setHealingJobs,
        intelligenceReports,
        setIntelligenceReports,
        activityLogs,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        toasts,
        addToast,
        removeToast,
        searchJobs,
        currentSearchJob,
        searchResults,
        datasetExecutions,
        keywordHistory,
        domainIntelligence,
        isSearching,
        searchProgress,
        brightDataStatus,
        runSearch,
        loadPreviousSearch,
        clearSearchHistory,
        triggerCollectorRun,
        toggleCollectorStatus,
        addCollector,
        deleteCollector,
        togglePinReport,
        selectedCategory,
        setSelectedCategory,
        demoStage,
        setDemoStage,
        simulateNextStep,
        isAutoPlaying,
        setIsAutoPlaying,
        resetDemo,
        demoLogs,

        // Day 3
        aiInsights,
        selectedInsightCategory,
        setSelectedInsightCategory,
        generateInsightsForQuery,
        isGeneratingInsights,
        executiveReports,
        currentExecutiveReport,
        setCurrentExecutiveReport,
        generateExecutiveReportForQuery,
        isGeneratingReport,
        exportExecutiveReport,
        agentMessages,
        askResearchAgent,
        isAgentThinking,
        clearAgentChat,
        competitorAnalysis,
        runCompetitorAnalysis,
        trendReport,
        runTrendDetection,
        providerMetrics,
        refreshProviderMetrics,
        reliabilityScores,
        reliabilityEvents,
        reliabilityStage,
        setReliabilityStage,
        triggerReliabilityStep,
        resetReliabilityLab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
