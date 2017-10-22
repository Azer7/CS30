let arr = [16, 1, 4, 8, 3, 15, 11, 10];

function binarySearch(arr, item) {
    let lowerIndex = 0;
    let upperIndex = arr.length;
    let middleIndex;
    
    while(lowerIndex <= upperIndex) {
        middleIndex = Math.floor((lowerIndex + upperIndex)/2);    
        if(arr[middleIndex] == item) {
            return middleIndex;
        } else if(arr[middleIndex] < item) {
            lowerIndex = middleIndex + 1;
        } else if(arr[middleIndex] > item) {
            upperIndex = middleIndex - 1;
        }
    }
    return -1;
}

function bubbleSort(arr) {
    let hasSwapped = false;
    
    do {
        hasSwapped = false;
        for(let i = 0; i < arr.length - 1; i++) {
            if(arr[i] > arr[i + 1]) {
                let swap = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = swap;
                hasSwapped = true;
            }
        }
    } while(hasSwapped == true);
}    

bubbleSort(arr);

function selectionSort(arr) {
    for(let i = 0; i < arr.length - 1; i++) {
        let 
        
        
    }
}