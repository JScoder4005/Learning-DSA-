function firstUniqueChar(str) {
  const counter = {};

  // Step 1: Build the inventory (Frequency Counter)
  for (let char of str) {
    counter[char] = (counter[char] || 0) + 1;
  }
  // Now counter looks like: { s: 3, w: 1, i: 1 } for "swiss"

  // Step 2: Walk through the string again and check our inventory
  for (let char of str) {
    if (counter[char] === 1) {
      return char; // Found the first one with a count of 1!
    }
  }

  return null;
}

console.log(firstUniqueChar("swiss")); // "w"
console.log(firstUniqueChar("repeater")); // "a"
