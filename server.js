var express = require("express");
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on("cursorPosition", (coords) => {
        cursorPositions.push({
            "x": coords.x,
            "y": coords.y,
            "id": coords.id
        });
        //console.log(`Got cursor x: ${coords.x} y: ${coords.y}`);
    });

    socket.on("getUserCount", () => {
        socket.emit("userCount", socket.client.conn.server.clientsCount);
    });
});

let cursorPositions = [];

let counter = 0;
function distributeCursorPositions() {
    io.volatile.emit("positionsDataPack", cursorPositions);
    console.log(cursorPositions);
    counter++;
}

setInterval(distributeCursorPositions, 500);

app.use(express.static('ResponsiveCanvas2'));

http.listen(3333, function() {
    console.log('listening on *:3333');
});

