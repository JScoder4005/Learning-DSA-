/**
 * Problem: Count unique values in a SORTED array.
 * Time Complexity: O(n)
 * Space Complexity: O(1) - We don't create any new arrays or objects!
 */

function countUniqueValues(arr) {
  if (arr.length === 0) return 0;

  let i = 0;
  // j is the Scout, it starts at index 1 and moves to the end
  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      // They are different!
      i++; // Move anchor forward
      arr[i] = arr[j]; // Store the new unique value at the anchor's spot
    }
    // If they were the same, we do nothing and j just increments automatically
  }
  // The number of unique values is the index of i plus 1
  return i + 1;
}

console.log(countUniqueValues([1, 1, 1, 1, 1, 2])); // 2
console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13]));
