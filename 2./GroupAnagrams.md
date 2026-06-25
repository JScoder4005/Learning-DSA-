# Group Anagrams

## Problem
Given an array of strings, group all anagrams together. The order of groups does not matter.

```
Input:  ["eat", "tea", "tan", "ate", "nat", "bat"]
Output: [["eat","tea","ate"], ["tan","nat"], ["bat"]]
```

Two strings are anagrams if they contain the same characters in any order.

---

## The Core Idea: Canonical Key

Two anagrams always produce the **same string when their letters are sorted**.

```
"eat" → sorted → "aet"
"tea" → sorted → "aet"  ← same key!
"ate" → sorted → "aet"  ← same key!
"tan" → sorted → "ant"
"nat" → sorted → "ant"  ← same key!
```

So we use the sorted version as a hash map key to group anagrams together.

```js
function groupAnagrams(strs) {
  const map = {};

  for (let str of strs) {
    const key = str.split("").sort().join(""); // canonical sorted form

    if (!map[key]) map[key] = [];
    map[key].push(str);
  }

  return Object.values(map);
}
```

### What does each line do?

| Line | What it does | Why |
|------|-------------|-----|
| `const map = {}` | Hash map: canonical key → list of anagrams | Groups all anagrams under one key |
| `str.split("")` | Converts `"eat"` → `["e","a","t"]` | Need an array to sort individual characters |
| `.sort()` | Sorts the characters alphabetically | All anagrams produce the same sorted order |
| `.join("")` | Converts `["a","e","t"]` → `"aet"` | Back to a string so it can be a hash key |
| `if (!map[key]) map[key] = []` | Create the group array if it doesn't exist yet | Prevents "cannot push to undefined" error |
| `map[key].push(str)` | Add the original string to its group | We want the originals back, not the sorted version |
| `Object.values(map)` | Return just the grouped arrays | Discards the keys — we only needed them for grouping |

### Walkthrough

```
"eat" → key="aet" → map = { aet: ["eat"] }
"tea" → key="aet" → map = { aet: ["eat","tea"] }
"tan" → key="ant" → map = { aet: ["eat","tea"], ant: ["tan"] }
"ate" → key="aet" → map = { aet: ["eat","tea","ate"], ant: ["tan"] }
"nat" → key="ant" → map = { aet: ["eat","tea","ate"], ant: ["tan","nat"] }
"bat" → key="abt" → map = { aet: [...], ant: [...], abt: ["bat"] }

Object.values → [["eat","tea","ate"], ["tan","nat"], ["bat"]] ✓
```

---

## Approach 1 — Manual key building (no `.sort()`)

Instead of sorting, count character frequencies and build a key from counts:

```js
function groupAnagrams(strs) {
  const map = {};

  for (let str of strs) {
    // Build a frequency array of 26 letters
    const count = new Array(26).fill(0);
    for (let char of str) {
      count[char.charCodeAt(0) - 97]++; // 'a'=0, 'b'=1, ... 'z'=25
    }
    const key = count.join("#"); // e.g. "1#0#0#...#1#0...#1" for "eat"

    if (!map[key]) map[key] = [];
    map[key].push(str);
  }

  return Object.values(map);
}
```

**Why the inner `for` loop?**
- Iterates each character in the current string
- `charCodeAt(0) - 97` converts a letter to its 0-based index (a=0, b=1, ... z=25)
- Increments that position in the count array

**When to prefer this over sort:**
- Faster: O(k) per word instead of O(k log k) where k = word length
- Works when input might contain non-alphabetic characters that make sorting ambiguous

## Approach 2 — Using `sort` (built-in, simpler, good for interviews)

```js
function groupAnagrams(strs) {
  const map = new Map();
  for (const str of strs) {
    const key = [...str].sort().join("");
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str);
  }
  return [...map.values()];
}
```

**`[...str]`** — spread operator on a string produces an array of characters, same as `str.split("")` but shorter.

---

## Complexity

| Approach | Time | Space |
|----------|------|-------|
| Sort key | O(n × k log k) | O(n × k) |
| Frequency key | O(n × k) | O(n × k) |

Where `n` = number of strings, `k` = average string length.

---

## Pattern: Hash Map with Custom Key

Anytime you need to group items by some *normalized* property:
1. Compute a canonical key that is identical for all "equivalent" items
2. Use a hash map to collect items under that key

Other problems that use this same pattern: count word frequencies, group by first letter, group by string length, isomorphic strings.

---

## Interview tips
- Sorting approach: simpler code, easier to explain. Fine for interviews.
- Frequency approach: faster asymptotically. Mention it as an optimization.
- Always push the **original** string (not the key) into the result groups
