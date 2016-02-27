/*jslint node:true */
"use strict";

var PN = 80;

var http = require("http");

var server = http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type" : "text/plain"});
    response.end("And so the tale begins...");
});

server.listen(PN);

console.log("Server running at http://pantale.com:" + PN);
