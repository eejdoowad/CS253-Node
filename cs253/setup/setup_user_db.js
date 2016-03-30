'use strict';
let sqlite3 = require('sqlite3').verbose();
const dbname = 'user.db';
let db = new sqlite3.Database('./databases/' + dbname);
let default_users = require('./default_users');

// Check if links table exists.
// If it doesn't, create links table and add data

db.serialize(() => {
  db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='user'", (err, table) => {
    if (err) {
      console.log(err);
    } else {
      setupDB(table);
    }
    // db.close();
  });
});

function setupDB (table) {
  db.serialize(() => {
    // check if database exists
    if (table === undefined) {
      // Create database
      db.run(
        'CREATE TABLE IF NOT EXISTS user' +
        '(id INTEGER PRIMARY KEY, username TEXT COLLATE NOCASE, ' +
        'email TEXT, createTime TEXT, ' +
        'hash TEXT)',
        (err) => {
          if (err) console.log(err);
        });
      // insert default entries
      addEntry(default_users.user1);
      addEntry(default_users.user2);
      addEntry(default_users.user3);
    } else {
      console.log(dbname + ' already exists');
    }
  });
}

function addEntry (entry) {
  db.run(
    'INSERT INTO user' +
    '(username, email, createTime, hash)' +
    'VALUES (?, ?, CURRENT_TIMESTAMP, ?)',
    entry.username,
    entry.email,
    entry.hash,
    (err) => {
      if (err) console.log(err);
    });
}
