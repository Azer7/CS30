const overflow = 1000000; //1 million
const precision = 0.000001; // millionths

let objects = [];
let rays = [];

let ray;

function setup() {
    createCanvas(800, 600);

    objects.push(new Border(0, 0, width, 150)); //line across screen


    ray = new Ray(width / 2, height / 2, 270); //x, y, angle
    //rays.push(new Ray(width / 2, height / 2, i * (360 / 1000)));
}

function draw() {
    background("white");

    //draw
    for (let i = 0; i < objects.length; i++) {
        objects[i].draw();
    }

    //    for (let i = 0; i < rays.length; i++) {
    //        if (keyIsDown(RIGHT_ARROW)) {
    //            rays[i].angle -= 1;
    //        } else if (keyIsDown(LEFT_ARROW)) {
    //            rays[i].angle += 1;
    //        }
    //
    //        //check for intersections
    //        rays[i].checkCollisions(objects);
    //
    //        rays[i].draw();
    //    }

    if (keyIsDown(RIGHT_ARROW)) {
        ray.angle -= 1;
    } else if (keyIsDown(LEFT_ARROW)) {
        ray.angle += 1;
    }

    ray.checkCollisions(objects);
    ray.draw();
}
