// Flatten a deeply nested array to any given depth (default: Infinity).
// Two approaches: built-in and recursive (for interview context).

// Approach 1: built-in (know this exists)
function flattenBuiltIn(arr, depth = Infinity) {
  return arr.flat(depth);
}

// Approach 2: recursive (what interviewers actually want to see)
function flattenRecursive(arr) {
  const result = [];

  for (let item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenRecursive(item)); // recurse into nested arrays
    } else {
      result.push(item);
    }
  }

  return result;
}

const nested = [1, [2, [3, [4]], 5]];
console.log(flattenBuiltIn(nested));   // [1, 2, 3, 4, 5]
console.log(flattenRecursive(nested)); // [1, 2, 3, 4, 5]
