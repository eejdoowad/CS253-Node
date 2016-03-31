'use strict';
const crypto = require('crypto');

function getHash (str) {
  const hash = crypto.createHash('sha256');
  hash.update(str);
  return hash.digest('hex');
}
function signedCookie (str) {
  return str + '|' + getHash(str);
}
function parseSignedCookie (str) {
  const arr = /(.*)\|(.*)/.exec(str);
  return arr && arr.length === 3
    ? getHash(arr[1]) === arr[2]
      ? arr
      : undefined
    : undefined;
}

const options = {
  path: '/unit-4/lesson/smart_cheating',
  maxAge: 1800000
};

let router = require('express').Router();
router.route('/')
  .get((req, res) => {
    const visitsCookie = req.cookies.visits;
    let parsedCookie = parseSignedCookie(visitsCookie);
    let visits = (parsedCookie
      ? parseInt(parsedCookie[1]) + 1
      : 1)
      .toString();
    res.cookie('visits', signedCookie(visits), options);
    res.render('unit-4/prize', {
      visits: visits
    });
  })
  .post((req, res) => {
    res.cookie('visits', signedCookie('0'), options);
    res.redirect('/unit-4/lesson/smart_cheating');
  });

module.exports = router;
