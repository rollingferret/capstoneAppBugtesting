// frontend/src/components/LoginFormPage.js
import React, { useState } from "react";
import * as sessionActions from "../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
//import { ThunkLoadAllCurrentPhotos } from "../store/photos";

function LoginFormPage() {
 const dispatch = useDispatch();
 const sessionUser = useSelector((state) => state.session.user);
 const [credential, setCredential] = useState("");
 const [password, setPassword] = useState("");
 const [errors, setErrors] = useState({});
 const history = useHistory();

 if (sessionUser) return <Redirect to="/photos/current" />;

 const handleSubmit = (e) => {
  e.preventDefault();
  setErrors({});
  return dispatch(sessionActions.login({ credential, password }))
   .then(() => history.push("/photos/current"))
   .catch(async (res) => {
    const data = await res.json();
    if (data && data.errors) setErrors(data.errors);
   });
 };

 const demoUser = () => {
  setErrors({});
  return dispatch(
   sessionActions.login({ credential: "demo@user.io", password: "password" })
  )
   .then(() => history.push("/photos/current"))
   .catch(async (res) => {
    const data = await res.json();
    if (data && data.errors) setErrors(data.errors);
   });
 };

 return (
  <>
   <div>Log In</div>
   <form onSubmit={handleSubmit}>
    <label>
     Username or Email
     <input
      type="text"
      value={credential}
      onChange={(e) => setCredential(e.target.value)}
      required
     />
    </label>
    <label>
     Password
     <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
     />
    </label>
    {errors.credential && <p>{errors.credential}</p>}
    <button type="submit">Log In</button>
   </form>
   <button onClick={() => demoUser()}>demoUser</button>
  </>
 );
}

export default LoginFormPage;
