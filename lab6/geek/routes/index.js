const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/';
const faker = require('faker');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/logout', (req, res) => {
  req.session.loggedin = false;
  req.session.username = null;
  res.render('success', { message: 'Successfully logged out!' });
});

router.get('/generate', (req, res) => {
  res.render('generate');
});

router.post('/generate', (req, res) => {
  MongoClient.connect(uri, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    const dbo = db.db('DeansOffice');

    const students = [];
    for (let i = 0; i < req.body.students; i++) {
      const student = {
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        password: faker.internet.password(),
        subjects: [],
      };
      student.username =
        student.name.toLowerCase() + student.surname.toLowerCase();
      students.push(student);
    }
    dbo.collection('students').insertMany(students);

    const teachers = [];
    for (let i = 0; i < req.body.teachers; i++) {
      const teacher = {
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        password: faker.internet.password(),
        teacher: 'on',
      };
      teacher.username =
        teacher.name.toLowerCase() + teacher.surname.toLowerCase();
      teachers.push(teacher);
    }
    dbo.collection('teachers').insertMany(teachers);
    res.render('success', {message: "Pomyślnie wygenerowano i dodano do bazy nauczycieli i studentów"})
  });
});

module.exports = router;
