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
   <button className="profile-button" onClick={openMenu}>
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
       }}
       to="/photos/gallery"
      >
       {" "}
       Gallery
      </NavLink>
     </div>
     <div>
      <NavLink
       style={{
        alignSelf: "start",
        display: "block",
        textDecoration: "none",
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
       }}
       to="/comments/current"
      >
       {" "}
       Comments
      </NavLink>
     </div>
     <div>Alums</div>
     <div>Faves</div>
    </>
   </div>
  </>
 );
}

export default YouButton;
