import React, { useEffect } from "react";
import PhotoList from "./PhotoList";
import { useDispatch, useSelector } from "react-redux";
import { ThunkLoadAllCurrentPhotos } from "../store/photos";
import AddEditPhotoFormModal from "./AddEditPhotoFormModal";
import OpenModalButton from "./OpenModalButton";
import MidNav from "./MidNav";
import BottomBanner from "./BottomBanner";
import { Redirect } from "react-router-dom";

function Photos({ user }) {
 console.log({ user });
 if (user === null) <Redirect to="/" />;
 //console.log("first line of Photos user", user);
 const dispatch = useDispatch();
 const return_photos = useSelector((state) => state.photos.allcurrent);
 //  console.log("---------return_photos", return_photos);
 const photos = Object.values(return_photos);
 //const photos = [...return_photos];
 console.log("---------user", user);
 useEffect(() => {
  // console.log("step 3");
  if (user) dispatch(ThunkLoadAllCurrentPhotos());
 }, [dispatch, user]);
 console.log("step 4");
 if (!photos) return null;
 return (
  <>
   <div className="photo-current-top-cover-img">
    <span className="photo-logo-box">
     <img
      className="photo-logo"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLNqpbvkqoDHq1fwkBZBA8dByg5H8O0dMnow&usqp=CAU"
      alt="logo of the app"
     />
    </span>
    <div className="photo-current-user">
     <div className="photo-current-user-name">{`${user?.firstname} ${user?.lastname}`}</div>
     <div>{user?.email}</div>
    </div>
    <div className="photo-current-photolength">
     {`${photos?.length} photos`} &#160; &#160;{" "}
     {`joined ${user?.createdAt.slice(0, 4)} `}
    </div>
   </div>
   <MidNav />
   <div className="photo-current-create-photo-row ">
    <div className="page-title">
     <h3>Photostream</h3>
    </div>
    <div className="photo-current-new-photo ">
     <OpenModalButton
      btnclassname="OpenModal-btn"
      buttonText={<i className="fa-solid fa-square-plus"></i>}
      modalComponent={<AddEditPhotoFormModal formType={"Add"} photo={null} />}
     />
    </div>
   </div>
   <div className="photo-current-photolist-container">
    {!!photos && <PhotoList photos={photos} user={user} type="photo" />}
    {photos.length === 0 && (
     <div className="photos-add-more-photo">Please add photos!</div>
    )}
   </div>
   <BottomBanner />
  </>
 );
}
export default Photos;
