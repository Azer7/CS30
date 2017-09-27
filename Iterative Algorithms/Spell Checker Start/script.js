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
    let word = $("#word").val();
    let indexResult;

    let time = Date.now();
    if (search == "linear")
        result = linearWordSearch(dictionary, word);
    else
        result = binaryWordSearch(dictionary, word);
    time = Date.now() - time;

    // Check and report if the word is in the dictionary
    if (result >= 0)
        $("#result").html(time + "ms: <br/>" + word + " is in the dictionary at index: " + result);
    else
        $("#result").html("not in dictionary");
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

    while (lowerIndex <= upperIndex) { //review can I go <?
        let middleIndex = Math.floor((upperIndex + lowerIndex) / 2);
        if (arr[middleIndex] == word)
            return middleIndex;
        else
            word > arr[middleIndex] ? lowerIndex = middleIndex + 1 : upperIndex = middleIndex - 1;
    }
    return -1;
}
