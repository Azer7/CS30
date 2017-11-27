class Button {
    constructor(pressedF, releasedF) {
        this.container = new createjs.Container();

        this.buttonColor;
        this.mouseInside = false;
        this.hoverColor = createjs.Graphics.getRGB(140, 140, 160, 1);
        this.unhoverColor = createjs.Graphics.getRGB(109, 121, 143, 1);

        this.bubbly = true;

        this.container.addEventListener("rollover", () => {
            this.mouseInside = true;
            if (this.bubbly) {
                this.container.scaleX = 1.12;
                this.container.scaleY = 1.12;
            }
            this.buttonColor.style = this.hoverColor;
        });
        this.container.addEventListener("rollout", () => {
            this.mouseInside = false;
            if (this.bubbly) {
                this.container.scaleX = 1;
                this.container.scaleY = 1;
            }
            this.buttonColor.style = this.unhoverColor;
        });
        this.container.addEventListener("mousedown", () => {
            if (this.bubbly) {
                this.container.scaleX = 1.2;
                this.container.scaleY = 1.2;
            }
            this.mousePressed();
        });
        this.container.addEventListener("pressup", () => {
            if (this.mouseInside) {
                if (this.bubbly) {
                    this.container.scaleX = 1.12;
                    this.container.scaleY = 1.12;
                }
                this.mouseReleased();
            }
        });

        if (pressedF) {
            this.mousePressed = pressedF;
        }

        if (releasedF) {
            this.mouseReleased = releasedF;
        }
    }
}

class Upgrade extends Button {
    constructor(name, maxlevel, valueFunction) {
        super();
        this.name = name;
        this.level = 0;
        this.maxLevel = maxlevel;
        this.getValue = function (lvl) {
            if (lvl)
                return valueFunction(lvl);
            else
                return valueFunction(this.level);
        }
        this.getCost = (lvl) => 4 + Math.pow(3 * lvl, 1.25);
    }

    update() {
        cashLabel.text = "฿" + cash;
        cashLabel.font = "bold " + 24 * (Math.sqrt(100 / cashLabel.getBounds().width)) + "px Arial";

        let levelText = this.container.children[2];
        let statText = this.container.children[3];
        let costText = this.container.children[4];

        levelText.text = "Lvl: " + this.level;
        levelText.font = "bold " + 11.5 * (Math.sqrt(100 / levelText.getBounds().width)) + "px Arial";

        if (this.name == "Damage" || this.name == "Income" || this.name == "Zombie Rate" || this.name == "Zombie Mult.") {
            statText.text = Math.round(this.getValue(this.level) * 100) / 100 + "x ⇒ " + Math.round(this.getValue(this.level + 1) * 100) / 100 + "x";
        } else {
            statText.text = Math.round(this.getValue(this.level) * 100) / 100 + " ⇒ " + Math.round(this.getValue(this.level + 1) * 100) / 100;
        }
        statText.font = "bold " + 11.5 * (Math.sqrt(100 / statText.getBounds().width)) + "px Arial";

        costText.text = "฿" + Math.round(this.getCost(this.level));
        costText.font = "bold " + 17 * (Math.sqrt(100 / levelText.getBounds().width)) + "px Arial";
    }

    mousePressed() {}

    mouseReleased() {
        if (keys[17]) { //ctrl = sell
            if (this.level > 0) {
                cash += Math.round(this.getCost(this.level - 1) * .75);
                this.level--;
                this.update();
            }
        } else {
            if (Math.round(this.getCost(this.level) <= cash)) {
                cash -= Math.round(this.getCost(this.level));
                this.level++;
                this.update();
            }
        }

    }
}

class Gun {
    constructor(name, damage, energyCost, price, speedMultiplier, text, special, beam, image) {
        this.name = name;
        this.damage = damage;
        this.energyCost = energyCost;
        this.price = price;
        this.bought = false;
        this.speedMultiplier = speedMultiplier;
        this.text = text;
        this.special = special;
        this.beam = beam;
        this.image = image;
    }

}
