// Binary search on a sorted array — returns the index or -1 if not found.
// Time: O(log n) | Space: O(1)
// Key insight: halve the search space every iteration.

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;  // target is in the right half
    else right = mid - 1;                    // target is in the left half
  }

  return -1;
}

console.log(binarySearch([-1, 0, 3, 5, 9, 12], 9));  // 4
console.log(binarySearch([-1, 0, 3, 5, 9, 12], 2));  // -1
console.log(binarySearch([5], 5));                     // 0
