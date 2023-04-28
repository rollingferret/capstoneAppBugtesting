import React from "react";
import { NavLink } from "react-router-dom";

function MidNav({ photos }) {
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
   <div className="photo-current-mid-nav-item">
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
