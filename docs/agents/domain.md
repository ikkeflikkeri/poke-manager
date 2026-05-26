# Domain Docs: Single-Context Layout

This repo has one `CONTEXT.md` at the root. All domain language, terminology, and key concepts live there.

## How skills use it

- **`improve-codebase-architecture`** — reads `CONTEXT.md` to understand domain language and past decisions
- **`diagnose`** — uses domain vocab to frame hypotheses and explain bugs
- **`tdd`** — references types and invariants when writing tests

## Where to put ADRs

Place architecture decision records in `docs/adr/` at the root:

```
docs/adr/001-state-management.md
docs/adr/002-api-design.md
```

## What goes in CONTEXT.md

Include:
- **System overview** — what the app does, key flows
- **Domain vocabulary** — terms specific to this domain (e.g., "portfolio", "watchlist", "forecast")
- **Key data types** — primary entities and their relationships
- **Architectural patterns** — how code is organized, naming conventions
- **Tech stack** — framework versions, key dependencies
- **Known constraints** — performance limits, scale assumptions, browser/version targets

See `CONTEXT.md` template below or write from scratch.
