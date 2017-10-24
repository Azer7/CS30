let objects = [];

function setup() {
    createCanvas(600, 800);
    
    objects.push(new Border(0, 20, width)); //line across screen
    //blocks.push(new Rectangle(random(width), 0, 15));
}

function draw() {
    background("white");

    for (let i = 0; i < objects.length; i++) {
        objects[i].draw();
    }
}