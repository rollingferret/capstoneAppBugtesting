import React from "react";
import { NavLink } from "react-router-dom";
import OpenModalButton from "./OpenModalButton";
import AddEditPhotoFormModal from "./AddEditPhotoFormModal";
import DeletePhotoFormModal from "./DeletePhotoFormModal";

function PhotoTile({ photo }) {
 return (
  <div
   style={{
    backgroundImage: `url(${photo?.url})`,
    width: "250px",
    height: "200px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: "1",
   }}
  >
   <NavLink exact to={`/photos/${photo?.id}`}>
    <div
     style={{
      width: "100%",
      height: "173px",
      backgroundSize: "cover",
      zIndex: "2",
     }}
    ></div>
   </NavLink>
   <div className="photo-tile-icon-box">
    <OpenModalButton
     btnclassname="OpenModal-btn"
     buttonText={<i className="fa-solid fa-pen-to-square photo-tile-btn"></i>}
     modalComponent={<AddEditPhotoFormModal formType={"Edit"} photo={photo} />}
    />
    <OpenModalButton
     btnclassname="OpenModal-btn"
     buttonText={<i className="fa-solid fa-trash-can photo-tile-btn"></i>}
     modalComponent={<DeletePhotoFormModal photo={photo} />}
    />
   </div>
  </div>
 );
}
export default PhotoTile;
