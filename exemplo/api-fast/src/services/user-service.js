const { Service } = require('@vinialves08/fast-express')

module.exports = class User extends Service {
    constructor(knex) {
      super(knex, { tableName: 'user' });
    }
};