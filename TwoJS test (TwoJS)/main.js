// Make an instance of two and place it on the page.
let body = document.getElementsByTagName("BODY")[0];
let width = 1200;
let height = 900;

let two = new Two({
    width: width,
    height: height,
    type: Two.Types.SVG
}).appendTo(body);

//setup
const overflow = 10000; //10000 thousand
const precision = 0.0001; // 10 thousandths

let objects = [];
let rays = [];

let keys = [];

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
    let netX = 0;
    let netY = 0;
    if (keys[65])  //left
        netX -= 2;
    if (keys[68]) 
        netX += 2;
    if (keys[83]) 
        netY += 2;
    if (keys[87]) 
        netY -= 2;

    for (let i = 0; i < rays.length; i++)
        rays[i].tLine.translation.x += netX;

    for (let i = 0; i < rays.length; i++)
        rays[i].tLine.translation.y += netY;

    //    if (group.scale > 0.9999) {
    //    group.scale = group.rotation = 0;
    //  }
    //  let t = (1 - group.scale) * 0.125;
    //  group.scale += t;
    //  group.rotation += t * 4 * Math.PI;
}).play(); // Finally, start the animation loop
onkeydown = onkeyup = function (e) {
    e = e || event; // to deal with IE
    keys[e.keyCode] = e.type == "keydown";
    /* insert conditional here */
}
