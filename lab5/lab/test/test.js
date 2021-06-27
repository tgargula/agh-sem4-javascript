const supertest = require('supertest');

const server = supertest.agent('http://localhost:3000');

describe('GET /', () => {
  it('respond with html', (done) => {
    server.get('/').expect('Content-Type', /html/).expect(200, done);
  });
});
