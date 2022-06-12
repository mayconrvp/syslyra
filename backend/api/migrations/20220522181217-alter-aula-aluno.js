'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn(
      'Aulas_alunos',
      'chamada',
      {
        type: Sequelize.STRING
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Aulas_Alunos', 'chamada'),
    ])
  }
};
