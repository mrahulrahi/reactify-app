const prompt = require('prompt-sync')();

let arr = [];
let input = prompt("Enter the input : ");
arr = input.split(" ");
let arrLen = arr.length;
console.log(arr);
let i, j, temp;
for (i = 0; i < arrLen - 1; i++) {
    for (j = i + 1; j < arrLen; j++) {
        if (arr[i] > arr[j]) {
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    console.log(arr);
}
console.log(arr);