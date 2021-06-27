const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/';

MongoClient.connect(uri, { useUnifiedTopology: true }, (err, db) => {
  const dbo = db.db('DeansOffice');

  /* POST login check. */
  router.post('/', (req, res) => {
    dbo
      .collection('students')
      .findOne({ username: req.body.username })
      .then((obj) => {
        if (!obj) {
          dbo
            .collection('teachers')
            .findOne({ username: req.body.username })
            .then((obj) => {
              if (!obj || req.body.password !== obj.password) {
                res.render('error', {
                  error: { stack: 'Incorrect username or password!' },
                });
              } else {
                req.session.loggedin = true;
                req.session.username = obj.username;
                req.session.permissions = 'teacher';
                res.redirect('/teacher/home');
              }
            });
        }
        else if (req.body.password !== obj.password) {
          res.render('error', {
            error: { stack: 'Incorrect username or password!' },
          });
        } else {
          req.session.loggedin = true;
          req.session.username = obj.username;
          req.session.permissions = 'student';
          res.redirect('/student/home');
        }
      });
  });
});

/* GET login page. */
router.get('/', (req, res) => {
  res.render('login');
});

module.exports = router;
