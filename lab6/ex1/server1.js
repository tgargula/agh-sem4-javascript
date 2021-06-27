var http = require('http');
var fs = require('fs');
const file = 'form.html';
const { parse } = require('querystring');

http
  .createServer((request, response) => {
    console.log('--------------------------------------');
    console.log(`The relative URL of the current request: ${request.url}\n`);

    var url = new URL(request.url, `http://${request.headers.host}`);

    switch (url.pathname) {
      // if relative URL is '/' then send, to a browser,
      // the contents of a file (an HTML document) - its name contains the 'file' variable
      case '/':
        fs.stat(file, function (err, stats) {
          if (err == null) {
            // If the file exists
            fs.readFile(file, function (err, data) {
              // Read it content
              response.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8',
              });
              response.write(data); // Send the content to the web browser
              response.end();
            });
          } else {
            // If the file does not exists
            response.writeHead(200, {
              'Content-Type': 'text/plain; charset=utf-8',
            });
            response.write(`The '${file}'file does not exist`);
            response.end();
          }
        });
        break;

      // Process the form content if relative URL is '/submit'
      case '/submit':
        if (request.method === 'POST') {
          const FORM_URLENCODED = 'application/x-www-form-urlencoded';
          if (request.headers['content-type'] === FORM_URLENCODED) {
            let body = '';
            request.on('data', (chunk) => {
              body += chunk.toString();
            });
            request.on('end', () => {
              const result = parse(body);
              response.end(result ? `Witaj ${result.imie}` : 'Hello world');
            });
          }
        } else {
          const name = url.searchParams.get('imie');
          const welcome = name ? `Witaj ${name}` : 'Hello world';
          response.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8',
          });
          response.write(welcome);
          response.end();
          console.log(`The server sent the ${welcome} text to the browser`);
        }
        break;
    }
  })
  .listen(8080);

console.log('The server was started on port 8080');
console.log("To stop the server, press 'CTRL + C'");
