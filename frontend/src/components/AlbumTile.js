import React from "react";
import { NavLink } from "react-router-dom";
import OpenModalButton from "./OpenModalButton";
//import AddEditPhotoFormModal from "./AddEditPhotoFormModal";
import DeleteAlbumFormModal from "./DeleteAlbumFormModal";
import AlbumEdit from "./AlbumEdit";

function AlbumTile({ album, user }) {
 let imageUrl;
 album && album.AlbumPhotos.length !== 0
  ? (imageUrl = album.AlbumPhotos[0].imageUrl)
  : (imageUrl = "/image-not-available.jpg");

 if (!album) return null;
 else
  return (
   <div>
    <div
     style={{
      width: "280px",
      borderTop: "2px solid #000000",
      margin: "auto",
      marginBottom: "3px",
     }}
    ></div>
    <div
     style={{
      width: "290px",
      borderTop: "2px solid #000000",
      margin: "auto",
      marginBottom: "3px",
     }}
    ></div>
    <div
     className="photo-box"
     style={{
      position: "relative",
      backgroundImage: `url(${imageUrl})`,
      width: "300px",
      height: "240px",
      backgroundSize: "cover",
      backgroundPosition: "center",
     }}
    >
     {album && album.AlbumPhotos.length !== 0 ? (
      <NavLink exact to={`/albums/${album?.id}`}>
       <div
        style={{
         position: "absolute",
         top: "0",
         minWidth: "100%",
         minHeight: "168px",
         backgroundSize: "cover",
        }}
       ></div>
      </NavLink>
     ) : (
      <div
       style={{
        position: "absolute",
        top: "0",
        minWidth: "100%",
        minHeight: "168px",
        backgroundSize: "cover",
       }}
      ></div>
     )}
     <div className="photo-tile-icon-box">
      <div>
       <div className="small-text photo-text">{album.name}</div>
      </div>
      <div className="photo-tile-icons">
       <OpenModalButton
        btnclassname="OpenModal-btn edit-delete-photo"
        buttonText={
         <i className="fa-solid fa-pen-to-square photo-tile-btn"></i>
        }
        modalComponent={<AlbumEdit user={user} albumId={album?.id} />}
       />
       <OpenModalButton
        btnclassname="OpenModal-btn edit-delete-photo"
        buttonText={<i className="fa-solid fa-trash-can photo-tile-btn"></i>}
        modalComponent={<DeleteAlbumFormModal album={album} />}
       />
      </div>
     </div>
    </div>
   </div>
  );
}
export default AlbumTile;
