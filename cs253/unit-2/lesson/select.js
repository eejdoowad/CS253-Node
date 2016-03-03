'use strict';
let express = require('express');
let router = express.Router();

let body =
`<!doctype html>
<html>
  <head>
    <title>Select</title>
  </head>
  <body>
    Select
    <form>
      <select name="q">
        <option>one</option>
        <option>two</option>
        <option>three</option>
      </select>
      <select name="fruit">
        <option value="apple">fuji</option>
        <option value="banana">cavendish</option>
        <option value="mango">carrie</option>
      </select>
      <br>
      <input type="submit">
    </form>
  </body>
</html>`;

router.get('/', (req, res) => {
  res.send(body);
});

module.exports = router;
