'use strict';
let router = require('express').Router();
let urllib = require('urllib');

function query (url, callback) {
  urllib.request(url, (err, data, res) => {
    if (err) console.log(err);
    callback(res);
  });
}
function prettyJSON(obj) {
  return JSON.stringify(obj, null, 4);
}
// function logHeaders(res) {
//   console.log(res.headers);
// }

router.route('/')
  .get((req, res) => {
    const url = 'http://www.example.org';
    query(url, (rsp) => {
      let out = {
        url: url,
        statusCode: rsp.statusCode,
        headers: rsp.headers
      };
      res.contentType('text/json').send(prettyJSON(out));
    });
  });

module.exports = router;
