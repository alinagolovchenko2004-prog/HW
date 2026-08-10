
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(numbers);
numbers.push(11);
numbers.unshift(0);
console.log(numbers);
numbers.shift();
numbers.pop();
console.log(numbers);
numbers[3] = 99;
// numbers.splice(3, 1, 99);
console.log(numbers);
console.log(numbers.length);