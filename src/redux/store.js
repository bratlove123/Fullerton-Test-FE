import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewareList = [];

// Redux thunk
middlewareList.push(thunk);

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewareList))
);

export default store;
