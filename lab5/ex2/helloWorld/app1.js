const express = require('express');
const logger = require('morgan');
const {getHtmlResponse} = require('./script');
const app = express();
const x = 1;
const y = 2;

// Determining the contents of the middleware stack
app.use(logger('dev'));

app.get('/', (req, res) => {
  res.send(`<h1>${x} + ${y} = ${x + y}</h1>`);
});

app.get('/json/:name', (req, res) => {
  const json = require(`./json/${req.params.name}`);
  module.exports.test.json1 = json;
  res.send(getHtmlResponse(json));
});

app.listen(3000, () => {
  console.log('The application is available on port 3000');
});

module.exports.test = {x1: x, y1: y};
