'use strict';
let sqlite3 = require('sqlite3').verbose();
let express = require('express');
let router = express.Router();
let path = require('path');
let db = new sqlite3.Database(path.join(__dirname, 'ascii.db'));


// router.get('/', (req, res) => {
//   res.render('unit-3/ascii', {
//     title: 'ascii',
//     entries: ['asdf', 'aasdf', 'vdass']
//   });
//   query();
// });

router.get('/', (req, res) => {
  query1(res);
});


function query1 (res) {
  const query = 'SELECT * FROM ascii ORDER BY time DESC';
  db.all(query, (err, rows) => {
    if (err) console.log(err);
    res.render('unit-3/ascii', {
      title: 'ascii',
      entries: rows
    });
  });
};


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
