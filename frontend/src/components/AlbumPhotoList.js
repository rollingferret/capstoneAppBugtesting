import React from "react";
import AlbumPhotoTile from "./AlbumPhotoTile";

function AlbumPhotoList({ album, user, setSelectedAlbumPhotos }) {
 console.log("AlbumPhotoList album: ", album);

 return album?.AlbumPhotos?.map((albumPhoto) => (
  <div key={albumPhoto?.id}>
   <AlbumPhotoTile
    albumPhoto={albumPhoto}
    user={user}
    setSelectedAlbumPhotos={setSelectedAlbumPhotos}
   />{" "}
  </div>
 ));
}
export default AlbumPhotoList;
