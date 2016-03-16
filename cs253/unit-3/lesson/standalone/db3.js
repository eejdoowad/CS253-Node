'use strict';
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('links.sql');

db.serialize(function () {
  // returns the ID of the link that was
  // submitted by user 62443 and has > 1000 votes
  function query () {
    db.get('SELECT * FROM links WHERE submitter_id = 62443 AND votes > 1000', (err, row) => {
      // since you can't return the row, a callback must be used
      if (err) console.log('error: ' + err);
      console.log('Link ID: ' + row.id);
    });
  };
  query();
});

db.close();
