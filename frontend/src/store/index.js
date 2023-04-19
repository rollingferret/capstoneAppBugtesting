// frontend/src/store/index.js
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

//Create a rootReducer that calls combineReducers and pass in an empty object for now.

const rootReducer = combineReducers({});

// In development, the logger middleware and Redux dev tools compose enhancer as well. To use these tools, create a logger variable that uses the default export of redux-logger. Then, grab the Redux dev tools compose enhancer with window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ and store it in a variable called composeEnhancers. You can use an or || to keep the Redux's original compose as a fallback. Then set the enhancer variable to the return of the composeEnhancers function passing in applyMiddleware invoked with thunk then logger.

let enhancer;

if (process.env.NODE_ENV === "production") {
 enhancer = applyMiddleware(thunk);
} else {
 const logger = require("redux-logger").default;
 const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

//Next, create a configureStore function that takes in an optional preloadedState. Return createStore invoked with the rootReducer, the preloadedState, and the enhancer.

const configureStore = (preloadedState) => {
 return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
