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

//GET a album
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
router.post("/", requireAuth, async (req, res, next) => {
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

module.exports = router;
