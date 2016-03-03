'use strict';
let express = require('express');
let router = express.Router();

let body =
`<!doctype html>
<html>
  <head>
    <title>Password</title>
  </head>
  <body>
    Self submit
    <form>
      <input type="password" name="q">
      <input type="submit">
    </form>
  </body>
</html>`;

router.get('/', (req, res) => {
  res.send(body);
});

module.exports = router;
