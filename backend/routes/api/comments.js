// ...
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Photo, Comment } = require("../../db/models");
const router = express.Router();

// ...
const validateAddComment = [
 //checkFalsy: if true, fields with falsy values (eg "", 0, false, null) will also not exist
 check("comment")
  .exists({ checkFalsy: true })
  .isLength({ min: 4, max: 100 })
  .withMessage("Please provide a comment between 4 to 100 characters."),
 handleValidationErrors,
];

//Get all current user's comments
router.get("/current", requireAuth, async (req, res, next) => {
 const currentUser = req.user;
 let where = {
  userId: currentUser.id,
 };
 const allComments = await Comment.findAll({ where });
 let comments = [];
 allComments.forEach((comment) => {
  comments.push(comment.toJSON());
 });

 return res.json(comments);
});

//*******Update a current user's comment
router.put(
 "/:commentId",
 requireAuth,
 validateAddComment,
 async (req, res, next) => {
  let { commentId } = req.params;
  commentId = parseInt(commentId);
  const currentUser = req.user;
  const currentUserId = parseInt(currentUser.id);
  let theComment = await Comment.findByPk(commentId);

  if (!theComment) {
   res.status(404);
   return res.json({
    message: "Comment couldn't be found",
    statusCode: 404,
   });
  }

  const userId = parseInt(theComment.userId);
  if (currentUserId !== userId) {
   res.status(401);
   return res.json({
    message: "Not your booking. Please try other booking numbers.",
    statusCode: 401,
   });
  }

  const { comment } = req.body;

  theComment.set({
   comment: comment,
  });
  await theComment.save();

  res.status(201);
  return res.json(theComment);
 }
);

//Delete a current user's comment
router.delete("/:commentId", requireAuth, async (req, res, next) => {
 let { commentId } = req.params;
 commentId = parseInt(commentId);
 res.status(200);

 const theComment = await Comment.findByPk(commentId);

 if (!theComment) {
  res.status(404);
  return res.json({
   message: "Comment couldn't be found",
   statusCode: 404,
  });
 }

 await theComment.destroy();
 res.status(200);

 return res.json({
  message: "Successfully deleted",
  statusCode: 200,
 });
});

module.exports = router;
