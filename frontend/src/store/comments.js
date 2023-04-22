import { csrfFetch } from "./csrf";

const LOAD_ALL_COMMENTS_BY_PHOTO = "comments/load_all_comments_by_photo";
const LOAD_ALL_COMMENTS_BY_CURRENT = "comments/load_all_comments_by_current";

export const loadAllCommentByPhoto = (comments) => {
 return {
  type: LOAD_ALL_COMMENTS_BY_PHOTO,
  comments,
 };
};
export const loadAllCommentByCurrent = (comments) => {
 return {
  type: LOAD_ALL_COMMENTS_BY_CURRENT,
  comments,
 };
};

//ThunkLoadAllCommentByPhoto
export const ThunkLoadAllCommentByPhoto = (photoId) => async (dispatch) => {
 console.log("first line ThunkLoadAllCommentByPhoto photoId:", photoId);
 const res = await csrfFetch(`/api/photos/${photoId}/comments`);

 if (res.ok) {
  const comments = await res.json();
  dispatch(loadAllCommentByPhoto(comments));
 }
 return res;
};

//ThunkLoadAllCommentByCurrent
export const ThunkLoadAllCommentByCurrent = () => async (dispatch) => {
 console.log("first line ThunkLoadAllCommentByCurrent");
 const res = await csrfFetch(`/api/comments/current`);

 if (res.ok) {
  const comments = await res.json();
  dispatch(loadAllCommentByCurrent(comments));
 }
 return res;
};

const initialState = { commentsByPhoto: {}, commentsByCurrent: {} };

const commentsReducer = (state = initialState, action) => {
 console.log("commentsReducer action: ", action);
 let newState = {};
 switch (action.type) {
  case LOAD_ALL_COMMENTS_BY_PHOTO:
   newState = {
    ...state,
    commentsByPhoto: { ...state.commentsByPhoto },
    commentsByCurrent: { ...state.commentsByCurrent },
   };
   action.comments.forEach((comment) => {
    newState.commentsByPhoto[comment.id] = comment;
   });
   return newState;
  case LOAD_ALL_COMMENTS_BY_CURRENT:
   newState = {
    ...state,
    commentsByPhoto: { ...state.commentsByPhoto },
    commentsByCurrent: { ...state.commentsByCurrent },
   };
   action.comments.forEach((comment) => {
    newState.commentsByCurrent[comment.id] = comment;
   });
   return newState;

  default:
   return state;
 }
};
export default commentsReducer;
