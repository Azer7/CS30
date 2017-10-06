let valueArr = [];
let bubbleArray = [];
let selectionArray = [];
let insertionArray = [];

for (let i = 0; i < 10000; i++) {
    valueArr.push(Math.floor(Math.random() * 2001)); //random array 1-500
}

$("#sort").click(function () {
    bubbleArr = valueArr.slice();
    selectionArr = valueArr.slice();
    insertionArr = valueArr.slice();

    console.log("bubble: " + bubbleArr.bubbleSort() + "ms");
    console.log("selection: " + selectionArr.selectionSort() + "ms");
    console.log("insertion: " + insertionArr.insertionSort() + "ms");
});

function randomArray() {

}

function increasingArray() {

}
