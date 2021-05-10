//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
const supertest = require('supertest');
const fs = require('fs');

// This agent refers to PORT where program is runninng.
const server = supertest.agent('http://localhost:8080');

// UNIT test begin
describe('GET /submit?textfield=file1.txt:R0', () => {
  it('Remove line test', (done) => {
    server
      .get('/submit?textfield=file1.txt:R0')
      .expect('Content-Type', /text\/plain/)
      .expect(200, '<h1>Zawartość pliku 0</h1>\nABCs\nsadsa\n', done);
  });
});

describe('GET /submit?textfield=file2.txt:J15', () => {
  it('Justify test', (done) => {
    server
      .get('/submit?textfield=file2.txt:J15')
      .expect('Content-Type', /text\/plain/)
      .expect(
        200,
        '<h1>Zawartość pliku 0</h1>\nJakiś    bardzo\nprzykładowy    \ntekst Abcesddas\nsd  weqw  ef ef\nreer  sfdf weqw\nwe  ew  e ew ew\nef ef e.\n',
        done
      );
  });
});

describe('GET /submit?textfield=file1.txt:R1 file3.txt:J8', () => {
  it('Integrity test', (done) => {
    server
    .get('/submit?textfield=file1.txt:R1 file3.txt:J8')
    .expect('Content-Type', /text\/plain/)
    .expect(200, '<h1>Zawartość pliku 0</h1>\nABECADŁO\nsadsa\n<h1>Zawartość pliku 1</h1>\nPrzykład\n2 ABC\n', done)
  })
});
