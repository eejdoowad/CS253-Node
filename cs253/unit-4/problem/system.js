'use strict';
let router = require('express').Router();

let User = require('./user');
let userDB = require('./userDB');

const options = {
  path: '/unit-4/problem/system',
  maxAge: 1800000,
  signed: true
};

const delOptions = {
  path: '/unit-4/problem/system'
};

router.use('/', (req, res, next) => {
  req.c = {
    loggedIn: req.signedCookies.username ? true : false,
    username: req.signedCookies.username || ''
  };
  next();
});

router.route('/')
  .get((req, res) => {
    res.render('unit-4/user/welcome', {
      title: 'hello',
      show: req.c
    });
  });
router.route('/register')
  .get((req, res) => {
    res.render('unit-4/user/register', {
      title: 'register',
      show: req.c,
      validUsername: true,
      validPassword: true,
      passwordsMatch: true,
      validEmail: true,
      usernameAvailable: true
    });
  })
  .post((req, res) => {
    if (req.c.loggedIn) {
      res.redirect('/unit-4/problem/system');
    } else {
      let newUser = new User(req.body.username,
        req.body.password, req.body.email);
      if (newUser.valid && req.body.password === req.body.password2) {
        User.userNameAvailable(newUser.username, (available) => {
          if (available) {
            userDB.add(newUser, () => {
              res.cookie('username', newUser.username, options);
              res.redirect('/unit-4/problem/system');
            });
          } else {
            res.render('unit-4/user/register', {
              title: 'register',
              show: req.c,
              username: req.body.username,
              password: req.body.password,
              password2: req.body.password2,
              email: req.body.email,
              validUsername: newUser.validUsername,
              validPassword: newUser.validPassword,
              passwordsMatch: req.body.password === req.body.password2,
              validEmail: newUser.validEmail,
              usernameAvailable: false
            });
          }
        });
      } else {
        res.render('unit-4/user/register', {
          title: 'register',
          show: req.c,
          username: req.body.username,
          password: req.body.password,
          password2: req.body.password2,
          email: req.body.email,
          validUsername: newUser.validUsername,
          validPassword: newUser.validPassword,
          passwordsMatch: req.body.password === req.body.password2,
          validEmail: newUser.validEmail,
          usernameAvailable: true
        });
      }
    }
  });
router.route('/login')
  .get((req, res) => {
    res.render('unit-4/user/login', {
      title: 'login',
      show: req.c
    });
  })
  .post((req, res) => {
    if (req.c.loggedIn) {
      res.redirect('/unit-4/problem/system');
    } else {
      const username = req.body.username;
      const password = req.body.password;
      User.validate(username, password, (valid) => {
        if (valid) {
          res.cookie('username', username, options);
          res.redirect('/unit-4/problem/system');
        } else {
          res.render('unit-4/user/login', {
            title: 'login',
            show: req.c,
            loginFailed: true,
            username: username,
            password: password
          });
        }
      });
    }
  });
router.route('/logout')
  .post((req, res) => {
    res.clearCookie('username', delOptions);
    res.redirect('/unit-4/problem/system');
  });
router.route('/users')
  .get((req, res) => {
    userDB.getAll((users) => {
      res.render('unit-4/user/users', {
        title: 'users',
        users: users,
        show: req.c
      });
    });
  });

module.exports = router;
