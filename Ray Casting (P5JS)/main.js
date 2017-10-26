const overflow = 1000000; //1 million
const precision = 0.000001; // millionths

let objects = [];
let rays = [];

let ray;

let arr1 = [], arr2 = [];

function setup() {
    createCanvas(800, 600);

    objects.push(new Border(20, height - 10, width - 100, height - 9)); //line across screen

    ray = new Ray(width / 2, height / 2, 270); //x, y, angle
    for (let i = 0; i < 200; i++)
        rays.push(new Ray(width / 2, height / 2, i * (360 / 180)));
}

function draw() {
    background("white");

    //draw
    for (let i = 0; i < objects.length; i++) {
        objects[i].draw();
    }

    for (let i = 0; i < rays.length; i++) {
        if (keyIsDown(RIGHT_ARROW)) {
            rays[i].angle -= 1;
        }
        if (keyIsDown(LEFT_ARROW)) {
            rays[i].angle += 1;
        }
        if (keyIsDown(65)) {
            rays[i].pos.x -= 5;
        }
        if (keyIsDown(68)) {
            rays[i].pos.x += 5;
        }
        if (keyIsDown(87)) {
            rays[i].pos.y -= 5;
        }
        if (keyIsDown(83)) {
            rays[i].pos.y += 5;
        }
        //check for intersections
        rays[i].checkCollisions(objects);
        rays[i].draw();
    }

    //    if (keyIsDown(RIGHT_ARROW)) {
    //        ray.angle -= 1;
    //    } else if (keyIsDown(LEFT_ARROW)) {
    //        ray.angle += 1;
    //    }
    //
    //    ray.checkCollisions(objects);
    //    ray.draw();
}
