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
  .withMessage("Comment is required."),
 handleValidationErrors,
];

//Get details of a photo from an id
router.get("/:commentId", requireAuth, async (req, res, next) => {
 const { commentId } = req.params;

 return res.json(commentId);
});

//*******Update a Review
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

//Delete a comment
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
