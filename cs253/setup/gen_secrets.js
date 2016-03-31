'use strict';
let crypto = require('crypto');
let fs = require('fs');
// let prompt = require('prompt-sync');

const secFile = './secrets.json';


// function booleanAnswer (msg) {
//   let answer = '';
//   while (answer !== 'y' || answer !== 'yes' || answer !== 'n' || answer !== 'no') {
//     answer = prompt(msg + ' (y/n): ').toLowerCase();
//   }
//   return (answer === 'y' || answer === 'yes');
// }

const cookieSecret = crypto.randomBytes(16).toString('hex');
console.log('generated cookieSecret: ' + cookieSecret);

let secrets = {
  cookieSecret: cookieSecret,
  mapsAPIKey: ''
};

fs.writeFileSync(
  secFile,
  JSON.stringify(secrets, null, 4),
  'utf8');
