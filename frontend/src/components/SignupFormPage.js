// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../store/session";

function SignupFormPage() {
 const dispatch = useDispatch();
 const sessionUser = useSelector((state) => state.session.user);
 const [email, setEmail] = useState("");
 const [username, setUsername] = useState("");
 const [firstname, setFirstname] = useState("");
 const [lastname, setLastname] = useState("");
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [errors, setErrors] = useState({});
 const history = useHistory();

 if (sessionUser) return <Redirect to="/photos/current" />;

 const handleSubmit = (e) => {
  e.preventDefault();
  if (password === confirmPassword) {
   setErrors({});
   return dispatch(
    sessionActions.signup({
     email,
     username,
     firstname,
     lastname,
     password,
    })
   )
    .then(() => history.push("/photos/current"))
    .catch(async (res) => {
     const data = await res.json();
     if (data && data.errors) {
      setErrors(data.errors);
     }
    });
  }
  return setErrors({
   confirmPassword:
    "Confirm Password field must be the same as the Password field",
  });
 };

 return (
  <>
   <h1>Sign Up</h1>
   <form onSubmit={handleSubmit}>
    <label>
     Email
     <input
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
     />
    </label>
    {errors.email && <p className="error-message">{errors.email}</p>}
    <label>
     Username
     <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
     />
    </label>
    {errors.username && <p className="error-message">{errors.username}</p>}
    <label>
     First Name
     <input
      type="text"
      value={firstname}
      onChange={(e) => setFirstname(e.target.value)}
      required
     />
    </label>
    {errors.firstname && <p className="error-message">{errors.firstname}</p>}
    <label>
     Last Name
     <input
      type="text"
      value={lastname}
      onChange={(e) => setLastname(e.target.value)}
      required
     />
    </label>
    {errors.lastname && <p className="error-message">{errors.lastname}</p>}
    <label>
     Password
     <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
     />
    </label>
    {errors.password && <p className="error-message">{errors.password}</p>}
    <label>
     Confirm Password
     <input
      type="password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      required
     />
    </label>
    {errors.confirmPassword && (
     <p className="error-message">{errors.confirmPassword}</p>
    )}
    <button className="submit-btn" type="submit">
     Sign Up
    </button>
   </form>
  </>
 );
}

export default SignupFormPage;
