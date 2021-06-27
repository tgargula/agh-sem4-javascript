const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/';

MongoClient.connect(uri, { useUnifiedTopology: true }, (err, db) => {
  const dbo = db.db('DeansOffice');

  /* GET users listing. */
  router.get('/', function (req, res) {
    dbo
      .collection('students')
      .find()
      .toArray()
      .then((students) => {
        dbo
          .collection('teachers')
          .find()
          .toArray()
          .then((teachers) => {
            res.send({ teachers: teachers, students: students });
          });
      });
  });

  /* POST add user. */
  router.post('/add', (req, res) => {
    const user = req.body;

    let collection;
    if (user.teacher) {
      collection = dbo.collection('teachers');
    } else {
      collection = dbo.collection('students');
      user.subjects = [];
    }

    collection
      .insertOne(req.body)
      .then((feedback) => {
        console.log(feedback);
        res.render('success', { message: 'Successfully added a user!' });
      })
      .catch((err) => {
        res.render('error', { error: { stack: err } });
      });
  });
});

router.get('/add', (req, res) => {
  res.render('newUser');
});

module.exports = router;
