const express = require('express');

const router = express.Router();

const { RoutesFast } = require('@vinialves08/fast-express');
const { UserService } = require('../services');

const routes = new RoutesFast(UserService);
router.get(
  '/findOne',
  async (req, res, next) => routes.findOne(req, res, next),
);

router.get(
  '/:id',
  async (req, res, next) => routes.findById(req, res, next),
);

router.get(
  '/findOne',
  async (req, res, next) => routes.findOne(req, res, next),
);

router.get(
  '',
  async (req, res, next) => routes.findAll(req, res, next),
);

router.post(
  '',
  async (req, res, next) => routes.create(req, res, next),
);

router.put(
  '/:id',
  async (req, res, next) => routes.update(req, res, next),
);

router.patch(
  ':id',
  async (req, res, next) => routes.patch(req, res, next),
);

router.delete(
  ':id',
  async (req, res, next) => routes.delete(req, res, next),
);

module.exports = router;
