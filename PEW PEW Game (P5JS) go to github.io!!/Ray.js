class Ray {
    constructor(x, y, angle, length, display) {
        this.pos = new Vector(x, y);
        this.posEnd = new Vector(0, 0);
        this._angle = angle * Math.PI / 180;
        this.maxLength = length;
        this.length = this.maxLength; //will be changed if collision is found
        //ray slope intercept form
        this.slope;
        this.yIntercept;

        this.evaluateSlopePoint();
        this.evaluateEndpoint();

        this.active = false;
        this.defaultRay = {
            c: createjs.Graphics.getRGB(0, 0, 30, .3),
            s: 1
        };
        this.activeRay = {
            c: createjs.Graphics.getRGB(180, 0, 30, .9),
            s: 7
        };

        if (display) {
            this.line = new createjs.Shape();
            this.strokeSize = this.line.graphics.setStrokeStyle(this.defaultRay.s, "round").command;
            this.strokeColor = this.line.graphics.beginStroke(this.defaultRay.c).command;
            this.moveTo = this.line.graphics.moveTo(0, 0).command;
            this.lineTo = this.line.graphics.lineTo(0, 0).command;
            gameAssets.addChild(this.line);
        }
    }

    get angle() {
        let inDegrees = this._angle * 180 / Math.PI;
        return inDegrees; //5 decimals of precision
    }
    set angle(degrees) {
        //change to radians
        //360 - degrees to switch it from clockwise to counter clockwise
        this._angle = ((degrees) * Math.PI / 180);
    }

    evaluateSlopePoint() {
        this.slope = Math.tan(this._angle);
        //y = slope*x + yIntercept
        //yIntercept = y - slope*x
        this.yIntercept = this.pos.y - this.slope * this.pos.x;
    }

    evaluateEndpoint() {
        //cos(x) = a/h
        //
        this.posEnd.x = this.length * Math.cos(this._angle) + this.pos.x;
        //this.endPos.y = this.pos.y + Math.sin(angle) * this.length;
        this.posEnd.y = this.length * Math.sin(this._angle) + this.pos.y;
    }

    checkCollisions(objects) {
        this.evaluateSlopePoint();
        let shortest = this.maxLength;
        let shortestIndex = -1;
        for (let i = 0; i < objects.length; i++) {
            let object = objects[i] instanceof Enemy ? objects[i].collision : objects[i];
            for (let j = 0; j < object.lines.length; j++) {
                let collisionP = this.getCollisionPoint(object.lines[j]);

                if (collisionP) { //checks if it actually collided
                    let lineLength = lineMag(this.pos.x, this.pos.y, collisionP.x, collisionP.y);
                    if (lineLength < shortest) {
                        this.length = lineLength
                        this.evaluateEndpoint();
                        if (Math.abs(this.posEnd.x - collisionP.x) < precision && Math.abs(this.posEnd.y - collisionP.y) < precision) {
                            if (this.posEnd.x >= object.lines[j].pos.x && this.posEnd.x <= object.lines[j].posEnd.x && ((this.posEnd.y >= object.lines[j].pos.y && this.posEnd.y <= object.lines[j].posEnd.y) || (this.posEnd.y <= object.lines[j].pos.y && this.posEnd.y >= object.lines[j].posEnd.y))) {
                                shortest = lineLength;
                                shortestIndex = i;
                            }
                        }
                    }
                }
            }
        }

        this.length = shortest;
        this.evaluateEndpoint();
        return shortestIndex;
    }

    getCollisionPoint(line) {
        let collision;
        let hasCollided = false;

        if (Math.abs(line.slope - this.slope) < precision) { // < 10000 precision
            if (Math.abs(line.yIntercept - this.yIntercept) < precision)
                collision = new Vector(this.x, this.y); //exact same line~
            else
                return;
        } else { //not blatantly undefined
            collision = new Vector(0, 0);
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

    update() {
        if (this.active) {
            this.strokeSize.width = this.activeRay.s;
            this.strokeColor.style = this.activeRay.c;
        } else {
            this.strokeSize.width = this.defaultRay.s;
            this.strokeColor.style = this.defaultRay.c;
        }
        this.moveTo.x = this.pos.x;
        this.moveTo.y = this.pos.y;

        this.lineTo.x = this.posEnd.x;
        this.lineTo.y = this.posEnd.y;
    }
}

function lineMag(x, y, xEnd, yEnd) {
    return Math.sqrt(Math.pow(xEnd - x, 2) + Math.pow(yEnd - y, 2))
}
