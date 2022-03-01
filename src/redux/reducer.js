import { loadingBarReducer } from "react-redux-loading-bar";
import { combineReducers } from "redux";
import globalReducer from "./global/reducer";
import bookingReducer from "./home/reducer";
import authReducer from "./login/reducer";

const rootReducer = combineReducers({
  loadingBar: loadingBarReducer,
  auth: authReducer,
  booking: bookingReducer,
  global: globalReducer,
});

export default rootReducer;
