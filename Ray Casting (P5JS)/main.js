let objects = [];

let upRay;

function setup() {
    createCanvas(800, 600);
    
    objects.push(new Border(20, 10, width - 20, 90)); //line across screen
    
    upRay = new Ray(width / 2, height / 2, 270); //x, y, angle
}

function draw() {
    background("white");

    //draw
    for (let i = 0; i < objects.length; i++) {
        objects[i].draw();
    }

    //check for intersections
    //upRay.checkCollisions(objects);
    
    upRay.draw();
}