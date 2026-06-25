# DSA Dashboard — Roadmap

## Vision
A public, interactive DSA learning platform where anyone can browse problems,
read step-by-step explanations, toggle code to any language, follow flowcharts,
and track their daily learning progress.

---

## Phase 1 — Static Problem Viewer *(Foundation)*
> Goal: Get something live. No database, no auth, no AI yet.

- [ ] Initialize Next.js 14 project (`dsa-dashboard/`)
- [ ] Set up shadcn/ui + Tailwind CSS + dark mode
- [ ] Create problem data as JSON/MDX files (seed with the 10 problems in this repo)
- [ ] Build problem list page (`/problems`) with search + filter by category/difficulty
- [ ] Build problem detail page (`/problems/[slug]`) with:
  - [ ] Code block (Shiki syntax highlighting)
  - [ ] Step-by-step explanation
  - [ ] Complexity table (Time + Space)
  - [ ] Edge cases section
- [ ] Basic Mermaid flowchart rendering on each problem page
- [ ] Mobile-responsive layout
- [ ] Deploy to Vercel

**Milestone:** Public URL where anyone can read problems. No login required.

---

## Phase 2 — Database + Progress Tracking *(Core)*
> Goal: Persist data, add user accounts, enable daily logs.

- [ ] Set up Supabase project + Prisma schema (see `system-design/DataModel.md`)
- [ ] Migrate problem JSON → PostgreSQL `problems` + `solutions` tables
- [ ] Set up NextAuth.js with GitHub OAuth
- [ ] Build daily log system:
  - [ ] Daily log form — what I learned, problems covered, upcoming
  - [ ] `/dashboard` page (authenticated) — today's log + streak
  - [ ] GitHub-style activity/streak graph
- [ ] Mark problems as solved / in-progress / revisit
- [ ] User profile page with solved problem history

**Milestone:** Can log in with GitHub, track daily progress, see streak.

---

## Phase 3 — AI Language Toggle *(Differentiator)*
> Goal: Any problem, any language, with explanation — powered by Claude AI.

- [ ] Set up Vercel KV (Redis) for translation cache
- [ ] Build `/api/problems/[slug]/translate?lang=python` endpoint
- [ ] Claude API prompt engineering for code translation + explanation
- [ ] Language toggle UI (JS / Python / Java / C++ / Go)
- [ ] Streaming response — show translation as it generates
- [ ] Cache hit indicator (show "cached" vs "fresh from AI")
- [ ] Rate limiting on translation endpoint (20 req/min per IP)
- [ ] Fallback UI when AI is slow or fails

**Milestone:** Click a language button, see the problem rewritten + explained in that language.

---

## Phase 4 — Enhanced Visualizations *(Learning experience)*
> Goal: Make algorithms visual and interactive.

- [ ] Upgrade Mermaid flowcharts — one per algorithm approach
- [ ] Add animated step-through visualization (custom React component)
- [ ] Complexity comparison chart across approaches (Recharts bar chart)
- [ ] "Pattern map" — visual graph showing which problems share patterns (ReactFlow)
- [ ] Related problems section on each problem page

**Milestone:** Users can visually trace through an algorithm step by step.

---

## Phase 5 — Community + Polish *(Growth)*
> Goal: Make it shareable and useful for others learning DSA.

- [ ] Public shareable problem links (og:image with code preview)
- [ ] "Suggest a problem" form → creates a GitHub issue automatically
- [ ] Community notes / tips on each problem (authenticated users)
- [ ] Weekly email digest — "what's new in DSA Dashboard"
- [ ] SEO: sitemap, robots.txt, structured data (JSON-LD)
- [ ] Vercel Analytics integration
- [ ] Add more languages: Rust, TypeScript, Swift, Kotlin

**Milestone:** People share DSA Dashboard links on Twitter/LinkedIn.

---

## Problem Backlog (to add to the dashboard)

### Section 4 — Sorting Algorithms
- [ ] Bubble Sort
- [ ] Selection Sort
- [ ] Insertion Sort
- [ ] Merge Sort
- [ ] Quick Sort

### Section 5 — Trees & BST
- [ ] Invert Binary Tree
- [ ] Maximum Depth of Binary Tree
- [ ] Validate BST
- [ ] Level Order Traversal (BFS)
- [ ] Lowest Common Ancestor

### Section 6 — Graphs
- [ ] Number of Islands (BFS/DFS)
- [ ] Clone Graph
- [ ] Course Schedule (topological sort)
- [ ] Shortest Path (Dijkstra)

### Section 7 — Dynamic Programming
- [ ] Climbing Stairs
- [ ] Coin Change
- [ ] Longest Common Subsequence
- [ ] 0/1 Knapsack
- [ ] Word Break

### Section 8 — Heaps & Priority Queue
- [ ] Kth Largest Element
- [ ] Top K Frequent Elements
- [ ] Merge K Sorted Lists

---

## Current Status
| Phase | Status |
|-------|--------|
| Phase 1 | Not started |
| Phase 2 | Not started |
| Phase 3 | Not started |
| Phase 4 | Not started |
| Phase 5 | Not started |
| DSA Problems (this repo) | 10 problems across 3 sections |
