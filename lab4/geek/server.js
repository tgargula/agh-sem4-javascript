const http = require('http');
const formidable = require('formidable');
const { index, students } = require('./script');
const { MongoClient } = require('mongodb');
const { collectionName, dboName, uri } = require('./dbprops');

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
const requestListener = (req, res) => {
  console.log('--------------------------------------');
  console.log('The relative URL of the current request: ' + req.url + '\n');

  const url = new URL(req.url, `http://${req.headers.host}`);

  switch (url.pathname) {
    case '/':
      index(req, res);
      break;
    case '/students':
      students(req, res);
      break;
    case '/notes':
      break;
    default:
      throw new ReferenceError('Path not supported!');
  }
  
  return;
  if (url.pathname == '/submit') {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      res.writeHead(200, { 'content-type': 'application/json' });
      console.log(fields);
      console.log(files);
      res.write();
      res.end();
    });

    console.log('Sending the response');
    res.end();
  }
};

MongoClient.connect(uri, (err, db) => {
  if (err) throw err;

  const dbo = db.db(dboName);

  // dbo.dropCollection(collectionName).then((deleted) => {
  //   if (deleted) console.log(`Collection '${collectionName}' successfully deleted!`);
  // });
  // dbo.createCollection(collectionName).then((created) => {
  //   if (created) console.log(`Collection '${collectionName}' successfully created!`);
  // });

  const server = http.createServer(requestListener);

  server.listen(8080);
  console.log('The server was started on port 8080');
  console.log("To shutdown the server, press 'CTRL + C'");
  db.close();
});
