const Exception = require('./exception');

module.exports = class ForbiddenException extends Exception {
  constructor(message, errors = []) {
    super(403, message, errors);
  }
};
