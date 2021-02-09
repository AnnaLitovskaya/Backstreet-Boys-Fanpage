const pg = require('pg');
const express = require('express');
const path = require('path');
const html = require('./views/pages.js');

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next) => {
  res.send(html.main(req.url));
});

app.get('/members', async (req, res, next) => {
  try {
    const response = await client.query(`SELECT * FROM members;`);
    const members = response.rows;
    res.send(html.members(members, req.url));
  } catch (err) {
    next(err);
  }
});

app.get('/members/:id', async (req, res, next) => {
  try {
    const promises = [
      client.query(
        `SELECT instrument FROM instruments
      JOIN members ON instruments.memberid = members.id
      WHERE members.id=$1;`,
        [req.params.id]
      ),
      client.query(
        `SELECT *, CAST(info.bday AS VARCHAR(10)), discography.id AS album FROM members
      JOIN info ON members.id = info.memberid
      JOIN discography ON info.favealbumid = discography.id
      WHERE members.id=$1;`,
        [req.params.id]
      ),
    ];
    const responses = await Promise.all(promises);
    const instruments = responses[0].rows;
    const info = responses[1].rows[0];
    res.send(html.memberID(info, instruments, req.url));
  } catch (err) {
    next(err);
  }
});

app.get('/discography/', async (req, res, next) => {
  try {
    const response = await client.query(`SELECT * FROM discography`);
    const discography = response.rows;
    res.send(html.discography(discography, req.url));
  } catch (err) {
    next(err);
  }
});

app.get('/discography/:id', async (req, res, next) => {
  try {
    const response = await client.query(
      `SELECT * FROM discography
    WHERE id=$1;`,
      [req.params.id]
    );
    const album = response.rows[0];
    res.send(html.discographyID(album, req.url));
  } catch (err) {
    next(err);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('listening on port'));

const client = new pg.Client('postgres://localhost/backstreet_boys');

const setUp = async () => {
  try {
    await client.connect();
    console.log('connected');
  } catch (err) {
    console.log(err);
  }
};

setUp();
