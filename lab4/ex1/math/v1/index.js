// const op0 = new Operation(5, 3); --> Operation class not defined
// console.log(op0.sum());

const operation = require('./module');

const argv = process.argv.slice(2);

const x = Number(argv[0]);
const y = Number(argv[1]);

const op = new operation.Operation(x, y);
console.log(op.sum());
