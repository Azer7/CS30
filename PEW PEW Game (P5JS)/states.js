let gameAssets = new createjs.Container();
let shopAssets = new createjs.Container();

function setupGame() {
    gameState = 1;
    score = 0;
    //add game collision stuff
    for (let i = objects.length - 1; enemies; i--) {
        objects[i].remove(i);
        enemies--;
    }

    player.reset();
    shopAssets.visible = false;

}

function mainGame(e) {
    zombieSpriteSheet._data.move.speed = .4 + e.target.getTicks() / 3600;
    //enemies[i].speed = 1.6 + e.target.getTicks() / 900;

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
    scoreLabel.font = "bold " + 22 * (Math.sqrt(45 / scoreLabel.getBounds().width)) + "px Arial";
    // draw the updates to stage
}

function setupShop() {
    gameState = 2;
    shopAssets.visible = true;

    gunIndex = player.equippedGun;
    gun.cache(guns[gunIndex].image.x, guns[gunIndex].image.y, guns[gunIndex].image.w, guns[gunIndex].image.h);
    gun.updateCache();
}

function shop(e) {
    gun.updateCache();
}
