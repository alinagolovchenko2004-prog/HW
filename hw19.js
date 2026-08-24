
let numbers=[1,5,2,9,4];
for (let i=0; i<numbers.length-1; i++){
    for (let n=0; n<numbers.length-1; n++){
        if(numbers[n]>numbers[n+1]){
            let t=numbers[n];
                numbers[n]=numbers[n+1];
                numbers[n+1]=t
        }
    }
}
console.log(numbers)  


function binarySearch(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;

    while (left <= right) {
        let middle = Math.floor((left + right) / 2);

        if (numbers[middle] === target) {
            return middle;
        }

        if (numbers[middle] < target) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }

    return -1;
}

let numbers = [1, 2, 4, 5, 9];

console.log(binarySearch(numbers, 5)); // 3
console.log(binarySearch(numbers, 7)); // -1

