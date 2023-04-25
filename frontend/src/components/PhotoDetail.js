import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { ThunkLoadAllCurrentPhotos } from "../store/photos";
import { ThunkLoadAllCommentByPhoto } from "../store/comments";
import MidNav from "./MidNav";

function PhotoDetail() {
 const params = useParams();
 const dispatch = useDispatch();
 const { photoId } = params;
 console.log("PhotoDetail PhotoId: ", photoId);
 const photo_id = parseInt(photoId);

 const return_photos = useSelector((state) => state.photos.allcurrent);
 const photo = return_photos[parseInt(photo_id)];
 const return_comments = useSelector((state) => state.comments.commentsByPhoto);
 console.log("PhotoDetail return_comments: ", return_comments);

 const comments = Object.values(return_comments);
 console.log("PhotoDetail comments: ", comments);
 useEffect(() => {
  dispatch(ThunkLoadAllCurrentPhotos());
 }, [dispatch]);

 useEffect(() => {
  console.log("************** ThunkLoadAllCommentByPhoto photoId:", photoId);
  dispatch(ThunkLoadAllCommentByPhoto(photoId));
 }, [dispatch, photoId]);
 if (comments.length !== 0 && photo !== null)
  return (
   <>
    <div className="PhotoDetail-show-backgroud-container">
     {/* <NavLink
      style={{
       textDecoration: "none",
       color: "white",
       fontSize: "16pt",
       // color: "#00525E",
       //fontWeight: "bolder",
      }}
      exact
      to="/"
     ></NavLink> */}
     <NavLink
      style={{
       color: "white",
       alignSelf: "start",
       display: "block",
       position: "absolute",
       left: "10px",
       top: "10px",
       fontSize: "10pt",
      }}
      to="/photos/current"
     >
      <i className="fa-solid fa-arrow-left fa-sm"></i> Back to photostream
     </NavLink>
     <div
      className="PhotoDetail-show-container"
      style={{
       backgroundImage: `url(${photo?.url})`,
      }}
     >
      photo detail
     </div>
    </div>
    <div className="PhotoDetail-comments-container">
     <div className="PhotoDetail-title-box">{photo?.title}</div>
     <div className="PhotoDetail-title-comment">Comments</div>
     {comments?.map((comment) => {
      return (
       <div key={comment?.id} className="PhotoDetail-comment-box">
        <div className="PhotoDetail-comment-name">
         {`${comment["User.firstname"]} ${comment["User.lastname"]}`}
        </div>
        <div className="PhotoDetail-comment">{`${comment?.comment}`}</div>
       </div>
      );
     })}
    </div>
   </>
  );
 else return <div>Loading...</div>;
}
export default PhotoDetail;
