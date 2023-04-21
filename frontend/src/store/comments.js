import { csrfFetch } from "./csrf";

const LOAD_ALL_COMMENTS_BY_PHOTO = "comments/load_all_comments_by_photo";

export const loadAllCommentByPhoto = (comments) => {
 return {
  type: LOAD_ALL_COMMENTS_BY_PHOTO,
  comments,
 };
};

const initialState = { commentsByPhoto: {} };
const commentsReducer = (state = initialState, action) => {
 let newState = {};
 switch (action.type) {
  case LOAD_ALL_COMMENTS_BY_PHOTO:
   newState = {
    commentsByPhoto: { ...state.commentsByPhoto },
   };
   action.comments;
 }
};
export default commentsReducer();
