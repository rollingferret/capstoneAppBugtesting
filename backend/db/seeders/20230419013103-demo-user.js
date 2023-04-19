"use strict";

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
 options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
 async up(queryInterface, Sequelize) {
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
   */
  options.tableName = "Users";
  return queryInterface.bulkInsert(
   options,
   [
    {
     email: "demo@user.io",
     username: "luffyhsien",
     firstname: "Luffy",
     lastname: "Hsien",
     hashedPassword: bcrypt.hashSync("password"),
    },
    {
     email: "user1@user.io",
     username: "lilysmith",
     firstname: "Lily",
     lastname: "Smith",
     hashedPassword: bcrypt.hashSync("password1"),
    },
    {
     email: "user2@user.io",
     username: "tomwilson",
     firstname: "Tom",
     lastname: "Wilson",
     hashedPassword: bcrypt.hashSync("password2"),
    },
    {
     email: "demo3@user.io",
     username: "juliekoo",
     firstname: "Julie",
     lastname: "Koo",
     hashedPassword: bcrypt.hashSync("password3"),
    },
    {
     email: "user4@user.io",
     username: "jimbrown",
     firstname: "Jim",
     lastname: "Brown",
     hashedPassword: bcrypt.hashSync("password4"),
    },
    {
     email: "user5@user.io",
     username: "marywhite",
     firstname: "Mary",
     lastname: "White",
     hashedPassword: bcrypt.hashSync("password5"),
    },
   ],
   {}
  );
 },

 async down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  options.tableName = "Users";
  const Op = Sequelize.Op;
  return queryInterface.bulkDelete(
   options,
   {
    username: {
     [Op.in]: [
      "luffyhsien",
      "lilysmith",
      "tomwilson",
      "juliekoo",
      "jimbrown",
      "marywhite",
     ],
    },
   },
   {}
  );
 },
};
