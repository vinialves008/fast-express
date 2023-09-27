module.exports = class Endereco {
  constructor(endereco) {
    this.id = endereco.id;
    this.rua = endereco.rua;
    this.complemento = endereco.complemento;
    this.cidade = endereco.cidade;
    this.estado = endereco.estado;
    this.pais = endereco.pais;
  }
};
