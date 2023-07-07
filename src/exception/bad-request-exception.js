const Exception = require('./exception');

module.exports = class BadRequestException extends Exception {
  constructor(message, errors = []) {
    super(400, message, errors);
  }
};
