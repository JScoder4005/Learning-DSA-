# Fibonacci with Memoization

## Problem
Return the nth Fibonacci number. The Fibonacci sequence starts: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...

```
fib(0) = 0
fib(1) = 1
fib(n) = fib(n-1) + fib(n-2)
```

---

## The Three Approaches (and why they matter)

This problem is the perfect showcase for the journey from **exponential** → **linear with extra space** → **linear O(1) space**. Every JavaScript developer should know all three.

---

## Approach 1 — Naive Recursion (DON'T use in production)

```js
function fibNaive(n) {
  if (n <= 1) return n;
  return fibNaive(n - 1) + fibNaive(n - 2);
}
```

**Why it's slow:** Computing `fib(5)` calls `fib(4)` and `fib(3)`. But `fib(4)` also calls `fib(3)`. That's duplicate work. The number of calls doubles at each level — O(2^n).

```
fib(5)
├─ fib(4)
│   ├─ fib(3)
│   │   ├─ fib(2) ← calculated again!
│   │   └─ fib(1)
│   └─ fib(2) ← calculated again!
└─ fib(3) ← calculated again!
```

`fib(50)` would need ~2^50 = 1 quadrillion calls. It will hang your browser.

---

## Approach 2 — Memoization / Top-Down DP

**Key insight:** Cache the result the first time we compute `fib(n)`. If asked again, return the cached answer.

```js
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];      // already computed? return cached value
  if (n <= 1) return n;               // base case

  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}
```

### What does each line do?

| Line | What it does | Why |
|------|-------------|-----|
| `memo = {}` | Default parameter: starts as empty object | Each top-level call gets a fresh cache; sub-calls share it |
| `if (n in memo)` | Cache hit check | `in` works for any value including 0 (unlike `if (memo[n])` which fails for falsy values) |
| `return memo[n]` | Return cached answer immediately | Skip re-computing — O(1) lookup |
| `if (n <= 1) return n` | Base case: fib(0)=0, fib(1)=1 | Stops the recursion |
| `memo[n] = fibMemo(n-1) + fibMemo(n-2)` | Compute and cache | Store before returning so future calls find it |

**Time: O(n)** — each value computed exactly once.
**Space: O(n)** — cache + call stack depth.

---

## Approach 3 — Iterative / Bottom-Up DP (Best)

```js
function fibIterative(n) {
  if (n <= 1) return n;
  let prev = 0, curr = 1;

  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }

  return curr;
}
```

### What does the `for` loop do?

The loop builds Fibonacci **from the bottom up** — starting from fib(2) and working up to fib(n).

| Variable | Meaning at each step |
|----------|---------------------|
| `prev` | fib(i - 2) |
| `curr` | fib(i - 1) |
| After swap: `prev` | old `curr` = fib(i - 1) |
| After swap: `curr` | old `curr + prev` = fib(i) |

### Walkthrough for `n=5`

```
Initial: prev=0, curr=1

i=2: [prev, curr] = [1, 0+1=1]  → prev=1, curr=1
i=3: [prev, curr] = [1, 1+1=2]  → prev=1, curr=2
i=4: [prev, curr] = [2, 1+2=3]  → prev=2, curr=3
i=5: [prev, curr] = [3, 2+3=5]  → prev=3, curr=5

return curr = 5 ✓  (fib(5) = 5: 0,1,1,2,3,5)
```

**Why `[prev, curr] = [curr, prev + curr]`?**

This is ES6 destructuring assignment. It evaluates the **right side first** before assigning — so `prev + curr` uses the old `curr`, not the just-updated one. Without destructuring you'd need a temp variable:

```js
// Without destructuring (manual temp variable):
const temp = curr;
curr = prev + curr;
prev = temp;
```

**Time: O(n)** | **Space: O(1)** — just two variables, no cache, no call stack.

---

## Approach 4 — Without any built-ins or ES6 (raw loop)

```js
function fibBasic(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  var prev = 0, curr = 1, temp;
  for (var i = 2; i <= n; i++) {
    temp = curr;
    curr = prev + curr;
    prev = temp;
  }
  return curr;
}
```

---

## Complexity Comparison

| Approach | Time | Space |
|----------|------|-------|
| Naive recursion | O(2^n) | O(n) call stack |
| Memoization | O(n) | O(n) cache + stack |
| Iterative | O(n) | O(1) |

---

## Pattern: Dynamic Programming

**Memoization (top-down):** Start with the recursive solution, add a cache.
**Tabulation (bottom-up):** Build the answer iteratively from smallest to largest.

The iterative approach is almost always the best — it avoids call-stack depth limits and has O(1) space.

---

## Interview tips
- Interviewers use Fibonacci to test whether you know DP exists
- Walk through the naive solution, identify the repeated subproblems, then optimize
- The `in` operator (`n in memo`) vs `memo[n]` — use `in` because `fib(0) = 0` is falsy, so `if (memo[0])` would miss the cache hit
- Common follow-up: "Can you do it in O(log n)?" → Matrix exponentiation (advanced — just mention it exists)
