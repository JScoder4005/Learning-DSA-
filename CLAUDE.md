# CLAUDE.md — Learning-DSA-

## What this repo is

A self-paced JavaScript DSA (Data Structures & Algorithms) learning journal. Each concept gets its own `.js` implementation file and, where needed, a companion `.md` explanation file. Problems are solved incrementally and merged via pull requests.

## Repository layout

```
Learning-DSA-/
├── 1./                      # Problem-solving patterns (Section 1)
│   ├── FrequencyCounter.js      # Hash-map based frequency counting
│   ├── FrequencyCounter.md      # Notes on the pattern
│   ├── Anagram.js               # Anagram validation using frequency counter
│   ├── Anagram2.js              # Alternative anagram approach
│   ├── MultiplePointers.js      # Two-pointer technique
│   ├── CountuniqueValues.js     # Unique values via two pointers
│   ├── LongestUniqueSubstring.js # Sliding window with Set
│   ├── LongestUniqueSubstring.md
│   ├── Notes.md                 # Section-level notes
│   └── uniqueValues.md
├── Recursion/
│   ├── Recursion01.js           # Countdown / sumRange examples
│   ├── FactorialWithLoop.js     # Factorial iterative approach
│   └── notes.md                 # Recursion concepts: base case, call stack
└── README.md
```

> **Note on folder naming:** The current section folder is literally named `1.` (with a trailing dot). New sections will likely follow the same pattern (`2.`, `3.`, etc.).

## Concepts covered so far

| Pattern | File(s) | Core idea |
|---------|---------|-----------|
| Frequency Counter | `Anagram.js`, `FrequencyCounter.js` | Build a hash map of character counts; compare in O(n) instead of nested loops |
| Multiple Pointers | `MultiplePointers.js`, `CountuniqueValues.js` | Two index variables that move toward each other (sorted arrays) |
| Sliding Window | `LongestUniqueSubstring.js` | Expand/shrink a window over contiguous data; avoid re-processing |
| Recursion | `Recursion/` | Base case + recursive step; call-stack mental model |

## Code conventions

- **Plain JavaScript** — no TypeScript, no build step, no package.json.
- Files run directly with `node <file>.js`.
- Each file exports nothing; every solution ends with `console.log(...)` test calls.
- Comments explain the *why* of each step, not the *what* — aimed at learning, not production.
- Variable names are descriptive (`lookup`, `left`, `right`, `maxLength`).

## Running code

```bash
node "1./Anagram.js"
node "1./LongestUniqueSubstring.js"
node Recursion/FactorialWithLoop.js
```

No installation required.

## Git workflow

- `main` — stable, reviewed code only
- `feat-NewBranch` (recurring) — feature branch; new problems are added here and merged via PR
- `claude/claude-md-docs-q966a3` — AI-assisted documentation branch

Commit messages are descriptive imperative sentences:
```
Add comprehensive notes on recursion concepts and examples
Implement factorial function using a loop
Solving new UniqueValues problem
```

## Adding new problems

1. Create a new `.js` file in the relevant section folder.
2. Implement the solution with inline comments explaining the pattern.
3. Add `console.log(...)` calls to verify output.
4. If the concept warrants explanation, add a sibling `.md` file.
5. Commit on a feature branch; open a PR to `main`.

## AI assistant guidance

- This is a **learning** repo — preserve explanatory comments; they are intentional.
- Do not add TypeScript, ESLint configs, or test frameworks unless explicitly asked.
- When adding a new solution, follow the existing style: plain JS, `console.log` tests at the bottom, comments that explain the pattern step-by-step.
- Section folders are named with a trailing dot (`1.`, `2.`). Keep that convention.
- Do not restructure the folder layout without explicit instruction.
