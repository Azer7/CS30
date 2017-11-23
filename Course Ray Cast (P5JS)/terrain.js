let terrain = [
    //left wall
    {
        x1: 50.125,
        y1: 600,
        x2: 141.125,
        y2: 283
    },
    {
        x2: 301.125,
        y2: 171
    },
    {
        x2: 498.125,
        y2: 102
    },
    {
        x2: 798.125,
        y2: 82
    },


    //right wall
    {
        x1: 333.125,
        y1: 600,
        x2: 429.125,
        y2: 406
    },
    {
        x1: 429.125,
        y1: 406,
        x2: 640.125,
        y2: 283
    },
    {
        x1: 640.125,
        y1: 283,
        x2: 799.125,
        y2: 236
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
