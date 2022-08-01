"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    static associate(models) {
      Posts.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }
  Posts.init(
    {
      body: DataTypes.STRING,
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );

  return Posts;
};
