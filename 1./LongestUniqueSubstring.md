The "Master" Optimization (The Hash Map Way)In a high-level interview (like Google or Meta), they might ask: "Can you do this without the while loop to make it even faster?"The version we brainstormed uses a Hash Map (Object) to store the index of the character. Instead of slowly shrinking the window with a while loop, we jump the left pointer directly to where it needs to be.The "Jump" Implementation:JavaScript

function longestUniqueSubstringMaster(str) {
let start = 0;
let maxLength = 0;
let seen = {}; // We store { character: index }

for (let end = 0; end < str.length; end++) {
let char = str[end];

    if (seen[char] !== undefined) {
      // JUMP: Move start to the right of the last seen duplicate
      // But only if that duplicate is inside our current window!
      start = Math.max(start, seen[char] + 1);
    }

    // Update the index of the character we just saw
    seen[char] = end;

    // Standard max calculation
    maxLength = Math.max(maxLength, end - start + 1);

}

return maxLength;
}
Why the "Jump" is better:Fewer Operations: In your Set version, if you have [a, b, c, d, e, f, a], your while loop has to run many times to delete a, b, c, d, e, f.The Jump version just says: "Oh, a was at index 0? My new start is now index 1." One operation.🎓 Summary of Patterns CoveredWe have officially finished the "Big Three" of Array/String manipulation:PatternMental ModelBest CaseFrequency CounterThe Grocery List / NotebookAnagrams, counting occurrences.Multiple PointersTwo people walking (opposite or same way)Sorted data, finding pairs, unique counts.Sliding WindowA camera lens moving across a sceneSubstrings, sub-arrays, consecutive data.
