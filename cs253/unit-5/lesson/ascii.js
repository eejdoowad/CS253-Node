'use strict';
let sqlite3 = require('sqlite3').verbose();
let express = require('express');
let router = express.Router();
let db = new sqlite3.Database('./databases/ascii.db');
let http = require('http');
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
function getImgURLFromIP(ip, callback) {
  http.get(geoDataAPI + ip, (rsp) => {
    rsp.on('data', (data) => {
      const geodata = JSON.parse(data.toString());
      if (geodata.status !== 'success') {
        callback(new Error('Selected IP is not valid for geodata (e.g. localhost)'));
      } else if (!mapsAPIKey) {
        callback(new Error('Invalid Maps API Key'));
      } else {
        callback(null, getImgURL(geodata.lat, geodata.lon));
      }
    });
  }).on('error', () => {
    callback(new Error('Failed to connect to ' + geoDataAPI + ip));
  });
}

function validName (name) {
  return /^[a-zA-Z0-9 _-]{1,20}$/.test(name);
}
function validArt (art) {
  return art !== '';
}

router.post('/', (req, res) => {
  const deleteID = req.body.deleteID;
  if (deleteID !== undefined) {
    deleteEntryThenRender(deleteID, res);
  } else {
    const name = req.body.name;
    const art = req.body.art;
    const isValidName = validName(name);
    const isValidArt = validArt(art);
    if (isValidName && isValidArt) {
      addEntryThenRender(req, res, {
        name: name,
        art: art
      });
    } else {
      const nameError = isValidName
        ? ''
        : 'Invalid Name';
      const artError = isValidArt
        ? ''
        : 'You must enter something!';
      renderContent(res, name, art, nameError, artError);
    }
  }
});

router.get('/', (req, res) => {
  renderContent(res);
});

function addEntryThenRender (req, res, entry) {
  getImgURLFromIP(req.connection.remoteAddress, (err, url) => {
    let urlt = (err ? '/images/error.jpg' : url);
    db.run(
    'INSERT INTO ascii VALUES (NULL, ?, ?, ?, CURRENT_TIMESTAMP)',
    entry.name,
    entry.art,
    urlt,
    (err) => {
      if (err) console.log(err);
      res.redirect('/unit-5/lesson/ascii');
    });
  });
}

function deleteEntryThenRender (deleteID, res) {
  db.run(
    'DELETE FROM ascii WHERE id = ?',
    deleteID,
    (err) => {
      if (err) console.log(err);
      res.redirect('/unit-5/lesson/ascii');
    });
}

function renderContent (res, name, art, nameError, artError) {
  const query = 'SELECT * FROM ascii ORDER BY time DESC';
  db.all(query, (err, rows) => {
    if (err) console.log(err);
    res.render('unit-5/ascii', {
      title: 'ascii',
      name: name,
      art: art,
      entries: rows,
      nameError: nameError,
      artError: artError
    });
  });
};

module.exports = router;
