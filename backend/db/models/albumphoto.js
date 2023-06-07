"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
 class AlbumPhoto extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
   // define association here
   AlbumPhoto.belongsTo(models.Album, {
    foreignKey: "albumId",
   });

   AlbumPhoto.belongsTo(models.Photo, {
    foreignKey: "photoId",
   });
  }
 }

 AlbumPhoto.init(
  {
   photoId: {
    type: DataTypes.INTEGER,
   },
   albumId: {
    type: DataTypes.INTEGER,
   },
  },
  {
   sequelize,
   modelName: "AlbumPhoto",
   indexes: [
    {
     unique: true,
     fields: ["photoId", "albumId"],
    },
   ],
  }
 );
 return AlbumPhoto;
};
