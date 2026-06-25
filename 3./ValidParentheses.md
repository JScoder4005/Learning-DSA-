# Valid Parentheses

## Problem
Given a string containing only `(`, `)`, `{`, `}`, `[`, `]`, determine if the input string is valid.

A string is valid when:
1. Every open bracket is closed by the same type of bracket
2. Open brackets are closed in the correct order

```
Input:  "()[]{}"   → true
Input:  "([)]"     → false   ← wrong order
Input:  "{[]}"     → true    ← correctly nested
```

---

## Why a Stack?

This problem is about **order and nesting**. Brackets must close in reverse order of how they opened — LIFO (Last In, First Out). That's exactly what a stack does.

Think of it like stacking plates: the last plate you put on is the first one you take off.

---

## The Stack Solution

```js
function isValid(s) {
  const stack = [];
  const pairs = { ")": "(", "}": "{", "]": "[" };

  for (let char of s) {
    if ("({[".includes(char)) {
      stack.push(char); // opening bracket → push onto stack
    } else {
      // closing bracket → must match the top of the stack
      if (stack.pop() !== pairs[char]) return false;
    }
  }

  return stack.length === 0;
}
```

### What does each line do?

| Line | What it does | Why |
|------|-------------|-----|
| `const stack = []` | Our stack (array used as LIFO) | `push` adds to end, `pop` removes from end |
| `const pairs = {...}` | Maps each closing bracket to its matching opener | So we know `")"` must match `"("` |
| `"({[".includes(char)` | Check if the character is an opening bracket | Two different behaviors: push vs verify |
| `stack.push(char)` | Put opening bracket on top of stack | We'll check it when we see its closing partner |
| `stack.pop()` | Remove and return the top of the stack | The most recently opened bracket that hasn't closed yet |
| `!== pairs[char]` | Check if popped opener matches this closer | `")"` expects `"("` — if top was `"["`, it's invalid |
| `return false` | Short-circuit: mismatch found, no need to continue | One wrong pair makes the whole string invalid |
| `stack.length === 0` | Final check: all brackets closed | If stack still has items, some opener was never closed |

### Walkthrough with `"{[]}"`

```
char='{': opener → stack = ["{"]
char='[': opener → stack = ["{", "["]
char=']': closer → pop="[", pairs["]"]="[" → "[" === "[" ✓  stack = ["{"]
char='}': closer → pop="{", pairs["}"]="{"  → "{" === "{" ✓  stack = []

stack.length === 0 → return true ✓
```

### Walkthrough with `"([)]"` (invalid)

```
char='(': opener → stack = ["("]
char='[': opener → stack = ["(", "["]
char=')': closer → pop="[", pairs[")"]="(" → "[" !== "(" ✗  return false
```

---

## Approach 1 — Manual matching (no `pairs` object)

```js
function isValid(s) {
  const stack = [];

  for (let char of s) {
    if (char === "(" || char === "{" || char === "[") {
      stack.push(char);
    } else {
      const top = stack.pop();
      if (char === ")" && top !== "(") return false;
      if (char === "}" && top !== "{") return false;
      if (char === "]" && top !== "[") return false;
    }
  }

  return stack.length === 0;
}
```

More verbose but shows the logic explicitly — useful for explaining in interviews.

## Approach 2 — Push the expected closer (elegant twist)

Instead of checking the opener, push what the closer *should be* when you see an opener:

```js
function isValid(s) {
  const stack = [];

  for (let char of s) {
    if (char === "(") stack.push(")");
    else if (char === "{") stack.push("}");
    else if (char === "[") stack.push("]");
    else if (stack.pop() !== char) return false; // char is a closer
  }

  return stack.length === 0;
}
```

**Why this works:** When `"("` is seen, push `")"` — the thing we *expect* next. When a closer arrives, it should match the top exactly.

---

## Complexity

| | Time | Space |
|--|------|-------|
| All approaches | O(n) | O(n) |

---

## Pattern: Stack

Use a stack whenever you need to:
- Process things in reverse order (LIFO)
- Match pairs or detect nesting
- Track "what came before" while scanning forward

Same pattern appears in: evaluate math expressions, undo/redo, browser history, DFS tree traversal.

---

## Interview tips
- The `stack.pop()` when the stack is empty returns `undefined` — `undefined !== pairs[char]` → correctly returns false (handles `")("` case)
- Always explain the two key moments: **push** on open, **verify** on close
- Don't forget the final `stack.length === 0` — an unclosed `"("` would be missed otherwise
