'use strict';
let sqlite3 = require('sqlite3').verbose();
const dbname = 'ascii.db';
let db = new sqlite3.Database('./databases/' + dbname);
const art = require('./default_ascii_art');

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
        '(id INTEGER PRIMARY KEY, name TEXT, art TEXT, url TEXT, time TEXT)',
        (err) => {
          if (err) console.log(err);
        });
      // insert default entries
      addEntry(art.bat);
      addEntry(art.hi);
      addEntry(art.poo);
    } else {
      console.log(dbname + ' already exists');
    }
  });
}

function addEntry (entry) {
  db.run(
    'INSERT INTO ascii (name, art, time) VALUES (?, ?, CURRENT_TIMESTAMP)',
    entry.name,
    entry.art,
    (err) => {
      if (err) console.log(err);
    });
}
