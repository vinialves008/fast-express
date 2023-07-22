const lodash = require('lodash');
const uuid = require('./uuid');

const omit = (obj, data = []) => lodash.omit(obj, data);

module.exports = {
  omit,
  uuid,
};
