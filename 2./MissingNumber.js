// Given an array containing n distinct numbers taken from [0, n],
// find the one number that is missing.
// Time: O(n) | Space: O(1)  — Gauss formula trick

function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2; // sum of 0..n
  const actualSum = nums.reduce((acc, num) => acc + num, 0);
  return expectedSum - actualSum;
}

console.log(missingNumber([3, 0, 1]));       // 2
console.log(missingNumber([0, 1]));           // 2
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // 8
