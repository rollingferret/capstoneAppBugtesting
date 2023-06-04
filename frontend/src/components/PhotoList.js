import React from "react";
import PhotoTile from "./PhotoTile";
import GalleryTile from "./GalleryTile";
import NotInAlbumPhotoTile from "./NotInAlbumPhotoTile";

function PhotoList({ photos, type, user }) {
 console.log("PhotoList photos: ", photos);
 if (type === "photo")
  return photos?.map((photo) => (
   <div key={photo?.id}>
    <PhotoTile photo={photo} user={user} />{" "}
   </div>
  ));
 else if (type === "photo-but-album")
  return photos?.map((photo) => (
   <div className="PhotoList-phototile" key={photo?.id}>
    <NotInAlbumPhotoTile photo={photo} user={user} />{" "}
   </div>
  ));
 else
  return photos?.map((photo) => (
   <div key={photo?.id}>
    <GalleryTile photo={photo} user={user} />{" "}
   </div>
  ));
}
export default PhotoList;
