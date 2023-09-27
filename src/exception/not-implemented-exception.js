const Exception = require('./exception');

module.exports = class NotImplementedException extends Exception {
  constructor(message, errors = []) {
    super(500, message, errors);
  }
};
