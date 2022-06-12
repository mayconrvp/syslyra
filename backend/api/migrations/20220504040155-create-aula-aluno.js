'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Aula_aluno', {

      idAula: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {model: 'Aulas', key: 'id'}
      },
      idAluno: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {model: 'Alunos', key: 'id'}
      },
      idAvaliacao: {
        type: Sequelize.INTEGER,
        references: {model: 'Avaliacoes', key: 'id'}
      },
      nota: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Aula_aluno');
  }
};