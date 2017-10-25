class Ray {
    constructor(x, y, angle) {
        this.pos = createVector(0, 0);
        this.posEnd = createVector(0, 0);
        this._angle;
        this.maxLength = 100;
        this._length = this.maxLength; //will be changed if collision is found
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

        this.evaluateEndpoint();
        //y = slope*x + yIntercept
        //yIntercept = y - slope*x
        this.yIntercept = this.pos.y - this.slope * this.pos.x;
    }

    get angle() {
        return this._angle;
    }
    set angle(degrees) {
        //change to radians
        //360 - degrees to switch it from clockwise to counter clockwise
        this._angle = ((360 - degrees) * Math.PI / 180);
    }

    get length() {
        return this._length;
    }
    set length(newLen) {
        if (newLen != this._length) {
            // get new end point
            this._length = newLen;
        }
    }

    evaluateEndpoint() {
        //Math.cos(angle) + this.pos.x / this._length = this.endPos.x / this._length
        //this.endPos.x = this.pos.x + Math.cos(angle) * this._length; //
        this.posEnd.x = this._length * (Math.cos(this.angle) + this.pos.x / this._length);
        //this.endPos.y = this.pos.y + Math.sin(angle) * this._length;
        this.posEnd.y = this._length * (Math.sin(this.angle) + this.pos.y / this._length);
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
        let collision;
        let hasCollided = false;

        if (this.slope - line.slope == 0)
            if (this.yIntercept - line.yIntercept == 0)
                collision = createVector(this.x, this.y); //exact same line~
            else
                return;
        else { //not blatantly undefined
            
        }
        return collision;
    }

    draw() {
        stroke("black");
        strokeWeight(2);

        line(this.pos.x, this.pos.y, this.posEnd.x, this.posEnd.y);
    }
}

function lineMag(x, y, xEnd, yEnd) {
    return Math.sqrt(Math.pow(xEnd - x, 2) + Math.pow(yEnd - y, 2))
}
