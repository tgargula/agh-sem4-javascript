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

  router.get('/add', async (req, res) => {
    const url = new URL(`localhost:8080/${req.url}`);
    const username = url.searchParams.get('username');
    // Filter usernames
    const filter = username ? { username: new RegExp(`^${username}`) } : {};
    const students = await dbo.collection('students').find(filter).toArray();
    const teachers = await dbo.collection('teachers').find(filter).toArray();
    const usernames = students.concat(teachers).map((user) => user.username);
    if (username === null) {
      // Render html page
      res.render('newUser', { usernames });
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(usernames));
    }
  });
});

module.exports = router;
