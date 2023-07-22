/* eslint-disable class-methods-use-this */
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const helmet = require('helmet');
const cors = require('cors');
const { expressCspHeader } = require('express-csp-header');

const Secret = require('../secret');

const { instance, log, error } = require('../middleware');

module.exports = class Server {
  constructor({ routes }) {
    const secret = new Secret();
    this.port = secret.port;
    this.env = secret.env;

    this.app = express();
    this.app.set('port', this.port);

    // MIDDLEWARES
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            'script-src': ["'self'", "'unsafe-inline'", ''],
          },
        },
      }),
    );

    this.app.use(
      expressCspHeader({
        policies: {
          'default-src': [expressCspHeader.NONE],
          'img-src': [expressCspHeader.SELF],
        },
      }),
    );

    const corsOptions = {
      exposedHeaders: 'authorization, x-refresh-token, x-token-expiry-time',
      origin: (origin, callback) => {
        if (!secret.whitelist || secret.whitelist.includes(String(origin))) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    };
    this.app.use(cors(corsOptions));

    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: secret.projectName,
          version: '1.0.0',
          description: secret.projectDescription,
        },
        components: {
          securitySchemes: {
            Authorization: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
              in: 'header',
            },
          },
        },
      },
      apis: [
      ],
    };

    if (JSON.parse(secret.enableSwaggerUI)) {
      const specs = swaggerJsdoc(options);

      this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    }

    this.app.use(log);
    this.app.use(instance);

    this.app.use('/healthcheck', (req, res) => { res.status(200).send({ status: 'ok' }); });
    this.app.use(routes);

    // eslint-disable-next-line no-unused-vars
    this.app.use((req, res, next) => {
      res.status(404).send({
        status: 404,
        message: 'Not found',
      });
    });

    // error handler, send stacktrace only during development
    this.app.use(error.handler);
  }
};
