import { csrfFetch } from "./csrf";
//
//
const LOAD_ALL_CURRENT_PHOTOS = "photos/LOAD_ALL_CURRENT_PHOTOS";
//
const CREATE_A_PHOTO = "photos/CREATE_A_PHOTO";

export const loadAllCurrentPhotos = (photos) => {
 return {
  type: LOAD_ALL_CURRENT_PHOTOS,
  photos,
 };
};

export const createAPhoto = (photo) => {
 return {
  type: CREATE_A_PHOTO,
  photo,
 };
};

export const ThunkLoadAllCurrentPhotos = () => async (dispatch) => {
 const response = await csrfFetch("/api/photos/current");
 const photos = await response.json();
 console.log("ThunkLoadAllCurrentPhotos photos: ", photos);
 dispatch(loadAllCurrentPhotos(photos));
};

// export const ThunkCreateAPhoto = (data) => async (dispatch) => {
//  const res = await csrfFetch("/api/photos/", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(data),
//  });

//  if (res.ok) {
//   photo = await res.json();
//   dispatch(createAPhoto(photo));
//   return;
//  } else {
//   return res;
//  }
// };

const initialState = { allPhotos: {}, singlePhoto: {} };

const photosReducer = (state = initialState, action) => {
 console.log("before photosReducer action: ", action);
 let newState = {};
 switch (action.type) {
  case LOAD_ALL_CURRENT_PHOTOS:
   newState = {
    ...state,
    allPhotos: { ...state.allPhotos },
    singlePhoto: { ...state.singlePhoto },
   };
   action.photos.forEach((photo) => {
    newState.allPhotos[photo.id] = photo;
   });
   return newState;

  case CREATE_A_PHOTO:
   newState = {
    ...state,
    allPhotos: { ...state.allPhotos },
    singlePhoto: { ...state.singlePhoto },
   };
   newState.allPhotos[action.photo.id] = action.photo;
   return newState;

  default:
   return state;
 }
};
export default photosReducer;
