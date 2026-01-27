function longestUniqueSubstring(str) {
  let left = 0;
  let maxLength = 0;
  let set = new Set();

  for (let right = 0; right < str.length; right++) {
    while (set.has(str[right])) {
      set.delete(str[left]);
      left++;
    }

    set.add(str[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}

console.log(longestUniqueSubstring("abcabcbb"));
