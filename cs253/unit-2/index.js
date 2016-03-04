'use strict';
let express = require('express');

let body =
`<!doctype html>
<html>
  <head>
    <title>Unit 2</title>
  </head>
  <body>
    <h3>Unit 2</h3>
    <h5>Lesson</h5>
    <a href="/unit-2/lesson/form">form</a>
    <br><a href="/unit-2/lesson/get">get</a>
    <br><a href="/unit-2/lesson/query">query</a>
    <br><a href="/unit-2/lesson/post">post</a>
    <br><a href="/unit-2/lesson/password">password</a>
    <br><a href="/unit-2/lesson/checkbox">checkbox</a>
    <br><a href="/unit-2/lesson/radio">radio</a>
    <br><a href="/unit-2/lesson/label">label</a>
    <br><a href="/unit-2/lesson/select">select</a>
    <br><a href="/unit-2/lesson/birthday">birthday</a>
    <br><a href="/unit-2/lesson/template/1">template1</a>
    <br><a href="/unit-2/lesson/template/2">template2</a>
    <br><a href="/unit-2/lesson/template/3">template3</a>
    <br>
    <h5>Problems</h5>
    <a href="/unit-2/problem/rot13">rot13</a>
    <br><a href="/unit-2/problem/signup">signup</a>
  </body>
</html>`;

let router = express.Router();

router.get('/', (req, res) => {
  res.send(body);
});

let lesson = express.Router();
lesson.use('/form', require('./lesson/form'));
lesson.use('/get', require('./lesson/get'));
lesson.use('/query', require('./lesson/query'));
lesson.use('/post', require('./lesson/post'));
lesson.use('/password', require('./lesson/password'));
lesson.use('/checkbox', require('./lesson/checkbox'));
lesson.use('/radio', require('./lesson/radio'));
lesson.use('/label', require('./lesson/label'));
lesson.use('/select', require('./lesson/select'));
lesson.use('/birthday', require('./lesson/birthday'));
lesson.use('/template', require('./lesson/template'));

let problem = express.Router();
problem.use('/rot13', require('./problem/rot13'));
problem.use(require('./problem/signup'));

router.use('/lesson', lesson);
router.use('/problem', problem);

module.exports = router;
