class Enemy {
    constructor(x, y, size, speed, health, damage) {
        this.pos = new Vector(x, y);
        this._angle = 0;
        this.size = size;

        this.collision = new Rectangle(x - size * 50, y - size * 50, size * 100, false);

        this.speed = speed;
        this.maxHealth = health * (upgrades[11].getValue() * 2 - 1);
        this.health = this.maxHealth;
        this.damage = damage * (upgrades[11].getValue() * 2 - 1);
        this.attackCooldown = 0;
        this.sprite = new createjs.Sprite(zombieSpriteSheet, "move");

        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.scaleX = size;
        this.sprite.scaleY = size;
        this.sprite.filters = [
            new createjs.ColorFilter(1, 1, 1, 1, 0, 0, 0, 0)
        ]
        this.sprite.cache(-90, -130, 250, 250);
        gameAssets.children.splice(2, 0, this.sprite);
    }

    get angle() {
        let inDegrees = this._angle * 180 / Math.PI;
        return Math.round(inDegrees);
    }
    set angle(degrees) {
        //change to radians
        this._angle = degrees * Math.PI / 180;
    }

    update(index) {
        if (this.health <= 0) {
            enemies--;
            score += (1 + elapsedTicks / 2000) * upgrades[8].getValue() * upgrades[11].getValue();
            this.remove(index);
        } else {
            this.attackCooldown--;
            let moveVector = new Vector(player.pos.x - this.pos.x, player.pos.y - this.pos.y);
            if (moveVector.length() > this.size * 200) {
                moveVector.multiplyScalar(this.speed / moveVector.length());
                //change position
                this.pos.add(moveVector);
                this.sprite.x += moveVector.x;
                this.sprite.y += moveVector.y;
                this.collision.pos.add(moveVector);
                if (this.collision.visible) {
                    this.collision.g.x += moveVector.x;
                    this.collision.g.y += moveVector.y;
                }
                for (let i = 0; i < this.collision.lines.length; i++) {
                    this.collision.lines[i].changeLine(moveVector);
                }
            } else {
                //attack
                if (this.attackCooldown <= 0) {
                    if (player.health > 0) {
                        if (!player.boosting)
                            player.health -= this.damage;
                    } else {
                        setupShop();
                    }
                    this.attackCooldown = 30;
                }
            }
            this._angle = moveVector.angle();
            this.sprite.rotation = this.angle;
            this.sprite.filters[0].greenMultiplier = this.health / this.maxHealth;
            this.sprite.filters[0].blueMultiplier = this.health / this.maxHealth;
        }
    }
    remove(index) {
        if (this.collision.visible)
            gameAssets.removeChild(this.collsion.g);
        gameAssets.removeChild(this.sprite);
        objects.splice(index, 1);
    }
}
