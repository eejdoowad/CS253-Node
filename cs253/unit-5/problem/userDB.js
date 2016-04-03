'use strict';
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.cached.Database('./databases/blog5.db');

class UserDB {
  static add (user, callback) {
    db.get(
      `INSERT INTO user
        (username, email, createTime, hash)
        VALUES (?, ?, CURRENT_TIMESTAMP, ?);
      SELECT FROM user *
        WHERE user.id = last_insert_rowid();`,
      user.username,
      user.email,
      user.hash,
      (err, user) => {
        if (err) console.log(err);
        callback(user);
      }
    );
  }
  static deleteById (id, callback) {
    db.run(
      'DELETE FROM user WHERE id = ?',
      id,
      (err) => {
        if (err) console.log(err);
        callback();
      }
    );
  }
  static getById (id, callback) {
    db.get(
      'SELECT * FROM user WHERE id = ?',
      id,
      (err, row) => {
        if (err) console.log(err);
        callback(row);
      });
  }
  static containsUsername (username, callback) {
    db.get(
      'SELECT EXISTS(SELECT 1 FROM user WHERE username = ? COLLATE NOCASE) AS "exists"',
      username,
      (err, row) => {
        if (err) console.log(err);
        callback(row.exists === 1 ? true : false);
      }
    );
  }
  static getByUsername (username, callback) {
    db.get(
      'SELECT * FROM user WHERE username = ? COLLATE NOCASE',
      username,
      (err, row) => {
        if (err) console.log(err);
        callback(row);
      });
  }
  static getAll (callback) {
    const query = 'SELECT * FROM user ORDER BY username ASC';
    db.all(query, (err, rows) => {
      if (err) console.log(err);
      callback(rows);
    });
  }
  static getLastUserID (callback) {
    db.get('SELECT last_insert_rowid() AS last', (err, row) => {
      if (err) console.log(err);
      callback(row['last']);
    });
  }
}

module.exports = UserDB;
