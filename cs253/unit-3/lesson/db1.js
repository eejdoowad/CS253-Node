'use strict';
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('db1.db');

db.serialize(function () {
  db.run('CREATE TABLE IF NOT EXISTS lorem (info TEXT)');

  let stmt = db.prepare('INSERT INTO lorem VALUES (?)');
  for (let i = 0; i < 10; i++) {
    stmt.run('Ipsum ' + i);
  }
  stmt.finalize();

  db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
    if (err) console.log(err);
    console.log(row.id + ': ' + row.info);
  });
});

db.close();
