// ...

const {
 singleFileDelete,
 singleFileUpload,
 multipleFilesUpload,
 retrievePrivateFile,
 singleMulterUpload,
 multipleMulterUpload,
} = require("../../awsS3");

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
 check("title")
  .exists({ checkFalsy: true })
  .isLength({ min: 4, max: 30 })
  .withMessage("Please provide a title between 4 to 30 characters."),
 //  check("url")
 //   .isLength({ max: 256 })
 //   .exists({ checkFalsy: true })
 //   .withMessage("Please provide a url between 4 to 256 characters."),
 handleValidationErrors,
];

//GET PHOTO
router.get("/", async (req, res, next) => {
 const allPhotos = await Photo.findAll();
 let photos = [];
 allPhotos.forEach((photo) => {
  let imageUrl = retrievePrivateFile(photo.key);
  let thePhoto = { ...photo.toJSON(), imageUrl };
  photos.push(thePhoto);
 });
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
  let imageUrl = retrievePrivateFile(photo.key);
  let thePhoto = { ...photo.toJSON(), imageUrl };
  photos.push(thePhoto);
 });
 return res.json(photos);
});

//Get details of a photo from an id
router.get("/:photoId", requireAuth, async (req, res, next) => {
 const { photoId } = req.params;

 //console.log("photoId: ", photoId);
 const photo = await Photo.findByPk(parseInt(photoId));
 let imageUrl = retrievePrivateFile(photo.key);
 let thePhoto = { ...photo.toJSON(), imageUrl };
 //console.log("photo: ", photo);
 return res.json(thePhoto);
});

//#Create a photo owned by current User
router.post(
 "/",
 singleMulterUpload("image"),
 requireAuth,
 validateAddPhoto,
 async (req, res, next) => {
  const currentUser = req.user;
  console.log(currentUser, 'currentUser-------------------------')
  let ownerId = parseInt(currentUser.id);
  console.log(ownerId, 'ownerId-------------------------')
  //console.log("ownerId: ", ownerId);
  let key = await singleFileUpload({ file: req.file });
  console.log(key, 'key-------------------------'')
  let { title } = req.body;
  console.log(title, 'title-------------------------')

  let newPhoto = await Photo.create({
   title,
   key,
   ownerId,
  });

  console.log(newPhoto, 'newPhoto-------------------------')

  //console.log("newPhoto: ", newPhoto);
  const imageUrl = retrievePrivateFile(newPhoto.key);
  console.log(imageUrl, 'imageUrl-------------------------')
  //const { id, updatedAt, createdAt } = newPhoto;
  //const photo = { id, title, key, ownerId, imageUrl, updatedAt, createdAt };
  const photo = { ...newPhoto.toJSON(), imageUrl };
  console.log(photo, 'photo-------------------------')
  res.status(201);
  return res.json(photo);
 }
);

//update a photo owned by current User
router.put(
 "/:photoId",
 singleMulterUpload("image"),
 requireAuth,
 validateAddPhoto,
 async (req, res, next) => {
  //const currentUser = req.user;
  //const ownerId = parseInt(currentUser.id);
  //console.log("ownerId: ", ownerId);
  const { photoId } = req.params;
  const key = await singleFileUpload({ file: req.file });
  const { title } = req.body;
  //console.log({ title, url });
  const thePhoto = await Photo.findByPk(photoId);
  //console.log("thePhoto: ", thePhoto);

  thePhoto.set({
   title,
   key,
  });

  await thePhoto.save();

  const imageUrl = retrievePrivateFile(thePhoto.key);

  const photo = { ...thePhoto.toJSON(), imageUrl };

  res.status(201);
  return res.json(photo);
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

 const err = await singleFileDelete(thePhoto.key);
 if (err) {
  res.status(400);
  return res.json(err);
 }
 await thePhoto.destroy();
 console.log("hahaha");
 return res.json({
  message: "Successfully deleted",
  statusCode: 200,
 });
});

//*******Get all comments by a photo
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

 console.log("!!!-------comments: ", comments);

 res.status(201);
 return res.json(comments);
});

//*******Create a comment for a photo
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
