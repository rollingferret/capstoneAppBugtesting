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

 const return_photos = useSelector((state) => state.photos.allPhotos);
 useEffect(() => {
  if (formType === "Edit") {
   dispatch(ThunkLoadAllCurrentPhotos());
  }
 }, [dispatch, formType]);
 let thePhoto;
 if (formType === "Edit" && photo) thePhoto = return_photos[photo.id];

 useEffect(() => {
  if (formType === "Edit") {
   setTitle(thePhoto.title);
   setUrl(thePhoto.url);
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
  <>
   {formType === "Add" ? (
    <h1>Add a Photo</h1>
   ) : (
    <h1>Update info about a Photo</h1>
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
     URL
     <input
      type="text"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      required
     />
    </label>
    {errors.url && <p>{errors.url}</p>}

    <button type="submit">{formType === "Add" ? "Add" : "Update"}</button>
   </form>
  </>
 );
}

export default AddEditPhotoFormModal;
