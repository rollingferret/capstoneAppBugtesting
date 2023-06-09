"use strict";
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
 options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
 async up(queryInterface, Sequelize) {
  await queryInterface.createTable(
   "Photos",
   {
    id: {
     allowNull: false,
     autoIncrement: true,
     primaryKey: true,
     type: Sequelize.INTEGER,
    },
    title: {
     allowNull: false,
     type: Sequelize.STRING,
    },
    key: {
     type: Sequelize.STRING,
     allowNull: false,
    },
    ownerId: {
     type: Sequelize.INTEGER,
     references: {
      model: "Users",
     },
    },
    createdAt: {
     allowNull: false,
     type: Sequelize.DATE,
     defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
     allowNull: false,
     type: Sequelize.DATE,
     defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
   },
   options
  );
 },
 async down(queryInterface, Sequelize) {
  options.tableName = "Photos";
  await queryInterface.dropTable(options);
 },
};
