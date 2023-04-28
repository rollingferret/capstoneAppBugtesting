import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../context/Modal";
import {
 ThunkLoadAllCommentByCurrent,
 ThunkUpdateAComment,
 ThunkAddAComment,
} from "../store/comments";

function AddEditCommentFormModal({ formType, comment, photoId }) {
 const dispatch = useDispatch();
 const history = useHistory();
 const [comment_, setComment_] = useState("");
 const [errors, setErrors] = useState({});
 const { closeModal } = useModal();

 const return_comments = useSelector(
  (state) => state.comments.commentsByCurrent
 );
 useEffect(() => {
  if (formType === "Edit") {
   dispatch(ThunkLoadAllCommentByCurrent());
  }
 }, [dispatch, formType]);
 let theComment;
 if (formType === "Edit" && comment) theComment = return_comments[comment.id];

 useEffect(() => {
  if (formType === "Edit") {
   setComment_(theComment.comment);
  }
 }, [formType, theComment]);

 const handleSubmit = (e) => {
  e.preventDefault();
  setErrors({});
  if (formType === "Add") {
   return dispatch(
    ThunkAddAComment(
     {
      comment: comment_,
     },
     photoId
    )
   )
    .then(() => history.push("/comments/current"))
    .then(closeModal)
    .catch(async (res) => {
     const data = await res.json();
     if (data && data.errors) {
      console.log("!!!!!!!!!!!!!!data.errors: ", data.errors);
      setErrors(data.errors);
     }
    });
  }
  if (formType === "Edit") {
   return dispatch(
    ThunkUpdateAComment(
     {
      comment: comment_,
     },
     theComment.id
    )
   )
    .then(closeModal)
    .catch(async (res) => {
     const data = await res.json();
     if (data && data.errors) {
      console.log("!!!!!!!!!!!!!!data.errors: ", data.errors);
      setErrors(data.errors);
     }
    });
  }
 };

 return (
  <div className="form-style">
   {formType === "Add" ? (
    <div className="form-style-title">Add a Comment</div>
   ) : (
    <div className="form-style-title">Update info about a Comment</div>
   )}
   <form onSubmit={handleSubmit}>
    <label>
     Comment
     <textarea
      rows="5"
      cols="20"
      value={comment_}
      onChange={(e) => setComment_(e.target.value)}
      required
     />
    </label>
    {errors.comment && <p className="error-message">{errors.comment}</p>}

    <button className="submit-btn " type="submit">
     {formType === "Add" ? "Add" : "Update"}
    </button>
   </form>
  </div>
 );
}

export default AddEditCommentFormModal;
