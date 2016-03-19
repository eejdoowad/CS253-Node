'use strict';

const options = {
  path: '/unit-4/lesson/no_cheating',
  maxAge: 1800000,
  signed: true
};

let router = require('express').Router();
router.route('/')
  .get((req, res) => {
    let visits = parseInt(req.signedCookies.visits || '0') + 1;
    res.cookie('visits', visits, options);
    res.render('unit-4/prize', {
      visits: visits
    });
  })
  .post((req, res) => {
    res.cookie('visits', '0', options);
    res.redirect('/unit-4/lesson/no_cheating');
  });

module.exports = router;
