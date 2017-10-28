const overflow = 10000; //10k
const precision = 0.0001; // 10kths

let objects = [];
let car;

function setup() {
    createCanvas(800, 600);

    for (let i = 0; i < terrain.length; i++) {
        objects.push(new Border(terrain[i].x1, terrain[i].y1, terrain[i].x2, terrain[i].y2));
    }

    ray = new Ray(width / 2, height / 2, 270); //x, y, angle
    car = new Car(220, 550, 10);
}

function draw() {
    background("white");

    //draw
    for (let i = 0; i < objects.length; i++) {
        objects[i].draw();
    }

    let compression = 0;
    //        if (keyIsDown(RIGHT_ARROW)) {
    //            rays[i].angle -= 1;
    //        }
    //        if (keyIsDown(LEFT_ARROW)) {
    //            rays[i].angle += 1;
    //        }

    if (keyIsDown(87)) {
        car.acc.y -= car.speed;
    }
    if (keyIsDown(83)) {
        car.acc.y += car.speed * 0.3; //reverse
    }
    if (keyIsDown(65)) {
        car.angle += 1 / (1 + car.vel.mag() / 40);
    }
    if (keyIsDown(68)) {
        car.angle -= 1 / (1 + car.vel.mag() / 40);
    }

    car.process(objects);
    car.draw();
}
