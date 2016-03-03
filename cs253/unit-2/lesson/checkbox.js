'use strict';
let express = require('express');
let router = express.Router();

let body =
`<!doctype html>
<html>
  <head>
    <title>Checkbox</title>
  </head>
  <body>
    Checkbox
    <form>
      <input type="checkbox" name="q">
      <input type="checkbox" name="r">
      <input type="checkbox" name="s">
      <br>
      <input type="submit">
    </form>
  </body>
</html>`;

router.get('/', (req, res) => {
  res.send(body);
});

module.exports = router;
