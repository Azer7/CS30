//moves around background
function backgroundLogic() {
    xChange = 0;
    yChange = 0;
    if (keyIsDown(37)) //left
        xChange += speed;
    if (keyIsDown(39)) //right
        xChange -= speed;
    if (keyIsDown(40)) //down
        yChange -= speed;
    if (keyIsDown(38)) //up
        yChange += speed;

}

function tinyBackground() {
    for (let i = 0; i < tinyStars.length; i++) {
        tinyStars[i].x += xChange;
        tinyStars[i].y += yChange;
        
        tinyStars[i].draw();
    }
}

// shift forward perlin noise
function perlinNoiseDraw() {
    for (let i = 0; i < stars.length; i++) {
        stars[i].x += xChange;
        stars[i].y += yChange;

        stars[i].perlinT += 0.07;
        stars[i].draw();
    }
}

function drawConstellations() {
    for (let i = 0; i < stars.length; i++) {
        stars[i].undrawnConnected = stars[i].connected.slice();
    }

    for (let i = 0; i < stars.length; i++) {
        for (let j = stars[i].undrawnConnected.length - 1; j >= 0; j--) {
            stroke(255);
            strokeWeight(2);

            drawIndex = stars[i].undrawnConnected[j];

            line(stars[i].x, stars[i].y, stars[drawIndex].x, stars[drawIndex].y);
            stars[i].undrawnConnected.splice(j, 1);

            for (let connectionI = 0; connectionI < stars[drawIndex].undrawnConnected.length; connectionI++) {
                if (stars[drawIndex].undrawnConnected[connectionI] == i) {
                    stars[drawIndex].undrawnConnected.splice(connectionI, 1);
                    break;
                }
            }
        }
    }
}

function snapToStars() {
    if (draggingStar) {
        stroke(255);
        strokeWeight(2);

        onStar = false;
        closestX = mouseX;
        closestY = mouseY;
        closestDist = Infinity;
        closestIndex;

        for (let i = 0; i < stars.length; i++) {
            let distToStar = starDist(i);
            if (distToStar < stars[i].r + 8 && distToStar < closestDist && i != selectedStarIndex && !stars[selectedStarIndex].connected.includes(i)) {
                onStar = true;
                closestDist = distToStar;
                closestIndex = i;
                closestX = stars[i].x;
                closestY = stars[i].y;
            }
        }

        line(stars[selectedStarIndex].x, stars[selectedStarIndex].y, closestX, closestY);
    }

}
