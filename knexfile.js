/* eslint-disable import/no-extraneous-dependencies */
const Secret = require('./src/secret');

module.exports = () => {
  const secret = new Secret();
  return {
    client: secret.clientDatabase,
    debug: secret.debug,
    connection: {
      host: secret.databaseHost,
      user: secret.databaseUser,
      password: secret.databasePassword,
      port: secret.databasePort,
      database: secret.databaseName,
      typeCast(field, next) {
        if (field.type === 'TINY') {
          return field.string() === '1';
        }
        return next();
      },
    },
    pool: {
      min: secret.databasePoolMin ? JSON.parse(secret.databasePoolMin) : 0,
      max: secret.databasePoolMax ? JSON.parse(secret.databasePoolMax) : 5,
    },
    migrations: {
      tableName: 'migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  };
};
