/* eslint-disable new-cap */
module.exports = class RoutesFast {
  constructor(Service) {
    this.Service = Service;
  }

  async findOne(req, res, next) {
    try {
      const { knex } = req;
      const { query } = req;
      const service = new this.Service(knex);
      const ret = await service.findOne(query);
      res.status(200).send(ret);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const { knex } = req;
      const { id } = req.params;
      const service = new this.Service(knex);
      const user = await service.findById(id);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const { knex } = req;
      const service = new this.Service(knex);
      const list = await service.findAll(req.query);
      res.status(200).send(list);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { knex } = req;
      const service = new this.Service(knex);
      const user = await service.create(req.body);
      res.status(201).send(user);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { knex } = req;
      const { id } = req.params;
      const service = new this.Service(knex);
      const user = await service.update(id, req.body);
      res.status(204).send(user);
    } catch (error) {
      next(error);
    }
  }

  async patch(req, res, next) {
    try {
      const { knex } = req;
      const { id } = req.params;
      const service = new this.Service(knex);
      const user = await service.patch(id, req.body);
      res.status(204).send(user);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { knex } = req;
      const { id } = req.params;
      const service = new this.Service(knex);
      await service.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};
