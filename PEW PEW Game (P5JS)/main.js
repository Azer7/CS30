"use strict";
let canvas;
let stage;
let width = 800,
    height = 600;
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

function init() {
    canvas = document.getElementById("game");
    stage = new createjs.Stage(canvas);

    //player stuff
    stage.addEventListener("stagemousemove", moveCanvas);
    stage.addEventListener("stagemousedown", mousePressed);
    stage.addEventListener("stagemouseup", mouseReleased);

    //{
    //            "width": 312,
    //            "height": 206,
    //            "regX": 116,
    //            "regY": 123,
    //            "count": 63,
    //            "spacing": 1,
    //            "margin": 2
    //        }
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
    enemies.push(new Enemy(200, 200, .4, 1, 300));

    player = new Player(220, 350);

    // add a text object to output the current FPS:
    fpsLabel = new createjs.Text("------ @ -- fps", "bold 14px Arial", "#FFF");
    stage.addChild(fpsLabel);
    fpsLabel.x = 10;
    fpsLabel.y = 20;
    // start the tick and point it at the window so we can do some work before updating the stage:
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
}

function tick() {
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

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].update(i)
        enemies[i].sprite.updateCache();
    }

    fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";
    // draw the updates to stage
    stage.update(event);
}

function moveCanvas(e) {
    mouse.x = e.stageX;
    mouse.y = e.stageY;
}

function mousePressed(e) {
    player.sprite.gotoAndPlay("shoot");
    player.shooting = true;
    mouseDown = true;
}

function mouseReleased(e) {
    player.sprite.gotoAndPlay("unshoot");
    player.shooting = false;
    mouseDown = false;
}

onkeydown = onkeyup = function (e) {
    e = e || event; // to deal with IE
    keys[e.keyCode] = e.type == 'keydown';
    /* insert conditional here */
}
