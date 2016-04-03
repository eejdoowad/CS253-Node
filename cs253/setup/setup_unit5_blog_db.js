'use strict';
let sqlite3 = require('sqlite3').verbose();
const dbname = 'blog5.db';
let db = new sqlite3.Database('./databases/' + dbname);
let default_users = require('./default_users');
let default_posts = require('./default_blog_posts');

function checkUserTableExists () {
  db.get(
    `SELECT name
    FROM sqlite_master
    WHERE type='table'
    AND name='user'`,
    (err, table) => {
      if (err) {
        console.log(err);
      } else {
        if (table === undefined) {
          setupUserTable();
        } else {
          console.log('user table already exists');
        }
      }
    });
}

function setupUserTable () {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY,
        username TEXT COLLATE NOCASE,
        email TEXT, createTime TEXT,
        hash TEXT
      )`,
      (err) => {
        db.serialize(() => {
          if (err) {
            console.log(err);
          } else {
            addUser(default_users.user1);
            addUser(default_users.user2);
            addUser(default_users.user3);
          }
          checkPostTableExists();
        });
      });
  });
}

function addUser (user) {
  db.run(
    `INSERT INTO user (username, email, createTime, hash)
    VALUES (?, ?, CURRENT_TIMESTAMP, ?)`,
    user.username,
    user.email,
    user.hash,
    (err) => {
      if (err) console.log(err);
    });
}

function checkPostTableExists () {
  db.get(
    `SELECT name
    FROM sqlite_master
    WHERE type='table'
    AND name='post'`,
    (err, table) => {
      if (err) {
        console.log(err);
      } else {
        if (table === undefined) {
          setupPostTable();
        } else {
          console.log('post table already exists');
        }
      }
    });
}

function setupPostTable () {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS post(
        id INTEGER PRIMARY KEY,
        title TEXT,
        author INTEGER,
        time TEXT,
        content TEXT,
        FOREIGN KEY(author) REFERENCES user(id)
      )`,
      (err) => {
        db.serialize(() => {
          if (err) {
            console.log(err);
          } else {
            addPost(default_posts.post1);
            addPost(default_posts.post2);
            addPost(default_posts.post3);
          }
          console.log('blog5.db set up');
        });
      });
  });
}
    
function addPost (entry) {
  db.run(
    `INSERT INTO post (title, content, author, time)
    VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
    entry.title,
    entry.content,
    entry.author,
    (err) => {
      if (err) console.log(err);
    });
}

checkUserTableExists();