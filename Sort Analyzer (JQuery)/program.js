$("#sort").click(function () {
    sort(randomArray(10000), "random");
    sort(increasingArray(10000), "increasing");
    sort(decreasingArray(10000), "decreasing");
    sort(increasingAnomaly(10000), "decreasing");
});

function sort(arr, type) {
    let bubbleArr = arr.slice();
    let selectionArr = arr.slice();
    let insertionArr = arr.slice();

    console.log("!" + type + "!");
    console.log("bubble: " + bubbleArr.bubbleSort() + "ms");
    console.log("selection: " + selectionArr.selectionSort() + "ms");
    console.log("insertion: " + insertionArr.insertionSort() + "ms");
    console.log("");
}

function randomArray(length, maxVal) {
    let newArray = [];
    for (let i = 0; i < length; i++) {
        newArray.push(Math.floor(Math.random() * maxVal)); //random array 0-maxVal
    }
    return newArray;
}

function increasingArray(length) {
    let newArray = [];
    for (let i = 0; i < length; i+=2) {
        newArray.push(i);
    }
    return newArray;
}

function decreasingArray(length) {
    let newArray = [];
    for (let i = length * 2; i > 0; i-=2) {
        newArray.push(i);
    }
    return newArray;
}

function increasingAnomaly(length) {
    let newArray = [];
    for (let i = 0; i < length; i+=2) {
        newArray.push(i);
    }
    if(newArray.length > 2) {
        let middle = Math.floor(newArray.length);
        let swap = newArray[middle];
        newArray[middle] = newArray[middle + 1];
        newArray[middle + 1] = swap;
    }
    return newArray;
}