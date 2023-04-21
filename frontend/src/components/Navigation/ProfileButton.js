import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "../OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
 const history = useHistory();
 const dispatch = useDispatch();
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

 const logout = (e) => {
  e.preventDefault();
  dispatch(sessionActions.logout());
  closeMenu();
  history.replace("/");
 };

 const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

 return (
  <>
   <button className="profile-button" onClick={openMenu}>
    <i className="fas fa-user-circle" />
   </button>
   <div className={ulClassName} ref={ulRef}>
    {user ? (
     <>
      <div>{user.username}</div>
      <div>
       {user.firstname} {user.lastname}
      </div>
      <div>{user.email}</div>
      <div>
       <button className="profile-btn-log-out-btn" onClick={logout}>
        Log Out
       </button>
      </div>
     </>
    ) : (
     <>
      <OpenModalMenuItem
       itemText="Log In"
       itemClassName="profile-login-OpenModalMenuItem"
       onItemClick={closeMenu}
       modalComponent={<LoginFormModal />}
      />
      <OpenModalMenuItem
       itemText="Sign Up"
       itemClassName="profile-Sign-Up-OpenModalMenuItem"
       onItemClick={closeMenu}
       modalComponent={<SignupFormModal />}
      />
     </>
    )}
   </div>
  </>
 );
}

export default ProfileButton;
