//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
const supertest = require('supertest');
const fs = require('fs');

// This agent refers to PORT where program is runninng.
const server = supertest.agent('http://localhost:8080');

// UNIT test begin
describe('GET /submit?name=.', () => {
  it('Check directory "."', (done) => {
    server
      .get('/submit?name=.')
      .expect('Content-Type', /text\/plain/)
      .expect(200, 'It is a directory!', done);
  });
});

describe('GET /submit?name=non-existing.txt', () => {
  it('Check non-existing file "non-existing.txt"', (done) => {
    server
      .get('/submit?name=non-existing.txt')
      .expect('Content-Type', /text\/plain/)
      .expect(200, '', done);
  });
});

describe('GET /submit?name=./test/text.txt', () => {
  it('Check file "./test/text.txt"', (done) => {
    server
    .get('/submit?name=./test/text.txt')
    .expect('Content-Type', /text\/plain/)
    .expect(200, 'It is a file!\n' + fs.readFileSync('./test/text.txt'), done)
  })
})
