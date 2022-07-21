"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      fullName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: { 
        type: DataTypes.STRING, 
        allowNull: false,
        set(value) {
          if(value.length < 8) {
            throw new Error("Password should be 8 characters long");
          }
          this.setDataValue('password', value);
        }
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
