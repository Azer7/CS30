const overflow = 10000; //10k
const precision = 0.0001; // 10kths

let objects = [];
let car;

function setup() {
    createCanvas(800, 600);    
    ray = new Ray(width / 2, height / 2, 270); //x, y, angle
    player = new Player(220, 550, 10);
}

function draw() {
    background("white");
    //draw
    for (let i = 0; i < objects.length; i++) {
        objects[i].draw();
    }

    if (keyIsDown(87)) {
        player.acc.y -= player.speed;
    }
    if (keyIsDown(83)) {
        player.acc.y += player.speed * 0.3; //reverse
    }
    if (keyIsDown(65)) {
        player.angle += 1 / (1 + player.vel.mag() / 40);
    }
    if (keyIsDown(68)) {
        player.angle -= 1 / (1 + player.vel.mag() / 40);
    }

    player.process(objects);
    player.draw();
}