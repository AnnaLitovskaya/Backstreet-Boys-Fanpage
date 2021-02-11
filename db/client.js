const pg = require('pg');
const client = new pg.Client('postgres://localhost/backstreet_boys');

async function getMembers() {
  return (await client.query(`SELECT * FROM members;`)).rows;
}

async function getMember(id) {
  const promises = [
    client.query(
      `SELECT instrument FROM instruments
    JOIN members ON instruments.memberid = members.id
    WHERE members.id=$1;`,
      [id]
    ),
    client.query(
      `SELECT *, CAST(info.bday AS VARCHAR(10)), discography.id AS album FROM members
    JOIN info ON members.id = info.memberid
    JOIN discography ON info.favealbumid = discography.id
    WHERE members.id=$1;`,
      [id]
    ),
  ];
  return await Promise.all(promises);
}

async function getDiscography() {
  return (await client.query(`SELECT * FROM discography;`)).rows;
}

async function getAlbum(id) {
  return (await client.query(`SELECT * FROM discography WHERE id=$1;`, [id]))
    .rows[0];
}

module.exports = {
  client,
  getMembers,
  getMember,
  getDiscography,
  getAlbum,
};
