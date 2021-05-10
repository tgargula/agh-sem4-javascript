// const script = require('./script');
const {parse} = require('./script');
/**
 * Handles incoming requests.
 *
 * @param {IncomingMessage} request - Input stream — contains data received from the browser, e.g. encoded contents of HTML form fields.
 * @param {ServerResponse} response - Output stream — put in it data that you want to send back to the browser.
 * The answer sent by this stream must consist of two parts: the header and the body.
 * <ul>
 *  <li>The header contains, among others, information about the type (MIME) of data contained in the body.
 *	<li>The body contains the correct data, e.g. a form definition.
 * </ul>
 */
function requestListener(request, response) {
  console.log('--------------------------------------');
  console.log('The relative URL of the current request: ' + request.url + '\n');
  var url = new URL(request.url, `http://${request.headers.host}`); // Create the URL object
  if (url.pathname == '/submit') {
    const textfield = url.searchParams.get('textfield');

    console.log('Creating a response body');
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    console.log('Sending the response');
    response.write(parse(textfield));
    response.end();
  } else {
    console.log('Creating a response header');
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    console.log('Creating a response body');
    response.write(`<form method="GET" action="/submit">
                                  <label for="textfield">Enter command sequence</label>
                                  <input name="textfield">
                                  <br>
                                  <input type="submit">
                                  <input type="reset">
                              </form>`);
    console.log('Sending the response');
    response.end();
  }
}

/* ************************************************** */
/* Main block
/* ************************************************** */
var http = require('http');

var server = http.createServer(requestListener); // The 'requestListener' function is defined above
server.listen(8080);
console.log('The server was started on port 8080');
console.log("To end the server, press 'CTRL + C'");
