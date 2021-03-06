let pagePrefix = "corona_page_";
let socket = io();

socket.on("connect", (socket) => {
    //setInterval(sendMousePosition, 100);
});

socket.on("positionsDataPack", (coords) => {
    drawCursors(coords);
});

function sendMousePosition(mouseX, mouseY) {
    socket.emit("cursorPosition", {
        "x": mouseX,
        "y": mouseY,
        "id": pagePrefix + questionNumber
    });
}
