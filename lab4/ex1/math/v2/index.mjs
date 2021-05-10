// const op0 = new Operation(5, 3); --> Operation class not defined
// console.log(op0.sum());

import { Operation } from './module';

const op = new Operation(5, 3);
console.log(op.sum());
