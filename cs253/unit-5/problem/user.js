'use strict';
let bcrypt = require('bcrypt');
let db = require('./userDB');

class User {
  constructor (username, password, email) {
    this.username = username;
    this.password = password;
    this.email = email;
    if (this.valid) {
      this.hash = bcrypt.hashSync(password, bcrypt.genSaltSync());
    }
  }
  static validate (username, password, callback) {
    db.getByUsername(username, (user) => {
      const valid = user
        ? bcrypt.compareSync(password, user.hash)
        : false;
      callback(valid, user);
    });
  }
  get validUsername () {
    return /^[a-zA-Z0-9_-]{3,20}$/.test(this.username);
  }
  static userNameAvailable (username, callback) {
    db.containsUsername(username, (exists) => {
      callback(!exists);
    });
  }
  get validPassword () {
    return /^.{3,20}$/.test(this.password);
  }
  get validEmail () {
    return this.email === null || this.email === '' ||
      /^[\S]+@[\S]+\.[\S]+$/.test(this.email);
  }
  get valid () {
    return this.validUsername &&
      this.validPassword &&
      this.validEmail;
  }
}

module.exports = User;
