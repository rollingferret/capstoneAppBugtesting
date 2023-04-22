import { csrfFetch } from "./csrf";

const LOAD_ALL_COMMENTS_BY_PHOTO = "comments/load_all_comments_by_photo";
const LOAD_ALL_COMMENTS_BY_CURRENT = "comments/load_all_comments_by_current";
const Update_A_COMMENT = "comments/update_a_comment";
const DELETE_A_COMMENT = "comments/delete_a_comment";

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
export const updateAComment = (comment) => {
 return {
  type: Update_A_COMMENT,
  comment,
 };
};
export const deleteAComment = (commentId) => {
 return {
  type: DELETE_A_COMMENT,
  commentId,
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

//ThunkUpdateAComment
export const ThunkUpdateAComment = (data, commentId) => async (dispatch) => {
 //  console.log(
 //   "first line ThunkLoadAllCommentByCurrent data, commentId",
 //   data,
 //   commentId
 //  );
 const res = await csrfFetch(`/api/comments/${commentId}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
 });

 if (res.ok) {
  const comment = await res.json();
  dispatch(updateAComment(comment));
 }
 return res;
};

//ThunkDeleteAComment
export const ThunkDeleteAComment = (commentId) => async (dispatch) => {
 const res = await csrfFetch(`/api/comments/${commentId}`, {
  method: "DELETE",
 });
 if (res.ok) dispatch(deleteAComment(commentId));
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

  case Update_A_COMMENT:
   newState = {
    ...state,
    commentsByPhoto: { ...state.commentsByPhoto },
    commentsByCurrent: { ...state.commentsByCurrent },
   };
   newState.commentsByCurrent[action.comment.id] = action.comment;

   return newState;

  case DELETE_A_COMMENT:
   newState = {
    ...state,
    commentsByPhoto: { ...state.commentsByPhoto },
    commentsByCurrent: { ...state.commentsByCurrent },
   };
   delete newState.commentsByCurrent[action.commentId];
   return newState;

  default:
   return state;
 }
};
export default commentsReducer;
