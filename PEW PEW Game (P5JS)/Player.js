class Player {
    constructor(x, y) {
        this.speed = .7;
        this.friction = .1; // 5% of velocity is lost
        this.pos = new Vector(x, y);
        this.vel = new Vector(0, 0);
        this.acc = new Vector(0, 0);
        this._angle = 0;
        this.dead = false;

        this.laser = new Ray(x, y, 0, 800);
        this.rays = [];
        for (let i = 0; i < 8; i++) {
            this.rays.push(new Ray(x, y, 0, 50))
            this.rays[i].angle = 45 * i;
        }
        this.shooting = false;

        //this.rays.push();
        this.barrelPos = new Vector(70, 6);

        //this.player = new createjs.Shape(graphics.player);
        this.sprite = new createjs.Sprite(playerSpriteSheet, "idle");
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.scaleX = .4;
        this.sprite.scaleY = .4;
        stage.addChild(this.sprite);
        this.sprite.addEventListener("change", this.animate);
    }

    animate(target, type) {
        //console.log("yee");
    }

    get angle() {
        let inDegrees = this._angle * 180 / Math.PI;
        return Math.round(inDegrees); //5 decimals of precision
    }
    set angle(degrees) {
        //change to radians
        this._angle = degrees * Math.PI / 180;
    }

    process(objArr) {
        //add player movement
        //this.acc.rotate(this._angle);
        this.vel.add(this.acc);
        this.vel.multiplyScalar(1 - this.friction);
        this.pos.add(this.vel);
        this.constrainVel(0, width, 0, height);
        this.acc.multiplyScalar(0); // only do once

        //detect player angle
        //.subtract(new Vector(70, 6).rotateBy(this._angle).multiplyScalar(0.1))
        let posChange = new Vector();

        for (let i = 0; i < this.rays.length; i++) {
            this.rays[i].pos = this.pos;
            this.rays[i].checkCollisions(objArr);
            let largestVector = new Vector(-1, this.rays[i].slope);
            if (this.rays[i].angle <= 90 && this.rays[i].angle >= -90) {
                largestVector.x = 1;
                largestVector.y *= -1;
            }

            if (this.rays[i].angle <= 0)
                largestVector.y *= -1;

            largestVector.multiplyScalar(this.rays[i].maxLength / largestVector.length());
            posChange.x -= .01 * (largestVector.x - (this.rays[i].posEnd.x - this.rays[i].pos.x));
            posChange.y -= .01 * (largestVector.y - (this.rays[i].posEnd.y - this.rays[i].pos.y));
            //this.pos.y += 5 / this.rays[3].length;
            //this.pos.y -= 5 / this.rays[1].length;
            console.log();
        }
        if (posChange.length() > 0.01)
            this.pos.add(posChange);

        this._angle = mouse.clone().subtract(this.pos).angle();
        let angleChange = mouse.clone().subtract(this.barrelPos.clone().rotateBy(this._angle).multiplyScalar(0.001)).subtract(this.pos).angle() - this._angle;
        this._angle += angleChange * 1000;

        //process gun
        this.laser.pos = this.barrelPos.clone().rotateBy(this._angle).add(this.pos);
        this.laser._angle = this._angle;
        this.laser.checkCollisions(objArr);
    }

    constrainVel(xlow, xhigh, ylow, yhigh) {
        if (this.pos.x < xlow) {
            this.pos.x = xlow;
            this.vel.x = 0;
        } else if (this.pos.x > xhigh) {
            this.pos.x = xhigh;
            this.vel.x = 0;
        }
        if (this.pos.y < ylow) {
            this.pos.y = ylow;
            this.vel.y = 0;
        } else if (this.pos.y > yhigh) {
            this.pos.y = yhigh;
            this.vel.y = 0;
        }
    }

    draw() {
        //draw rays
        this.laser.active = this.shooting;
        this.laser.draw();
        for (let i = 0; i < this.rays.length; i++)
            this.rays[i].draw();

        //draw player
        this.sprite.x = this.pos.x;
        this.sprite.y = this.pos.y;
        this.sprite.rotation = this.angle
    }
}
