const pg = require('pg');
const express = require('express');
const path = require('path');

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next) => {
  res.send(`
    <html>
      <head>
        <link rel='stylesheet' href='/assets/page1.css' />
      </head>
      <body>
        <h1>Backstreet Boys Fan Club</h1>
        <img src="/assets/backstreet_boys_main.jpg" alt="Backstreet Boys Main Page">
        <h2><a href="/members">Members</a></h2>
        <h2><a href="/discography">Discography</a></h2>
      </body>
    </html>
  `);
});

app.get('/members', async (req, res, next) => {
  try {
    const response = await client.query(`SELECT * FROM members;`);
    const members = response.rows;
    res.send(`
      <html>
        <head>
          <link rel='stylesheet' href='/assets/page2.css' />
        </head>
        <body>
          <h1><a href="/">Backstreet Boys Fan Club</a></h1>
          <h2>Members</h2>
          <ul>
            ${members
              .map(
                (member) => `
                <li>
                  <a href='/members/${member.id}'>
                  ${member.name}
                  </a>
                </li>
              `
              )
              .join('')}
          </ul>
        </body>
      </html>
    `);
  } catch (err) {
    next(err);
  }
});

app.get('/discography', async (req, res, next) => {
  try {
    const response = await client.query(`SELECT * FROM discography;`);
    const discography = response.rows;
    res.send(`
      <html>
        <head>
          <link rel='stylesheet' href='/assets/page2.css' />
        </head>
        <body>
          <h1><a href="/">Backstreet Boys Fan Club</a></h1>
          <h2>Discography</h2>
          <ul>
            ${discography
              .map(
                (album) => `
                <li>
                  <a href='/members/${album.id}'>
                  ${album.title}</a> : ${album.year}
                </li>
              `
              )
              .join('')}
          </ul>
        </body>
      </html>
    `);
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
