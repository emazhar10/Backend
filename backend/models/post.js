"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    static associate(models) {
    Posts.hasMany(models.Comments, { foreignKey: "postId", as: "comments"});
     Posts.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    //  Posts.associate = function (models) {
    //   Posts.belongsTo(models.Comments, {
    //     foreignKey: 'userId',
    //     as: 'comments'
    //   });
    //   Posts.hasMany(models.User, {
    //     foreignKey: 'UserId'
    //   });
    // };
  
    }
  }
  Posts.init(
    {
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isValid: (value) => {
            var count = (value.match(/\n/g) || []).length;
            if (count < 4) {
              throw new Error("count of paragraph should not be less then 5");
            }
          },
        },
      },
      userId: DataTypes.INTEGER,
      //commentId: DataTypes.INTEGER,
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isUnique: async (value) => {
            const post = await Posts.findOne({ where: { title: value } });
            console.log(post);
            if (post) {
              throw new Error("post with this title already exists");
            }
   
          },
        },
      },
    },

    {
      sequelize,
      modelName: "Posts",
    }
  );

  return Posts;
};
