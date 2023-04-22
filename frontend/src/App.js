import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Photos from "./components/Photos";
import PhotoDetail from "./components/PhotoDetail";
import CommentCurrent from "./components/CommentCurrent";
import Gallery from "./components/Gallery";

function App() {
 const dispatch = useDispatch();
 const [isLoaded, setIsLoaded] = useState(false);

 const sessionUser = useSelector((state) => state.session.user);
 useEffect(() => {
  dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
 }, [dispatch]);

 return (
  <>
   <Navigation isLoaded={isLoaded} />

   <Switch>
    {isLoaded && (
     <Route path="/photos/gallery">
      <Gallery user={sessionUser} />
     </Route>
    )}
    {isLoaded && (
     <Route path="/photos/current">
      <Photos user={sessionUser} />
     </Route>
    )}
    {isLoaded && (
     <Route path="/photos/:photoId">
      <PhotoDetail />
     </Route>
    )}
    {isLoaded && (
     <Route path="/comments/current">
      <CommentCurrent />
     </Route>
    )}
   </Switch>
  </>
 );
}

export default App;
