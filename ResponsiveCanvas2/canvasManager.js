let canvas = document.getElementById("cursorCanvas");
let div = document.getElementById("frage");

let canvasContainer = document.getElementById("canvasContainer");

let ctx = canvas.getContext("2d");

let cursorImg = new Image();
cursorImg.src = "pointer.png";

//update canvas size at start
canvas.width = canvasContainer.offsetWidth;
canvas.height = canvasContainer.offsetHeight;

function onResize() {
    //update canvas size;
    //set canvas size to parent size, parent is responsive
    canvas.width = canvasContainer.offsetWidth;
    canvas.height = canvasContainer.offsetHeight;
}

div.addEventListener("click", function(e) {
    let cRect = canvas.getBoundingClientRect();      // Gets CSS pos, and width/height

    let mouseX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas
    mouseX /= cRect.width;
    mouseX *= canvas.width;

    let mouseY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make
    mouseY /= cRect.height;
    mouseY *= canvas.height;

    drawCursor(mouseX, mouseY);
});

function drawCursor(mouseX, mouseY) {
    //console.log("MouseX: " + mouseX + " MouseY: " + mouseY);
    //console.log("CanvasWidth: " + canvas.width + " CanvasHeight: " + canvas.height);
    ctx = canvas.getContext("2d");
    ctx.drawImage(cursorImg, mouseX, mouseY, 15, 22);
}