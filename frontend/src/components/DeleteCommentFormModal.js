import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../context/Modal";
import { ThunkDeleteAComment } from "../store/comments";
//import "./SignupForm.css";

function DeleteCommentFormModal({ comment }) {
 const dispatch = useDispatch();
 const [errors, setErrors] = useState({});
 const { closeModal } = useModal();
 console.log("==============errors", errors);

 const handleDelete = () => {
  setErrors({});
  return dispatch(ThunkDeleteAComment(comment.id))
   .then(closeModal)
   .catch(async (res) => {
    const data = await res.json();
    if (data && data.errors) {
     setErrors(data.errors);
    }
   });
 };

 return (
  <div className="delete-photo-form-container">
   <div>
    <h1>Confirm Delete</h1>
   </div>
   <div>
    <p>Are you sure you want to remove this comment?</p>
   </div>

   <div>
    <ul>
     {/* {!!errors && errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
    </ul>
   </div>

   <button
    className="delete-photo-button"
    onClick={() => {
     handleDelete();
    }}
   >
    Yes (Delete Comment)
   </button>

   <button className="cancel-delete-photo-button" onClick={() => closeModal()}>
    No (Keep Comment)
   </button>
  </div>
 );
}

export default DeleteCommentFormModal;
