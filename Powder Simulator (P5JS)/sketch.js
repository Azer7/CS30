let mapArr = [];
let particleArr = []; //to improve finding efficiency
let debugArr = [];

let types = ["sand", "stone", "water", "erase"];
let selectedNum = 0;
let selected = "sand";

let xWidth = 400;
let yHeight = 300;
let tileSize = 2;
let gameSpeed = 1; // % of particles to process per frame (5%)

function setup() {
    createCanvas(xWidth * tileSize, yHeight * tileSize);
    pixelDensity(1);
    frameRate(60);
    background(0);

    //init basic array
    for (let i = 0; i < yHeight; i++) {
        mapArr.push([]);
        for (let j = 0; j < xWidth; j++)
            mapArr[i].push(new Particle(i, j));
    }
    //debug for console
    for (let i = 0; i < yHeight; i++) {
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

    for (let i = 0; i < yHeight; i++) {
        for (let j = 0; j < xWidth; j++) {
            if (mapArr[i][j].type == "null")
                debugArr[i][j] = 0;
            else
                debugArr[i][j] = 1;
        }
    }
}

function processClick() {
    if (mouseIsPressed && mouseX >= 0 && mouseX < xWidth * tileSize && mouseY >= 0 && mouseY < yHeight * tileSize) {
        let tileX = floor(map(mouseX, 0, width, 0, xWidth));
        let tileY = floor(map(mouseY, 0, height, 0, yHeight));

        if (mouseButtonL) {
            let limitY;
            let limitX;
            
            if(tileX < 2)
                limitY = 2 - tileX;
            
            if(tileX > xWidth - 3)
                
            
            if(tileX < 2)
                
                else if(tileX < xWidth - 2)
            
                    
            //square
            for (let i = (tileY > 0 ? -1 : 0) ; i < (tileY < yHeight - 1 ? 2 : 1) ; i++) {
                for (let j = (tileX > 0 ? -1 : 0) ; j < (tileX < xWidth - 1 ? 2 : 1) ; j++) {
                    if (particleArr.length < xWidth * yHeight * 0.3 && mapArr[tileY + i][tileX + j].type != selected && mapArr[tileY + i][tileX + j].type == "null") {
                        mapArr[tileY + i][tileX + j].changeType(selected); //changes from empty to sand
                    }
                }
            }

        }
        if (mouseButtonR) {
            //do right button stuff: wind?
        }
    }
}

function stepPowder() {
    let rndY = Math.floor(Math.random() * (yHeight + 1));
    let rndX = Math.floor(Math.random() * (xWidth + 1));

    let amountToProcess = Math.ceil(particleArr.length * gameSpeed);
    //amountToProcess += particleArr.length % (1 / gameSpeed) > Math.random / gameSpeed ? 1 : 0;

    for (let i = 0; i < amountToProcess; i++) {
        particleArr[Math.floor(Math.random() * particleArr.length)].step();
    }
}

function drawPowder() {
    loadPixels();
    for (let y = 0; y < yHeight; y++) {
        for (let x = 0; x < xWidth; x++) {
            //mapArr[i][j].draw();            
            var color = mapArr[y][x].color();

            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                    index = 4 * (x * 2 + j + y * xWidth * 4 + i * xWidth * 2);
                    pixels[index] = color[0];
                    pixels[index + 1] = color[1];
                    pixels[index + 2] = color[2];
                    pixels[index + 3] = 255;
                }
            }
        }
    }
    updatePixels();
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