const express = require('express');

const router = express.Router();

const { UserService } = require('../services');

router.get('/findOne', async (req, res, next) => {
  try {
    const { knex } = req;
    const { query } = req;
    const service = new UserService(knex);
    const user = await service.findOne(query);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { knex } = req;
    const { id } = req.params;
    const service = new UserService(knex);
    const user = await service.findById(id);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

router.get('', async (req, res) => {
  const { knex } = req;
  const service = new UserService(knex);
  const users = await service.findAll(req.query);
  res.status(200).send(users);
});

router.post('', async (req, res) => {
  const { knex } = req;
  const service = new UserService(knex);
  const user = await service.create(req.body);
  res.status(201).send(user);
});

router.put('/:id', async (req, res) => {
  const { knex } = req;
  const { id } = req.params;
  const service = new UserService(knex);
  const user = await service.update(id, req.body);
  res.status(204).send(user);
});

router.patch('/:id', async (req, res) => {
  const { knex } = req;
  const { id } = req.params;
  const service = new UserService(knex);
  const user = await service.patch(id, req.body);
  res.status(204).send(user);
});

router.delete('/:id', async (req, res) => {
  const { knex } = req;
  const { id } = req.params;
  const service = new UserService(knex);
  await service.delete(id);
  res.status(204).send();
});

module.exports = router;
