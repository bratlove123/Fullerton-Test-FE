import immutable from "immutable";
import { SET_USER_INFO } from "./action";

const init = () => {
  const initValue = immutable.fromJS({
    global: undefined,
  });

  return initValue.set("global", {
    userInfo: undefined,
  });
};

export default function globalReducer(state = init(), action) {
  switch (action.type) {
    case SET_USER_INFO:
      return state.update("global", (global) => ({
        ...global,
        userInfo: action.payload,
      }));
    default:
      return state;
  }
}
