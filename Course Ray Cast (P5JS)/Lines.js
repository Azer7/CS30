//base line
class Line {
    constructor(x, y, xEnd, yEnd) {
        this.pos = createVector(x + 0.01, y + 0.01);
        this.posEnd = createVector(xEnd, yEnd);
        this.slope;
        this.yIntercept;

        this.setLine(x + 0.01, y + 0.01, xEnd, yEnd);
    }

    setLine(x, y, xEnd, yEnd) {
        this.pos.x = x;
        this.pos.y = y;
        this.posEnd.x = xEnd;
        this.posEnd.y = yEnd;

        //calculate slope intercept
        this.slope = (this.posEnd.y - this.pos.y) / (this.posEnd.x - this.pos.x);
        this.yIntercept = this.pos.y - this.slope * this.pos.x;
    }
}

//shape for intersections
class Shape {
    constructor(x, y) { //terrain
        this.lines = [];
        this.pos = createVector(x, y); //general positon vector
    }
}

let lastLine = {
    x: 0,
    y: 0
};

//custom shapes and arrangements
class Border extends Shape { //this looks awfully like class Line because it *almost is (kinda)
    constructor(x, y, xEnd, yEnd) {
        super(x ? x : lastLine.x, y ? y : lastLine.y);
        this.posEnd = createVector(xEnd, yEnd);

        lastLine.x = this.posEnd.x;
        lastLine.y = this.posEnd.y;
        //setting up the lines of the shape
        this.setupShape();
    }

    setupShape() {
        this.lines.push(new Line(this.pos.x, this.pos.y, this.posEnd.x, this.posEnd.y));
    }

    draw() {
        stroke("black");
        strokeWeight(2);

        line(this.pos.x, this.pos.y, this.posEnd.x, this.posEnd.y); //because I don't need to refernce the arr
    }
}

class Rectangle extends Shape {
    constructor(x, y, width, height) {
        super(x, y);
        this.width = width;
        this.height = height | width; //if it's a square

        //setting up the lines of the shape
        this.setupShape();
    }

    setupShape() {


    }
}
