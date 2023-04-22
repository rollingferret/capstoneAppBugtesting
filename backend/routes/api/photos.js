// ...
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
// ...
const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Photo, Comment, User } = require("../../db/models");

const router = express.Router();

// ...
const validateAddPhoto = [
 //checkFalsy: if true, fields with falsy values (eg "", 0, false, null) will also not exist
 check("title").exists({ checkFalsy: true }).withMessage("Title is required."),
 check("url").exists({ checkFalsy: true }).withMessage("Url is required."),
 handleValidationErrors,
];

//GET PHOTO
router.get("/", async (req, res, next) => {
 const allPhotos = await Photo.findAll();
 let photos = [];
 allPhotos.forEach((photo) => {
  photos.push(photo.toJSON());
 });
 console.log("********photos: ", photos);
 return res.json(photos);
});

//GET ALL Current user's PHOTO
router.get("/current", requireAuth, async (req, res, next) => {
 const currentUser = req.user;
 let where = {
  ownerId: currentUser.id,
 };
 console.log("currentUser.id: ", currentUser.id);
 const allPhotos = await Photo.findAll({ where });
 let photos = [];
 allPhotos.forEach((photo) => {
  photos.push(photo.toJSON());
 });
 console.log("********photos: ", photos);
 return res.json(photos);
});

//Get details of a photo from an id
router.get("/:photoId", requireAuth, async (req, res, next) => {
 const { photoId } = req.params;

 //console.log("photoId: ", photoId);
 const photo = await Photo.findByPk(parseInt(photoId));
 //console.log("photo: ", photo);
 return res.json(photo);
});

//Create a photo owned by current User
router.post("/", requireAuth, validateAddPhoto, async (req, res, next) => {
 const currentUser = req.user;
 const ownerId = parseInt(currentUser.id);
 //console.log("ownerId: ", ownerId);
 const { title, url } = req.body;
 //console.log({ title, url });
 const newPhoto = await Photo.create({
  title,
  url,
  ownerId,
 });

 //console.log("newPhoto: ", newPhoto);
 res.status(201);
 return res.json(newPhoto);
});

//update a photo owned by current User
router.put(
 "/:photoId",
 requireAuth,
 validateAddPhoto,
 async (req, res, next) => {
  //const currentUser = req.user;
  //const ownerId = parseInt(currentUser.id);
  //console.log("ownerId: ", ownerId);
  const { photoId } = req.params;
  const { title, url } = req.body;
  //console.log({ title, url });
  const thePhoto = await Photo.findByPk(photoId);
  //console.log("thePhoto: ", thePhoto);

  thePhoto.set({
   title,
   url,
  });

  await thePhoto.save();

  res.status(201);
  return res.json(thePhoto);
 }
);

//delete
router.delete("/:photoId", requireAuth, async (req, res, next) => {
 const { photoId } = req.params;

 //console.log("photoId: ", photoId);

 const thePhoto = await Photo.findByPk(parseInt(photoId));

 if (!thePhoto) {
  res.status(404);
  return res.json({
   message: "Photo couldn't be found",
   statusCode: 404,
  });
 }

 await thePhoto.destroy();
 res.status(200);
 return res.json({
  message: "Successfully deleted",
  statusCode: 200,
 });
});

//*******Get all Reviews by a photo
router.get("/:photoId/comments", requireAuth, async (req, res, next) => {
 let { photoId } = req.params;
 photoId = parseInt(photoId);

 let where = {
  photoId,
 };

 const comments = await Comment.findAll({
  where,
  include: [{ model: User, attibutes: ["firstname", "lastname"] }],
  raw: true,
 });

 console.log("!!!-------      comments: ", comments);

 res.status(201);
 return res.json(comments);
});

//*******Create a Review for a photo
router.post("/:photoId/comments", requireAuth, async (req, res, next) => {
 let { photoId } = req.params;
 photoId = parseInt(photoId);
 const currentUser = req.user;
 const userId = parseInt(currentUser.id);

 const { comment } = req.body;

 const newComment = await Comment.create({
  comment,
  photoId,
  userId,
 });

 res.status(201);
 return res.json(newComment);
});

//Error handler to log errors
router.use((errors, _req, res, _next) => {
 res.status(400);
 return res.json({
  message: "Validation Error",
  statusCode: 400,
  errors,
 });
});
//
module.exports = router;
