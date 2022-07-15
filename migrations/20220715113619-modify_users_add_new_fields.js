"use strict";
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn("Users", "password", {
          type: Sequelize.STRING,
        }, { transaction: t }),
        queryInterface.sequelize.query(
          `UPDATE "Users" SET "password" = '12345678';`, 
          { transaction: t }
        ),
        queryInterface.changeColumn("Users", "password",  {
          type: Sequelize.STRING,
          defaultValue: '',
          allowNull: false
        }, { transaction: t })
      ])
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "password");
  },
};


