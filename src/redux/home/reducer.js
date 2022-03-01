import immutable from "immutable";
import {
  GET_BOOKINGS,
  GET_BOOKINGS_FAIL,
  GET_BOOKINGS_SUCCESS,
  SHOW_CREATE_DIALOG,
  HIDE_CREATE_DIALOG,
  GET_BOOKING_TYPES_FAIL,
  GET_BOOKING_TYPES_SUCCESS,
  CREATE_BOOKING,
  CREATE_BOOKING_FAIL,
  CREATE_BOOKING_SUCCESS,
  CANCEL_BOOKING,
  CANCEL_BOOKING_SUCCESS,
  CANCEL_BOOKING_FAIL,
  CHANGE_STATUS_FAIL,
  CHANGE_STATUS,
  CHANGE_STATUS_SUCCESS,
} from "./action";

const init = () => {
  const initValue = immutable.fromJS({
    booking: undefined,
  });

  return initValue.set("booking", {
    bookings: [],
    isLoading: false,
    isShowCreateDialog: false,
    isSaving: false,
    isCanceling: false,
    isUpdating: false,
    bookingTypes: [],
  });
};

export default function bookingReducer(state = init(), action) {
  switch (action.type) {
    case GET_BOOKINGS:
      return state.update("booking", (booking) => ({
        ...booking,
        isLoading: true,
      }));
    case GET_BOOKINGS_SUCCESS:
      return state.update("booking", (booking) => {
        return {
          ...booking,
          bookings: action.payload,
          isLoading: false,
        };
      });
    case GET_BOOKINGS_FAIL:
      return state.update("booking", (booking) => ({
        ...booking,
        isLoading: false,
        bookings: [],
      }));
    case SHOW_CREATE_DIALOG:
      return state.update("booking", (booking) => ({
        ...booking,
        isShowCreateDialog: true,
      }));
    case HIDE_CREATE_DIALOG:
      return state.update("booking", (booking) => ({
        ...booking,
        isShowCreateDialog: false,
      }));

    case GET_BOOKING_TYPES_FAIL:
      return state.update("booking", (booking) => ({
        ...booking,
        bookingTypes: [],
      }));

    case GET_BOOKING_TYPES_SUCCESS:
      return state.update("booking", (booking) => ({
        ...booking,
        bookingTypes: action.payload,
      }));

    case CREATE_BOOKING:
      return state.update("booking", (booking) => ({
        ...booking,
        isSaving: true,
      }));

    case CREATE_BOOKING_FAIL:
      return state.update("booking", (booking) => ({
        ...booking,
        isSaving: false,
      }));

    case CREATE_BOOKING_SUCCESS:
      return state.update("booking", (booking) => ({
        ...booking,
        isSaving: false,
      }));

    case CANCEL_BOOKING:
      return state.update("booking", (booking) => ({
        ...booking,
        isCanceling: true,
      }));

    case CANCEL_BOOKING_SUCCESS:
      return state.update("booking", (booking) => ({
        ...booking,
        isCanceling: false,
      }));

    case CANCEL_BOOKING_FAIL:
      return state.update("booking", (booking) => ({
        ...booking,
        isCanceling: false,
      }));

    case CHANGE_STATUS:
      return state.update("booking", (booking) => ({
        ...booking,
        isUpdating: true,
      }));

    case CHANGE_STATUS_SUCCESS:
      return state.update("booking", (booking) => ({
        ...booking,
        isUpdating: false,
      }));

    case CHANGE_STATUS_FAIL:
      return state.update("booking", (booking) => ({
        ...booking,
        isUpdating: false,
      }));

    default:
      return state;
  }
}
