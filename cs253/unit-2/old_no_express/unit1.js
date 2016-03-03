var home_content =
`<!doctype html>
<html>
  <head>
    <title>Pantale</title>
  </head>
  <body>
    And so the tale begins...
    <br><a href="/test">Form</a>
    <br><a href="/test2">Get Request</a>
    <br><a href="/test3">Get Query</a>
    <br><a href="/test4">Post</a>
    <br><a href="/test5">Password</a>
    <br><a href="/test6">Checkbox</a>
    <br><a href="/test7">Radio</a>
    <br><a href="/test8">Label</a>
    <br><a href="/test9">Select</a>
    <br><a href="/testA">Birthday</a>
    <br><a href="/404">404</a>
  </body>
</html>`;

var test_str =
`<!doctype html>
<html>
  <head>
    <title>Form</title>
  </head>
  <body>
    Google Search
    <form action="http://www.google.com/search">
      <input name="q">
      <input type="submit">
    </form>
  </body>
</html>`;

var test2_str =
`<!doctype html>
<html>
  <head>
    <title>GET Request</title>
  </head>
  <body>
    Get Header
    <form action="/echo_get">
      <input name="q">
      <input type="submit">
    </form>
  </body>
</html>`;

var test3_str =
`<!doctype html>
<html>
  <head>
    <title>GET Query</title>
  </head>
  <body>
    Get query
    <form action="/echo_query">
      <input name="q">
      <input type="submit">
    </form>
  </body>
</html>`;

var test4_str =
`<!doctype html>
<html>
  <head>
    <title>POST</title>
  </head>
  <body>
    Post
    <form method="post" action="/echo_post">
      <input name="q">
      <input type="submit">
    </form>
  </body>
</html>`;

var test5_str =
`<!doctype html>
<html>
  <head>
    <title>Password</title>
  </head>
  <body>
    Self submit
    <form>
      <input type="password" name="q">
      <input type="submit">
    </form>
  </body>
</html>`;

var test6_str =
`<!doctype html>
<html>
  <head>
    <title>Checkbox</title>
  </head>
  <body>
    Checkbox
    <form>
      <input type="checkbox" name="q">
      <input type="checkbox" name="r">
      <input type="checkbox" name="s">
      <br>
      <input type="submit">
    </form>
  </body>
</html>`;

var test7_str =
`<!doctype html>
<html>
  <head>
    <title>Radio</title>
  </head>
  <body>
    Radio
    <form>
      <input type="radio" name="q">
      <input type="radio" name="q">
      <input type="radio" name="q">
      <br>
      <input type="radio" name="r" value="one">
      <input type="radio" name="r" value="two">
      <input type="radio" name="r" value="three">
      <br>
      <input type="submit">
    </form>
  </body>
</html>`;

var test8_str =
`<!doctype html>
<html>
  <head>
    <title>Label</title>
  </head>
  <body>
    Label
    <form>
      <label>
        one
        <input type="radio" name="r" value="one">
      </label>
      <label>
        two
        <input type="radio" name="r" value="two">
      </label>
      <label>
        three
        <input type="radio" name="r" value="three">
      </label>
      <br>
      <input type="submit">
    </form>
  </body>
</html>`;

var test9_str =
`<!doctype html>
<html>
  <head>
    <title>Select</title>
  </head>
  <body>
    Select
    <form>
      <select name="q">
        <option>one</option>
        <option>two</option>
        <option>three</option>
      </select>
      <select name="fruit">
        <option value="apple">fuji</option>
        <option value="banana">cavendish</option>
        <option value="mango">carrie</option>
      </select>
      <br>
      <input type="submit">
    </form>
  </body>
</html>`;

var testA_str =
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

var http = require('http');
var url = require('url');
var qs = require('querystring');

String.prototype.fs = function (replacements) {
  return (this.replace(/%\w+%/g, function (all) {
    return replacements[all] || '';
  }));
};

function escapeHTML (str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&quot;');
}

var server = http.createServer(function (request, response) {
  if (request.method === 'GET') {
    if (request.url === '/') {
      console.log('root');
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(home_content);
    } else if (request.url === '/test') {
      console.log('test');
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(test_str);
    } else if (request.url === '/test2') {
      console.log('test2');
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(test2_str);
    } else if (request.url === '/test3') {
      console.log('test3');
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(test3_str);
    } else if (request.url === '/test4') {
      console.log('test4');
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(test4_str);
    } else if (request.url.startsWith('/test5')) {
      console.log('test5');
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(test5_str);
    } else if (request.url.startsWith('/test6')) {
      console.log('test6');
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(test6_str);
    } else if (request.url.startsWith('/test7')) {
      console.log('test7');
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(test7_str);
    } else if (request.url.startsWith('/test8')) {
      console.log('test8');
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(test8_str);
    } else if (request.url.startsWith('/test9')) {
      console.log('test9');
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(test9_str);
    } else if (request.url.startsWith('/testA')) {
      console.log('testA get');
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(testA_str.fs({'%error%': ''}));
    } else if (request.url.startsWith('/echo_get')) {
      console.log('echo get');
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.write(JSON.stringify(request.headers));
      response.end(JSON.stringify(url.parse(request.url, true).query));
    } else if (request.url.startsWith('/echo_query')) {
      console.log('echo query');
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end(JSON.stringify(url.parse(request.url, true).query));
    } else if (request.url.startsWith('/birthday_thanks')) {
      console.log('birthday thanks');
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end('A beautiful birthday and many tales to come!');
    } else {
      console.log('404');
      response.writeHead(404, {'Content-Type': 'text/html'});
      response.end('<title>404</title>...not all tales end well');
    }
  } else if (request.method === 'POST') {
    var body;
    if (request.url.startsWith('/echo_post')) {
      console.log('echo post');
      response.writeHead(200, {'Content-Type': 'text/html'});
      body = '';
      request.on('data', (data) => {
        body += data;
        if (body.length > 1e6) {
          console.log('Post data size exceeded');
          request.connection.destroy();
        }
      });
      request.on('end', () => {
        response.write(JSON.stringify(request.headers));
        console.log(qs.parse(body));
        response.end(JSON.stringify(qs.parse(body)));
      });
    } else if (request.url.startsWith('/testA')) {
      console.log('testA post');
      response.writeHead(200, {'Content-Type': 'text/html'});
      var validDay = function (day) {
        return day >= 1 && day <= 31;
      };
      var validMonth = function (month) {
        return [
          'January', 'February', 'March', 'April',
          'May', 'June', 'July', 'August',
          'September', 'October', 'November', 'December'
        ].indexOf(month) !== -1;
      };
      var validYear = function (year) {
        return year >= 1900 && year <= 2016;
      };
      var validDate = function (day, month, year) {
        return validDay(day) && validMonth(month) && validYear(year);
      };
      body = '';
      request.on('data', (data) => {
        body += data;
        if (body.length > 1e6) {
          console.log('Post data size exceeded');
          request.connection.destroy();
        }
      });
      request.on('end', () => {
        var bd = qs.parse(body);
        var day = escapeHTML(bd['day']);
        var month = escapeHTML(bd['month']);
        var year = escapeHTML(bd['year']);
        if (validDate(day, month, year)) {
          response.end('<html><body>Click <a href="/birthday_thanks">here</a> if you are not automatically redirected</body><script type="text/javascript">window.location.href="/birthday_thanks";</script></html>');
        } else {
          var day_error = '';
          var month_error = '';
          var year_error = '';
          if (!validDay(day)) {
            day_error = (day + ' is not a valid day');
          }
          if (!validMonth(month)) {
            month_error = (month + ' is not a valid month');
          }
          if (!validYear(year)) {
            year_error = (year + ' is not a valid year');
          }
          response.end(testA_str.fs({
            "%day_error%": day_error,
            "%month_error%": month_error,
            "%year_error%": year_error,
            "%user_day%": day,
            "%user_month%": month,
            "%user_year%": year
          }));
        }
      });
    } else {
      console.log('404');
      response.writeHead(404, {'Content-Type': 'text/html'});
      response.end('<title>404</title>...not all tales end well');
    }
  }
});

server.listen(8000);

console.log('Server running at http://127.0.0.1:8000/');
