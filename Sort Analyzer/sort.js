Array.prototype.bubbleSort = function () {
    let time = Date.now();
    let counter = 1;
    let hasSwapped;

    do {
        hasSwapped = false;
        for (let i = 0; i < this.length - counter; i++) {
            if (this[i] > this[i + 1]) {
                hasSwapped = true;
                let greater = this[i];
                this[i] = this[i + 1];
                this[i + 1] = greater;
            }
        }
        counter++;
    } while (hasSwapped == true);
    time = Date.now() - time;
    return time;
}

Array.prototype.selectionSort = function () {
    let time = Date.now();
    let counter = 0;
    let hasSwapped;


    for (let i = 0; i < this.length; i++) {
        hasSwapped = false;
        let maxVal = this[counter];
        let maxIndex = 0;

        for (let i = counter; i < Array.length; i++) {
            if (this[i] > maxVal) {
                maxVal = this[i];
                maxIndex = i;
            }
        }
    }
    
    counter++;
}
while (hasSwapped == true);
time = Date.now() - time;

return time;
}

Array.prototype.insertionSort = function () {
    let time = 0;


    return time;
}
