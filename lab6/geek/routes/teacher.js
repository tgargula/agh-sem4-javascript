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

  router.get('/student', async (req, res) => {
    const url = new URL(`localhost:8080/${req.url}`);
    let student = url.searchParams.get('name');

    if (student !== null) {
      // Prompts
      student = student.split(' ');
      const filter =
        student.length === 1
          ? {
              $or: [
                { name: new RegExp(`^${student[0]}`) },
                { surname: new RegExp(`^${student[0]}`) },
              ],
            }
          : student.length === 2
          ? {
              $or: [
                {
                  $and: [
                    { name: student[0] },
                    { surname: new RegExp(`^${student[1]}`) },
                  ],
                },
                {
                  $and: [
                    { surname: student[0] },
                    { name: new RegExp(`^${student[1]}`) },
                  ],
                },
              ],
            }
          : { _id: -1 };

      const students = await dbo.collection('students').find(filter).toArray();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(students));
    } else {
      student = url.searchParams.get('students-search').split(' ');
      
      const filter =
        student.length === 1
          ? {
              $or: [
                { name: new RegExp(`^${student[0]}`) },
                { surname: new RegExp(`^${student[0]}`) },
              ],
            }
          : student.length === 2
          ? {
              $or: [
                {
                  $and: [
                    { name: student[0] },
                    { surname: new RegExp(`^${student[1]}`) },
                  ],
                },
                {
                  $and: [
                    { surname: student[0] },
                    { name: new RegExp(`^${student[1]}`) },
                  ],
                },
              ],
            }
          : { _id: -1 };

      if (check(req, res, 'teacher')) {
        collection.findOne(filter).then((student) => {
          res.render('studentInfo', { student: student });
        });
      }
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
