# Binary Search

## Problem
Given a **sorted** array of integers and a target, return the index of the target. If not found, return `-1`.

```
Input:  arr = [-1, 0, 3, 5, 9, 12], target = 9
Output: 4
```

---

## Why not a linear scan?

A simple `for` loop finds the target in O(n) — scanning every element. For an array of 1 billion sorted numbers that could mean 1 billion checks.

Because the array is sorted, we can exploit that order: check the **middle** element. If it's too small, the target must be in the right half — discard the left. If it's too big, discard the right. Each check halves the remaining search space.

1 billion → 500M → 250M → ... → 1 in just **30 steps**. That's O(log n).

---

## The Solution

```js
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}
```

### What does each line do?

| Line | What it does | Why |
|------|-------------|-----|
| `let left = 0` | Start of the current search window | Initially the full array |
| `let right = arr.length - 1` | End of the current search window | Inclusive — `arr[right]` is valid |
| `while (left <= right)` | Keep searching while window is non-empty | `left > right` means the window has collapsed — target not found |
| `Math.floor((left + right) / 2)` | Middle index of current window | Integer division — picks the lower middle for even-length windows |
| `arr[mid] === target` | Found it! | Return the index immediately |
| `arr[mid] < target` | Mid is too small | Target must be in the RIGHT half → move `left` up |
| `left = mid + 1` | Discard left half including mid | Mid already checked — start search from mid+1 |
| `right = mid - 1` | Discard right half including mid | Target must be in the LEFT half |
| `return -1` | Target not found | Loop exited without finding target |

### Walkthrough with `[-1, 0, 3, 5, 9, 12]`, target `9`

```
left=0, right=5
  mid=2 → arr[2]=3. 3 < 9 → left = 3

left=3, right=5
  mid=4 → arr[4]=9. 9 === 9 → return 4 ✓
```

### Walkthrough with target `2` (not found)

```
left=0, right=5
  mid=2 → arr[2]=3. 3 > 2 → right = 1

left=0, right=1
  mid=0 → arr[0]=-1. -1 < 2 → left = 1

left=1, right=1
  mid=1 → arr[1]=0. 0 < 2 → left = 2

left=2 > right=1 → exit loop → return -1 ✓
```

---

## Approach 1 — Iterative (shown above — preferred)

O(1) space. No risk of stack overflow on large inputs.

## Approach 2 — Recursive

```js
function binarySearch(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1; // base case: not found

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) return mid;
  if (arr[mid] < target) return binarySearch(arr, target, mid + 1, right);
  return binarySearch(arr, target, left, mid - 1);
}
```

**Why the iterative version is usually preferred:**
- O(log n) space for the recursive call stack vs O(1) for iterative
- No risk of stack overflow for very large arrays
- Slightly faster due to no function call overhead

## Approach 3 — Using `Array.indexOf` (built-in, but wrong for this problem)

```js
arr.indexOf(target); // O(n) linear scan — defeats the purpose
```

Never use this as a "binary search." It doesn't use the sorted property and is O(n).

---

## Complexity

| | Time | Space |
|--|------|-------|
| Linear scan | O(n) | O(1) |
| Binary search (iterative) | O(log n) | O(1) |
| Binary search (recursive) | O(log n) | O(log n) |

---

## Pattern: Divide and Conquer

Binary search is the foundation of a huge family of problems:
- Search in rotated sorted array
- Find first/last position of element
- Find peak element
- Search in a 2D matrix
- Minimum in rotated array

The core pattern is always: **eliminate half the search space** based on a condition.

---

## Interview tips
- `left <= right` (not `<`) — handles single-element arrays and when `left === right`
- Use `mid = left + Math.floor((right - left) / 2)` in languages where integers can overflow — in JavaScript numbers don't overflow this way, so `(left + right) / 2` is fine
- "Off by one" errors on `mid + 1` / `mid - 1` are the #1 bug in binary search — always include them so you don't check `mid` twice and loop forever
