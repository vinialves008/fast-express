/* eslint-disable class-methods-use-this */
/* eslint-disable new-cap */
const { generateUUID } = require('../util/uuid');
const { omit } = require('../util');
const ObjectNotFoundException = require('../exception/object-not-found-exception');

module.exports = class Service {
  constructor(knex, model, { tableName = '', view, withRelations = [] }) {
    const bookshelf = require('bookshelf')(knex);
    this.tableName = tableName;
    this.knex = knex;
    this.view = view;
    this.withRelations = withRelations;
    this.model = model(bookshelf);
  }

  async findAll(
    where = {},
    { withRelations = [], require = false } = {},
  ) {
    const res = await this.model.where(where).fetchAll({
      require,
      withRelated: [...withRelations, ...this.withRelations],
    });
    return res.map((entity) => (this.view ? new this.view(entity.toJSON()) : entity));
  }

  async findById(id, { withRelations = [], required = true, returningIsView = true } = {}) {
    const { model } = this;
    const withRelated = [...withRelations, ...this.withRelations];
    const entity = await new model({ id }).fetch({
      require: false,
      withRelated,
    });
    if (!entity && required) {
      throw new ObjectNotFoundException(
        `${this.tableName} id = ${id} não encontrado`,
      );
    }

    return this.view && returningIsView ? new this.view(entity.toJSON()) : entity.toJSON();
  }

  async findOne(where, { withRelations = [], required = false } = {}) {
    const { model } = this;
    const entity = await new model(where).fetch({
      require: required,
      withRelated: [...withRelations, ...this.withRelations],
    });
    return this.view ? new this.view(entity.toJSON()) : entity;
  }

  async create(entity) {
    const id = entity?.id || generateUUID();
    const dataRelations = await this.saveRelations(entity);
    const data = await this.knex(this.tableName)
      .insert({ id, ...dataRelations })
      .returning('id');
    return this.findById(data[0].id);
  }

  async patch(id, entity, transacting) {
    const data = await this.findById(id, { returningIsView: false });
    const dataUpdated = { ...data, ...entity };

    return this.update(id, dataUpdated, transacting);
  }

  async update(id, entity) {
    const data = omit(entity, ['id', 'createdAt', ...this.withRelations]);
    await this.knex(this.tableName)
      .where({ id })
      .update({ ...data });
    return entity;
  }

  async delete(id) {
    return this.knex(this.tableName).where({ id }).del();
  }

  async saveRelations(data) {
    return data;
  }
};
