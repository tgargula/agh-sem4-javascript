const html = 'index.html';
const fs = require('fs');
const http = require('http');
const { circleParams, rectangleParams, triangleParams } = require('./script');
const figureParams = (id, x, y) => {
  const dict = {
    Trójkąt: triangleParams(x, y),
    Prostokąt: rectangleParams(x, y),
    Okrąg: circleParams(x, y),
  };
  return dict[id];
};
let figures = [];

const server = (req, res) => {
  const url = new URL('http://localhost:8080' + req.url);
  const x = url.searchParams.get('x');
  const y = url.searchParams.get('y');
  const id = url.searchParams.get('id');
  if (req.method === 'GET' && id === null) {
    /* GET page */
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile(html, 'utf8', (err, html) => {
      if (err) throw err;
      res.end(html);
    });
  } else if (req.method === 'GET') {
    /* GET figures */
    const params = figureParams(id, x, y);
    params.id = id;
    figures.push(params);

    const document = JSON.stringify(figures);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(document);
  } else if (req.method === 'DELETE') {
    /* DELETE figure of the given type */
    figures = figures.filter((figure) => figure.id !== id);
    const document = JSON.stringify(figures);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(document);
  }
};

http.createServer(server).listen(8080);
console.log('The server was started on port 8080');
console.log("To stop the server, press 'CTRL + C'");
