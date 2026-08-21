# 🛡️ ScrapeGuardian AI

> **Autonomous Web Intelligence & Self-Healing Extraction Mesh Engine**  
> Powered by **Bright Data Google SERP Datasets** & **Multi-Model Frontier AI** (*Gemini 2.5/3.7, Groq LLaMA 3.3 70B, Mistral AI, Cohere Command-R+, OpenRouter*).

[![Google AI Studio](https://img.shields.io/badge/Google_AI_Studio-Build-4285F4?logo=google&logoColor=white)](https://ai.studio/build)
[![Bright Data](https://img.shields.io/badge/Bright_Data-SERP_Dataset_gd__l1viktl72bvl7bjuj0-00D084)](https://brightdata.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white)](https://expressjs.com/)

---

## 📖 Overview

**ScrapeGuardian AI** is an enterprise-grade autonomous web intelligence platform designed to eliminate web scraper fragility, solve competitor search blindspots, and synthesize actionable boardroom intelligence from real-time web extractions.

### 🌟 Key Highlights

- 🌐 **Bright Data Ingestion**: Real-time Google SERP harvesting across countries, languages, and device targets with Bright Data's 72M+ residential proxy mesh (`gd_l1viktl72bvl7bjuj0`).
- ⚡ **Multi-Provider AI Waterfall**: Zero-downtime, sub-50ms failover orchestration across **Google Gemini (Tier 1 Primary)**, **Groq LLaMA 3.3 70B (Tier 2 LPPU)**, **Mistral AI**, **Cohere Command-R+**, and **OpenRouter Universal Mesh**.
- 📊 **Executive Boardroom Reporting**: Autonomous generation of strategic C-suite briefings, competitor Share of Voice (SOV) matrices, threat signals, and one-click PDF/Markdown/JSON exports.
- 🔧 **Self-Healing Extraction Lab**: Autonomous DOM drift detection, AST pattern synthesis, and self-repairing CSS/XPath selectors.
- 🏆 **Interactive Judge Guided Demo**: Built-in 7-step interactive walkthrough for live hackathon evaluation.
- 🩺 **System Diagnostic Center**: Comprehensive health telemetry measuring proxy latency, model status, and database schema sync.

---

## 🏗️ Architecture

```
                                 ┌─────────────────────────────────┐
                                 │       ScrapeGuardian UI         │
                                 │  (React 19 + Tailwind CSS 4)    │
                                 └────────────────┬────────────────┘
                                                  │
                                                  ▼
                                 ┌─────────────────────────────────┐
                                 │   Express.js API Proxy Server   │
                                 │  (Zero-Trust Key Encapsulation) │
                                 └──────┬───────────────────┬──────┘
                                        │                   │
                     ┌──────────────────┴──────┐     ┌─────┴──────────────────┐
                     ▼                         ▼     ▼                        ▼
         ┌─────────────────────────┐               ┌────────────────────────────────┐
         │ Bright Data SERP Engine │               │   Multi-Provider AI Waterfall  │
         │ - Dataset REST API      │               │ 1. Google Gemini 2.5 / 3.7     │
         │ - 72M+ Residential Mesh │               │ 2. Groq LLaMA 3.3 70B (LPPU)   │
         │ - Captcha Bypass        │               │ 3. Mistral AI & Cohere R+      │
         └─────────────────────────┘               │ 4. OpenRouter Multi-Mesh       │
                                                   └────────────────────────────────┘
```

---

## 🚀 Getting Started & Setup

### 1. Prerequisites

- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher

---

### 2. Installation

Clone the repository and install the project dependencies:

```bash
# Clone the repository
git clone https://github.com/your-repo/scrapeguardian-ai.git
cd scrapeguardian-ai

# Install dependencies
npm install
```

---

### 3. Environment Configuration

Create a `.env` file at the root of the project using `.env.example` as a template:

```bash
cp .env.example .env
```

Fill in your API keys in `.env` (or configure them via Google AI Studio Settings/Secrets):

```env
# Google Gemini API (Primary Frontier Model)
GEMINI_API_KEY="your_gemini_api_key_here"

# Groq API (High-Throughput LLaMA Inference)
GROQ_API_KEY="your_groq_api_key_here"

# Cohere API (Enterprise Semantic & Command-R+)
COHERE_API_KEY="your_cohere_api_key_here"

# Mistral AI API (Specialized European Sovereign Models)
MISTRAL_API_KEY="your_mistral_api_key_here"

# OpenRouter API (Universal Unified Multi-Model Mesh)
OPENROUTER_API_KEY="your_openrouter_api_key_here"

# Bright Data SERP Dataset API Key & Dataset ID
BRIGHT_DATA_API_KEY="your_bright_data_api_key_here"
BRIGHT_DATA_SERP_DATASET_ID="gd_l1viktl72bvl7bjuj0"

# Application URL
APP_URL="http://localhost:3000"
```

> 🔒 **Security Guarantee**: All secret keys remain strictly server-side inside `server.ts` and are never leaked to the client browser.

---

### 4. Running the Application

#### 🛠️ Development Mode
Starts the full-stack app with Vite middleware on port `3000`:

```bash
npm run dev
```

Open your browser and navigate to: **`http://localhost:3000`**

#### 📦 Production Build & Start
Bundles the React frontend and compiles the Express backend via `esbuild`:

```bash
# Build frontend and backend bundle
npm run build

# Launch the production server
npm start
```

#### 🔍 Linting & Type Checking
```bash
npm run lint
```

---

## 🎯 How to Use ScrapeGuardian AI

### 1. 🔍 Search Intelligence Hub
1. Navigate to **Search Intelligence** from the left navigation bar.
2. Enter any search term (e.g. `autonomous AI web scraper agents`, `developer tools pricing`, `cloud database benchmarks`).
3. Select your target **Country** (US, UK, DE, etc.), **Language**, and **Number of Results**.
4. Click **Run Intelligence Search** to dispatch the query through Bright Data's SERP engine.
5. Inspect the live extracted SERP nodes, title metadata, snippets, sitelinks, and domain distributions.

### 2. 🧠 Multi-Model AI Analysis
1. Select the **AI Intelligence Analysis** tab after a search run.
2. Choose your preferred AI provider model (*Gemini 3.7 Flash, Groq 70B, Mistral Large, etc.*) or let the **Waterfall Router** select automatically.
3. Review extracted intent classifications, market saturation scores, and competitive threat factors.
4. Interact with the **AI Research Assistant** to ask conversational follow-up questions grounded directly in the extracted SERP records.

### 3. 📑 Executive Boardroom Briefing
1. Click **Generate Boardroom Report** on any completed query.
2. Review the structured executive briefing covering:
   - Executive Overview & Key Market Trends
   - Competitor Share of Voice (SOV) Breakdown
   - Tactical & Strategic Recommendations
   - Risk Analysis & Emerging Moats
3. Click **Export Report** to download in **PDF / Print**, **Markdown (.md)**, or **JSON**.

### 4. 🏆 Judge Guided Demo Mode
1. Click the **Judge Demo** button in the top navigation bar.
2. Follow the 7-step guided interactive walkthrough:
   - **Step 1:** Dispatch search query
   - **Step 2:** Bright Data dataset extraction
   - **Step 3:** Multi-provider AI reasoning
   - **Step 4:** Competitor Share of Voice mapping
   - **Step 5:** Executive briefing generation
   - **Step 6:** Live fault recovery & failover demonstration
   - **Step 7:** Full telemetry dashboard verification
3. Use the **Auto-Play Tour** toggle to let the walkthrough run automatically.

### 5. ⚡ Live Fault Recovery & Failover Demonstration
1. Open the **Demo Lab** or trigger **Step 6** in the Judge Tour.
2. Click **Simulate Primary Provider Failure**.
3. Watch the system intercept an upstream primary timeout (HTTP 429) and instantly route through secondary high-speed LPPU models in **<50ms** with zero data loss.

### 6. 🩺 System Diagnostics Center
1. Click **Health Diagnostics** in the top navigation bar.
2. Inspect live latency benchmarks for:
   - Bright Data SERP Dataset & Residential Mesh
   - Google Gemini Frontier Primary
   - Groq LPPU High-Throughput
   - Mistral AI & Cohere Command-R+
   - OpenRouter Universal Mesh
   - Firestore Persistence & Reliability Lab

---

## 📁 Project Structure

```
├── .env.example              # Environment variables template
├── metadata.json             # Applet metadata & permission manifest
├── package.json              # Project dependencies & build scripts
├── server.ts                 # Full-stack Express server with AI waterfall routing
├── vite.config.ts            # Vite configuration with Tailwind CSS plugin
├── src/
│   ├── main.tsx              # React entry point
│   ├── App.tsx               # Primary application view manager
│   ├── index.css             # Tailwind CSS & global styling
│   ├── types.ts              # Global TypeScript interfaces & schemas
│   ├── context/
│   │   └── AppContext.tsx    # Unified state management & live workflows
│   ├── services/
│   │   ├── brightdata.service.ts       # Bright Data SERP Dataset API client
│   │   ├── aiProvider.service.ts       # Multi-model AI router & prompt engine
│   │   ├── firestore.service.ts        # Cloud persistence & schema mapping
│   │   ├── searchExecution.service.ts  # End-to-end extraction orchestrator
│   │   └── reportGeneration.service.ts # Boardroom report generator & exporters
│   └── components/
│       ├── navigation/       # Navbar, Sidebar, Command Palette (Cmd+K)
│       ├── search/           # Search panel, SERP viewer, intelligence views
│       ├── intelligence/     # Multi-provider benchmark & comparative analytics
│       ├── dashboard/        # Telemetry overview & market metrics
│       ├── demo/             # Judge guided demo modal & interactive lab
│       ├── common/           # Diagnostics modal, notification dropdown, toasts
│       └── landing/          # Product introduction & architecture showcase
```

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status & uptime |
| `GET` | `/api/system/health-check` | Comprehensive component diagnostic report |
| `GET` | `/api/ai/providers/status` | Current availability of all configured AI providers |
| `POST` | `/api/ai/generate` | Multi-model text synthesis with waterfall failover |
| `POST` | `/api/ai/chat` | Context-grounded research assistant endpoint |
| `POST` | `/api/ai/simulate-failover` | Zero-downtime provider fault recovery simulation |
| `POST` | `/api/brightdata/serp/trigger` | Trigger Bright Data Google SERP Dataset collection |
| `GET` | `/api/brightdata/serp/status` | Check dataset snapshot processing progress |
| `GET` | `/api/brightdata/serp/results` | Ingest structured SERP records |

---

## 🛡️ License

Built with ❤️ for the Google AI Studio & Bright Data Hackathon.
Distributed under the **MIT License**.
