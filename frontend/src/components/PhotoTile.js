import React from "react";
import { NavLink } from "react-router-dom";
import OpenModalButton from "./OpenModalButton";
import AddEditPhotoFormModal from "./AddEditPhotoFormModal";
import DeletePhotoFormModal from "./DeletePhotoFormModal";

function PhotoTile({ photo }) {
 return (
  <NavLink exact to={`/photos/${photo?.id}`}>
   <div
    style={{
     backgroundImage: `url(${photo?.url})`,
     height: "200px",
     backgroundSize: "cover",
    }}
   >
    {/* <img
    src={`${photo?.url}`}
    style={{ height: "200px" }}
    alt="imported by author"
   /> */}
    <OpenModalButton
     btnclassname="OpenModal-btn"
     buttonText="Update a photo"
     modalComponent={<AddEditPhotoFormModal formType={"Edit"} photo={photo} />}
    />
    <OpenModalButton
     btnclassname="OpenModal-btn"
     buttonText="Delete a photo"
     modalComponent={<DeletePhotoFormModal photo={photo} />}
    />
   </div>
  </NavLink>
 );
}
export default PhotoTile;
