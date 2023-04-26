import React from "react";
import PhotoTile from "./PhotoTile";
import GalleryTile from "./GalleryTile";

function PhotoList({ photos, type, user }) {
 console.log("PhotoList photos: ", photos);
 if (type === "photo")
  return photos?.map((photo) => (
   <div key={photo?.id}>
    <PhotoTile photo={photo} />{" "}
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
