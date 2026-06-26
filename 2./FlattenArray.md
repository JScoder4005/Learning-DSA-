# Flatten Array

## Problem
Given a deeply nested array, return a new array with all values flattened to a single level.

```
Input:  [1, [2, [3, [4]], 5]]
Output: [1, 2, 3, 4, 5]
```

---

## Why recursion?

A nested array has an unknown depth. You can't write a fixed number of loops for it — you don't know how deep it goes. Recursion is natural here because the problem has the same structure at every level: *"an array that may contain values or more arrays."*

---

## Approach 1 — Recursive (what interviewers want)

```js
function flattenRecursive(arr) {
  const result = [];

  for (let item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenRecursive(item)); // dive deeper
    } else {
      result.push(item); // it's a plain value, collect it
    }
  }

  return result;
}
```

### What does the `for` loop do?

The `for...of` loop visits every element of the current array **one level at a time**. It doesn't know about nesting — that's what the `if` check is for.

| Line | What it does | Why |
|------|-------------|-----|
| `for (let item of arr)` | Iterate the current level of the array | We process one level, recursion handles deeper levels |
| `Array.isArray(item)` | Check if the element is itself an array | Determines whether to go deeper or collect |
| `flattenRecursive(item)` | Recurse into the nested array | Same function, but on a smaller/deeper piece |
| `result.push(...flattenRecursive(item))` | Spread the returned flat array into result | `push(...arr)` adds all elements individually, not as a nested array |
| `result.push(item)` | Collect a plain non-array value | Base case: a number/string goes straight into the result |

### Walkthrough with `[1, [2, [3]]]`

```
flattenRecursive([1, [2, [3]]])
  item=1        → not array → push 1
  item=[2,[3]]  → is array → recurse:
    flattenRecursive([2, [3]])
      item=2    → not array → push 2
      item=[3]  → is array → recurse:
        flattenRecursive([3])
          item=3 → not array → push 3
          return [3]
      push ...[3] → push 3
      return [2, 3]
  push ...[2,3] → push 2, 3
  return [1, 2, 3]
```

---

## Approach 2 — Using `Array.flat()` (built-in)

```js
function flattenBuiltIn(arr, depth = Infinity) {
  return arr.flat(depth);
}
```

- `arr.flat()` — flattens one level deep
- `arr.flat(2)` — flattens two levels deep
- `arr.flat(Infinity)` — flattens all levels (no matter how deep)

**Know this exists.** In production code, always prefer `.flat(Infinity)` over a custom recursive function.

## Approach 3 — Using `reduce` + recursion (functional style)

```js
function flattenReduce(arr) {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flattenReduce(item) : item);
  }, []);
}
```

**`reduce` breakdown:**
- `acc` starts as `[]`
- For each `item`: if it's an array, recurse and concat; if it's a value, concat it directly
- `[].concat(value)` appends a value; `[].concat([1,2])` appends 1 and 2

## Approach 4 — Iterative with a stack (no recursion)

```js
function flattenIterative(arr) {
  const stack = [...arr]; // start with all top-level items on the stack
  const result = [];

  while (stack.length) {
    const item = stack.pop(); // take from the top (LIFO)
    if (Array.isArray(item)) {
      stack.push(...item); // put its children back on the stack
    } else {
      result.unshift(item); // add to the FRONT to preserve order
    }
  }

  return result;
}
```

**Why a stack?** It simulates the recursive call stack iteratively — useful when you're worried about stack overflow on very deeply nested inputs.

---

## Complexity

| Approach | Time | Space |
|----------|------|-------|
| Recursive | O(n) | O(depth) call stack |
| `Array.flat` | O(n) | O(n) |
| Stack-based | O(n) | O(n) |

Where `n` = total number of elements across all levels.

---

## Pattern: Tree / Recursive Structure

Any problem where the input can contain itself (nested arrays, nested objects, DOM nodes, file systems) is a recursion or tree-traversal problem. The pattern is always:
1. Base case: is this a leaf value? Collect it.
2. Recursive case: is this a container? Recurse into it.

---

## Interview tips
- Show the recursive approach first — it's the cleanest
- Mention `Array.flat(Infinity)` but say "in an interview you probably want the custom implementation"
- The spread `...flattenRecursive(item)` vs `.concat()` — both work, spread is slightly more modern
