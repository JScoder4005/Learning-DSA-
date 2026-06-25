# Two Sum

## Problem
Given an array of numbers and a `target`, return the **indices** of the two numbers that add up to the target. Each input has exactly one solution, and you may not use the same element twice.

```
Input:  nums = [2, 7, 11, 15], target = 9
Output: [0, 1]   → because nums[0] + nums[1] = 2 + 7 = 9
```

---

## Why not a nested loop?

The brute-force approach uses two `for` loops — check every pair:

```js
// ❌ Brute force — O(n²) time
for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    if (nums[i] + nums[j] === target) return [i, j];
  }
}
```

This works but is slow. For 10,000 numbers it checks ~50 million pairs. We can do it in a single pass.

---

## The Hash Map Trick (O(n) approach)

**Key insight:** Instead of asking "do any two numbers sum to target?", flip the question:

> *"Have I already seen the number I need to pair with `nums[i]`?"*

That needed number is `target - nums[i]` — the **complement**.

```js
function twoSum(nums, target) {
  const seen = {}; // stores: value → index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]; // what do I need?

    if (seen[complement] !== undefined) {
      return [seen[complement], i]; // found it! return both indices
    }

    seen[nums[i]] = i; // haven't found it yet, remember this number
  }
}
```

### What does each line do?

| Line | What it does | Why |
|------|-------------|-----|
| `const seen = {}` | Hash map of `value → index` | O(1) lookup — much faster than scanning the array again |
| `target - nums[i]` | Calculate the complement | If target is 9 and current number is 2, we need 7 |
| `seen[complement] !== undefined` | Check if the complement was seen before | `!== undefined` handles the edge case where the value is 0 (falsy) |
| `seen[nums[i]] = i` | Record this number and its index | So a future iteration can find it as its complement |

### Walkthrough with `[2, 7, 11, 15]`, target `9`

```
i=0: nums[i]=2, complement=7. seen={}. 7 not in seen. Store seen={2:0}
i=1: nums[i]=7, complement=2. seen={2:0}. 2 IS in seen! Return [seen[2], 1] → [0, 1] ✓
```

---

## Approach 1 — Without any built-ins (manual hash map, same as above)

```js
function twoSum(nums, target) {
  const seen = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen[complement] !== undefined) return [seen[complement], i];
    seen[nums[i]] = i;
  }
}
```

## Approach 2 — Using `Map` (built-in, cleaner)

```js
function twoSum(nums, target) {
  const map = new Map(); // Map is slightly better than {} for this — no prototype collisions

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
}
```

**Why `Map` over `{}`?**
- `Map.has()` is more readable than `!== undefined`
- `Map` keys can be any type (not just strings), which matters for other problems
- No risk of key collision with inherited Object properties like `toString`

---

## Complexity

| | Time | Space |
|--|------|-------|
| Brute force | O(n²) | O(1) |
| Hash map | O(n) | O(n) |

---

## Pattern this belongs to: Frequency Counter / Hash Map

Any time you need to find a **relationship between two elements** in an array, consider storing elements in a hash map as you iterate — turn a nested loop into a single pass.

---

## Interview tips
- Clarify: can there be duplicates? Can the same index be used twice? (Usually no to both)
- Mention the brute force first, then optimize — interviewers want to see your thought process
- `seen[complement] !== undefined` not `seen[complement]` — because `0` is falsy
