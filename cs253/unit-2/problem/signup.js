'use strict';
let express = require('express');
let router = express.Router();

let body =
`<!doctype html>
<html>
  <head>
    <title>signup</title>
  </head>
  <body>
    <h3>Signup</h3>
    <form method='POST' action=''>
      <label>
        Username
        <input type='text' name='username' value='%username%'>
      </label>
      <span style='color: red'>
        %username_error%
      </span>
      <br>
      <label>
        Password
        <input type='password' name='password1'>
      </label>
      <span style='color: red'>
        %password_error%
      </span>
      <br>
      <label>
        Verify Password
        <input type='password' name='password2'>
      </label>
      <span style='color: red'>
        %passwordmatch_error%
      </span>
      <br>
      <label>
        Email (optional)
        <input type='text' name='email' value='%email%'>
      </label>
      <span style='color: red'>
        %email_error%
      </span>
      <br>
      <input type='submit'>
    </form>
  </body>
</html>`;

let body_thanks =
`<!doctype html>
<html>
  <head>
    <title>signup</title>
  </head>
  <body>
    <h3>Thank you, %name%</h3>
  </body>
</html>`;

String.prototype.fs = function (replacements) {
  return (this.replace(/%\w+%/g, (all) => {
    return replacements[all] || '';
  }));
};

function escapeHTML (str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&quot;');
}

function validUserName(username) {
  return /^[a-zA-Z0-9_-]{3,20}$/.test(username);
}

function validPassword(password) {
  return /^.{3,20}$/.test(password);
}

function validEmail(email) {
  return /^[\S]+@[\S]+\.[\S]+$/.test(email);
}

router.get('/signup', (req, res) => {
  res.send(body.fs({}));
});

router.post('/signup', (req, res) => {
  let username = escapeHTML(req.body.username);
  let password1 = escapeHTML(req.body.password1);
  let password2 = escapeHTML(req.body.password2);
  let email = escapeHTML(req.body.email);
  
  let valid_username = validUserName(username);
  let valid_password = validPassword(password1);
  let passwords_match = password1 === password2;
  let valid_email = validEmail(email) || email === '';

  if (valid_username && valid_password &&
  passwords_match && valid_email) {
    res.redirect('welcome' + '?' + 'name=' + username);
  } else {
    let username_error =
      valid_username
      ? ''
      : 'Invalid Username';
    let password_error =
      valid_password
      ? ''
      : 'Invalid password';
    let passwordmatch_error =
      passwords_match
      ? ''
      : 'Passwords don\'t match';
    let email_error =
      valid_email
      ? ''
      : 'Invalid email';

    res.send(body.fs({
      "%username%": username,
      "%email%": email,
      "%username_error%": username_error,
      "%password_error%": password_error,
      "%passwordmatch_error%": passwordmatch_error,
      "%email_error%": email_error
    }));
  }
});

router.get('/welcome', (req, res) => {
  res.send(body_thanks.fs({"%name%": escapeHTML(req.query.name)}));
});

module.exports = router;
