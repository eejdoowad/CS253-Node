'use strict';
let crypto = require('crypto');
let fs = require('fs');

const cookieSecret = crypto.randomBytes(16).toString('hex');
console.log('generated cookieSecret: ' + cookieSecret);
let secrets = {
  cookieSecret: cookieSecret
};


fs.writeFileSync(
  './secrets.json',
  JSON.stringify(secrets),
  'utf8');


