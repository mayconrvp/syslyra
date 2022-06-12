'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aulas_alunos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Aulas_alunos.belongsTo(models.Aulas, {
        foreignKey: 'idAula'
      });
      Aulas_alunos.belongsTo(models.Alunos, {
        foreignKey: 'idAluno'
      });
      Aulas_alunos.belongsTo(models.Avaliacoes, {
        foreignKey: 'idAvaliacao'
      });
    }
  }
  Aulas_alunos.init({
    nota: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Aulas_alunos',
  }, { freezeTableName: true });
  Aulas_alunos.removeAttribute('id');
  return Aulas_alunos;
}; 