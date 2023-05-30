const { Op } = require("sequelize");
const { retrievePrivateFile } = require("../../awsS3");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Album, AlbumPhoto, Photo } = require("../../db/models");
const router = express.Router();
// ...
const validateAddAlbum = [
 //checkFalsy: if true, fields with falsy values (eg "", 0, false, null) will also not exist
 check("name")
  .exists({ checkFalsy: true })
  .isLength({ min: 2, max: 30 })
  .withMessage("Please provide a name between 2 to 30 characters."),
 check("category")
  .exists({ checkFalsy: true })
  .isLength({ max: 30 })
  .withMessage("Category is required."),
 handleValidationErrors,
];

//GET current user's albums
router.get("/current", async (req, res, next) => {
 const currentUser = req.user;
 let where = { ownerId: currentUser.id };
 const theAlbums = await Album.findAll({
  where,
  include: [{ model: AlbumPhoto, include: { model: Photo } }],
 });

 //console.log(JSON.stringify(theAlbums, null, 2));

 let albums = [];

 theAlbums.map((album) => {
  console.log();
  albums.push(album.toJSON());
 });

 return res.json(albums);
});

//GET a album by albumId
router.get("/:albumId", async (req, res, next) => {
 const albumId = req.params.albumId;
 //let where = { ownerId: currentUser.id };
 const album = await Album.findByPk(parseInt(albumId), {
  //where,
  include: [{ model: AlbumPhoto, include: { model: Photo } }],
 });

 //console.log(JSON.stringify(theAlbums, null, 2));

 return res.json(album);
});

//Add a new album
router.post("/", requireAuth, validateAddAlbum, async (req, res, next) => {
 const currentUser = req.user;
 const userId = parseInt(currentUser.id);
 const { name, category } = req.body;

 const newAlbum = await Album.create({
  name,
  category,
  ownerId: userId,
 });

 //console.log(JSON.stringify(theAlbums, null, 2));

 return res.json(newAlbum);
});

//Delete a album
router.delete("/:albumId", requireAuth, async (req, res, next) => {
 const albumId = req.params.albumId;
 const currentUser = req.user;
 const userId = parseInt(currentUser.id);

 const album = Album.findByPk(parseInt(albumId));

 if (!album) {
  res.status(404);
  return res.json({
   message: "Album couldn't be found",
   statusCode: 404,
  });
 }

 if (album.ownerId !== userId) {
  res.status(401);
  return res.json({
   message: "Not your album. Please try other album id",
   statusCode: 401,
  });
 }

 await album.destroy();

 return res.json({
  message: "Successfully deleted",
  statusCode: 200,
 });
});

//*GET ALL Current user's PHOTO not in aibum(albumId)

router.get("/:albumId/photos/current", requireAuth, async (req, res, next) => {
 const currentUser = req.user;
 const albumId = req.params.albumId;

 console.log("currentUser.id: ", currentUser.id);
 const allPhotos = await Photo.findAll({
  where: { ownerId: currentUser.id },
 });

 const albumPhotos = await Photo.findAll({
  where: { ownerId: currentUser.id },
  include: [
   {
    model: AlbumPhoto,
    where: { albumId: parseInt(albumId) },
    required: true,
   },
  ],
 });

 let photos = [];
 allPhotos.forEach((photo) => {
  let inAlbum = false;
  albumPhotos.forEach((albumPhoto) => {
   console.log(
    "photo.id, albumPhoto.AlbumPhotos.photoId",
    photo.id,
    albumPhoto.id
   );
   if (photo.id === albumPhoto.id) inAlbum = true;
  });
  if (inAlbum === false) {
   let imageUrl = retrievePrivateFile(photo.key);
   let thePhoto = { ...photo.toJSON(), imageUrl };
   photos.push(thePhoto);
  }
 });
 return res.json(photos);
});

//add an albumPhoto by albumId
router.post("/:albumId/albumPhotos", requireAuth, async (req, res, next) => {
 const albumId = req.params.albumId;
 const currentUser = req.user;
 const userId = parseInt(currentUser.id);

 const album = await Album.findByPk(parseInt(albumId));

 if (!album) {
  res.status(404);
  return res.json({
   message: "Album couldn't be found",
   statusCode: 404,
  });
 }

 console.log("album.ownerId, userId", album.ownerId, userId);

 if (album.ownerId !== userId) {
  res.status(401);
  return res.json({
   message: "Not your album. Please try other album id",
   statusCode: 401,
  });
 }

 const { photoId } = req.body;
 const albumPhoto = await AlbumPhoto.create({
  photoId,
  albumId,
 });

 res.json(albumPhoto);
});

module.exports = router;
