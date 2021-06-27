const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/';

MongoClient.connect(uri, { useUnifiedTopology: true }, (err, db) => {
  const dbo = db.db('DeansOffice');

  /* GET student home page. */
  router.get('/home', (req, res) => {
    if (!req.session.loggedin) {
      res.render('error', {
        error: { stack: 'You need to be signed in to see this page!' },
      });
      return;
    }

    if (!req.session.permissions === 'student') {
      res.render('error', {
        error: { stack: 'You need to be signed as student to see this page!' },
      });
      return;
    }

    const username = req.session.username;
    const collection = dbo.collection('students');
    collection.findOne({ username: username }).then((student) => {
      console.log(username);
      res.render('student', { user: username, subjects: student.subjects });
    });
  });
});

module.exports = router;
