// Given an array of strings, group anagrams together.
// Time: O(n * k log k) where k = max word length | Space: O(n)

function groupAnagrams(strs) {
  const map = {};

  for (let str of strs) {
    // Sorting letters gives the same key for all anagrams
    const key = str.split("").sort().join("");

    if (!map[key]) map[key] = [];
    map[key].push(str);
  }

  return Object.values(map);
}

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// [["eat","tea","ate"], ["tan","nat"], ["bat"]]

console.log(groupAnagrams([""]));   // [[""]]
console.log(groupAnagrams(["a"]));  // [["a"]]
