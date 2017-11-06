class Enemy {
    constructor(x, y, size) {
        this.pos = new Vector(x, y);
        this._angle = 0;
        this.size = size;

        this.sprite = new createjs.Sprite(zombieSpriteSheet, "move");
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.scaleX = size;
        this.sprite.scaleY = size;
        stage.addChild(this.sprite);
    }

    get angle() {
        let inDegrees = this._angle * 180 / Math.PI;
        return Math.round(inDegrees); //5 decimals of precision
    }
    set angle(degrees) {
        //change to radians
        this._angle = degrees * Math.PI / 180;
    }

}
