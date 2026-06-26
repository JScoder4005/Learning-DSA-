// Fibonacci — three approaches every JS dev should know.

// 1. Naive recursion — O(2^n) time. Never use in production.
function fibNaive(n) {
  if (n <= 1) return n;
  return fibNaive(n - 1) + fibNaive(n - 2);
}

// 2. Memoization (top-down DP) — O(n) time, O(n) space.
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// 3. Iterative (bottom-up DP) — O(n) time, O(1) space. Best.
function fibIterative(n) {
  if (n <= 1) return n;
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}

console.log(fibNaive(10));     // 55
console.log(fibMemo(50));      // 12586269025
console.log(fibIterative(50)); // 12586269025
