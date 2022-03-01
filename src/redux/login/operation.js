import { AuthService } from "services";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from "./action";
import { Auth } from "utils";
import { SET_USER_INFO } from "redux/global/action";

export const login = (params) => async (dispatch) => {
  try {
    dispatch(showLoading());
    dispatch({ type: LOGIN });
    const res = await AuthService.signIn(params);
    Auth.setToken(res.accessToken);
    const user = await Auth.getUserInfo();
    dispatch({ type: SET_USER_INFO, payload: user });
    dispatch(hideLoading());
    dispatch({
      type: LOGIN_SUCCESS,
    });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, err });
    dispatch(hideLoading());
  }
};
