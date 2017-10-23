let blocks = [];


function setup() {
    createCanvas(600, 800);
}

function draw() {
    if(frameCount % 30 == 0)
        blocks.push(new Block());
}