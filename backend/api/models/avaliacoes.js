'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Avaliacoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Avaliacoes.hasMany(models.Aula_aluno, {
        foreignKey: 'idAvaliacao'
      })
    }
  }
  Avaliacoes.init({
    descricao: DataTypes.STRING,
    pontuacao: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Avaliacoes',
  });
  return Avaliacoes;
};