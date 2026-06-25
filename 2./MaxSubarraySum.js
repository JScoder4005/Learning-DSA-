// Kadane's Algorithm — find the contiguous subarray with the largest sum.
// Time: O(n) | Space: O(1)

function maxSubarraySum(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Either extend the current subarray or start fresh from nums[i]
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

console.log(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6  → [4,-1,2,1]
console.log(maxSubarraySum([1]));                               // 1
console.log(maxSubarraySum([5, 4, -1, 7, 8]));                 // 23
