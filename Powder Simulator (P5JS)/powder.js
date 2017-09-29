class Particle {
    constructor(y, x, type) {
        this.y = y;
        this.x = x;
        this.type = "empty";
        this.speed = 1; //is water faster than powder?  
        this.particleIndex = 0; //to keep track of where to delete
    }

    step() {
        if (this.type == "sand") {
            this.swapDown("empty");
        }
    }

    swapDown() {
        let valid = false;
        for (let i = 0; i < arguments.length; i++) {
            if (mapArr[this.y + 1][this.x].type == arguments[i]) {
                valid = true;
                break;
            }
        }

        if (this.y < yHeight - 1 && valid) { //if nothing below move
            let swap = mapArr[this.y + 1][this.x]; //tile needs to be moved "up" / y--
            swap.y--;
            mapArr[this.y + 1][this.x] = this;
            mapArr[this.y][this.x] = swap;
            this.y++;
        }
    }

    swapUp() {


    }

    swapLeft() {


    }

    swapRight() {


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
    }
}
