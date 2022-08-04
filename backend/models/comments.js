'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {
      Comments.belongsTo(models.User, { foreignKey: "userId", as: "user" });

    }
  }
  Comments.init({
    comments :{
      type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'abc/n ab',
        validate: {
          isValid: (value) => {
            var count = (value.match(/\n/g) || []).length;
            if (count < 1) {
              throw new Error("count of comment should not be more then 2 paragraph ");
            }
          },
        },
    },

    userId : DataTypes.INTEGER,
  },
 
  {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};