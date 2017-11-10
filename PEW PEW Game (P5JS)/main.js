"use strict";
let canvas;
let stage;
let width = 800,
    height = 640;
let mouse = new Vector(0, 0);
let mouseDown = false;

let keys = [];

const overflow = 10000; //10k
const precision = 0.0001; // 10kths

let enemies = 0;
let objects = [];
let player;
let playerSpriteSheet;
let zombieSpriteSheet;
let playerHud;
let background;

let score = 0;
let scoreLabel;
//
let fpsLabel;
let blurBackground;
let shopGui;
let gun;
let gunIndex = 0;
let guns = [
    {
        name: "Terry's Trash Taser",
        damage: 4,
        energyCost: 4,
        price: 0,
        bought: true,
        speedMultiplier: 1.2,
        beam: {
            c: createjs.Graphics.getRGB(180, 0, 30, .9),
            s: 5
        },
        image: {
            x: 139,
            y: 6,
            w: 42,
            h: 28
        }
    },
    {
        name: "Alpha v0.1 Laser",
        damage: 5,
        energyCost: 5.5,
        price: 40,
        bought: true,
        speedMultiplier: 1,
        beam: {
            c: createjs.Graphics.getRGB(140, 50, 30, .9),
            s: 6
        },
        image: {
            x: 97,
            y: 6,
            w: 42,
            h: 25
        }
    },
    {
        name: "Grandma's Gun",
        damage: 10,
        energyCost: 7,
        price: 84,
        bought: true,
        speedMultiplier: .7,
        beam: {
            c: createjs.Graphics.getRGB(91, 107, 6, .9),
            s: 6
        },
        image: {
            x: 42,
            y: 35,
            w: 56,
            h: 19
        }
    },
    {
        name: "Alien Dispatcher",
        damage: 24,
        energyCost: 15,
        price: 230,
        bought: true,
        speedMultiplier: 1.2,
        beam: {
            c: createjs.Graphics.getRGB(89, 255, 119, .7),
            s: 7
        },
        image: {
            x: 72,
            y: 57,
            w: 40,
            h: 23
        }
    },
    {
        name: "Butt Blaster",
        damage: 40,
        energyCost: 40,
        price: 750,
        bought: true,
        speedMultiplier: .8,
        beam: {
            c: createjs.Graphics.getRGB(89, 255, 119, .7),
            s: 7
        },
        image: {
            x: 1,
            y: 60,
            w: 68,
            h: 30
        }
    }
]

let upgrades = {
    Damage: {
        container: new createjs.Container(),
        maxLevel: 0,
        level: 0,
        getValue: function (lvl) {
            return 1 + 0.02 * lvl;
        }
    },
    Health: {
        container: new createjs.Container(),
        maxLevel: 0,
        level: 0,
        getValue: function (lvl) {
            return 100 + 10 * lvl;
        }
    },
    Speed: {
        container: new createjs.Container(),
        maxLevel: 0,
        level: 0,
        getValue: function (lvl) {
            return .6 + 0.05 * lvl;
        }
    },
    Max_Energy: {
        container: new createjs.Container(),
        maxLevel: 0,
        level: 0,
        getValue: function (lvl) {
            return 100 + 10 * lvl;
        }
    },
    Max_Boost: {
        container: new createjs.Container(),
        maxLevel: 0,
        level: 0,
        getValue: function (lvl) {
            return 100 + 10 * lvl;
        }
    },
    Boost_Recharge: {
        container: new createjs.Container(),
        maxLevel: 0,
        level: 0,
        getValue: function (lvl) {
            return Math.round((.4 + 0.02 * lvl) * 1000) / 1000;
        }
    },
    Boost_Speed: {
        container: new createjs.Container(),
        maxLevel: 0,
        level: 0,
        getValue: function (lvl) {
            return 1 + 0.6 * lvl;
        }
    },
    Energy_Recharge: {
        container: new createjs.Container(),
        maxLevel: 0,
        level: 0,
        getValue: function (lvl) {
            return 4 + Math.floor(Math.pow(lvl, 1.3));
        }
    },
    Income: {
        container: new createjs.Container(),
        maxLevel: 0,
        level: 0,
        getValue: function (lvl) {
            return 1 + 0.05 * lvl;
        }
    },
    Zombie_Rate: {
        container: new createjs.Container(),
        maxLevel: 0,
        level: 0,
        getValue: function (lvl) {
            return 1 + 0.05 * lvl;
        }
    },
    Zombie_Speed: {
        container: new createjs.Container(),
        maxLevel: 0,
        level: 0,
        getValue: function (lvl) {
            return 1 - Math.round(Math.sqrt(lvl) * 100) / 2000;
        }
    },
    Zombie_Mult: {
        container: new createjs.Container(),
        maxLevel: 0,
        level: 0,
        getValue: function (lvl) {
            return 1 + 0.02 * lvl;
        }
    }
};

let gameState = 1; // 1 is playing, 2 is score, 3 is shop

function init() {
    canvas = document.getElementById("game");
    stage = new createjs.Stage(canvas);

    //player stuff
    stage.addEventListener("stagemousemove", moveCanvas);
    stage.addEventListener("stagemousedown", mousePressed);
    stage.addEventListener("stagemouseup", mouseReleased);

    let playerFrames = [];
    for (let i = 0; i < 40; i++) { //idle and move
        playerFrames.push([2 + i * 313, 2, 312, 206, 0, 116, 123]);
    }
    for (let i = 0; i < 20; i++) { //reload
        playerFrames.push([12522 + i * 322, 2, 322, 217, 0, 116, 123]);
    }
    for (let i = 0; i < 20; i++) { //shoot
        playerFrames.push([18962 + i * 313, 2, 312, 206, 0, 116, 123]);
    }

    playerSpriteSheet = new createjs.SpriteSheet({
        framerate: 30,
        "images": ["Sprites/player-gun-anims.png"],
        "frames": playerFrames,
        // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        "animations": {
            "idle": [0, 19, "idle", .2],
            "move": [20, 39, "idle", .5],
            "reload": [40, 59, "reload", .5],
            "shoot": {
                frames: [61],
                next: "",
                speed: 0.5
            },
            "unshoot": {
                frames: [61, 62],
                next: "idle",
                speed: 0.5
            }
        }
    });

    background = new createjs.Bitmap("Sprites/grass-background.png");
    //stage.addChild(background);
    gameAssets.addChild(background);

    zombieSpriteSheet = new createjs.SpriteSheet({
        framerate: 30,
        "images": ["Sprites/zombie-animations.png"],
        "frames": {
            width: 288,
            height: 311,
            regX: 110,
            regY: 165,
            count: 17,
            spacing: 2,
            margin: 1
        },
        // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        "animations": {
            "move": [0, 16, "move", .32],
        }
    });

    //add game collision stuff
    objects.push(new Border(0, 0, width, 200, true));
    //enemies.push(new Enemy(200, 200, .4, 1, 300));

    player = new Player(220, 350);

    playerHud = new createjs.Bitmap("Sprites/playerHud.png");
    playerHud.scaleX = .7;
    playerHud.scaleY = .7;
    //stage.addChild(playerHud);
    gameAssets.addChild(playerHud);

    scoreLabel = new createjs.Text("", "bold 37px Arial", "#FFF");
    scoreLabel.textAlign = "center";
    scoreLabel.textBaseline = "middle";
    scoreLabel.x = 42;
    scoreLabel.y = 44;
    gameAssets.addChild(scoreLabel);

    //get ready for shop setup q.q
    //state 2 
    blurBackground = new createjs.Shape();
    blurBackground.graphics.setStrokeStyle(1);
    blurBackground.graphics.beginFill(createjs.Graphics.getRGB(10, 10, 50, .6));
    blurBackground.graphics.drawRect(0, 0, width, height);
    //stage.addChild(blurBackground);
    shopAssets.addChild(blurBackground);

    shopGui = new createjs.Bitmap("Sprites/bShopGui.png");
    shopGui.scaleX = .952;
    shopGui.scaleY = .952;
    shopGui.x = 99.2;
    shopGui.shadow = new createjs.Shadow("#000000", 4, 4, 8);
    //stage.addChild(shopGui);
    shopAssets.addChild(shopGui);

    gun = new createjs.Bitmap("Sprites/guns.png");
    gun.scaleX = 1;
    gun.scaleY = 1;
    //stage.addChild(gun);
    shopAssets.addChild(gun);

    //add upgrades
    let buttonGraphics = new createjs.Graphics();
    buttonGraphics.setStrokeStyle(1);
    buttonGraphics.beginStroke(createjs.Graphics.getRGB(10, 50, 255, 1));
    buttonGraphics.beginFill(createjs.Graphics.getRGB(120, 120, 130, 1));
    buttonGraphics.drawRoundRect(0, 0, 120, 124, 7, 7, 7, 7);

    //gun change upgrade (top box)
    let gunBackground = new createjs.Shape();
    gunBackground.graphics.setStrokeStyle(1);
    gunBackground.graphics.beginStroke(createjs.Graphics.getRGB(10, 50, 255, 1));
    gunBackground.graphics.beginFill(createjs.Graphics.getRGB(120, 120, 130, 1));
    gunBackground.graphics.drawRoundRect(0, 0, 537, 70, 7, 7, 7, 7);
    gunBackground.x = 130;
    gunBackground.y = 25;

    shopAssets.addChild(gunBackground);

    //upgrades
    let counter = 0;
    for (const upgradeName in upgrades) {
        let button;
        let nameText;
        let levelText;
        let statText;
        let costText;

        let upgrade = upgrades[upgradeName];

        //upgrades
        button = new createjs.Shape(buttonGraphics);
        button.x = 130 + 140 * (counter % 4);
        button.y = 125 + 155 * Math.floor(counter / 4);
        //button.shadow = new createjs.Shadow("#000000", 2, 2, 16);

        nameText = new createjs.Text(upgradeName.replace("_", " "), "bold 10px Arial", "#FFF");
        nameText.font = "bold " + 11.5 * (Math.sqrt(100 / nameText.getBounds().width)) + "px Arial";
        nameText.textAlign = "center";
        nameText.textBaseline = "middle";
        nameText.x = 189 + 140 * (counter % 4);
        nameText.y = 145 + 155 * Math.floor(counter / 4);

        levelText = new createjs.Text("Lvl: " + upgrade.level, "bold 10px Arial", "#FFF");
        levelText.font = "bold " + 11.5 * (Math.sqrt(100 / levelText.getBounds().width)) + "px Arial";
        levelText.textAlign = "center";
        levelText.textBaseline = "middle";
        levelText.x = 189 + 140 * (counter % 4);
        levelText.y = 170 + 155 * Math.floor(counter / 4);

        statText = new createjs.Text(upgrade.getValue(upgrade.level) + " 🡺 " + upgrade.getValue(upgrade.level + 1), "bold 10px Arial", "#FFF");
        statText.font = "bold " + 11.5 * (Math.sqrt(100 / statText.getBounds().width)) + "px Arial";
        statText.textAlign = "center";
        statText.textBaseline = "middle";
        statText.x = 189 + 140 * (counter % 4);
        statText.y = 195 + 155 * Math.floor(counter / 4);


        upgrade.container.addChild(button);
        upgrade.container.addChild(nameText);
        upgrade.container.addChild(levelText);
        upgrade.container.addChild(statText);
        //upgrades.speed.container.addChild(costText);

        shopAssets.addChild(upgrade.container);
        counter++;
    }

    // add a text object to output the current FPS:
    fpsLabel = new createjs.Text("- fps", "bold 14px Arial", "#FFF");
    stage.addChild(fpsLabel);
    fpsLabel.x = width - 70;
    fpsLabel.y = 20;

    //game run 
    mouse.x = stage.mouseX;
    mouse.y = stage.mouseY;

    stage.addChild(gameAssets);
    stage.addChild(shopAssets);

    //setupGame();
    setupShop();
    // start the tick and point it at the window so we can do some work before updating the stage:
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
}

function tick(e) {

    if (gameState == 1) {
        mainGame(e);
    } else if (gameState == 2) { //show score screen
        shop(e);
    } else if (gameState == 3) { //show shop

    }
    fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";
    stage.update(event);
}

function moveCanvas(e) {
    mouse.x = e.stageX;
    mouse.y = e.stageY;
}

function mousePressed(e) {
    mouseDown = true;
    if (gameState == 1) {
        player.sprite.gotoAndPlay("shoot");
        player.shooting = true;
    } else if (gameState == 2) {
        gunIndex++;
    }
}

function mouseReleased(e) {
    mouseDown = false;
    if (gameState == 1) {
        player.sprite.gotoAndPlay("unshoot");
        player.shooting = false;
    }
}

onkeydown = onkeyup = function (e) {
    e = e || event; // to deal with IE
    keys[e.keyCode] = e.type == 'keydown';
    if (e.keyCode == 32) {
        if (keys[32]) { //press shield
            if (gameState == 1) {
                player.boosting = true;
                player.speed = player.boostSpeed;
                player.boostG.visible = true;
            }
        } else { //release shield
            if (gameState == 1) {
                player.boosting = false;
                player.speed = player.baseSpeed;
                player.boostG.visible = false;
            }
        }
    }
}
