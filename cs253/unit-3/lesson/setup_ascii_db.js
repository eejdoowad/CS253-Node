'use strict';
let sqlite3 = require('sqlite3').verbose();
let path = require('path');
let db = new sqlite3.Database(path.join(__dirname, 'ascii.db'));
const art = require('./art');

// Check if links table exists.
// If it doesn't, create links table and add data

db.serialize(() => {
  db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='ascii'", (err, row) => {
    if (err) {
      console.log(err);
    } else {
      setupDB(row);
    }
    db.close();
  });
});

function setupDB (row) {
  db.serialize(() => {
    // check if database exists
    if (row === undefined) {
      // Create database
      db.run(
        'CREATE TABLE IF NOT EXISTS ascii' +
        '(name text, art text, time text)',
        (err) => {
          if (err) console.log(err);
        });
      // insert default entries
      addEntry(art.bat);
      addEntry(art.hi);
      addEntry(art.poo);
    } else {
      console.log('ascii.sql already exists');
    }
  });
}

function addEntry (entry) {
  db.run(
    'INSERT INTO ascii VALUES (?, ?, CURRENT_TIMESTAMP)',
    entry.name,
    entry.art,
    (err) => {
      if (err) console.log(err);
    });
}
