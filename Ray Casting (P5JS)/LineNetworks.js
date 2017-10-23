class Line {
    constructor(slope, intercept) {
        this.slope = slope;
        this.intercept = 
    }
}

class LineNetwork extends Line{
    constructor(x, y) { //terrain
        this.lines = [];
        this.x = x | random(0, width);
        this.y = 0;
        
        this.setupLines();        
    }
}

class Square extends LineNetwork {
    constructor(x, y) {
        super(x, y);
    }
    
    setupLines() {
        
        
    }
}

class Triangle extends LineNetwork {
    constructor(x, y) {
        super(x, y);
    }
    
    setupLines() {
        
        
    }
}