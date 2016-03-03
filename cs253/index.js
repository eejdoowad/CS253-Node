'use strict';
let express = require('express');
let unit1 = require('./unit-1/index');
let unit2 = require('./unit-2/index');
var bodyParser = require('body-parser');

let body =
`<!doctype html>
<html>
  <head>
    <title>Udacity's CS 253 with Node</title>
  </head>
  <body>
    <h3>Udacity's CS 253, but with Node and Express!</h3>
    <a href="/unit-1">Unit 1</a>
    <br><a href="/unit-2">Unit 2</a>
    <br><a href="/unit-3">Unit 3</a>
  </body>
</html>`;

let app = express();
// install bodyParser middleware for parsing POST queries
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function (req, res, next) {
  // console.log('Time:', Date.now());
  console.log(req.method + ' to ' + req.url);
  next();
});

app.use('/unit-1', unit1);
app.use('/unit-2', unit2);

app.get('/', (req, res) => {
  res.send(body);
});

// triggered by any http request method to /secret
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});

app.listen(8000);
console.log('Express started on port 8000');

