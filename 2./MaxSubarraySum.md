# Maximum Subarray Sum (Kadane's Algorithm)

## Problem
Find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

```
Input:  [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6   → subarray [4, -1, 2, 1]
```

---

## Why not check every subarray?

The brute force generates all possible start/end pairs and sums each one — O(n²) or O(n³).

```js
// ❌ Brute force — O(n²)
let max = -Infinity;
for (let i = 0; i < nums.length; i++) {
  let sum = 0;
  for (let j = i; j < nums.length; j++) {
    sum += nums[j];
    max = Math.max(max, sum);
  }
}
```

For 10,000 elements that's 50 million iterations. Kadane's does it in one pass.

---

## Kadane's Algorithm — the key decision

At every position you face exactly one choice:

> **"Should I extend the current subarray, or start a fresh one from here?"**

If the current running sum has gone negative, it's dragging you down — better to restart.

```js
function maxSubarraySum(nums) {
  let maxSum = nums[0];     // best answer found so far
  let currentSum = nums[0]; // best sum ending at current position

  for (let i = 1; i < nums.length; i++) {
    // Either extend (add nums[i] to current window) or start fresh
    currentSum = Math.max(nums[i], currentSum + nums[i]);

    // Update the global best
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
```

### What does each line do?

| Line | What it does | Why |
|------|-------------|-----|
| `let maxSum = nums[0]` | Start with the first element | Handles all-negative arrays correctly |
| `let currentSum = nums[0]` | Best sum *ending at i=0* is just nums[0] | Base case |
| `Math.max(nums[i], currentSum + nums[i])` | The core decision: extend or restart | If `currentSum` is negative, adding it makes things worse |
| `Math.max(maxSum, currentSum)` | Track the global best | `currentSum` is only the best ending at i, not the overall best |
| `i = 1` in the loop | Start from index 1, not 0 | We already handled index 0 above |

### Walkthrough with `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`

```
i=1: nums[i]=1.  currentSum = max(1, -2+1=-1)  = 1.  maxSum = max(-2, 1) = 1
i=2: nums[i]=-3. currentSum = max(-3, 1-3=-2)  = -2. maxSum = max(1, -2)  = 1
i=3: nums[i]=4.  currentSum = max(4, -2+4=2)   = 4.  maxSum = max(1, 4)   = 4
i=4: nums[i]=-1. currentSum = max(-1, 4-1=3)   = 3.  maxSum = max(4, 3)   = 4
i=5: nums[i]=2.  currentSum = max(2, 3+2=5)    = 5.  maxSum = max(4, 5)   = 5
i=6: nums[i]=1.  currentSum = max(1, 5+1=6)    = 6.  maxSum = max(5, 6)   = 6
i=7: nums[i]=-5. currentSum = max(-5, 6-5=1)   = 1.  maxSum = max(6, 1)   = 6
i=8: nums[i]=4.  currentSum = max(4, 1+4=5)    = 5.  maxSum = max(6, 5)   = 6

Result: 6 ✓
```

---

## Approach 1 — Manual (Kadane's, no built-ins)

```js
function maxSubarraySum(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (currentSum < 0) currentSum = 0; // restart: don't carry negative baggage
    currentSum += nums[i];
    if (currentSum > maxSum) maxSum = currentSum;
  }
  return maxSum;
}
```

## Approach 2 — Using `Math.max` (built-in, same algorithm, cleaner)

```js
function maxSubarraySum(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}
```

**Which to use?** The `Math.max` version is idiomatic JavaScript and equally readable. In an interview, prefer it — it makes the decision point crystal clear in one line.

## Approach 3 — `reduce` (functional, one-liner style)

```js
function maxSubarraySum(nums) {
  let maxSum = nums[0];
  nums.reduce((curr, num) => {
    const next = Math.max(num, curr + num);
    maxSum = Math.max(maxSum, next);
    return next;
  }, nums[0]);
  return maxSum;
}
```

---

## Complexity

| | Time | Space |
|--|------|-------|
| Brute force | O(n²) | O(1) |
| Kadane's | O(n) | O(1) |

---

## Pattern: Dynamic Programming (simple 1D DP)

Kadane's is the simplest DP pattern. At each step you only need the *previous* state — no array of past answers needed. This "rolling variable" trick appears constantly in DP problems.

---

## Interview tips
- Start by mentioning the brute force, then say "we can do this in O(n) with Kadane's"
- Edge case: all negative numbers — the algorithm handles it correctly because we initialize with `nums[0]` not `0`
- Follow-up: "return the actual subarray" → track `start`, `end`, `tempStart` indices alongside
