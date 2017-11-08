function mainGame(e) {
    if (e.target.getTicks() % 100 == 0 && enemies < 20) {
        let newX = 0;
        let newY = 0;
        let sideRand = Math.floor(Math.random() * 4);
        let powerRand = 1 + Math.random() / 2
        if (sideRand == 0) { //right
            objects.push(new Enemy(width + 50, Math.random() * height, .4 * powerRand, 1 + e.target.getTicks() / 900, 300 * powerRand, 5 * powerRand));
        } else if (sideRand == 1) { //up
            objects.push(new Enemy(Math.random() * width, height + 50, .4 * powerRand, 1 + e.target.getTicks() / 900, 300 * powerRand, 5 * powerRand));
        } else if (sideRand == 2) { //left
            objects.push(new Enemy(-50, Math.random() * height, .4 * powerRand, 1 + e.target.getTicks() / 900, 300 * powerRand, 5 * powerRand));
        } else if (sideRand == 3) { //down
            objects.push(new Enemy(Math.random() * width, -50, .4 * powerRand, 1 + e.target.getTicks() / 900, 300 * powerRand, 5 * powerRand));
        }
        enemies++;
    }
    //draw
    if (keys[87]) {
        player.acc.y -= player.speed;
    }
    if (keys[83]) {
        player.acc.y += player.speed; //reverse
    }
    if (keys[65]) {
        player.acc.x -= player.speed;
    }
    if (keys[68]) {
        player.acc.x += player.speed;
    }

    player.process(objects);
    player.update();

    for (let i = objects.length - 1; i >= 0; i--) {
        if (objects[i] instanceof Enemy) {
            if (e.target.getTicks() % 4 == 0)
                objects[i].sprite.updateCache();
            objects[i].update(i, e.target.getTicks());
        }
    }

    scoreLabel.text = score;
    let b = scoreLabel.getBounds();
    scoreLabel.x = 42 - b.width / 2;
    // draw the updates to stage
}

function shop(e) {
    
}