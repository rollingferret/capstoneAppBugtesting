const express = require("express");
const router = express.Router();
const { AlbumPhoto } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

//delete an albumPhoto by albumPhotoId
//no validation on photoId, albumId
router.delete("/:albumPhotoId", requireAuth, async (req, res, next) => {
 const albumPhotoId = req.params.albumPhotoId;

 const albumPhoto = AlbumPhoto.findByPk(parseInt(albumPhotoId));

 if (!albumPhoto) {
  res.status(404);
  return res.json({
   message: "photo couldn't be found in this album",
   statusCode: 404,
  });
 }

 await albumPhoto.distroy();

 res.json({
  message: "Successfully deleted",
  statusCode: 200,
 });
});

module.exports = router;
