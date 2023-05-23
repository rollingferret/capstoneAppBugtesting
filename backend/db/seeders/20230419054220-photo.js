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
  options.tableName = "Photos";
  return queryInterface.bulkInsert(
   options,
   [
    {
     title: "tulips",
     key: "tulips.jpg",
     ownerId: 1,
    },
    {
     title: "trail-in-the-wood",
     key: "trail-in-the-wood.jpg",
     ownerId: 2,
    },
    {
     title: "glasses",
     key: "glasses.jpg",
     ownerId: 3,
    },
    {
     title: "cabin-by-lake",
     key: "cabin-by-lake.jpg",
     ownerId: 4,
    },
    {
     title: "alocasia",
     key: "alocasia.jpg",
     ownerId: 5,
    },
    {
     title: "petal",
     key: "petal.jpg",
     ownerId: 6,
    },
    {
     title: "slug",
     key: "slug.jpg",
     ownerId: 1,
    },
    {
     title: "street-at-night",
     key: "street-at-night.jpg",
     ownerId: 2,
    },
    {
     title: "temple-in-mountain",
     key: "temple-in-mountain.jpg",
     ownerId: 3,
    },
    {
     title: "sunset-on-beach",
     key: "sunset-on-beach.jpg",
     ownerId: 4,
    },
    {
     title: "tree",
     key: "tree.jpg",
     ownerId: 5,
    },
    {
     title: "ship",
     key: "ship.jpg",
     ownerId: 6,
    },
    {
     title: "lake-on-mountain",
     key: "lake-on-mountain.jpg",
     ownerId: 1,
    },
    {
     title: "bird-dance",
     key: "bird-dance.jpg",
     ownerId: 2,
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
  options.tableName = "Photos";
  await queryInterface.bulkDelete(options, null, {});
 },
};
