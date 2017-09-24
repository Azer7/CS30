let stars = [];
let tinyStars = [];

//big clickable star object
class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = random(7, 15);
        
        this.perlinT = random(0, 10000);
        this.alpha = 100;
        
        this.connected = [];
        this.undrawnConnected = [];
        
        stars.push(this); //list of all stars
    }
    
    draw() {
        noStroke();
        fill(0);
        ellipse(this.x, this.y, this.r * 2);
        
        this.alpha = noise(this.perlinT) * 255;
        fill(255, this.alpha);
        
        ellipse(this.x, this.y, this.r * 2);        
    }
}

//tiny visual star
class tinyStar {
    constructor(x, y, colour) {
        this.x = x;
        this.y = y;
        this.d = 2;
        this.colour = colour;
        tinyStars.push(this);
    }
    
    draw() {
        stroke(this.colour);
        noFill();
        ellipse(this.x, this.y, this.d);
    }
}