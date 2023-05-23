"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
 class Album extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
   // define association here
   Album.belongsTo(models.User, {
    as: "Owner",
    foreignKey: "ownerId",
   });
  }
 }
 Album.init(
  {
   name: {
    allowNull: false,
    type: DataTypes.STRING(30),
   },
   category: {
    allowNull: false,
    type: DataTypes.STRING(30),
   },
   createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
   },
   ownerId: {
    type: DataTypes.INTEGER,
   },
  },
  {
   sequelize,
   modelName: "Album",
  }
 );
 return Album;
};
