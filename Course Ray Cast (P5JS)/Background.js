let Background;

function initBackground() {
    Background = {
        translate: createVector(0, 0),
        zoom: 0.3,
        transform: function () {
            translate(this.translate.x, this.translate.y),
            scale(this.zoom)
        }
    }
}
