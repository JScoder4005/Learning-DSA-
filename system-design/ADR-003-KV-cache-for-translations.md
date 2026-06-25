# ADR-003: Vercel KV (Redis) for Translation Cache

## Status
Accepted

## Context
Every time a user clicks the language toggle, we could call the Claude API.
At $0.003 per 1K input tokens and ~500 tokens per translation request:
- 10 users × 10 languages × 10 problems = 1000 calls = $3/day
- At scale this grows fast and adds 3-5 seconds of latency every toggle

## Decision
Cache AI-generated translations in **Vercel KV** (managed Redis) with a 30-day TTL.

## Alternatives considered

| Option | Verdict |
|--------|---------|
| Store in PostgreSQL | Translations are large text blobs — DB rows are not ideal; harder to invalidate |
| Re-call Claude every time | Expensive, slow, bad UX |
| Pre-generate all translations at build time | Doesn't scale — can't pre-generate for every future problem + language combo |
| Upstash Redis | Similar to Vercel KV but requires separate account setup |

## Consequences
- First request for `two-sum` in Python → ~4s (Claude API call), result cached
- All subsequent requests → < 100ms (Redis lookup)
- 30-day TTL means stale translations auto-expire — fresh ones regenerated on next request
- Vercel KV free tier: 256MB storage, 30K commands/day — sufficient for MVP
- Cache key: `translate:{slug}:{language}` — easy to invalidate by problem on update
