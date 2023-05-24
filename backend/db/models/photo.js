"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
 class Photo extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
   // define association here
   Photo.hasMany(models.AlbumPhoto, {
    foreignKey: "photoId",
    onDelete: "CASCADE",
    hooks: true,
   });
   Photo.belongsTo(models.User, {
    as: "Owner",
    foreignKey: "ownerId",
   });

   Photo.hasMany(models.Comment, {
    foreignKey: "photoId",
    onDelete: "CASCADE",
    hooks: true,
   });
   //  Photo.belongsToMany(models.User, {
   //   through: models.Comment,
   //   foreignKey: "photoId",
   //   otherKey: "userId",
   //  });
  }
 }
 Photo.init(
  {
   title: {
    allowNull: false,
    type: DataTypes.STRING(30),
   },
   key: {
    type: DataTypes.STRING,
    allowNull: false,
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
   modelName: "Photo",
  }
 );
 return Photo;
};
