const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/';
const check = require('../utils/session');

MongoClient.connect(uri, { useUnifiedTopology: true }, (err, db) => {
  const dbo = db.db('DeansOffice');
  const collection = dbo.collection('students');

  router.get('/student/:student', (req, res) => {
    if (check(req, res, 'teacher')) {
      collection.findOne({ username: req.params.student }).then((student) => {
        res.render('studentInfo', { student: student });
      });
    }
  });

  router.post('/student/:student', (req, res) => {
    if (check(req, res, 'teacher')) {
      if ('note' in req.body) {
        // We add a note
        const { subject, note } = req.body;
        collection.updateOne(
          { username: req.params.student, 'subjects.name': subject },
          { $push: { 'subjects.$.notes': note } }
        );
      } else {
        // We add a subject
        const subject = req.body.subject;
        collection.updateOne(
          { username: req.params.student },
          { $push: { subjects: { name: subject, notes: [] } } }
        );
      }
      collection.findOne({ username: req.params.student }).then((student) => {
        res.render('studentInfo', { student: student });
      });
    }
  });

  router.get('/home', (req, res) => {
    if (check(req, res, 'teacher')) {
      collection
        .find({})
        .toArray()
        .then((students) => {
          res.render('teacher', {
            user: req.session.username,
            students: students,
          });
        });
    }
  });
});

module.exports = router;
