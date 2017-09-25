let mouseButtonR = false;
let mouseButtonL = false;

function handleMouseDown(e) {
    if (e.button === 0) //left
        mouseButtonL = true;
    else if (e.button === 2) //right
        mouseButtonR = true;

    if (mouseButtonL && mouseButtonR)
        console.log("both down");
}

function handleMouseUp(e) {
    if (e.button === 0) //left
        mouseButtonL = false;
    else if (e.button === 2)
        mouseButtonR = false;
}

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);