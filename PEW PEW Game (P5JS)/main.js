"use strict";
let canvas;
let stage;
let width = 800,
    height = 640;
let mouse = new Vector(0, 0);
let mouseDown = false;

let graphics = {
    ray: new createjs.Graphics(),
    player: new createjs.Graphics(),
    reset: function () {
        //ray
        //player
        this.player.setStrokeStyle(1);
        this.player.beginStroke(createjs.Graphics.getRGB(0, 0, 0));
        this.player.beginFill(createjs.Graphics.getRGB(255, 0, 0));
        this.player.drawCircle(0, 0, 16);
    }
};
graphics.reset();

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
            x: 60,
            y: 60,
            w: 20,
            h: 10
        }
    }
]

let upgrades = {
    speed: {
        img: new createjs.Bitmap("Sprites/speed.png"),
        text: new createjs.Text("Speed", "bold 20px Arial", "#FFF"),
        maxLevel: 0,
        level: 0
    },
    damage: {
        img: 0,
        maxLevel: 0,
        level: 0
    },
    health: {
        img: 0,
        maxLevel: 0,
        level: 0
    },
    income: {
        img: 0,
        maxLevel: 0,
        level: 0
    },
    maxEnergy: {
        img: 0,
        maxLevel: 0,
        level: 0
    },
    energyRecharge: {
        img: 0,
        maxLevel: 0,
        level: 0
    },
    maxBoost: {
        img: 0,
        maxLevel: 0,
        level: 0
    },
    boostRecharge: {
        img: 0,
        maxLevel: 0,
        level: 0
    },
    boostSpeed: {
        img: 0,
        maxLevel: 0,
        level: 0
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
    stage.addChild(background);
    gameAssets.push(background);

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
    stage.addChild(playerHud);
    gameAssets.push(playerHud);

    scoreLabel = new createjs.Text("", "bold 37px Arial", "#FFF");
    stage.addChild(scoreLabel);
    scoreLabel.x = 27;
    scoreLabel.y = 24;
    gameAssets.push(scoreLabel);

    //state 2
    blurBackground = new createjs.Shape();
    blurBackground.graphics.setStrokeStyle(1);
    blurBackground.graphics.beginFill(createjs.Graphics.getRGB(10, 10, 50, .6));
    blurBackground.graphics.drawRect(0, 0, width, height);
    stage.addChild(blurBackground);
    shopAssets.push(blurBackground);

    shopGui = new createjs.Bitmap("Sprites/shopGui.png");
    shopGui.scaleX = .94;
    shopGui.scaleY = .94;
    shopGui.x = 99.2;
    shopGui.y = 19.2;
    stage.addChild(shopGui);
    shopAssets.push(shopGui);

    gun = new createjs.Bitmap("Sprites/guns.png");
    gun.scaleX = 1;
    gun.scaleY = 1;
    stage.addChild(gun);
    shopAssets.push(gun);

    mouse.x = stage.mouseX;
    mouse.y = stage.mouseY;
    
    // add a text object to output the current FPS:
    fpsLabel = new createjs.Text("------ @ -- fps", "bold 14px Arial", "#FFF");
    stage.addChild(fpsLabel);
    fpsLabel.x = width - 70;
    fpsLabel.y = 20;
    constantAssets.push(fpsLabel);

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
        gunIndex ++;
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
