let canvas = document.getElementById("cursorCanvas");

let body = document.body;

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

function handleClicks(e){
    e.stopPropagation();
    e.preventDefault();
    let cRect = canvas.getBoundingClientRect();      // Gets CSS pos, and width/height

    if (typeof e.clientX !== 'undefined'){
        var posX = e.clientX;   //touch vs click hacks
        var posY = e.clientY;
    } else{
        var posX = e.touches[0].clientX;
        var posY = e.touches[0].clientY;
    }
    let mouseX = Math.round(posX - cRect.left);  // Subtract the 'left' of the canvas
    mouseX /= cRect.width;
    mouseX *= canvas.width;


    let mouseY = Math.round(posY - cRect.top);   // from the X/Y positions to make
    mouseY /= cRect.height;
    mouseY *= canvas.height;
    console.log("click! drawing cursor");
    console.log(mouseX, cRect.top);
    drawCursor(mouseX, mouseY);
    sendMousePosition(mouseX, mouseY);
}


body.addEventListener('touchstart', handleClicks)
body.addEventListener('click', handleClicks)



function clearCursors() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCursor(mouseX, mouseY) {
    //console.log("MouseX: " + mouseX + " MouseY: " + mouseY);
    //console.log("CanvasWidth: " + canvas.width + " CanvasHeight: " + canvas.height);
    ctx = canvas.getContext("2d");
    ctx.drawImage(cursorImg, mouseX, mouseY, 15, 22);
}


function drawCursors(coords) {
    clearCursors();
    ctx = canvas.getContext("2d");
    coords.forEach((cursor) => {
        if(cursor.x < 1 || cursor.y < 1) return;
        if(cursor.id !== "corona_page_" + questionNumber) return;
        ctx.drawImage(cursorImg, cursor.x, cursor.y, 15, 22);
    });
}
