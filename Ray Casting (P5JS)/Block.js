class Block {
    constructor(type, x, y) { //terrain
        this.lines = [];
        this.type = type;
        this.x = x | random(0, width);
        this.y = 0;
        
        this.setupLines();        
    }
    
    setupLines() {
        
        
        
        
    }
}

class Square extends Block {
    constructor() {
        
        
    }
}

class triangle extends Block {
    constructor() {
        
        
    }
}