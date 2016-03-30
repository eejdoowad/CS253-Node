'use strict';
let router = require('express').Router();
let http = require('http');

function prettyJSON (obj) {
  return JSON.stringify(obj, null, 4);
}

const geoDataAPI = 'http://ip-api.com/json/';
const geoImgAPI = 'https://maps.googleapis.com/maps/api/staticmap?';

function getImgURL (lat, lon) {
  return geoImgAPI + 'center=' + lat.toString() + ',' + lon.toString() +
  '&zoom=13&size=470x470&maptype=roadmap&key=' + ;
}

router.route('/')
  .get((req, res) => {
    const ip = '162.243.84.190';
    const target = geoDataAPI + ip;
    http.get(target, (rsp) => {
      rsp.on('data', (data) => {
        const geodata = JSON.parse(data.toString());
        res.render('unit-5/geolocation', {
          geodata: prettyJSON(geodata),
          geoimg: getImgURL(geodata.lat, geodata.lon)
        });
        // res.send(prettyJSON(geodata));
        // res.contentType('text/json').send(data.toString());
      });
    }).on('error', () => {
      res.contentType('text/plain').send('Failed to fetch location data');
    });
  });

module.exports = router;
