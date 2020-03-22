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

function removeDupes(array) {
    let unique = [];

    return array.reverse().filter(packet => {
        if(unique.indexOf(packet.id) > -1) {
            return false;
        } else {
            unique.push(packet.id);
            return true;
        }
    });
}


let counter = 0;
function distributeCursorPositions() {
    let temp = removeDupes(cursorPositions);

    console.dir(temp);

    io.volatile.emit("positionsDataPack", temp);

    if(counter > 5) {
        cursorPositions = [];
    }
    counter++;
}

setInterval(distributeCursorPositions, 500);

app.use(express.static('ResponsiveCanvas2'));

http.listen(3333, function() {
    console.log('listening on *:3333');
});

