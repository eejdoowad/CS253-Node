'use strict';
let router = require('express').Router();
let http = require('http');
let process = require('process');
let mapsAPIKey = require(process.cwd() + '/secrets.json').mapsAPIKey;

function prettyJSON (obj) {
  return JSON.stringify(obj, null, 4);
}

const geoDataAPI = 'http://ip-api.com/json/';
const geoImgAPI = 'https://maps.googleapis.com/maps/api/staticmap?';

function getImgURL (lat, lon) {
  return geoImgAPI + 'center=' + lat.toString() + ',' + lon.toString() +
  '&zoom=13&size=470x470&maptype=roadmap&key=' + mapsAPIKey;
}

function answerRequest (ip, res) {
  const target = geoDataAPI + ip;
  http.get(target, (rsp) => {
    rsp.on('data', (data) => {
      const geodata = JSON.parse(data.toString());
      if (geodata.status !== 'success') {
        res.redirect('/unit-5/lesson/geolocation');
      } else {
        res.render('unit-5/geolocation', {
          geodata: prettyJSON(geodata),
          geoimg: mapsAPIKey ? getImgURL(geodata.lat, geodata.lon) : '/images/missingMapsAPIKey.jpg'
        });
      }
    });
  }).on('error', () => {
    res.contentType('text/plain').send('Failed to fetch location data');
  });
}

router.route('/q')
  .get((req, res) => {
    res.redirect('/unit-5/lesson/geolocation/' + req.query.ip);
  });
router.route('/')
  .get((req, res) => {
    let ip = req.connection.remoteAddress;
    ip = (ip === '127.0.0.1' || ip === 'localhost' || ip === '::1')
      ? '162.243.84.190'
      : ip;
    answerRequest(ip, res);
  });
router.route('/:ip')
  .get((req, res) => {
    const ip = req.params.ip;
    answerRequest(ip, res);
  });

module.exports = router;
