// Fill array
const numbers = [];
let i = 1;
while (i <= 100) {
  numbers.push(i++);
}

// FizzBuzz
for (const num of numbers) {
  if (num % 3 === 0) {
    if (num % 5 === 0) {
      console.log(`${num} - fizzbuzz`);
    }
    console.log(`${num} - fizz`);
  } else if (num % 5 === 0) {
    console.log(`${num} - buzz`);
  }
}
