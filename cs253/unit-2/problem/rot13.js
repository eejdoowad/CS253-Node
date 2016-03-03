'use strict';
var express = require('express');

String.prototype.fs = function (replacements) {
  return (this.replace(/%\w+%/g, (all) => {
    return replacements[all] || "";
  }));
};

function escapeHTML (str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function rot13_char (char) {
  var rot13 = {
    "a": "n",
    "b": "o",
    "c": "p",
    "d": "q",
    "e": "r",
    "f": "s",
    "g": "t",
    "h": "u",
    "i": "v",
    "j": "w",
    "k": "x",
    "l": "y",
    "m": "z",
    "n": "a",
    "o": "b",
    "p": "c",
    "q": "d",
    "r": "e",
    "s": "f",
    "t": "g",
    "u": "h",
    "v": "i",
    "w": "j",
    "x": "k",
    "y": "l",
    "z": "m"
  };
  var char_lower = char.toLowerCase();
  if (rot13.hasOwnProperty(char_lower)) {
    var new_char = rot13[char_lower];
    if (!rot13.hasOwnProperty(char)) {
      new_char = new_char.toUpperCase();
    }
    return new_char;
  }
  return char;
};

function rot13_str (str) {
  var new_str = '';
  for (var i = 0; i < str.length; i++) {
    new_str += rot13_char(str.charAt(i));
  }
  return new_str;
}

var body =
`<!doctype html>
<html>
  <head>
    <title>rot13</title>
  </head>
  <body>
    rot13
    <br>
    <form method="post">
      <textarea name="q">%input%</textarea>
      <br>
      <input type="submit">
    </form>
  </body>
</html>`;

let router = express.Router();

router.get('/', (req, res) => {
  res.send(body.fs({}));
});

router.post('/', (req, res) => {
  let text = req.body.q;
  text = rot13_str(text);
  res.end(body.fs({"%input%": text}));
});

module.exports = router;
