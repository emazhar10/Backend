'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {
     Comments.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Comments.belongsTo(models.Posts, { foreignKey: "postId", as: "post" })

      // Comments.associate = function (models) {
      //   Comments.belongsTo(models.User, {
      //     foreignKey: 'userId',
      //     as: 'user'
      //   });
      //   Comments.belongsTo(models.Posts, {
      //     foreignKey: 'postId'
      //   });
      // };
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
    postId : DataTypes.INTEGER

  },
 
  {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};