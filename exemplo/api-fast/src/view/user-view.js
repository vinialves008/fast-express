const EnderecoView = require('./endereco-view');

module.exports = class User {
  constructor(user) {
    this.id = user.id;
    this.nome = user.nome;
    this.email = user.email;
    this.endereco = user.endereco ? new EnderecoView(user.endereco) : null;
  }
};
