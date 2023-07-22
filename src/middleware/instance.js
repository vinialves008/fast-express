const initKnex = require('../config/knex');

const instance = async (req, res, next) => {
  const knex = await initKnex();
  req.knex = knex;

  next();
};

module.exports = instance;
