class Particle {
    constructor(y, x, type) {
        this.y = y;
        this.x = x;
        this.type = "empty";
        this.speed = .5; //is water faster than powder?  0 -> 1
        this.particleIndex = 0; //to keep track of where to delete
    }

    step() {
        if (Math.random() < this.speed) {
            let rand = Math.random();
            switch (this.type) {
                case "sand":
                    this.swapDown("empty", "water");
                    break;

                case "stone":
                    break;

                case "water":
                    if (rand < 0.25)
                        this.swapLeft("empty", "water");
                    else if (rand < 0.5)
                        this.swapRight("empty", "water");
                    else
                        this.swapDown("empty", "water");
                    break;
            }
        }
    }

    swapDown() {
        let valid = false;
        let typeToSwap;
        for (let i = 0; i < arguments.length; i++) {
            if (this.y < yHeight - 1 && mapArr[this.y + 1][this.x].type == arguments[i]) {
                valid = true;
                typeToSwap = mapArr[this.y + 1][this.x].type;
                if (typeToSwap == "water" && this.type == "sand")
                    console.log();
                break;
            }
        }

        if (valid) { //if nothing below move
            switch (typeToSwap) {
                case "water": //below is water
                    if (this.type == "sand") {
                        if (Math.random < 0.5)
                            this.swapLeft("empty");
                        else
                            this.swapRight("empty");
                    }
                    break;

                default: //what normally do
                    let swap = mapArr[this.y + 1][this.x];
                    swap.y--;
                    mapArr[this.y + 1][this.x] = this;
                    mapArr[this.y][this.x] = swap;
                    this.y++;
                    break;
            }
        }
    }

    swapUp() {
        let valid = false;
        for (let i = 0; i < arguments.length; i++) {
            if (this.y > 0 && mapArr[this.y - 1][this.x].type == arguments[i]) {
                valid = true;
                break;
            }
        }

        if (valid) { //if nothing below move
            let swap = mapArr[this.y - 1][this.x];
            swap.y++;
            mapArr[this.y - 1][this.x] = this;
            mapArr[this.y][this.x] = swap;
            this.y--;
        }
    }

    swapRight() {
        let valid = false;
        let typeToSwap;
        for (let i = 0; i < arguments.length; i++) {
            if (this.x < xWidth - 1 && mapArr[this.y][this.x + 1].type == arguments[i]) {
                valid = true;
                typeToSwap = mapArr[this.y][this.x + 1].type;
                break;
            }
        }

        if (valid) { //if nothing below right
            switch (typeToSwap) {
                case "water":
                    this.swapLeft("empty");
                    break;

                default: //what normally do
                    let swap = mapArr[this.y][this.x + 1];
                    swap.x--;
                    mapArr[this.y][this.x + 1] = this;
                    mapArr[this.y][this.x] = swap;
                    this.x++;
                    break;
            }
        }
    }

    swapLeft() {
        let valid = false;
        let typeToSwap;
        for (let i = 0; i < arguments.length; i++) {
            if (this.x > 0 && mapArr[this.y][this.x - 1].type == arguments[i]) {
                valid = true;
                typeToSwap = mapArr[this.y][this.x - 1].type;
                break;
            }
        }

        if (valid) { //if nothing to left move left
            switch (typeToSwap) {
                case "water":
                    this.swapRight("empty")
                    break;

                default: //what normally do
                    let swap = mapArr[this.y][this.x - 1];
                    swap.x++;
                    mapArr[this.y][this.x - 1] = this;
                    mapArr[this.y][this.x] = swap;
                    this.x--;
            }
        }
    }

    color() {
        let returnCol = [0, 0, 0];
        if (this.type != "empty") {
            if (this.type == "sand")
                returnCol = [232, 222, 150];
            else if (this.type == "stone")
                returnCol = [150, 150, 150];
            else if (this.type == "water")
                returnCol = [40, 40, 255];

        }
        return returnCol;
    }

    changeType(type) {
        this.type = type;
        if (this.type == "empty") {
            //remove from particleArr q.q
        } else {
            particleArr.push(this); //added particle
            this.particleIndex = particleArr.length - 1;
        }

        switch (this.type) {
            case "sand":
                this.speed = .3;
                break;
            case "water":
                this.speed = .7;
                break;

        }
    }
}
