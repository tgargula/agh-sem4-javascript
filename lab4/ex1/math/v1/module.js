/** Stores two values and enables to execute simple operations on them */
class Operation {
  /**
   * @constructor
   * @param {number} x - The first value
   * @param {number} y - The second value
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Calculates the sum of stored values
   * @returns {number} sum of two numbers
   */
  sum() {
    return this.x + this.y;
  }
}

exports.Operation = Operation;
