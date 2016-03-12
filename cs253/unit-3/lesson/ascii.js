'use strict';
let sqlite3 = require('sqlite3').verbose();
let express = require('express');
let router = express.Router();
let db = new sqlite3.Database('ascii.db');


router.get('/', (req, res) => {
  // Really starting to hate javascript here
  // so many different checks required =(
  let n = parseInt(req.query.n || '0');
  n = Number.isInteger(n)
    ? n
    : 0;
  let squares =
    Array.apply(null,
      Array(parseInt(n))).map(function (_, i) {
        i = i + 1;
        return i * i;
      });
  res.render('unit-2/template/4', {
    title: 'Squares!',
    squares: squares
  });
});


function query () {
  const query = 'SELECT * FROM ascii ORDER BY time DESC';
  db.all(query, (err, rows) => {
    if (err) console.log(err);
    rows.forEach((row) => {
      console.log(row.name + ' on ' + row.time + ' submitted:\n' + row.art);
    });
  });
};

// db.serialize(function () {
//   query();
// });

module.exports = router;
