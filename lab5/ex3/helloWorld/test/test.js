// Source: https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
const supertest = require('supertest');
const server1 = supertest.agent('http://localhost:3000');
const server2 = supertest.agent('http://localhost:3001');

const chai = require('chai');
const { expect } = require('chai');
chai.use(require('chai-json'));

const { x1, y1 } = require('../app1').test;
const { x2, y2 } = require('../app2').test;
const { getHtmlResponse, calculated, eval } = require('../script');

describe('Check json files', () => {
  it('Json file is a json file', () => {
    expect('./json/numbers.json')
      .to.be.a.jsonFile()
      .and.contain.jsonWithProps({ x: 5, y: 3, operation: '+' });
  });
});

describe('Check eval', () => {
  it('Returns 5 for 2 + 3', () => {
    expect(eval('+', 2, 3)).to.be.equal(5);
  });
  it('Returns -1 for 5 - 6', () => {
    expect(eval('-', 5, 6)).to.be.equal(-1);
  });
  it('Returns 30 for 5 * 6', () => {
    expect(eval('*', 5, 6)).to.be.equal(30);
  });
  it('Returns 2.5 for 10 / 4', () => {
    expect(eval('/', 10, 4)).to.be.equal(2.5);
  });
  it('Returns Infinity for 1 / 0', () => {
    expect(eval('/', 1, 0)).to.be.equal(Infinity);
  });
});

describe('Check getHtmlResponse', () => {
  it('Response includes table, tr, td, th tags and the result', () => {
    const json = [{ operation: '+', x: 4, y: 3 }];
    expect(getHtmlResponse(json))
      .to.include('<table>')
      .and.to.include('<tr>')
      .and.to.include('<td>')
      .and.to.include('<th>')
      .and.to.include('7');
  });
});

describe('Check calculated', () => {
  it('Response includes the same map but with result', () => {
    const json = [{ operation: '+', x: 4, y: 3 }];
    expect(calculated(json)).to.be.deep.equal([
      { operation: '+', x: 4, y: 3, result: 7 },
    ]);
  });
});

describe('GET / app1', () => {
  it('Check if the operation is properly displayed', (done) => {
    server1
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((_err, res) => {
        expect(res.text).to.include(`${x1} + ${y1} = ${x1 + y1}`);
        done();
      });
  });
});

describe('GET / app2', () => {
  it('Check if the operation is properly displayed', (done) => {
    server2
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((_err, res) => {
        expect(res.text).to.include(`${x2} + ${y2} = ${x2 + y2}`);
        done();
      });
  });
});

describe('GET /json/:name app1', () => {
  it('Check /json/numbers.json (existing)', (done) => {
    server1
      .get('/json/numbers.json')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((_err, res) => {
        expect(res.text)
          .to.include('<td>8</td>')
          .and.to.include('<td>-3</td>')
          .and.to.include('<td>4</td>')
          .and.to.include('<td>Infinity</td>')
          .and.to.include('<td>11.75</td>');
        const { json1 } = require('../app1').test;
        expect(json1)
          .to.deep.include.members([{ operation: '+', x: 5, y: 3 }])
          .and.to.have.lengthOf(6);
        done();
      });
  });
});

describe('GET /json/:name app2', () => {
  it('Check /json/numbers.json (existing)', (done) => {
    server2
      .get('/json/numbers.json')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((_err, res) => {
        expect(res.text)
          .to.include('<td>8</td>')
          .and.to.include('<td>-3</td>')
          .and.to.include('<td>4</td>')
          .and.to.include('<td>Infinity</td>')
          .and.to.include('<td>11.75</td>');
        const { json2 } = require('../app2').test;
        expect(json2)
          .to.deep.include.members([{ operation: '+', x: 5, y: 3, result: 8 }])
          .and.to.have.lengthOf(6);

        done();
      });
  });
});

describe('GET /calculate/:operation/:x/:y', () => {
  it('Check /calculate/add/1/2', (done) => {
    server1
      .get('/calculate/add/1/2')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((_err, res) => {
        expect(res.text).to.include('<h1>1 + 2 = 3</h1>');
        done();
      });
  });
  it('Check /calculate/divide/3/4', (done) => {
    server1
      .get('/calculate/divide/3/4')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((_err, res) => {
        expect(res.text).to.include('<h1>3 / 4 = 0.75</h1>');
        done();
      });
  });
  it('Check /calculate/multiply/5/6', (done) => {
    server1
      .get('/calculate/multiply/5/6')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((_err, res) => {
        expect(res.text).to.include('<h1>5 * 6 = 30</h1>');
        done();
      });
  });
});

describe('GET /results', () => {
  it('Check /results', (done) => {
    server1
      .get('/results')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((_err, res) => {
        expect(res.text)
          .to.include('<td>3</td>')
          .and.to.include('<td>/</td>')
          .and.to.include('<td>*</td>')
          .and.to.include('<td>30</td>');
        done();
      });
  });
});

describe('GET /calculate/:operation/:x/:y', () => {
  it('Check /calculate/add/1/2', (done) => {
    server2
      .get('/calculate/add/1/2')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((_err, res) => {
        expect(res.text).to.include('<h1>1 + 2 = 3</h1>');
        done();
      });
  });
  it('Check /calculate/divide/3/4', (done) => {
    server2
      .get('/calculate/divide/3/4')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((_err, res) => {
        expect(res.text).to.include('<h1>3 / 4 = 0.75</h1>');
        done();
      });
  });
  it('Check /calculate/multiply/5/6', (done) => {
    server2
      .get('/calculate/multiply/5/6')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((_err, res) => {
        expect(res.text).to.include('<h1>5 * 6 = 30</h1>');
        done();
      });
  });
});

describe('GET /results', () => {
  it('Check /results', (done) => {
    server2
      .get('/results')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((_err, res) => {
        expect(res.text)
          .to.include('<td>3</td>')
          .and.to.include('<td>/</td>')
          .and.to.include('<td>*</td>')
          .and.to.include('<td>30</td>');
        done();
      });
  });
});
