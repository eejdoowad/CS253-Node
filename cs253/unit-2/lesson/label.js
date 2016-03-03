'use strict';
let express = require('express');
let router = express.Router();

let body =
`<!doctype html>
<html>
  <head>
    <title>Label</title>
  </head>
  <body>
    Label
    <form>
      <label>
        one
        <input type="radio" name="r" value="one">
      </label>
      <label>
        two
        <input type="radio" name="r" value="two">
      </label>
      <label>
        three
        <input type="radio" name="r" value="three">
      </label>
      <br>
      <input type="submit">
    </form>
  </body>
</html>`;

router.get('/', (req, res) => {
  res.send(body);
});

module.exports = router;
