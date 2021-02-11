const pg = require('pg');
const path = require('path');
const html = require('./views/pages.js');

const express = require('express');
const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next) => {
  res.send(html.main(req.url));
});

app.get('/members', async (req, res, next) => {
  try {
    const { rows } = await client.query(`SELECT * FROM members;`);
    res.send(html.members(rows, req.url));
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
    const [instruments, info] = await Promise.all(promises);
    res.send(html.memberID(info.rows[0], instruments.rows, req.url));
  } catch (err) {
    next(err);
  }
});

app.get('/discography/', async (req, res, next) => {
  try {
    const { rows } = await client.query(`SELECT * FROM discography`);
    res.send(html.discography(rows, req.url));
  } catch (err) {
    next(err);
  }
});

app.get('/discography/:id', async (req, res, next) => {
  try {
    const { rows } = await client.query(
      `SELECT * FROM discography
    WHERE id=$1;`,
      [req.params.id]
    );
    res.send(html.discographyID(rows[0], req.url));
  } catch (err) {
    next(err);
  }
});

const client = new pg.Client('postgres://localhost/backstreet_boys');

const setUp = async () => {
  try {
    await client.connect();
    console.log('client connected');
  } catch (err) {
    console.log(err);
  }
};

setUp();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
