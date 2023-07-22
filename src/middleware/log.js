/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */

const bypass = ['password', 'senha', 'key'];

const log = (req, res, next) => {
  const { params, query, body } = req;

  for (const secret of bypass) {
    if (params[secret]) params[secret] = '#######';
    if (query[secret]) query[secret] = '#######';
    if (body[secret]) body[secret] = '#######';
  }
  console.info('====================');
  console.info(`Host: ${req.hostname}`);
  console.info(`${req.path} => ${req.method}`);
  console.info(`parametros => ${JSON.stringify(params)}`);
  console.info(`query => ${JSON.stringify(query)}`);
  console.info(`body => ${JSON.stringify(req.body)}`);
  console.info('====================');
  next();
};

module.exports = log;
