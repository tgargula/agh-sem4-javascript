const express = require('express');
const logger = require('morgan');
const formidable = require('formidable');
const { MongoClient } = require('mongodb');
const { getDateSpan } = require('./script');
const uri = 'mongodb://localhost:27017/';
const dboName = 'currencies';

const app = express();
const port = 3000;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.use(logger('dev'));

MongoClient.connect(uri, { useUnifiedTopology: true }, (err, db) => {
  if (err) throw err;

  const dbo = db.db(dboName);
  const collection = dbo.collection('currencies');

  app.get('/', (req, res) => {
    res.render('form');
  });

  app.post('/docinfo', (req, res) => {
    const form = formidable();

    form.parse(req, (err, fields, files) => {
      if (err) throw err;

      collection.insertOne(fields).then(() => {
        collection
          .find()
          .toArray()
          .then((array) => {
            res.render('docinfo', { records: array.length });
          });
      });
    });
  });

  app.get('/exchangeRate/:startdate/:enddate/*', (req, res) => {
    const { startdate, enddate } = req.params;
    const currenciesString = req.params['0'];
    const currencies = currenciesString
      .split('/')
      .filter((str, _i, _arr) => str !== '');
    const dateSpan = getDateSpan(startdate, enddate);
    const result = [];
    console.log(dateSpan);
    console.log(currencies);

    collection
      .find({ date: { $in: dateSpan }, currency: { $in: currencies } })
      .sort({ date: 1 })
      .toArray()
      .then((array) => {
        const result = [];
        for (const date of dateSpan) {
          const exrates = currencies.reduce((obj, x) => {
            obj[x] = '-';
            return obj;
          }, {});
          result.push({ date: date, exrates: exrates });
        }
        let it = 0;
        for (const obj of array) {
          while (obj.date > dateSpan[it]) {
            it++;
          }
          result[it].exrates[obj.currency] = obj.exrate;
        }
        res.render('exchangerate', {
          records: result,
          currencies: Object.keys(result[0].exrates),
        });
      });
  });

  app.listen(port, () => {
    console.log(`The application is available on port ${port}`);
  });
});
