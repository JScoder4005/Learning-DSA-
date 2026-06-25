// Given a string of brackets, return true if it is valid.
// Valid means: every open bracket is closed in the correct order.
// Classic stack problem. Time: O(n) | Space: O(n)

function isValid(s) {
  const stack = [];
  const pairs = { ")": "(", "}": "{", "]": "[" };

  for (let char of s) {
    if ("({[".includes(char)) {
      stack.push(char); // push opening brackets onto the stack
    } else {
      // closing bracket — check it matches the top of the stack
      if (stack.pop() !== pairs[char]) return false;
    }
  }

  return stack.length === 0; // stack must be empty for fully valid input
}

console.log(isValid("()"));       // true
console.log(isValid("()[]{}"));   // true
console.log(isValid("(]"));       // false
console.log(isValid("([)]"));     // false
console.log(isValid("{[]}"));     // true
