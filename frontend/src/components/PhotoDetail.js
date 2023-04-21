import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ThunkLoadAllCurrentPhotos } from "../store/photos";

function PhotoDetail() {
 const params = useParams();
 const dispatch = useDispatch();
 const { photoId } = params;
 console.log("PhotoDetail PhotoId: ", photoId);
 const photo_id = parseInt(photoId);

 const return_photos = useSelector((state) => state.photos.allPhotos);
 const photo = return_photos[parseInt(photo_id)];

 console.log("PhotoDetail return_photos: ", return_photos);

 useEffect(() => {
  dispatch(ThunkLoadAllCurrentPhotos());
 }, [dispatch]);

 return (
  <div className="PhotoDetail-show-backgroud-container">
   <div
    className="PhotoDetail-show-container"
    style={{
     backgroundImage: `url(${photo?.url})`,
    }}
   >
    photo detail
   </div>
  </div>
 );
}
export default PhotoDetail;
