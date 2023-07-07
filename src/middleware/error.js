/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
const { ValidationError } = require('express-validation');
const Validate = require('../util/validate');
const FieldMessage = require('../util/field-message');

// Import Exceptions
const UnauthorizedException = require('../exception/unauthorized-exception');
const BadRequestException = require('../exception/bad-request-exception');
const ForbiddenException = require('../exception/forbidden-exception');
const ObjectNotFoundException = require('../exception/object-not-found-exception');

/**
 * Error handler. Send stacktrace only during development
 * @public
 */

// eslint-disable-next-line no-unused-vars
const handler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const errors = [];

    if (err.details.body && err.details.body.length > 0) {
      for (const e of err.details.body) {
        errors.push(new FieldMessage(e.context.label, e.message));
      }
    }

    if (err.details.query && err.details.query.length > 0) {
      for (const e of err.details.query) {
        errors.push(new FieldMessage(e.context.label, e.message));
      }
    }

    return res.status(err.statusCode).json(new Validate(err.statusCode, err.message, errors));
  }

  if (err instanceof UnauthorizedException
      || err instanceof BadRequestException
      || err instanceof ForbiddenException
      || err instanceof ObjectNotFoundException) {
    return res.status(err.status).json(new Validate(err.status, err.message, err.errors));
  }

  // TODO: Integrar com ferramenta de monitoramento

  res.status(err.status || 500);
  console.error(err);
  res.render('error', {
    message: err.message,
    error: err,
  });
};

exports.handler = handler;
