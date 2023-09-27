# Fast API

Tenha um Server Express já equipado com o knex para sua conexão com o banco. Abaixo um exemplo de como utilizar a biblioteca.

### Exemplo para você criar seu servidor com um exemplo de um Caso de Uso (User)
- [Exemplo](https://github.com/vinialves008/fast-express/tree/master/exemplo/api-fast)

### Arquivo .env exemplo
```sh
PORT=
DEBUG=

#database
DATABASE_CLIENT=    ## postgresql, mysql
DATABASE_HOST=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=
DATABASE_PORT=
DATABASE_POOL_MIN=
DATABASE_POOL_MAX=
```
### O server já disponibiliza uma Rota de Healthcheck
```sh
http://localhost:3000/healthcheck
```


### Ao criar um novo serviço você deverá extender da classe Service e já terá disponível as funcionalidades de create, update, patch, findById, findOne e delete.
```sh
const { Service } = require('@vinialves08/fast-express')

module.exports = class User extends Service {
    constructor(knex) {
      super(knex, { tableName: 'user', view: UserView, withRelations: ['endereco'] });
    }
};
```