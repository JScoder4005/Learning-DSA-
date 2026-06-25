// Given an array of numbers and a target, return the indices of the
// two numbers that add up to the target. Each input has exactly one solution.
// Time: O(n) | Space: O(n)

function twoSum(nums, target) {
  const seen = {}; // value -> index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (seen[complement] !== undefined) {
      return [seen[complement], i];
    }

    seen[nums[i]] = i;
  }
}

console.log(twoSum([2, 7, 11, 15], 9));  // [0, 1]
console.log(twoSum([3, 2, 4], 6));        // [1, 2]
console.log(twoSum([3, 3], 6));           // [0, 1]
