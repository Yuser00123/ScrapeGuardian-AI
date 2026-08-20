/**
 * ScrapeGuardian AI - Search Result Utilities & Export Service
 * 
 * Provides CSV/JSON export generation, multi-criteria filtering,
 * pagination, and statistical distribution helpers for SERP results.
 */

import { SearchResult, DomainIntelligence } from '../types/firestore';

export class SearchResultService {
  private static instance: SearchResultService;

  public static getInstance(): SearchResultService {
    if (!SearchResultService.instance) {
      SearchResultService.instance = new SearchResultService();
    }
    return SearchResultService.instance;
  }

  /**
   * Exports Search Results array to formatted CSV and triggers browser download
   */
  public exportToCSV(results: SearchResult[], filename = 'scrapeguardian-serp-results.csv'): void {
    if (!results || results.length === 0) return;

    const headers = [
      'Rank',
      'Position',
      'Title',
      'Domain',
      'URL',
      'Description',
      'Rating',
      'Reviews Count',
      'Country',
      'Language',
      'Timestamp',
    ];

    const escapeCSV = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = results.map((r) => [
      r.rank,
      r.position,
      escapeCSV(r.title),
      escapeCSV(r.domain),
      escapeCSV(r.url),
      escapeCSV(r.description),
      r.additionalData?.rating || '',
      r.additionalData?.reviewsCount || '',
      escapeCSV(r.country),
      escapeCSV(r.language),
      escapeCSV(r.timestamp),
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Exports Search Results array to pretty JSON and triggers download
   */
  public exportToJSON(results: SearchResult[], filename = 'scrapeguardian-serp-results.json'): void {
    if (!results || results.length === 0) return;

    const jsonStr = JSON.stringify(results, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Exports Domain Intelligence cards to CSV
   */
  public exportDomainIntelligenceToCSV(domains: DomainIntelligence[], filename = 'scrapeguardian-domain-intel.csv'): void {
    if (!domains || domains.length === 0) return;

    const headers = [
      'Domain',
      'Category',
      'Occurrences',
      'Top Rank',
      'Average Position',
      'Visibility Score (%)',
      'Share of Voice (%)',
      'Trend Score (%)',
      'Has Sitelinks',
    ];

    const escapeCSV = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = domains.map((d) => [
      escapeCSV(d.domain),
      escapeCSV(d.categoryTag || 'Enterprise Web'),
      d.occurrences,
      d.topRank,
      d.averagePosition,
      d.visibilityScore,
      d.shareOfVoice,
      d.trendScore,
      d.hasSiteLinks ? 'Yes' : 'No',
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Copy formatted JSON or plain text to clipboard
   */
  public async copyToClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Filter search results by search string and domain
   */
  public filterResults(
    results: SearchResult[],
    query: string,
    domainFilter = 'all'
  ): SearchResult[] {
    const q = query.trim().toLowerCase();
    return results.filter((r) => {
      const matchesQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.domain.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.url.toLowerCase().includes(q);

      const matchesDomain = domainFilter === 'all' || r.domain === domainFilter;

      return matchesQuery && matchesDomain;
    });
  }

  /**
   * Sort search results by specified key and order
   */
  public sortResults(
    results: SearchResult[],
    sortBy: 'rank' | 'domain' | 'title' | 'position',
    order: 'asc' | 'desc' = 'asc'
  ): SearchResult[] {
    return [...results].sort((a, b) => {
      let comp = 0;
      if (sortBy === 'rank' || sortBy === 'position') {
        comp = a.position - b.position;
      } else if (sortBy === 'domain') {
        comp = a.domain.localeCompare(b.domain);
      } else if (sortBy === 'title') {
        comp = a.title.localeCompare(b.title);
      }

      return order === 'asc' ? comp : -comp;
    });
  }
}

export const searchResultService = SearchResultService.getInstance();
