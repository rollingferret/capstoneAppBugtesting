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
      backgroundPosition: "center",
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
    <div className="phototile-box-text">
     <div className="phototile-box-item">{photo?.title}</div>
     <div className="phototile-box-item">{photo?.createdAt.slice(0, 7)}</div>
    </div>
    {photo.ownerId !== user.id && (
     <OpenModalButton
      btnclassname="OpenModal-btn-gallery phototile-box-item"
      buttonText={<i className="fa-regular fa-square-plus"></i>}
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
