const lodash = require('lodash');

const omit = (obj, data = []) => lodash.omit(obj, data);

module.exports = {
  omit,
};
