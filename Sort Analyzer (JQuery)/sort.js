Array.prototype.bubbleSort = function () {
    let startTime = performance.now();
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
    startTime = performance.now() - startTime;
    return Math.round(startTime * 100) / 100;
}

Array.prototype.selectionSort = function () {
    let startTime = performance.now();
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
        if (lowIndex != i) {
            let greater = this[i];
            this[i] = this[lowIndex];
            this[lowIndex] = greater;
        }
    }
    startTime = performance.now() - startTime;

    return Math.round(startTime * 100) / 100;
}

Array.prototype.insertionSort = function () {
    let startTime = performance.now();

    for (let i = 1; i < this.length; i++) { //loop through array upwards
        let currentVal = this[i];
        let j;
        for (j = i - 1; j >= 0; j--) {
            if (currentVal < this[j]) {
                this[j + 1] = this[j];
            } else
                break;
        }
        this[j + 1] = currentVal;
    }
    startTime = performance.now() - startTime;

    return Math.round(startTime * 100) / 100;
}
