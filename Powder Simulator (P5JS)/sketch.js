let mapArr = [];
let particleArr = []; //to improve finding efficiency
let debugArr = [];

let types = ["sand", "stone", "water", "erase"];
let selectedNum = 0;
let selected = "sand";

let xWidth = 200;
let yWidth = 160;
let tileSize = 5;
let gameSpeed = .7; // % of particles to process per frame (5%)

function setup() {
    createCanvas(xWidth * tileSize, yWidth * tileSize);
    frameRate(20);
    background(0);

    //init basic array
    for (let i = 0; i < yWidth; i++) {
        mapArr.push([]);
        for (let j = 0; j < xWidth; j++)
            mapArr[i].push(new Particle(i, j));
    }
    //debug for console
    for (let i = 0; i < yWidth; i++) {
        debugArr.push([]);
        for (let j = 0; j < xWidth; j++)
            debugArr[i].push(0);
    }
}

function draw() {
    background(255);
    processClick();

    stepPowder();

    drawPowder();

    for (let i = 0; i < yWidth; i++) {
        for (let j = 0; j < xWidth; j++) {
            if (mapArr[i][j].type == "null")
                debugArr[i][j] = 0;
            else
                debugArr[i][j] = 1;
        }
    }
}

function processClick() {
    if (mouseIsPressed && mouseX >= 0 && mouseX <= xWidth * tileSize && mouseY >= 0 && mouseY <= yWidth * tileSize) {
        let tileX = floor(map(mouseX, 0, width, 0, xWidth));
        let tileY = floor(map(mouseY, 0, height, 0, yWidth));

        if (mouseButtonL) {
            //square
            for (let i = (tileY > 0 ? -1 : 0) ; i < (tileY < yWidth - 1 ? 2 : 1) ; i++) {
                for (let j = (tileX > 0 ? -1 : 0) ; j < (tileX < xWidth - 1 ? 2 : 1) ; j++) {
                    if (particleArr.length < xWidth * yWidth * 0.3 && mapArr[tileY + i][tileX + j].type != selected) {
                        mapArr[tileY + i][tileX + j].changeType(selected); //changes from empty to sand
                    }
                }
            }
            /*
            //single tile
            if (mapArr[tileY][tileX].type != selected) { 
                mapArr[tileY][tileX].changeType(selected); //changes from empty to sand
            }*/
        }
        if (mouseButtonR) {
            //do right button stuff: wind?
        }
    }
}

function stepPowder() {
    let rndY = Math.floor(Math.random() * (yWidth + 1));
    let rndX = Math.floor(Math.random() * (xWidth + 1));

    let amountToProcess = Math.floor(particleArr.length * gameSpeed);
    amountToProcess += particleArr.length % (1 / gameSpeed) > Math.random / gameSpeed ? 1 : 0;

    for (let i = 0; i < amountToProcess; i++) {
        particleArr[Math.floor(Math.random() * particleArr.length)].step();
    }
}

function drawPowder() {
    for (let i = 0; i < yWidth; i++) {
        for (let j = 0; j < xWidth; j++) {
            mapArr[i][j].draw();
        }
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        selectedNum > 0 ? selectedNum-- : selectedNum = types.length - 1;
        selected = types[selectedNum];
    } else if (keyCode === RIGHT_ARROW) {
        selectedNum < types.length - 1 ? selectedNum++ : selectedNum = 0;
        selected = types[selectedNum];
    }
}