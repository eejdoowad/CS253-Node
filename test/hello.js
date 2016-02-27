var home_content = "And so the tale begins...";

var content =
    `<!doctype html>
    <html>
        <head
            <title>lesson 1</title>
        </head>
        <body>
            here we are and here we aren't
            <form action="http://www.google.com/search">
                <input name="q">
                <input type="submit">
            </form>
        </body>
    </html>`;

var http = require("http");

var server = http.createServer(function (request, response) {
    if (request.method === "GET") {
        if (request.url === "/") {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.end(home_content);
        } else if (request.url === "/test") {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.end(content);
        } else {
            response.writeHead(404, {"Content-Type": "text/html"});
            response.end();
        }
    }
});

server.listen(8000);

console.log("Server running at http://127.0.0.1:8000/");
