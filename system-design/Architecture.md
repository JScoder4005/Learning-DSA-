# DSA Dashboard — System Architecture

## What we're building

A public, interactive DSA learning platform that lets anyone browse algorithm problems, read explanations, see flowcharts, switch the code to any programming language (AI-powered), and track daily progress — all in one place.

---

## Core Features

| Feature | Description |
|---------|-------------|
| Problem browser | List / search / filter problems by pattern, difficulty, tag |
| Problem detail | Code block, step-by-step explanation, complexity table, edge cases |
| Language toggle | Switch code + explanation between JS, Python, Java, C++, Go |
| Flowchart view | Visual algorithm flowchart (Mermaid / ReactFlow) |
| Daily log | What I learned today, what's covered, what's next |
| Streak tracker | GitHub-style activity graph |
| Public sharing | Share a problem page with anyone — no login required to read |

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 14 App Router | SSR for SEO, RSC for performance, API routes built-in |
| UI | shadcn/ui + Tailwind CSS | Consistent, accessible components, dark mode built-in |
| Code blocks | Shiki (syntax highlighter) | 200+ languages, VS Code themes, server-side rendering |
| Flowcharts | Mermaid.js | Text-to-diagram, easy to store in DB, renders client-side |
| AI | Claude API (`claude-sonnet-4-6`) | Language translation + explanation generation |
| Database | Supabase (PostgreSQL) + Prisma ORM | Relational data, free tier, Row Level Security |
| Auth | NextAuth.js (GitHub OAuth) | GitHub login — natural for a dev-focused tool |
| Cache | Vercel KV (Redis) | Cache AI-generated translations so we don't re-call the API |
| Hosting | Vercel | Free tier, instant deploys, built-in cron |
| Analytics | Vercel Analytics | Page views, most visited problems |

---

## Request Flow

```
User visits /problems/two-sum?lang=python
      │
      ▼
Next.js Server Component
  ├─ Fetch problem from PostgreSQL (Prisma)
  ├─ Check Vercel KV for cached Python translation
  │     ├─ HIT  → return cached code + explanation
  │     └─ MISS → call Claude API → cache result → return
  └─ Render page (SSR — SEO friendly)
      │
      ▼
Client hydrates
  ├─ Language toggle switches locale (JS / Python / Java / C++ / Go)
  ├─ Mermaid renders flowchart
  └─ Monaco / Shiki renders code block with syntax highlight
```

---

## API Routes

| Method | Route | What it does |
|--------|-------|-------------|
| GET | `/api/problems` | List all problems (with filter params) |
| GET | `/api/problems/[slug]` | Get one problem with JS solution |
| GET | `/api/problems/[slug]/translate?lang=python` | Get AI-translated version |
| POST | `/api/progress` | Save today's daily log (auth required) |
| GET | `/api/progress/[date]` | Get log for a specific date |
| GET | `/api/stats` | User streak, total problems solved |
| GET | `/api/languages` | Supported languages list |

---

## Edge Cases & How We Handle Them

| Scenario | What we do |
|----------|-----------|
| AI translation fails | Show cached version if exists; else show JS fallback with an error banner |
| Claude API rate limit hit | Queue request with a loading state; max 3 retries with exponential backoff |
| User not logged in | Full read access (problems, translations, flowcharts); no progress tracking |
| Language not yet cached | Show a skeleton loader with streaming response from Claude |
| Problem slug doesn't exist | Return 404 with a "Suggest a problem" CTA |
| Mobile — wide code blocks | Horizontal scroll on code container; toggle to compressed view |
| Very long explanation | Paginate or accordion collapse by section |
| Slow network | Optimistic UI for progress saves; retry on reconnect |
| Concurrent translation requests for same problem | Deduplicate with a request lock in KV (set NX) |
| Empty daily log | Show motivational prompt; auto-fill "upcoming" from next problem in roadmap |

---

## Caching Strategy

```
Translation cache key: `translate:{slug}:{language}`
TTL: 30 days (translations don't change often)

Problem list cache key: `problems:list:{filter}`
TTL: 1 hour

User stats cache key: `stats:{userId}`
TTL: 5 minutes (streak must stay fresh)
```

Invalidation: when a problem is updated (admin action), delete all related translation keys.

---

## Security

- All write endpoints require a valid NextAuth session token
- Problem content is public (read-only, no auth needed)
- Supabase Row Level Security: users can only read/write their own progress rows
- AI prompt is server-side only — Claude API key never exposed to client
- Input sanitization on all user-submitted text (daily log notes)
- Rate limit the `/translate` endpoint: 20 req/min per IP (avoid API cost abuse)

---

## Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.2s (SSR) |
| Time to Interactive | < 2.5s |
| Translation response (cached) | < 100ms |
| Translation response (fresh AI call) | < 5s with streaming |
| Lighthouse score | > 90 (performance + accessibility) |
