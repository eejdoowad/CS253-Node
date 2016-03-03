'use strict';
let express = require('express');
let router = express.Router();

// stupid format string function
// if string %key% is found, it is mapped to id
// if replacements = {"%key": id}
// if no mapping found, then blank out %key%
String.prototype.fs = function (replacements) {
  return (this.replace(/%\w+%/g, function (all) {
    return replacements[all] || '';
  }));
};

function escapeHTML (str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&quot;');
}

let body =
`<!doctype html>
<html>
  <head>
    <title>Birthday</title>
  </head>
  <body>
    Birthday
    <form method="POST">
      <label>
        Day
        <input type="text" name="day" value="%user_day%">
      </label>
      <span style="color: red">
        %day_error%
      </span>
      <br>
      <label>
        Month
        <input type="text" name="month" value="%user_month%">
      </label>
      <span style="color: red">
        %month_error%
      </span>
      <br>
      <label>
        Year
        <input type="text" name="year" value="%user_year%">
      </label>
      <div style="color: red">
        %year_error%
      </span>
      <br>
      <input type="submit">
    </form>
  </body>
</html>`;

let thanks_body =
`<html>
  <head>
    <title>Thank you!</title>
  </head>
  <body>
    A beautiful birthday indeed
  </body>
</html>`;

function validDay (day) {
  return day >= 1 && day <= 31;
};
function validMonth (month) {
  return [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ].indexOf(month) !== -1;
};
function validYear (year) {
  return year >= 1900 && year <= 2016;
};
function validDate (day, month, year) {
  return validDay(day) && validMonth(month) && validYear(year);
};

router.get('/', (req, res) => {
  res.send(body.fs({}));
});

router.get('/thanks', (req, res) => {
  res.send(thanks_body);
});

router.post('/', (req, res) => {
  let day = escapeHTML(req.body.day);
  let month = escapeHTML(req.body.month);
  let year = escapeHTML(req.body.year);
  if (validDate(day, month, year)) {
    res.redirect('birthday/thanks');
  } else {
    let day_error = '';
    let month_error = '';
    let year_error = '';
    if (!validDay(day)) {
      day_error = (day + ' is not a valid day');
    }
    if (!validMonth(month)) {
      month_error = (month + ' is not a valid month');
    }
    if (!validYear(year)) {
      year_error = (year + ' is not a valid year');
    }
    res.send(body.fs({
      "%day_error%": day_error,
      "%month_error%": month_error,
      "%year_error%": year_error,
      "%user_day%": day,
      "%user_month%": month,
      "%user_year%": year
    }));
  }
});

module.exports = router;
