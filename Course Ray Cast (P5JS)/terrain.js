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
        y2: 140
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
        x2: 2500,
        y2: 370
    },
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
    clicks++;
    if (clicks == 1) {
        startPos.x = mouseX;
        startPos.y = mouseY;
    } else if (clicks == 2) {
        endPos.x = mouseX;
        endPos.y = mouseY;

        console.log("{x1: " + startPos.x + ", y1: " + startPos.y + ", x2: " + endPos.x + ", y2: " + endPos.y + "}");
        clicks = 0;
    }
}
