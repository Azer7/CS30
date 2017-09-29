// Load dictionary from file
var dictionary;
var book;
var errorNum;
var errors = [];

$.get("data files/dictionary.txt", function (data) {
    data = data.trim();
    dictionary = data.split("\r\n");
    console.log(dictionary);
});


$.get("data files/AliceInWonderLand.txt", function (data) {
    book = data;
});

$("#check-word-lin").click(function () {
    checkWord("linear");
});

$("#check-word-bin").click(function () {
    checkWord("binary");
});

$("#check-document-lin").click(function () {
    checkDocument("linear");
});
$("#check-document-bin").click(function () {
    checkDocument("binary");
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

function checkDocument(search) {
    var regExp = /[a-zA-Z]{2,}/g,
        match;
    errorNum = 0;
    let time = Date.now();
    while (match = regExp.exec(book)) {
        if (match[0] != "ll" && match[0] != "ve") {
            if (search == "linear") {
                if (linearWordSearch(dictionary, match[0].toLowerCase()) == -1) {
                    errorNum++;
                    errors.push(match[0].toLowerCase());
                }
            } else {
                if (binaryWordSearch(dictionary, match[0].toLowerCase()) == -1) {
                    errorNum++;
                    errors.push(match[0].toLowerCase());
                }
            }
        }
    }
    time = Date.now() - time;
    let $errorP = $("#errors");
    $errorP.html("found " + errorNum + " errors in " + time + "ms <br/>");
    for (let i = 0; i < errors.length; i++)
        $errorP.append(errors[i] + "<br/>");
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
