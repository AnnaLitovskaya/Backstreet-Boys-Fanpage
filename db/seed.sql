DROP TABLE IF EXISTS info;
DROP TABLE IF EXISTS instruments;
DROP TABLE IF EXISTS discography;
DROP TABLE IF EXISTS members;

CREATE TABLE members(
  id INTEGER PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE discography(
  id INTEGER PRIMARY KEY,
  title  VARCHAR(100),
  year INTEGER,
  cover VARCHAR(100)
);

CREATE TABLE info(
  id INTEGER PRIMARY KEY,
  memberid INTEGER REFERENCES members(id),
  bio  VARCHAR(2000),
  bday  DATE,
  favealbumid INTEGER REFERENCES discography(id),
  image VARCHAR(100)
);

CREATE TABLE instruments(
  id SERIAL PRIMARY KEY,
  instrument VARCHAR(100),
  memberid INTEGER REFERENCES members(id)
);

INSERT INTO members(id, name) VALUES(1, 'Nick Carter');
INSERT INTO members(id, name) VALUES(2, 'Howie Dorough');
INSERT INTO members(id, name) VALUES(3, 'Brian Littrell');
INSERT INTO members(id, name) VALUES(4, 'AJ McLean');
INSERT INTO members(id, name) VALUES(5, 'Kevin Richardson');

INSERT INTO discography(id, title, year, cover) VALUES(1, 'Backstreet Boys', 1996, 'backstreet_boys_cover.jpg');
INSERT INTO discography(id, title, year, cover) VALUES(2, 'Backstreets Back', 1997, 'backstreets_back_cover.jpg');
INSERT INTO discography(id, title, year, cover) VALUES(3, 'Millenium', 1999, 'millenium_cover.jpg');
INSERT INTO discography(id, title, year, cover) VALUES(4, 'Black and Blue', 2000, 'black_and_blue_cover.png');
INSERT INTO discography(id, title, year, cover) VALUES(5, 'Never Gone', 2005, 'never_gone_cover.jpg');
INSERT INTO discography(id, title, year, cover) VALUES(6, 'Unbreakable', 2007, 'unbreakable_cover.jpg');
INSERT INTO discography(id, title, year, cover) VALUES(7, 'This Is Us', 2009, 'this_is_us_cover.jpg');
INSERT INTO discography(id, title, year, cover) VALUES(8, 'In a World Like This', 2013, 'in_a_world_like_this_cover.png');
INSERT INTO discography(id, title, year, cover) VALUES(9, 'DNA', 2019, 'dna_cover.png');

INSERT INTO instruments(instrument, memberid) VALUES('Vocals', 1);
INSERT INTO instruments(instrument, memberid) VALUES('Vocals', 2);
INSERT INTO instruments(instrument, memberid) VALUES('Vocals', 3);
INSERT INTO instruments(instrument, memberid) VALUES('Vocals', 4);
INSERT INTO instruments(instrument, memberid) VALUES('Vocals', 5);
INSERT INTO instruments(instrument, memberid) VALUES('Guitar', 1);
INSERT INTO instruments(instrument, memberid) VALUES('Guitar', 2);
INSERT INTO instruments(instrument, memberid) VALUES('Guitar', 3);
INSERT INTO instruments(instrument, memberid) VALUES('Guitar', 4);
INSERT INTO instruments(instrument, memberid) VALUES('Drums', 1);
INSERT INTO instruments(instrument, memberid) VALUES('Drums', 4);
INSERT INTO instruments(instrument, memberid) VALUES('Bass Guitar', 2);
INSERT INTO instruments(instrument, memberid) VALUES('Bass Guitar', 4);
INSERT INTO instruments(instrument, memberid) VALUES('Piano', 4);
INSERT INTO instruments(instrument, memberid) VALUES('Piano', 5);
INSERT INTO instruments(instrument, memberid) VALUES('Saxophone', 4);
INSERT INTO instruments(instrument, memberid) VALUES('Violin', 4);
INSERT INTO instruments(instrument, memberid) VALUES('Keyboards', 5);

INSERT INTO info(id, memberid, bio, bday, favealbumid, image) VALUES(
  1, 1, 'Cаrtеr wаѕ bоrn оn thе 28th оf Јаnuаrу 1980 іn Јаmеѕtоwn, Nеw Yоrk оn, tо hіѕ mоthеr Јаnе Еlіzаbеth Ѕсhnесk аnd fаthеr, Rоbеrt Gеnе Саrtеr.  Ѕіnсе сhіldhооd, hе wаѕ іntеrеѕtеd іn thе wоrld оf muѕіс. Тhuѕ mоthеr іdеntіfуіng thіѕ tооk hіm tо vоісе lеѕѕоnѕ аѕ wеll аѕ dаnсе lеѕѕоnѕ whіlе hе wаѕ vеrу уоung. Іn hіѕ саrееr, Саrtеr ѕtаrtеd wіth арреаrеd іn dіffеrеnt соmmеrсіаlѕ wіth thе іnсluѕіоn оf thе Flоrіdа Ѕtаtе Lоttеrу аnd Тhе Моnеу Ѕtоrе. Саrtеr dоеѕ nоt mаkе muѕіс оnlу; hе іѕ аlѕо аn асtоr wіth оvеr 45 сrеdіtѕ. Аddіtіоnаllу, Саtеr fеаturеѕ nіnе сrеdіtѕ fоr hіѕ ѕоundtrасkѕ аѕ wеll аѕ thrее сrеdіtѕ fоr bеіng а рrоduсеr аnd twо сrеdіtѕ fоr bеіng а соmроѕеr.', '1980-01-28', 5, 'Nick_Carter.jpg'
);
INSERT INTO info(id, memberid, bio, bday, favealbumid, image) VALUES(
  2, 2, 'Howard Dwaine Dorough, also known as Howie D, is an American singer. He was a member of the boy band Backstreet Boys. As one of the five singers of the Backstreet Boys, Dorough is notable for his high falsetto. As a Backstreet Boy, he has sold over 130 million albums. On August 16, 2007, Dorough announced his engagement to long-time girlfriend, Leigh Boniello. He asked her to marry him on New Years Day of that year. The two were married on December 8, 2007. They have one son, James, born in 2009.', '1973-08-22', 3, 'Howie_Dorough.jpg'
);
INSERT INTO info(id, memberid, bio, bday, favealbumid, image) VALUES(
  3, 3, 'Brian Thomas Littrell (born February 20, 1975) is an American singer. He is best known as a member of the Backstreet Boys. He is also a contemporary Christian recording artist, and released a solo album, Welcome Home (You), in 2006. In the summer of 2005, Littrell solo single In Christ Alone went to #1 on the Christian Charts on July 4th. Littrell was the winner of the 2006 GMA Music Award for Inspirational Recorded Song of the Year, In Christ Alone, which won both the 1993 award in this category (when recorded by Michael English) and the 1994 Song of the Year at the GMA Music Awards. Brians first solo album, Welcome Home (You) was released on May 2, 2006. As with the Backstreet Boys albums, is a Sony BMG release.Littrell and his wife Leighanne Littrell have one son together, Baylee Thomas Wylee Littrell, who was born in November 26, 2002.', '1975-02-20', 8, 'Brian_Littrell.jpg'
);
INSERT INTO info(id, memberid, bio, bday, favealbumid, image) VALUES(
  4, 4, 'Alexander James McLean is an American musician and member of the singing group Backstreet Boys.In December 2003, McLean and his mother appeared on the Oprah Winfrey Show to talk about his recovery from clinical depression, alcoholism, and drug use. In 2008, McLean performed two solo shows at the Anaheim House of Blues and The Roxy in Los Angeles. The show consisted of his solo material and a solo version of the Backstreet Boys hit, Incomplete.', '1978-01-09', 2, 'AJ_McLean.jpg'
);
INSERT INTO info(id, memberid, bio, bday, favealbumid, image) VALUES(
  5, 5, 'Kevin Scott Richardson (born October 3, 1971) is an American singer. He is a member of the Backstreet Boys. In 2002, he played the role of Billy Flynn in the Broadway production of Chicago. He also performed this role in Londons West End and in Toronto from November 2006 – December 2006. In June 2006, Richardson left the Backstreet Boys. He wanted to move on with the next chapter of [his] life. In the next chapter of his life he spent the summer drawing fodder beet. He also drew home a few loads of turf in a little car trailer to have for the winter. Kevin and wife Kristin (née Willits) had a son named Mason on July 3, 2007. In April 2012, Richardson officially rejoined the group.', '1971-10-03', 6, 'Kevin_Richardson.jpg'
);
