import React from "react";
import { NavLink } from "react-router-dom";

function MidNav({ compo }) {
 let classNamePhotos, classNameAlbums;
 compo === "Photos"
  ? (classNamePhotos = "photo-current-mid-nav-item highLighted")
  : (classNamePhotos = "photo-current-mid-nav-item");
 compo === "Albums"
  ? (classNameAlbums = "photo-current-mid-nav-item highLighted")
  : (classNameAlbums = "photo-current-mid-nav-item");

 return (
  <div className="photo-current-mid-nav">
   <div className="photo-current-mid-nav-item">
    <NavLink
     style={{
      alignSelf: "start",
      display: "block",
      textDecoration: "none",
      fontSize: "16pt",
      color: "gray",
     }}
     to="/photos/gallery"
    >
     Gallery
    </NavLink>
   </div>
   <div className={classNamePhotos}>
    <NavLink
     style={{
      alignSelf: "start",
      display: "block",
      textDecoration: "none",
      fontSize: "16pt",
      color: "gray",
     }}
     to="/photos/current"
    >
     {" "}
     Photostream
    </NavLink>
   </div>
   <div className={classNameAlbums}>
    <NavLink
     style={{
      alignSelf: "start",
      display: "block",
      textDecoration: "none",
      fontSize: "16pt",
      color: "gray",
     }}
     to="/albums/current"
    >
     {" "}
     Albums
    </NavLink>
   </div>
   <div className="photo-current-mid-nav-item">
    <NavLink
     style={{
      alignSelf: "start",
      display: "block",
      textDecoration: "none",
      fontSize: "16pt",
      color: "gray",
     }}
     to="/comments/current"
    >
     {" "}
     Comments
    </NavLink>
   </div>
  </div>
 );
}
export default MidNav;
