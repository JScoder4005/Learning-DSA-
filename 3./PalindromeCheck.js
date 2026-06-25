// Check if a string is a palindrome (reads the same forwards and backwards).
// Ignores non-alphanumeric characters and is case-insensitive.
// Time: O(n) | Space: O(1)

function isPalindrome(s) {
  // Normalize: keep only letters and digits, lowercase
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

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car"));                     // false
console.log(isPalindrome(" "));                              // true
console.log(isPalindrome("racecar"));                        // true
