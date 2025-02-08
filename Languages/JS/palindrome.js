const prompt = require('prompt-sync')();

let str = prompt("Enter a string : ");
let upperStr = str.toUpperCase();
let ln = upperStr.length;
let reversedStr = "";

console.log("Length of string : " + ln);

for (var i = ln - 1; i >= 0; i--) {
    reversedStr += upperStr[i];
}

console.log("Reversed string : " + reversedStr);

if (upperStr == reversedStr) {
    console.log("Given string is a palindrome.");
} else {
    console.log("Given string is not a palindrome.");
}