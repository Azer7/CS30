class Enemy {
    constructor(x, y, size, speed, health) {
        this.pos = new Vector(x, y);
        this._angle = 0;
        this.size = size;

        this.collision = new Rectangle(x - size * 50, y - size * 50, size * 100, false);

        this.speed = speed;
        this.maxHealth = health;
        this.health = health;

        this.sprite = new createjs.Sprite(zombieSpriteSheet, "move");
        this.sprite.spriteSheet._data.move.speed = speed / 3;
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.scaleX = size;
        this.sprite.scaleY = size;
        this.sprite.filters = [
            new createjs.ColorFilter(1, 1, 1, 1, 0, 0, 0, 0)
        ]
        this.sprite.cache(-90, -130, 250, 250);
        stage.addChild(this.sprite);

        objects.push(this);
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
            if (this.collision.visible)
                stage.removeChild(this.collsion.g);
            stage.removeChild(this.sprite);
            objects.splice(index, 1);
        } else {
            let moveVector = new Vector(player.pos.x - this.pos.x, player.pos.y - this.pos.y);
            if (moveVector.length() > 77) {
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
            }
            this._angle = moveVector.angle();
            this.sprite.rotation = this.angle;
            this.sprite.filters[0].greenMultiplier = this.health / this.maxHealth;
            this.sprite.filters[0].blueMultiplier = this.health / this.maxHealth;
        }
    }
}
