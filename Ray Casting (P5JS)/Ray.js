class Ray {
    constructor(x, y, angle) {
        this.pos = createVector(0, 0);
        this.posEnd = createVector(0, 0);
        this._angle;
        this.maxLength = 500;
        this._length = this.maxLength; //will be changed if collision is found
        //ray slope intercept form
        this.slope;
        this.yIntercept;
        this.setRay(x, y, angle)
    }

    setRay(x, y, angle) {
        this.pos.x = x;
        this.pos.y = y;

        this.angle = angle;

        this.evaluateSlopePoint();
        this.evaluateEndpoint();
    }

    get angle() {
        let inDegrees = 360 - this._angle * 180 / Math.PI;
        return Math.round(inDegrees * 100000) / 100000; //5 decimals of precision
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
        // get new end point
        this._length = newLen;
    }

    evaluateSlopePoint() {
        this.slope = Math.tan(this._angle);
        //y = slope*x + yIntercept
        //yIntercept = y - slope*x
        this.yIntercept = this.pos.y - this.slope * this.pos.x;
    }

    evaluateEndpoint() {
        this.posEnd.x = this._length * (Math.cos(this._angle) + this.pos.x / this._length);
        //this.endPos.y = this.pos.y + Math.sin(angle) * this._length;
        this.posEnd.y = this._length * (Math.sin(this._angle) + this.pos.y / this._length);
    }

    checkCollisions(objects) {
        this.evaluateSlopePoint();
        let shortest = this.maxLength;
        for (let i = 0; i < objects.length; i++) {
            for (let j = 0; j < objects[i].lines.length; j++) {
                let collisionP = this.getCollisionPoint(objects[i].lines[j]);

                if (collisionP) { //checks if it actually collided
                    let lineLength = lineMag(this.pos.x, this.pos.y, collisionP.x, collisionP.y);
                    if (lineLength < shortest)
                        shortest = lineLength;
                }
            }
        }

        this.length = shortest;
        this.evaluateEndpoint();
    }

    getCollisionPoint(line) {
        let collision;
        let hasCollided = false;

        if (Math.abs(line.slope - this.slope) < precision) { // < 10000 precision
            if (Math.abs(line.yIntercept - this.yIntercept) < precision)
                collision = createVector(this.x, this.y); //exact same line~
            else
                return;
        } else { //not blatantly undefined
            collision = createVector(0, 0);
            if (Math.abs(this.slope) > overflow) { //vertical
                collision.x = this.pos.x;
                collision.y = line.slope * collision.x + line.yIntercept;
            } else if (Math.abs(this.slope) < precision) { //horizontal
                collision.y = this.pos.y;
                collision.x = (collision.y - line.yIntercept) / line.slope;
            } else {
                collision.x = (this.yIntercept - line.yIntercept) / (line.slope - this.slope);
                collision.y = line.slope * collision.x + line.yIntercept;
            }
            //y = mx + b
        }
        return collision;
    }

    draw() {
        stroke("black");
        strokeWeight(2);

        line(this.pos.x, this.pos.y, this.posEnd.x, this.posEnd.y);
        fill(0, 0)
        strokeWeight(1);

        ellipse(this.posEnd.x, this.posEnd.y, 12);
    }
}

function lineMag(x, y, xEnd, yEnd) {
    return Math.sqrt(Math.pow(xEnd - x, 2) + Math.pow(yEnd - y, 2))
}
