'use strict';
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.cached.Database('./databases/blog5.db');

class Blog {
  static addPost (post, callback) {
    db.run(
      'INSERT INTO post (title, content, author, time) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
      post.title,
      post.content,
      post.author,
      (err) => {
        if (err) console.log(err);
        callback();
      }
    );
  }
  static deletePost (id, callback) {
    db.run(
      'DELETE FROM post WHERE id = ?',
      id,
      (err) => {
        if (err) console.log(err);
        callback();
      }
    );
  }
  static getPost (id, callback) {
    const query = 'SELECT * FROM post JOIN user ON post.author = user.id WHERE post.id = ?';
    db.get(query, id, (err, row) => {
      if (err) console.log(err);
      callback(row);
    });
  }
  static getAllPosts (callback) {
    const query = 'SELECT * FROM post JOIN user ON post.author = user.id ORDER BY time DESC';
    db.all(query, (err, rows) => {
      if (err) console.log(err);
      callback(rows);
    });
  }
  static getLastPostID (callback) {
    db.get('SELECT last_insert_rowid()', (err, row) => {
      if (err) console.log(err);
      callback(row['last_insert_rowid()']);
    });
  }
}

module.exports = Blog;
