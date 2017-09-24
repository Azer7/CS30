// P5.JS TEMPLATE
let xChange = 0;
let yChange = 0;

let speed = 5;
let selectedStarIndex = 0;
let draggingStar = false;
let newStar = false;

let onStar = false;
let closestX;
let closestY;
let closestDist;
let closestIndex;

// SETUP FUNCTION - Runs once at beginning of program
function setup() {
    createCanvas(1000, 800);
    background(0);
    for (let i = 0; i < 1500; i++)
        new tinyStar(random(-3 * width, 3 * width), random(-3 * height, 3 * height), color(random(0, 150), 150, random(0, 255), random(255)));
}

// DRAW FUNCTION - Loops @ 60FPS by default
function draw() {
    background(0);

    //move around background
    backgroundLogic();

    //display tiny stars
    tinyBackground();

    //display large stars
    perlinNoiseDraw();

    //draws constellations
    drawConstellations();

    //snaps constellations to stars
    snapToStars();
}

function mousePressed() {
    let removed = false;
    for (let i = stars.length - 1; i >= 0; i--) { //checks to see if I should be removing
        if (starDist(i) < stars[i].r + 5) {
            selectedStarIndex = i;
            draggingStar = true;
            removed = true;
            break;
        }
    }
    if (!removed) {
        new Star(mouseX, mouseY);
        newStar = true;
    }
}

function mouseReleased() {
    if (newStar == true) { //if just added a new star do nothing
        newStar = false
    } else {
        draggingStar = false;

        if (onStar) { //if you are touching a star
            stars[selectedStarIndex].connected.push(closestIndex);
            stars[closestIndex].connected.push(selectedStarIndex);
        }

        //get rid off all connections
        if (dist(mouseX, mouseY, stars[selectedStarIndex].x, stars[selectedStarIndex].y) < stars[selectedStarIndex].r + 5) {
            stars.splice(selectedStarIndex, 1);
            for (let i = 0; i < stars.length; i++) {
                for (let j = stars[i].connected.length - 1; j >= 0; j--) {
                    if (stars[i].connected[j] == selectedStarIndex)
                        stars[i].connected.splice(j, 1);
                    else if (stars[i].connected[j] > selectedStarIndex)
                        stars[i].connected[j]--;
                }
            }
        }
    }
}

//r key to reset
function keyPressed() {
    if (keyCode === 82) {
        stars = [];
    }
}

//simple function to get distance to star to shorten if statement
function starDist(i) { 
    return dist(mouseX, mouseY, stars[i].x, stars[i].y);
}
