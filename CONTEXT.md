# PokeManager CONTEXT

## System Overview

PokeManager is an AI-powered SaaS platform for Pokémon TCG portfolio management, market intelligence, and investment guidance. It bridges passionate collectors and data-driven investors by combining portfolio tracking, computer vision (card identification & pre-grading), predictive pricing models, and natural language recommendations.

**Two personas:** Collector (values condition, set completion, aesthetics) and Speculative Investor (values ROI, liquidity, price spreads).

**Core value:** Transforms volatile market data into explainable buy/sell/hold recommendations via multi-layered AI (CV, time-series forecasting, LLM reasoning).

**Primary surfaces:** Dashboard, Portfolio Manager, AI Market Intelligence Hub, Watchlist, Settings.

## Domain Vocabulary

**Portfolio & Holdings:**
- **Portfolio** — user's collection of cards, organized by name (e.g., "Personal", "Speculative")
- **Portfolio Item** — individual card instance with condition, grade, acquisition price, market value
- **Holdings** — all items in a portfolio

**Card Properties:**
- **Card** — Pokémon TCG card with name, set, card number, rarity, language, image
- **Set** — TCG expansion name + code (e.g., "Base Set", "Darkness Ablaze")
- **Card Number** — position in set (e.g., "25/102")
- **Rarity** — symbol class (common, uncommon, rare, holo rare, secret rare)
- **Holo** — holographic or non-holographic
- **Illustrator** — card artist (rare cards tracked separately, e.g., "Illustrator Charizard")

**Card Condition & Grading:**
- **Condition Raw** — subjective assessment (Near Mint, Lightly Played, Moderately Played, Heavily Played, Poor)
- **Pre-Grade Estimate** — CV model's probabilistic prediction (e.g., 65% PSA 9, 20% PSA 10, 15% PSA 8)
- **Grade** — numeric score (1–10, e.g., PSA 10, BGS 9.5, CGC 8.5)
- **Grading Company** — issuer (PSA, BGS, CGC)
- **Cert Number** — grading certificate ID (trackable, verifiable)
- **Grade Spread** — price difference between raw and graded (e.g., raw $50 vs. PSA 9 $400 = $350 spread)

**Financials:**
- **Cost Basis** — what user paid for card (acquisition price + date)
- **Acquisition Date** — when card was purchased
- **Current Market Value** — estimated present value (from multi-source pricing)
- **Gain/Loss** — unrealized profit/loss (market value − cost basis)
- **Gain/Loss %** — percentage return
- **Transaction** — buy, sell, or appraisal event (tracked for P&L ledger)

**Market Data:**
- **Market Price** — current average price (TCGplayer Mid, Cardmarket average, eBay median)
- **Price History** — time-series of prices at various grades (raw, PSA 8, PSA 9, PSA 10)
- **Volume** — number of cards sold in period (daily, weekly, monthly)
- **Liquidity Score** — A–F rating; how easily card can be sold (based on transaction velocity)
- **Price Corridor** — probabilistic forecast (10th, 50th, 90th percentiles) for 12 months ahead
- **Source** — origin of price data (TCGplayer, Cardmarket, eBay, PriceCharting)

**AI Recommendations:**
- **Recommendation Action** — BUY, SELL / TAKE PROFIT, HOLD
- **Confidence Score** — 0–100% model certainty
- **Reason** — why recommendation was generated (e.g., "arbitrage opportunity", "hype cycle peak")
- **The "Why"** — natural language explanation (2-sentence synthesis via LLM)
- **Estimated Hold Time** — projected duration before target price reached
- **Arbitrage Opportunity** — price anomaly across marketplaces (raw vs. graded, geographic spreads)

**Watchlist & Alerts:**
- **Watchlist Entry** — saved card to monitor
- **Entry Target** — desired purchase price
- **Exit Target** — desired sale price
- **Alert Trigger** — condition (price drop % below 7D avg, volume spike, momentum shift)
- **Alert Channel** — delivery method (in-app notification, email, SMS, Discord webhook)

**Portfolio Metrics:**
- **Portfolio Value** — sum of all portfolio item market values
- **Total Gain/Loss** — sum of all unrealized gains/losses
- **24h Change** — value change in past 24 hours
- **30d Change** — value change in past 30 days
- **ROI** — return on investment (total gain/loss ÷ total cost basis)
- **Set Completion %** — percentage of a set collected

## Key Data Types & Relationships

```
User (id, email, persona_type: 'collector' | 'investor' | 'hybrid')
  ├── Portfolio (id, name, description)
  │   └── PortfolioItem (id, card_id, grade, condition, cost_basis, acq_date, market_value)
  │       └── Card (id, name, set_code, card_number, rarity, image_urls)
  ├── Watchlist (id, card_id, entry_target, exit_target, alert_rules)
  └── Transactions (id, type: 'buy' | 'sell' | 'appraisal', timestamp, amount, card_id)

CardCatalog (id, name, set_name, set_code, card_number, rarity, is_holo, image_front, image_back)

CardPrices (card_id, timestamp, grade_type: 'raw' | 'PSA_9' | 'PSA_10' ..., price, volume, source)
  └── Hypertable (TimescaleDB) for fast time-series queries

AIRecommendation (id, user_id, card_id, action, confidence, reason, created_at, expires_at)
```

## Database Schema (PostgreSQL + TimescaleDB)

**Key tables:**
- `users` — email, password_hash, persona_type, created_at
- `portfolios` — user_id, name, description, created_at
- `portfolio_items` — portfolio_id, card_id, condition_raw, is_graded, grade_numeric, cert_number, acquisition_price, acquisition_date, current_market_value, status
- `cards_catalog` — master catalog of all cards (name, set_name, set_code, card_number, rarity, image_urls, is_holo)
- `card_prices` — hypertable (TimescaleDB) storing (card_id, timestamp, grade_type, price, volume, source)
- `watchlist_entries` — user_id, card_id, entry_target, exit_target, alert_rules
- `ai_recommendations` — user_id, card_id, action, confidence, reason_code, llm_explanation, created_at, expires_at

## AI Architecture & Recommendation Logic

**Three-layer AI pipeline:**

1. **Computer Vision (Card Identification & Pre-Grading)**
   - Model: YOLOv8 + ResNet-50 backbone
   - Input: User uploads card image (front + back)
   - Output: Card name, set, card number, OCR text, estimated condition (probabilistic grade distribution)
   - Pre-Grade Assessment: Pixel analysis for centering (60/40, 50/50 ratios), edge/corner wear, surface texture
   - Result: Confidence-scored "pre-grade" (e.g., 65% PSA 9, 20% PSA 10, 15% PSA 8)

2. **Predictive Pricing (Time-Series Forecasting)**
   - Model: Temporal Fusion Transformer (TFT) or XGBoost
   - Inputs: Historical prices, volume, set release schedule, Google Trends, macro indicators
   - Output: 12-month price corridor (10th, 50th, 90th percentiles)
   - Retraining: Weekly on new sales data

3. **Recommendation Engine (Buy/Sell Logic)**
   - **Buy Signals:**
     - Undervaluation: `Current Price / 30D Moving Avg < 0.85`
     - Grading Arbitrage: Large raw-to-PSA grade spread + high liquidity
     - Cross-marketplace Anomaly: Same card cheaper on eBay vs. TCGplayer (geographic arbs)
     - Confirmation: Liquidity Score > threshold, volume trending up
   - **Sell Signals:**
     - Peak Detection: RSI > 80 AND 30D velocity > 2.5× baseline
     - Hype Cycle: New set release, influencer mention, buyout
     - Confirmation: Volume high, price >90th percentile of 12M history
   - **Hold:** No clear signal or recent action

4. **Natural Language Generation (LLM Synthesis)**
   - Tool: Claude API (gpt-4o-mini) or fine-tuned Llama-3
   - Input: Structured recommendation data (card, action, reason codes, metrics)
   - Output: 2-sentence human-readable explanation
   - Example output: *"Charizard G Lv.X is trading 22% below its 90-day moving average. Raw-to-PSA 9 spreads are at $180, offering strong grading arbitrage potential with rising transaction volume."*

## API Architecture

**Backend Stack:** Node.js (NestJS) or Python (FastAPI)

**Key Endpoints (RESTful or GraphQL):**
- `POST /api/portfolio/items` — add card to portfolio (with CV pre-grade)
- `GET /api/portfolio/items?filter=set,rarity,grade` — list portfolio items with filtering
- `GET /api/card/{id}/prices` — fetch historical price data for a card
- `GET /api/recommendations?limit=10` — fetch personalized AI recommendations (paginated)
- `POST /api/watchlist` — create watchlist entry with alert rules
- `POST /api/transactions` — log buy/sell/appraisal event
- `GET /api/portfolio/summary` — portfolio value, gain/loss, 24h/30d change

**Real-time Updates:** WebSocket (or Server-Sent Events) for live price updates, alert triggers.

**Authentication:** OAuth2 (Google, Discord) + JWT tokens.

**Rate Limiting:** 1000 requests/hour for free tier, unlimited for paid.

## Data Sourcing & Pricing Pipeline

**Primary sources:**
- **TCGplayer API** — gold standard for English raw card pricing (Market, Mid, Low)
- **Cardmarket API** — European market, localized pricing
- **eBay API + Scrapers** — graded card auctions (PSA, BGS, CGC), real transaction data
- **PriceCharting / SCI APIs** — pre-aggregated historical sales, trends

**Data Quality:**
- Outlier filtering: Modified Z-Score (exclude transactions >3σ from 7D median)
- Source weighting: Recent transactions weighted higher than old data
- Grade-specific pricing: Raw, PSA 8, PSA 9, PSA 10 tracked separately

## Frontend Architecture

**Stack:** Next.js 15+ (App Router), React 19+, TypeScript, Tailwind CSS

**Key features:**
- Dark-mode first ("Trainer Slate" theme palette)
- Server-Side Rendering (SSR) for card catalog SEO
- Client-side state: React Context or Zustand (portfolio, user prefs)
- Charts: Recharts or Tremor (interactive area/line charts)
- Data visualization: Tailwind + custom canvas for holographic effects

**Components:**
- Dashboard (portfolio summary, AI briefing, quick actions)
- PortfolioGrid (filterable card list with detail drawer)
- AIRecommendationCard (action badge, explanation, metrics)
- PriceChart (multi-timeframe area chart)
- WatchlistEntry (entry/exit targets, alert config)
- PortfolioMetrics (gain/loss, ROI, set completion rings)

## Design System

**Color Palette:**
- Primary BG: Deep Slate (`#0B0F19`)
- Secondary BG: Charcoal (`#161D30`)
- Accent Primary: Electric Yellow (`#FCD34D`)
- Accent Secondary: Mew Pink/Purple (`#A78BFA`)
- Buy/Bullish: Emerald Green (`#10B981`)
- Sell/Bearish: Crimson Red (`#EF4444`)

**Typography:** Inter (or SF Pro Display) for readability of dense financial data

## Monetization & User Tiers

**Free Tier:**
- Track up to 50 cards
- Basic portfolio charts
- Manual entry only

**Premium ($9.99/month):**
- Unlimited tracking
- AI Camera Scan & Pre-Grading (30 scans/month)
- Access to recommendation engine
- Real-time price alerts (email/SMS/Discord)

**Pro Investor ($29.99/month):**
- Unlimited AI scans
- Cross-border arbitrage detection (US/EU/JP)
- Tax-loss harvesting tools
- Capital gains reporting export

## Known Constraints & Future Work

**Current Scope:**
- Single user portfolios (multi-portfolio support planned)
- Static card catalog (automated scraping/updates planned)
- Email/SMS alerts (Discord webhooks next)

**Future:**
- Holographic texture analysis (video-based scanning)
- Fractional asset integration (Rally, Otis partnerships)
- Counterfeit detection (ML on hologram patterns)
- API for third-party integrations (portfolio sync, tax software)
