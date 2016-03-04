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
  res.render('unit-2/template/1', {title: 'Add a Food', users: users});
});

router.get('/2', (req, res) => {
  res.render('unit-2/template/2', {title: 'n = 1?', name: 'boberto'});
});

module.exports = router;
