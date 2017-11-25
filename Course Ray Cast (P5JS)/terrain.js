let leftIndex = 9;

let terrainPos = [
    //left wall
    {
        x1: 50,
        y1: 600,
        x2: 141,
        y2: 283
    },
    {
        x2: 301,
        y2: 171
    },
    {
        x2: 498,
        y2: 102
    },
    {
        x2: 798,
        y2: 82
    },
    {
        x2: 1000,
        y2: 70
    },
    {
        x2: 1400,
        y2: 80
    },
    {
        x2: 1800,
        y2: 150
    },
    {
        x2: 2400,
        y2: 150
    },
    {
        x2: 2750,
        y2: 500
    },
    {
        x2: 3100,
        y2: 530
    },
    {
        x2: 3400,
        y2: 460
    },

    //right wall
    {
        x1: 333,
        y1: 600,
        x2: 429,
        y2: 406
    },
    {
        x2: 640,
        y2: 283
    },
    {
        x2: 799,
        y2: 236
    },
    {
        x2: 1200,
        y2: 250
    },
    {
        x2: 1500,
        y2: 300
    },
    {
        x2: 1700,
        y2: 370
    },
    {
        x2: 2100,
        y2: 340
    },
    {
        x2: 2300,
        y2: 370
    },
    {
        x2: 2470,
        y2: 540
    },
    {
        x2: 2700,
        y2: 670
    },
    {
        x2: 3100,
        y2: 720
    }
];


//detect new
let clicks = 0;
let startPos = {
    x: 0,
    y: 0
};
let endPos = {
    x: 0,
    y: 0
};

function mouseClicked() {
    clicks = 2;
    if (clicks == 1) {
        startPos.x = mouseX;
        startPos.y = mouseY;
    } else if (clicks == 2) {
        endPos.x = mouseX;
        endPos.y = mouseY;


        //terrainPos.splice(leftIndex + 1, 0, {x2: mouseX + car.pos.x - width / 2, y2: mouseY + car.pos.y - height / 2});
        //graphics
        //terrain.push(new Border(terrainPos[leftIndex + 1].x1, terrainPos[leftIndex + 1].y1, terrainPos[leftIndex + 1].x2, terrainPos[leftIndex + 1].y2))
        
        leftIndex++;
        console.log("x: " + (mouseX - car.pos.x) + "\ny: " + (mouseY - car.pos.y));
        clicks = 0;
    }
}

class TerrainObject {
    constructor(x, y) {
        this.x2 = x;
        this.y2 = y;
    }
}
