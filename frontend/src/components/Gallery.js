import React, { useEffect } from "react";
import PhotoList from "./PhotoList";
import { useDispatch, useSelector } from "react-redux";
import { ThunkLoadAllPhotos } from "../store/photos";

function Gallery({ user }) {
 console.log("step 1");
 const dispatch = useDispatch();
 const return_photos = useSelector((state) => state.photos.allPhotos);
 console.log("---------return_photos", return_photos);
 const photos = Object.values(return_photos);
 //const photos = [...return_photos];
 //console.log("---------photos", photos);
 useEffect(() => {
  //console.log("step 3");
  dispatch(ThunkLoadAllPhotos());
 }, [dispatch]);

 //console.log("step 4");
 if (!return_photos) return null;
 return (
  <>
   <div>This is Gallery </div>

   <div className="photo-current-photolist-container">
    {!!photos && <PhotoList photos={photos} user={user} type="gallery" />}
   </div>
  </>
 );
}
export default Gallery;
