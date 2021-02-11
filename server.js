const path = require('path');
const pages = require('./views/pages.js');
const {
  client,
  getMembers,
  getMember,
  getDiscography,
  getAlbum,
} = require('./db/client.js');

const express = require('express');
const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next) => {
  try {
    res.send(pages.main(req.url));
  } catch (err) {
    next(err);
  }
});

app.get('/members', async (req, res, next) => {
  try {
    res.send(pages.members(await getMembers(), req.url));
  } catch (err) {
    next(err);
  }
});

app.get('/members/:id', async (req, res, next) => {
  try {
    const [instruments, info] = await getMember(req.params.id);
    res.send(pages.memberID(info.rows[0], instruments.rows, req.url));
  } catch (err) {
    next(err);
  }
});

app.get('/discography/', async (req, res, next) => {
  try {
    res.send(pages.discography(await getDiscography(), req.url));
  } catch (err) {
    next(err);
  }
});

app.get('/discography/:id', async (req, res, next) => {
  try {
    res.send(pages.discographyID(await getAlbum(req.params.id), req.url));
  } catch (err) {
    next(err);
  }
});

app.get('*', (req, res, next) => {
  res.send(pages.errorPage());
});

app.use((err, req, res, next) => {
  res.send(pages.errorPage());
});

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
