const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/';
const express = require('express');
const logger = require('morgan');
const { getHtmlResponse, getOp, eval } = require('./script');
const app = express();
const x = 1;
const y = 2;

MongoClient.connect(uri, (err, db) => {
  if (err) throw err;
  const dbo = db.db('operations');
  dbo.dropCollection('operations1').catch((reason) => console.log(reason));
  dbo.createCollection('operations1');
  const collection = dbo.collection('operations1');

  // Determining the contents of the middleware stack
  app.use(logger('dev'));

  app.get('/', (_req, res) => {
    res.send(`<h1>${x} + ${y} = ${x + y}</h1>`);
  });

  app.get('/json/:name', (req, res) => {
    const json = require(`./json/${req.params.name}`);
    module.exports.test.json1 = json;
    res.send(getHtmlResponse(json));
  });

  app.get('/calculate/:operation/:x/:y', (req, res) => {
    const { operation, x, y } = req.params;
    const op = getOp(operation);
    res.send(`<h1>${x} ${op} ${y} = ${eval(op, Number(x), Number(y))}</h1>`);
    const doc = { operation: op, x: Number(x), y: Number(y) };
    collection.insertOne(doc, (err, _res) => {
      if (err) throw err;
    });
  });

  app.get('/results', (_req, res) => {
    collection
      .find()
      .toArray()
      .then((items) => {
        res.send(getHtmlResponse(items));
      });
  });

  app.listen(3000, () => {
    console.log('The application is available on port 3000');
  });
});

module.exports.test = { x1: x, y1: y };
