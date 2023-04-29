import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { ThunkLoadAllPhotos } from "../store/photos";
import { ThunkLoadAllCommentByPhoto } from "../store/comments";
import ImageSlider from "./ImageSlider";

function PhotoDetail() {
 const [photo_id, setPhoto_id] = useState();
 const params = useParams();
 const dispatch = useDispatch();
 const { photoId } = params;

 console.log("PhotoDetail PhotoId: ", photoId);
 const thePhotoId = parseInt(photoId);

 useEffect(() => {
  setPhoto_id(thePhotoId);
 }, [thePhotoId]);

 //setPhoto_id(thePhotoId);
 const return_photos = useSelector((state) => state.photos.allPhotos);
 const photos = Object.values(return_photos);
 let photo;
 if (photo_id) photo = return_photos[photo_id];

 console.log("PhotoDetail photos, PhotoId: ", photos, photoId);
 const return_comments = useSelector((state) => state.comments.commentsByPhoto);
 console.log("PhotoDetail return_comments: ", return_comments);

 const comments = Object.values(return_comments);
 console.log("PhotoDetail comments: ", comments);

 useEffect(() => {
  dispatch(ThunkLoadAllPhotos());
 }, [dispatch]);

 useEffect(() => {
  if (photo_id) dispatch(ThunkLoadAllCommentByPhoto(photo_id));
 }, [dispatch, photo_id]);

 let index;
 if (photos && photo_id) {
  index = photos.findIndex((el) => el.id === parseInt(photo_id));
 }
 console.log("************** findIndex,index,photo_id: ", index, photo_id);

 //  if (photos === undefined) return <div>Loading</div>;
 //  else
 return (
  <>
   <div className="ImageSlider-parent-outer-container">
    <NavLink
     style={{
      color: "white",
      alignSelf: "start",
      display: "block",
      position: "absolute",
      left: "10px",
      top: "10px",
      fontSize: "14pt",
     }}
     to="/photos/current"
    >
     <i className="fa-solid fa-arrow-left fa-sm"></i> Back to photostream
    </NavLink>
    {photos !== undefined && index !== -1 && (
     <ImageSlider thePhotos={photos} index={index} setPhoto_id={setPhoto_id} />
    )}
    {console.log("photos,index: ", photos, index)}
   </div>
   <div className="PhotoDetail-show-backgroud-container"></div>
   <div className="PhotoDetail-comments-container">
    <div className="PhotoDetail-title-box">{photo?.title}</div>
    <div className="PhotoDetail-title-comment">Comments</div>
    {comments.length !== 0 &&
     comments.map((comment) => {
      return (
       <div key={comment?.id} className="PhotoDetail-comment-box">
        <div className="PhotoDetail-comment-name">
         {`${comment["User.firstname"]} ${comment["User.lastname"]}`}
        </div>
        <div className="PhotoDetail-comment">{`${comment?.comment}`}</div>
       </div>
      );
     })}
    {comments.length === 0 && (
     <div className="PhotoDetail-comment"> Coming soon!</div>
    )}
   </div>
  </>
 );
 //else return <div>Loading...</div>;
}
export default PhotoDetail;
