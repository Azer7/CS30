class Map {
    constructor() {
        this.translate = createVector(0, 0);
        this.zoom = 1;
    }

    static transform() {
        translate(this.translate.x, this.translate.y);
        this.scale(this.zoom);
    }
}