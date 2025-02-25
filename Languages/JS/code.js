const prompt = require('prompt-sync')();

let timeLimit = parseInt(prompt("Enter Time Limit: "));
let fixedPrice = 20;
if (timeLimit <= 60) {
    console.log("Price for " + timeLimit + " minutes : " + fixedPrice + " Rupees ");
} else {
    for (var i = 61; i <= timeLimit; i++) {
        fixedPrice += 2;
    }
    console.log("Price for " + timeLimit + " minutes : " + fixedPrice + " Rupees ");
}