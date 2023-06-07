const express = require("express");
const { AlbumPhoto } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

//delete multiple albumPhotos by albumPhotoIds
//no validation on photoId, albumId
router.delete("/multiAlbumPhotos", requireAuth, async (req, res, next) => {
 const { albumPhotoIds } = req.body;

 console.log("delete albumPhotos   albumPhotoIds: ", albumPhotoIds);

 const promises = albumPhotoIds.map(async (albumPhotoId) => {
  const albumPhoto = await AlbumPhoto.findByPk(albumPhotoId);
  return albumPhoto;
 });

 const albumPhotos = await Promise.all(promises);

 albumPhotos.forEach(async (albumPhoto) => {
  await albumPhoto.destroy();
 });

 return res.json({
  message: "Successfully deleted",
  statusCode: 200,
 });
});

module.exports = router;
