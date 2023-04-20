import React from "react";
import PhotoTile from "./PhotoTile";

function PhotoList({ photos }) {
 return photos?.map((photo) => (
  <div key={photo?.id}>
   <PhotoTile photo={photo} />{" "}
  </div>
 ));
}
export default PhotoList;
