# ADR 001: Backend Framework and API Design

**Date:** 2026-05-26  
**Status:** Accepted  
**Deciders:** Niels Wouters

## Context

PokeManager requires a backend to serve portfolio APIs, market data integration, recommendation engine, and CV inference. Key considerations:

- Heavy AI/ML workload (PyTorch CV models, time-series forecasting, LLM integration)
- Data-intensive (historical pricing, user portfolios, transaction ledgers)
- Need for fast iteration on data processing pipelines
- Real-time price feed updates

## Decision

**Framework:** FastAPI (Python 3.10+)  
**API Design:** REST (RESTful, JSON)  
**Real-time:** Server-Sent Events (SSE) for price feed; optional WebSocket upgrade later

## Rationale

- **FastAPI over NestJS:** Python ecosystem dominates AI/ML (PyTorch, scikit-learn, Hugging Face). FastAPI is modern, async-first, with built-in OpenAPI docs. Simpler to integrate CV inference and LLM calls alongside API logic.
- **REST over GraphQL:** Simpler for MVP, mature patterns, easier to cache. GraphQL complexity not justified early.
- **SSE over WebSocket:** Lighter weight, simpler to scale. Sufficient for price updates (one-way feed). WebSocket can be added if interactive two-way communication needed.

## Consequences

- **Positive:** Single language (Python) for backend + ML. FastAPI async handles concurrent requests well. Easy to prototype recommendation engine + CV inference.
- **Negative:** Requires Python expertise. Deployment slightly different from Node.js (ASGI server, not serverless-friendly on Vercel).
- **Migration path:** If performance issues arise, can migrate to compiled languages (Rust, Go) for specific hot paths.

## Related Decisions

- ADR 002: Database and Time-Series Architecture
- ADR 003: Computer Vision Model Serving
