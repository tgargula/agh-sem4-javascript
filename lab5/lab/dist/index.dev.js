"use strict";

var express = require('express');

var logger = require('morgan');

var formidable = require('formidable');

var _require = require('mongodb'),
    MongoClient = _require.MongoClient;

var _require2 = require('./script'),
    getDateSpan = _require2.getDateSpan;

var uri = 'mongodb://localhost:27017/';
var dboName = 'currencies';
var app = express();
var port = 3000;
app.set('views', "".concat(__dirname, "/views"));
app.set('view engine', 'pug');
app.use(logger('dev'));
MongoClient.connect(uri, {
  useUnifiedTopology: true
}, function (err, db) {
  if (err) throw err;
  var dbo = db.db(dboName);
  var collection = dbo.collection('currencies');
  app.get('/', function (req, res) {
    res.render('form');
  });
  app.post('/docinfo', function (req, res) {
    var form = formidable();
    form.parse(req, function (err, fields, files) {
      if (err) throw err;
      collection.insertOne(fields).then(function () {
        collection.find().toArray().then(function (array) {
          res.render('docinfo', {
            records: array.length
          });
        });
      });
    });
  });
  app.get('/exchangeRate/:startdate/:enddate/*', function (req, res) {
    var _req$params = req.params,
        startdate = _req$params.startdate,
        enddate = _req$params.enddate;
    var currenciesString = req.params['0'];
    var currencies = currenciesString.split('/');
    var dateSpan = getDateSpan(startdate, enddate);
    var result = [];
    console.log(dateSpan);
    console.log(currencies);
    collection.find({
      date: {
        $in: dateSpan
      },
      currency: {
        $in: currencies
      }
    }).sort({
      date: 1
    }).toArray().then(function (array) {
      var result = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = dateSpan[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var date = _step.value;
          var exrates = currencies.reduce(function (obj, x) {
            obj[x] = '-';
            return obj;
          }, {});
          result.push({
            date: date,
            exrates: exrates
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var it = 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = array[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var obj = _step2.value;

          while (obj.date > dateSpan[it]) {
            it++;
          }

          console.log(obj.date);
          console.log(dateSpan[it]);
          result[it].exrates[obj.currency] = obj.exrate;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      res.render('exchangerate', {
        records: result
      });
    });
  });
  app.listen(port, function () {
    console.log("The application is available on port ".concat(port));
  });
});