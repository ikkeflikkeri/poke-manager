# PokeManager

**AI-Powered Pokémon TCG Portfolio Management & Market Intelligence Platform**

PokeManager bridges the gap between passionate collectors and data-driven investors by combining high-fidelity portfolio tracking, computer vision card identification, predictive pricing models, and explainable AI recommendations.

## Features

- **Portfolio Tracking** — Manage collections of cards, sealed products, and graded items
- **AI Computer Vision** — Upload card photos; auto-identify, pre-grade, and add to portfolio
- **Market Intelligence** — Real-time price data from TCGplayer, Cardmarket, eBay, and more
- **Predictive Pricing** — 12-month price forecasts using time-series ML models
- **Buy/Sell Recommendations** — AI-generated signals with explainable reasoning
- **Arbitrage Detection** — Cross-marketplace and grading-spread anomalies
- **Watchlist & Alerts** — Track cards and trigger notifications on price/volume changes
- **Dark-Mode UI** — Premium, collector-first design ("Trainer Slate" theme)

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15+, React 19+, TypeScript, Tailwind CSS |
| **Backend** | Node.js (NestJS) or Python (FastAPI) — TBD |
| **Database** | PostgreSQL + TimescaleDB (time-series pricing) |
| **AI/ML** | PyTorch, YOLOv8 (CV), TFT/XGBoost (forecasting), Claude API (LLM) |
| **Data Sources** | TCGplayer API, Cardmarket API, eBay scrapers, PriceCharting |
| **Caching & Queues** | Redis, Celery (async tasks) |
| **Data Viz** | Recharts, Tremor |

## Getting Started

### Prerequisites

- Node.js 18+ (see `package.json` for exact version)
- npm / yarn / pnpm / bun
- PostgreSQL + TimescaleDB (for local dev; optional for frontend-only work)

### Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

Edit `src/app/page.tsx` or any component in `src/components/` to see hot-reload in action.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
poke-manager/
├── src/
│   ├── app/                 # Next.js App Router (pages, layouts, API routes)
│   ├── components/
│   │   ├── ui/              # Reusable UI primitives (buttons, cards, charts)
│   │   └── [feature]/       # Feature-specific components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities, API clients, data transformations
│   └── types/               # TypeScript interfaces (shared across app)
├── docs/
│   ├── agents/              # AI skill configuration
│   │   ├── issue-tracker.md # Where issues live (GitHub)
│   │   ├── triage-labels.md # Issue triage vocabulary
│   │   └── domain.md        # Domain docs structure
│   └── adr/                 # Architecture Decision Records
├── public/                  # Static assets
├── CONTEXT.md               # Domain language, tech stack, data models
├── AGENTS.md                # Next.js-specific rules + AI skill setup
├── CLAUDE.md                # Claude Code configuration
└── package.json
```

## Documentation

- **[CONTEXT.md](./CONTEXT.md)** — Domain vocabulary, data models, API architecture, AI logic, tech details
- **[AGENTS.md](./AGENTS.md)** — Agent skills configuration (GitHub Issues, triage labels, domain docs)
- **[Architecture Decision Records](./docs/adr/)** — Architectural decisions and rationale (to be populated)

## Key Concepts

### Personas

- **Collector** — Values card condition, set completion, historical preservation, aesthetics
- **Investor** — Values ROI, liquidity, market velocity, price-to-grade spreads, macro trends

### Core Workflows

1. **Add Card via CV** — Upload image → auto-identify, pre-grade, add to portfolio
2. **AI Arbitrage Trade** — Receive AI alert → view opportunity → execute trade → log transaction
3. **Monitor Portfolio** — Dashboard shows value, recent changes, top gainers, AI insights
4. **Set Price Alerts** — Add to watchlist → configure entry/exit targets → receive alerts

### AI Recommendation Engine

Three-layer pipeline:

1. **Computer Vision** — YOLOv8 identifies card + ResNet-50 pre-grades condition
2. **Predictive Pricing** — TFT/XGBoost forecasts 12-month price corridor
3. **Recommendation Logic** — Buy signals (undervaluation, arbitrage), Sell signals (hype peaks), Hold
4. **NLG Synthesis** — Claude API generates 2-sentence human-readable explanations

See [CONTEXT.md](./CONTEXT.md) for detailed architecture.

## Monetization

- **Free Tier** — Track up to 50 cards, basic charts, manual entry
- **Premium ($9.99/mo)** — Unlimited tracking, AI scans (30/mo), recommendations, alerts
- **Pro Investor ($29.99/mo)** — Unlimited scans, cross-border arbitrage, tax tools

## Development & Contributing

### AI Skills

This repo uses [Matt Pocock's engineering skills](https://github.com/MattPoclock) for Claude AI integration:

- `/tdd` — Test-driven development
- `/diagnose` — Guided debugging
- `/to-issues` — Convert specs to GitHub issues
- `/improve-codebase-architecture` — Architecture analysis

Skills read from:
- **Issue tracker:** GitHub Issues (`docs/agents/issue-tracker.md`)
- **Domain context:** `CONTEXT.md`
- **Architecture decisions:** `docs/adr/`

### GitHub Issues

Issues tracked in [GitHub Issues](https://github.com/ikkeflikkeri/poke-manager/issues). Five triage states (see [`docs/agents/triage-labels.md`](./docs/agents/triage-labels.md)):

- `needs-triage` — Needs evaluation
- `needs-info` — Awaiting reporter details
- `ready-for-agent` — Fully specified, AFK-ready
- `ready-for-human` — Needs human implementation
- `wontfix` — Won't be actioned

## Deployment

TBD — Vercel, AWS, self-hosted options to be documented.

## License

TBD

## Contact

Built by @ikkeflikkeri. Questions? Open an issue or reach out.
