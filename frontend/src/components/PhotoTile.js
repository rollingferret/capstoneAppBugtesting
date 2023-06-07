import React from "react";
import { NavLink } from "react-router-dom";
import OpenModalButton from "./OpenModalButton";
import AddEditPhotoFormModal from "./AddEditPhotoFormModal";
import DeletePhotoFormModal from "./DeletePhotoFormModal";

function PhotoTile({ photo, user }) {
 return (
  <div
   className="photo-box"
   style={{
    position: "relative",
    backgroundImage: `url(${photo?.imageUrl})`,
    width: "300px",
    height: "240px",
    backgroundSize: "cover",
    backgroundPosition: "center",
   }}
  >
   {/* <img
    key={photo?.imageUrl}
    src={`${photo?.imageUrl}`}
    style={{
     height: "200px",
     width: "250px",
     backgroundSize: "cover",
     backgroundPosition: "center",
     position: "absolute",
     top: "0",
    }}
    alt="imported by author"
   /> */}
   <NavLink exact to={`/photos/${photo?.id}/photoStream`}>
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

   <div className="photo-tile-icon-box">
    <div>
     <div className="small-text photo-text">
      {photo.title}
      {` by ${user.firstname}`}
     </div>
    </div>
    <div className="photo-tile-icons">
     <OpenModalButton
      btnclassname="OpenModal-btn edit-delete-photo"
      buttonText={<i className="fa-solid fa-pen-to-square photo-tile-btn"></i>}
      modalComponent={<AddEditPhotoFormModal formType={"Edit"} photo={photo} />}
     />
     <OpenModalButton
      btnclassname="OpenModal-btn edit-delete-photo"
      buttonText={<i className="fa-solid fa-trash-can photo-tile-btn"></i>}
      modalComponent={<DeletePhotoFormModal photo={photo} />}
     />
    </div>
   </div>
  </div>
 );
}
export default PhotoTile;
