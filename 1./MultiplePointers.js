function sumZero(arr) {
  let left = 0; // Pointer 1: Start of the array
  let right = arr.length - 1; // Pointer 2: End of the array

  while (left < right) {
    let sum = arr[left] + arr[right];

    if (sum == 0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      // The sum is too high, move the right pointer inward to a smaller number
      right--;
    } else {
      // The sum is too low (too negative), move the left pointer inward to a larger number
      left++;
    }
  }
}
console.log(sumZero([-4, -3, -2, 1, 2, 5]));
console.log(sumZero([-3, -2, -1, 0, 1, 2, 3]));
