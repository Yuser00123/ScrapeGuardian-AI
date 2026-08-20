/**
 * ScrapeGuardian AI - Provider Health & Telemetry Service
 */

import { ProviderMetric } from '../types/firestore';
import { aiProviderManager } from './aiProvider.service';

export interface ProviderHealthSummary {
  totalProviders: number;
  operationalCount: number;
  degradedCount: number;
  failedCount: number;
  averageLatencyMs: number;
  systemWideSuccessRate: number;
  totalTokensProcessed: number;
  totalEstimatedCostUsd: number;
  activePrimaryModel: string;
}

export class ProviderHealthService {
  private static instance: ProviderHealthService;

  public static getInstance(): ProviderHealthService {
    if (!ProviderHealthService.instance) {
      ProviderHealthService.instance = new ProviderHealthService();
    }
    return ProviderHealthService.instance;
  }

  public getSummary(): ProviderHealthSummary {
    const metrics = aiProviderManager.getAllProviderMetrics();
    const total = metrics.length;
    const operational = metrics.filter((m) => m.status === 'operational').length;
    const degraded = metrics.filter((m) => m.status === 'degraded').length;
    const failed = metrics.filter((m) => m.status === 'failed').length;

    const totalLatency = metrics.reduce((acc, m) => acc + m.latencyMs, 0);
    const avgLatency = Math.round(totalLatency / Math.max(1, total));

    const totalSuccessRates = metrics.reduce((acc, m) => acc + m.successRatePercent, 0);
    const avgSuccessRate = Number((totalSuccessRates / Math.max(1, total)).toFixed(2));

    const totalTokens = metrics.reduce((acc, m) => acc + m.totalTokensProcessed, 0);
    const totalCost = Number(metrics.reduce((acc, m) => acc + m.estimatedCostUsd, 0).toFixed(4));

    const primary = aiProviderManager.getPrimaryProvider();

    return {
      totalProviders: total,
      operationalCount: operational,
      degradedCount: degraded,
      failedCount: failed,
      averageLatencyMs: avgLatency,
      systemWideSuccessRate: avgSuccessRate,
      totalTokensProcessed: totalTokens,
      totalEstimatedCostUsd: totalCost,
      activePrimaryModel: primary.modelName,
    };
  }

  public getMetricsByTier(): Record<string, ProviderMetric[]> {
    const metrics = aiProviderManager.getAllProviderMetrics();
    const grouped: Record<string, ProviderMetric[]> = {};

    metrics.forEach((m) => {
      if (!grouped[m.tier]) {
        grouped[m.tier] = [];
      }
      grouped[m.tier].push(m);
    });

    return grouped;
  }
}

export const providerHealthService = ProviderHealthService.getInstance();
