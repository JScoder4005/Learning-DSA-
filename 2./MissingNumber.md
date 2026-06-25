# Missing Number

## Problem
Given an array containing `n` distinct numbers taken from the range `[0, n]`, find the one number that is missing.

```
Input:  [3, 0, 1]
Output: 2   → range is [0,1,2,3], 2 is missing
```

---

## Why not sort and scan?

You could sort the array and check where the sequence breaks — but that's O(n log n). We can do O(n) in a single pass, and even O(1) space.

---

## The Gauss Formula Trick

**Key insight:** The sum of numbers from 0 to n is `n * (n + 1) / 2` — this is Gauss's formula.

If the full range would sum to `X`, but the actual array only sums to `Y`, then the missing number is `X - Y`.

```js
function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2; // sum of 0..n if nothing were missing
  const actualSum = nums.reduce((acc, num) => acc + num, 0); // sum of what we have
  return expectedSum - actualSum;
}
```

### What does each line do?

| Line | What it does | Why |
|------|-------------|-----|
| `const n = nums.length` | The array has n numbers, range is [0..n] | If 3 numbers are given, range is 0,1,2,3 |
| `(n * (n + 1)) / 2` | Gauss formula: expected sum of full range | No loop needed — derived mathematically |
| `nums.reduce(...)` | Sum all numbers actually in the array | Built-in single-pass summation |
| `expectedSum - actualSum` | The "missing" amount is the difference | Simple subtraction gives the answer |

### Walkthrough with `[3, 0, 1]`

```
n = 3
expectedSum = 3 * 4 / 2 = 6   → (0+1+2+3)
actualSum   = 3 + 0 + 1 = 4
missing     = 6 - 4 = 2 ✓
```

---

## Approach 1 — Manual sum (no built-in reduce)

```js
function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  let actualSum = 0;
  for (let i = 0; i < nums.length; i++) {
    actualSum += nums[i];
  }
  return expectedSum - actualSum;
}
```

### What does the `for` loop do here?
- Iterates through every element in `nums`
- Adds each to a running total `actualSum`
- After the loop, `actualSum` holds the sum of all present numbers

## Approach 2 — Using `reduce` (built-in, functional)

```js
function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((acc, num) => acc + num, 0);
  return expectedSum - actualSum;
}
```

**`reduce` breakdown:**
- `acc` = accumulator (starts at `0`, the second argument)
- `num` = each element in turn
- Returns `acc + num` each time, so at the end `acc` holds the total sum

## Approach 3 — XOR trick (no math, no extra space)

```js
function missingNumber(nums) {
  let xor = nums.length; // start with n
  for (let i = 0; i < nums.length; i++) {
    xor ^= i ^ nums[i]; // XOR index and value — equal pairs cancel out
  }
  return xor;
}
```

**Why XOR works:** `a ^ a = 0`. If you XOR every index `0..n` with every value in the array, all matching pairs cancel. Only the missing number's index has no matching value — it survives.

---

## Complexity

| Approach | Time | Space |
|----------|------|-------|
| Sort & scan | O(n log n) | O(1) |
| Gauss formula | O(n) | O(1) |
| XOR | O(n) | O(1) |

---

## Pattern: Math / Bit Manipulation

When the problem gives you a *complete, defined range* of expected values, think about:
1. **Sum difference** (Gauss formula)
2. **XOR** (cancellation property)

Both avoid extra data structures entirely.

---

## Interview tips
- The Gauss formula solution is the expected answer — it's elegant and O(1) space
- Mention XOR as a bonus — it shows deeper bit-level thinking
- Edge case: `[0]` → n=1, expectedSum=1, actualSum=0, missing=1 ✓
