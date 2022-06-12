'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aula_aluno extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Aula_aluno.belongsTo(models.Aulas, {
        foreignKey: 'idAula'
      });
      Aula_aluno.belongsTo(models.Alunos, {
        foreignKey: 'idAluno'
      });
      Aula_aluno.belongsTo(models.Avaliacoes, {
        foreignKey: 'idAvaliacao'
      });
    }
  }
  Aula_aluno.init({
    nota: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Aula_aluno',
  });
  return Aula_aluno;
};