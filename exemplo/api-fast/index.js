const http = require('http');
const { Server } = require('@vinialves08/fast-express');
const routes = require('./src/routes')

// eslint-disable-next-line no-global-assign
Promise = require('bluebird');

const server = new Server({routes});
// eslint-disable-next-line no-underscore-dangle
const _http = http.Server(server.app);

_http.listen(server.port, () => {
  console.info(`🚀 Server started on port ${server.port} (${server.env})`);
});
