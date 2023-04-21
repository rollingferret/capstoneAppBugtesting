import React from "react";
import OpenModalButton from "./OpenModalButton";
import AddEditPhotoFormModal from "./AddEditPhotoFormModal";
import DeletePhotoFormModal from "./DeletePhotoFormModal";

function PhotoTile({ photo }) {
 return (
  <div>
   <img
    src={`${photo?.url}`}
    style={{ height: "200px" }}
    alt="imported by author"
   />
   <OpenModalButton
    btnClassName="OpenModal-btn"
    buttonText="Update a photo"
    modalComponent={<AddEditPhotoFormModal formType={"Edit"} photo={photo} />}
   />
   <OpenModalButton
    btnClassName="OpenModal-btn"
    buttonText="Delete a photo"
    modalComponent={<DeletePhotoFormModal photo={photo} />}
   />
  </div>
 );
}
export default PhotoTile;
