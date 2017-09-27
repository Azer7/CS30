// Load dictionary from file
var dictionary;
$.get("data files/dictionary.txt", function (data) {
    data = data.trim();
    dictionary = data.split("\r\n");
    console.log(dictionary);
});

$("#check-word-lin").click(function () {
    checkWord("linear");
});

$("#check-word-bin").click(function () {
    checkWord("binary");
});

function checkWord(search) {
    // Get the word the user typed into the input element
    var word = $("#word").val();
    let time = Date.now();
    if (search == "linear")
        linearWordSearch(dictionary, word);
    else
        binaryWordSearch(dictionary, word);
    time = Date.now() - time;

    // Check and report if the word is in the dictionary
    $("#result").html(word + " is in the dictionary. " + time);

}

// Search
function linearWordSearch(arr, word) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == word)
            return i;
    }
    return -1;
}

function binaryWordSearch(arr, word) {
    let lowerIndex = 0;
    let upperIndex = arr.length - 1;
    let middleIndex = Math.floor((arr.length - 1) / 2);
    while (lowerIndex <= upperIndex) { //review can I go <?
        if (arr[middleIndex] == word)
            return middleIndex;
        else if (true) {

        }
    }
    return -1;
}
