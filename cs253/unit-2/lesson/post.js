'use strict';
let express = require('express');
let router = express.Router();

let body =
`<!doctype html>
<html>
  <head>
    <title>POST</title>
  </head>
  <body>
    Post
    <form method="post">
      <input name="q">
      <input type="submit">
    </form>
  </body>
</html>`;

function escapeHTML (str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&quot;');
}

router.get('/', (req, res) => {
  res.send(body);
});

router.post('/', (req, res) => {
  res.send('You entered: ' + escapeHTML(req.body.q));
});

module.exports = router;
