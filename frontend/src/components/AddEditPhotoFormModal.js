import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../context/Modal";
import {
 ThunkCreateAPhoto,
 ThunkLoadAllCurrentPhotos,
 ThunkUpdateAPhoto,
} from "../store/photos";

function AddEditPhotoFormModal({ formType, photo }) {
 const dispatch = useDispatch();
 const [title, setTitle] = useState("");
 const [url, setUrl] = useState("");
 const [errors, setErrors] = useState({});
 const { closeModal } = useModal();

 const return_photos = useSelector((state) => state.photos.allcurrent);
 useEffect(() => {
  if (formType === "Edit") {
   dispatch(ThunkLoadAllCurrentPhotos());
  }
 }, [dispatch, formType]);
 let thePhoto;
 if (formType === "Edit" && photo) thePhoto = return_photos[photo.id];

 useEffect(() => {
  if (formType === "Edit" && thePhoto !== null) {
   setTitle(thePhoto?.title);
   setUrl(thePhoto?.url);
  }
 }, [formType, thePhoto]);

 const handleSubmit = (e) => {
  e.preventDefault();
  setErrors({});
  if (formType === "Add") {
   return dispatch(
    ThunkCreateAPhoto({
     title,
     url,
    })
   )
    .then(closeModal)
    .catch(async (res) => {
     const data = await res.json();
     if (data && data.errors) {
      setErrors(data.errors);
     }
    });
  } else {
   return dispatch(
    ThunkUpdateAPhoto(
     {
      title,
      url,
     },
     thePhoto.id
    )
   )
    .then(closeModal)
    .catch(async (res) => {
     const data = await res.json();
     if (data && data.errors) {
      setErrors(data.errors);
     }
    });
  }
 };

 return (
  <div className="form-style">
   {formType === "Add" ? (
    <div className="form-style-title">Add a Photo</div>
   ) : (
    <div className="form-style-title">Update info about a Photo</div>
   )}
   <form onSubmit={handleSubmit}>
    <label>
     title
     <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
     />
    </label>
    {errors.title && <p>{errors.title}</p>}
    <label>
     url
     <input
      type="text"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      required
     />
    </label>
    {errors.url && <p>{errors.url}</p>}

    <button className="submit-btn" type="submit">
     {formType === "Add" ? "Add" : "Update"}
    </button>
   </form>
  </div>
 );
}

export default AddEditPhotoFormModal;
