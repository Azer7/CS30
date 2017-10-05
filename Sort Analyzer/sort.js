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
        let lowIndex = i;

        for (let j = i; j < this.length; j++) {
            if (this[j] < this[lowIndex]) {
                lowIndex = j;
            }
        }
        if(lowIndex != i) {
            let greater = this[i];
            this[i] = this[lowIndex];
            this[lowIndex] = greater;
        }
    }
    time = Date.now() - time;

    return time;
}

Array.prototype.insertionSort = function () {
    let time = 0;


    return time;
}









function countMine(x, y) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j < 1; j++) {
            if (i + y > 0 && i + y < height && j + x > 0 && j + x < width) {
                count++;
            }
        }
    }
}
