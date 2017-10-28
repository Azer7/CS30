class Ray {
    constructor(x, y, angle) {
        this.pos = new Two.Vector(0, 0);
        this.posEnd = new Two.Vector(0, 0);
        this._angle;
        this.maxLength = 1000;
        this.length = this.maxLength; //will be changed if collision is found
        //ray slope intercept form
        this.slope;
        this.yIntercept;
        this.setRay(x, y, angle)
        this.tLine = two.makeLine(this.pos.x, this.pos.y, this.posEnd.x, this.posEnd.y);
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
        return Math.round(inDegrees * precision) / precision; //5 decimals of precision
    }
    set angle(degrees) {
        //change to radians
        //360 - degrees to switch it from clockwise to counter clockwise
        this._angle = ((360 - degrees) * Math.PI / 180);
    }

    evaluateSlopePoint() {
        this.slope = Math.tan(this._angle);
        //y = slope*x + yIntercept
        //yIntercept = y - slope*x
        this.yIntercept = this.pos.y - this.slope * this.pos.x;
    }

    evaluateEndpoint() {
        this.posEnd.x = this.length * (Math.cos(this._angle) + this.pos.x / this.length);
        //this.endPos.y = this.pos.y + Math.sin(angle) * this.length;
        this.posEnd.y = this.length * (Math.sin(this._angle) + this.pos.y / this.length);
    }

    checkCollisions(objects) {
        this.evaluateSlopePoint();
        let shortest = this.maxLength;
        for (let i = 0; i < objects.length; i++) {
            for (let j = 0; j < objects[i].lines.length; j++) {
                let collisionP = this.getCollisionPoint(objects[i].lines[j]);

                if (collisionP) { //checks if it actually collided
                    let lineLength = lineMag(this.pos.x, this.pos.y, collisionP.x, collisionP.y);
                    if (lineLength < shortest) {
                        this.length = lineLength
                        this.evaluateEndpoint();
                        if (Math.abs(this.posEnd.x - collisionP.x) < precision && Math.abs(this.posEnd.y - collisionP.y < precision)) {
                            if (this.posEnd.x >= objects[i].lines[j].pos.x && this.posEnd.x <= objects[i].lines[j].posEnd.x && ((this.posEnd.y >= objects[i].lines[j].pos.y && this.posEnd.y <= objects[i].lines[j].posEnd.y) || (this.posEnd.y <= objects[i].lines[j].pos.y && this.posEnd.y >= objects[i].lines[j].posEnd.y)))
                                shortest = lineLength;
                        }
                    }
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
                collision = new Two.Vector(this.x, this.y); //exact same line~
            else
                return;
        } else { //not blatantly undefined
            collision = new Two.Vector(0, 0);
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

    static preDraw() {
        stroke("black");
        strokeWeight(2);
    }

    draw() {
        line(this.pos.x, this.pos.y, this.posEnd.x, this.posEnd.y);
    }
}

function lineMag(x, y, xEnd, yEnd) {
    return Math.sqrt(Math.pow(xEnd - x, 2) + Math.pow(yEnd - y, 2))
}
