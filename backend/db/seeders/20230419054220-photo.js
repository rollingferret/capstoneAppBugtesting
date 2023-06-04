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
    {
     title: "bird-perch",
     key: "bird-perch.jpg",
     ownerId: 1,
    },
    {
     title: "light-house",
     key: "light-house.jpg",
     ownerId: 2,
    },
    {
     title: "rock-cliff",
     key: "rock-cliff.jpg",
     ownerId: 3,
    },
    {
     title: "stalking-cat",
     key: "stalking-cat.jpg",
     ownerId: 4,
    },
    {
     title: "watching-cat",
     key: "watching-cat.jpg",
     ownerId: 5,
    },
    {
     title: "old-tree",
     key: "old-tree.jpg",
     ownerId: 6,
    },
    {
     title: "sparrow-hawk",
     key: "sparrow-hawk.jpg",
     ownerId: 1,
    },
    {
     title: "Milky-Way-Mandu-Gorge",
     key: "Milky-Way-Mandu-Gorge.jpg",
     ownerId: 2,
    },
    {
     title: "water-games",
     key: "water-games.jpg",
     ownerId: 3,
    },
    {
     title: "field",
     key: "field.jpg",
     ownerId: 4,
    },
    {
     title: "ladybugs",
     key: "ladybugs.jpg",
     ownerId: 5,
    },
    {
     title: "lonely-island",
     key: "lonely-island.jpg",
     ownerId: 6,
    },
    {
     title: "duck-head",
     key: "duck-head.jpg",
     ownerId: 1,
    },
    {
     title: "dragonfly",
     key: "dragonfly.jpg",
     ownerId: 2,
    },
    {
     title: "Italie-fontaine",
     key: "Italie-fontaine.jpg",
     ownerId: 3,
    },
    {
     title: "roadside-hawk",
     key: "roadside-hawk.jpg",
     ownerId: 4,
    },
    {
     title: "historic-hotel",
     key: "historic-hotel.jpg",
     ownerId: 5,
    },
    {
     title: "Tribune-Tower",
     key: "Tribune-Tower.jpg",
     ownerId: 6,
    },
    {
     title: "Tower-of-London",
     key: "Tower-of-London.jpg",
     ownerId: 1,
    },
    {
     title: "historic-Pothole",
     key: "historic-Pothole.jpg",
     ownerId: 2,
    },
    {
     title: "Historic-Springfield-Cruise",
     key: "Historic-Springfield-Cruise.jpg",
     ownerId: 3,
    },
    {
     title: "play-ball-dog",
     key: "play-ball-dog.jpg",
     ownerId: 4,
    },
    {
     title: "dog-friendship",
     key: "dog-friendship.jpg",
     ownerId: 5,
    },
    {
     title: "dog-king",
     key: "dog-king.jpg",
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
  options.tableName = "Photos";
  await queryInterface.bulkDelete(options, null, {});
 },
};
