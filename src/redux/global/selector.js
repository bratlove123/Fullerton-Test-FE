export const selectReducer = (state) => state.global;

export const selectUserInfo = (state) =>
  selectReducer(state)
    ? selectReducer(state).get("global").userInfo
    : undefined;
