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
let fpsLabel;

const overflow = 10000; //10k
const precision = 0.0001; // 10kths

let enemies = [];
let objects = [];
let player;
let playerSpriteSheet;
let zombieSpriteSheet;
let hud;

let score = 0;
let scoreLabel;

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
    
    let background = new createjs.Bitmap("Sprites/grass-background.png");
    stage.addChild(background);
    
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

    //add collision stuff
    objects.push(new Border(0, 0, width, 200, true));
    //enemies.push(new Enemy(200, 200, .4, 1, 300));

    player = new Player(220, 350);

    let hud = new createjs.Bitmap("Sprites/hud.png");
    hud.scaleX = .7;
    hud.scaleY = .7;
    stage.addChild(hud);

    mouse.x = stage.mouseX;
    mouse.y = stage.mouseY;
    // add a text object to output the current FPS:
    fpsLabel = new createjs.Text("------ @ -- fps", "bold 14px Arial", "#FFF");
    stage.addChild(fpsLabel);
    fpsLabel.x = width - 70;
    fpsLabel.y = 20;

    scoreLabel = new createjs.Text("", "bold 37px Arial", "#FFF");
    stage.addChild(scoreLabel);
    scoreLabel.x = 27;
    scoreLabel.y = 24;
    // start the tick and point it at the window so we can do some work before updating the stage:
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
}

function tick(e) {
    zombieSpriteSheet._data.move.speed = .4 + e.target.getTicks() / 3600;
    //enemies[i].speed = 1.6 + e.target.getTicks() / 900;

    if (gameState == 1) {
        if (e.target.getTicks() % 100 == 0 && enemies.length < 15) {
            let newX = 0;
            let newY = 0;
            let sideRand = Math.floor(Math.random() * 5);
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
                objects[i].sprite.updateCache();
                objects[i].update(i, e.target.getTicks());
            }
        }

        scoreLabel.text = score;
        let b = scoreLabel.getBounds();
        scoreLabel.x = 42 - b.width / 2;
        // draw the updates to stage
    } else if (gameState == 2) { //show score screen

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
    /* insert conditional here */
}
