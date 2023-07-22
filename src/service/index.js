const { generateUUID } = require('../util/uuid');
const { omit } = require('../util');

module.exports = class Service {
  constructor(knex, { tableName = '' }) {
    this.tableName = tableName;
    this.knex = knex;
  }

  async findAll(where = {}) {
    return this.knex(this.tableName).select().where(where);
  }

  async findById(id) {
    return this.knex(this.tableName).select().where({ id }).first();
  }

  async findOne(where) {
    return this.knex(this.tableName).select().where(where).first();
  }

  async create(entity) {
    const data = await this.knex(this.tableName)
      .insert({ id: generateUUID(), ...entity })
      .returning('id');
    return this.findById(data[0].id);
  }

  async update(id, entity) {
    const data = omit(entity, ['id']);
    await this.knex(this.tableName)
      .where({ id })
      .update({ ...data });
    return this.findById(id);
  }

  async delete(id) {
    return this.knex(this.tableName)
      .where({ id })
      .del();
  }
};
