import React from "react";
import { NavLink } from "react-router-dom";
import OpenModalButton from "./OpenModalButton";
import AddEditCommentFormModal from "./AddEditCommentFormModal";

function GalleryTile({ photo, user }) {
 //console.log("=================PhotoTile user: ", user);
 return (
  <div className="phototile">
   <NavLink exact to={`/photos/${photo?.id}`}>
    <div
     style={{
      backgroundImage: `url(${photo?.url})`,
      height: "200px",
      width: "250px",
      backgroundSize: "cover",
     }}
    >
     {/* <img
    src={`${photo?.url}`}
    style={{ height: "200px" }}
    alt="imported by author"
   /> */}
    </div>
   </NavLink>
   <div className="phototile-box">
    <div>{photo?.title}</div>
    <div>{photo?.createdAt.slice(0, 7)}</div>
    {photo.ownerId !== user.id && (
     <OpenModalButton
      btnclassname="OpenModal-btn-gallery"
      buttonText="Add"
      modalComponent={
       <AddEditCommentFormModal
        formType={"Add"}
        comment={null}
        photoId={photo?.id}
       />
      }
     />
    )}
   </div>
  </div>
 );
}
export default GalleryTile;
