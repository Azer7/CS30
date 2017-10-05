let valueArr = [];
let bubbleArray = [];
let selectionArray = [];
let insertionArray = [];

$("#sort").click(function() {
    for(let i = 0; i < 100; i++) {
           valueArr.push(Math.floor(Math.random() * 101)); //random array 1-100
    }
    bubbleArray = valueArr.slice();
    selectionArray = valueArr.slice();
    insertionArray = valueArr.slice();    
    
    console.log(selectionArray.selectionSort() + "ms");
});
    
function randomArray() {
    
}
    
function increasingArray() {
    
}   