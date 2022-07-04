'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aulas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Aulas.hasMany(models.Aulas_matriculas, {
        foreignKey: 'idAula'
      })
      Aulas.belongsTo(models.Turmas, {
        foreignKey: 'idTurma'
      })
    }
  }
  Aulas.init({
    descricao: DataTypes.STRING,
    tipo: DataTypes.STRING,
    data: DataTypes.DATEONLY,
    observacoes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Aulas',
  });
  return Aulas;
};