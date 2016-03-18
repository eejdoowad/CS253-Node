'use strict';
let express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const secrets = require('./secrets.json');

let app = express();
// install bodyParser middleware for parsing POST queries
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// install cookieParser middleware
app.use(cookieParser(secrets.cookieSecret));
// set template engine to jade
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));

// log all http requests to stdout
app.use(function (req, res, next) {
  // console.log('Time:', Date.now());
  console.log(req.method + ' to ' + req.url);
  next();
});

// mount routers for each unit
app.use('/unit-1', require('./unit-1/index'));
app.use('/unit-2', require('./unit-2/index'));
app.use('/unit-3', require('./unit-3/index'));
app.use('/unit-4', require('./unit-4/index'));

// handle get requests to root
app.get('/', (req, res) => {
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
    <br><a href="/unit-4">Unit 4</a>
    <br><h4>Ideas</h4>
    Online S-expression visualizer and other tools useful for compilers</br>
  </body>
</html>`;
  res.send(body);
});

// Start listening on specified port
let port = process.argv[2] || 8000;
app.listen(port);
console.log('Express started on port ' + port);

