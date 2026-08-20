/**
 * ScrapeGuardian AI - Competitor Intelligence Engine
 * 
 * Deep competitor profiling, market share analysis, positioning matrices,
 * and visibility ranking from Bright Data SERP extractions.
 */

import {
  SearchResult,
  DomainIntelligence,
  CompetitorAnalysis,
  CompetitorProfile,
} from '../types/firestore';

export class CompetitorIntelligenceEngine {
  private static instance: CompetitorIntelligenceEngine;

  public static getInstance(): CompetitorIntelligenceEngine {
    if (!CompetitorIntelligenceEngine.instance) {
      CompetitorIntelligenceEngine.instance = new CompetitorIntelligenceEngine();
    }
    return CompetitorIntelligenceEngine.instance;
  }

  public analyzeCompetitors(
    keyword: string,
    results: SearchResult[],
    domainIntelligence: DomainIntelligence[]
  ): CompetitorAnalysis {
    const totalDomains = domainIntelligence.length;
    const topDomains = domainIntelligence.slice(0, 8);

    const topCompetitors: CompetitorProfile[] = topDomains.map((d, index) => {
      const isLeader = index === 0;
      const isChallenger = index >= 1 && index <= 3;
      const domainResults = results.filter((r) => r.domain === d.domain);

      const strengths: string[] = [];
      const weaknesses: string[] = [];

      if (d.topRank === 1) {
        strengths.push('Owns Rank 1 primary organic placement');
      }
      if (d.hasSiteLinks) {
        strengths.push('Rich sitelinks increase search result pixel height');
      }
      if (d.occurrences > 2) {
        strengths.push(`Multiple ranking landing pages (${d.occurrences} placements)`);
      } else {
        weaknesses.push('Single page vulnerability (no subdomain coverage)');
      }

      if (d.visibilityScore > 80) {
        strengths.push('High brand recognition and keyword relevance');
      } else {
        weaknesses.push('Lower visibility in top 3 rank band');
      }

      return {
        domain: d.domain,
        name: this.formatDomainName(d.domain),
        visibilityScore: d.visibilityScore,
        shareOfVoice: d.shareOfVoice,
        topRank: d.topRank,
        averageRank: d.averagePosition,
        category: isLeader ? 'Market Leader' : isChallenger ? 'Primary Challenger' : 'Niche Specialist',
        strengths: strengths.length > 0 ? strengths : ['Strong domain authority', 'Targeted metadata'],
        weaknesses: weaknesses.length > 0 ? weaknesses : ['Moderate long-tail content coverage'],
        sampleLandingPage: domainResults[0]?.url || `https://${d.domain}`,
        trendDelta: d.trendScore || (isLeader ? +12.5 : isChallenger ? +8.4 : -2.1),
      };
    });

    const leader = topCompetitors[0];
    const leaderShare = leader ? leader.shareOfVoice : 40;

    return {
      id: `comp_anal_${Date.now()}`,
      keyword,
      totalDomainsAnalyzed: totalDomains,
      marketConcentration: leaderShare > 45 ? 'High Monopoly' : leaderShare > 25 ? 'Moderate Oligopoly' : 'Fragmented Competitive',
      leaderDominancePercent: leaderShare,
      topCompetitors,
      matrixPositioning: {
        leaders: topCompetitors.filter((c) => c.visibilityScore >= 75).map((c) => c.domain),
        visionaries: topCompetitors.filter((c) => c.visibilityScore >= 50 && c.visibilityScore < 75).map((c) => c.domain),
        challengers: topCompetitors.filter((c) => c.visibilityScore >= 30 && c.visibilityScore < 50).map((c) => c.domain),
        niche: topCompetitors.filter((c) => c.visibilityScore < 30).map((c) => c.domain),
      },
      createdAt: new Date().toISOString(),
    };
  }

  private formatDomainName(domain: string): string {
    const clean = domain.replace(/^www\./, '').split('.')[0];
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  }
}

export const competitorIntelligenceEngine = CompetitorIntelligenceEngine.getInstance();
