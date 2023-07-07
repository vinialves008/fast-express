const Exception = require('./exception');

module.exports = class UnauthorizedException extends Exception {
  constructor(message, errors = []) {
    super(401, message, errors);
  }
};
