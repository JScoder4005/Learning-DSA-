# ADR-001: Why Next.js 14 App Router

## Status
Accepted

## Context
The DSA Dashboard needs to be:
- SEO-friendly (public problem pages should be indexable by Google)
- Fast on first load (learning content shouldn't need JS to render)
- Easy to host for free
- Able to run AI API calls server-side (Claude API key must stay hidden)

## Decision
Use **Next.js 14 App Router** with React Server Components.

## Alternatives considered

| Option | Verdict |
|--------|---------|
| Vite + React SPA | No SSR → bad SEO, API key exposure risk |
| Remix | Good SSR, but smaller ecosystem and fewer shadcn/ui examples |
| Astro | Great for static, but interactive code blocks + AI streaming are complex |
| Plain Express + EJS | Too much manual work, no React ecosystem |

## Consequences
- Server Components render problem pages at build/request time → great SEO + fast FCP
- API routes handle Claude API calls — key never reaches the client
- Vercel deployment is zero-config for Next.js
- `loading.tsx` and `Suspense` give us streaming UI for AI responses natively
