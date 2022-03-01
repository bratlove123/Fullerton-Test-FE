export const selectReducer = (state) => state.auth;

export const selectIsLoading = (state) =>
  selectReducer(state) ? selectReducer(state).get("auth").isLoading : false;

export const selectLoginSuccess = (state) =>
  selectReducer(state) ? selectReducer(state).get("auth").loginSuccess : false;
