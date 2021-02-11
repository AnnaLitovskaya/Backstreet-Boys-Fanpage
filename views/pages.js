const html = require('html-template-tag');

function styles() {
  return html`
    <head>
      <link rel="stylesheet" href="../assets/styles.css" />
    </head>
  `;
}

function header() {
  return html`
    <div id="header">
      <h1>
        <a href="/"> Backstreet Boys Fan Club </a>
      </h1>
      <div>
        <h2>
          <a href="/members">Members </a>
        </h2>
        <h2>
          <a href="/discography">Discography </a>
        </h2>
      </div>
    </div>
  `;
}

function main() {
  return html`
    <html>
      $${styles()}
      <body>
        $${header()}
        <img
          src="/assets/photos/backstreet_boys_main.jpg"
          alt="Backstreet Boys Main Page"
        />
      </body>
    </html>
  `;
}

function members(members) {
  return html`
    <html>
      $${styles()}
      <body>
        $${header()}
        <div>
          <ul>
            $${members
              .map(
                (member) => html`
                  <li>
                    <a href="/members/${member.id}"> ${member.name} </a>
                  </li>
                `
              )
              .join('')}
          </ul>
          <img src="/assets/photos/members_page.jpg" alt="Members Page" />
        </div>
      </body>
    </html>
  `;
}

function memberID(info, instruments) {
  return html`
    <html>
      $${styles()}
      <body>
        $${header()}
        <div>
          <h2>${info.name}</h2>
          <img src="/assets/photos/${info.image}" alt="Members Image" />
          <ul>
            <li>Birthday : ${info.bday}</li>
            <li>
              Favorite Album :
              <a href="/discography/${info.album}"> ${info.title}</a>
            </li>
            <li>
              Instruments :
              ${instruments
                .map((instrument) => instrument.instrument)
                .join(', ')}
            </li>
            <li>${info.bio}</li>
          </ul>
        </div>
      </body>
    </html>
  `;
}

function discography(discography) {
  return html`
    <html>
      $${styles()}
      <body>
        $${header()}
        <div>
          <ul>
            $${discography
              .map(
                (album) => html`
                  <li>
                    <a href="/discography/${album.id}"> ${album.title}</a>
                  </li>
                `
              )
              .join('')}
          </ul>
          <img
            src="/assets/photos/discography_page.jpg"
            alt="Discography Page"
          />
        </div>
      </body>
    </html>
  `;
}

function discographyID(album) {
  return html`
    <html>
      $${styles()}
      <body>
        $${header()}
        <div>
          <h2>${album.title}</h2>
          <img src="/assets/photos/${album.cover}" alt="Album Image" />
          <h3>Release Year : ${album.year}</h3>
        </div>
      </body>
    </html>
  `;
}

function errorPage() {
  return html`
    <html>
      $${styles()}
      <body>
        $${header()}
        <div>
          <h2>Page Not Found</h2>
          <h4>Quit Playing Games With My Heart!</h4>
          <img id="pnf" src="/assets/photos/404.jpg" alt="404" />
        </div>
      </body>
    </html>
  `;
}

module.exports = {
  main,
  members,
  memberID,
  discography,
  discographyID,
  header,
  styles,
  errorPage,
};
