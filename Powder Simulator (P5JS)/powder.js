class Particle {
    constructor(y, x, type) {
        this.y = y;
        this.x = x;
        this.type = "null";
        this.speed = 1; //is water faster than powder?  
        this.particleIndex = 0; //to keep track of where to delete
    }

    step() {
        if (this.type == "sand") {
            if (this.y < yHeight - 1 && mapArr[this.y + 1][this.x].type == "null") {//if nothing below move
                let swap = mapArr[this.y + 1][this.x]; //tile needs to be moved "up" / y--
                swap.y--;
                mapArr[this.y + 1][this.x] = this;
                mapArr[this.y][this.x] = swap;
                this.y++;
            }
        }
    }

    color() {
        let returnCol = [0, 0, 0];
        if (this.type != "null") {
            if (this.type == "sand")
                returnCol = [232, 222, 150];
            //strokeWeight(.08);
            //rect(this.x * width / xWidth, this.y * height / yHeight, tileSize, tileSize);
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