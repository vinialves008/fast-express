const Exception = require('./exception');

module.exports = class ObjectNotFoundException extends Exception {
  constructor(message, errors = []) {
    super(404, message, errors);
  }
};
