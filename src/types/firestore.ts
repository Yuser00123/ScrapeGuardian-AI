/**
 * ScrapeGuardian AI - Firestore Architecture Models & Type Definitions
 * 
 * Strict TypeScript models for enterprise autonomous web intelligence
 * collections: users, workspaces, collectors, collectorRuns, 
 * collectorFailures, healingJobs, intelligenceReports, providerUsage,
 * notifications, activityLogs.
 */

export type Timestamp = string; // ISO 8601 string or Firestore Timestamp representation

// ==========================================
// 1. Users Collection
// ==========================================
export type UserRole = 'owner' | 'admin' | 'engineer' | 'viewer';

export interface UserPreferences {
  theme: 'dark';
  emailAlerts: boolean;
  slackAlerts: boolean;
  autoHealingApproval: boolean;
  defaultCollectorIntervalMinutes: number;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  role: UserRole;
  currentWorkspaceId: string;
  accessibleWorkspaces: string[];
  preferences: UserPreferences;
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
}

// ==========================================
// 2. Workspaces Collection
// ==========================================
export type PlanTier = 'starter' | 'pro' | 'enterprise_hackathon';

export interface BrightDataConfig {
  apiKeyMasked: string;
  customerZone: string;
  preferredNetwork: 'residential' | 'datacenter' | 'mobile' | 'web_unlocker';
  scrapingBrowserEndpoint?: string;
  concurrencyLimit: number;
  monthlyBandwidthGbAllocated: number;
  monthlyBandwidthGbUsed: number;
}

export interface AIProviderConfig {
  provider: 'gemini' | 'openai' | 'anthropic';
  modelId: string;
  temperature: number;
  maxTokens: number;
  healingTimeoutSeconds: number;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  plan: PlanTier;
  ownerId: string;
  membersCount: number;
  brightDataConfig: BrightDataConfig;
  aiProviderConfig: AIProviderConfig;
  monthlyCredits: number;
  creditsUsed: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ==========================================
// 3. Collectors Collection
// ==========================================
export type CollectorStatus = 'healthy' | 'degraded' | 'broken' | 'healing' | 'paused';
export type CollectorCategory = 'ecommerce' | 'pricing' | 'jobs' | 'real_estate' | 'social' | 'custom';

export interface ExtractedFieldDefinition {
  fieldName: string;
  selector: string; // CSS or XPath
  selectorType: 'css' | 'xpath' | 'regex' | 'ai_synthesized';
  dataType: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'image_url';
  required: boolean;
  fallbackValue?: string | number | null;
  confidenceScore: number; // 0.0 to 1.0
}

export interface CollectorSchedule {
  frequency: 'realtime' | 'hourly' | 'daily' | 'weekly' | 'cron';
  cronExpression?: string;
  timezone: string;
  nextScheduledRun: Timestamp;
}

export interface Collector {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  targetDomain: string;
  targetUrlTemplate: string;
  category: CollectorCategory;
  status: CollectorStatus;
  proxyType: 'residential' | 'datacenter' | 'mobile' | 'web_unlocker';
  schedule: CollectorSchedule;
  schema: ExtractedFieldDefinition[];
  totalRuns: number;
  successfulRuns: number;
  failedRuns: number;
  successRate: number; // Percentage e.g. 98.5
  totalRecordsHarvested: number;
  lastRunAt: Timestamp;
  lastSuccessAt: Timestamp;
  activeHealingJobId?: string;
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ==========================================
// 4. CollectorRuns Collection
// ==========================================
export type RunTrigger = 'scheduled' | 'manual' | 'healing_test' | 'webhook';
export type RunOutcome = 'success' | 'partial_success' | 'failed' | 'aborted';

export interface CollectorRun {
  id: string;
  collectorId: string;
  workspaceId: string;
  trigger: RunTrigger;
  outcome: RunOutcome;
  startedAt: Timestamp;
  completedAt: Timestamp;
  durationMs: number;
  httpStatusCode: number;
  proxyUsedIp: string;
  proxyCountry: string;
  recordsHarvested: number;
  bytesDownloaded: number;
  schemaValidationPassed: boolean;
  rawHtmlSnapshotUrl?: string;
  errorMessage?: string;
}

// ==========================================
// 5. CollectorFailures Collection
// ==========================================
export type FailureType = 
  | 'dom_drift' 
  | 'anti_bot_challenge' 
  | 'selector_not_found' 
  | 'schema_type_mismatch' 
  | 'http_error' 
  | 'rate_limited';

export interface CollectorFailure {
  id: string;
  collectorId: string;
  runId: string;
  workspaceId: string;
  failureType: FailureType;
  brokenFieldNames: string[];
  brokenSelectors: Record<string, string>;
  domDriftScore: number; // 0 (none) to 1.0 (complete redesign)
  errorSnippet: string;
  domTreeSnippet: string;
  detectedAt: Timestamp;
  autoHealingEligible: boolean;
  status: 'open' | 'investigating' | 'healing_in_progress' | 'resolved' | 'ignored';
}

// ==========================================
// 6. HealingJobs Collection
// ==========================================
export type HealingPipelineStage = 
  | 'detection' 
  | 'diagnosis' 
  | 'repair' 
  | 'validation' 
  | 'deployment'
  | 'completed'
  | 'failed';

export interface SelectorPatch {
  fieldName: string;
  oldSelector: string;
  newSelector: string;
  selectorType: 'css' | 'xpath' | 'ai_synthesized';
  synthesisConfidence: number; // e.g. 0.96
  testedMatchesCount: number;
  visualPreviewMatchSnippet?: string;
}

export interface HealingLogEntry {
  timestamp: Timestamp;
  stage: HealingPipelineStage;
  message: string;
  level: 'info' | 'warn' | 'success' | 'error';
  metadata?: Record<string, unknown>;
}

export interface HealingJob {
  id: string;
  collectorId: string;
  collectorName: string;
  failureId: string;
  workspaceId: string;
  currentStage: HealingPipelineStage;
  stageProgressPercent: number; // 0 to 100
  aiModelUsed: string;
  patchesProposed: SelectorPatch[];
  syntheticTestsRun: number;
  syntheticTestsPassed: number;
  validationScore: number; // 0 to 100
  startedAt: Timestamp;
  completedAt?: Timestamp;
  durationMs?: number;
  status: 'queued' | 'running' | 'succeeded' | 'failed' | 'requires_human_approval';
  logs: HealingLogEntry[];
}

// ==========================================
// 7. IntelligenceReports Collection
// ==========================================
export type IntelligenceCategory = 
  | 'recent_changes' 
  | 'competitor_insights' 
  | 'pricing_changes' 
  | 'feature_changes' 
  | 'documentation_changes';

export type ImpactLevel = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface DiffPayload {
  fieldName: string;
  before: string | number | null;
  after: string | number | null;
  percentageDelta?: number;
}

export interface IntelligenceReport {
  id: string;
  workspaceId: string;
  collectorId: string;
  sourceDomain: string;
  sourceUrl: string;
  category: IntelligenceCategory;
  title: string;
  summary: string;
  detailedAnalysis: string;
  impactLevel: ImpactLevel;
  confidenceScore: number; // e.g. 0.98
  detectedAt: Timestamp;
  diffs: DiffPayload[];
  tags: string[];
  pinned: boolean;
}

// ==========================================
// 8. ProviderUsage Collection
// ==========================================
export interface ProviderUsage {
  id: string;
  workspaceId: string;
  date: string; // YYYY-MM-DD
  brightData: {
    totalRequests: number;
    successfulRequests: number;
    bandwidthBytes: number;
    residentialProxyHits: number;
    datacenterProxyHits: number;
    webUnlockerHits: number;
    estimatedCostUsd: number;
  };
  aiProviders: {
    geminiTokensInput: number;
    geminiTokensOutput: number;
    healingCallsCount: number;
    insightGenerationCallsCount: number;
    estimatedCostUsd: number;
  };
}

// ==========================================
// 9. Notifications Collection
// ==========================================
export type NotificationType = 
  | 'healing_success' 
  | 'healing_failure' 
  | 'critical_insight' 
  | 'collector_down' 
  | 'quota_warning'
  | 'system_update';

export interface AppNotification {
  id: string;
  workspaceId: string;
  userId?: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: Timestamp;
  read: boolean;
  actionUrl?: string;
  metadata?: {
    collectorId?: string;
    healingJobId?: string;
    insightId?: string;
  };
}

// ==========================================
// 10. ActivityLogs Collection
// ==========================================
export interface ActivityLog {
  id: string;
  workspaceId: string;
  actor: {
    type: 'user' | 'system_agent' | 'bright_data_webhook' | 'healing_engine';
    id: string;
    name: string;
    avatar?: string;
  };
  action: string;
  targetType: 'collector' | 'healing_job' | 'intelligence_report' | 'settings' | 'proxy' | 'search_job' | 'dataset_execution' | 'search_result';
  targetId: string;
  targetName: string;
  status: 'success' | 'warning' | 'error' | 'info';
  timestamp: Timestamp;
  details?: string;
}

// ==========================================
// 11. SearchJobs Collection (Bright Data SERP)
// ==========================================
export type SearchJobStatus = 'pending' | 'running' | 'completed' | 'failed';
export type SearchType = 'organic' | 'news' | 'shopping' | 'jobs' | 'images';

export interface SearchJob {
  id: string;
  workspaceId: string;
  keyword: string;
  country: string;
  language: string;
  resultLimit: number;
  searchType: SearchType;
  status: SearchJobStatus;
  datasetId: string;
  snapshotId?: string;
  resultsCount: number;
  executionTimeMs: number;
  costEstimatedUsd?: number;
  createdAt: Timestamp;
  completedAt?: Timestamp;
  error?: string;
  retryCount?: number;
  tags: string[];
}

// ==========================================
// 12. SearchResults Collection
// ==========================================
export interface SearchResultSitelink {
  title: string;
  url: string;
  snippet?: string;
}

export interface SearchResultAdditionalData {
  rating?: number;
  reviewsCount?: number;
  displayedUrl?: string;
  cachedUrl?: string;
  richSnippet?: string;
  isAd?: boolean;
  price?: string;
  datePublished?: string;
  sourceCategory?: string;
}

export interface SearchResult {
  id: string;
  jobId: string;
  keyword: string;
  rank: number;
  position: number;
  title: string;
  url: string;
  domain: string;
  description: string;
  snippet?: string;
  country: string;
  language: string;
  sitelinks?: SearchResultSitelink[];
  additionalData?: SearchResultAdditionalData;
  timestamp: Timestamp;
}

// ==========================================
// 13. DatasetExecutions Collection
// ==========================================
export type DatasetExecutionStatus = 'initiated' | 'collecting' | 'ready' | 'delivered' | 'failed';

export interface DatasetExecution {
  id: string;
  workspaceId: string;
  datasetId: string;
  datasetName: string;
  snapshotId: string;
  keyword: string;
  status: DatasetExecutionStatus;
  recordsCount: number;
  costEstimatedUsd: number;
  durationMs: number;
  timestamp: Timestamp;
  proxyZone: string;
  endpointUrl?: string;
  errorMessage?: string;
}

// ==========================================
// 14. KeywordHistory Collection
// ==========================================
export interface KeywordHistory {
  id: string;
  workspaceId: string;
  keyword: string;
  country: string;
  language: string;
  searchCount: number;
  lastSearchedAt: Timestamp;
  lastJobId: string;
  averageResultsCount: number;
  topDomain: string;
  topDomainVisibilityScore: number;
  tags: string[];
  recentSnapshotIds: string[];
}

// ==========================================
// 15. Domain Intelligence Aggregations
// ==========================================
export interface DomainIntelligence {
  domain: string;
  occurrences: number;
  topRank: number;
  averagePosition: number;
  visibilityScore: number; // 0 to 100
  trendScore: number; // e.g. +14.2 or -3.1
  shareOfVoice: number; // % of total SERP space
  sampleTitles: string[];
  sampleUrls: string[];
  hasSiteLinks: boolean;
  categoryTag?: string;
}

// ==========================================
// 16. Bright Data Status & Metrics
// ==========================================
export interface BrightDataStatus {
  datasetConnected: boolean;
  datasetId: string;
  datasetName: string;
  lastExecution: Timestamp;
  totalRecordsCollected: number;
  totalExecutions: number;
  apiHealth: 'operational' | 'degraded' | 'maintenance';
  latencyMs: number;
  successRatePercent: number;
  monthlyQuotaUsed: number;
  monthlyQuotaLimit: number;
  activeProxiesCount: number;
  supportedCountriesCount: number;
}

// ==========================================
// 17. Multi-Provider AI Architecture
// ==========================================
export type AIModelId =
  | 'gemini-3.7-flash'
  | 'gemini-3.6-flash'
  | 'gemini-3.5-flash'
  | 'gemini-2.5-flash'
  | 'gemini-2.5-pro'
  | 'gemini-2.5-flash-lite'
  | 'gemini-3.1-pro-preview'
  | 'llama-3.1-8b-instant'
  | 'llama-3.3-70b-versatile'
  | 'openai/gpt-oss-120b'
  | 'openai/gpt-oss-20b'
  | 'groq/compound'
  | 'groq/compound-mini'
  | 'command-a-03-2025'
  | 'command-r-plus-08-2024'
  | 'command-r-08-2024'
  | 'c4ai-command-r7b-arx-04-2025'
  | 'mistral-large-2512'
  | 'mistral-medium-2505'
  | 'mistral-medium-2508'
  | 'mistral-medium-latest'
  | 'codestral-2508'
  | 'mistral-small-2603'
  | 'openrouter'
  | 'pollination';

export type ProviderTier = 'Tier 1 Frontier (Google Gemini)' | 'Tier 2 High-Throughput (Meta LLaMA / Groq)' | 'Tier 3 Enterprise (Mistral & Cohere)' | 'Tier 4 Universal Fallback (OpenRouter/Pollination)';

export interface ProviderMetric {
  id: string;
  providerId: string;
  modelName: string;
  tier: ProviderTier;
  status: 'operational' | 'degraded' | 'standby' | 'failed';
  priorityOrder: number;
  latencyMs: number;
  successRatePercent: number;
  totalRequests: number;
  failedRequests: number;
  totalTokensProcessed: number;
  estimatedCostUsd: number;
  lastUsedAt: Timestamp;
  contextWindowTokens: number;
  isPrimary?: boolean;
}

// ==========================================
// 18. AI Insights Collection
// ==========================================
export type AIInsightCategory =
  | 'executive_summary'
  | 'competitor_analysis'
  | 'trend_analysis'
  | 'market_insights'
  | 'risk_signals'
  | 'opportunity_signals'
  | 'key_findings'
  | 'strategic_recommendations';

export interface AIInsight {
  id: string;
  jobId: string;
  keyword: string;
  category: AIInsightCategory;
  title: string;
  summary: string;
  content: string;
  keyPoints: string[];
  confidenceScore: number; // 0.0 - 1.0 (e.g. 0.98)
  sourceCount: number;
  providerUsed: string; // e.g. gemini-2.5-flash
  reasoningSummary: string;
  impactLevel: 'critical' | 'high' | 'medium' | 'low';
  metrics?: { label: string; value: string | number; change?: string }[];
  tags: string[];
  createdAt: Timestamp;
  pinned?: boolean;
}

// ==========================================
// 19. Executive Reports Collection
// ==========================================
export interface ReportVerifiedSource {
  title: string;
  url: string;
  rank: number;
  domain: string;
  snippet?: string;
}

export interface MarketTrendItem {
  trendName: string;
  velocity: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  signalsCount: number;
}

export interface StrategicRecommendationItem {
  title: string;
  action: string;
  priority: 'P0 - Immediate' | 'P1 - Near Term' | 'P2 - Strategic';
  timeframe: string;
  expectedOutcome: string;
}

export interface ExecutiveReport {
  id: string;
  workspaceId: string;
  jobId: string;
  keyword: string;
  title: string;
  subtitle: string;
  executiveSummary: string;
  keyFindings: string[];
  competitorLandscape: {
    marketLeaders: string[];
    emergingChallengers: string[];
    nichePlayers: string[];
    summary: string;
    herfindahlIndexScore: number;
  };
  marketTrends: MarketTrendItem[];
  strategicRecommendations: StrategicRecommendationItem[];
  riskSignals: string[];
  opportunitySignals: string[];
  sources: ReportVerifiedSource[];
  overallConfidenceScore: number;
  providerUsed: string;
  generationDurationMs: number;
  generatedAt: Timestamp;
  downloadsCount: number;
}

// ==========================================
// 20. Competitor Intelligence Analysis
// ==========================================
export interface CompetitorProfile {
  domain: string;
  name: string;
  visibilityScore: number;
  shareOfVoice: number;
  topRank: number;
  averageRank: number;
  category: string;
  strengths: string[];
  weaknesses: string[];
  sampleLandingPage: string;
  trendDelta: number; // e.g. +14.2%
}

export interface CompetitorAnalysis {
  id: string;
  keyword: string;
  totalDomainsAnalyzed: number;
  marketConcentration: 'High Monopoly' | 'Moderate Oligopoly' | 'Fragmented Competitive';
  leaderDominancePercent: number;
  topCompetitors: CompetitorProfile[];
  matrixPositioning: {
    leaders: string[];
    visionaries: string[];
    challengers: string[];
    niche: string[];
  };
  createdAt: Timestamp;
}

// ==========================================
// 21. Trend Detection Reports
// ==========================================
export interface DomainMovementItem {
  domain: string;
  previousRank: number;
  currentRank: number;
  delta: number;
  status: 'rising' | 'falling' | 'stable' | 'new_entrant' | 'churned';
  velocityScore: number;
}

export interface TrendReport {
  id: string;
  keyword: string;
  timeframe: string;
  volatilityIndex: number; // 0 - 100
  newEntrantsCount: number;
  churnedCount: number;
  domainMovements: DomainMovementItem[];
  marketVelocitySummary: string;
  forecastSummary: string;
  createdAt: Timestamp;
}

// ==========================================
// 22. Reliability Engine & Self-Healing Events
// ==========================================
export interface ReliabilityScores {
  overallReliabilityScore: number; // 0 - 100
  healthScore: number; // 0 - 100
  dataQualityScore: number; // 0 - 100
  coverageScore: number; // 0 - 100
  freshnessScore: number; // 0 - 100
  superproxyUptime: number; // e.g. 99.98
  activeSelfHealingPipelines: number;
  autoRepairsTotal: number;
  lastEvaluatedAt: Timestamp;
}

export interface ReliabilityEvent {
  id: string;
  timestamp: Timestamp;
  type:
    | 'dom_drift_detected'
    | 'selector_repaired'
    | 'proxy_failover'
    | 'captcha_cleared'
    | 'schema_validated'
    | 'synthetic_pass';
  severity: 'info' | 'warn' | 'critical' | 'success';
  message: string;
  collectorName?: string;
  domain?: string;
  recoveryTimeMs?: number;
  confidenceScore?: number;
}

// ==========================================
// 23. AI Research Agent Sessions
// ==========================================
export interface AgentMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Timestamp;
  confidenceScore?: number;
  sourcesCount?: number;
  providerUsed?: string;
  reasoningSummary?: string;
  citedSources?: { title: string; url: string; domain: string }[];
}

export interface AgentSession {
  id: string;
  title: string;
  keywordContext: string;
  createdAt: Timestamp;
  lastActiveAt: Timestamp;
  messages: AgentMessage[];
}


