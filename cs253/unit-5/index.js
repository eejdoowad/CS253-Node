'use strict';
let express = require('express');

let body =
`<!doctype html>
<html>
  <head>
    <title>Unit 5</title>
  </head>
  <body>
    <h3>Unit 5</h3>
    <h5>Lesson</h5>
    <a href="/unit-5/lesson/urllib">urllib</a>
    <br><a href="/unit-5/lesson/geolocation">geolocation</a>
    <br><a href="/unit-5/lesson/ascii">ascii</a>
    <h5>Problems</h5>
    <a href="/unit-5/problem/blog">blog</a>
  </body>
</html>`;

let router = express.Router();

router.get('/', (req, res) => {
  res.send(body);
});

let lesson = express.Router();
lesson.use('/urllib', require('./lesson/urllib'));
lesson.use('/geolocation', require('./lesson/geolocation'));
lesson.use('/ascii', require('./lesson/ascii'));

let problem = express.Router();
problem.use('/blog', require('./problem/blog'));

router.use('/lesson', lesson);
router.use('/problem', problem);

module.exports = router;
