# ADR 002: Database and Time-Series Architecture

**Date:** 2026-05-26  
**Status:** Accepted  
**Deciders:** Niels Wouters

## Context

PokeManager tracks portfolio items (relational) and historical card prices (time-series). Need for:

- User, portfolio, and card CRUD (relational)
- High-throughput price data ingestion (millions of price points)
- Fast time-series queries (price history, moving averages, volatility)
- Scalability to 100K+ users

## Decision

**Primary DB:** PostgreSQL 15+  
**Time-Series Extension:** TimescaleDB  
**Development:** Local PostgreSQL + TimescaleDB  
**Production:** AWS RDS (PostgreSQL) or Supabase  
**Caching:** Redis (optional, for price feed caching)

## Rationale

- **PostgreSQL:** Mature, reliable, ACID transactions for portfolio consistency. JSON columns for flexible metadata.
- **TimescaleDB:** Purpose-built for time-series. 10-100× faster than vanilla PostgreSQL for time-series queries. Automatic data compression and retention policies.
- **Local dev:** PostgreSQL + TimescaleDB run locally (Docker). Easy setup, no cloud costs during development.
- **Production:** AWS RDS or Supabase provide managed PostgreSQL + backups. Supabase includes TimescaleDB support; AWS RDS requires manual TimescaleDB extension install.

## Schema Outline

```
users (id, email, password_hash, persona_type, created_at)
portfolios (id, user_id, name, description, created_at)
cards_catalog (id, name, set_code, card_number, rarity, image_urls)
portfolio_items (id, portfolio_id, card_id, grade, condition, acq_price, acq_date, status)
card_prices (card_id, timestamp, grade_type, price, volume, source)  -- TimescaleDB hypertable
```

## Consequences

- **Positive:** Single system handles relational + time-series. TimescaleDB auto-compression saves storage. Native PostgreSQL backup/replication tools.
- **Negative:** Requires TimescaleDB knowledge (minor). Production setup has slight complexity.
- **Migration path:** If scale exceeds PostgreSQL limits (petabyte-scale), can shard or migrate to specialized data warehouse (ClickHouse, QuestDB).

## Related Decisions

- ADR 001: Backend Framework and API Design
