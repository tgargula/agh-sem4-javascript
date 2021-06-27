const formidable = require('formidable');
const { dboName, collectionName, uri } = require('./dbprops');
const { MongoClient } = require('mongodb');

const getStudents = (collection, _req, res) => {
  console.log(collection);
  collection
    .find()
    .toArray()
    .then((result) => {
      console.log(result);
      res.write(table(result));
      res.end();
    });
};

const addStudent = (collection, req, res) => {
  const form = formidable({ multiples: true, uploadDir: __dirname });

  form.parse(req, (err, fields, _files) => {
    collection.insertOne(fields, (err, _res) => {
      console.log(fields);
      if (err) throw err;
      getStudents(collection, req, res);
    });
  });

};

const students = (req, res) => {
  MongoClient.connect(uri, (err, db) => {
    if (err) throw err;

    const collection = db.db(dboName).collection(collectionName);

    switch (req.method.toLowerCase()) {
      case 'get':
        res.writeHead(200, {'content-type': 'text/html'});
        getStudents(collection, req, res);
        break;
      case 'post':
        res.writeHead(201, {'content-type': 'text/html'});
        addStudent(collection, req, res);
        break;
      case 'put':
        pass();
      case 'delete':
        pass();
      default:
        pass();
    }

    // db.close();
  });
};

const index = (_req, res) => {
  // Generating the form

  console.log('Creating a response header');
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  console.log('Creating a response body');

  // Put an HTML form in the body of the answer
  res.write(`
        <form method="post" action="/students">
          <label for="fname">Enter first name</label>
          <input name="fname">
          <br>
          <label for="lname">Enter last name</label>
          <input name="lname">
          <br>
          <label for="photo">Add photo</label>
          <input type="file" name="photo">
          <br>
          <input type="submit">
          <input type="reset">
        </form>
      `);

  console.log('Sending the response');
  res.end();
};

const table = (results) => {
  let response = "<table>";
  response = response.concat(`
    <tr>
      <th>Photo</th>
      <th>First name</th>
      <th>Last name</th>
    </tr>
  `)
  
  for (const obj of results) {
    const { fname, lname, photo } = obj;
    response = response.concat(`
      <tr>
        <td>${photo}</td>
        <td>${fname}</td>
        <td>${lname}</td>
      </th>
    `)
  }

  response = response.concat('</table>');

  return response
};

const pass = () => {};

module.exports = { index, students };
