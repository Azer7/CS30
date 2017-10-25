class Ray {
    constructor(x, y, angle) {
        this.pos = createVector(0, 0);
        this.posEnd = createVector(0, 0);
        this.angle;
        this.maxLength = 100;
        this.length = this.maxLength; //will be changed if collision is found
        //ray slope intercept form
        this.slope;
        this.yIntercept;
        this.setRay(x, y, angle)
    }

    setRay(x, y, angle) {
        this.pos.x = x;
        this.pos.y = y;

        if (angle) {
            this.angle = angle;
            this.slope = Math.tan(this.angle);
        }

        this.posEnd.x;
        //y = slope*x + yIntercept
        //yIntercept = y - slope*x
        this.yIntercept = this.pos.y - this.slope * this.pos.x;
    }

    set angle(degrees) {
        //change to radians
    }

    set length(newLen) {
        console.log("length set");
        if (newLen != this.length) {
        // get new end point
            this.length = newLen;
            this.endPos.x = this.pos.x + Math.cos(angle) * this.length
            

        }
    }

    checkCollisions(objects) {
        let shortest = this.maxLength;
        for (let i = 0; i < objects.length; i++) {
            for (let j = 0; j < objects[i].lines; i++) {
                let collisonP = getCollisionPoint(objects[i].lines[j]);

                if (collisionP) { //checks if it actually collided
                    let lineLength = lineMag(this.x, this.y, this.collisionP.x, this.collisonP.y);
                    if (lineLength < shortest)
                        shortest = lineLength;
                }
            }
        }
        
        this.length = shortest;
    }

    getCollisionPoint(line) {

    }
}

function lineMag(x, y, xEnd, yEnd) {
    return Math.sqrt(Math.pow(xEnd - x, 2) + Math.pow(yEnd - y, 2))
}