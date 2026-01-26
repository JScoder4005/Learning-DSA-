# Count Unique Values in a Sorted Array

## 📌 Problem Statement

Given a **sorted array** of numbers, write a function that counts the number of **unique values** in the array.

### Constraints

- **Time Complexity:** `O(n)` – traverse the array only once
- **Space Complexity:** `O(1)` – do not use extra arrays or objects

---

## 🧠 Key Insight

Because the array is **sorted**, all duplicate values are placed **next to each other**.
This allows us to solve the problem efficiently using the **two-pointer technique**.

---

## 🧩 Two-Pointer Technique

We use two pointers:

- **Pointer `i` (Anchor):**
  - Tracks the position of the **last unique value found**

- **Pointer `j` (Scout):**
  - Moves forward to find the **next different value**

---

## 🧪 Example

Input:

```js
[1, 1, 1, 1, 1, 2];
```

Unique values:

```text
1, 2 → Count = 2
```

---

## 🛠️ Implementation

```js
function countUniqueValues(arr) {
  if (arr.length === 0) return 0;

  let i = 0;

  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }

  return i + 1;
}
```

---

## 🔍 Step-by-Step Walkthrough

For the array:

```js
[1, 1, 1, 1, 1, 2];
```

| Step  | i (Anchor) | j (Scout) | arr[i] | arr[j] | Action                            |
| ----- | ---------- | --------- | ------ | ------ | --------------------------------- |
| Start | 0          | 1         | 1      | 1      | Same → do nothing                 |
| j=2   | 0          | 2         | 1      | 1      | Same → do nothing                 |
| j=3   | 0          | 3         | 1      | 1      | Same → do nothing                 |
| j=4   | 0          | 4         | 1      | 1      | Same → do nothing                 |
| j=5   | 0          | 5         | 1      | 2      | Different → move `i`, store value |

Final value of `i`:

```text
i = 1
```

Result returned:

```js
i + 1 = 2
```

---

## ⚠️ Important Note

The function **modifies the array**, but only up to index `i`.
We do **not care** about elements beyond that index.
The goal is to count unique values, not to clean the array.

---

## ✅ Final Output Examples

```js
countUniqueValues([1, 1, 1, 1, 1, 2]);
// Output: 2

countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13]);
// Output: 7
```

---

## 🎯 Why This Approach Is Optimal

- Single loop → `O(n)`
- No extra memory → `O(1)`
- Leverages the **sorted property**
- Forms the foundation for many DSA problems:
  - Removing duplicates
  - Frequency counting
  - Advanced two-pointer patterns

---

## 🧘 Mental Model to Remember

> One pointer **holds** the last unique value,
> the other **searches** for the next new one.

---

Happy coding 🚀
This pattern will show up _everywhere_ in DSA.
