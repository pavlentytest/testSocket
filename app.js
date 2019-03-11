var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req,resp) {
    resp.sendFile(__dirname+'/client/index.html');
});

app.use('/client',express.static(__dirname+'/client'));

serv.listen(5000);
console.log("Server started...");

var SOCKET_LIST = {};

var io = require('socket.io');
io.sockets.on('connection',function(socket) {
    socket.id = Math.random();
    socket.x = 0;
    socket.y = 0;
    socket.number  = "" + Math.floor(10*Math.random());
    SOCKET_LIST[socket.id] = socket;
    // обработка удаления
});

setInterval(function () {
    var pack = [];
    for(var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.x++;
        socket.y++;
        pack.push({
            x: socket.x,
            y: socket.y,
            number: socket.number
        });
    }
    for(var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions',pack);
    }
},50);

