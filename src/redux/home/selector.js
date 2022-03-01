export const selectReducer = (state) => state.booking;

export const selectIsLoading = (state) =>
  selectReducer(state) ? selectReducer(state).get("booking").isLoading : false;

export const selectBookings = (state) =>
  selectReducer(state) ? selectReducer(state).get("booking").bookings : [];

export const selectBookingTypes = (state) =>
  selectReducer(state) ? selectReducer(state).get("booking").bookingTypes : [];

export const selectShowCreateDialog = (state) =>
  selectReducer(state)
    ? selectReducer(state).get("booking").isShowCreateDialog
    : false;

export const selectIsSaving = (state) =>
  selectReducer(state) ? selectReducer(state).get("booking").isSaving : false;

export const selectIsCancelling = (state) =>
  selectReducer(state)
    ? selectReducer(state).get("booking").isCanceling
    : false;

export const selectIsEditting = (state) =>
  selectReducer(state) ? selectReducer(state).get("booking").isUpdating : false;
