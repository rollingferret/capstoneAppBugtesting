import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";
import YouButton from "../YouButton";

function Navigation({ isLoaded }) {
 const [formType, setFormType] = useState("login");
 const sessionUser = useSelector((state) => state.session.user);

 let sessionLink1;
 if (sessionUser) {
  sessionLink1 = (
   <div className="navigation-nav-dropdown-parent">
    <ProfileButton user={sessionUser} />
   </div>
  );
 }

 return (
  <div className="whole-screen">
   <div className="navigation-nav-bar">
    <div className="navigation-nav-home">
     <span>
      <img
       className="nav-bar-logo"
       src="https://www.transformationmarketing.com/wp-content/uploads/2020/01/color-wheel.jpg"
      />
     </span>
     &#160; &#160;Imagecfr
     {sessionUser && <YouButton />}
    </div>
    {isLoaded && (
     <>
      <div className="navigation-nav-dropdown-parent">
       <ProfileButton user={sessionUser} />
      </div>
      <Redirect to="/photos/current" />
     </>
    )}
   </div>
   {!sessionUser && formType === "signup" && (
    <div className="signup-login-background">
     <div className="signup-login-form-container">
      <SignupFormPage />
      <div>
       <span className="signup-login-switch-item">
        Already a Imagecfr member?
       </span>
       <button
        className="signup-login-switch-item-btn"
        onClick={() => setFormType("login")}
       >
        &#160;Login here
       </button>
      </div>
     </div>
    </div>
   )}
   {!sessionUser && formType === "login" && (
    <div className="signup-login-background">
     <div className="signup-login-form-container">
      <LoginFormPage />
      <div>
       <span className="signup-login-switch-item">Not a Imagecfr member?</span>
       <button
        className="signup-login-switch-item-btn"
        onClick={() => setFormType("signup")}
       >
        &#160;Sign up here
       </button>
      </div>
     </div>
    </div>
   )}
  </div>
 );
}

export default Navigation;
