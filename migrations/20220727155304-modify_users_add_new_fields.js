"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      BEGIN;

      CREATE type enum_users_role AS ENUM('user', 'admin');

      ALTER TABLE "Users"
        ADD COLUMN "role" enum_users_role;
    
      UPDATE "Users" SET "role" = 'user';
    
      ALTER TABLE "Users"
        ALTER COLUMN "role" SET not null;

      COMMIT;
      `
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      BEGIN;
      ALTER TABLE "Users" Drop Column "role";
      DROP TYPE enum_users_role;
      COMMIT;
      `
    );
  },
};
