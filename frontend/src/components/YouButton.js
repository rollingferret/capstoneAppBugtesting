import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

function YouButton({ user }) {
 const [showMenu, setShowMenu] = useState(false);
 const ulRef = useRef();

 const openMenu = () => {
  if (showMenu) return;
  setShowMenu(true);
 };

 useEffect(() => {
  if (!showMenu) return;

  const closeMenu = (e) => {
   if (!ulRef.current.contains(e.target)) {
    setShowMenu(false);
   }
  };

  document.addEventListener("click", closeMenu);

  return () => document.removeEventListener("click", closeMenu);
 }, [showMenu]);

 const closeMenu = () => setShowMenu(false);

 const ulClassName =
  "profile-dropdown You-dropdown" + (showMenu ? "" : " hidden");

 return (
  <>
   <button className="profile-button you-button" onClick={openMenu}>
    You
   </button>
   <div className={ulClassName} ref={ulRef}>
    {/* {user ? ( */}
    <>
     <div>
      <NavLink
       style={{
        alignSelf: "start",
        display: "block",
        textDecoration: "none",
        fontSize: "14pt",
        color: "black",
        fontWeight: "500",
       }}
       to="/photos/gallery"
      >
       Gallery
      </NavLink>
     </div>
     <div>
      <NavLink
       style={{
        alignSelf: "start",
        display: "block",
        textDecoration: "none",
        fontSize: "14pt",
        color: "black",
        fontWeight: "500",
       }}
       to="/photos/current"
      >
       {" "}
       Photostream
      </NavLink>
     </div>
     <div>
      <NavLink
       style={{
        alignSelf: "start",
        display: "block",
        textDecoration: "none",
        fontSize: "14pt",
        color: "black",
        fontWeight: "500",
       }}
       to="/comments/current"
      >
       {" "}
       Comments
      </NavLink>
     </div>
     {/* <div className="You-dropdown-item">Albums</div>
     <div className="You-dropdown-item">Faves</div> */}
    </>
   </div>
  </>
 );
}

export default YouButton;
