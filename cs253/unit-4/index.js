'use strict';
let express = require('express');

let body =
`<!doctype html>
<html>
  <head>
    <title>Unit 4</title>
  </head>
  <body>
    <h3>Unit 4</h3>
    <h5>Lesson</h5>
    <a href="/unit-4/lesson/visit">visit</a>
    <br><a href="/unit-4/lesson/prize">prize</a>
    <br><a href="/unit-4/lesson/smart_cheating">smart_cheating</a>
    <br><a href="/unit-4/lesson/no_cheating">no_cheating</a>
    <h5>Problems</h5>
    <a href="/unit-4/problem/blog">blog</a>
  </body>
</html>`;

let router = express.Router();

router.get('/', (req, res) => {
  res.send(body);
});

let lesson = express.Router();
lesson.use('/visit', require('./lesson/visit'));
lesson.use('/prize', require('./lesson/prize'));
lesson.use('/smart_cheating', require('./lesson/smart_cheating'));
lesson.use('/no_cheating', require('./lesson/no_cheating'));

let problem = express.Router();
// problem.use('/blog', require('./problem/blog'));
// problem.use('/blog2', require('./problem/blog2'));

router.use('/lesson', lesson);
router.use('/problem', problem);

module.exports = router;
