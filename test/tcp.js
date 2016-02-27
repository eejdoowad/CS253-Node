/*jslint node:true */
"use strict";

var net = require("net")

var server = net.createServer(function (socket) {
    console.log("Connection from " + socket.remoteAddress);
    socket.end("Hello World");
})

server.listen(7000, "localhost");

console.log("TCP server listening on port 7000 at localhost.");