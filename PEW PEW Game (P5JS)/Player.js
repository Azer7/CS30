class Player {
    constructor(x, y) {
        this.baseSpeed = .6;
        this.speed = this.baseSpeed;
        this.friction = .1; // 5% of velocity is lost
        this.pos = new Vector(x, y);
        this.vel = new Vector(0, 0);
        this.acc = new Vector(0, 0);
        this._angle = 0;
        this.dead = false;

        this.maxHealth = 100;
        this._health = this.maxHealth;

        this.equippedGun = 0;

        this.damage = 4; //dictated by gun
        this.energyDischarge = 5; //dictated by gun
        this.energyRecharge = 4;
        this.maxEnergy = 100;
        this.energy = this.maxEnergy;
        this.maxBoost = 100;
        this.boost = this.maxBoost;
        this.boostDischarge = 6;
        this.boostRecharge = .4;
        this.boostSpeed = 1;

        this.laser = new Ray(x, y, 0, 800, true);
        this.rays = [];
        for (let i = 0; i < 72; i++) {
            this.rays.push(new Ray(x, y, 0, 50, false))
            this.rays[i].angle = 5 * i;
        }
        this.shooting = false;
        this.boosting = false;

        //this.rays.push();
        this.barrelPos = new Vector(70, 6);

        //this.player = new createjs.Shape(graphics.player);
        this.sprite = new createjs.Sprite(playerSpriteSheet, "idle");
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.scaleX = .4;
        this.sprite.scaleY = .4;
        stage.addChild(this.sprite);
        gameAssets.addChild(this.sprite);

        //health bar
        this.healthbar = new createjs.Shape();
        this.healthbar.graphics.setStrokeStyle(10, "round")
        this.healthbar.graphics.beginStroke(createjs.Graphics.getRGB(180, 0, 30, 1));
        this.healthbar.graphics.moveTo(80, 13);
        this.healthbarTo = this.healthbar.graphics.lineTo(195, 13).command;
        gameAssets.addChild(this.healthbar);

        //energy bar
        this.energybar = new createjs.Shape();
        this.energybar.graphics.setStrokeStyle(11, "round")
        this.energybar.graphics.beginStroke(createjs.Graphics.getRGB(190, 200, 45, 1));
        this.energybar.graphics.moveTo(93, 44);
        this.energybarTo = this.energybar.graphics.lineTo(205, 44).command;
        gameAssets.addChild(this.energybar);

        //boost bar
        this.boostbar = new createjs.Shape();
        this.boostbar.graphics.setStrokeStyle(11, "round")
        this.boostbar.graphics.beginStroke(createjs.Graphics.getRGB(40, 60, 170, 1));
        this.boostbar.graphics.moveTo(80, 75);
        this.boostbarTo = this.boostbar.graphics.lineTo(195, 75).command;
        gameAssets.addChild(this.boostG);

        this.boostG = new createjs.Shape();
        this.boostG.graphics.setStrokeStyle(1);
        this.boostG.graphics.beginStroke(createjs.Graphics.getRGB(40, 111, 180, 0.6));
        this.boostG.graphics.beginFill(createjs.Graphics.getRGB(46, 136, 205, 0.4));
        this.boostG.graphics.drawCircle(0, 0, 45);
        this.boostG.x = this.pos.x;
        this.boostG.y = this.pos.y;
        this.boostG.visible = false;
        gameAssets.addChild(this.boostG);
    }

    reset() {
        //calculate stats
        this.damage = upgrades.Damage.getValue(upgrades.Damage.level);
        this.maxHealth = upgrades.Health.getValue(upgrades.Health.level);
        this.speed = upgrades.Speed.getValue(upgrades.Speed.level);
        this.maxEnergy = upgrades.Max_Energy.getValue(upgrades.Max_Energy.level);
        this.maxBoost = upgrades.Max_Boost.getValue(upgrades.Max_Boost.level);
        this.energyRecharge = upgrades.Energy_Recharge.getValue(upgrades.Energy_Recharge.level);
        this.boostRecharge = upgrades.Boost_Recharge.getValue(upgrades.Boost_Recharge.level);
        this.boostSpeed = upgrades.Boost_Speed.getValue(upgrades.Boost_Speed.level);
        this.energyDischarge = guns[this.equippedGun].energyCost;

        //reset variable stats
        this.health = this.maxHealth;
        this.energy = this.maxEnergy;
        this.boost = this.maxBoost;
        this.speed = this.baseSpeed;
        this.shooting = false;
        this.boosting = false;
        this.boostG.visible = false;
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
        //calculate laser energy
        if (this.shooting)
            this.energy -= this.energyDischarge;
        this.energy += this.energyRecharge;

        if (this.energy < 0) {
            this.energy = 0;
            this.shooting = false;
        } else if (this.energy > this.maxEnergy)
            this.energy = this.maxEnergy;
        this.energybarTo.x = this.energy / this.maxEnergy * 112 + 93;

        //calculate boost energy
        if (this.boosting) {
            this.boost -= this.boostDischarge;
            this.boostG.x = this.pos.x;
            this.boostG.y = this.pos.y;
        }
        this.boost += this.boostRecharge;

        if (this.boost < 0) {
            this.boost = 0;
            this.boosting = false;
            this.boostG.visible = false;
        } else if (this.boost > this.maxBoost)
            this.boost = this.maxBoost;
        this.boostbarTo.x = this.boost / this.maxBoost * 115 + 80;

        //add player movement
        this.vel.add(this.acc);
        this.vel.multiplyScalar(1 - this.friction);
        this.pos.add(this.vel);
        this.constrainVel(0, width, 0, height);
        this.acc.multiplyScalar(0); // only do once

        //detect player angle
        for (let i = 0; i < this.rays.length; i++) {
            this.rays[i].pos = this.pos;
            this.rays[i].checkCollisions(objArr);
            //calculate collision bounce back direction
            let largestVector = new Vector(-1, this.rays[i].slope);
            if (this.rays[i].angle > 270 || this.rays[i].angle < 90) {
                largestVector.x = 1;
            }

            if (this.rays[i].angle > 90 && this.rays[i].angle <= 270)
                largestVector.y *= -1;

            //same as setMag to get actually distance to move back
            largestVector.multiplyScalar(this.rays[i].maxLength / largestVector.length());
            //this.speed / 10 to get how much of the bounce back vector to move
            this.pos.x -= (this.speed / 10) * (largestVector.x - (this.rays[i].posEnd.x - this.rays[i].pos.x));
            this.pos.y -= (this.speed / 10) * (largestVector.y - (this.rays[i].posEnd.y - this.rays[i].pos.y));
            console.log();
        }
        //detect gun angle
        this._angle = mouse.clone().subtract(this.pos).angle();
        let angleChange = mouse.clone().subtract(this.barrelPos.clone().rotateBy(this._angle).multiplyScalar(0.001)).subtract(this.pos).angle() - this._angle;
        this._angle += angleChange * 1000;

        //process gun
        this.laser.pos = this.barrelPos.clone().rotateBy(this._angle).add(this.pos);
        this.laser._angle = this._angle;
        let hit = this.laser.checkCollisions(objArr);
        if (this.shooting && hit >= 0 && objects[hit] instanceof Enemy)
            objects[hit].health -= this.damage;
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

    update() {
        //draw rays
        this.laser.active = this.shooting;
        this.laser.update();
        //for (let i = 0; i < this.rays.length; i++)
        //   this.rays[i].update();

        //draw player
        this.sprite.x = this.pos.x;
        this.sprite.y = this.pos.y;
        this.sprite.rotation = this.angle
    }

    set health(hp) {
        this._health = hp;
        this.healthbarTo.x = this._health / this.maxHealth * 115 + 80;
    }
    get health() {
        return this._health;
    }
}
