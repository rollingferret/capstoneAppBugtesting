"use strict";
const { Model, Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
 class User extends Model {
  static associate(models) {
   // define association here
   User.hasMany(models.Photo, {
    foreignKey: "ownerId",
    onDelete: "CASCADE",
    hooks: true,
   });

   User.belongsToMany(models.Photo, {
    through: models.Comment,
    foreignKey: "userId",
    otherKey: "photoId",
   });
  }
 }

 User.init(
  {
   username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
     len: [4, 30],
     isNotEmail(value) {
      if (Validator.isEmail(value)) {
       throw new Error("Cannot be an email.");
      }
     },
    },
   },
   firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
     len: [2, 30],
    },
   },
   lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
     len: [2, 30],
    },
   },
   email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
     len: [3, 256],
     isEmail: true,
    },
   },
   hashedPassword: {
    type: DataTypes.STRING.BINARY,
    allowNull: false,
    validate: {
     len: [60, 60],
    },
   },
  },
  {
   sequelize,
   modelName: "User",
   defaultScope: {
    attributes: {
     exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
    },
   },
  }
 );
 return User;
};
