'use strict';
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('links.sql');

db.serialize(function () {
  // returns # of votes for link with id = 2
  function query () {
    db.get('SELECT * FROM links WHERE id = 2', (err, row) => {
      // since you can't return the row, a callback must be used
      if (err) console.log('error: ' + err);
      console.log('votes: ' + row.votes);
    });
  };
  query();
});

db.close();
