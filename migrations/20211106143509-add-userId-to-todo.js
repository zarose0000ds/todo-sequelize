'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Todos', 'UserId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Todos', 'UserId')
  }
};
