"use strict";

/** @type {import('sequelize-cli').Migration} */

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
  options.tableName = "Albums";
  return queryInterface.bulkInsert(
   options,
   [
    {
     name: "flower",
     category: "plant",
     ownerId: 1,
    },
    {
     name: "worm",
     category: "animal",
     ownerId: 1,
    },
    {
     name: "lake",
     category: "landscape",
     ownerId: 1,
    },
    {
     name: "trail",
     category: "landscape",
     ownerId: 2,
    },
    {
     name: "street",
     category: "structure",
     ownerId: 2,
    },
    {
     name: "bird",
     category: "animal",
     ownerId: 2,
    },
    {
     name: "glasses",
     category: "things",
     ownerId: 3,
    },
    {
     name: "temple",
     category: "building",
     ownerId: 3,
    },
    {
     name: "beach",
     category: "landscape",
     ownerId: 4,
    },
    {
     name: "cabin",
     category: "building",
     ownerId: 4,
    },
    {
     name: "flower",
     category: "plant",
     ownerId: 5,
    },
    {
     name: "tree",
     category: "plant",
     ownerId: 5,
    },
    {
     name: "flower",
     category: "plant",
     ownerId: 6,
    },
    {
     name: "ship",
     category: "vehicle",
     ownerId: 6,
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
  options.tableName = "Albums";
  await queryInterface.bulkDelete(options, null, {});
 },
};
