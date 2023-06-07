import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { ThunkLoadAllCurrentAlbums } from "../store/albums";
import { ThunkLoadAllCommentByPhoto } from "../store/comments";
import ImageSlider from "./ImageSlider";

function AlbumPhotoDetail() {
 const [photo_id, setPhoto_id] = useState();
 const params = useParams();
 const dispatch = useDispatch();
 const { albumId } = params;

 console.log("AlbumPhotoDetail albumId: ", albumId);
 const theAlbumId = parseInt(albumId);

 const return_albums = useSelector((state) => state.albums.allCurrent);
 let album, albumPhotos;
 if (return_albums) {
  album = return_albums[theAlbumId];
 }
 if (album) {
  albumPhotos = album.AlbumPhotos;
 }
 let normalized_photos = {};
 let photos = [];
 if (albumPhotos) {
  albumPhotos.map((albumPhoto) => {
   photos.push({ ...albumPhoto.Photo, imageUrl: albumPhoto.imageUrl });
   normalized_photos[albumPhoto.Photo.id] = {
    ...albumPhoto.Photo,
    imageUrl: albumPhoto.imageUrl,
   };
  });
 }

 console.log(
  "AlbumPhotoDetail theAlbumId, album , albumPhotos, photos,normalized_photos: ",
  theAlbumId,
  album,
  albumPhotos,
  photos,
  normalized_photos
 );

 let photo;
 if (photo_id) photo = normalized_photos[photo_id];

 useEffect(() => {
  if (photos.length !== 0) setPhoto_id(photos[0].id);
 }, [return_albums]);

 useEffect(() => {
  dispatch(ThunkLoadAllCurrentAlbums());
 }, [dispatch]);

 const return_comments = useSelector((state) => state.comments.commentsByPhoto);
 console.log("PhotoDetail return_comments: ", return_comments);

 const comments = Object.values(return_comments);
 console.log("PhotoDetail comments: ", comments);

 useEffect(() => {
  if (photo_id) dispatch(ThunkLoadAllCommentByPhoto(photo_id));
 }, [dispatch, photo_id]);

 let index;
 if (photos && photo_id) {
  index = photos.findIndex((el) => el.id === parseInt(photo_id));
 }
 console.log("************** findIndex,index,photo_id: ", index, photo_id);

 if (photos === undefined) return <div>Loading</div>;
 else
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
      to="/albums/current"
     >
      <i className="fa-solid fa-arrow-left fa-sm"></i> Back to Albums
     </NavLink>
     {photos !== undefined && index !== -1 && (
      <ImageSlider photos={photos} index={index} setPhoto_id={setPhoto_id} />
     )}
     {console.log("photos,index: ", photos, index)}
    </div>
    <div className="PhotoDetail-show-backgroud-container"></div>
    <div className="PhotoDetail-comments-container">
     <div className="PhotoDetail-title-box">
      {index !== undefined && photos && photos[index].title}
     </div>
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
}
export default AlbumPhotoDetail;
