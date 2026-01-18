🏗️ Pattern: The Frequency Counter1. The "What" (Definition)The Frequency Counter is a programming pattern that uses JavaScript Objects (or Maps) to collect values and their frequencies (how many times they appear).Instead of comparing two sets of data by nesting loops (checking every item of Array A against every item of Array B), we "count" everything in Array A first, then "count" everything in Array B, and finally compare the two counts.2. The "Why" (The Performance Leap)In technical interviews, this pattern is used to move from $O(n^2)$ (Quadratic Time) to $O(n)$ (Linear Time).Nested Loops ($O(n^2)$): If you have 1,000 items, you might do 1,000,000 operations.Frequency Counter ($O(n)$): If you have 1,000 items, you do roughly 3,000 operations (Loop 1 + Loop 2 + Comparison).3. The "Where" (Common Scenarios)Use this pattern whenever you see:Anagrams: (e.g., "silent" vs "listen").Matching Data: (e.g., "Does Array B contain the squares of Array A?").Uniqueness: (e.g., "Find the first non-repeating character").Shared Values: (e.g., "Find common elements between two large lists").💻 The Master Code: Anagram CheckerAn anagram is a word formed by rearranging the letters of another.JavaScript/**
 * Problem: Determine if string2 is an anagram of string1.
 * Time Complexity: O(n) - Linear
 * Space Complexity: O(n) - Storing characters in an object
 */

function isAnagram(str1, str2) {
  // 1. EDGE CASE: If lengths differ, they cannot be anagrams.
  if (str1.length !== str2.length) return false;

  // 2. THE COUNTER: This object acts as our "Inventory/Notebook"
  const lookup = {};

  // 3. STEP ONE: Record the frequency of characters in str1
  for (let i = 0; i < str1.length; i++) {
    let char = str1[i]; // Accessing the current character
    
    // THE MAGIC LINE:
    // If char exists in lookup, increment it. 
    // If it doesn't exist (undefined), use 0 and then add 1.
    lookup[char] = (lookup[char] || 0) + 1;
  }

  // 4. STEP TWO: Compare str2 against our inventory
  for (let i = 0; i < str2.length; i++) {
    let char = str2[i];

    // If we can't find the character OR the count is already 0, 
    // it means str2 has an extra or different character.
    if (!lookup[char]) {
      return false;
    } else {
      // If we found the character, "use" one from our inventory.
      lookup[char] -= 1;
    }
  }

  // 5. SUCCESS: If we made it through the loop, they match!
  return true;
}
🔍 Line-by-Line BreakdownWhy lookup[char]?Where it comes from: In JavaScript, objects are Hash Maps. Accessing a value by its key (like lookup['a']) is incredibly fast ($O(1)$).How it works: char is a variable holding a string. The square brackets [] tell JavaScript: "Go find the property inside the object that matches the value of this variable."Why (lookup[char] || 0) + 1?The Problem: When you look for a character that isn't in the object yet, JS returns undefined. You cannot do undefined + 1.The Solution: The || (OR) operator says: "If the left side is falsy (undefined), use the right side (0)." This initializes our count safely.Why not just use str2.indexOf(char)?The Trap: indexOf is actually a hidden loop. If you put indexOf inside another loop, you have accidentally created an $O(n^2)$ solution, which will fail senior-level interviews.🧠 Problem-Solving MindsetWhen solving a problem, follow these mental steps:Visualize the Object: Before coding, imagine what the object should look like (e.g., { a: 1, b: 2 }).Trade Memory for Speed: Remind yourself that creating an object uses more RAM, but the performance gain is worth it.Check the "Fall-through": Make sure your logic handles "0" correctly. In JavaScript, 0 is "falsy," which is why if (!lookup[char]) works perfectly for both "not found" and "count is zero."