import { csrfFetch } from "./csrf";
//
//
const LOAD_ALL_CURRENT_PHOTOS = "photos/LOAD_ALL_CURRENT_PHOTOS";
//
const LOAD_ALL_PHOTOS = "photos/LOAD_ALL_PHOTOS";

const CREATE_UPDATE_A_PHOTO = "photos/CREATE_UPDATE_A_PHOTO";

const DELETE_A_PHOTO = "photos/DELETE_A_PHOTO";

export const loadAllCurrentPhotos = (photos) => {
 return {
  type: LOAD_ALL_CURRENT_PHOTOS,
  photos,
 };
};

export const loadAllPhotos = (photos) => {
 return {
  type: LOAD_ALL_PHOTOS,
  photos,
 };
};

export const createUpdateAPhoto = (photo) => {
 return {
  type: CREATE_UPDATE_A_PHOTO,
  photo,
 };
};

export const deleteAPhoto = (id) => {
 return {
  type: DELETE_A_PHOTO,
  id,
 };
};

export const ThunkLoadAllCurrentPhotos = () => async (dispatch) => {
 const response = await csrfFetch("/api/photos/current");
 const photos = await response.json();
 console.log("ThunkLoadAllCurrentPhotos photos: ", photos);
 dispatch(loadAllCurrentPhotos(photos));
 return response;
};

export const ThunkLoadAllPhotos = () => async (dispatch) => {
 const response = await csrfFetch("/api/photos");
 const photos = await response.json();
 console.log("ThunkLoadAllCurrentPhotos photos: ", photos);
 dispatch(loadAllPhotos(photos));
 return response;
};

export const ThunkCreateAPhoto = (data) => async (dispatch) => {
 const res = await csrfFetch("/api/photos/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
 });

 if (res.ok) {
  const photo = await res.json();
  dispatch(createUpdateAPhoto(photo));
  return;
 } else {
  return res;
 }
};

export const ThunkUpdateAPhoto = (data, photoId) => async (dispatch) => {
 const res = await csrfFetch(`/api/photos/${photoId}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
 });

 if (res.ok) {
  const photo = await res.json();
  dispatch(createUpdateAPhoto(photo));
  return;
 } else {
  return res;
 }
};
//thunkDeleteAPhoto
export const thunkDeleteAPhoto = (photoId) => async (dispatch) => {
 const res = await csrfFetch(`/api/photos/${photoId}`, {
  method: "DELETE",
 });
 if (res.ok) dispatch(deleteAPhoto(photoId));
 return res;
};

const initialState = { allPhotos: {}, allcurrent: {} };

const photosReducer = (state = initialState, action) => {
 console.log("before photosReducer action: ", action);
 let newState = {};
 switch (action.type) {
  case LOAD_ALL_CURRENT_PHOTOS:
   newState = {
    // ...state,
    allPhotos: { ...state.allPhotos },
    allcurrent: {},
   };
   action.photos.forEach((photo) => {
    newState.allcurrent[photo.id] = photo;
   });
   return newState;
  case LOAD_ALL_PHOTOS:
   newState = {
    // ...state,
    allPhotos: {},
    allcurrent: { ...state.allcurrent },
   };
   action.photos.forEach((photo) => {
    newState.allPhotos[photo.id] = photo;
   });
   return newState;

  case CREATE_UPDATE_A_PHOTO:
   newState = {
    // ...state,
    allPhotos: { ...state.allPhotos },
    allcurrent: { ...state.allcurrent },
   };
   newState.allcurrent[action.photo.id] = action.photo;
   return newState;

  case DELETE_A_PHOTO:
   newState = {
    // ...state,
    allPhotos: { ...state.allPhotos },
    allcurrent: { ...state.allcurrent },
   };
   delete newState.allcurrent[action.id];
   return newState;

  default:
   return state;
 }
};
export default photosReducer;
