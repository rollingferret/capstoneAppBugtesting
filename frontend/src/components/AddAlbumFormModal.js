import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../context/Modal";
import { ThunkAddAAlbum } from "../store/albums";
const CATEGORY = [
 "worm/bug",
 "event",
 "plant",
 "animal",
 "landscape",
 "people",
 "weather",
 "space",
 "sky",
 "sea",
 "sport",
 "season",
 "food",
 "building",
 "technology",
 "fashion",
 "vehicle",
 "things",
 "others",
];

function AddAlbumFormModal() {
 const dispatch = useDispatch();
 const [name, setName] = useState("");
 const [category, setCategory] = useState("");
 const [errors, setErrors] = useState({});
 const { closeModal } = useModal();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors({});

  return dispatch(
   ThunkAddAAlbum({
    name,
    category,
   })
  )
   .then(closeModal)
   .catch(async (res) => {
    const data = await res.json();
    if (data && data.errors) {
     console.log(
      "333333333333333333333 data.errors.errors: ",
      data.errors.errors
     );
     setErrors(data.errors.errors);
    }
   });
 };

 return (
  <div className="form-style">
   <div className="form-style-title">Add a Album</div>
   <form onSubmit={handleSubmit}>
    <label>
     name
     <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
     />
    </label>
    {errors.name && <p className="error-message">{errors.name}</p>}
    <label>
     category
     <select value={category} onChange={(e) => setCategory(e.target.value)}>
      {CATEGORY.map((el, idx) => (
       <option key={idx}>{el}</option>
      ))}
     </select>
    </label>
    {errors.url && <p className="error-message">{errors.url}</p>}

    <button className="submit-btn" type="submit">
     Add
    </button>
   </form>
  </div>
 );
}

export default AddAlbumFormModal;
