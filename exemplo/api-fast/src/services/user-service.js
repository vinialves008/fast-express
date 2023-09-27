const { Util } = require('@vinialves08/fast-express');

const { Service } = require('../../../../index');
const UserView = require('../view/user-view');
const userModel = require('../model/user-model');
const EnderecoService = require('./endereco-service');


module.exports = class User extends Service {
  constructor(knex) {
    super(knex, userModel, { tableName: 'user', view: UserView, withRelations: ['endereco'] });
  }

  async saveRelations(data) {
    const enderecoService = new EnderecoService(this.knex);
    const endereco = await enderecoService.create(data.endereco);
    const entity = Util.omit(data, ['endereco']);
    return { ...entity, enderecoId: endereco.id };
  }
};
