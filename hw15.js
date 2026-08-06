

console.log(false == 0);   // true, false при == приравнивается к 0
console.log(false === 0);  // false, разные типы, boolean and number, === строгое сравнение

console.log("" == 0);   // true, "" = 0
console.log("" === 0);  // false, string and number

console.log(null == undefined);  // true, потому что оба пустые
console.log(null === undefined);  //false, different types

console.log("55" == 55);   // true , string при == строка превращается в число
console.log("55" === 55);  // false, different types

console.log("true" == true);  //false, "true" = NaN
console.log("true" === true); //false, different types

console.log((0.2 + 0.1 - 0.3) == true);  //false, true = 1
console.log((0.2 + 0.1 - 0.3) === true);  //false, different types

console.log((0.2 + 0.1 - 0.3) == false);  //false, because in JS  (0.2 + 0.1 - 0.3) is not 0, is 0.0000000...5
console.log((0.2 + 0.1 - 0.3) === false);  //false , different types


console.log({} == {});  //false, different object
console.log({} === {}); // false, different object

console.log({} == "[object Object]"); //true, {} is [object Object]
console.log({} === "[object Object]");// false, different type, object and string

console.log({} == true);  // false, {} = NaN
console.log({} == false); // false , object and boolean

console.log({} == 0);  //false, {} = Nan
console.log({} == NaN); //false, Nan == Nan не равен самому себе
