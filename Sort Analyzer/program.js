let valueArr = [];
$("#sort").click(function() {
    for(let i = 0; i < 100; i++) {
           valueArr.push(Math.floor(Math.random() * 101)); //random array 1-100
    }
    console.log(valueArr.bubbleSort() + "ms");
});
    
function randomArray() {
    
}
    
function increasingArray() {
    
}   