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
  options.tableName = "AlbumPhotos";
  return queryInterface.bulkInsert(
   options,
   [
    {
     photoId: 1,
     albumId: 1,
    },
    {
     photoId: 2,
     albumId: 4,
    },
    {
     photoId: 3,
     albumId: 7,
    },
    {
     photoId: 4,
     albumId: 9,
    },
    {
     photoId: 5,
     albumId: 11,
    },
    {
     photoId: 6,
     albumId: 13,
    },
    {
     photoId: 7,
     albumId: 2,
    },
    {
     photoId: 8,
     albumId: 5,
    },
    {
     photoId: 9,
     albumId: 8,
    },
    {
     photoId: 10,
     albumId: 10,
    },
    {
     photoId: 11,
     albumId: 12,
    },
    {
     photoId: 12,
     albumId: 14,
    },
    {
     photoId: 13,
     albumId: 3,
    },
    {
     photoId: 14,
     albumId: 6,
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
  options.tableName = "AlbumPhotos";
  await queryInterface.bulkDelete(options, null, {});
 },
};
