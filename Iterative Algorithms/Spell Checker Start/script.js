// Load dictionary from file
var dictionary;
$.get("data files/dictionary.txt", function (data) {
    data = data.trim();
    dictionary = data.split("\r\n");
    console.log(dictionary);
});

// Document Ready Code
$(document).ready(function () {
    // Add a click event listener to my checkWord button
    $("#check-word-lin").on("click", checkWordLin());
    $("#check-word-bin").click(checkWordBin());

});

// Helper Functions
function checkWordLin() {
    // Get the word the user typed into the input element
    var word = $("#word").val();
    linearWordSearch(dictionary, word);

    // Check and report if the word is in the dictionary
    $("#result").html(word + " is in the dictionary.");
}

function checkWordBin() {
    // Get the word the user typed into the input element
    var word = $("#word").val();
    binaryWordSearch(dictionary, word);
    
    // Check and report if the word is in the dictionary
    $("#result").html(word + " is in the dictionary.");
}

// Search
function linearWordSearch(arr, word) {
    for (let i = 0; i < arr.length; i++) {
        console.log(i);
        if (arr[i] == word)
            return i;
    }
    return -1;
}

function binaryWordSearch(arr, word) {
    let lowerIndex = 0;
    let upperIndex = arr.length - 1;


    return -1;
}
