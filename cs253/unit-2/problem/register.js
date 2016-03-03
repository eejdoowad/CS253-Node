'use strict';
let express = require('express');
let router = express.Router();

let body =
`<!doctype html>
<html>
  <head>
    <title>register</title>
  </head>
  <body>
    To do
    <form action="/unit-2/get/response">
      <input name="q">
      <input type="submit">
    </form>
  </body>
</html>`;

router.get('/', (req, res) => {
  res.send(body);
});

router.get('/response', (req, res) => {
  let headers = JSON.stringify(req.headers);
  let queries = JSON.stringify(req.query);
  res.type('text/plain');
  res.send(headers + queries);
});

module.exports = router;
