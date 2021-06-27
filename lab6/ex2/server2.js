const html = 'index.html';
const fs = require('fs');

const onRequest_8080 = (_req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.readFile(html, 'utf8', (err, html) => {
    if (err) throw err;
    res.end(html);
  });
}

const onRequest_8081 = (_req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Response from 8081\n');
  response.end();
}

const http = require('http');

http.createServer(onRequest_8080).listen(8080);
http.createServer(onRequest_8081).listen(8081);
console.log('The server was started on port 8080 and 8081');
console.log("To stop the server, press 'CTRL + C'");
