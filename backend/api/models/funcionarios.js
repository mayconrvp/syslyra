'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Funcionarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Funcionarios.hasMany(models.Usuarios, {
        foreignKey: 'idFuncionario'
      });
      Funcionarios.hasMany(models.Turmas, {
        foreignKey: 'idFuncionario'
      })
    }
  }
  Funcionarios.init({
    nome: DataTypes.STRING,
    cargo: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Funcionarios',
  });
  return Funcionarios;
};