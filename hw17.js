
let number = 11223344;
let strNumber = number.toString();
let evenSum = 0;
let oddSum = 0;

for (let x = 0; x < strNumber.length; x++) {
    let digit = parseInt(strNumber[x]);
    if (x % 2 === 0) { 
        evenSum = evenSum+ digit;
    } else {
        oddSum = oddSum + digit;
    }
}
if (evenSum === oddSum) {
    console.log("Happy number")
} else {
    console.log("Not happy number")
 }


let numbers = 123204;
let strNumbers = numbers.toString();
let firstSum = 0;
let secondSum = 0;

for (let x=0; x < strNumbers.length; x++) {
    let digit = parseInt(strNumbers[x]);
    if (x < 3) {
        firstSum = firstSum + digit;
    } else {
        secondSum = secondSum + digit;
    }
}  
if (firstSum === secondSum) {
    console.log ("Happy number")
} else {
    console.log ("Not happy number")
}

