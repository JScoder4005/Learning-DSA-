# Palindrome Check

## Problem
Given a string, determine if it is a palindrome — it reads the same forwards and backwards. Consider only alphanumeric characters, ignore casing.

```
Input:  "A man, a plan, a canal: Panama"  → true
Input:  "race a car"                       → false
Input:  "racecar"                          → true
```

---

## The Two-Pointer Approach

After cleaning the string, place one pointer at the start and one at the end. Move them inward, comparing characters. If they ever differ, it's not a palindrome.

```js
function isPalindrome(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");

  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }

  return true;
}
```

### What does each line do?

| Line | What it does | Why |
|------|-------------|-----|
| `.toLowerCase()` | Make comparison case-insensitive | `"A"` and `"a"` should match |
| `.replace(/[^a-z0-9]/g, "")` | Remove all non-alphanumeric characters | Spaces, commas, colons don't count |
| `let left = 0` | Start pointer at the beginning | We compare outward characters inward |
| `let right = cleaned.length - 1` | End pointer at the last character | Inclusive index |
| `while (left < right)` | Stop when pointers meet or cross | Middle character doesn't need to be compared |
| `cleaned[left] !== cleaned[right]` | Characters don't match | String cannot be a palindrome — return false immediately |
| `left++; right--` | Move both pointers inward | Shrink the comparison window |
| `return true` | All pairs matched | The string is a palindrome |

### Regex breakdown: `/[^a-z0-9]/g`

| Part | Meaning |
|------|---------|
| `[ ]` | Character class |
| `^` inside `[ ]` | Negation — match characters NOT in this set |
| `a-z` | Any lowercase letter |
| `0-9` | Any digit |
| `g` flag | Replace ALL occurrences, not just the first |

So `/[^a-z0-9]/g` matches any character that is **not** a letter or digit.

### Walkthrough with `"A man, a plan, a canal: Panama"`

```
After clean: "amanaplanacanalpanama"

left=0  ('a'), right=19 ('a') → match ✓
left=1  ('m'), right=18 ('m') → match ✓
left=2  ('a'), right=17 ('a') → match ✓
...
(all pairs match)
→ return true ✓
```

---

## Approach 1 — Two pointers on cleaned string (above)

O(n) time, O(n) space (for the cleaned string).

## Approach 2 — Without regex (manual cleaning)

```js
function isPalindrome(s) {
  const cleaned = [];

  for (let char of s) {
    const code = char.toLowerCase().charCodeAt(0);
    // a-z: 97-122, 0-9: 48-57
    if ((code >= 97 && code <= 122) || (code >= 48 && code <= 57)) {
      cleaned.push(char.toLowerCase());
    }
  }

  let left = 0;
  let right = cleaned.length - 1;
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }

  return true;
}
```

**What does the `for` loop do?**
- Iterates every character in the original string
- `charCodeAt(0)` gets the ASCII code
- Checks if it falls in the letter (97-122) or digit (48-57) range
- Only keeps alphanumeric characters in `cleaned`

## Approach 3 — Reverse and compare (built-ins)

```js
function isPalindrome(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
}
```

**Simple to read but O(n) extra space** — creates a reversed copy of the string. Two-pointer avoids this.

**`split("").reverse().join("")` breakdown:**
1. `split("")` → array of characters: `["r","a","c","e"]`
2. `.reverse()` → reversed in-place: `["e","c","a","r"]`
3. `.join("")` → back to string: `"ecar"`

---

## Complexity

| Approach | Time | Space |
|----------|------|-------|
| Two-pointer + regex | O(n) | O(n) for cleaned |
| Two-pointer + manual clean | O(n) | O(n) for cleaned array |
| Reverse & compare | O(n) | O(n) — two copies |

All are O(n) but two-pointer avoids creating a second copy of the full string.

---

## Pattern: Two Pointers on Strings

The two-pointer pattern on strings appears in:
- Palindrome variations
- Reverse a string in-place
- String compression
- Comparing two strings character by character

---

## Interview tips
- Clarify: should we ignore non-alphanumeric? Should it be case-insensitive? (Usually yes to both)
- The "reverse and compare" approach is the quickest to write but uses more space — mention the two-pointer as the optimal approach
- Edge cases: empty string `""` → true (cleaned = "", left=0, right=-1, while condition false) ✓
- Single character: `"a"` → true ✓
