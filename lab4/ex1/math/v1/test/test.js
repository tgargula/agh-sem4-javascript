/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/*
  Mocha allows you to use any assertion library you wish. In this example, we are using the built-in module called 'assert'.
  If you prefer the 'chai' library (https://www.chaijs.com/) then you have to install it yourself: 'npm install chai --save-dev',
  and then you need to uncomment the lines below.
*/

const { expect } = require('chai');
const operation = require('../module');

describe('The sum() method', () => {
  it('Returns 4 for 2+2', () => {
    const op = new operation.Operation(2, 2);
    expect(op.sum()).to.equal(4);
  });
  it('Returns 0 for -2+2', () => {
    const op = new operation.Operation(-2, 2);
    expect(op.sum()).to.equal(0);
  });
});
