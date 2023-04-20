import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Photos from "./components/Photos";

function App() {
 const dispatch = useDispatch();

 const [isLoaded, setIsLoaded] = useState(false);
 useEffect(() => {
  dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
 }, [dispatch]);

 return (
  <>
   <Navigation isLoaded={isLoaded} />

   <Switch>
    {isLoaded && (
     <Route path="/photos/current">
      <Photos />
     </Route>
    )}
   </Switch>
  </>
 );
}

export default App;
