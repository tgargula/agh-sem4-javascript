// Application using the 'Pug' template system
const { MongoClient, Double } = require('mongodb');
const uri = 'mongodb://localhost:27017/';
const express = require('express');
const logger = require('morgan');
const { calculated, getOp, eval } = require('./script');
const app = express();
const x = 5;
const y = 2;

// Configuring the application
app.set('views', __dirname + '/views');
app.set('view engine', 'pug'); // Use the 'Pug' template system

// Determining the contents of the middleware stack
app.use(logger('dev'));

MongoClient.connect(uri, (err, db) => {
  const dbo = db.db('operations');
  dbo.dropCollection('operations2');
  dbo.createCollection('operations2');
  const collection = dbo.collection('operations2');
  
  app.get('/', (req, res) => {
    res.render('operation', { pretty: true, x: x, y: y, result: x + y, op: '+' });
  });
  
  app.get('/json/:name', (req, res) => {
    const json = require(`./json/${req.params.name}`);
    module.exports.test.json2 = json;
    res.render('table', { pretty: true, json: calculated(json) });
  });
  
  app.get('/calculate/:operation/:x/:y', (req, res) => {
    const { x, y, operation } = req.params;
    const op = getOp(operation);
    res.render('operation', {
      pretty: true,
      x: Number(x),
      y: Number(y),
      op: op,
      result: eval(op, Number(x), Number(y)),
    });
    collection.insertOne({x: Number(x), y:Number(y), op: op});
  });

  app.get('/results', (req, res) => {
    collection
      .find()
      .toArray()
      .then((items) => {
        for (const item of items) {
          const {op, x, y} = item;
          item.result = eval(op, x, y);
          item.operation = item.op;
        }
        res.render('table', {json: items});
      });
  });
  
  app.listen(3001, () => {
    console.log('The application is available on port 3001');
  });
});


module.exports.test = { x2: x, y2: y };
