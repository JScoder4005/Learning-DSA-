# ADR-002: Shiki for Syntax Highlighting (not Monaco Editor)

## Status
Accepted

## Context
Every problem page needs to display code in multiple languages with syntax highlighting.
Two main options: a static highlighter (Shiki/Prism) or a full code editor (Monaco).

## Decision
Use **Shiki** for the read-only code display on problem pages.

## Alternatives considered

| Option | Verdict |
|--------|---------|
| Monaco Editor | Overkill for read-only — 2MB bundle, slow load, designed for editing |
| Prism.js | Good but older, fewer themes, needs client-side JS |
| Shiki | Server-side rendering, 200+ languages, VS Code themes, zero client JS |
| highlight.js | Client-side only, limited themes |

## Consequences
- Shiki runs server-side in Next.js RSC → zero JS sent to client for highlighting
- VS Code themes (One Dark, GitHub Light) make it feel familiar to devs
- Supports all languages we need: JS, Python, Java, C++, Go
- For a future "try it in browser" feature, we can add Monaco selectively on that page only
