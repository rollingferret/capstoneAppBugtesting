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
  options.tableName = "Comments";
  return queryInterface.bulkInsert(
   options,
   [
    {
     //1
     photoId: 1,
     userId: 2,
     comment: "Wonderful image. Congrats on Explore.",
    },
    {
     //2
     photoId: 1,
     userId: 3,
     comment: "Gorgeous shot",
    },
    {
     //3
     photoId: 2,
     userId: 3,
     comment: "hi there! I really like your gallery, you are very talented!",
    },
    {
     //4
     photoId: 2,
     userId: 4,
     comment: "mind-blowing light!",
    },
    {
     //5
     photoId: 3,
     userId: 4,
     comment: "This is a great shot, well done.",
    },
    {
     //6
     photoId: 3,
     userId: 5,
     comment:
      "Excellent picture , the lighting and focus on this one is spot on perfection. Wonderful capture.",
    },
    {
     //7
     photoId: 4,
     userId: 5,
     comment: "What light and colours !",
    },
    {
     //8
     photoId: 4,
     userId: 6,
     comment: "A very pretty looking photograph.",
    },
    {
     //9
     photoId: 5,
     userId: 6,
     comment:
      "Fabulous shot! Marvelous colors and details! The light is fantastic!",
    },
    {
     //10
     photoId: 5,
     userId: 1,
     comment: "Truly a Beautiful Damoiselle, beautiful capture",
    },
    {
     //11
     photoId: 6,
     userId: 1,
     comment: "This is so pretty amazing!",
    },
    {
     //12
     photoId: 6,
     userId: 2,
     comment: "Just lovely !!! Excellent light and composition !",
    },
    {
     //13
     photoId: 7,
     userId: 4,
     comment: "Fantastic shot, nice composition.",
    },
    {
     //14
     photoId: 7,
     userId: 5,
     comment:
      "I found your treasure at paradise!Thank you for sharing with us!",
    },
    {
     //15
     photoId: 8,
     userId: 5,
     comment: "Remarkable colours there! Great shot!",
    },
    {
     //16
     photoId: 8,
     userId: 6,
     comment: "Fabulous shot. Great colours and detail.",
    },
    {
     //17
     photoId: 9,
     userId: 6,
     comment: "My goodness, that's one to frame !!! Great job!",
    },
    {
     //18
     photoId: 9,
     userId: 1,
     comment: "Lovely capture.",
    },
    {
     //19
     photoId: 10,
     userId: 1,
     comment:
      "Great shot and stream with fantastic photos thanks for sharing them...!",
    },
    {
     //20
     photoId: 10,
     userId: 6,
     comment: "Lovely balance to this one!",
    },
    {
     //21
     photoId: 11,
     userId: 6,
     comment: "Wonderful colour and transparency!",
    },
    {
     //22
     photoId: 11,
     userId: 1,
     comment:
      "Wow.. this is amazingly beautiful!! Really an excellent work!! Brava!",
    },
    {
     //23
     photoId: 12,
     userId: 1,
     comment: "So Beautiful Nice Color & Light Perfect Job Bravoo!",
    },
    {
     //24
     photoId: 12,
     userId: 2,
     comment: "beautiful click!",
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
