import React from "react";
import { NavLink } from "react-router-dom";
import OpenModalButton from "./OpenModalButton";
import AddEditCommentFormModal from "./AddEditCommentFormModal";

function GalleryTile({ photo, user }) {
 console.log("=================PhotoTile photo user: ", photo, user);
 return (
  <div className="phototile">
   <NavLink exact to={`/photos/${photo?.id}`}>
    <div
    //  style={{
    //   backgroundImage: `url(${photo?.imageUrl})`,
    //   height: "200px",
    //   width: "250px",
    //   backgroundSize: "cover",
    //   backgroundPosition: "center",
    //   position: "absolute",
    //   top: "0",
    //  }}
    >
     <img
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
     />
    </div>
   </NavLink>
   <div className="gallery-box">
    <div className="gallery-box-text">
     <div className="gallery-box-item">{photo?.title}</div>
     <div className="gallery-box-item">{photo?.createdAt.slice(0, 7)}</div>
    </div>
   </div>
   <div className="gallery-box-btn">
    {photo.ownerId !== user.id && (
     <OpenModalButton
      btnclassname="OpenModal-btn-gallery "
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
