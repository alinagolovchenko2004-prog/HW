// # HW_20_TEXT
// 1.Создайте массив на 10 строк.

// 2.Создайте функцию comparator(a,b), которая  принимает 2 строки  и 
// возвращает 1 - если первое строка длиннее, -1 если вторая строка длиннее, 
// 0 если равны.  
// Используйте синтаксис function declaration, вызовите эту фкнкцию и 
// напечатайте результат.
// Напишите эту эе функцию используя Function Expression и Arrow Function  

// 3.Напишите функцию, которая принимает массив и функуию-компаратор, 
// и возвращает самое большое значение в массиве. Вызовите эту функцию, передав 
// ей массив строк, полученный в первой задаче и функцию, написанную во второй задаче.


const massive = ["apple", "orange", "banana", "grape", "apple", "orange", "banana", "grape", "kiwi", "cherries"];

function comparator(a,b) {
    if (a.length > b.length) {
        return 1;
    }
    if (a.length < b.length) {
        return -1;
    }
    if (a.length === b.length) {
        return 0;
    }
}

console.log(comparator(massive[0],massive[1]));

const comparator2 = (a,b) => {
    if (a.length > b.length) {
        return 1;
    }
    if (a.length < b.length) {
        return -1;
    }
    if (a.length === b.length) {
        return 0;
    }
}

console.log(comparator2(massive[0],massive[1]));

const comparator3 = function(a,b) {
    if (a.length > b.length) {
        return 1;
    }
    if (a.length < b.length) {
        return -1;
    }
    if (a.length === b.length) {
        return 0;
    }
}

console.log(comparator3(massive[0],massive[1]));

function findMax(array, comparator) {
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
        if (comparator (array[i],max) ===1) {
            max = array [i];
        }
    }
    return max;
}

console.log(findMax(massive, comparator));