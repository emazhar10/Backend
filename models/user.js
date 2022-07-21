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
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
          throw new Error("Do not try to set the `fullName` value!");
        },
      },
      
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "Email is not valid"
          }, 
          isUnique: async (value) => {
            const user = await User.findOne({where: {email: value}})
            if(user) {
              throw new Error("User with this email already exists");
            }
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isValid: (value) => {
            if (value.length < 8) {
              throw new Error("Password should be 8 characters long");
            }
          }
        }
      },
      // createdAt: {
      //   allowNull: false,
      //   type: DataTypes.DATE
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: DataTypes.DATE
      // }
    },
    {
      sequelize,
      modelName: "User",
    }
    
  );
  return User;
};
