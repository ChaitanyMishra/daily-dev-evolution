// WAP TO FIND THE SECOND LARGES NUMBER IN ARRAY: 

let arr = [10, 9, 8, 7];

// Output: 67
let maxValue = 0
let secondLargest = 0
for(let i = 0 ; i < arr.length ; i++){
    for(let j = i+1 ; j< arr.length ; j++){
        if(arr[i] > arr[j]){
            secondLargest = maxValue
            maxValue = arr[i]
        }else{
            secondLargest = maxValue
            maxValue  = arr[j] 
        }

    }
}
console.log(secondLargest)