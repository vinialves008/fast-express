require('dotenv').config();

module.exports = class Secret {
  constructor() {
    this.projectName = process.env.PROJECT_NAME || 'Swagger Docs';
    this.projectDescription = process.env.PROJECT_DESCRIPTION || 'Swagger Docs Description';
    this.baseUrl = process.env.BASE_URL || '';
    this.env = process.env.NODE_ENV || 'development';
    this.port = process.env.PORT || 3000;
    this.whitelist = [null, undefined, 'null'].includes(process.env.WHITE_LIST)
      ? null : process.env.WHITE_LIST.split(',');
    this.enableSwaggerUI = process.env.ENABLE_SWAGGER || true;
    this.databaseName = process.env.DATABASE_NAME;
    this.clientDatabase = process.env.DATABASE_CLIENT;
    this.databasePoolMin = process.env.DATABASE_POOL_MIN;
    this.databasePoolMax = process.env.DATABASE_POOL_MAX;
    this.databaseHost = process.env.DATABASE_HOST;
    this.databaseUser = process.env.DATABASE_USER;
    this.databasePassword = process.env.DATABASE_PASSWORD;
    this.databasePort = process.env.DATABASE_PORT;
    this.debug = process.env.DEBUG ? JSON.parse(process.env.DEBUG) : false;
  }
};
