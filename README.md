# ScrapeGuardian AI

ScrapeGuardian AI is a web intelligence platform that turns real-time search engine data into structured market insights and executive briefings. It helps founders, marketers, and analysts monitor competitors, detect market shifts, and identify emerging industry trends without maintaining fragile custom scrapers. By combining Bright Data's reliable data collection with multi-model AI synthesis, the platform delivers clean data and actionable business summaries in seconds.

**Live Demo:** [https://scrapeguardian-ai.ai.studio/](https://scrapeguardian-ai.ai.studio/)  
**Demo Video:** [https://youtube.com/shorts/9M3Z3JURllk?si=-Zn1rEQff-4kb7Q6](https://youtube.com/shorts/9M3Z3JURllk?si=-Zn1rEQff-4kb7Q6)

## Problem

- Businesses spend hours manually tracking competitors across search engines and public websites.
- Raw HTML and unorganized search data are messy, inconsistent, and hard to interpret.
- Traditional scraping scripts break constantly due to layout changes, bot detection, and rate limits.
- Leadership teams need clear, high-level summaries rather than thousands of unformatted data points.

## Solution

ScrapeGuardian AI automates the entire web data pipeline from collection to insight delivery:

1. Takes any search query, keyword, or competitor target.
2. Collects structured search results at scale using Bright Data's managed SERP infrastructure.
3. Cleans and stores normalized data in Firestore for instant access and history tracking.
4. Uses frontier AI models to analyze competitor visibility, market share of voice, and trend shifts.
5. Produces ready-to-share executive reports with strategic takeaways in PDF, Markdown, and JSON.

## Bright Data Integration

Bright Data is the foundational data collection engine powering ScrapeGuardian AI. Rather than relying on unreliable custom scrapers, the app uses Bright Data to gather authentic, structured search data across regions, languages, and device types.

```
User Query
    ↓
Bright Data SERP Dataset
    ↓
Structured Search Results
    ↓
Firestore Storage
    ↓
AI Analysis
    ↓
Executive Intelligence Report
```

### What Bright Data Contributes:
- **Google SERP Dataset (`gd_l1viktl72bvl7bjuj0`)**: Fetches search results directly with structured fields (titles, snippets, ranks, URLs, sitelinks, and rich snippets).
- **Proxy Network & Anti-Bot Resolution**: Routes requests through Bright Data's residential proxy network, eliminating CAPTCHAs, IP bans, and geo-blocking.
- **Data Quality & Reliability**: Ensures consistent schema formatting so downstream AI models and analytics dashboards always receive clean, validated inputs.
- **Fast Execution**: Returns structured snapshots quickly, enabling real-time search intelligence and on-demand report generation.

## Features

- **Structured Web Data Collection**: Query Google search results across global locations and receive clean, structured JSON data.
- **Competitor Monitoring**: Automatically map domain visibility, organic rankings, and market share of voice (SOV).
- **Trend Analysis**: Detect rank movements, new market entrants, and keyword volatility over time.
- **Market Intelligence**: Classify search intent, content opportunities, and competitive threats.
- **Executive Reports**: Generate C-suite summaries with strategic recommendations and export to PDF, Markdown, or JSON.
- **Collection Monitoring**: Track collection health, API latency, success rates, and proxy status in real time.
- **Firestore Persistence**: Save queries, structured datasets, analysis history, and generated briefs in persistent storage.

## Architecture

```
User Query
    ↓
Bright Data Dataset (Google SERP API)
    ↓
Structured Output (Normalized AST Nodes)
    ↓
Firestore (Jobs & Collections Storage)
    ↓
AI Analysis (Gemini 3.7 / Groq / Mistral Router)
    ↓
Dashboard (Real-time Visual Analytics)
    ↓
Executive Report (C-Suite Intelligence Brief)
```

## Screenshots

### Dashboard & Real-Time Intelligence Pipeline

![ScrapeGuardian AI Intelligence Platform Dashboard](Screenshot_2026-08-22-14-23-31-86_40deb401b9ffe8e1df2f1cc5ba480b12.jpg)

*Real-time executive dashboard displaying live Bright Data SERP dataset ingress (`gd_l1viktl72bvl7bjuj0`), structured AST nodes, collection reliability metrics, and the end-to-end autonomous transformation pipeline.*

### Structured Output & Intelligence Reports

*(Additional views available in the [Live Demo](https://scrapeguardian-ai.ai.studio/) & [Video Walkthrough](https://youtube.com/shorts/9M3Z3JURllk?si=-Zn1rEQff-4kb7Q6))*

## Demo Video

Watch the demo walkthrough on YouTube:  
**[Watch Demo Video](https://youtube.com/shorts/9M3Z3JURllk?si=-Zn1rEQff-4kb7Q6)**  
`https://youtube.com/shorts/9M3Z3JURllk?si=-Zn1rEQff-4kb7Q6`

## Tech Stack

- **Data Collection**: Bright Data (Google SERP Dataset API & Proxy Network)
- **Database & Storage**: Firestore
- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Recharts
- **Backend**: Node.js, Express.js
- **AI Models**: Google Gemini (3.7 Flash & 3.6 Flash), Groq (LLaMA 3.3 70B), Mistral AI

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/your-username/scrapeguardian-ai.git
cd scrapeguardian-ai
npm install
```

### 2. Configure Environment

Create a `.env` file at the root:

```env
# Bright Data
BRIGHT_DATA_API_KEY=your_bright_data_api_key
BRIGHT_DATA_SERP_DATASET_ID=gd_l1viktl72bvl7bjuj0

# AI Provider
GEMINI_API_KEY=your_gemini_api_key

# Optional Providers
GROQ_API_KEY=your_groq_api_key
MISTRAL_API_KEY=your_mistral_api_key
```

### 3. Run Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Why ScrapeGuardian AI?

- **Built on Real Data Infrastructure**: Uses Bright Data as the primary data backbone, ensuring dependable data extraction without scraper maintenance.
- **Raw Data to Actionable Strategy**: Bridges the gap between messy web data and boardroom-ready executive summaries.
- **Multi-Industry Application**: Works for e-commerce price monitoring, SaaS competitor tracking, SEO market research, and brand sentiment tracking.
- **Reliability-First Architecture**: Features transparent collection monitoring, multi-model AI failover, and persistent cloud storage.

## Scrape-Verse Criteria Alignment

- **Potential Impact**: Saves teams 10+ hours per week by turning hours of manual competitive research into automated, C-suite ready briefs.
- **Creativity**: Connects high-fidelity SERP extraction directly with multi-model AI reasoning to produce instant market concentration and share-of-voice analyses.
- **Technical Excellence**: Built with TypeScript, React 19, Express, and Firestore, featuring resilient AI model failover and secure server-side API proxying.
- **Use of Scraper Studio / Datasets**: Bright Data's SERP Dataset API powers the entire extraction workflow, replacing fragile client-side scrapers with enterprise-grade data feeds.
- **Reliability**: Backed by Bright Data's proxy mesh to prevent blocking, combined with real-time health checks and fallback AI providers.
- **Presentation**: Features an intuitive, accessible dashboard with interactive charts, one-click report exports, and an automated guided tour for judges.
