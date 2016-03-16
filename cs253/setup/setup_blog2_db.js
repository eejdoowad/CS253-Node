'use strict';
let sqlite3 = require('sqlite3').verbose();
const dbname = 'blog2.db';
let db = new sqlite3.Database('./databases/' + dbname);
let default_blog_posts = require('./default_blog_posts');

// Check if links table exists.
// If it doesn't, create links table and add data

db.serialize(() => {
  db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='blog'", (err, row) => {
    if (err) {
      console.log(err);
    } else {
      setupDB(row);
    }
    // db.close();
  });
});

function setupDB (row) {
  db.serialize(() => {
    // check if database exists
    if (row === undefined) {
      // Create database
      db.run(
        'CREATE TABLE IF NOT EXISTS blog' +
        '(id INTEGER PRIMARY KEY, title TEXT, time TEXT, content TEXT)',
        (err) => {
          if (err) console.log(err);
        });
      // insert default entries
      addEntry(default_blog_posts.post1);
      addEntry(default_blog_posts.post2);
      addEntry(default_blog_posts.post3);
    } else {
      console.log(dbname + ' already exists');
    }
  });
}

function addEntry (entry) {
  db.run(
    'INSERT INTO blog (title, content, time) VALUES (?, ?, CURRENT_TIMESTAMP)',
    entry.title,
    entry.content,
    (err) => {
      if (err) console.log(err);
    });
}
