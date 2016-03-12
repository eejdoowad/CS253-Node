'use strict';
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('links.sql');

// return a list of the IDs of the links  that were submitted
// by user 62443 sorted by submission time ascending
function query1 () {
  const query = 'SELECT * FROM links WHERE submitter_id = 62443 ORDER BY submitted_time';
  console.log('Query 1: ' + query);
  db.all(query, (err, rows) => {
    if (err) console.log(err);
    rows.forEach((row) => {
      console.log('Query 1: ID: ' + row.id);
    });
  });
};

// Retrive only id attribute and explicitly sets ordering to ascending
function query2 () {
  const query = 'SELECT id FROM links WHERE submitter_id = 62443 ORDER BY submitted_time ASC';
  console.log('Query 2: ' + query);
  db.all(query, (err, rows) => {
    if (err) console.log(err);
    rows.forEach((row) => {
      console.log('Query 2: ID: ' + row.id);
    });
  });
};

db.serialize(function () {
  query1();
  query2();
});

db.close();
