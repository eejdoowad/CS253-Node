'use strict';
let express = require('express');
let router = express.Router();

let body =
`<!doctype html>
<html>
  <head>
    <title>GET Query</title>
  </head>
  <body>
    Get query
    <form action="/unit-2/query/response">
      <input name="q">
      <input type="submit">
    </form>
  </body>
</html>`;

router.get('/', (req, res) => {
  res.send(body);
});

router.get('/response', (req, res) => {
  res.type('text/plain').send('You entered: ' + req.query.q);
});

module.exports = router;
