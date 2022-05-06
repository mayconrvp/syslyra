'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enderecos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Enderecos.hasMany(models.Alunos, {
        foreignKey: 'idEndereco'
      });
      Enderecos.belongsTo(models.Cidades, {
        foreignKey: 'idCidade'
      });
    }
  }
  Enderecos.init({
    logradouro: DataTypes.STRING,
    numero: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cep: DataTypes.STRING,
    complemento: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Enderecos',
  });
  return Enderecos;
};