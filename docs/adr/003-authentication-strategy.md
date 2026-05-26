# ADR 003: Authentication Strategy

**Date:** 2026-05-26  
**Status:** Accepted  
**Deciders:** Niels Wouters

## Context

PokeManager needs user authentication with low friction for onboarding. Options:

- OAuth (Google, Discord, GitHub)
- Email + password with JWT or sessions
- Passwordless (magic links, phone OTP)

## Decision

**Primary:** OAuth (Google)  
**Fallback:** Email + password with JWT tokens  
**Session:** Stateless JWT (no server-side sessions initially)

## Rationale

- **OAuth (Google):** Zero friction sign-up, trusted provider, reduces password management burden on us.
- **Email fallback:** For users without Google accounts; familiar experience.
- **JWT:** Stateless, scales horizontally, works well with async backends (FastAPI).

## Implementation

- Use `authlib` (Python library) for OAuth2 flow
- Issue short-lived JWT (15 min) + refresh token (7 days)
- Store refresh tokens in DB (tie to user session)
- No server-side session store initially

## Consequences

- **Positive:** Low onboarding friction. Stateless auth scales. JWT works with serverless/API gateways.
- **Negative:** JWT token revocation is tricky (must check DB on every request, defeating stateless advantage). Refresh token rotation adds complexity.
- **Migration path:** If token revocation becomes critical, migrate to short-lived JWTs + centralized session store (Redis).

## Related Decisions

- ADR 001: Backend Framework and API Design
