const overflow = 10000; //10k
const precision = 0.0001; // 10kths

let objects = [];
let terrain = [];
let car;

function setup() {
    createCanvas(1600, 1000);
    initBackground();

    for (let i = 0; i < terrainPos.length; i++) {
        terrain.push(new Border(terrainPos[i].x1, terrainPos[i].y1, terrainPos[i].x2, terrainPos[i].y2));
    }

    lastLine.x = terrainPos[leftIndex].x2;
    lastLine.y = terrainPos[leftIndex].y2;

    // terrain.push(new Border(terrain));

    ray = new Ray(width / 2, height / 2, 270); //x, y, angle
    car = new Car(3000, 600, 12);
}

function draw() {
    background(210);

    camera(car.pos.x - width / 2, car.pos.y - height / 2, 0, 0, 0, 0, 1, 0)
    //translate(100, 100);
    //scale(.2);
    //box border
    line(0, 0, 4800, 0);
    line(0, 0, 0, 3000);
    line(4800, 0, 4800, 3000);
    line(0, 3000, 4800, 3000);

    line(0, 1000, 4800, 1000);
    line(0, 2000, 4800, 2000);
    line(1600, 0, 1600, 3000);
    line(3200, 0, 3200, 3000);

    //draw
    for (let i = 0; i < objects.length; i++) {
        objects[i].draw();
    }

    for (let i = 0; i < terrain.length; i++) {
        terrain[i].draw();
    }

    let compression = 0;

    if (keyIsDown(87)) {
        car.acc.y -= car.speed;
    }
    if (keyIsDown(83)) {
        car.acc.y += car.speed * 0.5; //reverse
    }
    if (keyIsDown(65)) {
        car.angle -= 1 * (1 + car.vel.mag() / 40);

    }
    if (keyIsDown(68)) {
        car.angle += 1 * (1 + car.vel.mag() / 40);
    }

    //car.process(objects);
    car.process(terrain);
    car.draw();

}
