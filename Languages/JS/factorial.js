const prompt = require('prompt-sync')();

const num = parseInt(prompt("Enter a positive integer: "));
let factorial = 1;
if (num < 0) {
    console.log("Error! Factorial for negative number does not exist.");
} else if (num === 0) {
    console.log("The factorial of 0 is 1.");
} else {
    for (let i = 1; i <= num; i++) {
        factorial *= i;
    }
    console.log(`The factorial of ${num} is ${factorial}.`);
}