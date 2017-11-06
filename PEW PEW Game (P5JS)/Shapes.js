//base line
class Line {
    constructor(x, y, xEnd, yEnd) {
        this.pos = new Vector(x, y);
        this.posEnd = new Vector(xEnd, yEnd);
        this.slope;
        this.yIntercept;

        this.setLine(x, y, xEnd, yEnd);
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
        this.pos = new Vector(x, y); //general positon vector
    }
}

//custom shapes and arrangements
class Border extends Shape { //this looks awfully like class Line because it *almost is (kinda)
    constructor(x, y, xEnd, yEnd) {
        super(x, y);
        this.posEnd = new Vector(xEnd, yEnd);

        //setting up the lines of the shape
        this.setupShape();
    }

    setupShape() {
        this.lines.push(new Line(this.pos.x, this.pos.y, this.posEnd.x, this.posEnd.y));

        this.g = new createjs.Shape();
        this.g.graphics.setStrokeStyle(1);
        this.g.graphics.beginStroke("black");
        this.g.graphics.moveTo(this.pos.x, this.pos.y);
        this.g.graphics.lineTo(this.posEnd.x, this.posEnd.y);
        stage.addChild(this.g)
    }

    draw() {}
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
        let t = this;
        t.lines.push(new Line(t.pos.x + 0.1, t.pos.y + 0.1, t.pos.x + t.width, t.pos.y));
        t.lines.push(new Line(t.pos.x, t.pos.y, t.pos.x + 1, t.pos.y + t.height));
        t.lines.push(new Line(t.pos.x + t.width, t.pos.y, t.pos.x + 1 + t.width, t.pos.y + t.height));
        t.lines.push(new Line(t.pos.x + 0.1, t.pos.y + 0.1 + t.height, t.pos.x + t.width + 1, t.pos.y + t.height));

        t.g = new createjs.Shape(graphics.rect);
        this.g.graphics.setStrokeStyle(1);
        this.g.graphics.beginStroke(createjs.Graphics.getRGB(0, 100, 0));
        this.g.graphics.beginFill(createjs.Graphics.getRGB(255, 0, 0, 0.3));
        this.g.graphics.drawRect(0, 0, this.width, this.height);
        this.g.x = this.pos.x;
        this.g.y = this.pos.y;
        stage.addChild(t.g);
    }

    draw() {}
}

class Triangle extends Shape {
    constructor(x, y) {
        super(x, y);
    }

    setupShape() {


    }
}
