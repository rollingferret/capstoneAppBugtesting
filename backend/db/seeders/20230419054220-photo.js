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
     title: "flower",
     url: "https://live.staticflickr.com/65535/52822855984_1f42e940bb_w.jpg",
     ownerId: 1,
    },
    {
     title: "city",
     url: "https://live.staticflickr.com/65535/52825723589_79876a451b_w.jpg",
     ownerId: 2,
    },
    {
     title: "light house",
     url: "https://live.staticflickr.com/65535/52825323371_866e9857c9_w.jpg",
     ownerId: 3,
    },
    {
     title: "dock",
     url: "https://live.staticflickr.com/65535/52825817422_692e969e98_w.jpg",
     ownerId: 4,
    },
    {
     title: "fireengin",
     url: "https://live.staticflickr.com/65535/52824244412_fc318b4ae3_n.jpg",
     ownerId: 5,
    },
    {
     title: "temple",
     url: "https://live.staticflickr.com/65535/52826798471_a97158ca4c_n.jpg",
     ownerId: 6,
    },
    {
     title: "bee",
     url: "https://live.staticflickr.com/65535/52826191166_1965667130.jpg",
     ownerId: 1,
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
