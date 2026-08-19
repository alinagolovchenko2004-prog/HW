
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