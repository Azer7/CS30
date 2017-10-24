let objects = [];

function setup() {
    createCanvas(800, 600);
    
    objects.push(new Border(0, 20, width, 40)); //line across screen
    //blocks.push(new Rectangle(random(width), 0, 15));
}

function draw() {
    background("white");

    //draw
    for (let i = 0; i < objects.length; i++) {
        objects[i].draw();
    }

    //check for collision
    for(let i = 0; i < objects.length; i++) {
        
    }

}