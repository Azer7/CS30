// Make an instance of two and place it on the page.
let body = document.getElementsByTagName("BODY")[0];
let width = 1200;
let height = 900;

let two = new Two({
    width: width,
    height: height,
    type: Two.Types.webgl
}).appendTo(body);

//setup
const overflow = 10000; //10000 thousand
const precision = 0.0001; // 10 thousandths

let objects = [];
let rays = [];

objects.push(new Border(100, height - 10, width - 100, height - 100)); //line
objects.push(new Border(100, 100, 130, height - 300)); //line
objects.push(new Border(20, height - 10, width - 100, height - 29)); //line
objects.push(new Border(200, height - 300, width - 50, 200)); //line
objects.push(new Border(500, height - 10, width - 100, 299)); //line

ray = new Ray(width / 2, height / 2, 270); //x, y, angle
for (let i = 0; i < 1000; i++)
    rays.push(new Ray(width / 2, 250, i * (360 / 1000)));

two.bind('update', function (frameCount) { //draw function
    // This code is called everytime two.update() is called.
    // Effectively 60 times per second.

    //    if (group.scale > 0.9999) {
    //    group.scale = group.rotation = 0;
    //  }
    //  let t = (1 - group.scale) * 0.125;
    //  group.scale += t;
    //  group.rotation += t * 4 * Math.PI;
}).play(); // Finally, start the animation loop
