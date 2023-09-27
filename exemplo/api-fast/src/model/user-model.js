const EnderecoModel = require('./endereco-model');

module.exports = (bookshelf) => bookshelf.model('User', {
  tableName: 'user',
  endereco() {
    return this.belongsTo(EnderecoModel(bookshelf), 'enderecoId');
  },
});
