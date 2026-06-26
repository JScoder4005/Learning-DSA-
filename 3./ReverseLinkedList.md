# Reverse a Linked List

## Problem
Given the head of a singly linked list, reverse the list in-place and return the new head.

```
Input:  1 → 2 → 3 → 4 → 5 → null
Output: 5 → 4 → 3 → 2 → 1 → null
```

---

## Understanding a Linked List

A linked list is a chain of **nodes**. Each node has:
- `val` — the data
- `next` — a pointer to the next node (`null` at the end)

```js
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}
// 1 → 2 → 3 is: ListNode(1, ListNode(2, ListNode(3, null)))
```

There is no index. To "reverse" the list, we flip every arrow — each `next` pointer points backward.

---

## The In-Place Pointer Reversal

```js
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const next = curr.next; // 1. save what's ahead
    curr.next = prev;       // 2. flip the arrow
    prev = curr;            // 3. advance prev
    curr = next;            // 4. advance curr
  }

  return prev; // prev is now the new head
}
```

### What does each line do?

| Line | What it does | Why |
|------|-------------|-----|
| `let prev = null` | The node "behind" current (starts as null) | The new tail's `next` must be `null` |
| `let curr = head` | Start at the head of the list | We walk forward one node at a time |
| `while (curr !== null)` | Process every node until we reach the end | `curr = null` means we've passed the last node |
| `const next = curr.next` | Save the next node before overwriting `curr.next` | Without this we'd lose the rest of the list |
| `curr.next = prev` | Flip the arrow — point backward instead of forward | This is the actual reversal |
| `prev = curr` | Move `prev` one step forward | `curr` is about to move, so `prev` must catch up |
| `curr = next` | Move `curr` to the saved next node | Advance to process the next node |
| `return prev` | `curr` is null, `prev` is the last node processed = new head | Head of the reversed list |

### Walkthrough with `1 → 2 → 3 → null`

```
Initial: prev=null, curr=1→2→3

Step 1: next=2→3, curr(1).next=null,  prev=1,     curr=2→3
        List state: null←1  2→3
Step 2: next=3,   curr(2).next=1,     prev=2→1,   curr=3
        List state: null←1←2  3
Step 3: next=null, curr(3).next=2,    prev=3→2→1, curr=null
        List state: null←1←2←3

curr is null → exit loop
return prev (3) → head of reversed list: 3→2→1→null ✓
```

**Why 4 steps every iteration?** If you skip step 1 (saving `next`) and flip the arrow, you lose access to the rest of the list permanently. The `next` variable is a temporary lifeline.

---

## Approach 1 — Iterative in-place (shown above — preferred)

O(n) time, O(1) space. No extra data structures.

## Approach 2 — Recursive

```js
function reverseList(head) {
  if (!head || !head.next) return head; // base case: empty or single node

  const newHead = reverseList(head.next); // recurse to the tail
  head.next.next = head; // make the next node point back at us
  head.next = null;      // our next becomes null (we're the new tail)

  return newHead; // the tail node (original last) is the new head
}
```

**How it works:**
- Recurse all the way to the last node — that becomes `newHead`
- On the way back up, each node flips its successor's pointer to itself

```
reverseList(1→2→3)
  → recurse into reverseList(2→3)
      → recurse into reverseList(3)
          → base case: return 3 (newHead)
      back at 2: 3.next = 2, 2.next = null → 3→2
      return 3
  back at 1: 2.next = 1, 1.next = null → 3→2→1
  return 3
```

**Downside:** O(n) call stack space. For very long lists, risks stack overflow.

## Approach 3 — Collect then rebuild (easy to understand, but wasteful)

```js
function reverseList(head) {
  const values = [];
  let curr = head;

  // Collect all values
  while (curr) {
    values.push(curr.val);
    curr = curr.next;
  }

  // Rebuild in reverse
  curr = head;
  for (let i = values.length - 1; i >= 0; i--) {
    curr.val = values[i];
    curr = curr.next;
  }

  return head;
}
```

Readable but O(n) extra space — avoid this in interviews.

---

## Complexity

| Approach | Time | Space |
|----------|------|-------|
| Iterative | O(n) | O(1) |
| Recursive | O(n) | O(n) call stack |
| Collect & rebuild | O(n) | O(n) |

---

## Pattern: Linked List Pointer Manipulation

Linked list problems almost always boil down to **pointer juggling**. The key habits:
1. Always save `curr.next` before overwriting it
2. Use `prev` and `curr` (and sometimes a `next` or `third` pointer) to track position
3. Draw the list and arrows on paper — one wrong pointer ruins everything

Same pointer pattern appears in: merge two sorted lists, detect cycle, find middle of list, remove nth from end.

---

## Interview tips
- Draw it on paper or a whiteboard — this problem is impossible to reason about purely abstractly
- Explain the 4 steps before coding: save, flip, advance prev, advance curr
- `return prev` not `return curr` — when the loop ends, `curr` is null, `prev` is the new head
- Edge cases: `null` input → return `null` ✓ (loop never runs, `prev` starts as `null`)
- Edge case: single node `[1]` → return `[1]` ✓ (loop runs once, flips 1.next to null which it already is, `prev=1`)
