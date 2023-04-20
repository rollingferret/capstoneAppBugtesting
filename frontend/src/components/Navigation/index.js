import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";

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

 let isSignup = !sessionUser & (formType === "signup");
 console.log("isSignup", isSignup);
 //  else {
 //   if (formType === "login")
 //    sessionLink2 = <LoginFormPage setFormType={setFormType} />;
 //   else sessionLink2 = <SignupFormPage setFormType={setFormType} />;

 // sessionLinks = (
 //  <div className="navigation-nav-dropdown-parent">
 //   <OpenModalButton buttonText="Log In" modalComponent={<LoginFormModal />} />
 //   <OpenModalButton
 //    buttonText="Sign Up"
 //    modalComponent={<SignupFormModal />}
 //   />
 //  </div>
 // );

 return (
  <div className="whole-screen">
   <div className="navigation-nav-bar">
    <div className="navigation-nav-home">
     <NavLink
      style={{
       textDecoration: "none",
       color: "white",
       fontSize: "16pt",
       // color: "#00525E",
       //fontWeight: "bolder",
      }}
      exact
      to="/"
     >
      Imagecfr
     </NavLink>
    </div>
    {isLoaded && sessionLink1}
   </div>
   {!sessionUser && formType === "signup" && (
    <div className="signup-login-background">
     <div className="signup-login-form-container">
      <SignupFormPage />
      <div>
       <span>Already a Imagecfr member?</span>
       <button onClick={() => setFormType("login")}>Login here</button>
      </div>
     </div>
    </div>
   )}
   {!sessionUser && formType === "login" && (
    <div className="signup-login-background">
     <div className="signup-login-form-container">
      <LoginFormPage />
      <div>
       <span>Not a Imagecfr member?</span>
       <button onClick={() => setFormType("signup")}>Sign up here</button>
      </div>
     </div>
    </div>
   )}
  </div>
 );
}

export default Navigation;
