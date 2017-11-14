let gameAssets = new createjs.Container();
let shopAssets = new createjs.Container();

function setupGame() {
    gameState = 1;
    score = 0;
    elapsedTicks = 0;
    //add game collision stuff
    for (let i = objects.length - 1; enemies; i--) {
        objects[i].remove(i);
        enemies--;
    }

    enemyFrequency = Math.floor(110 / upgrades[9].getValue());

    player.reset();
    shopAssets.visible = false;
    stage.enableMouseOver(0);
}

function mainGame(e) {
    zombieSpriteSheet._data.move.speed = .4 + elapsedTicks / (8000 / upgrades[10].getValue());
    //enemies[i].speed = 1.6 + e.target.getTicks() / 900;

    if (elapsedTicks % enemyFrequency == 0 && enemies < 20) {
        let newX = 0;
        let newY = 0;
        let sideRand = Math.floor(Math.random() * 4);
        let powerRand = 1 + Math.random() / 2
        if (sideRand == 0) { //right
            newX = width + 50;
            newY = Math.random() * height;
        } else if (sideRand == 1) { //up
            newX = Math.random() * width;
            newY = -50;
        } else if (sideRand == 2) { //left
            newX = -50;
            newY = Math.random() * height;
        } else if (sideRand == 3) { //down
            newX = Math.random() * width;
            newY = height + 50;
        }
        objects.push(new Enemy(newX, newY,
            .4 * powerRand,
            .8 + elapsedTicks / (1600 / upgrades[10].getValue()),
            300 * powerRand * (1 + elapsedTicks / (900 / upgrades[10].getValue())),
            5 * powerRand * (1 + elapsedTicks / (3000 / upgrades[10].getValue()))));

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
            objects[i].update(i);
        }
    }

    scoreLabel.text = Math.floor(score);
    scoreLabel.font = "bold " + 22 * (Math.sqrt(45 / scoreLabel.getBounds().width)) + "px Arial";
    // draw the updates to stage
}

function setupShop() {
    gameState = 2;
    cash += Math.floor(score);
    cashLabel.text = "฿" + cash;
    cashLabel.font = "bold " + 24 * (Math.sqrt(100 / cashLabel.getBounds().width)) + "px Arial";

    shopAssets.visible = true;

    gunIndex = player.equippedGun;
    updateGun();

    stage.enableMouseOver(60);
}

function updateGun(newIndex) {
    if (typeof newIndex != "undefined") {
        newIndex = newIndex % guns.length;
        if (newIndex < 0)
            newIndex = guns.length + newIndex;
        gunIndex = newIndex;
    }
    gunImg.x = -1 * guns[gunIndex].image.x + 87;
    gunImg.y = -1 * guns[gunIndex].image.y + 33;
    gunImg.regX = guns[gunIndex].image.w / 2;
    gunImg.regY = guns[gunIndex].image.h / 2;

    gunImg.cache(guns[gunIndex].image.x, guns[gunIndex].image.y, guns[gunIndex].image.w, guns[gunIndex].image.h);
    gunImg.updateCache();

    //gun Button
    if (player.equippedGun == gunIndex) {
        gunContainer.children[4].children[1].text = "Equipped";
    } else if (guns[gunIndex].bought) {
        gunContainer.children[4].children[1].text = "Equip";
    } else {
        gunContainer.children[4].children[1].text = "฿" + guns[gunIndex].price;
    }

    //gun lore
    //gun name
    gunContainer.children[5].text = guns[gunIndex].name;
    //damage and energy cost
    gunContainer.children[6].text = "Damage: " + guns[gunIndex].damage + "   Energy Cost: " + guns[gunIndex].energyCost;
    //speed
    gunContainer.children[7].text = "Speed Multiplyer: " + guns[gunIndex].speedMultiplier + "x";
    //cool text :v)
    gunContainer.children[8].text = "“" + guns[gunIndex].text + "”";
    //special
    gunContainer.children[9].text = "Special: " + guns[gunIndex].special;
}

function equipGun() {
    if (guns[gunIndex].bought) {
        player.equippedGun = gunIndex;
    } else if (cash >= guns[gunIndex].price) {
        cash -= Math.round(guns[gunIndex].price);
        cashLabel.text = "฿" + cash;
        guns[gunIndex].bought = true;
        player.equippedGun = gunIndex;
    }
    updateGun();
}

function shop(e) {
    gunImg.updateCache();
    //console.log(gunIndex);
}