'use strict';
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('links.db');
const links = require('./links');

// Check if links table exists.
// If it doesn't, create links table and add data
db.serialize(() => {
  db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='links'", (err, row) => {
    if (err) console.log('error: ' + err);
    setupDB(row);
    db.close();
  });
});

function setupDB (row) {
  db.serialize(() => {
    // check if database exists
    if (row === undefined) {
      // Create database
      db.run(
        'CREATE TABLE IF NOT EXISTS links' +
        '(id integer, submitter_id integer, submitted_time integer, ' +
        'votes integer, title text, url text)',
        (err) => {
          if (err) console.log('db.run() err: ' + err);
        });
      // Insert data
      links.forEach((entry) => {
        db.run(
          'INSERT INTO links VALUES (?, ?, ?, ?, ?, ?)',
          entry,
          (err) => {
            if (err) console.log('db.run() err: ' + err);
          });
      });
    } else {
      console.log('links.sql already exists');
    }
  });
}
