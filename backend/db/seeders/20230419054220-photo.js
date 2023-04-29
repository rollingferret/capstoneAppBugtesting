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
     title: "bee",
     url: "https://live.staticflickr.com/65535/52826191166_1965667130.jpg",
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
     title: "sunset",
     url: "https://live.staticflickr.com/5468/17759455678_1ccce31ff0_n.jpg",
     ownerId: 1,
    },
    {
     title: "color pencils",
     url: "https://live.staticflickr.com/8685/16725361070_32b6cb5178_w.jpg",
     ownerId: 2,
    },
    {
     title: "fruits",
     url: "https://live.staticflickr.com/3722/10919420755_7d32511b26_n.jpg",
     ownerId: 3,
    },
    {
     title: "hot ballon",
     url: "https://live.staticflickr.com/374/31388191222_77c14f090a_n.jpg",
     ownerId: 4,
    },
    {
     title: "peacock",
     url: "https://live.staticflickr.com/4328/35436444254_c253056629_n.jpg",
     ownerId: 5,
    },
    {
     title: "golden bridge",
     url: "https://live.staticflickr.com/1451/24456765014_d8a934865e_n.jpg",
     ownerId: 6,
    },
    {
     title: "rooster",
     url: "https://live.staticflickr.com/65535/50711423847_7075a64f8f_n.jpg",
     ownerId: 1,
    },
    {
     title: "turtle",
     url: "https://live.staticflickr.com/2813/34047270401_0404ac9d9c_w.jpg",
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
