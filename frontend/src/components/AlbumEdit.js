import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { ThunkLoadCurrentPhotosButThisAlbum } from "../store/photos";
import PhotoList from "./PhotoList";

function AlbumEdit({ user }) {
 const [album_id, setAlbum_id] = useState();
 const params = useParams();
 const dispatch = useDispatch();
 const { albumId } = params;

 console.log("PhotoDetail albumId: ", albumId);
 const theAlbumId = parseInt(albumId);

 useEffect(() => {
  setAlbum_id(theAlbumId);
 }, [theAlbumId]);

 //setPhoto_id(thePhotoId);
 //  const currentAlbums = useSelector((state) => state.albums.allCurrent);
 //  const album = currentAlbums[album_id];

 //  console.log("AlbumDetail album, album_id: ", album, album_id);

 const return_photos = useSelector(
  (state) => state.photos.allcurrentButThisAlbum
 );

 const photos = Object.values(return_photos);
 console.log("AlbumEdit photos: ", photos);

 useEffect(() => {
  if (album_id) dispatch(ThunkLoadCurrentPhotosButThisAlbum(album_id));
 }, [dispatch, album_id]);

 //  if (photos === undefined) return <div>Loading</div>;
 //  else
 return (
  <div className="albumEdit-outer-container">
   <div className="partition1">
    <div className="photos-notInAlbum-container">
     <PhotoList photos={photos} type="photo-but-album" user={user} />
    </div>
   </div>
   <div className="partition2">
    <div className="albumEdit-btn-container"></div>
   </div>
   <div className="partition3">
    <div className="photos-InAlbum-container"></div>
   </div>
  </div>
 );
}
export default AlbumEdit;
