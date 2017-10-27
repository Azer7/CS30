const overflow = 1000000; //1 million
const precision = 0.000001; // millionths

let objects = [];
let rays = [];

let ray;

let arr1 = [],
    arr2 = [];

let velInc = .2;
let accY = 0;

function setup() {
    createCanvas(800, 600);

    objects.push(new Border(100, height - 10, width - 100, height - 100)); //line
    objects.push(new Border(100, 100, 130, height - 300)); //line
    objects.push(new Border(20, height - 10, width - 100, height - 29)); //line
    objects.push(new Border(200, height - 300, width - 50, 200)); //line
    objects.push(new Border(500, height - 10, width - 100, 299)); //line


    ray = new Ray(width / 2, height / 2, 270); //x, y, angle
    for (let i = 0; i < 20; i++)
        rays.push(new Ray(width / 2, 250, i * (360 / 20)));
}

function draw() {
    background("white");

    //draw
    for (let i = 0; i < objects.length; i++) {
        objects[i].draw();
    }

    let compression = 0;
    for (let i = 0; i < rays.length; i++) {
        if (keyIsDown(RIGHT_ARROW)) {
            rays[i].angle -= 1;
        }
        if (keyIsDown(LEFT_ARROW)) {
            rays[i].angle += 1;
        }
        if (keyIsDown(65)) {
            rays[i].pos.x -= 10;
        }
        if (keyIsDown(68)) {
            rays[i].pos.x += 10;
        }
        if (keyIsDown(87)) {
            rays[i].pos.y -= 10;
        }
        if (keyIsDown(83)) {
            rays[i].pos.y += 10;
        }
        //check for intersections
        rays[i].checkCollisions(objects);
        compression += rays[i].maxLength - rays[i].length;
        rays[i].draw();
    }

    //    let accel = velInc - compression / 700;
    //    accY += accel;
    //    for (let i = 0; i < rays.length; i++)
    //        rays[i].pos.y += accY;

    //    if (keyIsDown(RIGHT_ARROW)) {
    //        ray.angle -= 1;
    //    } else if (keyIsDown(LEFT_ARROW)) {
    //        ray.angle += 1;
    //    }
    //
    //    ray.checkCollisions(objects);
    //    ray.draw();
}
