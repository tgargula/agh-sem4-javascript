//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
const supertest = require("supertest");

// This agent refers to PORT where program is runninng.
const server = supertest.agent("http://localhost:8080");

// UNIT test begin
describe('GET /submit?name=John', function () {
      it('respond with "Hello John"', function (done) {
            server
                  .get('/submit?name=John')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, "Hello John", done);
      });
});