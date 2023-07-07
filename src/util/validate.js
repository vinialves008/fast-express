module.exports = class Validate {
  constructor(status, message, errors = []) {
    this.status = status;
    this.message = message;
    this.errors = errors;
  }
};
