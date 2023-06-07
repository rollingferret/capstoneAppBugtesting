import React, { useState, useEffect } from "react";

function AlbumPhotoTile({ albumPhoto, user, setSelectedAlbumPhotos }) {
 const [select, setSelect] = useState(false);

 useEffect(() => {
  if (select) {
   setSelectedAlbumPhotos((prev) => {
    prev[albumPhoto.id] = albumPhoto.id;
    return prev;
   });
  } else {
   setSelectedAlbumPhotos((prev) => {
    delete prev[albumPhoto.id];
    return prev;
   });
  }
 }, [select]);
 return (
  <div
   className="photo-box"
   style={{
    position: "relative",
    backgroundImage: `url(${albumPhoto?.imageUrl})`,
    width: "120px",
    height: "96px",
    backgroundSize: "cover",
    backgroundPosition: "center",
   }}
  >
   <div
    className="circle-check-icon-box"
    onClick={() => setSelect((prev) => !prev)}
   >
    {select ? (
     <i className="fa-regular fa-circle-check"></i>
    ) : (
     <i className="fa-regular fa-circle"></i>
    )}
   </div>
  </div>
 );
}
export default AlbumPhotoTile;
