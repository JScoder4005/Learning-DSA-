# context.md — Learning-DSA-

## What this repo is

A self-paced JavaScript DSA (Data Structures & Algorithms) learning journal. Each concept gets its own `.js` implementation file and, where needed, a companion `.md` explanation file. Problems are solved incrementally and merged via pull requests.

## Repository layout

```
Learning-DSA-/
├── 1./                          # Problem-solving patterns
│   ├── FrequencyCounter.js          # Hash-map based frequency counting
│   ├── FrequencyCounter.md
│   ├── Anagram.js                   # Anagram validation using frequency counter
│   ├── Anagram2.js                  # Alternative anagram approach
│   ├── MultiplePointers.js          # Two-pointer technique
│   ├── CountuniqueValues.js         # Unique values via two pointers
│   ├── LongestUniqueSubstring.js    # Sliding window with Set
│   ├── LongestUniqueSubstring.md
│   ├── Notes.md
│   └── uniqueValues.md
├── 2./                          # Arrays & Strings
│   ├── TwoSum.js / .md              # Hash map complement lookup
│   ├── MaxSubarraySum.js / .md      # Kadane's Algorithm
│   ├── MissingNumber.js / .md       # Gauss formula / XOR
│   ├── GroupAnagrams.js / .md       # Sorted canonical key
│   └── FlattenArray.js / .md        # Recursive tree flattening
├── 3./                          # Stack, Search & Linked List
│   ├── ValidParentheses.js / .md    # Stack-based bracket matching
│   ├── BinarySearch.js / .md        # Divide and conquer O(log n)
│   ├── FibonacciMemo.js / .md       # Naive → Memoized → Iterative DP
│   ├── PalindromeCheck.js / .md     # Two pointers + normalization
│   └── ReverseLinkedList.js / .md   # In-place pointer reversal
├── Recursion/
│   ├── Recursion01.js               # Countdown / sumRange examples
│   ├── FactorialWithLoop.js         # Factorial iterative approach
│   └── notes.md
├── dsa-learning.skill           # AI skill file — full DSA context
└── README.md
```

> **Note on folder naming:** Section folders use a trailing dot (`1.`, `2.`, `3.`). Keep this convention for new sections.

## Concepts covered

| Pattern | Files | Core idea |
|---------|-------|-----------|
| Frequency Counter | `1./Anagram.js`, `FrequencyCounter.js` | Hash map of counts; O(n) instead of nested loops |
| Multiple Pointers | `1./MultiplePointers.js`, `CountuniqueValues.js` | Two indices moving toward each other |
| Sliding Window | `1./LongestUniqueSubstring.js` | Expand/shrink a window; avoid re-processing |
| Recursion | `Recursion/` | Base case + recursive step; call-stack mental model |
| Hash Map | `2./TwoSum.js`, `GroupAnagrams.js` | O(1) lookup to eliminate nested loops |
| Dynamic Programming | `2./MaxSubarraySum.js`, `3./FibonacciMemo.js` | Memoization and bottom-up tabulation |
| Stack | `3./ValidParentheses.js` | LIFO for bracket matching and nesting |
| Binary Search | `3./BinarySearch.js` | Halve the search space on sorted data |
| Linked List | `3./ReverseLinkedList.js` | In-place pointer manipulation |
| Two Pointers | `3./PalindromeCheck.js` | Compare from both ends inward |

## Code conventions

- **Plain JavaScript** — no TypeScript, no build step, no package.json.
- Files run directly with `node <file>.js`.
- Each `.js` file ends with `console.log(...)` test calls.
- Comments explain the *why*, not the *what*.
- Each `.md` explanation file covers: loop logic, two approaches (manual + built-in), walkthrough with real values, complexity table, interview tips.

## Running code

```bash
node "1./Anagram.js"
node "2./TwoSum.js"
node "3./BinarySearch.js"
node Recursion/FactorialWithLoop.js
```

No installation required.

## Git workflow

- `main` — stable, reviewed code only
- `development` — active working branch; all new problems go here
- Commit messages are descriptive imperative sentences

## Adding new problems

1. Create `<section>/<ProblemName>.js` with the solution and `console.log` tests.
2. Create `<section>/<ProblemName>.md` with explanation, loop walkthrough, two approaches, complexity, interview tips.
3. Commit on `development` branch.
4. Open a PR from `development` → `main` when ready.
