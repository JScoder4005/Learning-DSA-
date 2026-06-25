# DSA Dashboard — Data Model

## Entity Overview

```
User ──┐
       ├── DailyLog (one per user per day)
       └── Progress (one per user per problem)

Problem ──┐
          ├── Solution (one per language)
          ├── Translation (AI-generated, cached in KV not DB)
          └── Tag (many-to-many)
```

---

## Tables

### `users`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| github_id | varchar | From GitHub OAuth |
| name | varchar | Display name |
| email | varchar | From GitHub |
| avatar_url | text | GitHub avatar |
| created_at | timestamptz | Auto |

### `problems`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| slug | varchar | URL-safe name e.g. `two-sum` — unique |
| title | varchar | Display title e.g. `Two Sum` |
| difficulty | enum | `easy`, `medium`, `hard` |
| category | varchar | `arrays`, `strings`, `stack`, etc. |
| description | text | Problem statement (markdown) |
| example_input | text | Example input |
| example_output | text | Expected output |
| flowchart | text | Mermaid diagram source |
| order_index | int | For ordering within a section |
| created_at | timestamptz | Auto |

### `solutions`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| problem_id | uuid | FK → problems |
| language | enum | `javascript`, `python`, `java`, `cpp`, `go` |
| code | text | The solution code |
| explanation | text | Markdown explanation (line-by-line) |
| time_complexity | varchar | e.g. `O(n)` |
| space_complexity | varchar | e.g. `O(n)` |
| approach_name | varchar | e.g. `Hash Map`, `Two Pointers` |
| edge_cases | text | Markdown list of edge cases |
| is_primary | boolean | True for the canonical JS solution |

### `tags`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| name | varchar | e.g. `hash-map`, `sliding-window`, `dp` |

### `problem_tags`
| Column | Type | Notes |
|--------|------|-------|
| problem_id | uuid | FK → problems |
| tag_id | uuid | FK → tags |

### `daily_logs`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| user_id | uuid | FK → users |
| date | date | One row per user per day — unique constraint |
| problems_covered | text[] | Array of problem slugs covered today |
| what_i_learned | text | Markdown freetext |
| blockers | text | Anything that was confusing |
| upcoming | text[] | Problem slugs planned for next session |
| mood | enum | `great`, `good`, `tired`, `stuck` — optional |
| created_at | timestamptz | Auto |

### `user_progress`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| user_id | uuid | FK → users |
| problem_id | uuid | FK → problems |
| status | enum | `not_started`, `in_progress`, `solved`, `revisit` |
| solved_at | timestamptz | When first marked solved |
| notes | text | Personal notes on this problem |

---

## Indexes

```sql
-- Fast slug lookup (every problem page load)
CREATE UNIQUE INDEX idx_problems_slug ON problems(slug);

-- Filter problems by category / difficulty
CREATE INDEX idx_problems_category ON problems(category);
CREATE INDEX idx_problems_difficulty ON problems(difficulty);

-- Solutions lookup by problem + language
CREATE UNIQUE INDEX idx_solutions_problem_lang ON solutions(problem_id, language);

-- Daily log lookup by user + date
CREATE UNIQUE INDEX idx_daily_logs_user_date ON daily_logs(user_id, date);

-- Progress lookup by user
CREATE INDEX idx_progress_user_id ON user_progress(user_id);
```

---

## AI Translation Cache (Vercel KV / Redis)

Translations are NOT stored in PostgreSQL — they go in Redis with a TTL. This keeps the DB lean and lets us invalidate cheaply.

```
Key format:   translate:{problem_slug}:{language}
Value:        JSON { code: string, explanation: string, generatedAt: ISO8601 }
TTL:          30 days
```

If a key exists → serve from cache (< 100ms).
If not → call Claude API, stream to user, write to cache when complete.

---

## Supabase Row Level Security Policies

```sql
-- Users can only read/write their own logs
ALTER TABLE daily_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own logs only" ON daily_logs
  USING (user_id = auth.uid());

-- Problems are public (everyone can read)
ALTER TABLE problems ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON problems
  FOR SELECT USING (true);

-- Solutions are public
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON solutions
  FOR SELECT USING (true);
```
