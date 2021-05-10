// Application using the 'Pug' template system
const express = require('express');
const logger = require('morgan');
const { calculated } = require('./script');
const app = express();
const x = 5;
const y = 2;

// Configuring the application
app.set('views', __dirname + '/views');
app.set('view engine', 'pug'); // Use the 'Pug' template system

// Determining the contents of the middleware stack
app.use(logger('dev'));

app.get('/', (req, res) => {
  res.render('operation', { pretty: true, x: x, y: y });
});

app.get('/json/:name', (req, res) => {
  const json = require(`./json/${req.params.name}`);
  res.render('table', {pretty: true, json: calculated(json)})
});

app.listen(3001, () => {
  console.log('The application is available on port 3001');
});

module.exports.test = {x2: x, y2: y};