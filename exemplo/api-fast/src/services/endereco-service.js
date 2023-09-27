const { Service } = require('../../../../index');
const EnderecoView = require('../view/endereco-view');
const enderecoModel = require('../model/endereco-model');

module.exports = class Endereco extends Service {
  constructor(knex) {
    super(knex, enderecoModel, { tableName: 'endereco', view: EnderecoView });
  }
};
