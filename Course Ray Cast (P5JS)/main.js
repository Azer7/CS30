const overflow = 10000; //10k
const precision = 0.0001; // 10kths

let objects = [];
let terrain = [];
let car;

function setup() {
    createCanvas(1920, 1065);
    initBackground();
    
    for (let i = 0; i < terrainPos.length; i++) {
        terrain.push(new Border(terrainPos[i].x1, terrainPos[i].y1, terrainPos[i].x2, terrainPos[i].y2));
    }
    
   // terrain.push(new Border(terrain));
    
    ray = new Ray(width / 2, height / 2, 270); //x, y, angle
    car = new Car(220, 550, 10);
}

function draw() {
    background(210);
    
    camera(car.pos.x - width / 2, car.pos.y - width / 2, 0, 0, 0, 0, 1, 0)
    translate(-100, 200);
    scale(0.18);
    
    //draw
    for (let i = 0; i < objects.length; i++) {
        objects[i].draw();
    }
    
    for(let i = 0;i < terrain.length; i++) {
        terrain[i].draw();
    }

    let compression = 0;

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
    car.process(terrain);
    car.draw();
    
}