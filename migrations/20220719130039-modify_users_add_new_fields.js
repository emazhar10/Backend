module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Users", "fullName", {
        type: Sequelize.STRING,
      })
      ])
    },
   
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "fullNmae");
  },
};


