//base line
class Line {
    constructor(slope, intercept) {
        this.slope = slope;
        this.intercept = intercept;
    }
}

//shape for intersections
class Shape {
    constructor(x, y) { //terrain
        this.lines = [];
        this.x = x;
        this.y = y;

        //setting up the lines of the shape
        this.setupLines();
    }
}

//custom shapes and arrangements
class Border extends Shape {
    constructor(x, y, xEnd, yEnd) {
        super(x, y);
        this.xEnd = xEnd;
        this.yEnd = yEnd;
        
        //angle *= Math.PI / 180;
        //this.rise = Math.sin(angle) * length;
        //this.run = Math.cos(angle) * length;
    }

    setupLines() {
        this.lines.push(new Line(0, this.y));
    }

    draw() {
        stroke("black");
        strokeWeight(2);

        line(this.x, this.y, this.xEnd, this.yEnd);
    }
}

class Rectangle extends Shape {
    constructor(x, y, width, height) {
        super(x, y);
        this.width = width;
        this.height = height | width; //if it's a square
    }

    setupLines() {


    }
}

class Triangle extends Shape {
    constructor(x, y) {
        super(x, y);
    }

    setupLines() {


    }
}
