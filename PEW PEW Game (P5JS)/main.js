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

let elapsedTicks = 0;
let enemies = 0;
let enemyFrequency;
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
let cash = 0;
let cashLabel;
let playButton;

let leftButton;
let rightButton;

let gunImg;
let gunContainer = new createjs.Container();
let gunIndex = 0;
let guns = [];

guns.push(new Gun("Terry's Trash Taser", 3.33, 4, 0, 1.2, "The result of 6 years of pole-dancing", {
    c: createjs.Graphics.getRGB(180, 0, 30, .9),
    s: 5
}, {
    x: 139,
    y: 6,
    w: 42,
    h: 28
}));
guns[0].bought = true;

guns.push(new Gun("Alpha v0.1 Laser", 4, 6, 24.01, 1, "Always better than the full release", {
    c: createjs.Graphics.getRGB(140, 50, 30, .9),
    s: 6
}, {
    x: 97,
    y: 5,
    w: 42,
    h: 26
}));

guns.push(new Gun("Grandma's Gun", 7, 9, 84, .7, "Always better than the full release", {
    c: createjs.Graphics.getRGB(91, 107, 6, .9),
    s: 6
}, {
    x: 42,
    y: 34.6,
    w: 56,
    h: 20
}));

guns.push(new Gun("Alien Dispatcher", 24, 25, 230, 1.2, "911, an alien showed up at my door", {
    c: createjs.Graphics.getRGB(89, 255, 119, .7),
    s: 6
}, {
    x: 72,
    y: 57.5,
    w: 40,
    h: 24
}));

guns.push(new Gun("Butt Blaster", 40, 33, 650, .9, "Man that's a stinky one", {
    c: createjs.Graphics.getRGB(109, 60, 20, .7),
    s: 6
}, {
    x: 1,
    y: 60,
    w: 70,
    h: 30
}));

guns.push(new Gun("Fire Extinguisher", 66, 44, 999, .9, "Burn Baby Burn", {
    c: createjs.Graphics.getRGB(222, 66, 6, .7),
    s: 12
}, {
    x: 1,
    y: 135,
    w: 52,
    h: 16
}));

let upgrades = [];
//Damage upgrade
upgrades.push(new Upgrade("Damage", 10, (lvl) => 1 + 0.06 * lvl));
//Max Health upgrade
upgrades.push(new Upgrade("Health", 10, (lvl) => 100 + 10 * lvl));
//Player speed upgrade
upgrades.push(new Upgrade("Speed", 10, (lvl) => .5 + 0.03 * lvl));
//Player Max Energy upgrade
upgrades.push(new Upgrade("Max Energy", 10, (lvl) => 100 + Math.pow(20 * lvl, 1.2)));
//Player Max Boost upgrade
upgrades.push(new Upgrade("Max Boost", 10, (lvl) => 100 + 20 * lvl));
//Player Boost Recharge upgrade
upgrades.push(new Upgrade("Boost Recharge", 10, (lvl) => .3 + 0.02 * lvl));
//Player Boost Speed upgrade
upgrades.push(new Upgrade("Boost Speed", 10, (lvl) => .9 + 0.06 * lvl));
//Player Energy Recharge upgrade
upgrades.push(new Upgrade("Energy Recharge", 10, (lvl) => 3 + Math.floor(Math.pow(lvl, 1.3) * 10) / 10));
//Game Income multiplier upgrade
upgrades.push(new Upgrade("Income", 10, (lvl) => 1 + 0.2 * lvl, (lvl) => 10 + Math.pow(4 * lvl, 1.4)));
//Game Zombie spawn rate upgrade
upgrades.push(new Upgrade("Zombie Rate", 10, (lvl) => 1 + 0.05 * lvl));
//Zombie Speed (slowdown) upgrade
upgrades.push(new Upgrade("Zombie Speed", 10, (lvl) => 1 - Math.sqrt(lvl) * 0.08));
//Zombie Multiplyer, increases health and damage by double this value,
//while increasing income by it
upgrades.push(new Upgrade("Zombie Mult.", 10, (lvl) => 1 + Math.pow(0.1 * lvl, 1.5)));

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
        "animations": {
            "move": [0, 16, "move", .32],
        }
    });

    //add game collision stuff
    objects.push(new Border(0, 0, width, 200, true));

    player = new Player(220, 350);

    playerHud = new createjs.Bitmap("Sprites/playerHud.png");
    playerHud.scaleX = .7;
    playerHud.scaleY = .7;
    playerHud.shadow = new createjs.Shadow("#000000", .3, .3, 4);
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
    shopAssets.addChild(blurBackground);

    shopGui = new createjs.Bitmap("Sprites/bShopGui.png");
    shopGui.scaleX = .952;
    shopGui.scaleY = .952;
    shopGui.x = 99.2;
    shopGui.shadow = new createjs.Shadow("#000000", 4, 4, 8);
    shopAssets.addChild(shopGui);

    //create gun container
    //gun change upgrade (top box)
    let gunBackground = new createjs.Shape();
    gunBackground.graphics.setStrokeStyle(1);
    gunBackground.graphics.beginStroke(createjs.Graphics.getRGB(10, 50, 255, 1));
    gunBackground.graphics.beginFill(createjs.Graphics.getRGB(120, 120, 130, 1));
    gunBackground.graphics.drawRoundRect(0, 0, 400, 85, 7);
    gunContainer.addChild(gunBackground);

    gunImg = new createjs.Bitmap("Sprites/guns.png");
    gunImg.snapToPixel = false;
    gunContainer.addChild(gunImg);

    leftButton = new Button(() => {
        updateGun(gunIndex - 1)
    }, () => {});
    leftButton.bubbly = false;
    rightButton = new Button(() => {
        updateGun(gunIndex + 1)
    }, () => {});
    rightButton.bubbly = false;

    let leftArrow = new createjs.Shape();
    leftArrow.graphics.setStrokeStyle(1);
    leftArrow.graphics.beginStroke(createjs.Graphics.getRGB(10, 50, 50, 1));
    leftButton.buttonColor = leftArrow.graphics.beginFill(createjs.Graphics.getRGB(0, 0, 0, 1)).command;
    leftButton.hoverColor = createjs.Graphics.getRGB(30, 30, 30, 1);
    leftButton.unhoverColor = createjs.Graphics.getRGB(0, 0, 0, 1);
    leftArrow.graphics.drawPolyStar(27, 26, 15, 3, 0, 180);

    leftButton.container.addChild(leftArrow);

    let rightArrow = new createjs.Shape();
    rightArrow.graphics.setStrokeStyle(1);
    rightArrow.graphics.beginStroke(createjs.Graphics.getRGB(10, 50, 50, 1));
    rightButton.buttonColor = rightArrow.graphics.beginFill(createjs.Graphics.getRGB(0, 0, 0, 1)).command;
    rightButton.hoverColor = createjs.Graphics.getRGB(30, 30, 30, 1);
    rightButton.unhoverColor = createjs.Graphics.getRGB(0, 0, 0, 1);
    rightArrow.graphics.drawPolyStar(150, 26, 15, 3);

    rightButton.container.addChild(rightArrow);

    let equipContainer = new Button(() => {
        equipGun();
    }, () => {});

    let equipButton = new createjs.Shape();
    equipButton.graphics.setStrokeStyle(1);
    equipButton.graphics.beginStroke(createjs.Graphics.getRGB(10, 50, 255, 1));
    equipContainer.buttonColor = equipButton.graphics.beginFill(createjs.Graphics.getRGB(109, 121, 143, 1)).command;
    equipButton.graphics.drawRoundRect(0, 0, 94, 26, 7);

    let equipText = new createjs.Text("Equip", "bold 16.5px Arial", "#FFF");
    equipText.textAlign = "center";
    equipText.textBaseline = "middle";
    equipText.x = 47;
    equipText.y = 12;

    equipContainer.container.addChild(equipButton);
    equipContainer.container.addChild(equipText);
    equipContainer.container.x = 88;
    equipContainer.container.y = 63;
    equipContainer.container.regX = 47;
    equipContainer.container.regY = 13

    //gun container wrapper
    gunContainer.addChild(leftButton.container);
    gunContainer.addChild(rightButton.container);
    gunContainer.addChild(equipContainer.container);

    //add gun text n stuff
    let gunName = new createjs.Text("Terry's Trash Taser", "bold 15px Arial", "#FFF");
    gunName.textAlign = "center";
    gunName.textBaseline = "middle";
    gunName.x = 281;
    gunName.y = 14;

    let gunStats = new createjs.Text("Damage: 4    Energy Cost: 4", "bold 12px Arial", "#FFF");
    gunStats.textAlign = "center";
    gunStats.textBaseline = "middle";
    gunStats.x = 281;
    gunStats.y = 33;

    let gunSpeed = new createjs.Text("Speed Multiplier: 1.2x", "bold 12px Arial", "#FFF");
    gunSpeed.textAlign = "center";
    gunSpeed.textBaseline = "middle";
    gunSpeed.x = 281;
    gunSpeed.y = 51;

    let gunText = new createjs.Text("“The result of 6 years of pole-dancing”", "bold 11px Arial", "#FFF");
    gunText.textAlign = "center";
    gunText.textBaseline = "middle";
    gunText.x = 281;
    gunText.y = 70;


    gunContainer.addChild(gunName);
    gunContainer.addChild(gunStats);
    gunContainer.addChild(gunSpeed);
    gunContainer.addChild(gunText);

    gunContainer.x = 130;
    gunContainer.y = 22;
    shopAssets.addChild(gunContainer);

    cashLabel = new createjs.Text("฿" + cash, "bold 125px Arial", "#FFF");
    cashLabel.font = "bold " + 38 * (Math.sqrt(210 / cashLabel.getBounds().width)) + "px Arial";

    cashLabel.textAlign = "center";
    cashLabel.textBaseline = "middle";
    cashLabel.x = 603;
    cashLabel.y = 62;
    shopAssets.addChild(cashLabel);

    playButton = new Button(() => {}, () => {
        setupGame()
    });
    let button = new createjs.Shape();
    button.graphics.setStrokeStyle(1);
    button.graphics.beginStroke(createjs.Graphics.getRGB(10, 50, 255, 1));
    playButton.buttonColor = button.graphics.beginFill(createjs.Graphics.getRGB(109, 121, 143, 1)).command;
    button.graphics.drawRoundRect(0, 0, 200, 66, 7);

    let playText = new createjs.Text("~Play~", "bold 25.5px Arial", "#FFF");
    playText.textAlign = "center";
    playText.textBaseline = "middle";
    playText.x = 100;
    playText.y = 33;

    playButton.container.addChild(button);
    playButton.container.addChild(playText);
    playButton.container.x = 400;
    playButton.container.y = 585;
    playButton.container.regX = 100;
    playButton.container.regY = 33;

    shopAssets.addChild(playButton.container);

    //upgrades
    for (let i = 0; i < upgrades.length; i++) {
        let button;
        let nameText;
        let levelText;
        let statText;
        let costText;

        //upgrades
        button = new createjs.Shape();
        button.graphics.setStrokeStyle(1);
        button.graphics.beginStroke(createjs.Graphics.getRGB(10, 50, 255, 1));
        upgrades[i].buttonColor = button.graphics.beginFill(createjs.Graphics.getRGB(109, 121, 143, 1)).command;
        button.graphics.drawRoundRect(0, 0, 120, 114, 7, 7, 7, 7);

        //button.shadow = new createjs.Shadow("#000000", 2, 2, 16);
        nameText = new createjs.Text(upgrades[i].name, "bold 11.5px Arial", "#FFF");
        nameText.font = "bold " + 11.5 * (Math.sqrt(100 / nameText.getBounds().width)) + "px Arial";
        nameText.textAlign = "center";
        nameText.textBaseline = "middle";
        nameText.x = 59;
        nameText.y = 20;

        levelText = new createjs.Text("Lvl: " + upgrades[i].level, "bold 15.5px Arial", "#FFF");
        levelText.font = "bold " + 11.5 * (Math.sqrt(100 / levelText.getBounds().width)) + "px Arial";
        levelText.textAlign = "center";
        levelText.textBaseline = "middle";
        levelText.x = 59;
        levelText.y = 45;

        if (upgrades[i].name == "Damage" || upgrades[i].name == "Income" || upgrades[i].name == "Zombie Rate" || upgrades[i].name == "Zombie Mult.") {
            statText = new createjs.Text(Math.floor(upgrades[i].getValue(upgrades[i].level) * 100) / 100 + "x 🡺 " + Math.floor(upgrades[i].getValue(upgrades[i].level + 1) * 100) / 100 + "x", "bold 15.5px Arial", "#FFF");

        } else {
            statText = new createjs.Text(Math.floor(upgrades[i].getValue(upgrades[i].level) * 100) / 100 + " 🡺 " + Math.floor(upgrades[i].getValue(upgrades[i].level + 1) * 100) / 100, "bold 15.5px Arial", "#FFF");
        }
        statText.font = "bold " + 11.5 * (Math.sqrt(100 / statText.getBounds().width)) + "px Arial";
        statText.textAlign = "center";
        statText.textBaseline = "middle";
        statText.x = 59;
        statText.y = 70;


        costText = new createjs.Text("฿" + upgrades[i].getCost(upgrades[i].level), "bold 12px Arial", "#FFF");
        costText.font = "bold " + 12 * (Math.sqrt(100 / costText.getBounds().width)) + "px Arial";
        costText.textAlign = "center";
        costText.textBaseline = "middle";
        costText.x = 59;
        costText.y = 94;

        upgrades[i].container.addChild(button);
        upgrades[i].container.addChild(nameText);
        upgrades[i].container.addChild(levelText);
        upgrades[i].container.addChild(statText);
        upgrades[i].container.addChild(costText);
        upgrades[i].container.x = 190 + 140 * (i % 4); //130 offset
        upgrades[i].container.y = 187 + 145 * Math.floor(i / 4); //125 offset
        upgrades[i].container.regX = 60;
        upgrades[i].container.regY = 57;

        shopAssets.addChild(upgrades[i].container);
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
    elapsedTicks++;
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
    }
}

function mouseReleased(e) {
    mouseDown = false;
    if (gameState == 1 && player.shooting) {
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
