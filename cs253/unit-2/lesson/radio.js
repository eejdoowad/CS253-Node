'use strict';
let express = require('express');
let router = express.Router();

let body =
`<!doctype html>
<html>
  <head>
    <title>Radio</title>
  </head>
  <body>
    Radio
    <form>
      <input type="radio" name="q">
      <input type="radio" name="q">
      <input type="radio" name="q">
      <br>
      <input type="radio" name="r" value="one">
      <input type="radio" name="r" value="two">
      <input type="radio" name="r" value="three">
      <br>
      <input type="submit">
    </form>
  </body>
</html>`;

router.get('/', (req, res) => {
  res.send(body);
});

module.exports = router;
