"use strict";
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      // return Promise.all([
      //   queryInterface.addColumn("Posts", "commentId", {
      //     type: Sequelize.INTEGER,
      //   }, { transaction: t }),
      //   queryInterface.sequelize.query(
      //     `UPDATE "Posts" SET "commentId" = '1';`, 
      //     { transaction: t }
      //   ),
      //   queryInterface.changeColumn("Posts", "commentId",  {
      //     type: Sequelize.INTEGER,
      //     defaultValue: '1',
      //     allowNull: false
      //   }, { transaction: t })
      // ])
    })
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.removeColumn("Posts", "commentId");
  },
};