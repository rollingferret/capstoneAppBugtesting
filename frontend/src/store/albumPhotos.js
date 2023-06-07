import { csrfFetch } from "./csrf";
//

//add multiple albumPhotos by albumId

export const ThunkAddMultiAlbumPhotos = async ({ album_id, photoIds }) => {
 console.log(
  "ThunkAddMultiAlbumPhotos before call csrfFetch album_id, photoIds",
  album_id,
  photoIds
 );
 const response = await csrfFetch(`/api/albums/${album_id}/multiAlbumPhotos`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(photoIds),
 });
 if (response.ok) {
  console.log("albumPhotos added successfully!");
 }
};

//add multiple albumPhotos by albumId

export const ThunkDeleteMultiAlbumPhotos = async (albumPhotoIds) => {
 console.log(
  "ThunkDeleteMultiAlbumPhotos before call csrfFetch albumPhotoIds: ",
  albumPhotoIds
 );
 const response = await csrfFetch(`/api/albumPhotos/multiAlbumPhotos`, {
  method: "DELETE",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(albumPhotoIds),
 });
 if (response.ok) {
  console.log("albumPhotos deleted successfully!");
 }
};
