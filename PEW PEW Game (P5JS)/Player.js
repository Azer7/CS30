class Player {
    constructor(x, y, rayAmount) {
        this.speed = .7;
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this._angle = Math.PI;
        this.crashed = false;

        this.rayNum = rayAmount;
        this.rays = [];

        for (let i = 0; i <= rayAmount; i++)
            this.rays.push(new Ray(width / 2, 250, i * (360 / rayAmount / 2)));
    }

    get angle() {
        let inDegrees = 360 - this._angle * 180 / Math.PI;
        return Math.round(inDegrees); //5 decimals of precision
    }
    set angle(degrees) {
        //change to radians
        //360 - degrees to switch it from clockwise to counter clockwise
        if (!this.crashed)
            this._angle = ((360 - degrees) * Math.PI / 180);
    }

    process(objArr) {
        if (!this.crashed) {
            //add movement
            this.acc.rotate(this._angle);
            this.vel.add(this.acc);
            this.vel.mult(0.93);
            this.pos.add(this.vel);
            this.acc.mult(0); // only do once

            //process rays
            for (let i = 0; i < this.rays.length; i++) {
                this.rays[i].pos = this.pos;
                this.rays[i]._angle = this._angle + this.rays[i].baseAngle;
            }

            for (let i = 0; i < this.rays.length; i++) {
                this.rays[i].checkCollisions(objArr);
                if (this.rays[i].length < 10)
                    this.crashed = true;
            }
        }
    }

    draw() {
        //draw rays
        Ray.preDraw();
        for (let i = 0; i < this.rays.length; i++) {
            this.rays[i].draw();
        }

        //draw car
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this._angle);
        rectMode(CENTER);
        fill("grey");
        rect(0, 0, 20, 40);
        pop();
    }
}