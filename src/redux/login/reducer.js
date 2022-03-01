import immutable from "immutable";
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from "./action";

const init = () => {
  const initValue = immutable.fromJS({
    auth: undefined,
  });

  return initValue.set("auth", {
    loginSuccess: false,
    isLoading: false,
  });
};

export default function authReducer(state = init(), action) {
  switch (action.type) {
    case LOGIN:
      return state.update("auth", (auth) => ({
        ...auth,
        isLoading: true,
      }));
    case LOGIN_SUCCESS:
      return state.update("auth", () => ({
        loginSuccess: true,
        isLoading: false,
      }));
    case LOGIN_FAIL:
      return state.update("auth", () => ({
        isLoading: false,
        loginSuccess: false,
      }));
    default:
      return state;
  }
}
