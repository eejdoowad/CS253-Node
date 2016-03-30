'use strict';
let sqlite3 = require('sqlite3').verbose();

class UserDB {
  constructor () {
    this.db = new sqlite3.Database('./databases/user.db');
  }
  add (user, callback) {
    this.db.run(
      'INSERT INTO user' +
      '(username, email, createTime, hash)' +
      'VALUES (?, ?, CURRENT_TIMESTAMP, ?)',
      user.username,
      user.email,
      user.hash,
      (err) => {
        if (err) console.log(err);
        callback();
      }
    );
  }
  deleteById (id, callback) {
    this.db.run(
      'DELETE FROM user WHERE id = ?',
      id,
      (err) => {
        if (err) console.log(err);
        callback();
      }
    );
  }
  getById (id, callback) {
    this.db.get(
      'SELECT * FROM user WHERE id = ?',
      id,
      (err, row) => {
        if (err) console.log(err);
        callback(row);
      });
  }
  containsUsername (username, callback) {
    this.db.get(
      'SELECT EXISTS(SELECT 1 FROM user WHERE username = ? COLLATE NOCASE) AS "exists"',
      username,
      (err, row) => {
        if (err) console.log(err);
        callback(row.exists === 1 ? true : false);
      }
    );
  }
  getByUsername (username, callback) {
    this.db.get(
      'SELECT * FROM user WHERE username = ? COLLATE NOCASE',
      username,
      (err, row) => {
        if (err) console.log(err);
        callback(row);
      });
  }
  getAll (callback) {
    const query = 'SELECT * FROM user ORDER BY username ASC';
    this.db.all(query, (err, rows) => {
      if (err) console.log(err);
      callback(rows);
    });
  }
  getLastUserID (callback) {
    this.db.get('SELECT last_insert_rowid() AS last', (err, row) => {
      if (err) console.log(err);
      callback(row['last']);
    });
  }
}

let userDB = new UserDB();

module.exports = userDB;
