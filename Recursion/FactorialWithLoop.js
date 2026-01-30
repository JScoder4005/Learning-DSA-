function factorial(n) {
  let total = 1;
  for (let i = n; i > 1; i--) {
    total *= i;
  }
  return total;
}
console.log(factorial(5));
console.log(factorial(3));
