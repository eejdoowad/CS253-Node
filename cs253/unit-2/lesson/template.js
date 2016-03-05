'use strict';
let express = require('express');
let router = express.Router();

function User (name, email) {
  this.name = name;
  this.email = email;
}
var users = [
  new User('tj', 'tj@vision-media.ca'),
  new User('ciaran', 'ciaranj@gmail.com'),
  new User('aaron', 'aaron.heckmann+github@gmail.com')
];

router.get('/1', (req, res) => {
  res.render('unit-2/template/1', {title: 'Users', users: users});
});

router.get('/2', (req, res) => {
  res.render('unit-2/template/2', {
    title: 'n = 1?',
    n: (req.query.n || '').toString()
  });
});

router.get('/3', (req, res) => {
  // a query parameter can either be undefined, a string,
  // or an array of strings, so normalize it to
  // a (possibly empty) array of strings
  let foods =
    (req.query.food
    ? Array.isArray(req.query.food)
      ? req.query.food
      : [req.query.food]
    : []).filter((str) => { return str !== ''; });
  res.render('unit-2/template/3', {
    title: 'Add a food',
    foods: foods});
});

router.get('/4', (req, res) => {
  // Really starting to hate javascript here
  // so many different checks required =(
  let n = parseInt(req.query.n || '0');
  n = Number.isInteger(n)
    ? n
    : 0;
  let squares =
    Array.apply(null,
      Array(parseInt(n))).map(function (_, i) {
        i = i + 1;
        return i * i;
      });
  res.render('unit-2/template/4', {
    title: 'Squares!',
    squares: squares
  });
});

router.get('/5', (req, res) => {
  // Really starting to hate javascript here
  // so many different checks required =(
  let n = parseInt(req.query.n || '0');
  n = Number.isInteger(n)
    ? n
    : 0;
  let fizzbuzz =
    Array.apply(null,
      Array(parseInt(n))).map((_, i) => {
        return i + 1;
      }).map((n) => {
        let div3 = n % 3 === 0;
        let div5 = n % 5 === 0;
        return (!div3 && !div5)
          ? n
          : (div3 ? 'Fizz' : '') + (div5 ? 'Buzz' : '');
      });
  res.render('unit-2/template/5', {
    title: 'FizzBuzz',
    fizzbuzz: fizzbuzz
  });
});

module.exports = router;
